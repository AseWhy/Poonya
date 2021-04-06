/**
 * @file src/parser.js
 * @description Содержит в себе парсер исходного кода poonya, на выходе экспортируемых функций можно получить либо выражение, либо главную исполняемую последовательность
 * @author Astecom
 */

"use strict";

const { 
        PoonyaException
    ,   BadEmptyObjectException
    ,   ParserEmtyArgumentException
    ,   UnexpectedTokenException
    ,   BadArrowNotationJumpingToUpperLevel
    ,   BadArrowNotationJumpingTwoLevels
    ,   ParserLogicException
    ,   InvalidSequenceForLetiableAccessException
    ,   CriticalParserErrorUnexpectedEndOfInputException
    ,   SegmentationFaultEmptyArgumentException
    ,   SegmentationFaultMaximumSegmentsForBlockException
    ,   UnexpectedTokenStatement
    ,   UnexpectedWordTypeAndGetException
    ,   CriticalParserErrorException
    ,   CriticalParserErrorNoRawDataTransmittedException
    ,   CriticalParserErrorUnexpectedEndOfExpression
    ,   ParserUnfinishedNotationException
    } = require('../classes/exceptions'),
    { 
        maybeEquals
    ,   countKeys
    ,   throwError
    ,   toBytes
    } = require('../utils'),
    {
        CHARTYPE
    ,   SERVICE
    } = require('../classes/static')
    ,   ParserData = require('./ParserData')
    ,   UseStatement = require("../classes/excecution/statements/UseStatement")
    ,   FunctionCall = require('../classes/excecution/expression/FunctionCall')
    ,   ObjectContructorCall = require('../classes/excecution/expression/ObjectContructorCall')
    ,   TernarOperator = require('../classes/excecution/expression/TernarOperator')
    ,   ExpressionGroup = require('../classes/excecution/expression/ExpressionGroup')
    ,   GetOperator = require('../classes/excecution/expression/GetOperator')
    ,   IfStatement = require('../classes/excecution/statements/IfStatement')
    ,   SequenceGroup = require('../classes/excecution/statements/SequenceGroup')
    ,   OutStatement = require('../classes/excecution/statements/OutStatement')
    ,   WhileStatement = require('../classes/excecution/statements/WhileStatement')
    ,   RepeatStatement = require('../classes/excecution/statements/RepeatStatement')
    ,   SetStatement = require('../classes/excecution/statements/SetStatement')
    ,   ResetStatement = require('../classes/excecution/statements/ResetStatement')
    ,   PushStatement = require('../classes/excecution/statements/PushStatement')
    ,   SequenceMainGroup = require('../classes/excecution/statements/SequenceMainGroup')
    ,   GroupOutStatement = require('../classes/excecution/expression/GroupOutStatement')
    ,   BreakStatement = require('../classes/excecution/statements/BreakStatement')
    ,   ContinueStatement = require('../classes/excecution/statements/ContinueStatement')
    ,   linker = require('../linker/linker')
    ,   lexer = require("../lexer/lexer")
    ,   LinkerData = require("../linker/LinkerData");

const KEYWORDS = [ 'true', 'false', 'null' ];

/**
 * Парсит вызов функции, возвращает объект вызова функции, и позицию с которой можно продолжить прасинг
 *
 * @param {Array<String|Number>} query_stack стек доступа к имени переменной
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<Token>} data Вхождения которые будут обработаны парсером
 * @param {Number} block_start Начальная позиция вызова
 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: FunctionCall, jump: Number}} объект вызова функции, и позиция с которой можно продолжить прасинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function parseFunctionCall(query_stack, start, data, reject, block_start) {
    const args = segmentationParser(
        start,
        data,
        reject,
        ",",
        Infinity,
        `(${query_stack.map((e) => (typeof e === "number" ? `[${e}]` : e)).join(" => ")})()`
    );

    return {
        data: new FunctionCall(query_stack, args.data, block_start),
        jump: args.jump,
    };
}
/**
 * Парсит литеральное объявление объекта
 *
 * ->
 *  key1 -> value1,
 *  key2 -> value2,
 *  key1 --> value1...
 *
 * @param {Number[]|String[]|Operand[]} query_stack путь к конструктору объекта
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<Token>} data Вхождения которые будут обработаны парсером
 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: ObjectContructorCall, jump: Number}} объект тернарного выражения, и позиция с которой можно продолжить прасинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function parseObject(
    query_stack, 
    start,
    data,
    reject, 
    level = 0
) {
    let result = null,
        count = 0,
        entries = new Array([]),
        last_row = start,
        expected = 0; // Ожидаемое следующие значение

    for (let i = start;; i++) {
        switch (true) {
            case 
                data[i] === undefined || 
                expected === 3 && !data[i].equals(CHARTYPE.OPERATOR, ',') ||
                data[i].equals(CHARTYPE.OPERATOR, [';', ')'])
            :
                if(entries.length == 1) {
                    if (entries[entries.length - 1].length == 0)
                        reject(data[i].position, new ParserUnfinishedNotationException());
                    else if (entries[entries.length - 1].length == 1)
                        return {
                            data: new ObjectContructorCall(query_stack, entries[0][0], data[start].position),
                            jump: i - start
                        };
                    else
                        return {
                            data: new ObjectContructorCall(query_stack, new Map(entries), data[start].position),
                            jump: i - start
                        };
                } else {
                    if (entries[entries.length - 1].length != 2)
                        reject(data[i].position, new ParserUnfinishedNotationException());

                    return {
                        data: new ObjectContructorCall(query_stack, new Map(entries), data[start].position),
                        jump: i - start
                    };
                }
            case data[i].equals(CHARTYPE.OPERATOR, '*') && expected === 0:
                if (entries.length !== 1)
                    reject(data[i].position, new BadEmptyObjectException());

                return {
                    data: new ObjectContructorCall(query_stack, new Map(), data[start].position),
                    jump: i - start
                };
            case data[i].equals(CHARTYPE.NEWLINE):
                continue;
            default:
                switch (expected) {
                    case 0:
                        if (
                            data[i].equals(CHARTYPE.WORD) ||
                            data[i].equals(CHARTYPE.STRING)
                        ) {
                            entries[entries.length - 1][0] = data[i].toRawString();
                        } else if (data[i].equals(CHARTYPE.NUMBER)) {
                            entries[entries.length - 1][0] = data[i].toRawString();
                        } else {
                            reject(data[i].position, new UnexpectedTokenException(data[i], '[Word]'));
                        }

                        expected = 1;
                    continue;
                    case 1:
                        count = countKeys(data, i, CHARTYPE.OPERATOR, '-');

                        // - ('-' * level)
                        if (count === level + 1) {
                            i += count;

                            if (!data[i].equals(CHARTYPE.OPERATOR, '>')) {
                                reject(data[i].position, new UnexpectedTokenException(data[i], '>'));
                            }

                            expected = 2;
                        } else {
                            entries.pop();

                            if (count < level + 1) {
                                return {
                                    data: new ObjectContructorCall(query_stack, new Map(entries), data[start].position),
                                    jump: last_row - start
                                };
                            } else {
                                reject(data[i].position, new BadArrowNotationJumpingToUpperLevel());
                            }
                        }
                    continue;
                    case 2:
                        count = countKeys(data, i + 1, CHARTYPE.OPERATOR, '-');

                        /// Если как значение передан инициализатор другого объекта
                        ///
                        /// some ->
                        ///     some1 --> 'some',
                        if (
                            data[i + level + 3] != null &&
                            (
                                data[i].equals(CHARTYPE.WORD) ||
                                data[i].equals(CHARTYPE.NUMBER)
                            ) &&
                            count === level + 2 &&
                            data[i + level + 3].equals(CHARTYPE.OPERATOR, '>')
                        ) {
                            result = parseObject(SERVICE.CONSTRUCTORS.OBJECT, i, data, reject, level + 1);

                            i += result.jump - 1;

                            entries[entries.length - 1][1] = result.data;

                            expected = 3;

                            /// Неправильная нотация
                            /// Попытка произвести нотация на два уровня выше чем родительская
                            ///
                        } else if (count > level + 2) {
                            reject(data[i + 1].position, new BadArrowNotationJumpingTwoLevels());
                            /// Если как значение передано выражение
                            ///
                            /// some -> 'somesome...';
                        } else {
                            result = parseExpression(i, data, reject, [',', ';']);

                            // Текущие данные ставим как результат парсинга выражения
                            entries[entries.length - 1][1] = result.data;

                            // Ожидаем следующий маркер
                            expected = 3;

                            // Отматываем маркер пасинга назад
                            if(data[i].equals(CHARTYPE.OPERATOR, ';')) {
                                // Перемщаем картку за символ ;
                                i += result.jump - 2;
                            } else {
                                // Перемещаем картку после возвращенного маркера
                                i += result.jump - 1;
                            }
                        }
                    continue;
                    case 3:
                        entries.push([]);

                        last_row = i;

                        expected = 0;
                    continue;
                }
                break;
        }
    }
}
/**
 * Парсит тернарное выражение, возвращает объект тернарного выражения, и позицию с которой можно продолжить прасинг
 *
 * @param {ExpressionGroup} condition Условие, при котором тернарное выражение будет верным
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<Token>} data Вхождения которые будут обработаны парсером
 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: TernarOperator, jump: Number}} объект тернарного выражения, и позиция с которой можно продолжить прасинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function parseTernar(condition, start, data, reject) {
    let hook_index = 0,
        buffer = new Array(),
        args = new Array();

    function push(token) {
        if (buffer.length !== 0) {
            args.push(parseExpression(0, buffer, reject).data);

            buffer.splice(0, buffer.length);
        } else {
            reject(
                token != undefined ? token.position : data[start].position,
                new ParserEmtyArgumentException()
            );
        }
    }

    for (let i = start;; i++) {
        switch (true) {
            case 
                data[i] === undefined ||
                data[i].equals(CHARTYPE.OPERATOR, ";") ||
                data[i].equals(CHARTYPE.NEWLINE) ||
                (
                    data[i].equals(CHARTYPE.OPERATOR, ")") &&
                    hook_index <= 0
                )
            :
                push(data[i]);

                if (args[0] === undefined || args[1] === undefined)
                    reject(
                        data[start].position,
                        new ParserEmtyArgumentException()
                    );

                return {
                    data: new TernarOperator(condition, args[0], args[1]),
                    jump: i -
                        start -
                        (data[i] && data[i].equals(CHARTYPE.OPERATOR, ")")
                            ? 1
                            : 0),
                };
            case data[i].equals(CHARTYPE.OPERATOR, "("):
                buffer.push(data[i]);

                hook_index++;
                break;
            case data[i].equals(CHARTYPE.OPERATOR, ")"):
                buffer.push(data[i]);

                hook_index--;
                break;
            case data[i].equals(CHARTYPE.OPERATOR, ":") &&
                hook_index === 0 &&
                args.length === 0:
                push(data[i]);
                break;
            case data[i].equals(CHARTYPE.OPERATOR, ":") &&
                hook_index === 0 &&
                args.length !== 0:
                reject(
                    data[i].position,
                    new ParserLogicException()
                );
                break;
            default:
                buffer.push(data[i]);
                break;
        }
    }
}

/**
 * Парсит групповой вывод <formatter?> <-? {  }
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<Token>} data Вхождения которые будут обработаны парсером
 * @param {?Array<String | ExpressionGroup>} path путь к обработчику, опционально
 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: GroupOutStatement, jump: Number}} массив со стэком запроса, по которому можно получит доступ к переменной, и позиция с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function parseGroupOut(
    entries,
    start,
    path,
    reject,
) {
    const segments = segmentCutter(start, entries, reject);

    return {
        data: new GroupOutStatement(segments.data, path, start),
        jump: segments.jump
    };
}

/**
 * Парсит название, позвращает массив со стэком запроса, по которому можно получит доступ к переменной, и позицию с которой можно продолжить парсинг
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<Token>} data Вхождения которые будут обработаны парсером
 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: Array<Number|String>, jump: Number}} массив со стэком запроса, по которому можно получит доступ к переменной, и позиция с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function parseVarName(start, data, reject) {
    let buffer = new Array(),
        point_before = true,
        hook_index = 0,
        hook_start = 0;

    if (data.length === 0)
        return {
            data: [],
            jump: 0,
        };

    for (let i = start;;i++) {
        maybeEquals(data, i, CHARTYPE.NEWLINE);

        switch (true) {
            case 
                data[i] == null 
                    ||
                (
                    point_before &&
                    !data[i].equals(CHARTYPE.WORD)
                ) 
                    ||
                (
                    !point_before &&
                    !data[i].equals(CHARTYPE.OPERATOR, "[") &&
                    !data[i].equals(CHARTYPE.POINT)
                )
            :
                return {
                    data: buffer,
                    jump: i - start,
                };
            case data[i].equals(CHARTYPE.WORD) && point_before:
                buffer.push(data[i].toString());

                point_before = !point_before;
                continue;
            case data[i].equals(CHARTYPE.POINT) && !point_before:
                point_before = !point_before;
                continue;
            case data[i].equals(CHARTYPE.OPERATOR, "[") && !point_before:
                i++;
                // Индекс скобок
                hook_index = 0;
                // Позиция начала парсинга
                hook_start = i;

                //
                // ...[3 + 4 + 5]...
                //    ^^^^^^^^^^
                while (
                    data[i] != null &&
                    !(
                        data[i].equals(CHARTYPE.OPERATOR, "]") &&
                        hook_index === 0
                    )
                ) {
                    if (data[i].equals(CHARTYPE.OPERATOR, "[")) {
                        hook_index++;
                    } else if (data[i].equals(CHARTYPE.OPERATOR, "]")) {
                        hook_index--;
                    }

                    i++;
                }

                if (hook_index != 0) {
                    reject(
                        data[i].position,
                        new ParserLogicException()
                    );
                }

                //
                // Вставляем выражение как оператор доступа
                //
                buffer.push(
                    parseExpression(0, data.slice(hook_start, i), reject)
                        .data
                );
                continue;
            default:
                reject(
                    data[i].position,
                    new InvalidSequenceForLetiableAccessException()
                );
                continue;
        }
    }
}
/**
 * Парсит выражение, позвращает выражение и позицию, с которой можно продолжить парсинг
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<Token>} entries Вхождения которые будут обработаны парсером
 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 * @param {String} end_marker Маркер конца выражения
 *
 * @returns {{data: ExpressionGroup, jump: Number}} выражение и позиция, с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function parseExpression(
    start,
    entries,
    reject,
    end_marker = ';'
) {
    if (entries.length === 0)
        return {
            data: new ExpressionGroup(0),
            jump: 0,
        };

    const buffer = new ExpressionGroup(entries[0].position)
        , result = new Array();

    for (let i = start;; i++) {
        if (
            entries[i] == undefined ||
            entries[i].equals(CHARTYPE.OPERATOR, ")") ||
            entries[i].contentEquals(end_marker)
        ) {
            if (buffer.isNotDone())
                reject(
                    entries[i - 1].position, 
                    entries[i] == undefined ?
                        new CriticalParserErrorUnexpectedEndOfInputException() : 
                        new CriticalParserErrorUnexpectedEndOfExpression()
                );

            buffer.complete(reject);

            return {
                data: buffer,
                jump: i - start,
            };
        }

        if(entries[i].equals(CHARTYPE.NEWLINE))
            continue;

        switch (true) {
            // Какое-то слово
            case entries[i].equals(CHARTYPE.WORD):
                // Ключевые слова
                if(KEYWORDS.includes(entries[i].toString())) {
                    buffer.append(entries[i], reject); continue;
                }

                //
                // Если не ключевое слово, то разбираем как название перемнной
                // 
                result[0] = parseVarName(i, entries, reject);

                // 
                // Проверяю следующий токен, если это (, значит впереди функция
                //
                if (
                    entries[i + result[0].jump] != null && 
                    entries[i + result[0].jump].equals(CHARTYPE.OPERATOR, "(")
                ) {
                    // Функция
                    result[1] = parseFunctionCall(
                        result[0].data,
                        i + result[0].jump + 1,
                        entries,
                        reject,
                        entries[i].position
                    );

                    i += result[0].jump + result[1].jump + 1;

                    buffer.append(result[1].data, reject);
                } else {
                    // 
                    // Если ->, значит конструктор объектта
                    // 
                    if(entries[i + result[0].jump + 1] != null) {
                        if(entries[i + result[0].jump].equals(CHARTYPE.OPERATOR, "-")) {
                            if(entries[i + result[0].jump + 1].equals(CHARTYPE.OPERATOR, ">")) {
                                // Конструктор объекта
                                result[1] = parseObject(
                                    result[0].data,
                                    i + result[0].jump + 2,
                                    entries,
                                    reject,
                                    0
                                );

                                i += result[0].jump + result[1].jump + 1;
                                
                                // 
                                // Если недопрыгнул
                                // 
                                if(entries[i + 1] && entries[i + 1].equals(CHARTYPE.OPERATOR, '*'))
                                    i += 1;

                                buffer.append(result[1].data, reject);
                            } else {
                                buffer.append(new GetOperator(entries[i].position, result[0].data), reject);

                                i += result[0].jump - 1;
                            }
                        // 
                        // Если <-, значит групповой вывод
                        // 
                        } else if(entries[i + result[0].jump].equals(CHARTYPE.OPERATOR, "<")) {
                            if(entries[i + result[0].jump + 1].equals(CHARTYPE.OPERATOR, "-")) {
                                result[1] = parseGroupOut(
                                    entries,
                                    i + result[0].jump + 3,
                                    result[0].data, 
                                    reject
                                );
            
                                i += result[0].jump + result[1].jump + 1;
            
                                buffer.append(result[1].data, reject);
                            } else {
                                buffer.append(new GetOperator(entries[i].position, result[0].data), reject);

                                i += result[0].jump - 1;
                            }
                        } else {
                            buffer.append(new GetOperator(entries[i].position, result[0].data), reject);

                            i += result[0].jump - 1;
                        }
                    } else {
                        buffer.append(new GetOperator(entries[i].position, result[0].data), reject);

                        i += result[0].jump - 1;
                    }
                }
            continue;
            //
            // Конструктор объекта
            //
            case 
                entries[i + 1] != null &&
                entries[i + 1].equals(CHARTYPE.OPERATOR, ">") &&
                maybeEquals(entries, i + 2, CHARTYPE.NEWLINE) &&
                entries[i].equals(CHARTYPE.OPERATOR, "-")
            :
                result[0] = parseObject(
                    SERVICE.CONSTRUCTORS.OBJECT,
                    i + 2,
                    entries,
                    reject,
                    0
                );

                i += result[0].jump + 2;

                buffer.append(result[0].data, reject);
            continue;
            //
            // Групповой вывод (без обработчика)
            //
            case 
                entries[i].equals(CHARTYPE.OPERATOR, "{")
            :
                result[0] = parseGroupOut(
                    entries,
                    i + 1,
                    null,
                    reject
                );

                i += result[0].jump + 1;

                buffer.append(result[0].data, reject);
            continue;
            //
            // Другая группа выражений
            //
            case entries[i].equals(CHARTYPE.OPERATOR, "("):
                result[0] = parseExpression(i + 1, entries, reject);

                i += result[0].jump + 1;

                buffer.append(result[0].data, reject);
            continue;
            //
            // Тернарное выражение
            //
            case entries[i].equals(CHARTYPE.OPERATOR, "?"):
                buffer.complete(reject);

                result[0] = parseTernar(
                    new ExpressionGroup(entries[i].position, buffer.data),
                    i + 1,
                    entries,
                    reject
                );

                return {
                    data: result[0].data,
                    jump: i - start + result[0].jump + 2,
                };
            //
            // Операторы строки числа и т.д
            //
            case 
                entries[i].equals(CHARTYPE.STRING) ||
                entries[i].equals(CHARTYPE.NUMBER) ||
                entries[i].equals(CHARTYPE.OPERATOR, [
                    "/",
                    "*",
                    "+",
                    "-",
                    "!=",
                    ">",
                    "<",
                    ">=",
                    "<=",
                    "=",
                    "|",
                    "&",
                ]):
                buffer.append(entries[i], reject);
            continue;
            //
            // Неизвестно что это, завершаем парсинг выражения на этом
            //
            default:
                if (buffer.isNotDone())
                    reject(entries[i - 1].position, new CriticalParserErrorUnexpectedEndOfExpression());

                buffer.complete(reject);

                return {
                    data: buffer,
                    jump: i - start
                };
        }
    }
}

/**
 * Парсит исполняемый сегмент, после чего возвращает величину прыжка и данные исполнения
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<Token>} entries Вхождения которые будут обработаны парсером
 * @param {Function} reject {@link CodeEmitter.throwError} - Вызывается при ошибке функция, котора первым аргументом принимает позицию вхождения на котором произошла ошибка
 * @param {String} segment_separator Разделитель для сегментов
 * @param {Number} max_segments Максимальное число сегментов, если это число сегментов будет превышено, будет выбражено исключение
 * @param {String} blockname Название блока
 *
 * @returns {{data: Array<ExpressionGroup>, jump: Number}} массив со стэком запроса, по которому можно получит доступ к переменной, и позиция с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function segmentationParser(
    start,
    entries,
    reject,
    segment_separator = ",",
    max_segments = Infinity,
    blockname = "unknown"
) {
    let hook_index = 0,
        buffer = [new Array()];

    for (let i = start;; i++) {
        if(entries[i] != null && entries[i].equals(CHARTYPE.NEWLINE))
            continue;

        switch (true) {
            case 
                entries[i] === undefined ||
                (
                    entries[i].equals(CHARTYPE.OPERATOR, ")") && 
                    hook_index <= 0
                )
            :
                if (buffer.length > 0 && buffer[buffer.length - 1].length > 0) {
                    buffer[buffer.length - 1] = parseExpression(
                        0,
                        buffer[buffer.length - 1],
                        reject
                    ).data;
                } else if (buffer.length > 1) {
                    reject(
                        entries[i - 1].position,
                        new SegmentationFaultEmptyArgumentException(blockname)
                    );
                } else {
                    buffer.splice(buffer.length - 1, 1);
                }

                return {
                    // Сегменты
                    data: buffer,
                    // Прыжок парсера
                    jump: i - start,
                };
            case entries[i].equals(CHARTYPE.OPERATOR, "("):
                hook_index++;

                buffer[buffer.length - 1].push(entries[i]);
                continue;
            case entries[i].equals(CHARTYPE.OPERATOR, ")"):
                if (hook_index > 0) {
                    hook_index--;

                    buffer[buffer.length - 1].push(entries[i]);
                }
                else
                    reject(
                        entries[i].position,
                        new ParserLogicException()
                    );
                continue;
            case 
                entries[i].contentEquals(segment_separator) &&
                hook_index === 0
            :
                    if (buffer[buffer.length - 1].length > 0) {
                        buffer[buffer.length - 1] = parseExpression(
                            0,
                            buffer[buffer.length - 1],
                            reject
                        ).data;

                        buffer.push(new Array());

                        if (buffer.length > max_segments)
                            reject(
                                entries[i].position,
                                new SegmentationFaultMaximumSegmentsForBlockException(blockname)
                            );
                    } else {
                        reject(
                            entries[i].position,
                            new SegmentationFaultEmptyArgumentException(blockname)
                        );
                    }
                break;
            default:
                buffer[buffer.length - 1].push(entries[i]);
                break;
        }
    }
}
/**
 * Используется для того, чтобы вырезать исполняемые сегменты из исполняемых блоков `{}`
 * 
 * ***Данные туда подаются исключая первую фигурную скобку - ...}***
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<Token>} entries Вхождения которые будут обработаны парсером
 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: Array<SequenceGroup>, jump: Number}} массив с выражениями, и позиция с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function segmentCutter(start, entries, reject) {
    let  hook_index = 0
    ,    body       = new Array();

    for (let i = start;; i++) {
        switch (true) {
            case 
                entries[i] === undefined ||
                (
                    entries[i].equals(CHARTYPE.OPERATOR, "}") &&
                    hook_index < 1
                )
            :
                return {
                    // Сегменты
                    data: codeBlockParser(0, body, reject).data,
                    // Прыжок парсера
                    jump: i - start,
                };
            case entries[i].equals(CHARTYPE.OPERATOR, "{"):
                hook_index++;

                body.push(entries[i]);
                continue;
            case entries[i].equals(CHARTYPE.OPERATOR, "}"):
                if (hook_index-- > 0) {
                    body.push(entries[i]);
                } else {
                    reject(
                        entries[i].position,
                        new ParserLogicException()
                    );
                }
                continue;
            default:
                body.push(entries[i]);
                continue;
        }
    }
}
/**
 * Парсит блок if, возвращзает серриализованый блок if.
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<Token>} entries Вхождения которые будут обработаны парсером
 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: IfStatement, jump: Number}} Объякт дескриптор блока if, и позиция с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function ifStatementParser(start, entries, reject) {
    let index = start,
        result = new Array();

    if (
        maybeEquals(entries, index + 1, CHARTYPE.NEWLINE) &&
        entries[index + 1].equals(CHARTYPE.OPERATOR, "(")
    ) {
        // statement ( ...parse... )
        result[0] = segmentationParser(
            index + 2,
            entries,
            reject,
            "",
            1,
            "if"
        );

        index += result[0].jump + 3;

        // { expression }
        if (maybeEquals(entries, index, CHARTYPE.NEWLINE) &&
            entries[index].equals(CHARTYPE.OPERATOR, "{")) {
            result[1] = segmentCutter(index + 1, entries, reject);

            index += result[1].jump + 1;

            // Else statement
            if (
                entries[index + 1] != null &&
                entries[index + 1].equals(CHARTYPE.WORD, "else")
            ) {
                // { expression }
                if (maybeEquals(entries, index + 2, CHARTYPE.NEWLINE) &&
                    entries[index + 2].equals(CHARTYPE.OPERATOR, "{")) {
                    result[2] = segmentCutter(index + 3, entries, reject);

                    index += result[2].jump + 3;

                    return {
                        data: new IfStatement(
                            result[0].data[0],
                            result[1].data,
                            result[2].data
                        ),
                        jump: index - start,
                    };

                // 
                // else if...
                // 
                } else if (
                    maybeEquals(entries, index + 2, CHARTYPE.NEWLINE) &&
                    entries[index + 2].equals(CHARTYPE.WORD, "if")
                ) {
                    result[2] = ifStatementParser(
                        index + 2,
                        entries,
                        reject
                    );

                    index += result[2].jump + 2;

                    return {
                        data: new IfStatement(
                            result[0].data[0],
                            result[1].data,
                            result[2].data
                        ),
                        jump: index - start,
                    };
                } else {
                    reject(
                        entries[index + 2].position,
                        new UnexpectedTokenStatement(
                            "else",
                            entries[index + 2].toString(),
                            "{"
                        )
                    );
                }
            } else {
                return {
                    data: new IfStatement(result[0].data[0], result[1].data),
                    jump: index - start,
                };
            }
        } else {
            reject(
                entries[index].position,
                new UnexpectedTokenStatement(
                    "if",
                    entries[index].toString(),
                    "{"
                )
            );
        }
    } else {
        reject(
            entries[index + 1].position,
            new UnexpectedTokenStatement(
                "if",
                entries[index + 1].toString(),
                "("
            )
        );
    }
}
/**
 * Парсит тело (главное тело или секции исполняемых блоков) преобразуя вхождения в исполняемую последовательность.
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<Token>} entries Вхождения которые будут обработаны парсером
 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {
 *      {
 *          data: SequenceGroup,
 *          jump: Number
 *      }
 * } Исполняемый стэк, и позиция с которой можно продолжить парсинг
 * @memberof Poonya.Parser
 * @protected
 */
function codeBlockParser(start, entries, reject) {
    const buffer = new SequenceGroup()
        , result = new Array();

    for (let i = start, leng = entries.length;; i++) {
        try {
            if (entries[i] == null) {
                return {
                    data: buffer,
                    jump: i - start,
                };
            }

            switch (true) {
                case entries[i].equals(CHARTYPE.NEWLINE) || entries[i].equals(CHARTYPE.OPERATOR, ';'):
                    continue;
                case entries[i].equals(CHARTYPE.OPERATOR, ">"):
                    result[0] = parseExpression(i + 1, entries, reject);

                    i += result[0].jump + 1;

                    buffer.push(new OutStatement(result[0].data));
                    continue;
                case entries[i].equals(CHARTYPE.WORD, "if"):
                    result[0] = ifStatementParser(i, entries, reject);

                    i += result[0].jump;

                    buffer.push(result[0].data);
                    continue;
                case entries[i].equals(CHARTYPE.WORD, 'use'):
                    result[0] = parseExpression(i + 1, entries, reject);

                    buffer.push(new UseStatement(entries[i + 1].position, result[0].data));

                    i += result[0].jump + 1;
                    continue;
                break;
                case entries[i].equals(CHARTYPE.WORD, "while"):
                    if (
                        i + 1 < leng &&
                        maybeEquals(entries, i + 1, CHARTYPE.NEWLINE) &&
                        entries[i + 1].equals(CHARTYPE.OPERATOR, "(")
                    ) {

                        //
                        // statement ( ...parse... )
                        //
                        result[0] = segmentationParser(
                            i + 2,
                            entries,
                            reject,
                            "",
                            1,
                            "while"
                        );

                        i += result[0].jump + 3;

                        // { expression }
                        if (
                            maybeEquals(entries, i, CHARTYPE.NEWLINE) &&
                            entries[i].equals(CHARTYPE.OPERATOR, "{")
                        ) {
                            result[1] = segmentCutter(
                                i + 1,
                                entries,
                                reject
                            );

                            i += result[1].jump + 1;

                            buffer.push(
                                new WhileStatement(
                                    result[0].data[0],
                                    result[1].data
                                )
                            );
                        } else {
                            reject(
                                entries[i].position,
                                new UnexpectedTokenStatement(
                                    "while",
                                    entries[i].toString(),
                                    "{"
                                )
                            );
                        }
                    } else {
                        reject(
                            entries[i + 1].position,
                            new UnexpectedTokenStatement(
                                "while",
                                entries[i + 1].toString(),
                                "("
                            )
                        );
                    }
                    continue;
                case entries[i].equals(CHARTYPE.WORD, "repeat"):
                    if (
                        i + 1 < leng &&
                        maybeEquals(entries, i + 1, CHARTYPE.NEWLINE) &&
                        entries[i + 1].equals(CHARTYPE.OPERATOR, "(")
                    ) {
                        //
                        // statement ( ...parse... )
                        //
                        result[0] = segmentationParser(
                            i + 2,
                            entries,
                            reject,
                            [ 
                                ";", 
                                ','
                            ],
                            2,
                            "repeat"
                        );

                        i += result[0].jump + 3;

                        if(result[0].data.length < 2)
                            reject(entries[i].position, new ParserEmtyArgumentException());

                        // { expression }
                        if (
                            maybeEquals(entries, i, CHARTYPE.NEWLINE) &&
                            entries[i].equals(CHARTYPE.OPERATOR, "{")
                        ) {
                            result[1] = segmentCutter(
                                i + 1,
                                entries,
                                reject
                            );

                            i += result[1].jump + 1;

                            buffer.push(
                                new RepeatStatement(
                                    result[0].data[0],
                                    result[0].data[1],
                                    result[1].data
                                )
                            );
                        } else {
                            reject(
                                entries[i].position,
                                new UnexpectedTokenStatement(
                                    "repeat",
                                    entries[i].toString(),
                                    "{"
                                )
                            );
                        }
                    } else {
                        reject(
                            entries[i + 1].position,
                            new UnexpectedTokenStatement(
                                "repeat",
                                entries[i + 1].toString(),
                                "("
                            )
                        );
                    }
                    continue;
                case entries[i].equals(CHARTYPE.WORD, "set"):
                    if (
                        i + 1 < leng &&
                        maybeEquals(entries, i + 1, CHARTYPE.NEWLINE) &&
                        entries[i + 1].equals(CHARTYPE.WORD)
                    ) {
                        if (
                            i + 2 < leng &&
                            maybeEquals(entries, i + 2, CHARTYPE.NEWLINE) &&
                            entries[i + 2].equals(CHARTYPE.OPERATOR, "=")
                        ) {
                            result[0] = parseExpression(
                                i + 3,
                                entries,
                                reject
                            );

                            buffer.push(
                                new SetStatement(entries[i + 1], result[0].data)
                            );

                            i += result[0].jump + 3;

                            continue;
                        } else {
                            reject(
                                entries[i + 3].position,
                                new UnexpectedWordTypeAndGetException(entries[i + 2].toString(), entries[i + 2].type)
                            );
                        }
                    } else {
                        reject(
                            entries[i + 2].position,
                            new UnexpectedWordTypeAndGetException(entries[i + 1].toString(), entries[i + 1].type)
                        );
                    }
                    continue;
                //
                // Оператор break
                //
                case entries[i].equals(CHARTYPE.WORD, 'break'):
                    buffer.push(
                        new BreakStatement(entries[i].position)
                    );
                    continue;
                //
                // Оператор continue
                //
                case entries[i].equals(CHARTYPE.WORD, 'continue'):
                    buffer.push(
                        new ContinueStatement(entries[i].position)
                    );
                    continue;
                // 
                // Текущий - слово
                // 
                case entries[i].equals(CHARTYPE.WORD):
                    result[0] = parseVarName(i, entries, reject);

                    //
                    // Если следующий символ доступен
                    //
                    if (i + result[0].jump < leng) {
                        //
                        // Переопределение
                        //
                        if (
                            entries[i + result[0].jump].equals(
                                CHARTYPE.OPERATOR,
                                "="
                            )
                        ) {
                            result[1] = parseExpression(
                                result[0].jump + i + 1,
                                entries,
                                reject
                            );

                            buffer.push(
                                new ResetStatement(
                                    entries[i + result[0].jump].position,
                                    result[0].data,
                                    result[1].data
                                )
                            );

                            i += result[0].jump + result[1].jump + 1;

                        //
                        // Добавление <-
                        //
                        } else if (
                            entries[i + result[0].jump].equals(
                                CHARTYPE.OPERATOR,
                                "<"
                            )
                        ) {
                            if (
                                entries[i + result[0].jump + 1].equals(
                                    CHARTYPE.OPERATOR,
                                    "-"
                                )
                            ) {
                                if(
                                    entries[i + result[0].jump + 2].equals(
                                        CHARTYPE.OPERATOR,
                                        "{"
                                    )
                                ) {
                                    result[0] = parseExpression(i, entries, reject);

                                    buffer.push(result[0].data);
    
                                    i += result[0].jump;
                                } else {
                                    result[1] = parseExpression(
                                        result[0].jump + i + 2,
                                        entries,
                                        reject
                                    );

                                    buffer.push(
                                        new PushStatement(
                                            entries[i + result[0].jump].position,
                                            result[0].data,
                                            result[1].data
                                        )
                                    );

                                    i += result[0].jump + result[1].jump + 2;
                                }
                            } else {
                                reject(
                                    entries[i + result[0].jump + 1].position,
                                    new UnexpectedTokenException(
                                        entries[i + result[0].jump + 1].toString(),
                                        "-"
                                    )
                                );
                            }
                            
                        // 
                        // Конструктор объекта 
                        // 
                        } else if (
                            entries[i + result[0].jump].equals(
                                CHARTYPE.OPERATOR,
                                "-"
                            )
                        ) {
                            if (
                                entries[i + result[0].jump + 1].equals(
                                    CHARTYPE.OPERATOR,
                                    ">"
                                )
                            ) {
                                result[0] = parseExpression(i, entries, reject);

                                buffer.push(result[0].data);

                                i += result[0].jump;
                            } else {
                                reject(
                                    entries[i + result[0].jump + 1].position,
                                    new UnexpectedTokenException(
                                        entries[i + result[0].jump + 1].toString(),
                                        "-"
                                    )
                                );
                            }

                        //
                        // Вызов функции
                        //
                        } else if (
                            entries[i + result[0].jump].equals(
                                CHARTYPE.OPERATOR,
                                "("
                            )
                        ) {
                            result[1] = parseExpression(
                                i,
                                entries,
                                reject
                            );

                            buffer.push(result[1].data);

                            i += result[1].jump;
                                
                        //
                        // Ошибка
                        //
                        } else {
                            reject(
                                entries[i].position,
                                new InvalidSequenceForLetiableAccessException()
                            );
                        }
                    } else {
                        i += result[0].jump;
                    }
                    continue;
                case 
                    entries[i].equals(CHARTYPE.NUMBER) ||
                    entries[i].equals(CHARTYPE.STRING) ||
                    entries[i].equals(CHARTYPE.WORD, ['true', 'false', 'null']) ||
                    entries[i].equals(CHARTYPE.OPERATOR, "{")
                :
                    result[0] = parseExpression(i, entries, reject);

                    buffer.push(result[0].data);

                    i += result[0].jump;
                    continue;
                default:
                    reject(
                        entries[i].position,
                        new UnexpectedTokenException(
                            entries[i].toString(),
                            "*"
                        )
                    );
            }
        } catch (e) {
            if(SERVICE.CONFIG.DEBUG)
                console.trace(e);

            if (e instanceof PoonyaException) {
                throw e;
            } else {
                if (entries.length != 0) {
                    if (entries[i] != null)
                        reject(entries[i].position, new CriticalParserErrorException());
                    else
                        reject(
                            entries[entries.length - 1].position,
                            new CriticalParserErrorUnexpectedEndOfInputException()
                        );
                } else {
                    reject(
                        0,
                        new CriticalParserErrorNoRawDataTransmittedException()
                    );
                }
            }
        }
    }
}
/**
 * Парсит вхождения, которые можно получить вызовом функции @see {@link lexer}
 *
 * @param {String} input Входящая строка для разбора
 * @param {?String} parent_path Путь к шаблону
 *
 * @returns {ParserData} Тело исполнителя
 *
 * @memberof Poonya.Parser
 * @protected
 * @async
 */
async function parser(input, parent_path) {
    const linked    = await linker(lexer(toBytes(input), false), parent_path, throwError);
    const data      = new ParserData(linked);
    const reject    = throwError.bind({ data: data, path: parent_path, input });

    data.sequense = new SequenceMainGroup(
                        codeBlockParser(
                            0,
                            linked.contents,
                            reject
                        ).data.Sequence
                    ).__sync(reject)

    return data;
}

/**
 * Парсит шаблон сообщения, которое помимо кода Poonya может содержать и любые другие символы вне префикса.
 * 
 * @param {String} input Входящая строка для разбора
 * @param {String} block_prefix Префикс для обозначения начала блока кода poonya
 * @param {String} parent_path Путь к шаблону
 * 
 * @returns {SequenceMainGroup} Тело исполнителя
 *
 * @memberof Poonya.Parser
 * @protected
 * @async
 */
async function parserMP(input, block_prefix, parent_path) {
    let   hook_index    = 0
        , buffer        = new Array()
        , out           = new SequenceMainGroup()
        , chuncks       = new Array()
        , entries       = lexer(toBytes(input), true)
        , reject        = throwError.bind({ path: parent_path, input });;

    for (let i = 0;; i++) {
        if(entries[i] == null)
            break;

        if (
            (
                block_prefix == null &&
                entries[i].equals(CHARTYPE.OPERATOR, "{") ||
                block_prefix != null && 
                entries[i].contentEquals(block_prefix.toString()) &&
                (
                    entries[i + 1].equals(CHARTYPE.OPERATOR, "{") ||
                    entries[i + 1].equals(CHARTYPE.SPACE) &&
                    entries[i + 2].equals(CHARTYPE.OPERATOR, "{")
                )
            ) &&
            hook_index === 0
        ) {
            if(block_prefix != null)
                i += entries[i + 1].equals(CHARTYPE.SPACE) ? 2 : 1;

            if (buffer.length > 0) {
                out.push(new OutStatement(new ObjectContructorCall(SERVICE.CONSTRUCTORS.STRING, buffer.join(""), entries[i].position)));

                buffer.splice(0, buffer.length);
            }

            hook_index++;

            continue;
        } else if (
            entries[i].equals(CHARTYPE.OPERATOR, "}") &&
            hook_index === 1
        ) {
            const tmp_linked    = await linker(buffer.filter((e) => e.type !== CHARTYPE.SPACE), parent_path, throwError);
            const tmp_data      = new ParserData(tmp_linked);
            const reject        = throwError.bind({ data: tmp_data, path: parent_path, input });

            out.push(
                codeBlockParser(
                    0,
                    tmp_linked.contents,
                    reject
                ).data
            );

            buffer.splice(0, buffer.length);

            chuncks.push(...tmp_linked.chuncks);

            hook_index--;

            continue;
        } else {
            if(hook_index >= 1)
                switch (true) {
                    case entries[i].equals(CHARTYPE.OPERATOR, "{"):
                        hook_index++;
                        break;
                    case entries[i].equals(CHARTYPE.OPERATOR, "}"):
                        hook_index--;
                        break;
                }
        }

        if (!hook_index === 0) 
            buffer.push(entries[i].toString());
        else 
            buffer.push(entries[i]);
    }

    if (buffer.length !== 0)
        if (hook_index === 1) {
            const tmp_linked    = await linker(buffer.filter((e) => e.type !== CHARTYPE.SPACE), parent_path, reject);
            const tmp_data      = new ParserData(tmp_linked);
            const reject        = throwError.bind({ data: tmp_data, path: parent_path, input });

            out.push(
                codeBlockParser(
                    0,
                    tmp_linked.contents,
                    reject
                ).data
            );

            chuncks.push(...tmp_linked.chuncks);

            buffer.splice(0, buffer.length);
        } else if (hook_index === 0) {
            if(buffer.length != 0) {
                out.push(
                    new OutStatement(
                        new ObjectContructorCall(
                            SERVICE.CONSTRUCTORS.STRING, 
                            buffer.join(""), 
                            entries[entries.length - 1].position
                        )
                    )
                );

                buffer.splice(0, buffer.length);
            }
        } else {
            reject(
                entries[entries.length - 1].position,
                new UnexpectedTokenException(entries[entries.length - 1], "}"),
            );
        }

    const synced = out.__sync(reject);

    return new ParserData(new LinkerData(synced, chuncks), synced);
}


module.exports.parser = parser;
module.exports.parserMP = parserMP;
module.exports.parseExpression = parseExpression;
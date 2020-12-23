/**
 * @file src/parser.js
 * @description Содержит в себе парсер исходного кода poonya, на выходе экспортируемых функций можно получить либо выражение, либо главную исполняемую последовательность
 * @license MIT
 * @author Astecom
 */

const { 
        ParserException
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
    ,   CriticalParserErrorNoRawDataTransmittedException,
    CriticalParserErrorUnexpectedEndOfExpression
    } = require('./classes/exceptions'),
    { 
        maybeEquals
    ,   countKeys
    } = require('./utils'),
    {
        CHARTYPE
    ,   SERVICE
    } = require('./classes/static')
    ,   FunctionCall = require('./classes/excecution/expression/FunctionCall')
    ,   ObjectContructorCall = require('./classes/excecution/expression/ObjectContructorCall')
    ,   TernarOperator = require('./classes/excecution/expression/TernarOperator')
    ,   ExpressionGroup = require('./classes/excecution/expression/ExpressionGroup')
    ,   GetOperator = require('./classes/excecution/expression/GetOperator')
    ,   IfStatement = require('./classes/excecution/statements/IfStatement')
    ,   SequenceGroup = require('./classes/excecution/statements/SequenceGroup')
    ,   OutOperator = require('./classes/excecution/statements/OutOperator')
    ,   WhileStatement = require('./classes/excecution/statements/WhileStatement')
    ,   RepeatStatement = require('./classes/excecution/statements/RepeatStatement')
    ,   SetOperator = require('./classes/excecution/statements/SetOperator')
    ,   ResetOperator = require('./classes/excecution/statements/ResetOperator')
    ,   PushOperator = require('./classes/excecution/statements/PushOperator')
    ,   SequenceMainGroup = require('./classes/excecution/statements/SequenceMainGroup')
    ,   linker = require('./linker');

/**
 * Парсит вызов функции, возвращает объект вызова функции, и позицию с которой можно продолжить прасинг
 *
 * @param {Array<String|Number>} query_stack стек доступа к имени переменной
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Number} block_start Начальная позиция вызова
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: FunctionCall, jump: Number}} объект вызова функции, и позиция с которой можно продолжить прасинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function parseFunctionCall(query_stack, start, data, throw_error, block_start) {
    const args = segmentationParser(
        start,
        data,
        throw_error,
        ",",
        Infinity,
        `Function (${query_stack.map((e) => (typeof e === "number" ? `[${e}]` : e)).join(" => ")})`
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
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: ObjectContructorCall, jump: Number}} объект тернарного выражения, и позиция с которой можно продолжить прасинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function parseObject(query_stack, start, data, throw_error, level = 0) {
    let result = null,
        count = 0,
        entries = new Array([]),
        last_row = start,
        expected = 0; // Ожидаемое следующие значение

    for (let i = start; true; i++) {
        switch (true) {
            case 
                data[i] === undefined || 
                expected === 3 && !data[i].equals(CHARTYPE.OPERATOR, ',') ||
                data[i].equals(CHARTYPE.OPERATOR, [';', ')']):
                if (entries[entries.length - 1].length !== 2)
                    throw_error(data[i].position, new ParserEmtyArgumentException());

                console.log(data[i], i, data[i - 1])

                return {
                    data: new ObjectContructorCall(query_stack, new Map(entries), data[start].position),
                    jump: i - start
                };
            case data[i].equals(CHARTYPE.OPERATOR, '*') && expected === 0:
                if (entries.length !== 1)
                    throw_error(data[i].position, new BadEmptyObjectException());

                return {
                    data: new ObjectContructorCall(query_stack, new Map(), data[start].position),
                    jump: i - start
                };
            case data[i].equals(CHARTYPE.NEWLINE):
                continue;
            default:
                switch (expected) {
                    case 0:
                        if (data[i].equals(CHARTYPE.WORD) || data[i].equals(CHARTYPE.STRING)) {
                            entries[entries.length - 1][0] = data[i].toRawString();
                        } else if (data[i].equals(CHARTYPE.NUMBER)) {
                            entries[entries.length - 1][0] = parseInt(data[i].toRawString());
                        } else {
                            throw_error(data[i].position, new UnexpectedTokenException(data[i], '[Word]'));
                        }

                        expected = 1;
                    continue;
                    case 1:
                        count = countKeys(data, i, CHARTYPE.OPERATOR, '-');

                        // - ('-' * level)
                        if (count === level + 1) {
                            i += count;

                            if (!data[i].equals(CHARTYPE.OPERATOR, '>')) {
                                throw_error(data[i].position, new UnexpectedTokenException(data[i], '>'));
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
                                throw_error(data[i].position, new BadArrowNotationJumpingToUpperLevel());
                            }
                        }
                    continue;
                    case 2:
                        count = countKeys(data, i + 1, CHARTYPE.OPERATOR, '-');

                        /// Если как значение передан инициализатор другого объекта
                        ///
                        /// some ->
                        ///     some1 --> 'some',
                        if (data[i + level + 3] != null &&
                            (
                                data[i].equals(CHARTYPE.WORD) ||
                                data[i].equals(CHARTYPE.NUMBER)
                            ) &&
                            count === level + 2 &&
                            data[i + level + 3].equals(CHARTYPE.OPERATOR, '>')) {
                            result = parseObject(SERVICE.CONSTRUCTORS.OBJECT, i, data, throw_error, level + 1);

                            i += result.jump - 1;

                            entries[entries.length - 1][1] = result.data;

                            expected = 3;

                            /// Неправильная нотация
                            /// Попытка произвести нотация на два уровня выше чем родительская
                            ///
                        } else if (count > level + 2) {
                            throw_error(data[i + 1].position, new BadArrowNotationJumpingTwoLevels());
                            /// Если как значение передано выражение
                            ///
                            /// some -> 'somesome...';
                        } else {
                            result = parseExpression(i, data, throw_error, [',', ';']);

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
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: TernarOperator, jump: Number}} объект тернарного выражения, и позиция с которой можно продолжить прасинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function parseTernar(condition, start, data, throw_error) {
    let hook_index = 0,
        buffer = new Array(),
        args = new Array();

    function push(token) {
        if (buffer.length !== 0) {
            args.push(parseExpression(0, buffer, throw_error).data);

            buffer.splice(0, buffer.length);
        }
        else
            throw_error(
                token != undefined ? token.position : data[start],
                new ParserEmtyArgumentException()
            );
    }

    for (let i = start; true; i++) {
        switch (true) {
            case data[i] === undefined ||
                data[i].equals(CHARTYPE.OPERATOR, ";") ||
                data[i].equals(CHARTYPE.NEWLINE) ||
                (
                    data[i].equals(CHARTYPE.OPERATOR, ")") &&
                    hook_index <= 0
                ):
                push(data[i]);

                if (args[0] === undefined || args[1] === undefined)
                    throw_error(
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
                throw_error(
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
 * Парсит название, позвращает массив со стэком запроса, по которому можно получит доступ к переменной, и позицию с которой можно продолжить парсинг
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: Array<Number|String>, jump: Number}} массив со стэком запроса, по которому можно получит доступ к переменной, и позиция с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function parseVarName(start, data, throw_error) {
    let buffer = new Array(),
        point_before = true,
        hook_index = 0,
        hook_start = 0;

    if (data.length === 0)
        return {
            data: [],
            jump: 0,
        };

    for (let i = start; true; i++) {
        switch (true) {
            case data[i] == null ||
                (data[i].equals(CHARTYPE.OPERATOR) &&
                    !data[i].equals(CHARTYPE.OPERATOR, ["[", "]"])) ||
                data[i].equals(CHARTYPE.NEWLINE) ||
                data[i].equals(CHARTYPE.SPACE):
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

                // ...[3 + 4 + 5]...
                //    ^^^^^^^^^^
                while (data[i] != null &&
                    !(
                        data[i].equals(CHARTYPE.OPERATOR, "]") &&
                        hook_index === 0
                    )) {
                    if (data[i].equals(CHARTYPE.OPERATOR, "["))
                        hook_index++;
                    else if (data[i].equals(CHARTYPE.OPERATOR, "]"))
                        hook_index--;

                    i++;
                }

                if (hook_index != 0)
                    throw_error(
                        data[i].position,
                        new ParserLogicException()
                    );

                // Вставляем выражение как оператор доступа
                buffer.push(
                    parseExpression(0, data.slice(hook_start, i), throw_error)
                        .data
                );
                continue;
            default:
                throw_error(
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
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 * @param {String} end_marker Маркер конца выражения
 *
 * @returns {{data: ExpressionGroup, jump: Number}} выражение и позиция, с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function parseExpression(start, data, throw_error, end_marker = ';') {
    if (data.length === 0)
        return {
            data: new ExpressionGroup(0),
            jump: 0,
        };

    const buffer = new ExpressionGroup(data[0].position)
        , result = new Array();

    for (let i = start; true; i++) {
        if (
            data[i] == undefined ||
            data[i].equals(CHARTYPE.OPERATOR, ")") ||
            data[i].contentEquals(end_marker)
        ) {
            if (buffer.isNotDone())
                throw_error(data[i - 1].position, data[i] == undefined ? new CriticalParserErrorUnexpectedEndOfInputException() : new CriticalParserErrorUnexpectedEndOfExpression());

            buffer.complete(throw_error);

            return {
                data: buffer,
                jump: i - start,
            };
        }

        if(data[i].equals(CHARTYPE.NEWLINE))
            continue;

        switch (true) {
            // Какое-то слово
            case data[i].equals(CHARTYPE.WORD):
                // Ключевые слова
                switch (data[i].toString()) {
                    case "true": case "false": case "null":
                        buffer.append(data[i], throw_error);
                        continue;
                }

                result[0] = parseVarName(i, data, throw_error);

                if (data[i + result[0].jump] != null && data[i + result[0].jump].equals(CHARTYPE.OPERATOR, "(")) {
                    // Функция
                    result[1] = parseFunctionCall(
                        result[0].data,
                        i + result[0].jump + 1,
                        data,
                        throw_error,
                        data[i].position
                    );

                    i += result[0].jump + result[1].jump + 1;

                    buffer.append(result[1].data, throw_error);
                } else if (
                    data[i + result[0].jump + 1] != null &&
                    data[i + result[0].jump].equals(CHARTYPE.OPERATOR, "-") &&
                    data[i + result[0].jump + 1].equals(CHARTYPE.OPERATOR, ">")
                ) {

                    // Конструктор объекта
                    result[1] = parseObject(
                        result[0].data,
                        i + result[0].jump + 2,
                        data,
                        throw_error,
                        0
                    );

                    i += result[0].jump + result[1].jump + 1;

                    buffer.append(result[1].data, throw_error);
                } else {
                    // Получение значения переменной
                    buffer.append(new GetOperator(data[i].position, result[0].data), throw_error);

                    i += result[0].jump - 1;
                }
            continue;
            // Конструктор объекта
            case data[i + 1] != null &&
                data[i].equals(CHARTYPE.OPERATOR, "-") &&
                data[i + 1].equals(CHARTYPE.OPERATOR, ">"):
                // Конструктор объекта
                result[0] = parseObject(
                    SERVICE.CONSTRUCTORS.OBJECT,
                    i + 2,
                    data,
                    throw_error,
                    0
                );

                i += result[0].jump + 2;

                buffer.append(result[0].data, throw_error);

            continue;
            // Другая группа выражений
            case data[i].equals(CHARTYPE.OPERATOR, "("):
                result[0] = parseExpression(i + 1, data, throw_error);

                i += result[0].jump + 1;

                buffer.append(result[0].data, throw_error);
            continue;
            // Тернарное выражение
            case data[i].equals(CHARTYPE.OPERATOR, "?"):
                buffer.complete(throw_error);

                result[0] = parseTernar(
                    new ExpressionGroup(data[i].position, buffer.data),
                    i + 1,
                    data,
                    throw_error
                );

                return {
                    data: result[0].data,
                    jump: i - start + result[0].jump + 2,
                };
            // Операторы строки числа и т.д
            case data[i].equals(CHARTYPE.STRING) ||
                data[i].equals(CHARTYPE.NUMBER) ||
                data[i].equals(CHARTYPE.OPERATOR, [
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
                buffer.append(data[i], throw_error);
            continue;
            // Неизвестно что это, завершаем парсинг выражения на этом
            default:
                if (buffer.isNotDone())
                    throw_error(data[i - 1].position, new CriticalParserErrorUnexpectedEndOfExpression());

                buffer.complete(throw_error);

                return {
                    data: buffer,
                }
        }
    }
}

/**
 * Парсит исполняемый сегмент, после чего возвращает величину прыжка и данные исполнения
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error {@link CodeEmitter.throwError} - Вызывается при ошибке функция, котора первым ��ргументм принимает позицию вхождения на котором произошла ошибка
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
    throw_error,
    segment_separator = ",",
    max_segments = Infinity,
    blockname = "unknown"
) {
    let hook_index = 0,
        buffer = [new Array()];

    for (let i = start; true; i++) {
        if(entries[i].equals(CHARTYPE.NEWLINE))
            continue;

        switch (true) {
            case entries[i] === undefined ||
                (entries[i].equals(CHARTYPE.OPERATOR, ")") && hook_index <= 0):
                if (buffer.length > 0 && buffer[buffer.length - 1].length > 0) {
                    buffer[buffer.length - 1] = parseExpression(
                        0,
                        buffer[buffer.length - 1],
                        throw_error
                    ).data;
                } else if (buffer.length > 1) {
                    throw_error(
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
                    throw_error(
                        entries[i].position,
                        new ParserLogicException()
                    );
                continue;
            case entries[i].contentEquals(segment_separator) &&
                hook_index === 0:
                    if (buffer[buffer.length - 1].length > 0) {
                        buffer[buffer.length - 1] = parseExpression(
                            0,
                            buffer[buffer.length - 1],
                            throw_error
                        ).data;

                        buffer.push(new Array());

                        if (buffer.length > max_segments)
                            throw_error(
                                entries[i].position,
                                new SegmentationFaultMaximumSegmentsForBlockException(blockname)
                            );
                    } else {
                        throw_error(
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
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: Array<SequenceGroup>, jump: Number}} массив с выражениями, и позиция с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function segmentCutter(start, entries, throw_error) {
    let hook_index = 0,
        body = new Array();

    for (let i = start; true; i++) {
        switch (true) {
            case entries[i] === undefined ||
                (entries[i].equals(CHARTYPE.OPERATOR, "}") && hook_index <= 0):
                return {
                    // Сегменты
                    data: codeBlockParser(0, body, throw_error).data,
                    // Прыжок парсера
                    jump: i - start,
                };
            case entries[i].equals(CHARTYPE.OPERATOR, "{"):
                hook_index++;

                body.push(entries[i]);
                continue;
            case entries[i].equals(CHARTYPE.OPERATOR, "}"):
                if (hook_index > 0) {
                    hook_index--;

                    body.push(entries[i]);
                }
                else
                    throw_error(
                        entries[i].position,
                        new ParserLogicException()
                    );
                continue;
            default:
                body.push(entries[i]);
                break;
        }
    }
}
/**
 * Парсит блок if, возвращзает серриализованый блок if.
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: IfStatement, jump: Number}} Объякт дескриптор блока if, и позиция с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */
function ifStatementParser(start, entries, throw_error) {
    let index = start,
        result = new Array();

    if (maybeEquals(entries, index + 1, CHARTYPE.NEWLINE) &&
        entries[index + 1].equals(CHARTYPE.OPERATOR, "(")) {
        // statement ( ...parse... )
        result[0] = segmentationParser(
            index + 2,
            entries,
            throw_error,
            "",
            1,
            "if"
        );

        index += result[0].jump + 3;

        // { expression }
        if (maybeEquals(entries, index, CHARTYPE.NEWLINE) &&
            entries[index].equals(CHARTYPE.OPERATOR, "{")) {
            result[1] = segmentCutter(index + 1, entries, throw_error);

            index += result[1].jump + 1;

            // Else statement
            if (entries[index + 1] != null &&
                entries[index + 1].equals(CHARTYPE.WORD, "else")) {
                // { expression }
                if (maybeEquals(entries, index + 2, CHARTYPE.NEWLINE) &&
                    entries[index + 2].equals(CHARTYPE.OPERATOR, "{")) {
                    result[2] = segmentCutter(index + 3, entries, throw_error);

                    index += result[2].jump + 3;

                    return {
                        data: new IfStatement(
                            result[0].data[0],
                            result[1].data,
                            result[2].data
                        ),
                        jump: index - start,
                    };
                } else if (maybeEquals(entries, index + 2, CHARTYPE.NEWLINE) &&
                    entries[index + 2].equals(CHARTYPE.WORD, "if")) {
                    result[2] = ifStatementParser(
                        index + 2,
                        entries,
                        throw_error
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
                    throw_error(
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
            throw_error(
                entries[index].position,
                new UnexpectedTokenStatement(
                    "if",
                    entries[index].toString(),
                    "{"
                )
            );
        }
    } else {
        throw_error(
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
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
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
function codeBlockParser(start, entries, throw_error) {
    const buffer = new SequenceGroup(),
        result = new Array();

    for (let i = start, leng = entries.length; true; i++) {
        try {
            if (entries[i] == null) {
                return {
                    data: buffer,
                    jump: i - start,
                };
            }

            switch (true) {
                case entries[i].equals(CHARTYPE.NEWLINE):
                    continue;
                case entries[i].equals(CHARTYPE.OPERATOR, ">"):
                    result[0] = parseExpression(i + 1, entries, throw_error);

                    i += result[0].jump + 1;

                    buffer.push(new OutOperator(result[0].data));
                    continue;
                case entries[i].equals(CHARTYPE.WORD, "if"):
                    result[0] = ifStatementParser(i, entries, throw_error);

                    i += result[0].jump;

                    buffer.push(result[0].data);
                    continue;
                case entries[i].equals(CHARTYPE.WORD, "while"):
                    if (i + 1 < leng &&
                        maybeEquals(entries, i + 1, CHARTYPE.NEWLINE) &&
                        entries[i + 1].equals(CHARTYPE.OPERATOR, "(")) {
                        // statement ( ...parse... )
                        result[0] = segmentationParser(
                            i + 2,
                            entries,
                            throw_error,
                            "",
                            1,
                            "while"
                        );

                        i += result[0].jump + 3;

                        // { expression }
                        if (maybeEquals(entries, i, CHARTYPE.NEWLINE) &&
                            entries[i].equals(CHARTYPE.OPERATOR, "{")) {
                            result[1] = segmentCutter(
                                i + 1,
                                entries,
                                throw_error
                            );

                            i += result[1].jump + 1;

                            buffer.push(
                                new WhileStatement(
                                    result[0].data[0],
                                    result[1].data
                                )
                            );
                        } else {
                            throw_error(
                                entries[i].position,
                                new UnexpectedTokenStatement(
                                    "while",
                                    entries[i].toString(),
                                    "{"
                                )
                            );
                        }
                    } else {
                        throw_error(
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
                    if (i + 1 < leng &&
                        maybeEquals(entries, i + 1, CHARTYPE.NEWLINE) &&
                        entries[i + 1].equals(CHARTYPE.OPERATOR, "(")) {
                        // statement ( ...parse... )
                        result[0] = segmentationParser(
                            i + 2,
                            entries,
                            throw_error,
                            ";",
                            2,
                            "repeat"
                        );

                        i += result[0].jump + 3;

                        // { expression }
                        if (maybeEquals(entries, i, CHARTYPE.NEWLINE) &&
                            entries[i].equals(CHARTYPE.OPERATOR, "{")) {
                            result[1] = segmentCutter(
                                i + 1,
                                entries,
                                throw_error
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
                            throw_error(
                                entries[i].position,
                                new UnexpectedTokenStatement(
                                    "repeat",
                                    entries[i].toString(),
                                    "{"
                                )
                            );
                        }
                    } else {
                        throw_error(
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
                    if (i + 1 < leng &&
                        maybeEquals(entries, i + 1, CHARTYPE.NEWLINE) &&
                        entries[i + 1].equals(CHARTYPE.WORD)) {
                        if (i + 2 < leng &&
                            maybeEquals(entries, i + 2, CHARTYPE.NEWLINE) &&
                            entries[i + 2].equals(CHARTYPE.OPERATOR, "=")) {
                            result[0] = parseExpression(
                                i + 3,
                                entries,
                                throw_error
                            );

                            buffer.push(
                                new SetOperator(entries[i + 1], result[0].data)
                            );

                            i += result[0].jump + 3;

                            continue;
                        } else {
                            throw_error(
                                entries[i + 3].position,
                                new UnexpectedWordTypeAndGetException(entries[i + 2].toString(), entries[i + 2].type)
                            );
                        }
                    } else {
                        throw_error(
                            entries[i + 2].position,
                            new UnexpectedWordTypeAndGetException(entries[i + 1].toString(), entries[i + 1].type)
                        );
                    }
                case entries[i].equals(CHARTYPE.WORD):
                    result[0] = parseVarName(i, entries, throw_error);

                    // Если следующий символ доступен
                    if (i + result[0].jump < leng) {
                        // Переопределение
                        if (entries[i + result[0].jump].equals(
                            CHARTYPE.OPERATOR,
                            "="
                        )) {
                            result[1] = parseExpression(
                                result[0].jump + i + 1,
                                entries,
                                throw_error
                            );

                            buffer.push(
                                new ResetOperator(
                                    entries[i + result[0].jump].position,
                                    result[0].data,
                                    result[1].data
                                )
                            );

                            i += result[0].jump + result[1].jump + 1;

                            // Добавление
                        } else if (entries[i + result[0].jump].equals(
                            CHARTYPE.OPERATOR,
                            "<"
                        )) {
                            if (entries[i + result[0].jump + 1].equals(
                                CHARTYPE.OPERATOR,
                                "-"
                            )) {
                                result[1] = parseExpression(
                                    result[0].jump + i + 2,
                                    entries,
                                    throw_error
                                );

                                buffer.push(
                                    new PushOperator(
                                        entries[i + result[0].jump].position,
                                        result[0].data,
                                        result[1].data
                                    )
                                );

                                i += result[0].jump + result[1].jump + 2;
                            } else {
                                throw_error(
                                    entries[i + result[0].jump + 1].position,
                                    new UnexpectedTokenException(
                                        entries[i + result[0].jump + 1].toString(),
                                        "-"
                                    )
                                );
                            }

                            // Вызов функции
                        } else if (entries[i + result[0].jump].equals(
                            CHARTYPE.OPERATOR,
                            "("
                        )) {
                            result[1] = parseExpression(
                                i,
                                entries,
                                throw_error
                            );

                            buffer.push(result[1].data);

                            i += result[1].jump;

                            // Ошибка
                        } else {
                            throw_error(
                                entries[i].position,
                                new InvalidSequenceForLetiableAccessException()
                            );
                        }
                    } else {
                        i += result[0].jump;
                    }
                    continue;
                case entries[i].equals(CHARTYPE.NUMBER) ||
                    entries[i].equals(CHARTYPE.STRING):
                    result[0] = parseExpression(i, entries, throw_error);

                    buffer.push(result[0].data);

                    i += result[0].jump;
                    continue;
                default:
                    throw_error(
                        entries[i].position,
                        new UnexpectedTokenException(
                            entries[i].toString(),
                            "*"
                        )
                    );
            }
        } catch (e) {
            if (!e instanceof ParserException) {
                if (entries.length != 0) {
                    if (entries[i] != null)
                        throw_error(entries[i].position, new CriticalParserErrorException());

                    else
                        throw_error(
                            entries[entries.length - 1].position,
                            new CriticalParserErrorUnexpectedEndOfInputException()
                        );
                } else {
                    throw_error(
                        0,
                        new CriticalParserErrorNoRawDataTransmittedException()
                    );
                }
            } else {
                throw e;
            }
        }
    }
}
/**
 * Парсит вхождения, которые можно получить вызовом функции @see {@link lexer}
 *
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error {@link CodeEmitter.throwError} - Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 * @param {?String} parent_path Путь к шаблону
 *
 * @returns {SequenceMainGroup} Тело исполнителя
 *
 * @memberof Poonya.Parser
 * @protected
 * @async
 */
async function parser(entries, throw_error, parent_path) {
    return new SequenceMainGroup(codeBlockParser(
        0,
        await linker(
            entries,
            parent_path,
            throw_error
        ),
        throw_error
    ).data.Sequence);
}

/**
 * Парсит шаблон сообщения, которое помимо кода Poonya может содержать и любые другие символы вне префикса
 * 
 * @param {Array<LexerEntry>} entries Вхождения для парсинга
 * @param {String} block_prefix Префикс для обозначения начала блока кода poonya
 * @param {Function} throw_error {@link CodeEmitter.throwError} - Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождени
 * @param {String} parent_path Путь к шаблону
 * 
 * @returns {SequenceMainGroup} Тело исполнителя
 *
 * @memberof Poonya.Parser
 * @protected
 * @async
 */
async function parserMP(entries, block_prefix, throw_error, parent_path) {
    let   hook_index = 0
        , buffer = new Array()
        , out = new SequenceMainGroup();

    for (let i = 0; true; i++) {
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
                out.push(new OutOperator(new ObjectContructorCall(SERVICE.CONSTRUCTORS.STRING, buffer.join(""), entries[i].position)));

                buffer.splice(0, buffer.length);
            }

            hook_index++;

            continue;
        } else if (
            entries[i].equals(CHARTYPE.OPERATOR, "}") &&
            hook_index === 1
        ) {
            out.push(
                codeBlockParser(
                    0,
                    await linker(
                        buffer.filter((e) => e.type !== CHARTYPE.SPACE),
                        parent_path,
                        throw_error
                    ),
                    throw_error
                ).data
            );

            buffer.splice(0, buffer.length);

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
            out.push(
                codeBlockParser(
                    0,
                    await linker(
                        buffer.filter((e) => e.type !== CHARTYPE.SPACE),
                        parent_path,
                        throw_error
                    ),
                    throw_error
                ).data
            );

            buffer.splice(0, buffer.length);
        } else if (hook_index === 0) {
            if(buffer.length != 0) {
                out.push(
                    new OutOperator(new ObjectContructorCall(SERVICE.CONSTRUCTORS.STRING, buffer.join(""), entries[entries.length - 1].position))
                );

                buffer.splice(0, buffer.length);
            }
        } else {
            throw_error(
                entries[entries.length - 1].position,
                new UnexpectedTokenException(entries[entries.length - 1], "}"),
            );
        }

    return out;
}


module.exports.parser = parser;
module.exports.parserMP = parserMP;
module.exports.parseExpression = parseExpression;
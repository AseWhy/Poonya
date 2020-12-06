/**
 * @author Astecom
 * @file pattern.js
 * @namespace Pattern
 * @description Текстовый шаблонизатор, используется для создания текстовыхз шаблонов, и их последующего вывода
 */

"use strict";

const { readdirSync, readFileSync } = require("fs"),
    { join, dirname } = require("path");

/**
 * Типы символов
 *
 * @memberof Pattern
 * @constant CHARTYPE
 * @property {String} START     - Стартовый символ, ничего не значит        ``
 * @property {String} NUMBER    - Числовой тип                              `0-9.0-9`
 * @property {String} WORD      - Литеральный тип `                         `set`
 * @property {String} SPACE     - Тип пробела                               ` \t`
 * @property {String} POINT     - Тип точки                                 `.`
 * @property {String} STRING    - Строковой тип                             `'something...'`
 * @property {String} NEWLINE   - Тип новой строки                          `\n|\r`
 * @property {String} OPERATOR  - Тип оператора                             `= > <...`
 * @static
 */
const CHARTYPE = {
    START: "START",
    NUMBER: "NUMBER",
    WORD: "WORD",
    SPACE: "SPACE",
    POINT: "POINT",
    STRING: "STRING",
    NEWLINE: "NEWLINE",
    OPERATOR: "OPERATOR",
};

/**
 * Типы операторов
 *
 * @memberof Pattern
 * @constant OPERATOR
 * @property {String} PLUS      - Оператор сложения                         `+`
 * @property {String} MINUS     - Оператор вычитания                        `-`
 * @property {String} MULT      - Оператор умножения                        `*`
 * @property {String} DIVIDE    - Оператор деления                          `/`
 * @property {String} EQUAL     - Оператор сравнения                        `=`
 * @property {String} NEQUAL    - Оператор сложжения (отр)                  `!=`
 * @property {String} LARGER    - Оператор сравнение (a больше b)           `>`
 * @property {String} LESS      - Оператор сравнение (a меньше b)           `<`
 * @property {String} ELARGER   - Оператор сравнение (a больше или равно b) `>=`
 * @property {String} ELESS     - Оператор сравнение (a меньши или равно b) `<=`
 * @property {String} AND       - Оператор сравнение (a и b)                `&`
 * @property {String} OR        - Оператор сравнение (a или b)              `|`
 * @static
 */
const OPERATOR = {
    PLUS: "PLUS",
    MINUS: "MINUS",
    MULT: "MULT",
    DIVIDE: "DIVIDE",
    EQUAL: "EQUAL",
    NEQUAL: "NEQUAL",
    LARGER: "LARGER",
    LESS: "LESS",
    ELARGER: "ELARGER",
    ELESS: "ELESS",
    AND: "AND",
    OR: "OR",
};

/**
 * Форматирует число подгоняя его под общую длинну
 *
 * @param {Number} d Чило для формата
 * @param {Number} l Желаемая длинна
 * @memberof Pattern
 * @function toFixed
 * @protected
 * @static
 */
function toFixed(d, l) {
    return "0x" + d.toString(16).padStart(l - 2, "0");
}

/**
 * @namespace Pattern.Exceptions
 */
const Exceptions = {
    /**
     * Исключение последовательности, неожиданная последовательность
     *
     * @memberof Pattern.Exceptions
     * @name TheSequenceException
     * @class
     * @protected
     */
    TheSequenceException: class TheSequenceException extends Error {
        constructor(entry) {
            super(`Wrong order: condition operator: '${entry.toString()}'`);
        }
    },

    /**
     * Исключение парсера
     *
     * @memberof Pattern.Exceptions
     * @name ParserException
     * @class
     * @protected
     */
    ParserException: class ParserException extends Error {
        constructor() {
            super("Error when processing raw data");
        }
    },

    /**
     * Исключение неизвестного токена
     *
     * @memberof Pattern.Exceptions
     * @name UnexpectedTokenException
     * @class
     * @protected
     */
    UnexpectedTokenException: class UnexpectedTokenException extends Error {
        constructor(token, expected) {
            super(
                `Unexpected token '${token.toString()}' when expected '${expected.toString()}'`,
            );
        }
    },

    /**
     * Исключение неизвестного токена
     *
     * @memberof Pattern.Exceptions
     * @name UnexpectedTokenStatement
     * @class
     * @protected
     */
    UnexpectedTokenStatement: class UnexpectedTokenStatement extends Error {
        constructor(statement, token, expected) {
            super(
                `Error parsing the '${statement.toString()}' statement. Expected '${expected.toString()}', when actually: '${token.toString()}'`,
            );
        }
    },

    /**
     * Логическое исключение
     *
     * @memberof Pattern.Exceptions
     * @name ParserLogicException
     * @class
     * @protected
     */
    ParserLogicException: class ParserLogicException extends Error {
        constructor() {
            super("The expression has incorrect logic");
        }
    },

    /**
     * Исключение пустого аргумента при вызове функции
     *
     * @memberof Pattern.Exceptions
     * @name ParserEmtyArgumentException
     * @class
     * @protected
     */
    ParserEmtyArgumentException: class ParserEmtyArgumentException extends Error {
        constructor() {
            super(
                "It is not possible to pass an empty argument to a function, use null to denote an empty value",
            );
        }
    },

    /**
     * Не передан путь родтельскому шаблону
     *
     * @memberof Pattern.Exceptions
     * @name LinkerPathNotGiveExceptrion
     * @class
     * @protected
     */
    LinkerPathNotGiveExceptrion: class LinkerPathNotGiveExceptrion extends Error {
        constructor() {
            super(
                "To use include, you must pass the path to the current execution file",
            );
        }
    },

    /**
     * Ошибка использования стороннего шаблона
     *
     * @memberof Pattern.Exceptions
     * @name LinkerIOError
     * @class
     * @protected
     */
    LinkerIOError: class LinkerIOError extends Error {
        constructor(path) {
            super("An error occured while opening file: '" + path + "'");
        }
    },

    /**
     * Ошибка выполнения нативной функции
     *
     * @memberof Pattern.Exceptions
     * @name NativeFunctionExcecutionError
     * @class
     * @protected
     */
    NativeFunctionExcecutionError: class NativeFunctionExcecutionError extends Error {
        constructor(name) {
            super("Critical error while executing a native function '" + name + "'");
        }
    },

    /**
     * Ошибка типа, возвращаемого нативной функцией
     *
     * @memberof Pattern.Exceptions
     * @name NativeFunctionReturnValueError
     * @class
     * @protected
     */
    NativeFunctionReturnValueError: class NativeFunctionReturnValueError extends Error {
        constructor() {
            super("Function can only return simple types");
        }
    },

    /**
     * Невозможно получить n от null
     *
     * @memberof Pattern.Exceptions
     * @name GetFieldOfNullException
     * @class
     * @protected
     */
    GetFieldOfNullException: class GetFieldOfNullException extends Error {
        constructor(field) {
            super(`Cannot get property '${field}' of null`);
        }
    },

    /**
     * Поле не является функцией
     *
     * @memberof Pattern.Exceptions
     * @name FieldNotAFunctionException
     * @class
     * @protected
     */
    FieldNotAFunctionException: class FieldNotAFunctionException extends Error {
        constructor(field) {
            super(`The field '${field}' is not a function`);
        }
    },

    /**
     * Поле уже объявлено
     *
     * @memberof Pattern.Exceptions
     * @name TheFieldAlreadyHasBeenDeclaredException
     * @class
     * @protected
     */
    TheFieldAlreadyHasBeenDeclaredException: class TheFieldAlreadyHasBeenDeclaredException extends Error {
        constructor(field) {
            super(`The '${field}' field is already declared`);
        }
    },

    /**
     * Поле должно быть массивом
     *
     * @memberof Pattern.Exceptions
     * @name TheFieldMustBeAnArrayInstanceExceprion
     * @class
     * @protected
     */
    TheFieldMustBeAnArrayInstanceExceprion: class TheFieldMustBeAnArrayInstanceExceprion extends Error {
        constructor(field) {
            super(`Field '${field}' must be an Array instance`);
        }
    },

    /**
     * Поле не объявлено
     *
     * @memberof Pattern.Exceptions
     * @name TheFieldNotHasDeclaredExceprion
     * @class
     * @protected
     */
    TheFieldNotHasDeclaredExceprion: class TheFieldNotHasDeclaredExceprion extends Error {
        constructor(field) {
            super(`Field '${field}' is not declared`);
        }
    },

    /**
     * Поле должно иметь тип числа
     *
     * @memberof Pattern.Exceptions
     * @name TheFieldMustBeNumberException
     * @class
     * @protected
     */
    TheFieldMustBeNumberException: class TheFieldMustBeNumberException extends Error {
        constructor(field) {
            super(`'${field}' must be a number, or a container containing a number`);
        }
    },

    /**
     * Невозможно распознать тип вхождения
     *
     * @memberof Pattern.Exceptions
     * @name UnableToRecognizeTypeException
     * @class
     * @protected
     */
    UnableToRecognizeTypeException: class UnableToRecognizeTypeException extends Error {
        constructor(type) {
            super(`Unable to recognize type '${type}'`);
        }
    },

    /**
     * Ошибка сегментации сегментов вызова (...exp, ...exp, ) <-
     * 
     * @memberof Pattern.Exceptions
     * @name SegmentationFaultEmptyArgumentException
     * @class
     * @protected
     */
    SegmentationFaultEmptyArgumentException: class SegmentationFaultEmptyArgumentException extends Error {
        constructor(blockname) {
            super(`Segmentation fault: empty argument for ` + blockname);
        }
    },

    /**
     * Ошибка сегментации сегментов вызова (...exp, ...exp, ) <-
     * 
     * @memberof Pattern.Exceptions
     * @name SegmentationFaultMaximumSegmentsForBlockException
     * @class
     * @protected
     */
    SegmentationFaultMaximumSegmentsForBlockException: class SegmentationFaultMaximumSegmentsForBlockException extends Error {
        constructor(blockname) {
            super(`Segmentation fault exceeded the maximum number of segments for block ` + blockname);
        }
    },

    /**
     * somed.dss[ <...exp> ] <-
     * 
     * @memberof Pattern.Exceptions
     * @name UnexpectedWordTypeAndGetException
     * @class
     * @protected
     */
    UnexpectedWordTypeAndGetException: class UnexpectedWordTypeAndGetException extends Error {
        constructor(value, type) {
            super(`Expected word type expression and get ${value}[${type}]`);
        }
    },

    /**
     * Невозможно получить доступ к полю, неправильно сотавлено выражение
     * 
     * @memberof Pattern.Exceptions
     * @name InvalidSequenceForLetiableAccessException
     * @class
     * @protected
     */
    InvalidSequenceForLetiableAccessException: class InvalidSequenceForLetiableAccessException extends Error {
        constructor() {
            super(`Invalid sequence for letiable access`);
        }
    },

    /**
     * Критическая ошибка парсера
     * 
     * @memberof Pattern.Exceptions
     * @name CriticalParserErrorException
     * @class
     * @protected
     */
    CriticalParserErrorException: class CriticalParserErrorException extends Error {
        constructor() {
            super(`Critical parser error`);
        }
    },

    /**
     * Критическая ошибка парсера, неожиданный конец ввода
     * 
     * @memberof Pattern.Exceptions
     * @name CriticalParserErrorUnexpectedEndOfInputException
     * @class
     * @protected
     */
    CriticalParserErrorUnexpectedEndOfInputException: class CriticalParserErrorUnexpectedEndOfInputException extends Error {
        constructor() {
            super(`Critical parser error: unexpected end of input`);
        }
    },

    /**
     * Критическая ошибка парсера, не переданны данные для парсинга
     * 
     * @memberof Pattern.Exceptions
     * @name CriticalParserErrorNoRawDataTransmittedException
     * @class
     * @protected
     */
    CriticalParserErrorNoRawDataTransmittedException: class CriticalParserErrorNoRawDataTransmittedException extends Error {
        constructor() {
            super(`Critical parser error: no raw data transmitted`);
        }
    },
    
    /**
     * Прыжок через два уровня
     * 
     * @memberof Pattern.Exceptions
     * @name BadArrowNotationJumpingTwoLevels
     * @class
     * @protected
     */
    BadArrowNotationJumpingTwoLevels: class BadArrowNotationJumpingTwoLevels extends Error {
        constructor() {
            super(`Bad array notation: jumping two levels is not possible`);
        }
    },
    
    /**
     * Неожиданный переход на более высокий уровень
     * 
     * @memberof Pattern.Exceptions
     * @name BadArrowNotationJumpingToUpperLevel
     * @class
     * @protected
     */
    BadArrowNotationJumpingToUpperLevel: class BadArrowNotationJumpingToUpperLevel extends Error {
        constructor() {
            super(`Bad array notation: unexpected transition to a upper level`);
        }
    }
};

/**
 * Функция, которая возвращает библиотеку при импорте
 *
 * @memberof Pattern
 * @function Import
 *
 * @param {string[]} import_statements
 * @param {
 *      {
 *          log: Function,
 *          error: Function,
 *          warn: Function
 *      }
 * } logger
 *
 * @public
 */
let Import = () => {};

(() => {
    const ExcPatt = /\.[^.]*$/m,
        Modules = new Map(),
        Paths = readdirSync(join(__dirname, "libs"));

    for (let i = 0, leng = Paths.length; i < leng; i++) {
        Modules.set(
            Paths[i].replace(ExcPatt, ""),
            require(join(__dirname, "libs", Paths[i])),
        );
    }

    Import = (import_statements, logger) => {
        if (!(import_statements instanceof Array))
            throw new TypeError("import_statements must be Array");

        let mod,
            modules = new Object();

        for (let i = 0, leng = import_statements.length; i < leng; i++) {
            if ((mod = Modules.get(import_statements[i])) !== null)
                if (mod.name !== undefined)
                    Object.assign(modules, { [mod.name]: mod.lib });
                else Object.assign(modules, mod);
            else
                logger.warn(`Can't find module ${import_statements[i]}, check the spelling of the library name`);
        }

        return modules;
    };
})();

/**
 * @lends Heap
 * @class
 */
class Heap extends Map {
    /**
     * Модуль памяти, может использоваться для манипульций с памятью.
     *
     * @param {Object} data
     * @memberof Pattern
     * @constructs Heap
     * @public
     */
    constructor(data) {
        super();

        if (data !== undefined) this.append(data);
    }

    /**
     * Обновляет данные в текущем объекте
     *
     * @param {Object} data данные которые нужно обновить
     * @method
     * @public
     */
    append(data) {
        if (typeof data === "object") {
            if (Array.isArray(data)) {
                for (let i = 0, leng = data.length; i < leng; i++)
                    this.set(i, data[i], data);
            } else {
                const keys = Object.getOwnPropertyNames(data);

                for (let i = 0, leng = keys.length; i < leng; i++)
                    this.set(keys[i], data[keys[i]], data);
            }
        } else {
            throw new TypeError();
        }
    }

    /**
     * Получет значение из текущей области памяти по ключу `key`
     *
     * @param {String} key ключ, по которому происходит получение значения
     * @method
     * @public
     */
    get(key) {
        return super.get(key);
    }

    /**
     * Устанавливает значение для текущей области памяти
     *
     * @param {String} key ключ по которому будет происходить установка
     * @param {Object} data данные которые будут установлены
     * @param {?Object} subj суб объект(родитель текущего значения)
     * @param {?Array<Heap|HeapIndexed>} parents_three стэк родителей
     * @method
     * @public
     */
    set(key, data, subj = null, parents_three = new Array()) {
        if (typeof key !== "string" && typeof key !== "number")
            throw new TypeError();

        try {
            switch (typeof data) {
                case "bigint":
                    super.set(key, new NativeInteger(data));
                    break;
                case "number":
                    super.set(key, new NativeNumber(data));
                    break;
                case "string":
                    super.set(key, new NativeString(data));
                    break;
                case "boolean":
                    super.set(key, new NativeBoolean(data));
                    break;
                case "object":
                    if (data == null) {
                        super.set(key, new NativeNull());
                    } else if (
                        data instanceof CodeEmitter
                    ) {
                        super.set(key, new PatternData(data));
                    } else if(
                        data instanceof Heap
                    ) { 
                        super.set(key, data);
                    } else {
                        parents_three.push(data);

                        if (data instanceof Array) {
                            const sub = new HeapIndexed();

                            for (let i = 0, leng = data.length; i < leng; i++)
                                if (!parents_three.includes(data[i]))
                                    sub.set(i, data[i], data, [
                                        ...parents_three,
                                    ]);

                            super.set(key, sub);
                        } else {
                            const sub = new Heap()
                                , keys = Object.getOwnPropertyNames(data);

                            for (let i = 0, leng = keys.length; i < leng; i++)
                                if (!parents_three.includes(data[keys[i]]))
                                    sub.set(keys[i], data[keys[i]], data, [
                                        ...parents_three,
                                    ]);

                            super.set(key, sub);
                        }
                    }
                    break;
                case "function":
                    super.set(key, new NativeFunction(data.bind(subj)));
                    break;
            }
        } catch (e) {
            console.error("Error when cast value of " + key);
        }
    }

    /**
     * Десерриализует значени е хипа памяти в javascript объект
     *
     * @param {?Heap} heap Текущий хип памяти
     * @param {?Heap} source_data Исходный хип памяти
     * @param {?Array<String>} out Выходной массив
     * @param {?Function} throw_error Функция вызывающаяся при ошибках
     * @method
     * @public
     */
    result(context, out, throw_error) {
        let output = new Object();

        for (let [key, value] of this)
            if (!(value instanceof NativeFunction))
                output[key] =
                    value != null
                        ? value.result(context, out, throw_error)
                        : null;

        return output;
    }
}

/**
 * @lends Context
 * @class
 */
class Context {
    /**
     * Контекст выполнения
     *
     * @param  {...Heap|HeapIndexed} initial Значения переданные для инициализации
     * @memberof Pattern
     * @constructs Context
     * @classdesc Определяет набор данных для манипуляции в шаблонизаторе
     * @protected
     */
    constructor(...initial) {
        this.levels =
            initial.filter(
                (e) => !(e instanceof Heap || e instanceof HeapIndexed),
            ).length === 0
                ? initial
                : new Array();
    }

    /**
     * Добавляет уроень в текущий контекст
     * @method
     * @public
     */
    addLevel(level) {
        if (level != null) {
            if (level instanceof Heap || level instanceof HeapIndexed)
                this.levels.push(level);
            else
                throw new Error(
                    "The level for the context must be heap, or indexed by the heap",
                );
        } else {
            this.levels.push(new Heap());
        }
    }

    /**
     * Выходит из текущего контекста
     * @method
     * @public
     */
    popLevel() {
        return this.levels.pop();
    }

    /**
     * Получет значение из текущего контекста
     *
     * @param {String} val адрес* в памяти
     * @method
     * @public
     */
    get(val) {
        let b = null,
            p = this.levels.length - 1;

        while (
            p >= 0 &&
            (
                b = this.levels[p--].get(val)
            ) == null
        );

        return b;
    }

    /**
     * Проверяет, имеется ли значение в заданном контексте
     *
     * @param {String} val адрес* в памяти
     * @param {String} params дополнительные параметры поиска
     * @method
     * @public
     *
     * @description
     * params может быть равен:
     *  `tree` - поиск по всему дереву
     *  `up` - поиск по самомой верхней области памяти
     *  `root` - поиск по самой нижней области памяти
     */
    has(val, params = "tree") {
        switch (params) {
            case "tree":
                return this.get(val) !== null;
            case "up":
                return this.levels[this.levels.length - 1].has(val);
            case "root":
                return this.levels[0].has(val);
        }
    }

    /**
     * Устанавливает значение в контексте исполнения
     *
     * @param {String} val адрес* в памяти
     * @param {Object} data Значение для установки
     * @param {String} params дополнительные параметры поиска
     * @method
     * @public
     *
     * @description
     * params может быть равен:
     *  `tree` - поиск по всему дереву
     *  `up` - поиск по самомой верхней области памяти
     *  `root` - поиск по самой нижней области памяти
     */
    set(val, data, params = "tree") {
        switch (params) {
            case "tree":
                let p = this.levels.length;

                while (--p >= 0) {
                    if (this.levels[p].get(val) != null) {
                        this.levels[p].set(val, data);

                        return;
                    }
                }

                this.levels[this.levels.length - 1].set(val, data);
                break;
            case "up":
                this.levels[this.levels.length - 1].set(val, data);
                break;
            case "down":
                this.levels[0].set(val, data);
                break;
        }
    }
}

/**
 * @lends HeapIndexed
 * @class
 */
class HeapIndexed extends Heap {
    /**
     * Хип памяти (Индексированный)
     * Смотрите {@link Heap} для просмотра информации о наследуемом классе
     *
     * @param {Object} data данные для инициализации модуля памяти
     * @memberof Pattern
     * @constructs HeapIndexed
     * @extends Heap
     * @public
     */
    constructor(data) {
        super(data);

        this.length = 0;
    }

    /**
     * Добавляет данные в модуль памяти
     *
     * @param {Object} data данные которые добавляем
     * @param {Object} subj родитель добавляемого значения
     * @param {Array<Any>} parents_three стэк родетелей добавляемого значения
     * @method
     * @public
     */
    push(data, subj = null, parents_three = new Array()) {
        super.set(this.length++, data, subj, parents_three);
    }

    /**
     * @override
     * @method
     * @public
     */
    get(key) {
        if (key >= 0 && key < this.length) {
            return super.get(key);
        } else return null;
    }

    /**
     * @override
     * @method
     * @public
     */
    set(key, data, subj = null, parents_three = new Array()) {
        if (
            typeof key !== "number" ||
            key < 0 ||
            key > Number.MAX_SAFE_INTEGER
        )
            throw new TypeError();

        if (this.length <= key) this.length = key + 1;

        super.set(key, data, subj, parents_three);
    }

    /**
     * @override
     * @method
     * @public
     */
    result(context, out, throw_error) {
        let output = new Array(this.length);

        for (let [key, value] of this)
            if (!(value instanceof NativeFunction))
                output[key] =
                    value != null
                        ? value.result(context, out, throw_error)
                        : null;

        return output;
    }
}

/**
 * @lends ParserData
 * @class
 */
class ParserData {
    /**
     * @param {String} type тип данных
     * @constructs ParserData
     * @memberof Pattern
     * @abstract
     * @protected
     */
    constructor(type = "undefined") {
        this.type = type;
    }
}

/**
 * @lends Operand
 * @class
 */
class Operand extends ParserData {
    /**
     * @param {String} type тип данных
     * @constructs Operand
     * @memberof Pattern
     * @abstract
     * @protected
     */
    constructor(name = "undefined") {
        super('operand')

        this.name = name;
    }
}

/**
 * @lends Operator
 * @class
 */
class Operator extends ParserData {
    /**
     * @param {LexerEntry} data вхождение лексера описывающее текущий оператор
     * @constructs Operator
     * @memberof Pattern
     * @extends ParserData
     * @protected
     */
    constructor(data) {
        super("operator");

        this.position = data.position;
        this.raw = data.data;

        switch (data.data.toString()) {
            case "+":
                this.op_p = OPERATOR.PLUS;
                break;
            case "-":
                this.op_p = OPERATOR.MINUS;
                break;
            case "*":
                this.op_p = OPERATOR.MULT;
                break;
            case "/":
                this.op_p = OPERATOR.DIVIDE;
                break;
            case ">":
                this.op_p = OPERATOR.LARGER;
                break;
            case "<":
                this.op_p = OPERATOR.LESS;
                break;
            case ">=":
                this.op_p = OPERATOR.ELARGER;
                break;
            case "<=":
                this.op_p = OPERATOR.ELESS;
                break;
            case "=":
                this.op_p = OPERATOR.EQUAL;
                break;
            case "!=":
                this.op_p = OPERATOR.NEQUAL;
                break;
            case "&":
                this.op_p = OPERATOR.AND;
                break;
            case "|":
                this.op_p = OPERATOR.OR;
                break;
        }
    }

    /**
     * Сравнивает оператор с текущим
     *
     * @param {OPERATOR} t сравниваемый тип оператора
     * @public
     * @method
     * @returns {Boolean}
     */
    equals(t) {
        return this.op_p === OPERATOR[t];
    }

    /**
     * Серриализует текущий оператор в строку
     *
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.raw.toString();
    }
}

/**
 * @lends Literal
 * @class
 */
class Literal extends Operand {
    /**
     * @param {LexerEntry} entry вхождение лексера описывающее текущий литерал
     * @param {String} name наименование литерала
     * @constructs Literal
     * @memberof Pattern
     * @extends Operand
     * @protected
     */
    constructor(entry, name) {
        super("literal");

        this.position = entry.position;
        this.operand_name = name;
    }

    /**
     * @abstract
     * @method
     * @public
     */
    result() {

    }

    /**
     * Сравнивает имя литерала с переданных значением
     *
     * @param {String} f имя литерала с которым сравниваем
     * @method
     * @public
     * @returns {Boolean}
     */
    equals(f) {
        return this.name === f;
    }

    /**
     * Серриализует текущий литерал
     *
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.name + " { " + this.result() + " }";
    }
}

/**
 * @lends Native
 * @class
 */
class Native extends Operand {
    /**
     * @param {String} name наименование литерала
     * @constructs Native
     * @memberof Pattern
     * @extends Operand
     * @protected
     */
    constructor(name) {
        super("native");

        this.position = 0;
        this.operand_name = name;
    }

    /**
     * @abstract
     * @method
     * @public
     */
    result() {

    }

    /**
     * Сравнивает имя литерала с переданных значением
     *
     * @param {String} f имя литерала с которым сравниваем
     * @method
     * @public
     * @returns {Boolean}
     */
    equals(f) {
        return this.name === f;
    }

    /**
     * Серриализует текущий литерал
     *
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.name + " [N] { " + this.result() + " }";
    }
}

/**
 * @lends NativeInteger
 * @class
 */
class NativeInteger extends Native {
    /**
     * Дескриптор нативного целого числа в шаблонизаторе
     *
     * @param {BigInt} data данные для преобразования
     * @constructs NativeInteger
     * @memberof Pattern
     * @extends Native
     * @protected
     */
    constructor(data) {
        super("NativeInteger");

        if(!isNaN(data) && typeof data === 'bigint')
            this.data = data;
        else
            throw new TypeError('For NativeInteger, the data type passed to the constructor must be a bigint')
    }
    
    /**
     * Серриализует текущее целое число
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.data + "i";
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {BigInt}
     */
    result(){
        return this.data;
    }
}

/**
 * @lends NativeNumber
 * @class
 */
class NativeNumber extends Native {
    /**
     * Дескриптор нативного числа в шаблонизаторе
     *
     * @param {Number} data данные для преобразования
     * @constructs NativeNumber
     * @memberof Pattern
     * @extends Native
     * @protected
     */
    constructor(data) {
        super("NativeNumber");

        if(!isNaN(data) && typeof data === 'number')
            this.data = data;
        else
            throw new TypeError('For NativeNumber, the data type passed to the constructor must be a number')
    }
    
    /**
     * Серриализует текущее целое число
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.data + "n";
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {Number}
     */
    result(){
        return this.data;
    }
}

/**
 * @lends NativeString
 * @class
 */
class NativeString extends Native {
    /**
     * Дескриптор нативной строки в шаблонизаторе
     *
     * @param {String} data данные для преобразования
     * @constructs NativeString
     * @memberof Pattern
     * @extends Native
     * @protected
     */
    constructor(data) {
        super("NativeString");

        if(typeof data === 'string')
            this.data = data;
        else
            throw new TypeError('For NativeString, the data type passed to the constructor must be a string')
    }
    
    /**
     * Серриализует текущее целое число
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return `'${this.data}'`;
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    result(){
        return this.data;
    }
}

/**
 * @lends NativeBoolean
 * @class
 */
class NativeBoolean extends Native {
    /**
     * Дескриптор нативного булевого значения в шаблонизаторе
     *
     * @param {Boolean} data данные для преобразования
     * @constructs NativeBoolean
     * @memberof Pattern
     * @extends Native
     * @protected
     */
    constructor(data) {
        super("NativeBoolean");

        if(typeof data === 'boolean')
            this.data = data;
        else
            throw new TypeError('For NativeBoolean, the data type passed to the constructor must be a boolean')
    }
    
    /**
     * Серриализует текущее целое число
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return `${this.data}`;
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {Boolean}
     */
    result(){
        return this.data;
    }
}

/**
 * @lends NativeNull
 * @class
 */
class NativeNull extends Native {
    /**
     * Дескриптор нативного null в шаблонизаторе
     *
     * @constructs NativeNull
     * @memberof Pattern
     * @extends Native
     * @protected
     */
    constructor() {
        super("NativeNull");
    }
    
    /**
     * Серриализует текущее целое число
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return `null`;
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {null}
     */
    result(){
        return null;
    }
}

/**
 * @lends IntegerLiteral
 * @class
 */
class IntegerLiteral extends Literal {
    /**
     * Дескриптор целого числа в шаблонизаторе
     *
     * @param {LexerEntry} data Вхождение лексера описывающее целое число
     * @constructs IntegerLiteral
     * @memberof Pattern
     * @extends Literal
     * @protected
     */
    constructor(data) {
        super(data, "IntegerLiteral");

        this.data = data.data.toString();
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {BigInt}
     */
    result() {
        return BigInt(this.data);
    }

    /**
     * Серриализует текущее целое число
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.data + "i";
    }

    /**
     * Преобразует в значение переданное первым аргументом как целое число шаблонизатора
     *
     * @param {Any} data Данные из которых нужно преобразовать
     * @param {?Number} pos Позция вхождения
     * @returns {IntegerLiteral}
     * @static
     * @public
     * @method
     */
    static toPatternNumber(data, pos = 0) {
        if (!(data instanceof ParserData))
            return new IntegerLiteral(
                new LexerEntry(
                    CHARTYPE.NUMBER,
                    Buffer.from(BigInt(data).toString()),
                    pos,
                    null,
                ),
            );

        switch (data.entry.type) {
            case CHARTYPE.STRING:
            case CHARTYPE.WORD:
                return new IntegerLiteral(
                    new LexerEntry(CHARTYPE.NUMBER, data.entry.data, pos, null),
                );
            case CHARTYPE.NUMBER:
                return new IntegerLiteral(
                    new LexerEntry(
                        CHARTYPE.NUMBER,
                        Buffer.from(data.entry.data.toString()),
                        pos,
                        null,
                    ),
                );
        }

        return new IntegerLiteral(
            new LexerEntry(CHARTYPE.NUMBER, Buffer.from([48]), pos, null),
        );
    }

    /**
     * Создает пустое целое число со значнием 0
     *
     * @param {?Number} pos позиция к которой нужно привзать новосозданное целое число
     * @returns {IntegerLiteral}
     * @static
     * @public
     * @method
     */
    static create(pos = 0) {
        return new NumberLiteral(
            new LexerEntry(CHARTYPE.START, Buffer.from([48]), pos, null),
        );
    }
}

/**
 * @lends NumberLiteral
 * @class
 */
class NumberLiteral extends Literal {
    /**
     * Дескриптор числа в шаблонизаторе
     *
     * @param {LexerEntry} data Вхождение лексера описывающее число
     * @constructs NumberLiteral
     * @memberof Pattern
     * @extends Literal
     * @protected
     */
    constructor(data) {
        super(data, "NumberLiteral");

        this.data = data.data.toString();

        this.unsigned = false;
    }

    /**
     * Серриализует текущее число
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.data + "n";
    }

    /**
     * Отрезает дробную часть у числа
     *
     * @method
     * @public
     */
    toInteger() {
        this.unsigned = true;
    }

    /**
     * Добавляет дробную часть числу
     *
     * @method
     * @public
     */
    toDouble() {
        this.unsigned = false;
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {Number}
     */
    result() {
        return this.unsigned ? parseInt(this.data) : parseFloat(this.data);
    }

    /**
     * Преобразует в значение переданное первым аргументом как число шаблонизатора
     *
     * @param {Any} data Данные из которых нужно преобразовать
     * @param {?Number} pos Позция вхождения
     * @returns {NumberLiteral}
     * @static
     * @public
     * @method
     */
    static toPatternNumber(data, pos = 0) {
        if (!(data instanceof ParserData))
            return new NumberLiteral(
                new LexerEntry(
                    CHARTYPE.NUMBER,
                    Buffer.from(new Number(data).toString()),
                    pos,
                    null,
                ),
            );

        switch (data.entry.type) {
            case CHARTYPE.STRING:
            case CHARTYPE.WORD:
                return new NumberLiteral(
                    new LexerEntry(CHARTYPE.NUMBER, data.entry.data, pos, null),
                );
            case CHARTYPE.NUMBER:
                return new NumberLiteral(
                    new LexerEntry(
                        CHARTYPE.NUMBER,
                        Buffer.from(data.entry.data.toString()),
                        pos,
                        null,
                    ),
                );
        }

        return new NumberLiteral(
            new LexerEntry(CHARTYPE.NUMBER, Buffer.from([48]), pos, null),
        );
    }

    /**
     * Создает пустое число со значнием 0
     *
     * @param {?Number} pos позиция к которой нужно привзать новосозданное число
     * @returns {NumberLiteral}
     * @static
     * @public
     * @method
     */
    static create(pos = 0) {
        return new NumberLiteral(
            new LexerEntry(CHARTYPE.START, Buffer.from([48]), pos, null),
        );
    }
}

/**
 * @lends StringLiteral
 * @class
 */
class StringLiteral extends Literal {
    /**
     * Дескриптор литерала строки
     *
     * @param {LexerEntry} data Вхождение лексера описывающее строку
     * @constructs StringLiteral
     * @memberof Pattern
     * @extends Literal
     * @protected
     */
    constructor(data) {
        super(data, "StringLiteral");

        this.data = data.data.toString();
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    result() {
        return this.data.toString();
    }

    /**
     * Преобразует в значение переданное первым аргументом как строку шаблонизатора
     *
     * @param {Any} data Данные из которых нужно преобразовать
     * @param {?Number} pos Позция вхождения
     * @returns {StringLiteral}
     * @static
     * @public
     * @method
     */
    static toPatternString(data, pos = 0) {
        if (!(data instanceof ParserData))
            return new StringLiteral(
                new LexerEntry(
                    CHARTYPE.WORD,
                    Buffer.from(new String(data).toString()),
                    pos,
                    null,
                ),
            );

        switch (data.entry.type) {
            case CHARTYPE.STRING:
            case CHARTYPE.WORD:
                return new StringLiteral(
                    new LexerEntry(CHARTYPE.WORD, data.entry.data, pos, null),
                );
            case CHARTYPE.NUMBER:
                return new StringLiteral(
                    new LexerEntry(
                        CHARTYPE.WORD,
                        Buffer.from(data.entry.data.toString()),
                        pos,
                        null,
                    ),
                );
        }

        return new StringLiteral(
            new LexerEntry(CHARTYPE.WORD, Buffer.from([]), pos, null),
        );
    }

    /**
     * Серриализует текущую строку
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return (
            '"' +
            this.data.toString().replace(/\n/, "\\n").replace(/"/g, '\\"') +
            '"'
        );
    }

    /**
     * Создает пустую строку с длинной равной нулю
     *
     * @param {?Number} pos позиция к которой нужно привзать новосозданный литерал
     * @returns {StringLiteral}
     * @static
     * @public
     * @method
     */
    static create(pos = 0) {
        return new StringLiteral(
            new LexerEntry(CHARTYPE.START, Buffer.from([]), pos, null),
        );
    }
}

/**
 * @lends BooleanLiteral
 * @class
 */
class BooleanLiteral extends Literal {
    /**
     * Дескриптор лбулевого итерала
     *
     * @param {LexerEntry} data Вхождение лексера описывающее булевый литерал
     * @constructs BooleanLiteral
     * @memberof Pattern
     * @extends Literal
     * @protected
     */
    constructor(data) {
        super(data, "BooleanLiteral");

        this.data =
            data.data.toString() === "true"
                ? Buffer.from([1])
                : Buffer.from([0]);
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {Boolean}
     */
    result() {
        return this.data[0] !== 0;
    }

    /**
     * Серриализует текущее булевое значение
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.data[0] !== 0 ? "true" : "false";
    }

    /**
     * Преобразует в значение переданное первым аргументом как булевое значение шаблонизатора
     *
     * @param {Any} data Данные из которых нужно преобразовать
     * @param {?Number} pos Позция вхождения
     * @returns {BooleanLiteral}
     * @static
     * @public
     * @method
     */
    static toPatternBoolean(data, pos = 0) {
        if (!(data instanceof ParserData))
            return new BooleanLiteral(
                new LexerEntry(
                    CHARTYPE.WORD,
                    Buffer.from(new Boolean(data).toString()),
                    pos,
                    null,
                ),
            );

        if (data.entry.data.byteLength === 1) {
            return new BooleanLiteral(
                new LexerEntry(
                    CHARTYPE.WORD,
                    Buffer.from(data.entry.data[0] === 0 ? "false" : "true"),
                    pos,
                    null,
                ),
            );
        } else {
            switch (data.entry.type) {
                case CHARTYPE.STRING:
                case CHARTYPE.WORD:
                    switch (data.entry.data.toString()) {
                        case "true":
                            return new BooleanLiteral(
                                new LexerEntry(
                                    CHARTYPE.WORD,
                                    Buffer.from("true"),
                                    pos,
                                    null,
                                ),
                            );
                        case "false":
                            return new BooleanLiteral(
                                new LexerEntry(
                                    CHARTYPE.WORD,
                                    Buffer.from("false"),
                                    pos,
                                    null,
                                ),
                            );
                    }
                    break;
                case CHARTYPE.NUMBER:
                    switch (data.entry.data.toString()) {
                        case "0":
                            return new BooleanLiteral(
                                new LexerEntry(
                                    CHARTYPE.WORD,
                                    Buffer.from("false"),
                                    pos,
                                    null,
                                ),
                            );
                        default:
                            return new BooleanLiteral(
                                new LexerEntry(
                                    CHARTYPE.WORD,
                                    Buffer.from("true"),
                                    pos,
                                    null,
                                ),
                            );
                    }
            }

            return new BooleanLiteral(
                new LexerEntry(CHARTYPE.WORD, Buffer.from("false"), pos, null),
            );
        }
    }

    /**
     * Создает пустую булевое значение равное `false`
     *
     * @param {?Number} pos позиция к которой нужно привзать новосозданный литерал
     * @returns {BooleanLiteral}
     * @static
     * @public
     * @method
     */
    static create(pos = 0) {
        return new BooleanLiteral(
            new LexerEntry(CHARTYPE.START, Buffer.from([0]), pos, null),
        );
    }
}

/**
 * @lends NullLiteral
 * @class
 */
class NullLiteral extends Literal {
    /**
     * Дескриптор литерала null
     *
     * @param {LexerEntry} data Вхождение лексера описывающее null
     * @constructs NullLiteral
     * @memberof Pattern
     * @extends Literal
     * @protected
     */
    constructor(data) {
        super(data, "NullLiteral");
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {null}
     */
    result() {
        return null;
    }

    /**
     * Серриализует текущее булевое значение
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return "Null";
    }

    /**
     * Стоздает новый null литерал
     *
     * @param {?Number} pos позиция к которой нужно привзать новосозданный литерал
     * @returns {NullLiteral}
     * @static
     * @public
     * @method
     */
    static create() {
        return new NullLiteral(
            new LexerEntry(CHARTYPE.START, Buffer.from([]), 0, null),
        );
    }
}

/**
 * @lends NativeFunction
 * @class
 */
class NativeFunction extends Operand {
    /**
     * Нативная функция, невозможно создать по средствам шаблона
     *
     * @param {Function} func функция, котороая будет вызвана при попытке результировать значение
     * @constructs NativeFunction
     * @memberof Pattern
     * @extends Operand
     * @protected
     */
    constructor(func) {
        super("native function");

        this.target = func;
    }

    /**
     * Вызывает функцию, которая была передана как параметр при создании нативной функции
     *
     * @param {Array<Any>} args аргументы функции
     * @param {Context} context Контекст выполнения фукнции
     * @param {Function} throw_error Метод выбрасывания ошибок
     * @param {Number} call_pos Позиция из которой происходит вызов
     * @returns {IntegerLiteral|NumberLiteral|StringLiteral|BooleanLiteral|HeapIndexed|Heap|NullLiteral}
     */
    result(args, context, throw_error, call_pos) {
        let buff;

        try {
            buff = this.target.call({ args, throw_error, context }, ...args);
        } catch (e) {
            throw_error(call_pos, new Exceptions.NativeFunctionExcecutionError(this.target.name));
        }

        switch(typeof buff){
            case "bigint":
                if(isNaN(buff))
                    return new NativeNull();
                else
                    return new NativeInteger(buff)
            case "number":
                if(isNaN(buff))
                    return new NativeNull();
                else 
                    return new NativeNumber(buff);
            case "string":
                return new NativeString(buff);
            case "boolean":
                return new NativeBoolean(buff);
            case "undefined":
            case "object":
                if(buff == null)
                    return new NativeNull();
                else {
                    if (buff instanceof Array) 
                        return new HeapIndexed(buff);
                    else 
                        return new Heap(buff);
                }
            default:
                throw_error(call_pos, new Exceptions.NativeFunctionReturnValueError());
        }
    }

    /**
     * Создает пустую функцию.
     *
     * @returns {NativeFunction}
     * @static
     * @public
     * @method
     */
    static create() {
        return new NativeFunction(() => false);
    }
}

/**
 * @lends LexerEntry
 * @class
 */
class LexerEntry {
    /**
     * Вхождение лексера
     *
     * @param {CHARTYPE} type тип выхождения
     * @param {Buffer} data Данные вхождения
     * @param {Number} p Позиция вхождения
     * @param {String} s_separator Дополнительное окружение вхождения, допустим для строки это ''
     * @constructs LexerEntry
     * @memberof Pattern
     * @protected
     */
    constructor(type, data, p, s_separator) {
        this.type = CHARTYPE[type];
        this.data = data;
        this.position = p - data.byteLength > 0 ? p - data.byteLength + 1 : 0;
        this.leng = data.byteLength;
        this.string_separator =
            s_separator != null
                ? String.fromCharCode(s_separator)
                : null;
    }

    /**
     * Сравнивает текущее вхождение с преданным `t` типом и `s` содержанием.
     *
     * @param {*} t Тип с которым нужно сравнить текущее вхождение
     * @param {?String|String[]} s содержание с котрым необходимо сравнить текущее вхождение
     * @returns {Boolean}
     */
    equals(t, s) {
        return (
            t == this.type &&
            (s != null
                ? Array.isArray(s)
                    ? s.includes(this.toString())
                    : this.toString() == s
                : true)
        );
    }

    /**
     * Сравнивает текущее вхождение с преданным `s` содержанием.
     *
     * @param {?String|String[]} s содержание с котрым необходимо сравнить текущее вхождение
     * @returns {Boolean}
     */
    contentEquals(s) {
        return Array.isArray(s)
            ? s.includes(this.toString())
            : this.toString() == s;
    }

    /**
     * Преобразует вхождение в строку
     *
     * @public
     * @method
     */
    toString() {
        return this.type != CHARTYPE.STRING
            ? this.data.toString("utf8")
            : this.string_separator + this.data.toString("utf8") + this.string_separator;
    }
}

/**
 * @lends PatternData
 * @protected
 */
class PatternData extends Operand {
    /**
     * Данные вызова шаблона, если передать в heap шаблон, то он выполнится с текущей памятью
     *
     * @param {CodeEmitter} pattern эмиттер который будет исполнятся при сполнении этого выхождения
     *
     * @constructs PatternData
     * @extends Operand
     * @memberof Pattern
     * @protected
     */
    constructor(pattern) {
        super("pattern");

        this.target = pattern;
    }

    /**
     * Серриализует текущий объект в строку
     *
     * @param {String} indent отступ слева, для более понятного отображения кода
     * @returns {String} Строковое представление серриализации шаблона
     *
     * @public
     * @method
     */
    toString(indent) {
        return `${
            this.target.constructor.name
        } ${indent}{\n${this.target.toString(indent + "\t")}\n${indent}}`;
    }

    /**
     * Выполняет шаблон переданный в контруктор
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        return this.target.result(context, throw_error);
    }
}

/**
 * @lends GetOperator
 * @protected
 */
class GetOperator extends Operand {
    /**
     * Данные вызова шаблона, если передать в heap шаблон, то он выполнится с текущей памятью
     *
     * @param {CodeEmitter} эмиттер который будет исполнятся при сполнении этого выхождения
     *
     * @constructs GetOperator
     * @extends Operand
     * @memberof Pattern
     * @protected
     */
    constructor(position, stack) {
        super("get");

        this.position = position;
        this.query_stack = stack;
    }

    /**
     * Получает переменную заданную литералами
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @returns {Any} В зависимости от типа запрашиваемых данных
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        let query_data = context.get(this.query_stack[0]),
            query_stack = [...this.query_stack];

        for (
            let i = 1, leng = query_stack.length;
            query_data && i < leng;
            i++
        ) {
            if (query_stack[i] instanceof ExpressionGroup)
                query_stack[i] = query_stack[i].result(
                    context,
                    out,
                    throw_error,
                );

            if (query_data instanceof Heap) {
                query_data = query_data.get(query_stack[i]) || null;
            } else {
                throw_error(
                    this.position,
                    new Exceptions.GetFieldOfNullException(query_stack[i])
                );
            }
        }

        if (query_data) return query_data.result(context, out, throw_error);
        else return null;
    }

    /**
     * Серриализует текущий объект в строку
     *
     * @returns {String} Строковое представление получения доступа к полям
     * @public
     * @method
     */
    toString() {
        return "(" + this.query_stack.join(" => ") + ")";
    }
}

/**
 * @lends FunctionCall
 * @protected
 */
class FunctionCall extends Operand {
    /**
     * Вхождение вызова функции, после выполнения этого вхождения будет вызвана нативная функция
     *
     * @param {CodeEmitter} эмиттер который будет исполнятся при сполнении этого выхождения
     *
     * @constructs FunctionCall
     * @extends Operand
     * @memberof Pattern
     * @protected
     */
    constructor(query_stack, args, position) {
        super("call");

        this.query_stack = [...query_stack];
        this.args = args;
        this.position = position;
    }

    /**
     * Получает переменную заданную литералами
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @returns {Any} В зависимости от возвращаемых функцией значения
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        let query_data = context.get(this.query_stack[0]),
            query_stack = [...this.query_stack],
            args = new Array();

        for (
            let i = 1, leng = this.query_stack.length;
            query_data && i < leng;
            i++
        ) {
            if (query_stack[i] instanceof ExpressionGroup)
                query_stack[i] = query_stack[i].result(
                    context,
                    out,
                    throw_error,
                );

            if (query_data instanceof Heap) {
                query_data = query_data.get(query_stack[i]) || null;
            } else {
                throw_error(
                    this.position,
                    new Exceptions.GetFieldOfNullException(query_stack[i]),
                );
            }
        }

        for (let i = 0, leng = this.args.length; i < leng; i++) {
            args.push(this.args[i].result(context, out, throw_error));
        }

        if (query_data instanceof NativeFunction)
            return query_data
                .result(args, context, throw_error, this.position)
                .result(context, out, throw_error);
        else
            throw_error(
                this.position,
                new Exceptions.FieldNotAFunctionException(query_stack[query_stack.length - 1])
            );
    }

    /**
     * Серриализует текущий объект в строку
     *
     * @returns {String} Строковое представление вызова функции
     * @public
     * @method
     */
    toString() {
        return (
            "(" +
                this.query_stack.join(" => ") +
            ") <== (" +
                this.args.join(", ") +
            ")"
        );
    }
}

/**
 * @lends TernarOperator
 * @protected
 */
class TernarOperator extends Operand {
    /**
     * Создает тернарные оператор
     *
     * @param {ExpressionGroup} condition Выражение условие
     * @param {ExpressionGroup} v1 Выражение, если истина
     * @param {ExpressionGroup} v2 Выражение, если ложь
     *
     * @constructs TernarOperator
     * @extends Operand
     * @memberof Pattern
     * @protected
     */
    constructor(condition, v1, v2) {
        super("ternar");

        this.condition = condition;
        this.v_o = v1;
        this.v_t = v2;
    }

    /**
     * Серриализует текущий объект в строку
     *
     * @returns {String} Строковое представление теранарного оператора
     * @public
     * @method
     */
    toString(indent) {
        return (
            "< " +
            this.condition.toString(indent + "\t") +
            " > ? " +
            this.v_o +
            " : " +
            this.v_t
        );
    }

    /**
     * Выполняет теранарный оператор
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @returns {Any} В зависимости от возвращаемых операндами (`v1`, `v2`) начений
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        if (
            BooleanLiteral.toPatternBoolean(
                this.condition.result(context, out, throw_error),
                this.condition.position,
            ).result()
        )
            return this.v_o.result(context, out, throw_error);
        else
            return this.v_t.result(context, out, throw_error);
    }
}

/**
 * @lends SetOperator
 * @protected
 */
class SetOperator {
    /**
     * Объект который серриализуется как set = (expression...)
     *
     * @param {String} name поле, которое нужно установить в текущем контексте
     * @param {ExpressionGroup} value Значение, которое поле получит после выполнения этого вхождения
     *
     * @constructs SetOperator
     * @memberof Pattern
     * @protected
     */
    constructor(name, value) {
        this.name = name.toString();
        this.position = name.position;
        this.value = value;
    }

    /**
     * Серриализует текущий объект в строку
     *
     * @returns {String} Строковое представление устновки значения переменной
     * @public
     * @method
     */
    toString(indent) {
        return "set " + this.name + " = " + this.value.toString(indent + "\t");
    }

    /**
     * Производит установку значения переменной в текущем контексте
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        if (!context.has(this.name, "up"))
            context.set(
                this.name,
                this.value.result(context, out, throw_error),
                "up",
            );
        else {
            throw_error(
                this.position,
                new Exceptions.TheFieldAlreadyHasBeenDeclaredException(this.name)
            );
        }
    }
}

/**
 * @lends PushOperator
 * @protected
 */
class PushOperator {
    /**
     * Объект который серриализуется как var_name <- (expression...)
     * Это опреатор для работы с массивами, и он заменяет свойство push
     *
     * @param {Number} position Позиция в начала оператора во входящих данных
     * @param {String[]} query_stack Путь к полю которое поле получит
     * @param {ExpressionGroup} value Данные которые нужно устновить
     *
     * @constructs PushOperator
     * @memberof Pattern
     * @protected
     */
    constructor(position, query_stack, value) {
        this.query_stack = query_stack;
        this.position = position;
        this.value = value;
    }

    /**
     * Серриализует текущий объект в строку
     *
     * @returns {String} Строковое представление добавления элемента в массив (операция push)
     * @public
     * @method
     */
    toString(indent) {
        return (
            "(" +
            this.query_stack
                .map((e) => (typeof e === "number" ? `[${e}]` : e))
                .join(" => ") +
            ") < " +
            this.value.toString(indent + "\t")
        );
    }

    /**
     * Производит добавление значения `value` в массив который должен быть передан как левый операнд
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        let query_data = context.get(this.query_stack[0]),
            query_stack = [...this.query_stack];

        if (query_data instanceof Heap) {
            let index = 1;

            for (
                let leng = query_stack.length;
                query_data && index < leng;
                index++
            ) {
                if (query_stack[index] instanceof ExpressionGroup)
                    query_stack[index] = query_stack[index].result(
                        context,
                        out,
                        throw_error,
                    );

                query_data = query_data.get(query_stack[index]) || null;
            }

            if (query_data instanceof HeapIndexed)
                query_data.push(this.value.result(context, out, throw_error));
            else
                throw_error(
                    this.position,
                    new Exceptions.TheFieldMustBeAnArrayInstanceExceprion(query_stack[index - 1])
                );
        } else
            throw_error(
                this.position,
                new Exceptions.GetFieldOfNullException(query_stack[0]),
            );
    }
}

/**
 * @lends ResetOperator
 * @protected
 */
class ResetOperator {
    /**
     * Производит переустновку значения переменной переданной как левой операнд на выражение, которое передано как правый операнд.
     * Объект который сериализуется как name = (...expression)
     *
     * @param {Number} position Позиция в начала оператора во входящих данных
     * @param {String[]} query_stack Путь поля в памяти
     * @param {ExpressionGroup} value Данные которые нужно устновить
     *
     * @constructs PushOperator
     * @memberof Pattern
     * @protected
     */
    constructor(position, query_stack, value) {
        this.query_stack = query_stack;
        this.position = position;
        this.value = value;
    }

    /**
     * Серриализует текущий объект в строку
     *
     * @returns {String} Строковое представление переопределения переменной
     * @public
     * @method
     */
    toString(indent) {
        return (
            "(" +
                this.query_stack
                    .map((e) => (typeof e === "number" ? `[${e}]` : e))
                    .join(" => ") +
            ") = " +
            this.value.toString(indent + "\t")
        );
    }

    /**
     * Производит переопределение перемнной
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        let query_data = context.get(this.query_stack[0]),
            query_stack = [...this.query_stack];

        if (query_stack.length > 1) {
            let index = 1;

            for (
                let leng = query_stack.length - 1;
                query_data && index < leng;
                index++
            ) {
                if (query_stack[index] instanceof ExpressionGroup)
                    query_stack[index] = query_stack[index].result(
                        context,
                        out,
                        throw_error,
                    );

                query_data = query_data.get(query_stack[index]) || null;
            }

            if (query_data instanceof Heap) {
                const last_index = query_stack[query_stack.length - 1];

                query_data.set(
                    last_index instanceof ExpressionGroup
                        ? last_index.result(context, out, throw_error)
                        : last_index,
                    this.value.result(context, out, throw_error),
                );
            } else
                throw_error(
                    this.position,
                    new Exceptions.GetFieldOfNullException(query_stack[index])
                );
        } else {
            if (query_data != null)
                context.set(
                    query_stack[0],
                    this.value.result(context, out, throw_error),
                );
            else
                throw_error(
                    this.position,
                    new Exceptions.TheFieldNotHasDeclaredExceprion(query_stack[0])
                );
        }
    }
}

/**
 * @lends OutOperator
 * @protected
 */
class OutOperator {
    /**
     * Оператор вывода который серриализуется как > (...expression)
     * Выводит данные из шаблона
     *
     * @constructs OutOperator
     * @memberof Pattern
     * @protected
     */
    constructor(expression) {
        this.expression = expression;
    }

    /**
     * Серриализует текущий объект в строку
     *
     * @returns {String} Строковое представление вывода выражения
     * @public
     * @method
     */
    toString() {
        return "> " + this.expression.toString();
    }

    /**
     * Выполняет вывод информации из шаблона
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        out.push(this.expression.result(context, out, throw_error));
    }
}

/**
 * @lends IfStatement
 * @protected
 */
class IfStatement {
    /**
     * Дескриптор оператора if
     *
     * @param {ExpressionGroup} condition Выражение - условие
     * @param {SequenceGroup} body_true Исполняемая последовательность, если true
     * @param {SequenceGroup} body_false Исполняемая последовательность, если false
     *
     * @constructs IfStatement
     * @memberof Pattern
     * @protected
     */
    constructor(condition, body_true, body_false) {
        this.condition = condition;
        this.body_true = body_true;
        this.body_false = body_false;
    }

    /**
     * Серриализует текущий объект в строку
     *
     * @param {String} indent отступ слева, для более понятного отображения кода
     * @returns {String} Строковое представление выражения if
     * @public
     * @method
     */
    toString(indent) {
        return (
            "if (" +
            this.condition.toString(indent + "\t") +
            ") " +
            this.body_true.toString(indent + "\t") +
            (this.body_false != null
                ? " else " + this.body_false.toString(indent + "\t")
                : "")
        );
    }

    /**
     * Выполняет проверку условия, и выполняет нужную группу в зависимости от результатов выполнения условия
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        if (
            BooleanLiteral.toPatternBoolean(
                this.condition.result(context, out, throw_error),
                this.condition.position,
            ).result()
        )
            this.body_true.result(context, out, throw_error);
        else if (this.body_false != null)
            this.body_false.result(context, out, throw_error);
    }
}

/**
 * @lends WhileStatement
 * @protected
 */
class WhileStatement {
    /**
     * Дескриптор оператора while
     *
     * @param {ExpressionGroup} condition Выражение - условие
     * @param {SequenceGroup} body Основная исполняемая последовательность
     *
     * @constructs WhileStatement
     * @memberof Pattern
     * @protected
     */
    constructor(condition, body) {
        this.condition = condition;
        this.body = body;
    }

    /**
     * Серриализует текущий объект в строку
     *
     * @param {String} indent отступ слева, для более понятного отображения кода
     * @returns {String} Строковое представление выражения while
     * @public
     * @method
     */
    toString(indent) {
        return (
            "while (" +
            this.condition.toString(indent + "\t") +
            ") " +
            this.body.toString(indent + "\t")
        );
    }

    /**
     * Выполняет основной блок, до тех пор, пока выполняется условие переданное первым аргументом
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        while (
            BooleanLiteral.toPatternBoolean(
                this.condition.result(context, out, throw_error),
                this.condition.position,
            ).result()
        )
            this.body.result(context, out, throw_error);
    }
}

/**
 * @lends ObjectContructorCall
 * @protected
 */
class ObjectContructorCall extends Operand {
    /**
     * Литеральный конструктор объекта
     *
     * @param {String} name имя конструктора
     * @param {Map<String, ExpressionGroup>} fields поля объекта при инициализации
     *
     * @constructs ObjectContructorCall
     * @extends Operand
     * @memberof Pattern
     * @protected
     */
    constructor(name = 'Object', fields) {
        super('object');

        this.name = name;
        this.fields = fields;
    }

    /**
     * Серриализует текущий объект в строку
     *
     * @param {String} indent отступ слева, для более понятного отображения кода
     * @returns {String} Строковое представление выражения while
     * @public
     * @method
     */
    toString(indent) {
        const items = [...this.fields.entries()];

        return (
            "new (" + this.name + ") -> \n" +
                items.map((e, i) => {
                    if(e[1] instanceof ObjectContructorCall)
                        return indent + e[0] + ' -> ' + e[1].toString(indent + '\t');
                    else
                        return indent + e[0] + ' -> ' + e[1].toString(indent + '\t') + (i + 1 != items.length ? ',' : '');
                }).join('\n')
        );
    }

    /**
     * Выполняет основной блок, до тех пор, пока выполняется условие переданное первым аргументом
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        if(this.name === 'Object'){
            const instance = new Heap();

            for(let fieled of this.fields) {
                instance.set(fieled[0], fieled[1].result(context, out, throw_error));
            }

            return instance;
        }
    }
}

/**
 * @lends RepeatStatement;
 * @protected
 */
class RepeatStatement {
    /**
     * Дескриптор оператора repeat
     *
     * @param {ExpressionGroup} from Выражение - выполнять c
     * @param {ExpressionGroup} to Выражение - выполнять по
     * @param {SequenceGroup} body Основная исполняемая последовательность
     *
     * @constructs RepeatStatement
     * @memberof Pattern
     * @protected
     */
    constructor(from, to, body) {
        this.from = from;
        this.to = to;
        this.body = body;
    }

    /**
     * Серриализует текущий объект в строку
     *
     * @param {String} indent отступ слева, для более понятного отображения кода
     * @returns {String} Строковое представление выражения repeat
     * @public
     * @method
     */
    toString(indent) {
        return "repeat (" + this.from.toString() + "; " + this.to.toString() + ") " + this.body.toString(indent);
    }

    /**
     * Выполняет главную выполняему последовательность от `from` до `to`
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        let from = this.from.result(context, out, throw_error),
            to = this.to.result(context, out, throw_error),
            difference = from < to ? 1 : -1;

        if (typeof from !== "number")
            throw_error(
                this.from.position,
                new Exceptions.TheFieldMustBeNumberException("From")
            );

        if (typeof to !== "number")
            throw_error(
                this.to.position,
                new Exceptions.TheFieldMustBeNumberException("To")
            );

        from = parseInt(from);
        to = parseInt(to);

        while (from != to) {
            context.addLevel();

            context.set("current", from, "up");

            this.body.result(context, out, throw_error, false);

            from += difference;

            context.popLevel();
        }
    }
}

/**
 * @lends MessagePattern;
 */
class ExpressionGroup extends Operand {
    /**
     * Группа выражения, водержит последовательность, кторая выполняется как выражение.
     *
     * @param {Number} position начало выражения
     * @param {?Array<LexerEntry>} initial иницированное значение выражения
     *
     * @constructs MessagePattern
     * @memberof Pattern
     * @protected
     */
    constructor(position, initial) {
        super("expression");

        this.data = initial != null ? [...initial] : new Array();
        this.position = position;
        this.validated = false;
    }

    /**
     * Серриализует текущее выражение как строку
     *
     * @returns {String} Строковое представление выражения
     * @public
     * @method
     */
    toString(indent) {
        return this.data.map(e => e.toString(indent + "\t")).join(" ");
    }

    /**
     * Добавляет вхождение в выражение
     *
     * @param {LexerEntry} entry Выхождение, которое нужно добавить
     * @param {Function} throw_error Функция выбрасывания ошибок
     *
     * @throws {Exceptions.TheSequenceException}
     *
     * @public
     * @method
     */
    append(entry, throw_error) {
        const _ = this;

        function push(entry) {
            switch (entry.type) {
                case CHARTYPE.NUMBER:
                    _.data.push(new NumberLiteral(entry));
                    break;
                case CHARTYPE.STRING:
                    _.data.push(new StringLiteral(entry));
                    break;
                case CHARTYPE.WORD:
                    switch (entry.data.toString()) {
                        case "true":
                        case "false":
                            _.data.push(new BooleanLiteral(entry));
                            break;
                        case "null":
                            _.data.push(new NullLiteral(entry));
                            break;
                        default:
                            _.data.push(new GetByName(entry));
                            break;
                    }
                    break;
                default:
                    switch(entry.type) {
                        case "operand":
                        case "operator":
                            _.data.push(entry);
                            break;
                        default:
                            throw_error(entry.position, new Exceptions.UnableToRecognizeTypeException(entry.type));
                    }
                    break;
            }
        }

        if (_.data.length === 0)
            push(entry);
        else if (entry.type === "operator")
            if (_.data[_.data.length - 1].type !== "operator")
                push(entry);
            else
                throw_error(entry.position, new Exceptions.TheSequenceException(entry));
        else if (entry.type === "literal" || entry.type === "expression")
            if (_.data[_.data.length - 1].type === "operator")
                push(entry);
            else
                throw_error(entry.position, new Exceptions.TheSequenceException(entry));
        else if (entry.type === CHARTYPE.OPERATOR)
            if (_.data[_.data.length - 1].type !== "operator")
                push(new Operator(entry));
            else
                throw_error(entry.position, new Exceptions.TheSequenceException(entry));
        else if (_.data[_.data.length - 1].type === "operator")
            push(entry);
        else
            throw_error(entry.position, new Exceptions.TheSequenceException(entry));
    }

    /**
     * Окончательно форматирует выражение по всем правилоам алгебры.
     *
     * @param {Function} throw_error Функция выбрасывания ошибок
     *
     * @throws {Exceptions.TheSequenceException}
     *
     * @public
     * @method
     */
    complete(throw_error) {
        if (
            // Выражение не должно начинаться с оператора и не не должно заканчиваться оператором
            this.data[0] instanceof LexerEntry &&
            this.data[0].equals(CHARTYPE.OPERATOR, ")")
        ) {
            throw_error(
                this.data[0].position,
                new Exceptions.TheSequenceException(this.data[0]),
            );
        } else if (
            this.data[this.data.length - 1] instanceof LexerEntry &&
            this.data[this.data.length - 1].equals(CHARTYPE.OPERATOR, ")")
        ) {
            throw_error(
                this.data[this.data.length - 1].position,
                new Exceptions.TheSequenceException(
                    this.data[this.data.length - 1],
                ),
            );
        }

        // Stage 1 => 2 + 2 * 2 => 2 + (2 * 2)
        if (
            this.data.filter(
                (e) => e.op_p === OPERATOR.MULT || e.op_p === OPERATOR.DIVIDE,
            ).length > 0
        ) {
            let mltexp = false,
                dump = Array.from(this.data),
                stack = null;

            this.data.splice(0, this.data.length);

            for (let i = 0, leng = dump.length; i < leng; i++) {
                if (dump[i + 1] && dump[i + 1].type === "operator")
                    switch (dump[i + 1].op_p) {
                        case OPERATOR.MULT:
                        case OPERATOR.DIVIDE:
                            if (mltexp) break;

                            mltexp = true;

                            stack = new ExpressionGroup(dump[i + 1].position);

                            this.append(stack, throw_error);
                            break;
                        case OPERATOR.PLUS:
                        case OPERATOR.MINUS:
                        case OPERATOR.EQUAL:
                        case OPERATOR.LARGER:
                        case OPERATOR.LESS:
                        case OPERATOR.OR:
                        case OPERATOR.AND:
                            if (!mltexp) break;

                            mltexp = false;

                            stack.append(dump[i], throw_error);

                            stack.complete();

                            stack = null;
                            continue;
                        default:
                            break;
                    }

                if (mltexp) {
                    stack.append(dump[i], throw_error); // Добавляем в суб стек
                } else {
                    this.append(dump[i], throw_error); // Добавляем в основной стек
                }
            }
        }

        // Stage 2 => a & b => (a) & (b)
        if (this.data.filter((e) => e.op_p === OPERATOR.AND).length > 0) {
            let dump = Array.from(this.data),
                stack = new ExpressionGroup(dump[0].position);

            this.data.splice(0, this.data.length);

            for (let i = 0, leng = dump.length; i < leng; i++) {
                if (
                    dump[i] &&
                    dump[i].type === "operator" &&
                    dump[i].op_p === OPERATOR.AND
                ) {
                    stack.complete();

                    this.append(stack, throw_error);

                    this.append(dump[i], throw_error);

                    stack = new ExpressionGroup(dump[i].position);

                    continue;
                }

                stack.append(dump[i], throw_error);
            }

            stack.complete();

            this.append(stack, throw_error);
        }

        // Stage 3 => a | b => (a) | (b)
        if (this.data.filter((e) => e.op_p === OPERATOR.OR).length > 0) {
            let dump = Array.from(this.data),
                stack = new ExpressionGroup(dump[0].position);

            this.data.splice(0, this.data.length);

            for (let i = 0, leng = dump.length; i < leng; i++) {
                if (
                    dump[i] &&
                    dump[i].type === "operator" &&
                    dump[i].op_p === OPERATOR.OR
                ) {
                    stack.complete();

                    this.append(stack, throw_error);

                    this.append(dump[i], throw_error);

                    stack = new ExpressionGroup(dump[i].position);

                    continue;
                }

                stack.append(dump[i], throw_error);
            }

            stack.complete();

            this.append(stack, throw_error);
        }

        this.validated = true;
    }

    /**
     * Выполняет последовательность выражения, возвращая результат выполнения
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @returns {Any} В зависимости от результатов выполнения выражения
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        let result =
            this.data[0] != null
                ? this.data[0].result(context, out, throw_error)
                : NullLiteral.create().result();

        for (let i = 1, leng = this.data.length; i < leng; i += 2) {
            switch (true) {
                case this.data[i].equals(OPERATOR.PLUS):
                    result += this.data[i + 1].result(
                        context,
                        out,
                        throw_error,
                    );
                    break;
                case this.data[i].equals(OPERATOR.MINUS):
                    result -= this.data[i + 1].result(
                        context,
                        out,
                        throw_error,
                    );
                    break;
                case this.data[i].equals(OPERATOR.MULT):
                    result *= this.data[i + 1].result(
                        context,
                        out,
                        throw_error,
                    );
                    break;
                case this.data[i].equals(OPERATOR.DIVIDE):
                    result /= this.data[i + 1].result(
                        context,
                        out,
                        throw_error,
                    );
                    break;
                case this.data[i].equals(OPERATOR.LARGER):
                    result =
                        result >
                        this.data[i + 1].result(context, out, throw_error);
                    break;
                case this.data[i].equals(OPERATOR.LESS):
                    result =
                        result <
                        this.data[i + 1].result(context, out, throw_error);
                    break;
                case this.data[i].equals(OPERATOR.EQUAL):
                    result =
                        result ==
                        this.data[i + 1].result(context, out, throw_error);
                    break;
                case this.data[i].equals(OPERATOR.ELARGER):
                    result =
                        result >=
                        this.data[i + 1].result(context, out, throw_error);
                    break;
                case this.data[i].equals(OPERATOR.ELESS):
                    result =
                        result <=
                        this.data[i + 1].result(context, out, throw_error);
                    break;
                case this.data[i].equals(OPERATOR.NEQUAL):
                    result =
                        result !=
                        this.data[i + 1].result(context, out, throw_error);
                    break;
                case this.data[i].equals(OPERATOR.AND):
                    result =
                        result &&
                        this.data[i + 1].result(context, out, throw_error);

                    if (!result) return result;
                    break;
                case this.data[i].equals(OPERATOR.OR):
                    result =
                        result ||
                        this.data[i + 1].result(context, out, throw_error);

                    if (result) return result;
                    break;
            }
        }

        return result;
    }
}

/**
 * @lends SequenceGroup;
 * @protected
 */
class SequenceGroup {
    /**
     * Исполняемая последовательность
     *
     * @constructs SequenceGroup
     * @memberof Pattern
     * @protected
     */
    constructor() {
        this.Sequence = new Array();
    }

    /**
     * Добавляет элемент в стэк
     *
     * @param {Any} elem То что добавляем в стэк исполнения
     *
     * @public
     * @method
     */
    pushInStack(elem) {
        this.Sequence.push(elem);
    }

    /**
     * Выполняет текущую последовательность
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @public
     * @method
     */
    result(context, out, throw_error, level_ops = true) {
        if (level_ops) context.addLevel();

        for (let i = 0, leng = this.Sequence.length; i < leng; i++) {
            this.Sequence[i].result(context, out, throw_error);
        }

        if (level_ops) context.popLevel();
    }

    /**
     * Серриализует текущую группу в текст
     *
     * @param {String} indent отступ слева, для лучшей читаемости
     * @returns {String} отфрматированный текст
     */
    toString(indent = 0) {
        return `{\n${indent}${this.Sequence.map((e) =>
            e.toString(indent + "\t"),
        ).join("\n\n" + indent)}\n${indent.substring(0, indent.length - 1)}}`;
    }
}

/**
 * @lends SequenceMainGroup;
 * @protected
 */
class SequenceMainGroup {
    /**
     * Главная исполняемая последовательность
     *
     * @constructs SequenceMainGroup
     * @memberof Pattern
     * @protected
     */
    constructor() {
        this.Sequence = new Array();
    }

    /**
     * Добавляет элемент в стэк
     *
     * @param {Any} elem То что добавляем в стэк исполнения
     *
     * @public
     * @method
     */
    pushInStack(elem) {
        this.Sequence.push(elem);
    }

    /**
     * Выполняет текущую последовательность
     *
     * @param {Context} context Контекст выполнения
     * @param {Array<Any>} out Массив с выходными данным
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        for (let i = 0, leng = this.Sequence.length; i < leng; i++)
            this.Sequence[i].result(context, out, throw_error);
    }

    /**
     * Серриализует текущую группу в текст
     *
     * @param {String} indent отступ слева, для лучшей читаемости
     * @returns {String} отфрматированный текст
     */
    toString(indent = "\t") {
        return `{\n${indent}${this.Sequence.map((e) =>
            e.toString(indent + "\t"),
        ).join("\n\n" + indent)}\n${indent.substring(0, indent.length - 1)}}`;
    }
}

/**
 * Иногда некоторые выражения записываются неоднозначно, допустим <br> <br>
 *
 * if (<b> < exp > </b>) {} <br>
 * <br>
 * Или <br>
 * <br>
 * if (<b> < exp > </b>) { <br>
 *  <br>
 * } <br>
 * <br>
 * Или <br>
 * <br>
 * if (<b> < exp > </b>) <br>
 * { <br>
 *  <br>
 * } <br>
 * <br>
 * И это все будет if, эта функцию убирает возможные 'линие символы'
 *
 * @param {Array<LexerEntry>} entries Выхождение, на вход
 * @param {Number} index Проверяемый индекс
 * @param {String} equalts_t Тип с которым сравниваем
 * @param {String|Array<String>} equalts_v Значение(я) с которым(и) сравниваем
 *
 * @memberof Pattern
 * @private
 */
function maybeEquals(entries, index, equalts_t, equalts_v) {
    while (entries[index].equals(equalts_t, equalts_v)) {
        entries.splice(index, 1);
    }

    return true;
}

/**
 * Подсчитывает количиство неприрывных одинаковых вхождений
 * ---------------------------------------------------------------------------
 * 
 * @param {Array<LexerEntry>} entries вхождения для парсинга
 * @param {Number} start начальная позиция парсинга
 * @param {String} equalts_t Тип с которым сравниваем
 * @param {String|Array<String>} equalts_v Значение(я) с которым(и) сравниваем
 * 
 * @memberof Pattern
 * @private
 */
function countKeys(entries, start, equalts_t, equalts_v){
    for(let i = start, to = entries.length; i < to; i++){
        if(entries[i] == null || !entries[i].equals(equalts_t, equalts_v))
            return i - start;
    }
}

/**
 * Лексер, который производит лексический разбор подаваемого текста в буффере
 *
 * @param {Buffer} buffer Буффер с `сырыми` данными
 * @param {Boolean} allow_spaces разрешены ли пробелы, если `false`, то лексер вернет ответ без пробелов
 *
 * @memberof Pattern
 * @protected
 */
function lexer(buffer, allow_spaces = true) {
    const Export = new Array();

    let buff = new Array(),
        is_string = false,
        is_comment = false,
        is_multiline = false,
        string_entry = null,
        cur = null,
        last = null;

    for (let i = 0, leng = buffer.byteLength; i < leng; i++) {
        switch (buffer[i]) {
            case 32:
            case 9:
                cur = CHARTYPE.SPACE;
                break;
            case 46:
                cur = CHARTYPE.POINT;
                break;
            case 10:
            case 13:
                cur = CHARTYPE.NEWLINE;
                break;
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                cur = CHARTYPE.NUMBER;
                break;
            case 34:
            case 39:
            case 96:
                cur = CHARTYPE.STRING;
                break;
            case 60:
            case 61:
            case 62:
            case 63:
            case 43:
            case 44:
            case 45:
            case 47:
            case 40:
            case 41:
            case 42:
            case 59:
            case 58:
            case 38:
            case 123:
            case 124:
            case 125:
            case 91:
            case 93:
            case 33:
                cur = CHARTYPE.OPERATOR;
                break;
            default:
                cur = CHARTYPE.WORD;
                break;
        }

        if (
            (cur === CHARTYPE.NEWLINE && last === CHARTYPE.NEWLINE) ||
            (cur === CHARTYPE.POINT && last === CHARTYPE.NUMBER) ||
            (cur === CHARTYPE.NUMBER && last === CHARTYPE.WORD)
        ) {
            buff.push(buffer[i]);

            continue;
        }

        // Если предыдущий и текущий тип символов это операторы
        if (cur === CHARTYPE.OPERATOR && last === CHARTYPE.OPERATOR) {
            if (
                buff.length === 1 && // В буффере не больше одного символа
                (buff[0] === 33 || // пердыдущий символ был '!'
                    buff[0] === 60 || // пердыдущий символ был '<'
                    buff[0] === 62) && // пердыдущий символ был '>'
                buffer[i] === 61 // текущий символ '='
            ) {
                buff.push(buffer[i]);

                if (allow_spaces || last !== CHARTYPE.SPACE)
                    Export.push(
                        new LexerEntry(
                            last,
                            Buffer.from(buff),
                            i,
                            string_entry,
                        ),
                    );

                string_entry = null;

                buff.splice(0, buff.length);

                last = undefined;

                if (i + 1 === leng) return Export;

                continue;
            }

            if (
                buff.length === 1 && // В буффере не больше одного символа
                buff[0] === 47 // Предыдущий символ это /
            ) {
                if (
                    buffer[i] === 47 // Текущий символ это /
                ) {
                    is_comment = true;
                    is_multiline = false;

                    continue;
                } else if (
                    buffer[i] === 62 // Текущий символ это >
                ) {
                    is_comment = true;
                    is_multiline = true;

                    continue;
                }
            }
        }

        if (!is_string && !is_comment) {
            if (
                (cur !== last ||
                    last === CHARTYPE.STRING ||
                    last === CHARTYPE.OPERATOR) &&
                last != null
            ) {
                if (allow_spaces || last !== CHARTYPE.SPACE)
                    Export.push(
                        new LexerEntry(
                            last,
                            Buffer.from(buff),
                            i,
                            string_entry,
                        ),
                    );

                string_entry = null;

                buff.splice(0, buff.length);
            }

            if (cur === CHARTYPE.STRING) {
                is_string = true;

                string_entry = buffer[i];

                last = cur;

                continue;
            }

            buff.push(buffer[i]);

            last = cur;
        } else if (is_comment) {
            if (is_multiline) {
                if (
                    buffer[i] === 47 && // Текущий символ это /
                    buff[buff.length - 1] === 60 // Предыдущий символ это <
                ) {
                    is_comment = false;

                    last = undefined;

                    buff.splice(0, buff.length);

                    continue;
                }
            } else {
                if (cur === CHARTYPE.NEWLINE) {
                    is_comment = false;

                    last = CHARTYPE.NEWLINE;

                    buff.splice(0, buff.length);

                    continue;
                }
            }

            buff.push(buffer[i]);
        } else {
            if (cur === CHARTYPE.STRING && buffer[i] === string_entry) {
                is_string = false;

                last = cur;

                continue;
            }

            buff.push(buffer[i]);

            last = cur;
        }
    }

    if (allow_spaces || cur !== CHARTYPE.SPACE)
        Export.push(
            new LexerEntry(
                cur,
                Buffer.from(buff),
                buffer.byteLength - buff.length - 1,
                string_entry,
            ),
        );

    return Export;
}

/**
 * Препроцессораня функция, линкует файлы.
 *
 * @param {Array<LexerEntry>} data данные для парсинга
 * @param {String} parent_path Путь к файлу, который сейчас обрабатываем
 * @param {Function} throw_error Фукцния выбрасывания ошибок
 *
 * @memberof Pattern
 * @protected
 */
function linker(data, parent_path, throw_error) {
    for (let i = 0; true; i++) {
        if (data[i] == null) return data;

        if (data[i].equals(CHARTYPE.WORD, "include")) {
            if (
                maybeEquals(data, i + 1, CHARTYPE.NEWLINE) &&
                data[i + 1].equals(CHARTYPE.STRING)
            ) {
                const path = join(
                    dirname(parent_path),
                    data[i + 1].data.toString(),
                );

                if (parent_path != null) {
                    try {
                        data.splice(
                            i,
                            data[i + 2].equals(CHARTYPE.OPERATOR, ";") ? 3 : 2,
                            ...lexer(readFileSync(path), false),
                        );
                    } catch (e) {
                        throw_error(
                            data[i].position,
                            new Exceptions.LinkerIOError(path),
                        );
                    }
                } else {
                    throw_error(
                        data[i].position,
                        new Exceptions.LinkerPathNotGiveExceptrion(),
                    );
                }
            }
        }
    }
}

/**
 * Парсит вызов функции, возвращает объект вызова функции, и позицию с которой можно продолжить прасинг
 *
 * @param {Array<String|Number>} query_stack стек доступа к имени переменной
 * @param {Number} start начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: FunctionCall, jump: Number}} объект вызова функции, и позиция с которой можно продолжить прасинг
 *
 * @memberof Pattern
 * @protected
 */
function parseFunctionCall(query_stack, start, data, throw_error) {
    const args = segmentationParser(
        start,
        data,
        throw_error,
        ",",
        Infinity,
        `(${query_stack
            .map((e) => (typeof e === "number" ? `[${e}]` : e))
            .join(" => ")})`,
    );

    return {
        data: new FunctionCall(query_stack, args.data, data[start]),
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
 * @param {Number} start начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: TernarOperator, jump: Number}} объект тернарного выражения, и позиция с которой можно продолжить прасинг
 *
 * @memberof Pattern
 * @protected
 */
function parseObject(start, data, throw_error, level = 0) {
    let result = null,
        count = 0,
        entries = new Array([]),   // Значения объекта
        last_row = start,
        expected = 0;              // Ожидаемое следующие значение

    for (let i = start; true; i++) {
        switch (true) {
            case data[i] === undefined || expected === 3 && !data[i].equals(CHARTYPE.OPERATOR, ',') || data[i].equals(CHARTYPE.OPERATOR, ';'):
                if(entries[entries.length - 1].length !== 2)
                    throw_error(data[i].position, new Exceptions.ParserEmtyArgumentException());

                return {
                    data: new ObjectContructorCall('Object', new Map(entries)),
                    jump: i - start
                };
            default:
                switch(expected){
                    case 0:
                        if(maybeEquals(data, i, CHARTYPE.NEWLINE) && data[i].equals(CHARTYPE.WORD)){
                            entries[entries.length - 1][0] = data[i].toString();

                            expected = 1;
                        } else {
                            throw_error(data[i].position, new Exceptions.UnexpectedTokenException(data[i], 'any word'));
                        }
                    break;
                    case 1:
                        maybeEquals(data, i, CHARTYPE.NEWLINE);

                        count = countKeys(data, i, CHARTYPE.OPERATOR, '-');

                        // - ('-' * level)
                        if(count === level + 1) {
                            i += count;

                            if(!data[i].equals(CHARTYPE.OPERATOR, '>')){
                                throw_error(data[i].position, new Exceptions.UnexpectedTokenException(data[i], '>'));
                            }

                            expected = 2;
                        } else {
                            entries.pop();

                            if(count < level + 1) {
                                return {
                                    data: new ObjectContructorCall('Object', new Map(entries)),
                                    jump: last_row - start
                                };
                            } else {
                                throw_error(data[i].position, new Exceptions.BadArrowNotationJumpingToUpperLevel());
                            }
                        }
                    break;
                    case 2:
                        maybeEquals(data, i, CHARTYPE.NEWLINE)

                        count = countKeys(data, i + 1, CHARTYPE.OPERATOR, '-');

                        /// Если как значение передан инициализатор другого объекта
                        ///
                        /// some ->
                        ///     some1 --> 'some',
                        if(
                            data[i + level + 3] != null &&
                            data[i].equals(CHARTYPE.WORD) &&
                            count === level + 2 && 
                            data[i + level + 3].equals(CHARTYPE.OPERATOR, '>')
                        ){                            
                            result = parseObject(i, data, throw_error, level + 1);

                            i += result.jump - 1;

                            entries[entries.length - 1][1] = result.data;

                            expected = 3;

                        /// Неправильная нотация
                        ///
                        ///
                        } else if(count > level + 2) {
                            throw_error(data[i + 1].position, new Exceptions.BadArrowNotationJumpingTwoLevels());
                        /// Если как значение передано выражение
                        ///
                        /// some -> 'somesome...';
                        }else {
                            result = parseExpression(i, data, throw_error, [',', ';']);

                            i += result.jump - 1;

                            entries[entries.length - 1][1] = result.data;

                            expected = 3;
                        }
                    break;
                    case 3:
                        entries.push([]);

                        last_row = i;

                        expected = 0;
                    break;
                }
                break;
        }
    }
}

/**
 * Парсит тернарное выражение, возвращает объект тернарного выражения, и позицию с которой можно продолжить прасинг
 *
 * @param {ExpressionGroup} condition Условие, при котором тернарное выражение будет верным
 * @param {Number} start начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: TernarOperator, jump: Number}} объект тернарного выражения, и позиция с которой можно продолжить прасинг
 *
 * @memberof Pattern
 * @protected
 */
function parseTernar(condition, start, data, throw_error) {
    let hook_index = 0, // Считаем скобки
        buffer = new Array(),
        args = new Array();

    function push(token) {
        if (buffer.length !== 0) {
            args.push(parseExpression(0, buffer, throw_error).data);

            buffer.splice(0, buffer.length);
        } else
            throw_error(
                token != undefined ? token.position : data[start],
                new Exceptions.ParserEmtyArgumentException(),
            );
    }

    for (let i = start; true; i++) {
        switch (true) {
            case data[i] === undefined ||
                data[i].equals(CHARTYPE.OPERATOR, ";") ||
                data[i].equals(CHARTYPE.NEWLINE) ||
                (data[i].equals(CHARTYPE.OPERATOR, ")") && hook_index <= 0):
                push(data[i]);

                if (args[0] === undefined || args[1] === undefined)
                    throw_error(
                        data[start].position,
                        new Exceptions.ParserEmtyArgumentException(),
                    );

                return {
                    data: new TernarOperator(condition, args[0], args[1]),
                    jump:
                        i -
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
                    new Exceptions.ParserLogicException(),
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
 * @param {Number} start начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: Array<Number|String>, jump: Number}} массив со стэком запроса, по которому можно получит доступ к переменной, и позиция с которой можно продолжить парсинг
 *
 * @memberof Pattern
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
                while (
                    data[i] != null &&
                    !(
                        data[i].equals(CHARTYPE.OPERATOR, "]") &&
                        hook_index === 0
                    )
                ) {
                    if (data[i].equals(CHARTYPE.OPERATOR, "[")) hook_index++;
                    else if (data[i].equals(CHARTYPE.OPERATOR, "]"))
                        hook_index--;

                    i++;
                }

                if (hook_index != 0)
                    throw_error(
                        data[i].position,
                        new Exceptions.ParserLogicException(),
                    );

                // Вставляем выражение как оператор доступа
                buffer.push(
                    parseExpression(0, data.slice(hook_start, i), throw_error)
                        .data,
                );
                continue;
            default:
                throw_error(
                    data[i].position,
                    new Exceptions.InvalidSequenceForLetiableAccessException()
                );
                continue;
        }
    }
}

/**
 * Парсит выражение, позвращает выражение и позицию, с которой можно продолжить парсинг
 *
 * @param {Number} start начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 * @param {String} end_marker маркер конца выражения
 *
 * @returns {{data: ExpressionGroup, jump: Number}} выражение и позиция, с которой можно продолжить парсинг
 *
 * @memberof Pattern
 * @protected
 */
function parseExpression(start, data, throw_error, end_marker = ';') {
    if (data.length === 0)
        return {
            data: new ExpressionGroup(0),
            jump: 0,
        };

    let buffer = new ExpressionGroup(data[0].position),
        deep = 0,
        result = new Array();

    function append(d) {
        let targ_d = buffer;

        for (let i = 0; i < deep; i++) {
            targ_d = targ_d.data[targ_d.data.length - 1];
        }

        return targ_d.append(d, throw_error);
    }

    for (let i = start; true; i++) {
        if (
            data[i] == undefined ||
            data[i].contentEquals(end_marker) ||
            data[i].equals(CHARTYPE.NEWLINE)
        ) {
            buffer.complete(throw_error);

            return {
                data: buffer,
                jump: i - start,
            };
        }

        switch (true) {
            case data[i].equals(CHARTYPE.WORD):
                // Ключевые слова
                switch (data[i].toString()) {
                    case "true":
                    case "false":
                    case "null":
                        append(data[i]);
                        continue;
                }

                result[0] = parseVarName(
                    i,
                    data,
                    throw_error,
                );

                if (data[i + result[0].jump] != null && data[i + result[0].jump].equals(CHARTYPE.OPERATOR, "(")) {
                    // Функция
                    result[1] = parseFunctionCall(
                        result[0].data,
                        i + result[0].jump + 1,
                        data,
                        throw_error,
                    );

                    i += result[0].jump + result[1].jump + 1;

                    append(result[1].data);
                } else if(
                    data[i + result[0].jump + 1] != null && data[i + result[0].jump].equals(CHARTYPE.OPERATOR, "-") &&
                    data[i + result[0].jump + 1].equals(CHARTYPE.OPERATOR, ">")
                ) {
                    // Конструктор объекта
                    result[1] = parseObject(
                        i + result[0].jump + 2,
                        data,
                        throw_error,
                        0
                    );

                    i += result[0].jump + result[1].jump + 2;

                    append(result[1].data);
                } else {
                    // Получение значения переменной
                    append(new GetOperator(data[i].position, result[0].data));

                    i += result[0].jump - 1;
                }
                continue;
            // Конструктор объекта
            case data[i + 1] != null && 
                data[i].equals(CHARTYPE.OPERATOR, "-") &&
                data[i + 1].equals(CHARTYPE.OPERATOR, ">"):
                // Конструктор объекта
                result[0] = parseObject(
                    i + 2,
                    data,
                    throw_error,
                    0
                );

                i += result[0].jump + 2;

                append(result[0].data);

                continue;
            case data[i].equals(CHARTYPE.OPERATOR, "("):
                append(new ExpressionGroup(data[i].position));

                deep++;
                continue;
            case data[i].equals(CHARTYPE.OPERATOR, ")"):
                deep--;

                if (deep < 0)
                    throw_error(
                        data[i].position,
                        new Exceptions.ParserLogicException(),
                    );
                continue;
            // expression ? v1 : v2;
            case data[i].equals(CHARTYPE.OPERATOR, "?"):
                buffer.complete(throw_error);

                let targ_d = buffer;

                while (true) {
                    if (
                        targ_d.data &&
                        targ_d.data[targ_d.data.length - 1] instanceof
                            ExpressionGroup
                    )
                        targ_d = targ_d.data[targ_d.data.length - 1];
                    else break;
                }

                result[0] = parseTernar(
                    new ExpressionGroup(data[i].position, targ_d.data),
                    i + 1,
                    data,
                    throw_error,
                );

                i += 1 + result[0].jump;

                if (deep === 0) {
                    return {
                        data: result[0].data,
                        jump: i - start,
                    };
                } else 
                    targ_d.data = [result[0].data];

                continue;
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
                    append(data[i]);
                continue;
            default:
                throw_error(
                    data[i].position,
                    new Exceptions.UnexpectedTokenException(
                        data[i].toString(),
                        "*",
                    ),
                );
        }
    }
}

/**
 * Парсит исполняемый сегмент, после чего возвращает величину прыжка и данные исполнения
 *
 * @param {Number} start начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error {@link CodeEmitter.throwError} - Вызывается при ошибке функция, котора первым ��ргументм принимает позицию вхождения на котором произошла ошибка
 * @param {String} segment_separator Разделитель для сегментов
 * @param {Number} max_segments Максимальное число сегментов, если это число сегментов будет превышено, будет выбражено исключение
 * @param {String} blockname Название блока
 *
 * @returns {{data: Array<ExpressionGroup>, jump: Number}} массив со стэком запроса, по которому можно получит доступ к переменной, и позиция с которой можно продолжить парсинг
 *
 * @memberof Pattern
 * @protected
 */
function segmentationParser(
    start,
    entries,
    throw_error,
    segment_separator = ",",
    max_segments = Infinity,
    blockname = "unknown",
) {
    let hook_index = 0,
        buffer = [new Array()];

    for (let i = start; true; i++) {
        switch (true) {
            case entries[i] === undefined ||
                (entries[i].equals(CHARTYPE.OPERATOR, ")") && hook_index <= 0):
                if (buffer.length > 0 && buffer[buffer.length - 1].length > 0) {
                    buffer[buffer.length - 1] = parseExpression(
                        0,
                        buffer[buffer.length - 1],
                        throw_error,
                    ).data;
                } else if (buffer.length > 1) {
                    throw_error(
                        entries[i - 1].position,
                        new Exceptions.SegmentationFaultEmptyArgumentException(blockname)
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
                } else
                    throw_error(
                        entries[i].position,
                        new Exceptions.ParserLogicException(),
                    );
                continue;
            case entries[i].contentEquals(segment_separator) &&
                hook_index === 0:
                if (buffer[buffer.length - 1].length > 0) {
                    buffer[buffer.length - 1] = parseExpression(
                        0,
                        buffer[buffer.length - 1],
                        throw_error,
                    ).data;
                        
                    buffer.push(new Array());

                    if (buffer.length > max_segments)
                        throw_error(
                            entries[i].position,
                            new Exceptions.SegmentationFaultMaximumSegmentsForBlockException(blockname)
                        );
                } else {
                    throw_error(
                        entries[i].position,
                        new Exceptions.SegmentationFaultEmptyArgumentException(blockname)
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
 * @param {Number} start начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: Array<SequenceGroup>, jump: Number}} массив с выражениями, и позиция с которой можно продолжить парсинг
 *
 * @memberof Pattern
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
                } else
                    throw_error(
                        entries[i].position,
                        new Exceptions.ParserLogicException(),
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
 * @param {Number} start начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: IfStatement, jump: Number}} Объякт дескриптор блока if, и позиция с которой можно продолжить парсинг
 *
 * @memberof Pattern
 * @protected
 */
function ifStatementParser(start, entries, throw_error) {
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
            throw_error,
            "",
            1,
            "if",
        );

        index += result[0].jump + 3;

        // { expression }
        if (
            maybeEquals(entries, index, CHARTYPE.NEWLINE) &&
            entries[index].equals(CHARTYPE.OPERATOR, "{")
        ) {
            result[1] = segmentCutter(index + 1, entries, throw_error);

            index += result[1].jump + 1;

            // Else statement
            if (
                entries[index + 1] != null &&
                entries[index + 1].equals(CHARTYPE.WORD, "else")
            ) {
                // { expression }
                if (
                    maybeEquals(entries, index + 2, CHARTYPE.NEWLINE) &&
                    entries[index + 2].equals(CHARTYPE.OPERATOR, "{")
                ) {
                    result[2] = segmentCutter(index + 3, entries, throw_error);

                    index += result[2].jump + 3;

                    return {
                        data: new IfStatement(
                            result[0].data[0],
                            result[1].data,
                            result[2].data,
                        ),
                        jump: index - start,
                    };
                } else if (
                    maybeEquals(entries, index + 2, CHARTYPE.NEWLINE) &&
                    entries[index + 2].equals(CHARTYPE.WORD, "if")
                ) {
                    result[2] = ifStatementParser(
                        index + 2,
                        entries,
                        throw_error,
                    );

                    index += result[2].jump + 2;

                    return {
                        data: new IfStatement(
                            result[0].data[0],
                            result[1].data,
                            result[2].data,
                        ),
                        jump: index - start,
                    };
                } else {
                    throw_error(
                        entries[index + 2].position,
                        new Exceptions.UnexpectedTokenStatement(
                            "else",
                            entries[index + 2].toString(),
                            "{",
                        ),
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
                new Exceptions.UnexpectedTokenStatement(
                    "if",
                    entries[index].toString(),
                    "{",
                ),
            );
        }
    } else {
        throw_error(
            entries[index + 1].position,
            new Exceptions.UnexpectedTokenStatement(
                "if",
                    entries[index + 1].toString(),
                "(",
            ),
        );
    }
}

/**
 * Парсит тело (главное тело или секции исполняемых блоков) преобразуя вхождения в исполняемую последовательность.
 *
 * @param {Number} start начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {
 *      {
 *          data: SequenceGroup,
 *          jump: Number
 *      }
 * } Исполняемый стэк, и позиция с которой можно продолжить парсинг
 * @memberof Pattern
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

                    buffer.pushInStack(new OutOperator(result[0].data));
                    continue;
                case entries[i].equals(CHARTYPE.WORD, "if"):
                    result[0] = ifStatementParser(i, entries, throw_error);

                    i += result[0].jump;

                    buffer.pushInStack(result[0].data);
                    continue;
                case entries[i].equals(CHARTYPE.WORD, "while"):
                    if (
                        i + 1 < leng &&
                        maybeEquals(entries, i + 1, CHARTYPE.NEWLINE) &&
                        entries[i + 1].equals(CHARTYPE.OPERATOR, "(")
                    ) {
                        // statement ( ...parse... )
                        result[0] = segmentationParser(
                            i + 2,
                            entries,
                            throw_error,
                            "",
                            1,
                            "while",
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
                                throw_error,
                            );

                            i += result[1].jump + 1;

                            buffer.pushInStack(
                                new WhileStatement(
                                    result[0].data[0],
                                    result[1].data,
                                ),
                            );
                        } else {
                            throw_error(
                                entries[i].position,
                                new Exceptions.UnexpectedTokenStatement(
                                    "while",
                                    entries[i].toString(),
                                    "{",
                                ),
                            );
                        }
                    } else {
                        throw_error(
                            entries[i + 1].position,
                            new Exceptions.UnexpectedTokenStatement(
                                "while",
                                entries[i + 1].toString(),
                                "(",
                            ),
                        );
                    }
                    continue;
                case entries[i].equals(CHARTYPE.WORD, "repeat"):
                    if (
                        i + 1 < leng &&
                        maybeEquals(entries, i + 1, CHARTYPE.NEWLINE) &&
                        entries[i + 1].equals(CHARTYPE.OPERATOR, "(")
                    ) {
                        // statement ( ...parse... )
                        result[0] = segmentationParser(
                            i + 2,
                            entries,
                            throw_error,
                            ";",
                            2,
                            "repeat",
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
                                throw_error,
                            );

                            i += result[1].jump + 1;

                            buffer.pushInStack(
                                new RepeatStatement(
                                    result[0].data[0],
                                    result[0].data[1],
                                    result[1].data,
                                ),
                            );
                        } else {
                            throw_error(
                                entries[i].position,
                                new Exceptions.UnexpectedTokenStatement(
                                    "repeat",
                                    entries[i].toString(),
                                    "{",
                                ),
                            );
                        }
                    } else {
                        throw_error(
                            entries[i + 1].position,
                            new Exceptions.UnexpectedTokenStatement(
                                "repeat",
                                entries[i + 1].toString(),
                                "(",
                            ),
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
                                throw_error,
                            );

                            buffer.pushInStack(
                                new SetOperator(entries[i + 1], result[0].data),
                            );

                            i += result[0].jump + 3;

                            continue;
                        } else {
                            throw_error(
                                entries[i + 3].position,
                                new Exceptions.UnexpectedWordTypeAndGetException(entries[i + 2].toString(), entries[i + 2].type)
                            );
                        }
                    } else {
                        throw_error(
                            entries[i + 2].position,
                            new Exceptions.UnexpectedWordTypeAndGetException(entries[i + 1].toString(), entries[i + 1].type)
                        );
                    }
                case entries[i].equals(CHARTYPE.WORD):
                    result[0] = parseVarName(i, entries, throw_error);

                    // Если следующий символ доступен
                    if (i + result[0].jump < leng) {
                        // Переопределение
                        if (
                            entries[i + result[0].jump].equals(
                                CHARTYPE.OPERATOR,
                                "=",
                            )
                        ) {
                            result[1] = parseExpression(
                                result[0].jump + i + 1,
                                entries,
                                throw_error,
                            );

                            buffer.pushInStack(
                                new ResetOperator(
                                    entries[i + result[0].jump].position,
                                    result[0].data,
                                    result[1].data,
                                ),
                            );

                            i += result[0].jump + result[1].jump + 1;

                            // Добавление
                        } else if (
                            entries[i + result[0].jump].equals(
                                CHARTYPE.OPERATOR,
                                "<",
                            )
                        ) {
                            if (
                                entries[i + result[0].jump + 1].equals(
                                    CHARTYPE.OPERATOR,
                                    "-",
                                )
                            ) {
                                result[1] = parseExpression(
                                    result[0].jump + i + 2,
                                    entries,
                                    throw_error,
                                );

                                buffer.pushInStack(
                                    new PushOperator(
                                        entries[i + result[0].jump].position,
                                        result[0].data,
                                        result[1].data,
                                    ),
                                );

                                i += result[0].jump + result[1].jump + 2;
                            } else {
                                throw_error(
                                    entries[i + result[0].jump + 1].position,
                                    new Exceptions.UnexpectedTokenException(
                                        entries[
                                            i + result[0].jump + 1
                                        ].toString(),
                                        "-",
                                    ),
                                );
                            }

                            // Вызов функции
                        } else if (
                            entries[i + result[0].jump].equals(
                                CHARTYPE.OPERATOR,
                                "(",
                            )
                        ) {
                            result[1] = parseExpression(
                                i,
                                entries,
                                throw_error,
                            );

                            buffer.pushInStack(result[1].data);

                            i += result[1].jump;

                            // Ошибка
                        } else {
                            throw_error(
                                entries[i].position,
                                new Exceptions.InvalidSequenceForLetiableAccessException()
                            );
                        }
                    } else {
                        i += result[0].jump;
                    }
                    continue;
                case entries[i].equals(CHARTYPE.NUMBER) ||
                    entries[i].equals(CHARTYPE.STRING):
                    result[0] = parseExpression(i, entries, throw_error);

                    buffer.pushInStack(result[0].data);

                    i += result[0].jump;
                    continue;
                default:
                    throw_error(
                        entries[i].position,
                        new Exceptions.UnexpectedTokenException(
                            entries[i].toString(),
                            "*",
                        ),
                    );
            }
        } catch (e) {
            console.log(e)

            if (entries.length != 0) {
                if (entries[i] != null)
                    throw_error(entries[i].position, new Exceptions.CriticalParserErrorException());
                else
                    throw_error(
                        entries[entries.length - 1].position,
                        new Exceptions.CriticalParserErrorUnexpectedEndOfInputException()
                    );
            } else {
                throw_error(
                    0,
                    new Exceptions.CriticalParserErrorNoRawDataTransmittedException()
                );
            }
        }
    }
}

/**
 * Парсит вхождения, которые можно получить вызовом функции @see {@link lexer}
 *
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error {@link CodeEmitter.throwError} - Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 * @param {?String} parent_path путь к шаблону
 *
 * @returns {SequenceMainGroup} Тело исполнителя
 *
 * @memberof Pattern
 * @protected
 */
function parser(entries, throw_error, parent_path) {
    const exports = new SequenceMainGroup(),
        body = codeBlockParser(
            0,
            linker(
                entries,
                parent_path,
                throw_error
            ),
            throw_error,
        );

    exports.Sequence = body.data.Sequence;

    return exports;
}

/**
 * @lends CodeEmitter;
 */
class CodeEmitter {
    /**
     * Абстрактный класс который предназначен для подготовке всех наследуемых эмитттеров.
     *
     * @param {
     *  String | {
     *          raw: String,
     *          path: String,
     *          charset: String
     *      }
     * } input Входящая строка с выражением
     *
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     *
     * @param {
     *      {
     *          log: Function,
     *          warn: Function,
     *          error: Function
     *      }
     *  } logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Pattern
     * @constructs CodeEmitter
     * @abstract
     * @protected
     */
    constructor(input, import_s = [], logger = console.log) {
        if (typeof input === "string") this.input = input;
        else if (typeof input === "object") {
            if (typeof input.raw === "string") this.input = input.raw;
            else if (typeof input.path === "string") {
                this.input = readFileSync(
                    input.path,
                    input.charset != null ? input.charset : "utf-8",
                );
            } else throw new Error("BAD_DATA_FORMAT");

            this.charset =
                typeof input.charset === "string" ? input.charset : "utf-8";
            this.path = typeof input.path === "string" ? input.path : __dirname;
        } else {
            throw new Error("BAD_DATA_FORMAT");
        }

        this.logger = logger;

        this.heap = new Heap(Import(["default.lib", ...import_s], logger));
        this.import = import_s;

        if (typeof this.input !== "string")
            throw new TypeError(
                "The `input` parameter must have a string type. But now `input` have a `" +
                    typeof string +
                    "` type.",
            );
    }

    /**
     * Устанавливает новый хип памяти как текущий
     *
     * @param {Heap} heap Хип памяти который нужно установить.
     * @method
     * @public
     */
    setHeap(heap) {
        if (heap instanceof Heap) this.heap = heap;
        else throw new TypeError();
    }

    /**
     * Выводит сообщение об ошибке, прекращает выполнения текущего шаблона.
     *
     * @param {Number} pos Позиция в которой произшла ошибка
     * @param {String} message Сообщение с ошибкой
     * @param {Number} rad_of Радиус печати, т.е. количество строк которое будет печатать в вывод по мимо строки на которой произошла ошибка
     * @method
     * @public
     */
    throwError(pos, message, rad_of = 5) {
        rad_of = parseInt(rad_of);

        let buffer = [message instanceof Error ? message.message : message],
            data = this.input.split("\n"),
            line_dump = Buffer.from(this.input)
                .subarray(0, pos)
                .toString("utf8")
                .split("\n"),
            line = line_dump.length - 1,
            line_start =
                line - parseInt(rad_of / 2) < 0
                    ? 0
                    : line - parseInt(rad_of / 2),
            line_end =
                line_start + rad_of < data.length
                    ? line_start + rad_of
                    : data.length,
            ll = line_end.toString(16).length + 2;

        buffer.push(
            ", at ",
            this.path,
            ", at ",
            line,
            ":" + line_dump[line].length,
            " symbol :>\n",
        );

        for (let i = line_start; i < line_end; i++) {
            buffer.push(" ", toFixed(i, ll), " |> ", data[i]);

            if (i === line) {
                buffer.push(
                    "\n ",
                    new Array(ll + 1).join(" "),
                    " |> " + new Array(line_dump[line].length).join(" "),
                    "^",
                );
            }

            if (i + 1 !== line_end) buffer.push("\n");
        }

        this.logger.error(buffer.join(""));

        if (message instanceof Error) throw message;
        else throw new Exceptions.ParserException();
    }

    /**
     * Интерфейс выводу результат выполнения блока
     *
     * @param {Heap|Object} data Входные данные
     * @abstract
     * @method
     * @public
     */
    result(data = new Heap()) {
        // Do something
    }
}

/**
 * @lends MessagePattern;
 */
class MessagePattern extends CodeEmitter {
    /**
     * Шаблон сообщения, на вход нужно подавать код вида: <br> <br>
     * <code>
     *  Not formatted text... <br>
     *  Not formatted text... <br>
     *  { <br>
     *  &nbsp;&nbsp;&nbsp;&nbsp;// You code here <br>
     *  } <br>
     *  Not formatted text... <br>
     *  Not formatted text... <br>
     * </code> <br>
     * Т.е. код поадется туда в фигурных скобках, а все что не в них будет распознано как текст.
     *
     * @param {
     *      String | {
     *          raw: String,
     *          path: String,
     *          charset: String
     *      }
     * } input Входящая строка с выражением
     *
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     *
     * @param {
     *      {
     *          log: Function,
     *          warn: Function,
     *          error: Function
     *      }
     *  } logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Pattern
     * @constructs MessagePattern
     * @protected
     */
    constructor(input, import_s, logger = console.log) {
        super(input, import_s, logger);

        this.data = new Array();

        const entries = lexer(Buffer.from(this.input)),
            buffer = new Array();

        let hook_index = 0;

        for (let i = 0, leng = entries.length; i < leng; i++) {
            if (entries[i].equals(CHARTYPE.OPERATOR, "{") && hook_index === 0) {
                if (buffer.length > 0) {
                    this.data.push(
                        new OutOperator(
                            new NativeString(buffer.join("")),
                        ),
                    );

                    buffer.splice(0, buffer.length);
                }

                hook_index++;

                continue;
            } else if (
                entries[i].equals(CHARTYPE.OPERATOR, "}") &&
                hook_index === 1
            ) {
                this.data.push(
                    parser(
                        buffer.filter((e) => e.type !== CHARTYPE.SPACE),
                        this.throwError.bind(this),
                        this.path,
                    ),
                );

                buffer.splice(0, buffer.length);

                hook_index--;

                continue;
            } else {
                switch (true) {
                    case entries[i].equals(CHARTYPE.OPERATOR, "{"):
                        hook_index++;
                        break;
                    case entries[i].equals(CHARTYPE.OPERATOR, "}"):
                        hook_index--;
                        break;
                }
            }

            if (!hook_index === 0) buffer.push(entries[i].toString());
            else buffer.push(entries[i]);
        }

        if (buffer.length !== 0)
            if (hook_index === 1) {
                this.data.push(
                    parser(
                        buffer.filter((e) => e.type !== CHARTYPE.SPACE),
                        this.throwError.bind(this),
                        this.path,
                    ),
                );

                buffer.splice(0, buffer.length);
            } else if (hook_index === 0) {
                this.data.push(
                    new OutOperator(
                        new NativeString(buffer.join("")),
                    ),
                );

                buffer.splice(0, buffer.length);
            } else {
                this.throwError(
                    entries[entries.length - 1].position,
                    new Exceptions.UnexpectedTokenException(
                        entries[entries.length - 1],
                        "}",
                    ),
                );
            }
    }

    /**
     * Возвращает результат выполенения блока
     *
     * @returns {Array<Any>} результат выполнения блока
     * @method
     * @public
     */
    result(data = new Heap(), error = this.throwError.bind(this)) {
        const out = new Array();

        if (Array.isArray(data)) {
            for (let i = 0, leng = data.length; i < leng; i++)
                if (typeof data[i] === "object" && !(data[i] instanceof Heap)) {
                    data[i] = new Heap(data[i]);
                }

            if (data.find((e) => !(e instanceof Heap)) == null) {
                const context = new Context(this.heap, ...data);

                for (let i = 0, leng = this.data.length; i < leng; i++)
                    this.data[i].result(context, out, error);
            } else {
                throw new TypeError("Data must have a Heap type");
            }
        } else {
            if (typeof data === "object" && !(data instanceof Heap)) {
                data = new Heap(data);
            }

            if (data instanceof Heap) {
                const context = new Context(this.heap, data);

                for (let i = 0, leng = this.data.length; i < leng; i++)
                    this.data[i].result(context, out, error);
            } else {
                throw new TypeError("Data must have a Heap type");
            }
        }

        return out;
    }
}

/**
 * @lends ExcecutionPattern;
 */
class ExcecutionPattern extends CodeEmitter {
    /**
     * Шаблон кода, все что подается сюда, будет распознаваться как код шаблонизатора: <br> <br>
     * <code>
     *  set somevar = arrays.create(); <br>
     *  <br>
     *  somevar <- 'Hello '; <br>
     *  somevar <- 'World'; <br>
     *  <br>
     *  repeat(0; 2){ <br>
     *  &nbsp;&nbsp;&nbsp;&nbsp;> objects.get(somevar, current); <br>
     *  } <br> <br>
     *  // По завершению выполнения шаблона будет выведено Hello World
     * </code> <br> <br>
     *
     * @param {
     *      String | {
     *          raw: String,
     *          path: String,
     *          charset: String
     *      }
     * } input Входящая строка с выражением
     *
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     *
     * @param {
     *      {
     *          log: Function,
     *          warn: Function,
     *          error: Function
     *      }
     *  } logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Pattern
     * @constructs ExcecutionPattern
     * @protected
     */
    constructor(input, import_s, logger = console.log) {
        super(input, import_s, logger);

        this.data = parser(
            lexer(Buffer.from(this.input), false),
            this.throwError.bind(this),
            this.path,
        );
    }

    /**
     * Возвращает результат выполенения блока
     *
     * @returns {Array<Any>} результат выполнения блока
     * @method
     * @public
     */
    result(data = new Heap(), error = this.throwError.bind(this)) {
        const out = new Array();

        if (Array.isArray(data)) {
            for (let i = 0, leng = data.length; i < leng; i++)
                if (typeof data[i] === "object" && !(data[i] instanceof Heap)) {
                    data[i] = new Heap(data[i]);
                }

            if (data.find((e) => !(e instanceof Heap)) == null) {
                this.data.result(new Context(this.heap, ...data), out, error);
            } else {
                throw new TypeError("Data must have a Heap type");
            }
        } else {
            if (typeof data === "object" && !(data instanceof Heap)) {
                data = new Heap(data);
            }

            if (data instanceof Heap) {
                this.data.result(new Context(this.heap, data), out, error);
            } else {
                throw new TypeError("Data must have a Heap type");
            }
        }

        return out;
    }
}

/**
 * @lends ExpressionPattern;
 */
class ExpressionPattern extends CodeEmitter {
    /**
     * Шаблон выражения, сюда можно подать на всход выражение, а на выходе получить результат выполнения этого выражения: <br> <br>
     * <code>
     *  2 + (3 * (5 * (2 * 2)) / 3)
     * </code> <br> <br>
     * Пример выше выведет 22
     *
     * @param {
     *      String | {
     *          raw: String,
     *          path: String,
     *          charset: String
     *      }
     * } input Входящая строка с выражением
     *
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     *
     * @param {
     *      {
     *          log: Function,
     *          warn: Function,
     *          error: Function
     *      }
     *  } logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Pattern
     * @constructs ExpressionPattern
     * @protected
     */
    constructor(input, import_s, logger = console.log) {
        super(input, import_s, logger);

        this.data = parseExpression(
            0,
            lexer(Buffer.from(this.input), false),
            this.throwError.bind(this),
        ).data;
    }

    /**
     * Возвращает результат выполенения выражения
     *
     * @returns {Object} результат выполнения выражения
     * @method
     * @public
     */
    result(data = new Heap(), error = this.throwError.bind(this)) {
        if (!(data instanceof Context)) {
            if (Array.isArray(data)) {
                for (let i = 0, leng = data.length; i < leng; i++)
                    if (
                        typeof data[i] === "object" &&
                        !(data[i] instanceof Heap)
                    ) {
                        data[i] = new Heap(data[i]);
                    }

                if (data.find((e) => !(e instanceof Heap)) == null) {
                    return this.data.result(
                        new Context(this.heap, ...data),
                        [],
                        error,
                    );
                } else {
                    throw new TypeError("Data must have a Heap type");
                }
            } else {
                if (typeof data === "object" && !(data instanceof Heap)) {
                    data = new Heap(data);
                }

                if (data instanceof Heap) {
                    return this.data.result(
                        new Context(this.heap, data),
                        [],
                        error,
                    );
                } else {
                    throw new TypeError("Data must have a Heap type");
                }
            }
        } else {
            return this.data.result(data, [], error);
        }
    }
}

module.exports.Heap = Heap;
module.exports.HeapIndexed = HeapIndexed;
module.exports.CodeEmitter = CodeEmitter;
module.exports.MessagePattern = MessagePattern;
module.exports.ExpressionPattern = ExpressionPattern;
module.exports.ExcecutionPattern = ExcecutionPattern;
module.exports.parser = parser;
module.exports.lexer = lexer;
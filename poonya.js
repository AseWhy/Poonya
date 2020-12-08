/**
 * @author Astecom
 * @license MIT
 * @namespace Poonya
 * @version 0.4.5
 * @see {@link https://github.com/AseWhy/Poonya|GitHub}
 * @description Шаблонизатор, используется для создания шаблонов, и их последующего вывода
 * 
 * <pre><code style='font-family: monospace'>
 *                      + @ W
 *                   + @ @ @ W #                                                         ____________________________________________________
 *                 : @ @ @ @ @ @                                                        |                      POONYA                       |
 *                 # * * * * @ @ *                                                     |      IS A TEMPLATING ENGINE THAT I HOPE WILL      |
 *               @ * * * * * * # W                                                    |           HELP YOU WITH TEXT PROCESSING           |
 *               * * * # @ # * * W                                                   |---------------------------------------------------|
 *             # @ @ @ @ @ @ @ @ W                                                  |              ASTECOM TRIED FOR YOU )              |
 *             @ @ @ @ @ # # @ @ W                                                 |     ______________________________________________|
 *             @ @ * * * * * * * W                                                |   /
 *             @ * * * * * * * * #                                               |  /
 *             * * * * @ @ @ @ @ @                                              | /
 *             * * @ @ @ @ @ @ @ @ +                                           |/
 *             # @ @ @ @ @ # * * * @                                     + W +
 *             * @ @ @ * * * * @ @ @                                   W , , @ @
 *               @ # * * * @ @ @ @ @ *                               @ , , * @ @ @
 *               @ * * * @ @ @ # * * *                             * , , , # @ @ @ #
 *                 * * @ @ # * * * * @ W                           , . , , , @ @ @ @ +
 *                 * @ @ * * * * @ @ @ @ + + + +                 # , , , * , @ @ @ @ @
 *                   W # * * * @ @ @ @ # * * * * # W             * : , , # , @ @ @ @ @
 *                     # * * # @ @ W * * * * * * * * # +         . . , , @ , @ @ @ @ @
 *                         W @ @ W * * * * * * * * * * * *       + , * : . * * * * * * * * @             + + + +
 *                           + * * * * * * * * * * * * * * + + W W , # , * + + + + * , , * * * W   # @ @ @ @ @ : :
 *                           + * * * * * * * * * * * * * * W # , , , @ * + + + + + * , , * * * * W @ @ @ @ @ , , ,
 *                           @ * * * * * * * * * * * * * * * @ , , + * . : . . @ + + , , * * , , @ @ @ @ @ , , , , #
 *                           * * * * * * * * * * * * * * * * , , * + . . # @ + . @ + * * * : , , # @ @ @ , , , , , #
 *                         + * * * * * * * * * * * * * * * * * * . . : @ @ @ @ + # + * * * * , * * # @ . , @ , , , +
 *                         + * * * * * * * * * * * * * * * * # . . W @ @ @ @ , , . * * * * * + + + + W , # , , W ,
 *                           * * * * * * * * * * * * * * # # # @ @ @ W @ @ , , , @ . , : * + + + + + * * , , : , @
 *                           * * * * * * * * * * * * * * * * + . @ @ @ @ , , , , , , , , + W . . . W + * , * , ,
 *                           W * * * * * * * * * * * * * * * # . @ W @ : , + , , , , , , , , @ W + . * * * , , .
 *                             * * * * * * * * * * * * * * @ * . @ @ @ , , W * * * * * , , , @ @ @ + W : . , ,
 *                             * * * * * * * * * * * * * * * * W @ @ @ , , W * * * * * # , , @ @ @ . : W # #
 *                             W * * * * * * * * * * @ @ * * * * @ @ @ , , W + + + + * * @ , @ @ @ : . # , ,
 *                           + * # * * * * * * * * @ @ @ @ @ * * W @ @ , , W + + + + * * , , @ @ @ . . * , # @
 *                           # * W * * * * * * * * @ @ @ @ @ * * * @ @ , , W + + + + * , , , @ @ @ + # * * W
 *                           @ * W * * * * * * * * @ @ @ @ @ * * * * @ , , W + + + * , , , @ @ @ W . : *
 *                           W @ W @ * * * * * * * @ @ @ @ @ # * * * @ , , W + + W , , , . @ @ W . . @ #
 *                             @ W @ @ * * * * * # + @ W @ @ @ * * * * @ , # * . , , , , @ @ @ : W +   +
 *                             @ @ @ @ @ * * * * *         + @ * * * * * * W , , , , , @ @ @ *
 *                             + @ W @ @ @ @ @ @             + # * * * * # @ # * * @ @ @ @ W +
 *                               @ @ W @ @ @ @ @ +             + * * @ @ @ @ @ W @ @ @ @ @ @ @ @ W
 *                                 @ @ W @ @ @ @ +               + @ @ @ @ @ @ @ @ W W @ @ @ @ @ @ +
 *                                   W W @ @ @ @ W                 # @ @ @ @ @ @ @ @ @ W @ @ @ @ *
 *                                         @ @ @ @                     @ W @ @ @ @ W @
 *                                         + @ @ *                           + # +
 * ==========================================================================================================================================
 * </code></pre>
 */

"use strict";

const { readdirSync, readFileSync } = require("fs")
    , { join, dirname, normalize, resolve, extname } = require("path");

/**
 * Типы символов
 *
 * @memberof Poonya
 * @constant CHARTYPE
 * @property {String} START     - Стартовый символ, ничего не значит        ``
 * @property {String} NUMBER    - Числовой тип                              `0-9.0-9`
 * @property {String} WORD      - Литеральный тип `                         `set`
 * @property {String} SPACE     - Тип пробела                               ` \t`
 * @property {String} POINT     - Тип точки                                 `.`
 * @property {String} STRING    - Строковой тип                             `'something...'`
 * @property {String} NEWLINE   - Тип новой строки                          `\n|\r`
 * @property {String} OPERATOR  - Тип оператора                             `= > <...`
 * @protected
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
    OPERATOR: "OPERATOR"
};

/**
 * Типы операторов
 *
 * @memberof Poonya
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
 * @protected
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
    OR: "OR"
};

/**
 * Флаги для полей
 *
 * @memberof Poonya
 * @constant FIELDFLAGS
 * @property {Number} NOOUTPUT - Запрет вывода, при серриализации объекта в объект js, это поле будет скрыто
 * @property {Number} CONSTANT - Константное значение, невозможно изменить оператором присваивания
 * @protected
 * @static
 */
const FIELDFLAGS = {
    NOOUTPUT: 0x1,
    CONSTANT: 0x2,
};

/**
 * Сервисная константа, для служебной информации
 *
 * @memberof Poonya
 * @constant SERVICE
 * @property {Number} CONSTRUCTORS - конструкторы объектов
 * @protected
 * @static
 */
const SERVICE = {
    CONSTRUCTORS: {
        OBJECT: [ 'Object' ],
        ARRAY: [ 'Array' ]
    }
}

/**
 * Занимаемая область в глобальном контексте
 * 
 * @memberof Poonya
 * @constant NAMESPACE
 * @protected
 * @static
 */
const NAMESPACE = Symbol.for('POONYA-' + process.pid + '-' + process.platform)

/**
 * Форматирует число подгоняя его под общую длинну
 *
 * @param {Number} d Чило для формата
 * @param {Number} l Желаемая длинна
 * @memberof Poonya
 * @function toFixed
 * @protected
 * @static
 */
function toFixed(d, l) {
    return "0x" + d.toString(16).padStart(l - 2, "0");
}

//#region Exceptions

/**
 * Класс ошибки шаблонизатора
 *
 * @memberof Poonya
 * @name ParserException
 * @class
 * @protected
 */
class PoonyaException extends Error {
    constructor(message){
        super("There were some errors while executing the template:\n" + message)
    }
}

/**
 * @namespace Poonya.Exceptions
 */
const Exceptions = {
    /**
     * @readonly
     * @field
     */
    PoonyaException: PoonyaException,

    /**
     * Основное исключение шаблонизатора
     *
     * @memberof Poonya.Exceptions
     * @name ParserException
     * @class
     * @protected
     */
    ParserException: class ParserException extends PoonyaException {
        constructor() {
            super("Error when processing raw data");
        }
    },

    /**
     * Исключение последовательности, неожиданная последовательность
     *
     * @memberof Poonya.Exceptions
     * @name TheSequenceException
     * @class
     * @protected
     */
    TheSequenceException: class TheSequenceException extends PoonyaException {
        constructor(entry) {
            super(`Wrong order: condition operator: '${entry.toString()}'`);
        }
    },

    /**
     * Исключение неизвестного токена
     *
     * @memberof Poonya.Exceptions
     * @name UnexpectedTokenException
     * @class
     * @protected
     */
    UnexpectedTokenException: class UnexpectedTokenException extends PoonyaException {
        constructor(token, expected) {
            super(
                `Unexpected token '${token.toString()}' when expected '${expected.toString()}'`,
            );
        }
    },

    /**
     * Исключение неизвестного токена
     *
     * @memberof Poonya.Exceptions
     * @name UnexpectedTokenStatement
     * @class
     * @protected
     */
    UnexpectedTokenStatement: class UnexpectedTokenStatement extends PoonyaException {
        constructor(statement, token, expected) {
            super(
                `Error parsing the '${statement.toString()}' statement. Expected '${expected.toString()}', when actually: '${token.toString()}'`,
            );
        }
    },

    /**
     * Логическое исключение
     *
     * @memberof Poonya.Exceptions
     * @name ParserLogicException
     * @class
     * @protected
     */
    ParserLogicException: class ParserLogicException extends PoonyaException {
        constructor() {
            super("The expression has incorrect logic");
        }
    },

    /**
     * Исключение пустого аргумента при вызове функции
     *
     * @memberof Poonya.Exceptions
     * @name ParserEmtyArgumentException
     * @class
     * @protected
     */
    ParserEmtyArgumentException: class ParserEmtyArgumentException extends PoonyaException {
        constructor() {
            super(
                "It is not possible to pass an empty argument to a function, use null to denote an empty value",
            );
        }
    },

    /**
     * Не передан путь родтельскому шаблону
     *
     * @memberof Poonya.Exceptions
     * @name LinkerPathNotGiveExceptrion
     * @class
     * @protected
     */
    LinkerPathNotGiveExceptrion: class LinkerPathNotGiveExceptrion extends PoonyaException {
        constructor() {
            super(
                "To use include, you must pass the path to the current execution file",
            );
        }
    },

    /**
     * Ошибка использования стороннего шаблона
     *
     * @memberof Poonya.Exceptions
     * @name LinkerIOError
     * @class
     * @protected
     */
    LinkerIOError: class LinkerIOError extends PoonyaException {
        constructor(path) {
            super("An error occured while opening file: '" + path + "'");
        }
    },

    /**
     * Ошибка выполнения нативной функции
     *
     * @memberof Poonya.Exceptions
     * @name NativeFunctionExcecutionError
     * @class
     * @protected
     */
    NativeFunctionExcecutionError: class NativeFunctionExcecutionError extends PoonyaException {
        constructor(name) {
            super("Critical error while executing a native function '" + name + "'");
        }
    },

    /**
     * Ошибка типа, возвращаемого нативной функцией
     *
     * @memberof Poonya.Exceptions
     * @name NativeFunctionReturnValueError
     * @class
     * @protected
     */
    NativeFunctionReturnValueError: class NativeFunctionReturnValueError extends PoonyaException {
        constructor() {
            super("Function can only return simple types");
        }
    },

    /**
     * Невозможно получить n от null
     *
     * @memberof Poonya.Exceptions
     * @name GetFieldOfNullException
     * @class
     * @protected
     */
    GetFieldOfNullException: class GetFieldOfNullException extends PoonyaException {
        constructor(field) {
            super(`Cannot get property '${field}' of null`);
        }
    },

    /**
     * Поле не является функцией
     *
     * @memberof Poonya.Exceptions
     * @name FieldNotAFunctionException
     * @class
     * @protected
     */
    FieldNotAFunctionException: class FieldNotAFunctionException extends PoonyaException {
        constructor(field) {
            super(`The field '${field}' is not a function`);
        }
    },

    /**
     * Поле уже объявлено
     *
     * @memberof Poonya.Exceptions
     * @name TheFieldAlreadyHasBeenDeclaredException
     * @class
     * @protected
     */
    TheFieldAlreadyHasBeenDeclaredException: class TheFieldAlreadyHasBeenDeclaredException extends PoonyaException {
        constructor(field) {
            super(`The '${field}' field is already declared`);
        }
    },

    /**
     * Поле должно быть массивом
     *
     * @memberof Poonya.Exceptions
     * @name TheFieldMustBeAnArrayInstanceExceprion
     * @class
     * @protected
     */
    TheFieldMustBeAnArrayInstanceExceprion: class TheFieldMustBeAnArrayInstanceExceprion extends PoonyaException {
        constructor(field) {
            super(`Field '${field}' must be an Array instance`);
        }
    },

    /**
     * Поле не объявлено
     *
     * @memberof Poonya.Exceptions
     * @name TheFieldNotHasDeclaredExceprion
     * @class
     * @protected
     */
    TheFieldNotHasDeclaredExceprion: class TheFieldNotHasDeclaredExceprion extends PoonyaException {
        constructor(field) {
            super(`Field '${field}' is not declared`);
        }
    },

    /**
     * Поле должно иметь тип числа
     *
     * @memberof Poonya.Exceptions
     * @name TheFieldMustBeNumberException
     * @class
     * @protected
     */
    TheFieldMustBeNumberException: class TheFieldMustBeNumberException extends PoonyaException {
        constructor(field) {
            super(`'${field}' must be a number, or a container containing a number`);
        }
    },

    /**
     * Невозможно распознать тип вхождения
     *
     * @memberof Poonya.Exceptions
     * @name UnableToRecognizeTypeException
     * @class
     * @protected
     */
    UnableToRecognizeTypeException: class UnableToRecognizeTypeException extends PoonyaException {
        constructor(type) {
            super(`Unable to recognize type '${type}'`);
        }
    },

    /**
     * Ошибка сегментации сегментов вызова (...exp, ...exp, ) <-
     * 
     * @memberof Poonya.Exceptions
     * @name SegmentationFaultEmptyArgumentException
     * @class
     * @protected
     */
    SegmentationFaultEmptyArgumentException: class SegmentationFaultEmptyArgumentException extends PoonyaException {
        constructor(blockname) {
            super(`Segmentation fault: empty argument for ` + blockname);
        }
    },

    /**
     * Ошибка сегментации сегментов вызова (...exp, ...exp, ) <-
     * 
     * @memberof Poonya.Exceptions
     * @name SegmentationFaultMaximumSegmentsForBlockException
     * @class
     * @protected
     */
    SegmentationFaultMaximumSegmentsForBlockException: class SegmentationFaultMaximumSegmentsForBlockException extends PoonyaException {
        constructor(blockname) {
            super(`Segmentation fault exceeded the maximum number of segments for block ` + blockname);
        }
    },

    /**
     * somed.dss[ <...exp> ] <-
     * 
     * @memberof Poonya.Exceptions
     * @name UnexpectedWordTypeAndGetException
     * @class
     * @protected
     */
    UnexpectedWordTypeAndGetException: class UnexpectedWordTypeAndGetException extends PoonyaException {
        constructor(value, type) {
            super(`Expected word type expression and get ${value}[${type}]`);
        }
    },

    /**
     * Невозможно получить доступ к полю, неправильно сотавлено выражение
     * 
     * @memberof Poonya.Exceptions
     * @name InvalidSequenceForLetiableAccessException
     * @class
     * @protected
     */
    InvalidSequenceForLetiableAccessException: class InvalidSequenceForLetiableAccessException extends PoonyaException {
        constructor() {
            super(`Invalid sequence for letiable access`);
        }
    },

    /**
     * Критическая ошибка парсера
     * 
     * @memberof Poonya.Exceptions
     * @name CriticalParserErrorException
     * @class
     * @protected
     */
    CriticalParserErrorException: class CriticalParserErrorException extends PoonyaException {
        constructor() {
            super(`Critical parser error`);
        }
    },

    /**
     * Критическая ошибка парсера, неожиданный конец ввода
     * 
     * @memberof Poonya.Exceptions
     * @name CriticalParserErrorUnexpectedEndOfInputException
     * @class
     * @protected
     */
    CriticalParserErrorUnexpectedEndOfInputException: class CriticalParserErrorUnexpectedEndOfInputException extends PoonyaException {
        constructor() {
            super(`Critical parser error: unexpected end of input`);
        }
    },

    /**
     * Критическая ошибка парсера, не переданны данные для парсинга
     * 
     * @memberof Poonya.Exceptions
     * @name CriticalParserErrorNoRawDataTransmittedException
     * @class
     * @protected
     */
    CriticalParserErrorNoRawDataTransmittedException: class CriticalParserErrorNoRawDataTransmittedException extends PoonyaException {
        constructor() {
            super(`Critical parser error: no raw data transmitted`);
        }
    },
    
    /**
     * Прыжок через два уровня
     * 
     * @memberof Poonya.Exceptions
     * @name BadArrowNotationJumpingTwoLevels
     * @class
     * @protected
     */
    BadArrowNotationJumpingTwoLevels: class BadArrowNotationJumpingTwoLevels extends PoonyaException {
        constructor() {
            super(`Bad array notation: jumping two levels is not possible`);
        }
    },
    
    /**
     * Неожиданный переход на более высокий уровень
     * 
     * @memberof Poonya.Exceptions
     * @name BadArrowNotationJumpingToUpperLevel
     * @class
     * @protected
     */
    BadArrowNotationJumpingToUpperLevel: class BadArrowNotationJumpingToUpperLevel extends PoonyaException {
        constructor() {
            super(`Bad array notation: unexpected transition to a upper level`);
        }
    },
    
    /**
     * Невозможно создать пустой объект, ключи уже объявлены
     * 
     * @memberof Poonya.Exceptions
     * @name BadEmptyObjectException
     * @class
     * @protected
     */
    BadEmptyObjectException: class BadEmptyObjectException extends PoonyaException {
        constructor() {
            super(`Cannot create an empty object after declaring its keys`);
        }
    },
    
    /**
     * Неправильный тип ключа
     * 
     * @memberof Poonya.Exceptions
     * @name BadKeyInvalidTypeException
     * @class
     * @protected
     */
    BadKeyInvalidTypeException: class BadKeyInvalidTypeException extends PoonyaException {
        constructor() {
            super(`Wrong key type: it can be set only by a numeric or string key`);
        }
    },
    
    /**
     * Невозможно создать пустой объект, ключи уже объявлены
     * 
     * @memberof Poonya.Exceptions
     * @name BadKeyProtectedFieldException
     * @class
     * @protected
     */
    BadKeyProtectedFieldException: class BadKeyProtectedFieldException extends PoonyaException {
        constructor() {
            super(`Cannot set this field, the field is protected from changes`);
        }
    },
    
    /**
     * Попытка создать объект вызывав его как функцию
     * 
     * @memberof Poonya.Exceptions
     * @name UnableToCreateAnObjectException
     * @class
     * @protected
     */
    UnableToCreateAnObjectException: class UnableToCreateAnObjectException extends PoonyaException {
        constructor() {
            super(`Unable to create an object by calling its constructor as a function, pick ConstructorName -> *;`);
        }
    },
    
    /**
     * Попытка вызывать несуществующий констурктор
     * 
     * @memberof Poonya.Exceptions
     * @name IsNotAConstructorException
     * @class
     * @protected
     */
    IsNotAConstructorException: class IsNotAConstructorException extends PoonyaException {
        constructor(path) {
            super(`${path.map(e => typeof e === 'number' ? '[' + e + ']' : e.toString()).join(' -> ')} - not a co-constructor`);
        }
    }
};

//#endregion

/**
 * Функция, которая возвращает библиотеку при импорте
 *
 * @memberof Poonya
 * @function Import
 *
 * @param {string[]} import_statements Массив с идентификаторами библиотек
 * @param {
 *      {
 *          log: Function,
 *          error: Function,
 *          warn: Function
 *      }
 * } logger Логгер, в случае ошибок ипорта
 *
 * @protected
 */
let Import = () => {};

/**
 * Функция, которая добавляет новую библиотеку
 *
 * @memberof Poonya
 * @function AddLibrary
 *
 * @param {String} lib_id Идентификатор библиотеки
 * @param {PoonyaStaticLibrary} lib_object Объект библиотеки
 * @param {Boolean} p_global Это глобальная библиотека?
 *
 * @protected
 */
let AddLibrary = () => {};

/**
 * Функция, которая добавляет новую библиотеку
 *
 * @memberof Poonya
 * @function ImportDir
 *
 * @param {String} lib_dir Путь к папке, библиотеки из которой будем ипортировать
 *
 * @protected
 */
let ImportDir = () => {};

/**
 * @lends PoonyaStaticLibrary
 * @class
 */
class PoonyaStaticLibrary {
    /**
     * Статическая библиотека, добавляется глобально.
     *
     * @param {Object} data
     * @memberof Poonya
     * @constructs PoonyaStaticLibrary
     * @public
     */
    constructor(id, global = false, override = false, namespace){
        AddLibrary(id, this, override);

        this.namespace = namespace;
        this.global = global;

        this._fields = new Map();
    }

    /**
     * Добавляет поле для импорта из библиотеки
     * 
     * @param {String} field название поля, которое устанавливаем
     * @param {Any} data данные, который нужно импортировать
     * @public
     * @method
     */
    addField(field, data){
        this._fields.set(field, data);
    }

    /**
     * Расширяет прототип класса переданного как proto
     * 
     * @param {PoonyaPrototype} proto название поля, которое устанавливаем
     * @public
     * @method
     */
    expandClass(proto){
        if(proto instanceof PoonyaPrototype) {
            this._fields.set(proto.name, proto);
        } else {
            throw new Error(`Only PoonyaPrototype instance can be passed as a prototype.`)
        }
    }

    /**
     * Добавляет стороннюю библиотеку как поле этой бибилотеки
     * 
     * @param {String} ident идентификатор ассимилируемой библиотеки
     * @public
     * @method
     */
    addLib(ident){
        const lib = global[NAMESPACE][Symbol.for('Modules')][Symbol.for(ident)];

        if(lib != null) {
            this._fields.set(lib.namespace, lib);
        } else {
            throw new Error(`Can't find library with identifier ${ident}`)
        }
    }

    /**
     * Вызывается для преобразования библиотеки в модуль памяти, к которому в последствии можно будет получить доступ
     * 
     * @param {Context|PoonyaObject} parent контекст выполнения
     * @public
     * @method
     */
    importTo(parent, context, throw_error){
        for(let [key, value] of this._fields)
            switch(typeof value){
                case "bigint":
                    if(isNaN(value))
                        parent.set(key, new NativeNull());
                    else
                        parent.set(key, new NativeInteger(value));
                break;
                case "number":
                    if(isNaN(value))
                        parent.set(key, new NativeNull());
                    else 
                        parent.set(key, new NativeNumber(value));
                break;
                case "string":
                    parent.set(key, new NativeString(value));
                break;
                case "symbol":
                    parent.set(key, new NativeString(Symbol.keyFor(value)));
                break;
                case "function":
                    parent.set(key, new NativeFunction(value));
                break;
                case "boolean":
                    parent.set(key, new NativeBoolean(value));
                break;
                case "undefined":
                case "object":
                    if(value == null)
                        parent.set(new NativeNull());
                    else {
                        if (value instanceof PoonyaStaticLibrary) {
                            const target = new PoonyaObject(context.getByPath(SERVICE.CONSTRUCTORS.OBJECT, -1, PoonyaPrototype, throw_error), null, context);

                            value.importTo(target, context, throw_error);

                            parent.set(key, target);
                        } else if (value instanceof PoonyaPrototype)
                            parent.set(key, value);
                        else if (value instanceof Array) 
                            parent.set(key, new PoonyaArray(context.getByPath(SERVICE.CONSTRUCTORS.ARRAY, -1, PoonyaPrototype, throw_error), value, null, context));
                        else 
                            parent.set(key, new PoonyaObject(context.getByPath(SERVICE.CONSTRUCTORS.OBJECT, -1, PoonyaPrototype, throw_error), value, null, context));
                    }
                break;
            }
    }
}

(() => {
    const modules = Symbol.for('Modules');

    if(global[NAMESPACE] == null) {
        global[NAMESPACE] = new Object();

        global[NAMESPACE][modules] = new Map();
    }

    AddLibrary = (lib_id, lib_object, override = false) => {
        if(override || global[NAMESPACE][modules][lib_id = Symbol.for(lib_id)] == null) {
            global[NAMESPACE][modules][lib_id] = lib_object;
        } else {
            throw new TypeError('Library, with this id already imported. For ' + lib_id.toString());
        }
    }

    Import = (import_statements, logger) => {
        if (!(import_statements instanceof Array))
            throw new TypeError("import_statements must be Array");

        const statements = new Array();

        for(let i = 0, leng = import_statements.length; i < leng; i++) {
            statements.push(global[NAMESPACE][modules][Symbol.for(import_statements[i])]);
        }

        return statements;
    };

    ImportDir = (parent_path, lib_dir) => {
        lib_dir = resolve(lib_dir) !== normalize(lib_dir) ? join(parent_path, lib_dir) : lib_dir;

        const default_libs = readdirSync(lib_dir);

        for(let i = 0, leng = default_libs.length; i < leng; i++){
            (
                new Function(
                    'FIELDFLAGS',
                    "Exceptions",
                    'NativeLibrary',
                    'PoonyaPrototype',
                    `"use strict";${readFileSync(join(lib_dir, default_libs[i]), 'utf-8')}`
                )
            )(FIELDFLAGS, Exceptions, PoonyaStaticLibrary, PoonyaPrototype);
        };
    }
})();

/**
 * Фукция которая преобразует нативное значение в значение Poonya
 *
 * @memberof Poonya
 * @function Cast
 *
 * @param {Any} data Данные которые необходимо преобразовать
 * @param {Context} Контекст
 * @param {Array<Any>} дерево родителей объекта
 *
 * @protected
 */
function Cast(data, context, parents_three = new Array()){
    let sub;

    switch (typeof data) {
        case "bigint":
            return new NativeInteger(data);
        case "number":
            return new NativeNumber(data);
        case "string":
            return new NativeString(data);
        case "symbol":
            return new NativeString(Symbol.keyFor(data));
        case "boolean":
            return new NativeBoolean(data);
        case "object":
            switch(true){
                case data === null:                     return new NativeNull();
                case data instanceof CodeEmitter:       return new PoonyaData(data);
                case data instanceof PoonyaObject:
                case data instanceof Operand:
                case data instanceof PoonyaPrototype:   return data;
                default: 
                    parents_three.push(data);

                    if (data instanceof Array) {
                        sub = new PoonyaArray(context.getByPath(SERVICE.CONSTRUCTORS.ARRAY, -1, PoonyaPrototype), null, context)

                        for (let i = 0,
                            leng = data.length; i < leng; i++) {

                            if (!parents_three.includes(data[i]))
                                sub.set(i, data[i], data, Array.from(parents_three));
                        }

                        return sub;
                    } else {
                        sub = new PoonyaObject(context.getByPath(SERVICE.CONSTRUCTORS.OBJECT, -1, PoonyaPrototype), null, context);

                        for (let key in data) {
                            if (!parents_three.includes(key))
                                sub.set(key, data[key], Array.from(parents_three));
                        }

                        return sub;
                    }
            }
        case "function": return new NativeFunction(data);
    }
}

/**
 * @lends Heap
 * @class
 */
class Heap extends Map {
    /**
     * Модуль памяти, может использоваться для манипульций с памятью.
     *
     * @param {Object} data
     * @param {Context} context
     * 
     * @property {Context} context
     * 
     * @memberof Poonya
     * @constructs Heap
     * @public
     */
    constructor(data, context) {
        super();

        this.context = context;

        if (data != null)
            this.append(data);
    }

    removeContext(){
        this.context = null;
    }

    setContext(context){
        if(context instanceof Context)
            this.context = context;
        else
            throw new Error('context must be an object of type Сontext')
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
                    this.set(i, data[i]);
            } else {
                if(data instanceof PoonyaObject) {
                    for (let entry of data.fields) {
                        this.set(entry[0], entry[1]);
                    }
                } else if(data instanceof Heap){
                    for (let entry of data) {
                        this.set(entry[0], entry[1]);
                    }
                } else {
                    for (let key in data)
                        this.set(key, data[key]);
                }
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
     * @param {?Array<Object>} parents_three стэк родителей
     * @method
     * @public
     */
    set(key, data, parents_three = new Array()) {
        if (typeof key !== "string" && typeof key !== "number")
            throw new TypeError('Bad key.');

        try {
            super.set(key, Cast(data, this.context, parents_three));
        } catch (e) {
            console.error("Error when cast value of " + key);
        }
    }

    /**
     * Десерриализует значени е хипа памяти в javascript объект
     *
     * @param {?Context} context контекст выполнения
     * @param {?Array<String>} out Выходной массив
     * @param {?Function} throw_error Функция вызывающаяся при ошибках
     * @method
     * @public
     */
    result(context, out, throw_error) {
        let output = new Object();

        for (let [key, value] of this)
            if (value instanceof NativeFunction)
                output[key] = value != null ? value.result(context, out, throw_error) : null;
            else
                output[key] = value != null ? value.target : null;

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
     * @param {PoonyaStaticLibrary[]} libraries бибилиотеки для инициалзиции контекста
     * @param {...Heap} initial Значения переданные для инициализации
     * @memberof Poonya
     * @constructs Context
     * @classdesc Определяет набор данных для манипуляции в шаблонизаторе
     * @protected
     */
    constructor(libraries, throw_error, ...initial) {
        this.levels = new Array(new Heap(null, this));

        if(libraries != null){
            for(let i = 0, leng = libraries.length;i < leng; i++) {
                if(libraries[i] instanceof PoonyaStaticLibrary) {
                    if(libraries[i].global) {
                        libraries[i].importTo(this, this, throw_error)
                    } else {
                        const target = new PoonyaObject(context.getByPath(SERVICE.CONSTRUCTORS.OBJECT, -1, PoonyaPrototype, throw_error), null, this.context);

                        libraries[i].importTo(target, this, throw_error);

                        this.levels[this.levels.length - 1].set(key, target);
                    }
                }
            }
        }

        this.levels.push(...initial.filter(e => !(e instanceof Heap)).length === 0 ? initial : new Array());
    }

    /**
     * Добавляет уроень в текущий контекст
     * @method
     * @public
     */
    addLevel(level) {
        if (level != null) {
            if (level instanceof Heap) {
                level.setContext(this);

                this.levels.push(level);
            } else
                throw new Error(
                    "The level for the context must be heap, or indexed by the heap",
                );
        } else {
            this.levels.push(new Heap(null, this));
        }
    }

    /**
     * Выходит из текущего контекста
     * @method
     * @public
     */
    popLevel() {
        this.levels.pop().removeContext();
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

    getByPath(path, position, type, throw_error) {
        let query_data = this.get(path[0]),
            query_stack = [...path];

        for (
            let i = 1, leng = query_stack.length;
            query_data && i < leng;
            i++
        ) {
            if (query_stack[i] instanceof ExpressionGroup)
                query_stack[i] = query_stack[i].result(this, out, throw_error);

            if (query_data instanceof PoonyaObject) {
                query_data = query_data.get(query_stack[i]) || null;
            } else {
                throw_error(position, new Exceptions.GetFieldOfNullException(query_stack[i]));
            }
        }

        if (query_data instanceof type) 
            return query_data;
        else 
            return null;
    }

    createObject(entries, position, path, throw_error) {
        for(let key in entries) {
            if(typeof entries[key] === 'object' && entries[key] != null)
                entries[key] = this.createObject(entries[key], position, [ Array.isArray(entries[key]) ? 'Array' : 'Object' ])
        }

        return new (path[0] === 'Object' ? PoonyaObject : PoonyaArray)(this.getByPath(path, position, PoonyaPrototype, throw_error), entries, this);
    }
}

const GET = Symbol('GET')
    , IS = Symbol('IS')
    , SUPER_CALL = Symbol('SEPER_CALL');

/**
 * @lends PoonyaPrototype
 * @class
 */
class PoonyaPrototype {
    /**
     * Прототип объекта, позволяет
     *
     * @param {?PoonyaPrototype[]} parents прототипы объекта, если необходимо
     * @param {String} name имя прототипа, который необъодимо создать
     * 
     * @property {String} name имя прототипа
     * @property {PoonyaPrototype[]} _parents
     * @property {Map<String|Number, Operand>} _fields_data
     * @property {Map<String|Number, Number} _fields
     * 
     * @memberof Poonya
     * @constructs PoonyaPrototype
     * @public
     */
    constructor(parents = [], name){
        if(parents.find(e => !e instanceof PoonyaPrototype) != null)
            throw new Error('Only descendants of PoonyaPrototype should be specified as parents of the target class');
        
        if(typeof name === 'string' || name == null) {
            this.name = name != null ? name : 'Object';
        } else {
            throw new Error('Only string value can be passed as name')
        }

        this._parents = [...parents];
        this._fields_data = new Map();
        this._fields = new Map();
    }

    /**
     * Добавляет родительский прототип целевому
     *
     * @param {PoonyaPrototype} parent прототип объекта
     * @memberof Poonya
     * @constructs PoonyaObject
     * @public
     */
    addParent(parent){
        if(parent instanceof PoonyaPrototype)
            this._parents.push(parent);
        else
            throw new TypeError("Parent must be an PoonyaPrototype instance.")
    }

    /**
     * Устанавливает данные прототипа объекта
     * 
     * @param {String} field поле которое нужно установить
     * @param {Any} data данные которые нужно установить
     * @param {FIELDFLAGS} flags флаги поля
     * @method
     * @public
     */
    addField(field, data, flags){
        this._fields.set(field, data);
        this._fields_data.set(field, flags);
    }

    /**
     * Проверяет, является ли текщуий прототип, наследником другого протитипа
     * 
     * @param {String} key ключ прототипа, который ищем
     * @protected
     * @method
     */
    [IS](key){
        if(key !== this.name)
            return true;
        else
            for(let i = 0, leng = this._parents;i < leng; i++){
                if(this._parents[IS](key)) return true;
            }
        
        false;
    }

    /**
     * Получает статическое значение прототипа
     * 
     * @param {String} ключ, по которому получаем значение
     * @param {PoonyaObject} объект, который хочет получить поле
     * @protected
     * @method
     * @returns {Operand|null}
     */
    [GET](key, child){
        // Буффер данных
        let data;

        // 
        if((data = this._fields.get(key)) != null){
            return Cast(data, child.context);
        } else {
            for(let i = 0, leng = this._parents.length; i < leng; i++) {
                if(data = this._parents[i].get(key, child) != null){
                    return data;
                }
            }

            return null;
        }
    }
    
    /**
     * Вызывает супер вызов всех родительских конструкторов
     *
     * @param {PoonyaObject} child дочерний объект, который необходимо собрать
     * @method
     * @protected
     */
    [SUPER_CALL](child){
        // Копируем значения полей 
        for(let [key, value] of this._fields_data)
            child.field_attrs.set(key, value)

        // Вызываем конструкеторы родителейских прототипов
        for(let i = 0, leng = this._parents.length; i < leng; i++)
            this._parents[i].superCall(child);
    }
}

/**
 * @lends PoonyaObject
 * @class
 */
class PoonyaObject {
    /**
     * Дескриптор объекта в poonya
     *
     * @param {PoonyaObject} prototype Прототип объекта, если необходимо
     * @param {Object} init Объект инициализации
     * @memberof Poonya
     * @constructs PoonyaObject
     * @public
     */
    constructor(prototype, init, context){
        this.fields = new Map();
        this.field_attrs = new Map();

        if(context instanceof Context)
            this.context = context;
        else
            throw new Error('No context passed: dynamic data needs context.');

        if(prototype instanceof PoonyaPrototype) {
            prototype[SUPER_CALL](this);

            this.prototype = prototype;
        }

        if(init != null)
            this.append(init);
    }

    /**
     * Проверяет, существует ли ключ в текущем объекте
     *
     * @param {String} key ключ который прверяем
     * @method
     * @public
     */
    has(key){
        return this.fields.has(key);
    }

    /**
     * Удаляет ключ из объекта
     *
     * @param {String} key ключ который нужно удалить
     * @method
     * @public
     */
    remove(key){
        return this.fields.delete(key);
    }

    /**
     * Получет значение из текущей области памяти по ключу `key`
     *
     * @param {String} key ключ, по которому происходит получение значения
     * @method
     * @public
     */
    get(key) {
        let data = this.fields.get(key);

        if(data != null) {
            return data;
        } else {
            return this.prototype[GET](key, this);
        }
    }

    /**
     * Запрещает изменение поля
     * 
     * @param {String|Number} key ключ для получения поля
     * @public
     * @method
     */
    setConstant(key){
        let current = 0x0;

        if((current = this.field_attrs.get(key)) != null) {
            this.field_attrs.set(key, current | FIELDFLAGS.CONSTANT)
        } else {
            throw new Error('Cannot find filed ' + key + ' in ' + this.prototype.name + '.Object');
        }
    }

    /**
     * Скрывает поле при выводе
     * 
     * @param {String|Number} key ключ для получения поля
     * @public
     * @method
     */
    setHide(key){
        let current = 0x0;

        if((current = this.field_attrs.get(key)) != null) {
            this.field_attrs.set(key, current | FIELDFLAGS.NOOUTPUT)
        } else {
            throw new Error('Cannot find filed ' + key + ' in ' + this.prototype.name + '.Object');
        }
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
                if(data instanceof PoonyaObject) {
                    for (let entry of data.fields) {
                        this.set(entry[0], entry[1]);
                    }
                } else {
                    for (let key in data)
                        this.set(key, data[key]);
                }
            }
        } else {
            throw new TypeError();
        }
    }

    /**
     * Устанавливает значение для текущей области памяти
     *
     * @param {String} key ключ по которому будет происходить установка
     * @param {Object} data данные которые будут установлены
     * @param {?Array<Object>} parents_three стэк родителей
     * @method
     * @public
     */
    set(key, data, parents_three = new Array()) {
        if (typeof key !== "string" && typeof key !== "number")
            throw new Exceptions.BadKeyInvalidTypeException();

        const attrs = this.field_attrs.get(key);

        if (attrs != null && (attrs & FIELDFLAGS.CONSTANT) === 0)
            throw new Exceptions.BadKeyProtectedFieldException();

        try {
            this.fields.set(key, Cast(data, this.context, parents_three));
        } catch (e) {
            console.error("Error when cast value of " + key);
        }
    }

    /**
     * Десерриализует значени объекта в javascript объект
     *
     * @param {?Context} context текущий контекст
     * @param {?Array<String>} out Выходной массив
     * @param {?Function} throw_error Функция вызывающаяся при ошибках
     * @method
     * @public
     */
    result(context, out, throw_error) {
        let   output = new Object()
            , data;

        for (let [key, value] of this.fields) {
            data = this.field_attrs.get(key);

            if(data == null || (data & FIELDFLAGS.NOOUTPUT) === 0)
                if(value instanceof NativeFunction)
                    output[key] = value != null ? value.target : null;
                else
                    output[key] = value != null ? value.result(context, out, throw_error) : null;
        }

        return output;
    }
}

/**
 * @lends PoonyaArray
 * @class
 */
class PoonyaArray extends PoonyaObject {
    /**
     * Дескриптор массива в poonya
     *
     * @param {Object} data
     * @memberof Poonya
     * @constructs PoonyaArray
     * @extends PoonyaObject
     * @public
     */
    constructor(prototype = null, init, context){
        super(prototype, null, context);

        if(init)
            for(let i = 0, leng = init.length; i < leng; i++){
                this.push(init[i]);
            }
    }

    /**
     * Добавляет данные в модуль памяти
     *
     * @param {Object} data данные которые добавляем
     * @param {Array<Any>} parents_three стэк родетелей добавляемого значения
     * @method
     * @public
     */
    push(data, parents_three = new Array()) {
        this.fields.set(this.fields.size + 1, data, parents_three);
    }

    /**
     * Устанавливает индекс массива
     * 
     * @override
     * @method
     * @public
     */
    set(key, data, parents_three = new Array()) {
        if (
            typeof key !== "number" ||
            key < -Number.MAX_SAFE_INTEGER ||
            key > Number.MAX_SAFE_INTEGER
        )
            throw new TypeError('Bad key for ' + key);

        super.set(key, data, parents_three);
    }

    /**
     * Серриализует массив в javascript массив
     * 
     * @override
     * @method
     * @public
     */
    result(context, out, throw_error) {
        let   output = new Array(this.fields.size)
            , data;

        for (let [key, value] of this.fields) {
            data = this.field_attrs.get(key);

            if(data == null || (data & FIELDFLAGS.NOOUTPUT) === 0)
                if(value instanceof NativeFunction)
                    output[key] = value != null ? value.target : null;
                else
                    output[key] = value != null ? value.result(context, out, throw_error) : null;
        }

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
     * @memberof Poonya
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
     * @memberof Poonya
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
     * @memberof Poonya
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
     * @memberof Poonya
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
     * @memberof Poonya
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
     * @memberof Poonya
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
     * @memberof Poonya
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
     * @memberof Poonya
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
     * @memberof Poonya
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
     * @memberof Poonya
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
     * @memberof Poonya
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
    static toPoonyaNumber(data, pos = 0) {
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
     * @memberof Poonya
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
    static toPoonyaNumber(data, pos = 0) {
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
     * @memberof Poonya
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
    static toPoonyaString(data, pos = 0) {
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
     * @memberof Poonya
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
    static toPoonyaBoolean(data, pos = 0) {
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
     * @memberof Poonya
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
     * @memberof Poonya
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
     * @param {PoonyaObject} thisArgs родительский объект
     * @param {Function} throw_error Метод выбрасывания ошибок
     * @param {Number} call_pos Позиция из которой происходит вызов
     * @returns {IntegerLiteral|NumberLiteral|StringLiteral|BooleanLiteral|PoonyaObject|NullLiteral}
     */
    result(args, thisArgs = null, context, throw_error, call_pos) {
        let buff;

        try {
            buff = this.target.call(thisArgs, { 
                args,
                context,
                throw_error,
                position: call_pos
            }, ...args);
        } catch (e) {
            console.error(e);

            throw_error(call_pos, new Exceptions.NativeFunctionExcecutionError(this.target.name));
        }

        switch(typeof buff){
            case "bigint":
            case "number":
                if(isNaN(buff))
                    return null;
                else 
                    return buff;
            case "string":
            case "boolean":
            case "symbol":
            case "function":
                return buff;
            case "undefined":
            case "object":
                if(buff == null)
                    return null;
                else {
                    return buff;
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
     * @memberof Poonya
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

    /**
     * Преобразует вхождение в чистую строку данных, без скобок и пр.
     *
     * @public
     * @method
     */
    toRawString() {
        return this.data.toString("utf8");
    }
}

/**
 * @lends PoonyaData
 * @protected
 */
class PoonyaData extends Operand {
    /**
     * Данные вызова шаблона, если передать в heap шаблон, то он выполнится с текущей памятью
     *
     * @param {CodeEmitter} pattern эмиттер который будет исполнятся при сполнении этого выхождения
     *
     * @constructs PoonyaData
     * @extends Operand
     * @memberof Poonya
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
     * @memberof Poonya
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
                query_stack[i] = query_stack[i].result(context, out, throw_error);

            if (query_data instanceof PoonyaObject) {
                query_data = query_data.get(query_stack[i]) || null;
            } else {
                throw_error(
                    this.position,
                    new Exceptions.GetFieldOfNullException(query_stack[i])
                );
            }
        }

        if (query_data) 
            return query_data.result(context, out, throw_error);
        else 
            return null;
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
     * @memberof Poonya
     * @protected
     */
    constructor(query_stack, args, position) {
        super("call function");

        this.query_stack = [...query_stack];
        this.position = position;
        this.args = args;
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
            safe_parent = null,
            args = new Array();

        for (
            let i = 1, leng = this.query_stack.length;
            i < leng;
            i++
        ) {
            if (query_stack[i] instanceof ExpressionGroup)
                query_stack[i] = query_stack[i].result(context, out, throw_error);

            if (query_data instanceof PoonyaObject) {
                safe_parent = query_data;

                query_data = query_data.get(query_stack[i]) || null;
            } else {
                throw_error(this.position, new Exceptions.GetFieldOfNullException(query_stack[i]));
            }
        }

        for (let i = 0, leng = this.args.length; i < leng; i++) {
            args.push(this.args[i].result(context, out, throw_error));
        }

        if (query_data instanceof NativeFunction)
            return query_data.result(args, safe_parent, context, throw_error, this.position);
        else if(query_data instanceof PoonyaPrototype)
            throw_error(
                this.position,
                new Exceptions.UnableToCreateAnObjectException()
            );
        else {
            throw_error(
                this.position,
                new Exceptions.FieldNotAFunctionException(query_stack[query_stack.length - 1])
            );
        }
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
     * @memberof Poonya
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
            BooleanLiteral.toPoonyaBoolean(
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
     * @memberof Poonya
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
        if (!context.has(this.name, "up")) {
            context.set(this.name, this.value.result(context, out, throw_error), "up");
        } else {
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
     * @memberof Poonya
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

        if (query_data instanceof PoonyaObject) {
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

            if (query_data instanceof PoonyaArray)
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
     * @memberof Poonya
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

            if (query_data instanceof PoonyaObject) {
                const last_index = query_stack[query_stack.length - 1];

                query_data.set(last_index instanceof ExpressionGroup ?
                    last_index.result(context, out, throw_error) : last_index,
                    this.value.result(context, out, throw_error)
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
     * 
     * @param {ExpressionGroup} expression выражение, результаты выполнения которого будем выводить
     * 
     * @memberof Poonya
     * @protected
     */
    constructor(expression) {
        this.expression = expression;
        this.position = expression.position;
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
        const data = this.expression.result(context, out, throw_error);

        out.push(data instanceof PoonyaObject ? data.result(context, out, throw_error) : data);
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
     * @memberof Poonya
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
            BooleanLiteral.toPoonyaBoolean(
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
     * @memberof Poonya
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
            BooleanLiteral.toPoonyaBoolean(
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
     * @param {String[]} query_stack путь к конструктору в памяти
     * @param {Map<String, ExpressionGroup>} fields поля объекта при инициализации
     * @param {Number} position позиция начала объявления объекта
     *
     * @constructs ObjectContructorCall
     * @extends Operand
     * @memberof Poonya
     * @protected
     */
    constructor(query_stack = 'Object', fields, position) {
        super('object-creator');

        this.query_stack = query_stack != null ? query_stack : SERVICE.CONSTRUCTORS.OBJECT;
        this.fields = fields;
        this.position = position;
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
        const proto = context.getByPath(this.query_stack, this.position, PoonyaPrototype);

        if(proto != null) {
            let instance = new (proto[IS]('Array') ? PoonyaObject : PoonyaArray)(proto, null, context);

            for(let fieled of this.fields) {
                instance.set(fieled[0], fieled[1].result(context, out, throw_error));
            }

            return instance;
        } else {
            throw_error(this.position, new Exceptions.IsNotAConstructorException(this.query_stack))
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
     * @memberof Poonya
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
     * @memberof Poonya
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
        let result = this.data[0] != null ? this.data[0].result(context, out, throw_error) : null;

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
     * @memberof Poonya
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
     * @memberof Poonya
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
 * @memberof Poonya
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
 * @memberof Poonya
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
 * @memberof Poonya
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
 * @memberof Poonya
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
 * @param {Number} block_start начальная позиция вызова
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: FunctionCall, jump: Number}} объект вызова функции, и позиция с которой можно продолжить прасинг
 *
 * @memberof Poonya
 * @protected
 */
function parseFunctionCall(query_stack, start, data, throw_error, block_start) {
    const args = segmentationParser(
        start,
        data,
        throw_error,
        ",",
        Infinity,
        `Function (${query_stack.map((e) => (typeof e === "number" ? `[${e}]` : e)).join(" => ")})`,
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
 * @param {Number} start начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: ObjectContructorCall, jump: Number}} объект тернарного выражения, и позиция с которой можно продолжить прасинг
 *
 * @memberof Poonya
 * @protected
 */
function parseObject(query_stack, start, data, throw_error, level = 0) {
    let result = null,
        count = 0,
        entries = new Array([]),   // Значения объекта
        last_row = start,
        expected = 0;              // Ожидаемое следующие значение

    for (let i = start; true; i++) {
        maybeEquals(data, i, CHARTYPE.NEWLINE);

        switch (true) {
            case data[i].equals(CHARTYPE.OPERATOR, '*') && expected === 0:
                if(entries.length !== 1)
                    throw_error(data[i].position, new Exceptions.BadEmptyObjectException());

                return {
                    data: new ObjectContructorCall(query_stack, new Map(), data[start].position),
                    jump: i - start
                };
            case data[i] === undefined || expected === 3 && !data[i].equals(CHARTYPE.OPERATOR, ',') || data[i].equals(CHARTYPE.OPERATOR, ';'):
                if(entries[entries.length - 1].length !== 2)
                    throw_error(data[i].position, new Exceptions.ParserEmtyArgumentException());

                return {
                    data: new ObjectContructorCall(query_stack, new Map(entries), data[start].position),
                    jump: i - start
                };
            default:
                switch(expected){
                    case 0:
                        if(data[i].equals(CHARTYPE.WORD) || data[i].equals(CHARTYPE.STRING)){
                            entries[entries.length - 1][0] = data[i].toRawString();
                        } else if(data[i].equals(CHARTYPE.NUMBER)) {
                            entries[entries.length - 1][0] = parseInt(data[i].toRawString());
                        } else {
                            throw_error(data[i].position, new Exceptions.UnexpectedTokenException(data[i], 'any word'));
                        }

                        expected = 1;
                    continue;
                    case 1:
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
                                    data: new ObjectContructorCall(query_stack, new Map(entries), data[start].position),
                                    jump: last_row - start
                                };
                            } else {
                                throw_error(data[i].position, new Exceptions.BadArrowNotationJumpingToUpperLevel());
                            }
                        }
                    continue;
                    case 2:
                        count = countKeys(data, i + 1, CHARTYPE.OPERATOR, '-');

                        /// Если как значение передан инициализатор другого объекта
                        ///
                        /// some ->
                        ///     some1 --> 'some',
                        if(
                            data[i + level + 3] != null &&
                            (
                                data[i].equals(CHARTYPE.WORD) ||
                                data[i].equals(CHARTYPE.NUMBER)
                            ) &&
                            count === level + 2 && 
                            data[i + level + 3].equals(CHARTYPE.OPERATOR, '>')
                        ){                            
                            result = parseObject(SERVICE.CONSTRUCTORS.OBJECT, i, data, throw_error, level + 1);

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
 * @param {Number} start начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: TernarOperator, jump: Number}} объект тернарного выражения, и позиция с которой можно продолжить прасинг
 *
 * @memberof Poonya
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
 * @memberof Poonya
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
 * @memberof Poonya
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
                        data[i].position
                    );

                    i += result[0].jump + result[1].jump + 1;

                    append(result[1].data);
                } else if(
                    data[i + result[0].jump + 1] != null && data[i + result[0].jump].equals(CHARTYPE.OPERATOR, "-") &&
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
                    SERVICE.CONSTRUCTORS.OBJECT,
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
 * @memberof Poonya
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
 * @memberof Poonya
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
 * @memberof Poonya
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
 * @memberof Poonya
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
            if(!e instanceof PoonyaException) {
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
 * @memberof Poonya
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
     * @memberof Poonya
     * @constructs CodeEmitter
     * @abstract
     * @protected
     */
    constructor(input, import_s = [], logger = console) {
        if (typeof input === "string") 
            this.input = input;
        else if (typeof input === "object") {
            this.charset = typeof input.charset === "string" ? input.charset : "utf-8";

            this.path = normalize(
                typeof input.path === "string" ? 
                    ['', '.'].includes(extname(input.path)) ?
                        input.path + '.po' :
                        input.path :
                    module.parent ?
                        module.parent.filename :
                        module.filename
            );

            if (typeof input.raw === "string")
                this.input = input.raw;
            else if (typeof input.path === "string") {
                this.input = readFileSync(
                    this.path,
                    this.charset
                );
            } else throw new Error("BAD_DATA_FORMAT");
        } else {
            throw new Error("BAD_DATA_FORMAT");
        }

        this.logger = logger;

        this.import = import_s;

        this.libraries = Import(["default.lib", ...import_s], logger);

        if (typeof this.input !== "string")
            throw new TypeError("The `input` parameter must have a string type. But now `input` have a `" + typeof this.input + "` type.",);
    }

    /**
     * Устанавливает новый хип памяти как текущий
     *
     * @param {Heap} heap Хип памяти который нужно установить.
     * @method
     * @public
     */
    setHeap(heap) {
        if (heap instanceof Heap)
            this.heap = heap;
        else 
            throw new TypeError();
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
            ":", line_dump[line].length,
            " symbol",
        );

        if(pos != 0) {
            buffer.push(' :>\n');

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
        }

        if (message instanceof Error) 
            throw new Error(buffer.join(""));
        else
            throw new PoonyaException(buffer.join(""));
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
     * @memberof Poonya
     * @constructs MessagePattern
     * @protected
     */
    constructor(input, import_s, logger = console) {
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

            if (!hook_index === 0) 
                buffer.push(entries[i].toString());
            else 
                buffer.push(entries[i]);
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
                const context = new Context(this.libraries, error, ...data[i]);

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
                const context = new Context(this.libraries, error, ...data);

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
     * @memberof Poonya
     * @constructs ExcecutionPattern
     * @protected
     */
    constructor(input, import_s, logger = console) {
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
                this.data.result(new Context(this.libraries, error, ...data), out, error);
            } else {
                throw new TypeError("Data must have a Heap type");
            }
        } else {
            if (typeof data === "object" && !(data instanceof Heap)) {
                data = new Heap(data);
            }

            if (data instanceof Heap) {
                this.data.result(new Context(this.libraries, error, ...data), out, error);
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
     * @memberof Poonya
     * @constructs ExpressionPattern
     * @protected
     */
    constructor(input, import_s, logger = console) {
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
                        new Context(this.libraries, error, ...data),
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
                        new Context(this.libraries, error, ...data),
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

// Load native default libraries
{
    ImportDir(__dirname, '/native.libs');
}

module.exports.Heap = Heap;
module.exports.PoonyaArray = PoonyaArray;
module.exports.PoonyaObject = PoonyaObject;
module.exports.CodeEmitter = CodeEmitter;
module.exports.MessagePattern = MessagePattern;
module.exports.ExpressionPattern = ExpressionPattern;
module.exports.ExcecutionPattern = ExcecutionPattern;
module.exports.NativeLibrary = PoonyaStaticLibrary;
module.exports.ImportDir = ImportDir.bind(null, module.parent != null ? module.parent.path : module.path);
module.exports.parser = parser;
module.exports.lexer = lexer;
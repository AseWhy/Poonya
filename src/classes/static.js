const { dirname } = require('path');

/**
 * @file src/static.js
 * @description Содержит в себе набор статических полей
 * @license MIT
 * @author Astecom
 */

// Защищенные поля для PoonyaPrototype
const GET = Symbol('GET')
    , IS = Symbol('IS')
    , SUPER_CALL = Symbol('SEPER_CALL');

/**
 * Типы символов
 *
 * @memberof Poonya.Static
 * @constant CHARTYPE
 * @property {Number} START     - Стартовый символ, ничего не значит        ``
 * @property {Number} NUMBER    - Числовой тип                              `0-9.0-9`
 * @property {Number} WORD      - Литеральный тип `                         `set`
 * @property {Number} SPACE     - Тип пробела                               ` \t`
 * @property {Number} POINT     - Тип точки                                 `.`
 * @property {Number} STRING    - Строковой тип                             `'something...'`
 * @property {Number} NEWLINE   - Тип новой строки                          `\n|\r`
 * @property {Number} OPERATOR  - Тип оператора                             `= > <...`
 * @protected
 * @enum
 * @static
 */
const CHARTYPE = {
    START: 0x0,
    NUMBER: 0x2,
    WORD: 0x3,
    SPACE: 0x4,
    POINT: 0x5,
    STRING: 0x6,
    NEWLINE: 0x7,
    OPERATOR: 0x8,
};

/**
 * Типы операторов
 *
 * @memberof Poonya.Static
 * @constant OPERATOR
 * @property {Number} PLUS      - Оператор сложения                         `+`
 * @property {Number} MINUS     - Оператор вычитания                        `-`
 * @property {Number} MULT      - Оператор умножения                        `*`
 * @property {Number} DIVIDE    - Оператор деления                          `/`
 * @property {Number} EQUAL     - Оператор сравнения                        `=`
 * @property {Number} NEQUAL    - Оператор сложжения (отр)                  `!=`
 * @property {Number} LARGER    - Оператор сравнение (a больше b)           `>`
 * @property {Number} LESS      - Оператор сравнение (a меньше b)           `<`
 * @property {Number} ELARGER   - Оператор сравнение (a больше или равно b) `>=`
 * @property {Number} ELESS     - Оператор сравнение (a меньши или равно b) `<=`
 * @property {Number} AND       - Оператор сравнение (a и b)                `&`
 * @property {Number} OR        - Оператор сравнение (a или b)              `|`
 * @protected
 * @enum
 * @static
 */
const OPERATOR = {
    PLUS: 0x0,
    MINUS: 0x1,
    MULT: 0x2,
    DIVIDE: 0x3,
    EQUAL: 0x4,
    NEQUAL: 0x5,
    LARGER: 0x6,
    LESS: 0x7,
    ELARGER: 0x8,
    ELESS: 0x9,
    AND: 0xa,
    OR: 0xb,
};

/**
 * Флаги для полей
 *
 * @memberof Poonya.Static
 * @constant FIELDFLAGS
 * @property {Number} NOOUTPUT - Запрет вывода, при серриализации объекта в объект js, это поле будет скрыто
 * @property {Number} CONSTANT - Константное значение, невозможно изменить оператором присваивания
 * @property {Number} STATIC   - Статическое значение прототипа
 * @property {Number} PROPERTY - Сделать это поле доступным как свойство
 * @protected
 * @enum
 * @static
 */
const FIELDFLAGS = {
    NOOUTPUT: 0x1,
    CONSTANT: 0x2,
    STATIC: 0x4,
    PROPERTY: 0x8
};

/**
 * Сервисная константа, для служебной информации
 *
 * @memberof Poonya.Static
 * @constant SERVICE
 * @property {Number} CONSTRUCTORS - конструкторы объектов
 * @property {String} ROOTPATH - путь к src папке
 * @protected
 * @static
 */
const SERVICE = {
    CONSTRUCTORS: {
        OBJECT: ['Object'],
        ARRAY: ['Array'],
        BOOLEAN: ['Boolean'],
        STRING: ['String'],
        NUMBER: ['Number'],
        INTEGER: ['Integer'],
        NULL: ['Null'],
    },

    ROOTPATH: dirname(__dirname),

    CONFIG: {
        DEBUG: false,
    },
};

/**
 * Занимаемая область в глобальном контексте
 *
 * @memberof Poonya.Static
 * @constant NAMESPACE
 * @protected
 * @static
 */
const NAMESPACE = Symbol.for('POONYA-' + process.pid + '-' + process.platform);

module.exports.FIELDFLAGS = FIELDFLAGS;
module.exports.SUPER_CALL = SUPER_CALL;
module.exports.NAMESPACE = NAMESPACE;
module.exports.OPERATOR = OPERATOR;
module.exports.CHARTYPE = CHARTYPE;
module.exports.SERVICE = SERVICE;
module.exports.CONFIG = SERVICE.CONFIG;
module.exports.GET = GET;
module.exports.IS = IS;

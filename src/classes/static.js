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
 * @memberof Poonya.Static
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
 * @memberof Poonya.Static
 * @constant FIELDFLAGS
 * @property {Number} NOOUTPUT - Запрет вывода, при серриализации объекта в объект js, это поле будет скрыто
 * @property {Number} CONSTANT - Константное значение, невозможно изменить оператором присваивания
 * @property {Number} STATIC   - Статическое значение прототипа
 * @protected
 * @static
 */
const FIELDFLAGS = {
    NOOUTPUT:   0x1,
    CONSTANT:   0x2,
    STATIC:     0x4
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
        OBJECT: [ 'Object' ],
        ARRAY: [ 'Array' ]
    },
    ROOTPATH: dirname(__dirname)
}

/**
 * Занимаемая область в глобальном контексте
 * 
 * @memberof Poonya.Static
 * @constant NAMESPACE
 * @protected
 * @static
 */
const NAMESPACE = Symbol.for('POONYA-' + process.pid + '-' + process.platform)

module.exports.FIELDFLAGS = FIELDFLAGS;
module.exports.SUPER_CALL = SUPER_CALL;
module.exports.NAMESPACE = NAMESPACE;
module.exports.OPERATOR = OPERATOR;
module.exports.CHARTYPE = CHARTYPE;
module.exports.SERVICE = SERVICE;
module.exports.GET = GET;
module.exports.IS = IS;
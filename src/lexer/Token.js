/**
 * @file src/Token.js
 * @description Содержит в себе класс вхождение лексера, массив которых получается на выходе из лексера
 * @license MIT
 * @author Astecom
 */

"use strict";

const { CHARTYPE } = require('../classes/static')
    , { fromBytes } = require('../utils');

/**
 * @lends Token
 * @class
 */
class Token {
    /**
     * Вхождение лексера
     *
     * @param {CHARTYPE} type тип выхождения
     * @param {Array} data Данные вхождения
     * @param {Number} position Позиция вхождения
     * @param {String} s_separator Дополнительное окружение вхождения, допустим для строки это ''
     * @constructs Token
     * @memberof Poonya.Lexer
     * @protected
     */
    constructor(type, data, position, s_separator) {
        this.type = type;
        this.data = fromBytes(data);
        this.position = position - data.length > 0 ? position - data.length + 1 : 0;
        this.leng = data.length;
        this.string_separator = s_separator != null ? String.fromCharCode(s_separator) : null;
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
        return Array.isArray(s) ? s.includes(this.toRawString()) : this.toRawString() == s;
    }

    /**
     * Преобразует вхождение в строку
     *
     * @public
     * @method
     */
    toString() {
        return this.type != CHARTYPE.STRING
            ? this.data : this.string_separator + this.data + this.string_separator;
    }

    /**
     * Преобразует вхождение в чистую строку данных, без скобок и пр.
     *
     * @public
     * @method
     */
    toRawString() {
        return this.data;
    }
}

module.exports = Token;
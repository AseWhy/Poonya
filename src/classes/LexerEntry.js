const { CHARTYPE } = require('./static');

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

module.exports = LexerEntry;
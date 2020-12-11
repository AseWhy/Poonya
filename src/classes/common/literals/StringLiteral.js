/**
 * @file src/classes/common/literal/StringLiteral.js
 * @description Cодержит прототип литерального строкового значения
 * @author Astecom
 * @license MIT
 */

const { CHARTYPE } = require('../../static')
    , { ParserData } = require('../ParserData')
    , { Literal } = require("../Literals")
    , LexerEntry = require('../../../lexer/LexerEntry');

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
     * @memberof Poonya.Literal
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
                    null
                )
            );

        switch (data.entry.type) {
            case CHARTYPE.STRING:
            case CHARTYPE.WORD:
                return new StringLiteral(
                    new LexerEntry(CHARTYPE.WORD, data.entry.data, pos, null)
                );
            case CHARTYPE.NUMBER:
                return new StringLiteral(
                    new LexerEntry(
                        CHARTYPE.WORD,
                        Buffer.from(data.entry.data.toString()),
                        pos,
                        null
                    )
                );
        }

        return new StringLiteral(
            new LexerEntry(CHARTYPE.WORD, Buffer.from([]), pos, null)
        );
    }

    /**
     * Сериализует текущую строку
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
            new LexerEntry(CHARTYPE.START, Buffer.from([]), pos, null)
        );
    }
}

module.exports = StringLiteral;
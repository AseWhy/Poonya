/**
 * @file src/classes/common/literal/IntegerLiteral.js
 * @description Cодержит прототип литерального целого числа
 * @author Astecom
 * @license MIT
 */

const { CHARTYPE } = require('../../static')
    , { ParserData } = require('../ParserData')
    , { Literal } = require("../Literals")
    , LexerEntry = require('../../../lexer/LexerEntry');

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
     * @memberof Poonya.Literal
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
     * Сериализует текущее целое число
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
                    null
                )
            );

        switch (data.entry.type) {
            case CHARTYPE.STRING:
            case CHARTYPE.WORD:
                return new IntegerLiteral(
                    new LexerEntry(CHARTYPE.NUMBER, data.entry.data, pos, null)
                );
            case CHARTYPE.NUMBER:
                return new IntegerLiteral(
                    new LexerEntry(
                        CHARTYPE.NUMBER,
                        Buffer.from(data.entry.data.toString()),
                        pos,
                        null
                    )
                );
        }

        return new IntegerLiteral(
            new LexerEntry(CHARTYPE.NUMBER, Buffer.from([48]), pos, null)
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
        return new IntegerLiteral(
            new LexerEntry(CHARTYPE.START, Buffer.from([48]), pos, null)
        );
    }
}

module.exports = IntegerLiteral;
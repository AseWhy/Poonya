/**
 * @file src/classes/common/literal/BooleanLiteral.js
 * @description Cодержит прототип литерального булевого
 * @author Astecom
 * @license MIT
 */

const { CHARTYPE } = require('../../static')
    , { ParserData } = require('../ParserData')
    , { Literal } = require("../Literals")
    , LexerEntry = require('../../../lexer/LexerEntry');

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
     * @memberof Poonya.Literal
     * @extends Literal
     * @protected
     */
    constructor(data) {
        super(data, "BooleanLiteral");

        this.data =
            data.data.toString() === "true"
                ? Buffer.from([1]) : Buffer.from([0]);
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
     * Сериализует текущее булевое значение
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

module.exports = BooleanLiteral;
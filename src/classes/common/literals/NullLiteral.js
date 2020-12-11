/**
 * @file src/classes/common/literal/NullLiteral.js
 * @description Cодержит прототип литерального null значения
 * @author Astecom
 * @license MIT
 */

const { CHARTYPE } = require('../../static')
    , { Literal } = require("../Literals")
    , LexerEntry = require('../../../lexer/LexerEntry');

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
     * @memberof Poonya.Literal
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
     * Сериализует текущее булевое значение
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
            new LexerEntry(CHARTYPE.START, Buffer.from([]), 0, null)
        );
    }
}

module.exports = NullLiteral;
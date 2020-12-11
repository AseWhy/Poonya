/**
 * @file src/classes/common/Literal.js
 * @description Cодержит прототип литерального объекта
 * @author Astecom
 * @license MIT
 */

const { Operand } = require('./ParserData')
    , LexerEntry = require('../../lexer/LexerEntry');

/**
 * @lends Literal
 * @class
 */
class Literal extends Operand {
    /**
     * @param {LexerEntry} entry вхождение лексера описывающее текущий литерал
     * @param {String} name наименование литерала
     * @constructs Literal
     * @memberof Poonya.Literal
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
     * Сериализует текущий литерал
     *
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.name + " { " + this.result() + " }";
    }
}

module.exports.Literal = Literal;
/**
 * @file src/classes/common/Native.js
 * @description Cодержит прототип нативного объекта
 * @author Astecom
 * @license MIT
 */

const { Operand } = require('./ParserData');

/**
 * @lends Native
 * @class
 */
class Native extends Operand {
    /**
     * @param {String} name наименование литерала
     * @constructs Native
     * @memberof Poonya.Native
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
     * Сериализует текущий литерал
     *
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.name + " [N] { " + this.result() + " }";
    }
}

module.exports.Native = Native;
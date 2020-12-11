/**
 * @file src/classes/common/native/NativeNull.js
 * @description Cодержит прототип нативного null значения
 * @author Astecom
 * @license MIT
 */

const { Native } = require("../Native");

/**
 * @lends NativeNull
 * @class
 */
class NativeNull extends Native {
    /**
     * Дескриптор нативного null в шаблонизаторе
     *
     * @constructs NativeNull
     * @memberof Poonya.Native
     * @extends Native
     * @protected
     */
    constructor() {
        super("NativeNull");
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
        return `null`;
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
}

module.exports = NativeNull;
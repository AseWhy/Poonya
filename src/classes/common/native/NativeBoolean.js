/**
 * @file src/classes/common/native/NativeBoolean.js
 * @description Cодержит прототип нативного булевого значения
 * @author Astecom
 * @license MIT
 */

const { Native } = require("../Native");

/**
 * @lends NativeBoolean
 * @class
 */
class NativeBoolean extends Native {
    /**
     * Дескриптор нативного булевого значения в шаблонизаторе
     *
     * @param {Boolean} data данные для преобразования
     * @constructs NativeBoolean
     * @memberof Poonya.Native
     * @extends Native
     * @protected
     */
    constructor(data) {
        super("NativeBoolean");

        if (typeof data === 'boolean')
            this.data = data;

        else
            throw new TypeError('For NativeBoolean, the data type passed to the constructor must be a boolean');
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
        return `${this.data}`;
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
        return this.data;
    }
}

module.exports = NativeBoolean;
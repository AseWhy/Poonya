/**
 * @file src/classes/common/native/NativeString.js
 * @description Cодержит прототип нативной строки
 * @author Astecom
 * @license MIT
 */

const { Native } = require("../Native");

/**
 * @lends NativeString
 * @class
 */
class NativeString extends Native {
    /**
     * Дескриптор нативной строки в шаблонизаторе
     *
     * @param {String} data данные для преобразования
     * @constructs NativeString
     * @memberof Poonya.Native
     * @extends Native
     * @protected
     */
    constructor(data) {
        super("NativeString");

        if (typeof data === 'string')
            this.data = data;

        else
            throw new TypeError('For NativeString, the data type passed to the constructor must be a string');
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
        return `'${this.data}'`;
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
        return this.data;
    }
}

module.exports = NativeString;
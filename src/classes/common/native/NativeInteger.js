/**
 * @file src/classes/common/native/NativeInteger.js
 * @description Cодержит прототип нативного целого числа
 * @author Astecom
 * @license MIT
 */

const { Native } = require("../Native");

/**
 * @lends NativeInteger
 * @class
 */
class NativeInteger extends Native {
    /**
     * Дескриптор нативного целого числа в шаблонизаторе
     *
     * @param {BigInt} data данные для преобразования
     * @constructs NativeInteger
     * @memberof Poonya.Native
     * @extends Native
     * @protected
     */
    constructor(data) {
        super("NativeInteger");

        if (!isNaN(data) && typeof data === 'bigint')
            this.data = data;

        else
            throw new TypeError('For NativeInteger, the data type passed to the constructor must be a bigint');
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
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {BigInt}
     */
    result() {
        return this.data;
    }
}

module.exports = NativeInteger;
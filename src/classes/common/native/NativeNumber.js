/**
 * @file src/classes/common/native/NativeNumber.js
 * @description Cодержит прототип нативного числа
 * @author Astecom
 * @license MIT
 */

const { Native } = require("../Native");

/**
 * @lends NativeNumber
 * @class
 */
class NativeNumber extends Native {
    /**
     * Дескриптор нативного числа в шаблонизаторе
     *
     * @param {Number} data данные для преобразования
     * @constructs NativeNumber
     * @memberof Poonya.Native
     * @extends Native
     * @protected
     */
    constructor(data) {
        super("NativeNumber");

        if (!isNaN(data) && typeof data === 'number')
            this.data = data;

        else
            throw new TypeError('For NativeNumber, the data type passed to the constructor must be a number');
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
        return this.data + "n";
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {Number}
     */
    result() {
        return this.data;
    }
}

module.exports = NativeNumber;
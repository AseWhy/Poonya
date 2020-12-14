/**
 * @file src/classes/data/PoonyaInteger.js
 * @description Cодержит класс целого числа Poonya
 * @author Astecom
 * @license MIT
 */

const PoonyaObject = require("./PoonyaObject");

/**
 * @lends PoonyaInteger
 * @class
 */
class PoonyaInteger extends PoonyaObject {
    /**
     * Дескриптор массива в poonya
     *
     * @param {iPoonyaPrototype} prototype Прототип массива
     * @param {BigInt} init Исходное целое число
     * 
     * @memberof Poonya.Data
     * @constructs PoonyaInteger
     * @extends PoonyaObject
     * @public
     */
    constructor(prototype = null, init) {
        super(prototype);

        this.data = init;
    }

    /**
     * Возвращает копию этого объекта
     * 
     * @returns {PoonyaInteger} клонированый объект
     */
    clone(){
        return new PoonyaInteger(this.prototype, this.data)
    }

    /**
     * Применяет новое значение к текущему объекту
     * 
     * @param {BigInt} value значение, которое нужно применить к этомй объекту
     * @method
     * @override
     */
    append(value){
        this.data = value;
    }

    /**
     * Устанавливать значения целому числу нельзя
     * 
     * @override
     * @method
     * @public
     */
    set() { }

    /**
     * Сериализует челое число в значение результата выполнения
     *
     * @override
     * @method
     * @public
     */
    result(context, out, throw_error) {
        return this.data;
    }

    /**
     * Сериализует челое число в javascript bigint
     *
     * @override
     * @method
     * @public
     */
    toRawData(){
        return this.data;
    }
}

module.exports = PoonyaInteger;
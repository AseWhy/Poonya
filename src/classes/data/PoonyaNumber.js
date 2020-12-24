/**
 * @file src/classes/data/PoonyaNumber.js
 * @description Cодержит класс числа Poonya
 * @author Astecom
 * @license MIT
 */

"use strict";

const PoonyaObject = require("./PoonyaObject");

/**
 * @lends PoonyaNumber
 * @class
 */
class PoonyaNumber extends PoonyaObject {
    /**
     * Дескриптор массива в poonya
     *
     * @param {iPoonyaPrototype} prototype Прототип массива
     * @param {Number} init Исходное число
     * 
     * @memberof Poonya.Data
     * @constructs PoonyaNumber
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
     * @returns {PoonyaNumber} клонированый объект
     */
    clone(){
        return new PoonyaNumber(this.prototype, this.data);
    }

    /**
     * Применяет новое значение к текущему объекту
     * 
     * @param {Number} value значение, которое нужно применить к этомй объекту
     * @method
     * @override
     */
    append(value){
        this.data = value;
    }

    /**
     * Устанавливать значения числу нельзя
     * 
     * @override
     * @method
     * @public
     */
    set() {

    }

    /**
     * Удалять значения числу нельзя
     * 
     * @override
     * @method
     * @public
     */
    remove() {

    }

    /**
     * Сериализует число значение результата выполнения
     *
     * @override
     * @method
     * @public
     */
    result(context, out, throw_error) {
        return this.data;
    }

    /**
     * Сериализует число в javascript число
     *
     * @override
     * @method
     * @public
     */
    toRawData(){
        return this.data;
    }
}

module.exports = PoonyaNumber;
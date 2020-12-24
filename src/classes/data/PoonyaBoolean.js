/**
 * @file src/classes/data/PoonyaBoolean.js
 * @description Cодержит класс булевого значения Poonya
 * @author Astecom
 * @license MIT
 */

"use strict";

const PoonyaObject = require("./PoonyaObject");

/**
 * @lends PoonyaBoolean
 * @class
 */
class PoonyaBoolean extends PoonyaObject {
    /**
     * Дескриптор массива в poonya
     *
     * @param {iPoonyaPrototype} prototype Прототип массива
     * @param {Boolean} init Исходное значение
     * 
     * @memberof Poonya.Data
     * @constructs PoonyaBoolean
     * @extends PoonyaObject
     * @public
     */
    constructor(prototype = null, init) {
        super(prototype);

        this.data = init;
    }

    /**
     * Применяет новое значение к текущему объекту
     * 
     * @param {Boolean} value значение, которое нужно применить к этомй объекту
     * @method
     * @override
     */
    append(value){
        this.data = value;
    }

    /**
     * Возвращает копию этого объекта
     * 
     * @returns {PoonyaBoolean} клонированый объект
     */
    clone(){
        return new PoonyaBoolean(this.prototype, this.data)
    }

    /**
     * Устанавливать значения булевому значеню нельзя
     * 
     * @override
     * @method
     * @public
     */
    set() {

    }

    /**
     * Удалять значения булевому значеню нельзя
     * 
     * @override
     * @method
     * @public
     */
    remove() {

    }

    /**
     * Сериализует булевое значение в значение результата выполнения
     *
     * @override
     * @method
     * @public
     */
    result(context, out, throw_error) {
        return this.data;
    }

    /**
     * Сериализует булевое значение в javascript boolean
     *
     * @override
     * @method
     * @public
     */
    toRawData(){
        return this.data;
    }
}

module.exports = PoonyaBoolean;
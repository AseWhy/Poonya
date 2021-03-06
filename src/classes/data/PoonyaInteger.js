/**
 * @file src/classes/data/PoonyaInteger.js
 * @description Cодержит класс целого числа Poonya
 * @author Astecom
 */

"use strict";

const PoonyaObject = require("./PoonyaObject");

/**
 * @lends PoonyaInteger
 * @class
 */
class PoonyaInteger extends PoonyaObject {
    /**
     * Дескриптор массива в poonya
     *
     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
     * @param {BigInt} init - Данные для инициализации объекта.
     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
     * @param {Function} reject - Функция для выброса исключения.
     * 
     * @memberof Poonya.Data
     * @constructs PoonyaInteger
     * @extends PoonyaObject
     * @public
     */
    constructor(prototype = null, init, context, reject) {
        super(prototype, init, context, reject);

        this.data = BigInt(init);
    }

    /**
     * Возвращает копию этого объекта
     * 
     * @returns {PoonyaInteger} клонированый объект
     */
    clone(){
        return new PoonyaInteger(this.prototype, this.data);
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
    set() {

    }

    /**
     * Удалять значения целому числу нельзя
     * 
     * @override
     * @method
     * @public
     */
    remove() {

    }

    /**
     * Сериализует челое число в значение результата выполнения
     *
     * @override
     * @method
     * @public
     */
    result(context, out, reject, resolve) {
        resolve(this.data);
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
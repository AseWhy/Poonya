/**
 * @file src/classes/data/PoonyaNumber.js
 * @description Cодержит класс числа Poonya
 * @author Astecom
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
     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
     * @param {Number} init - Данные для инициализации объекта.
     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
     * @param {Function} reject - Функция для выброса исключения.
     * 
     * @memberof Poonya.Data
     * @constructs PoonyaNumber
     * @extends PoonyaObject
     * @public
     */
    constructor(prototype = null, init, context, reject) {
        super(prototype, init, context, reject);

        this.data = parseFloat(init);
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
    result(context, out, reject, resolve) {
        resolve(this.data);
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
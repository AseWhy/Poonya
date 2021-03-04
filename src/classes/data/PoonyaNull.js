/**
 * @file src/classes/data/PoonyaNull.js
 * @description Cодержит класс null объекта Poonya
 * @author Astecom
 */

"use strict";

const PoonyaObject = require("./PoonyaObject");

/**
 * @lends PoonyaNull
 * @class
 */
class PoonyaNull extends PoonyaObject {
    /**
     * Дескриптор массива в poonya
     *
     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
     * @param {null} init - Данные для инициализации объекта.
     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
     * @param {Function} reject - Функция для выброса исключения.
     * 
     * @memberof Poonya.Data
     * @constructs PoonyaNull
     * @extends PoonyaObject
     * @public
     */
    constructor(prototype = null, init, context, reject) {
        super(prototype, null, context, reject);
    }

    /**
     * Возвращает копию этого объекта
     * 
     * @returns {PoonyaNull} клонированый объект
     */
    clone(){
        return new PoonyaNull(this.prototype);
    }

    /**
     * Применяет новое значение к текущему объекту
     * 
     * @param {Boolean} value значение, которое нужно применить к этомй объекту
     * @method
     * @override
     */
    append(){ }

    /**
     * Устанавливать значения для null нельзя
     * 
     * @override
     * @method
     * @public
     */
    set() {
        
    }

    /**
     * Удалять значения для null нельзя
     * 
     * @override
     * @method
     * @public
     */
    remove() {

    }

    /**
     * Сериализует null в значение резуьтата выполнения
     *
     * @override
     * @method
     * @public
     */
    result(context, out, reject, resolve) {
        resolve(null);
    }

    /**
     * Сериализует null в javascript null
     *
     * @override
     * @method
     * @public
     */
    toRawData(){
        return null;
    }
}

module.exports = PoonyaNull;
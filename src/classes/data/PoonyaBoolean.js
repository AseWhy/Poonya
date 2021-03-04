/**
 * @file src/classes/data/PoonyaBoolean.js
 * @description Cодержит класс булевого значения Poonya
 * @author Astecom
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
     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
     * @param {Boolean} init - Данные для инициализации объекта.
     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
     * @param {Function} reject - Функция для выброса исключения.
     * 
     * @memberof Poonya.Data
     * @constructs PoonyaBoolean
     * @extends PoonyaObject
     * @public
     */
    constructor(prototype = null, init, context, reject) {
        super(prototype, init, context, reject);

        this.data = typeof init == 'boolean' ? init : init == 'true' ? true : init == 'false' ? false : true;
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
        return new PoonyaBoolean(this.prototype, this.data);
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
    result(context, out, reject, resolve) {
        resolve(this.data);
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
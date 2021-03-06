/**
 * @file src/classes/data/PoonyaString.js
 * @description Cодержит класс строки Poonya
 * @author Astecom
 */

"use strict";

const PoonyaObject = require("./PoonyaObject");

/**
 * @lends PoonyaString
 * @class
 */
class PoonyaString extends PoonyaObject {
    /**
     * Дескриптор объекта строки в poonya
     *
     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
     * @param {String} init - Данные для инициализации объекта.
     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
     * @param {Function} reject - Функция для выброса исключения.
     * 
     * @memberof Poonya.Data
     * @constructs PoonyaString
     * @extends PoonyaObject
     * @public
     */
    constructor(prototype = null, init, context, reject) {
        super(prototype, init, context, reject);

        this.data = init;
    }

    /**
     * Возвращает копию этого объекта
     * 
     * @returns {PoonyaString} клонированый объект
     */
    clone(){
        return new PoonyaString(this.prototype, this.data);
    }

    /**
     * Применяет новое значение к текущему объекту
     * 
     * @param {String} value значение, которое нужно применить к этомй объекту
     * @method
     * @override
     */
    append(value){
        this.data = value;
    }

    /**
     * Получает символ по индексу, или значени из прототипа по ключу.
     * 
     * @param {String|Number} key ключ, по которому нужно получить значение
     * @param {iContext} context контекст, который будет использоваться для кастинга значения
     * 
     * @method
     * @override
     */
    get(key, context){
        let data = this.data[key];

        if (typeof data === 'string') {
            return new PoonyaString(this.prototype, data);
        } else {
            return super.get(key, context);
        }
    }

    /**
     * Устанавливать значения строке нельзя
     * 
     * @override
     * @method
     * @public
     */
    set() {

    }

    /**
     * Удалять значения строке нельзя
     * 
     * @override
     * @method
     * @public
     */
    remove() {

    }

    /**
     * Сериализует строку значение результата
     *
     * @override
     * @method
     * @public
     */
    result(context, out, reject, resolve) {
        resolve(this.data);
    }
    
    /**
     * Сериализует строку в javascript строку
     *
     * @override
     * @method
     * @public
     */
    toRawData(){
        return this.data;
    }
}

module.exports = PoonyaString;
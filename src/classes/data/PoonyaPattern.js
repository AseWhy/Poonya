/**
 * @file src/classes/data/PoonyaPattern.js
 * @description Cодержит класс строки Poonya
 * @author Astecom
 */

"use strict";

const { Cast } = require("../../utils");
const { iCodeEmitter } = require("../interfaces");
const PoonyaObject = require("./PoonyaObject");

/**
 * @lends PoonyaPattern
 * @class
 */
class PoonyaPattern extends PoonyaObject {
    /**
     * Дескриптор объекта строки в poonya
     *
     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
     * @param {iCodeEmitter} init - Данные для инициализации объекта.
     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
     * @param {Function} reject - Функция для выброса исключения.
     * 
     * @memberof Poonya.Data
     * @constructs PoonyaPattern
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
     * @returns {PoonyaPattern} клонированый объект
     */
    clone(){
        return new PoonyaPattern(this.prototype, this.data);
    }

    /**
     * Нельзя получить данные из шаблона по индексу
     * 
     * @method
     * @override
     */
    get(){
        return null;
    }

    /**
     * Устанавливать значения шаблону нельзя
     * 
     * @override
     * @method
     * @public
     */
    set() {

    }

    /**
     * Удалять значения шаблону нельзя
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
        const result = this.data.result();

        if(result instanceof Promise)
            result.then(d_result => Cast(d_result, context, [], resolve));
        else
            result.complete().then(d_result => Cast(d_result, context, [], resolve));
    }
    
    /**
     * Сериализует строку в javascript строку
     *
     * @override
     * @method
     * @public
     */
    toRawData(){
        return '[Object:Pattern]';
    }
}

module.exports = PoonyaPattern;
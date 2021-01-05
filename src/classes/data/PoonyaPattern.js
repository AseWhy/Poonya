/**
 * @file src/classes/data/PoonyaPattern.js
 * @description Cодержит класс строки Poonya
 * @author Astecom
 */

"use strict";

const { Cast } = require("../../utils");
const PoonyaObject = require("./PoonyaObject");

/**
 * @lends PoonyaPattern
 * @class
 */
class PoonyaPattern extends PoonyaObject {
    /**
     * Дескриптор объекта строки в poonya
     *
     * @param {iPoonyaPrototype} prototype Прототип строки
     * @param {iCodeEmitter} init Исходная строка
     * 
     * @memberof Poonya.Data
     * @constructs PoonyaPattern
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
            result.then(d_result => resolve(Cast(d_result, context)));
        else
            result.complete().then(d_result => resolve(Cast(d_result, context)));
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
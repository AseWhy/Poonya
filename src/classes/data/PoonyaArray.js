/**
 * @file src/classes/data/PoonyaArray.js
 * @description Cодержит класс массива Poonya
 * @author Astecom
 */

"use strict";

const { FIELDFLAGS } = require("../static")
    ,   PoonyaObject = require("./PoonyaObject")
    ,   NativeFunction = require('./NativeFunction');

/**
 * @lends PoonyaArray
 * @class
 */
class PoonyaArray extends PoonyaObject {
    /**
     * Дескриптор массива в poonya
     *
     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
     * @param {Boolean} init - Данные для инициализации объекта.
     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
     * @param {Function} reject - Функция для выброса исключения.
     * 
     * @memberof Poonya.Data
     * @constructs PoonyaArray
     * @extends PoonyaObject
     * @public
     */
    constructor(prototype = null, init, context, reject) {
        const computed = new Object();

        if (init) {
            if(Array.isArray(init)) {
                for (let i = 0, leng = init.length; i < leng; i++) {
                    computed[i] = init[key];
                }
            } else {
                for(let key in init) {
                    switch(typeof key) {
                        case "string":
                            computed[parseInt(key)] = init[key];
                        break;
                        case "number":
                            computed[key] = init[key];
                        break;
                    }
                }
            }
        }

        super(prototype, computed, context, reject);
    }

    /**
     * Возвращает копию этого объекта
     * 
     * @returns {PoonyaArray} клонированый объект
     */
    clone(){
        const obj = new PoonyaArray(this.prototype);

        obj.fields = new Map(this.fields);
        obj.field_attrs = new Map(this.field_attrs);

        return obj;
    }

    /**
     * Добавляет данные в модуль памяти
     *
     * @param {iContext} context контекст, по которому будет преобразовано значение в случе необходимости
     * @param {Object} data данные которые нужно добавить
     * @param {Array<Any>} parents_three стэк родителей добавляемого значения
     * @method
     * @public
     */
    push(context, data, parents_three = new Array()) {
        this.set(context, this.fields.size, data, parents_three);
    }

    /**
     * Сериализует массив в javascript массив
     * 
     * @override
     * @method
     * @public
     */
    result(context, out, reject, resolve) {
        let output = new Array(this.fields.size),
            data;
        
        for (let [key, value] of this.fields) {
            data = this.field_attrs.get(key);

            if (data == null || (data & FIELDFLAGS.NOOUTPUT) === 0)
                if (value instanceof NativeFunction)
                    output[key] = value != null ? value.target : null;
                else if(value != null)
                    value.result(context, out, reject, result => output[key] = result);
        }

        resolve(output);
    }

    /**
     * Сериализует массив в простое значение.
     *
     * @override
     * @method
     * @public
     */
    toRawData(){
        return `[Array:${this.prototype.name}]`;
    }
}

module.exports = PoonyaArray;
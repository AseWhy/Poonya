/**
 * @file src/classes/data/PoonyaArray.js
 * @description Cодержит класс массива Poonya
 * @author Astecom
 * @license MIT
 */

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
     * @param {iPoonyaPrototype} prototype Прототип массива
     * @param {Object} init Объект, который будет использоваться для иницализации текущего массива
     * @param {iContext} context Текущий контекст, который будет использовать при кастинге значений
     * 
     * @memberof Poonya.Data
     * @constructs PoonyaArray
     * @extends PoonyaObject
     * @public
     */
    constructor(prototype = null, init, context) {
        super(prototype);

        if (init) {
            if(Array.isArray(init)) {
                for (let i = 0, leng = init.length; i < leng; i++) {
                    this.push(context, init[i]);
                }
            } else {
                for(let key in init) {
                    switch(typeof key) {
                        case "string":
                            this.set(context, parseInt(key), init[key]);
                        break;
                        case "number":
                            this.set(context, key, init[key]);
                        break;
                    }
                }
            }
        }
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
    result(context, out, throw_error) {
        let output = new Array(this.fields.size),
            data;
        
        for (let [key, value] of this.fields) {
            data = this.field_attrs.get(key);

            if (data == null || (data & FIELDFLAGS.NOOUTPUT) === 0)
                if (value instanceof NativeFunction)
                    output[key] = value != null ? value.target : null;
                else
                    output[key] = value != null ? value.result(context, out, throw_error) : null;
        }

        return output;
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
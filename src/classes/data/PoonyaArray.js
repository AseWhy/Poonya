/**
 * @file src/classes/data/PoonyaArray.js
 * @description Cодержит класс массива Poonya
 * @author Astecom
 * @license MIT
 */

const       PoonyaObject = require("./PoonyaObject")
    ,       NativeFunction = require('../excecution/expression/NativeFunction'),
    { 
            FIELDFLAGS
    } = require("../static");

/**
 * @lends PoonyaArray
 * @class
 */
class PoonyaArray extends PoonyaObject {
    /**
     * Дескриптор массива в poonya
     *
     * @param {Object} data
     * @memberof Poonya.Data
     * @constructs PoonyaArray
     * @extends PoonyaObject
     * @public
     */
    constructor(prototype = null, init, context) {
        super(prototype, null, context);

        if (init)
            for (let i = 0, leng = init.length; i < leng; i++) {
                this.push(init[i]);
            }
    }



    /**
     * Добавляет данные в модуль памяти
     *
     * @param {Object} data данные которые добавляем
     * @param {Array<Any>} parents_three стэк родетелей добавляемого значения
     * @method
     * @public
     */
    push(data, parents_three = new Array()) {
        super.set(this.fields.size, data, parents_three);
    }

    /**
     * Устанавливает индекс массива
     *
     * @override
     * @method
     * @public
     */
    set(key, data, parents_three = new Array()) {
        if (typeof key !== "number" ||
            key < -Number.MAX_SAFE_INTEGER ||
            key > Number.MAX_SAFE_INTEGER)
            throw new TypeError('Bad key for ' + key);

        super.set(key, data, parents_three);
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
}

module.exports = PoonyaArray;
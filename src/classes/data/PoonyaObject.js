/**
 * @file src/classes/data/PoonyaObject.js
 * @description Cодержит класс объекта Poonya
 * @author Astecom
 */

"use strict";

const { 
            BadKeyInvalidTypeException
        ,   BadKeyProtectedFieldException 
    } = require('../exceptions'),
    { 
            SUPER_CALL
        ,   GET
        ,   FIELDFLAGS
        ,   CONFIG
    } = require('../static'), 
    { 
            Cast
    } = require('../../utils.js'),
    {
            iPoonyaObject
        ,   iPoonyaPrototype
    } = require('../interfaces'),
            NativeFunction = require('./NativeFunction');

/**
 * @lends PoonyaObject
 * @class
 */
class PoonyaObject extends iPoonyaObject {
    /**
     * Дескриптор объекта в poonya
     *
     * @param {PoonyaObject} prototype - Прототип объекта, если необходимо
     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память
     * @param {Object} init - Объект инициализации
     * 
     * @memberof Poonya.Data
     * 
     * @constructs PoonyaObject
     * @public
     */
    constructor(prototype, init, context) {
        super();

        this.fields = new Map();
        this.field_attrs = new Map();
        this.raw = false;

        if (prototype instanceof iPoonyaPrototype) {
            prototype[SUPER_CALL](this);

            this.prototype = prototype;
        }

        if (init != null)
            this.append(context, init);
    }

    /**
     * Возвращает копию этого объекта
     * 
     * @returns {PoonyaObject} клонированый объект
     */
    clone(){
        const obj = new PoonyaObject(this.prototype);

        obj.fields = new Map(this.fields);
        obj.field_attrs = new Map(this.field_attrs);

        return obj;
    }

    /**
     * Проверяет, существует ли ключ в текущем объекте
     *
     * @param {String} key ключ который прверяем
     * @method
     * @public
     */
    has(key) {
        return this.fields.has(key);
    }

    /**
     * Удаляет ключ из объекта
     *
     * @param {String} key ключ который нужно удалить
     * @method
     * @public
     */
    remove(key) {
        return this.fields.delete(key) && this.field_attrs.delete(key);
    }

    /**
     * Получет значение из текущей области памяти по ключу `key`
     *
     * @param {String} key ключ, по которому происходит получение значения
     * @param {iContext} context контекст, который будет использоваться для кастинга значения
     * @method
     * @public
     */
    get(key, context) {
        let data = this.fields.get(key);

        if (data != null) {
            return data;
        } else {
            return this.prototype[GET](key, context, false);
        }
    }

    /**
     * Запрещает изменение поля
     *
     * @param {String|Number} key ключ для получения поля
     * @public
     * @method
     */
    setConstant(key) {
        let current = 0x0;

        if ((current = this.field_attrs.get(key)) != null) {
            this.field_attrs.set(key, current | FIELDFLAGS.CONSTANT);
        } else {
            throw new Error('Cannot find filed ' + key + ' in ' + this.prototype.name + '.Object');
        }
    }

    /**
     * Скрывает поле при выводе
     *
     * @param {String|Number} key ключ для получения поля
     * @public
     * @method
     */
    setHide(key) {
        let current = 0x0;

        if ((current = this.field_attrs.get(key)) != null) {
            this.field_attrs.set(key, current | FIELDFLAGS.NOOUTPUT);
        } else {
            throw new Error('Cannot find filed ' + key + ' in ' + this.prototype.name + '.Object');
        }
    }

    /**
     * Обновляет данные в текущем объекте
     *
     * @param {iContext} context контекст, по которому будет приобразовано значение в случае необходимости
     * @param {Object} data данные которые нужно обновить
     * 
     * @method
     * @public
     */
    append(context, data) {
        if (typeof data === "object") {
            if (Array.isArray(data)) {
                for (let i = 0, leng = data.length; i < leng; i++)
                    this.set(context, i, data[i], data);
            } else {
                if (data instanceof PoonyaObject) {
                    for (let entry of data.fields) {
                        this.set(context, entry[0], entry[1]);
                    }
                } else {
                    for (let key in data)
                        this.set(context, key, data[key]);
                }
            }
        } else {
            throw new TypeError();
        }
    }

    /**
     * Устанавливает значение для текущей области памяти
     *
     * @param {String} key ключ по которому будет происходить установка
     * @param {Object} data данные которые будут установлены
     * @param {?Array<Object>} parents_three стэк родителей
     * @method
     * @public
     */
    set(context, key, data, parents_three = new Array()) {
        if (typeof key !== "string" && typeof key !== "number")
            throw new BadKeyInvalidTypeException();

        const attrs = this.field_attrs.get(key);

        if (attrs != null && (attrs & FIELDFLAGS.CONSTANT) === 0)
            throw new BadKeyProtectedFieldException();

        try {
            this.fields.set(key, Cast(data, context, parents_three));
        } catch (e) {
            if(CONFIG.DEBUG)
                console.error(e);

            throw new Error("Error when cast value of " + key);
        }
    }

    /**
     * Возвращает строковой эквивалент объекта
     *
     * @param {iContext} context текущий контекст
     * @param {Array<String>} out Выходной массив
     * @param {Function} reject Функция вызывающаяся при ошибках
     * 
     * @returns {String}
     */
    toString(context, out, reject){
        let toString = this.fields.get('toString');

        if(toString != null) {
            return toString.result(context, out, reject);
        } else {
            return `[Object${this.prototype.name}]`;
        }
    }

    /**
     * ДеСериализует значени объекта в javascript объект
     *
     * @param {?iContext} context текущий контекст
     * @param {?Array<String>} out Выходной массив
     * @param {?Function} reject Функция вызывающаяся при ошибках
     * @method
     * @public
     */
    result(context, out, reject, resolve) {
        let output = new Object(),
            data;

        for (let [key, value] of this.fields) {
            data = this.field_attrs.get(key);

            if (data == null || (data & FIELDFLAGS.NOOUTPUT) === 0)
                if (value instanceof NativeFunction)
                    output[key] = value != null ? value.target : null;
                ///
                /// Поскольку асинхронными, в poonya, могут быть только нативные функции, то значения оберторк можно получить синхрнно
                ///
                else if(value != null)
                    value.result(context, out, reject, result => output[key] = result);
        }

        resolve(output);
    }

    /**
     * Сериализует объект в простое значение.
     *
     * @override
     * @method
     * @public
     */
    toRawData(){
        return `[Object:${this.prototype.name}]`;
    }
}

module.exports = PoonyaObject;
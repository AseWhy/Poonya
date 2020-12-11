/**
 * @file src/classes/data/PoonyaObject.js
 * @description Cодержит класс объекта Poonya
 * @author Astecom
 * @license MIT
 */

const { 
            BadKeyInvalidTypeException
        ,   BadKeyProtectedFieldException 
    } = require('../exceptions'), 
    { 
            iContext
    } = require('../interfaces'), 
    { 
            SUPER_CALL
        ,   GET
        ,   FIELDFLAGS 
    } = require('../static'), 
    { 
            Cast
    } = require('../../utils.js'),
    {
            iPoonyaObject
        ,   iPoonyaPrototype
    } = require('../interfaces'),
            NativeFunction = require('../excecution/expression/NativeFunction');

/**
 * @lends PoonyaObject
 * @class
 */
class PoonyaObject extends iPoonyaObject {
    /**
     * Дескриптор объекта в poonya
     *
     * @param {PoonyaObject} prototype Прототип объекта, если необходимо
     * @param {Object} init Объект инициализации
     * @memberof Poonya.Data
     * @constructs PoonyaObject
     * @public
     */
    constructor(prototype, init, context) {
        super();

        this.fields = new Map();
        this.field_attrs = new Map();

        if (context instanceof iContext)
            this.context = context;
        else
            throw new Error('No context passed: dynamic data needs context.');

        if (prototype instanceof iPoonyaPrototype) {
            prototype[SUPER_CALL](this);

            this.prototype = prototype;
        }

        if (init != null)
            this.append(init);
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
        return this.fields.delete(key);
    }

    /**
     * Получет значение из текущей области памяти по ключу `key`
     *
     * @param {String} key ключ, по которому происходит получение значения
     * @method
     * @public
     */
    get(key) {
        let data = this.fields.get(key);

        if (data != null) {
            return data;
        } else {
            return this.prototype[GET](key, this.context);
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
     * @param {Object} data данные которые нужно обновить
     * @method
     * @public
     */
    append(data) {
        if (typeof data === "object") {
            if (Array.isArray(data)) {
                for (let i = 0, leng = data.length; i < leng; i++)
                    this.set(i, data[i], data);
            } else {
                if (data instanceof PoonyaObject) {
                    for (let entry of data.fields) {
                        this.set(entry[0], entry[1]);
                    }
                } else {
                    for (let key in data)
                        this.set(key, data[key]);
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
    set(key, data, parents_three = new Array()) {
        if (typeof key !== "string" && typeof key !== "number")
            throw new BadKeyInvalidTypeException();

        const attrs = this.field_attrs.get(key);

        if (attrs != null && (attrs & FIELDFLAGS.CONSTANT) === 0)
            throw new BadKeyProtectedFieldException();

        try {
            this.fields.set(key, Cast(data, this.context, parents_three));
        } catch (e) {
            console.log(e)

            console.error("Error when cast value of " + key);
        }
    }

    /**
     * ДеСериализует значени объекта в javascript объект
     *
     * @param {?iContext} context текущий контекст
     * @param {?Array<String>} out Выходной массив
     * @param {?Function} throw_error Функция вызывающаяся при ошибках
     * @method
     * @public
     */
    result(context, out, throw_error) {
        let output = new Object(),
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

module.exports = PoonyaObject;
/**
 * @file src/classes/data/PoonyaPrototype.js
 * @description Cодержит объект прототипа объекта Poonya
 * @author Astecom
 */

"use strict";

const { 
            IS
        ,   GET
        ,   FIELDFLAGS
        ,   SUPER_CALL
    } = require("../static"),
    {
            iPoonyaPrototype
    } = require('../interfaces'),
    {
            Cast
    } = require('../../utils.js');

/**
 * @lends PoonyaPrototype
 * @class
 */
class PoonyaPrototype extends iPoonyaPrototype {
    /**
     * Прототип объекта, позволяет
     *
     * @param {?PoonyaPrototype[]} parents прототипы объекта, если необходимо
     * @param {String} name имя прототипа, который необъодимо создать
     *
     * @property {String} name имя прототипа
     * @property {PoonyaPrototype[]} _parents
     * @property {Map<String|Number, Operand>} _fields_data
     * @property {Map<String|Number, Number>} _fields
     *
     * @memberof Poonya.Data
     * @constructs PoonyaPrototype
     * @public
     */
    constructor(parents = [], name) {
        super();

        if (parents.find(e => !(e instanceof iPoonyaPrototype)) != null)
            throw new Error('Only descendants of iPoonyaPrototype should be specified as parents of the target class');

        if (typeof name === 'string' || name == null) {
            this.name = name != null ? name : 'Object';
        } else {
            throw new Error('Only string value can be passed as name');
        }

        this._parents = [...parents];
        this._fields_data = new Map();
        this._fields = new Map();
    }

    /**
     * Возвращает копию этого объекта
     * 
     * @returns {PoonyaPrototype} клонированый объект
     */
    clone(){
        const obj = new PoonyaPrototype(this._parents, this.name);

        obj._fields = new Map(this._fields);
        obj._fields_data = new Map(this._fields_data);

        return obj;
    }

    /**
     * Добавляет родительский прототип целевому
     *
     * @param {iPoonyaPrototype} parent прототип объекта
     * @method
     * @public
     */
    expand(parent) {
        if (parent instanceof iPoonyaPrototype)
            this._parents.push(parent);
        else
            throw new TypeError("Parent must be an iPoonyaPrototype instance.");
    }

    /**
     * Устанавливает данные прототипа объекта
     *
     * @param {String} field поле которое нужно установить
     * @param {Any} data данные которые нужно установить
     * @param {FIELDFLAGS} flags флаги поля
     * @method
     * @public
     */
    addField(field, data, flags, context) {
        Cast(data, context, [], this._fields.set.bind(this._fields, field));

        this._fields_data.set(field, flags);
    }

    /**
     * Проверяет, является ли текщуий прототип, наследником другого протитипа
     *
     * @param {String} key ключ прототипа, который ищем
     * @returns {Boolean} является ли текущий прототип подтипом другого прототипа
     * @protected
     * @method
     */
    [IS](key) {
        if (key === this.name)
            return true;
        else for (let i = 0, leng = this._parents; i < leng; i++) {
            if (this._parents[IS](key)) return true;
        }

        return false;
    }

    /**
     * Получает статическое значение прототипа
     *
     * @param {String} key ключ, по которому получаем значение
     * @param {iContext} context объект, который хочет получить поле
     * @param {Boolean} static_assces если true - то значит поле пытваются получить не создав объект - т.е. статически
     * @protected
     * @method
     * @returns {Operand|null}
     */
    [GET](key, context, static_assces = true) {
        // Буффер данных
        let data;

        if ((data = this._fields.get(key)) != null) {
            if (!static_assces || (this._fields_data.get(key) & FIELDFLAGS.STATIC) !== 0)
                return data;
            else
                return null;
        } else {
            for (let i = 0, leng = this._parents.length; i < leng; i++) {
                if ((data = this._parents[i][GET](key, context, static_assces)) != null) {
                    return data;
                }
            }

            return null;
        }
    }

    /**
     * Вызывает супер вызов всех родительских конструкторов
     *
     * @param {PoonyaObject} child дочерний объект, который необходимо собрать
     * @param {Map} data данные для инициализауии объекта
     * 
     * @method
     * @protected
     */
    [SUPER_CALL](child, data) {
        // 
        // Копирую свойства полей
        // 
        for (let [key, value] of this._fields_data)
            child.field_attrs.set(key, value);

        //
        // Получаю конструктор этого прототипа
        // 
        const constructor = [...this._fields_data.entries()].find(e => e === FIELDFLAGS.CONSTRUCTOR);

        // 
        // Если нашел, вызываю его
        // 
        if(constructor != null && typeof this._fields.get(constructor[0]) == 'function')
            this._fields.get(constructor[0]).call(child, data);

        //
        // Вызываем конструкторы родительских прототипов
        //
        for (let i = 0, leng = this._parents.length; i < leng; i++)
            this._parents[i][SUPER_CALL](child, data);
    }

    /**
     * Сериализует объект в простое значение.
     *
     * @override
     * @method
     * @public
     */
    toRawData(){
        return `[Prototype:${this.name}]`;
    }
}

module.exports = PoonyaPrototype;
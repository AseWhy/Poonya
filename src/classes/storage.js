/**
 * @file src/storage.js
 * @description Содержит в себе напиор классов и функций для управления динамической памятью.
 * @license MIT
 * @author Astecom
 */

const { GetFieldOfNullException, IsNotAConstructorException } = require('./exceptions')
    , { GET, SERVICE, IS } = require('./static')
    , { Cast } = require('../utils.js')
    , { iContext, iPoonyaPrototype } = require('./interfaces')
    , { PoonyaStaticLibrary } = require('../importer.js')
    ,   ExpressionGroup = require('./excecution/expression/ExpressionGroup')
    ,   PoonyaObject = require('./data/PoonyaObject')
    ,   PoonyaArray = require('./data/PoonyaArray')
    ,   PoonyaInteger = require('./data/PoonyaInteger')
    ,   PoonyaNumber = require('./data/PoonyaNumber')
    ,   PoonyaString = require('./data/PoonyaString')
    ,   PoonyaBoolean = require('./data/PoonyaBoolean')
    ,   PoonyaNull = require('./data/PoonyaNull');

/**
 * @lends Heap
 * @class
 */
class Heap extends Map {
    /**
     * Модуль памяти, может использоваться для манипульций с памятью.
     *
     * @param {iContext} context - Контекст, типы из которого будт использоваться для кастинга значений, при необходимости
     * @param {Object} data - Данные инициализации модуля памяти
     *
     * @memberof Poonya.Storage
     * @constructs Heap
     * @public
     */
    constructor(context, data) {
        super();

        if (data != null) this.append(context, data);
    }

    /**
     * Обновляет данные в текущем объекте
     *
     * @param {iContext} context - Контекст, типы из которого будт использоваться для кастинга значений, при необходимости
     * @param {Object} data - Данные которые нужно обновить
     *
     * @method
     * @public
     */
    append(context, data) {
        if (typeof data === 'object') {
            if (Array.isArray(data)) {
                for (let i = 0, leng = data.length; i < leng; i++) this.set(context, i, data[i]);
            } else {
                if (data instanceof PoonyaObject) {
                    for (let entry of data.fields) {
                        this.set(context, entry[0], entry[1]);
                    }
                } else if (data instanceof Heap) {
                    for (let entry of data) {
                        this.set(context, entry[0], entry[1]);
                    }
                } else {
                    for (let key in data) this.set(context, key, data[key]);
                }
            }
        } else {
            throw new TypeError();
        }
    }

    /**
     * Получет значение из текущей области памяти по ключу `key`
     *
     * @param {String} key ключ, по которому происходит получение значения
     * @method
     * @public
     */
    get(key) {
        return super.get(key);
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
        if (typeof key !== 'string' && typeof key !== 'number')
            throw new TypeError('Bad key ' + key);

        try {
            super.set(key, Cast(data, context, parents_three));
        } catch (e) {
            console.log(e);

            console.error('Error when cast value of ' + key);
        }
    }

    /**
     * ДеСериализует значени е хипа памяти в javascript объект
     *
     * @param {?iContext} context контекст выполнения
     * @param {?Array<String>} out Выходной массив
     * @param {?Function} throw_error Функция вызывающаяся при ошибках
     * @method
     * @public
     */
    result(context, out, throw_error) {
        let output = new Object();

        for (let [key, value] of this)
            if (value instanceof NativeFunction)
                output[key] = value != null ? value.result(context, out, throw_error) : null;
            else output[key] = value != null ? value.target : null;

        return output;
    }
}

/**
 * @lends Context
 * @class
 */
class Context extends iContext {
    /**
     * Контекст выполнения
     *
     * @param {PoonyaStaticLibrary[]} libraries бибилиотеки для инициалзиции контекста
     * @param {Function} throw_error функция, которая будет вызвана при ошибке
     * @param {...Heap} initial Значения переданные для инициализации
     *
     * @memberof Poonya.Storage
     * @constructs Context
     * @implements iContext
     * @classdesc Определяет набор данных для манипуляции в шаблонизаторе
     * @protected
     */
    constructor(libraries, throw_error, ...initial) {
        super();

        this.levels = new Array();

        if (libraries != null) {
            // Корневой слой
            this.levels.push(new Heap(this, null));

            for (let i = 0, leng = libraries.length, target; i < leng; i++) {
                if (libraries[i] instanceof PoonyaStaticLibrary) {
                    if (libraries[i].global) {
                        libraries[i].importTo(this.levels[0], this, throw_error);
                    } else {
                        target = this.createObject(
                            null,
                            -1,
                            SERVICE.CONSTRUCTORS.OBJECT,
                            throw_error
                        );

                        libraries[i].importTo(target, this, throw_error);

                        this.levels[0].set(this, libraries[i].namespace, target);
                    }
                }
            }
        }

        this.levels.push(...initial.filter(e => e instanceof Heap));
    }

    /**
     * Клонирует текущий контекст, возвращает новый кнотекст, со всеми уровнями текущего контекста
     *
     * @returns {iContext} клонированный контекст
     * @method
     * @public
     */
    clone() {
        return new Context(null, null, this.levels);
    }

    /**
     * Добавляет уроень в текущий контекст
     * @method
     * @public
     */
    addLevel(level) {
        if (level != null) {
            if (level instanceof Heap) this.levels.push(level);
            else throw new Error('The level for the context must be heap, or indexed by the heap');
        } else {
            this.levels.push(new Heap(this, null));
        }
    }

    /**
     * Выходит из текущего контекста
     * @method
     * @public
     */
    popLevel() {
        this.levels.pop();
    }

    /**
     * Получет значение из текущего контекста
     *
     * @param {String} val адрес* в памяти
     * @method
     * @public
     */
    get(val) {
        let b = null,
            p = this.levels.length - 1;

        while (p >= 0 && (b = this.levels[p--].get(val)) == null);

        return b;
    }

    /**
     * Проверяет, имеется ли значение в заданном контексте
     *
     * @param {String} val адрес* в памяти
     * @param {String} params дополнительные параметры поиска
     * @method
     * @public
     *
     * @description
     * params может быть равен:
     *  `tree` - поиск по всему дереву
     *  `up` - поиск по самомой верхней области памяти
     *  `root` - поиск по самой нижней области памяти
     */
    has(val, params = 'tree') {
        switch (params) {
            case 'tree':
                return this.get(val) !== null;
            case 'up':
                return this.levels[this.levels.length - 1].has(val);
            case 'root':
                return this.levels[0].has(val);
        }
    }

    /**
     * Устанавливает значение в контексте исполнения
     *
     * @param {String} val адрес* в памяти
     * @param {Object} data Значение для установки
     * @param {String} params дополнительные параметры поиска
     * @method
     * @public
     *
     * @description
     * params может быть равен:
     *  `tree` - поиск по всему дереву
     *  `up` - поиск по самомой верхней области памяти
     *  `root` - поиск по самой нижней области памяти
     */
    set(val, data, params = 'tree') {
        switch (params) {
            case 'tree':
                let p = this.levels.length;

                while (--p >= 0) {
                    if (this.levels[p].get(val) != null) {
                        this.levels[p].set(this, val, data);

                        return;
                    }
                }

                this.levels[this.levels.length - 1].set(this, val, data);
                break;
            case 'up':
                this.levels[this.levels.length - 1].set(this, val, data);
                break;
            case 'down':
                this.levels[0].set(this, val, data);
                break;
        }
    }

    /**
     * Возвращает данные из текущего контекста, по заданному пути
     *
     * @param {Array<String|Number|Operand>} path путь, по которому можно получить значение
     * @param {Number} position Позиция вызова(необходимо в случае возникновения ошибки)
     * @param {Object} type Тип который необходимо получить
     * @param {Function} throw_error Фукцния которая выбрасывает ошибку(необходимо в случае возникновения ошибки)
     * @param {Boolean} return_full_info Возвращать полную информацию о переменной, включая родительский объект(если имеется)
     *
     * @returns {?ParserData|?{
     *  instance: ParserData,
     *  parent: PoonyaObject|iPoonyaPrototype,
     *  index: Number
     * }} если по заданому пути существует значение вернет его, если нет то вернет null
     * @method
     * @public
     */
    getByPath(path, position, type = null, throw_error, return_full_info = false) {
        let instance = this.get(path[0]),
            parent = null,
            flags = 0,
            query_stack = Array.from(path),
            leng = query_stack.length,
            index = 1;

        for (; instance && index < leng; index++) {
            if (query_stack[index] instanceof ExpressionGroup)
                query_stack[index] = query_stack[index].result(this, null, throw_error).toRawData();

            if (instance instanceof PoonyaObject) {
                parent = instance;

                flags = instance.field_attrs.get(query_stack[index]);

                instance = instance.get(query_stack[index]);
            } else if (instance instanceof iPoonyaPrototype) {
                instance = instance[GET](query_stack[index], this);
            } else {
                throw_error(position, new GetFieldOfNullException(query_stack[index]));
            }
        }

        if (type == null || instance instanceof type)
            if (return_full_info) {
                return {
                    instance,
                    parent,
                    index,
                    flags
                };
            } else {
                return instance;
            }
        else return null;
    }

    /**
     * Сравнивает инстанцию, возвращает эквивалент в boolean
     *
     * @param {Any} instance инстанция которую стравнием
     * @returns {Boolean}
     */
    toBooleanResult(instance) {
        if (instance instanceof PoonyaBoolean) {
            return instance.data;
        }

        if (instance instanceof PoonyaInteger || instance instanceof PoonyaNumber) {
            return instance.data != 0;
        }

        if (instance instanceof PoonyaNull) {
            return false;
        }

        if (instance instanceof PoonyaObject || instance instanceof PoonyaArray) {
            return true;
        }

        if (instance instanceof PoonyaString) {
            return instance.data.length != 0;
        }

        return instance != null;
    }

    /**
     *
     * @param {*} initial
     * @param {*} position
     * @param {*} path
     * @param {*} throw_error
     * @param {*} parents_three
     *
     * @returns {PoonyaObject} если по заданому пути существует значение вернет его, если нет то вернет null
     * @method
     * @public
     */
    createObject(initial, position, path, throw_error, parents_three = new Array()) {
        const prototype = this.getByPath(path, position, iPoonyaPrototype, throw_error);

        if (prototype != null) {
            if(prototype[IS]('Array')) {
                let init = new Array();

                if (initial instanceof Map) {
                    for (let entry of initial) {
                        if (!parents_three.includes(entry[1])) {
                            if(typeof entry[1].result === 'function')
                                init[entry[0]] = entry[1].result(this, null, throw_error);
                            else
                                init[entry[0]] = entry[1];
                        }
                    }
                } else if (typeof initial === 'object' && initial != null) {
                    for (let key in initial) {
                        if (!parents_three.includes(initial[key])) {
                            if(typeof initial[key].result === 'function')
                                init[key] = initial[key].result(this, null, throw_error);
                            else
                                init[key] = initial[key];
                        }
                    }
                }

                return new PoonyaArray(prototype, init, this);
            } else {
                let init = new Object();

                if (initial instanceof Map) {
                    for (let entry of initial) {
                        if (!parents_three.includes(entry[1])) {
                            if(typeof entry[1].result === 'function')
                                init[entry[0]] = entry[1].result(this, null, throw_error);
                            else
                                init[entry[0]] = entry[1];
                        }
                    }
                } else if (typeof initial === 'object' && initial != null) {
                    for (let key in initial) {
                        if (!parents_three.includes(initial[key])) {
                            if(typeof initial[key].result === 'function')
                                init[key] = initial[key].result(this, null, throw_error);
                            else
                                init[key] = initial[key];
                        }
                    }
                } else {
                    init = initial;
                }
    
                switch (true) {
                    case prototype[IS]('String'): return new PoonyaString(prototype, init, this);
                    case prototype[IS]('Integer'): return new PoonyaInteger(prototype, init, this);
                    case prototype[IS]('Boolean'): return new PoonyaBoolean(prototype, init, this);
                    case prototype[IS]('Number'): return new PoonyaNumber(prototype, init, this);
                    case prototype[IS]('Null'): return new PoonyaNull(prototype, init, this);
                    default: return new PoonyaObject(prototype, init, this);
                }
            }
        } else {
            throw_error(position, new IsNotAConstructorException(path));
        }
    }
}

module.exports.Context = Context;
module.exports.Heap = Heap;

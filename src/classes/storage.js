/**
 * @file src/storage.js
 * @description Содержит в себе напиор классов и функций для управления динамической памятью.
 * @author Astecom
 */

"use strict";

const lexer = require('../lexer/lexer');
const { parser } = require('../parser');
const { GetFieldOfNullException, IsNotAConstructorException } = require('./exceptions')
    , { GET, SERVICE, IS } = require('./static')
    , { Cast, toBytes } = require('../utils.js')
    , { iContext, iPoonyaPrototype } = require('./interfaces')
    , { PoonyaStaticLibrary } = require('../importer.js')
    ,   NativeFunction = require('./data/NativeFunction')
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

        if (data != null)
            this.append(context, data);
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
            console.error('Error when cast value of ' + key);

            console.log(e);
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
     * @implements {iContext}
     * @classdesc Определяет набор данных для манипуляции в шаблонизаторе
     * @protected
     */
    constructor(libraries, throw_error, ...initial) {
        super();

        this.levels = new Array();

        this._lib_cache = new Array();
        
        // Если переданы дидлиотеки для импорта, то импортируем их в этот контекст
        if(libraries != null)
            this.import(libraries, throw_error);

        // Перебераем переданные для инициалзации объекты
        this.levels.push(...initial
            .map(
                // Есл это хип
                e => e instanceof Heap ?
                    // То ничего не делаем
                    e : 
                    // Иначе, если это объект
                    typeof e === 'object' ?
                        // Создаем новый хип с ним
                        new Heap(this, e)
                        // Если это не объект вставляем вместо него null
                        : null
            // Удаляем все не объекты
            ).filter(e => e !== null)
        );
    }

    /**
     * Импортирует нативные библиотеки `libraries` в текущий контекст.
     * 
     * @param {Array<PoonyaStaticLibrary>} libraries массив с библиотеками, которые нужно импортировать
     * @param {Function} throw_error фукнция вызова ошибки
     */
    import(libraries, throw_error){
        if (libraries != null) {
            // Корневой слой
            this.addLevel();

            for (let i = 0, leng = libraries.length, target; i < leng; i++) {
                if (libraries[i] instanceof PoonyaStaticLibrary && !this._lib_cache.includes(libraries[i].namespace)) {
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

                    this._lib_cache.push(libraries[i].namespace);
                }
            }
        }
    }

    /**
     * Выполняет код poonya из строки
     * 
     * @param {String} input Вход шаблона
     * @param {PoonyaOutputStream} out Вывод шаблонизатора
     * @param {Function} throw_error Функция вызова ошибки
     * @method
     * @public
     * @async
     */
    async eval(input, out, throw_error) {
        return (await parser(
            // Выполняем лексинг переданого текста
            lexer(
                // Разбираем текст на байты
                toBytes(input), false
            ), throw_error,
            // Присваеваем рандомный идентификатор исполнителю
            'eval-' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)
        )).result(this, out, throw_error);
    }

    /**
     * Клонирует текущий контекст, возвращает новый кнотекст, со всеми уровнями текущего контекста
     *
     * @returns {iContext} клонированный контекст
     * @method
     * @public
     */
    clone() {
        const clone = new Context(null, null, ...this.levels);

        clone._lib_cache = Array.from(this._lib_cache);

        return clone;
    }

    /**
     * Добавляет уровень в текущий контекст
     * 
     * @param {Heap} level уровень который необходимо добавить
     * @method
     * @public
     */
    addLevel(level) {
        let seed = -0x1;

        if (level != null) {
            if (level instanceof Heap) {
                seed = this.levels.push(level) - 1;
            } else 
                throw new Error('The level for the context must be heap, or indexed by the heap');
        } else {
            seed = this.levels.push(new Heap(this, null)) - 1;
        }

        return seed;
    }

    /**
     * Выходит из текущей области памяти
     * 
     * @param {?Number} index позиция, области памти которую необходимо удалить.
     * @param {Boolean} trnc если `true` то уддаляет все уровни выше.
     * @method
     * @public
     */
    popLevel(index, trnc = true) {
        if(index != null) {
            this.levels.splice(index, trnc ? Infinity : 1);
        } else {
            this.levels.pop();
        }
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
        let p;

        switch (params) {
            case 'tree':
                p = this.levels.length;

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
                (throw_error || console.error)(position, new GetFieldOfNullException(query_stack[index]));
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
     * Создает объект используя конструктор вызванный по пути `path`
     * 
     * @param {Object} initial Значения для инициализации объекта
     * @param {Number} position Позиция, с который вызывается конструктор
     * @param {Array<String>} path Путь к конструктору в памяти
     * @param {Function} throw_error Функция вызова ошибки
     * @param {Array<String>} parents_three Дерево родителей объекта
     *
     * @returns {PoonyaObject} если по заданому пути существует значение вернет его, если нет то вернет null
     * @method
     * @public
     */
    createObject(initial, position, path, throw_error, parents_three = new Array()) {
        const prototype = this.getByPath(path, position, iPoonyaPrototype, throw_error);

        if (prototype != null) {
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
                case prototype[IS]('Array'): return new PoonyaArray(prototype, init, this);
                default: return new PoonyaObject(prototype, init, this);
            }
        } else {
            (throw_error || console.error)(position, new IsNotAConstructorException(path));
        }
    }
}

module.exports.Context = Context;
module.exports.Heap = Heap;

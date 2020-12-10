const { GetFieldOfNullException } = require('./exceptions')
    , { GET } = require('./static')
    , { Cast } = require('../utils')
    , { iContext, iPoonyaPrototype } = require('./interfaces')
    , { PoonyaStaticLibrary } = require('../native/Import')
    , ExpressionGroup = require('./excecution/ExpressionGroup')
    , PoonyaObject = require('./data/PoonyaObject')
    , PoonyaArray = require('./data/PoonyaArray');


/**
 * @lends Heap
 * @class
 */
class Heap extends Map {
    /**
     * Модуль памяти, может использоваться для манипульций с памятью.
     *
     * @param {Object} data
     * @param {iContext} context
     *
     * @property {iContext} context
     *
     * @memberof Poonya
     * @constructs Heap
     * @public
     */
    constructor(data, context) {
        super();

        this.context = context;

        if (data != null)
            this.append(data);
    }

    removeContext() {
        this.context = null;
    }

    setContext(context) {
        if (context instanceof iContext)
            this.context = context;
        else
            throw new Error('context must be an object of type Сontext');
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
                    this.set(i, data[i]);
            } else {
                if (data instanceof PoonyaObject) {
                    for (let entry of data.fields) {
                        this.set(entry[0], entry[1]);
                    }
                } else if (data instanceof Heap) {
                    for (let entry of data) {
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
    set(key, data, parents_three = new Array()) {
        if (typeof key !== "string" && typeof key !== "number")
            throw new TypeError('Bad key.');

        try {
            super.set(key, Cast(data, this.context, parents_three));
        } catch (e) {
            console.log(e)

            console.error("Error when cast value of " + key);
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

            else
                output[key] = value != null ? value.target : null;

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
     * @param {...Heap} initial Значения переданные для инициализации
     * @memberof Poonya
     * @constructs Context
     * @implements iContext
     * @classdesc Определяет набор данных для манипуляции в шаблонизаторе
     * @protected
     */
    constructor(libraries, throw_error, ...initial) {
        super();

        this.levels = new Array(new Heap(null, this));

        if (libraries != null) {
            for (let i = 0, leng = libraries.length; i < leng; i++) {
                if (libraries[i] instanceof PoonyaStaticLibrary) {
                    if (libraries[i].global) {
                        libraries[i].importTo(this, this, throw_error);
                    } else {
                        const target = this.createObject(null, -1, throw_error, SERVICE.CONSTRUCTORS.OBJECT);

                        libraries[i].importTo(target, this, throw_error);

                        this.levels[this.levels.length - 1].set(key, target);
                    }
                }
            }
        }

        this.levels.push(...initial.filter(e => !(e instanceof Heap)).length === 0 ? initial : new Array());
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
            if (level instanceof Heap) {
                level.setContext(this);

                this.levels.push(level);
            }
            else
                throw new Error(
                    "The level for the context must be heap, or indexed by the heap"
                );
        } else {
            this.levels.push(new Heap(null, this));
        }
    }

    /**
     * Выходит из текущего контекста
     * @method
     * @public
     */
    popLevel() {
        this.levels.pop().removeContext();
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

        while (p >= 0 &&
            (
                b = this.levels[p--].get(val)
            ) == null)
            ;

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
    has(val, params = "tree") {
        switch (params) {
            case "tree":
                return this.get(val) !== null;
            case "up":
                return this.levels[this.levels.length - 1].has(val);
            case "root":
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
    set(val, data, params = "tree") {
        switch (params) {
            case "tree":
                let p = this.levels.length;

                while (--p >= 0) {
                    if (this.levels[p].get(val) != null) {
                        this.levels[p].set(val, data);

                        return;
                    }
                }

                this.levels[this.levels.length - 1].set(val, data);
                break;
            case "up":
                this.levels[this.levels.length - 1].set(val, data);
                break;
            case "down":
                this.levels[0].set(val, data);
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
            query_stack = Array.from(path),
            leng = query_stack.length,
            index = 1;

        for (; instance && index < leng; index++) {
            if (query_stack[index] instanceof ExpressionGroup)
                query_stack[index] = query_stack[index].result(this, out, throw_error);

            if (instance instanceof PoonyaObject) {
                parent = instance; instance = instance.get(query_stack[index]);
            } else if (instance instanceof iPoonyaPrototype) {
                parent = instance; instance = instance[GET](query_stack[index], this);
            } else {
                throw_error(position, new GetFieldOfNullException(query_stack[index]));
            }
        }

        if (type == null || instance instanceof type)
            if (return_full_info) {
                return {
                    instance,
                    parent,
                    index
                };
            } else {
                return instance;
            }
        else
            return null;
    }

    createObject(entries, position, path, throw_error, parents_three = new Array()) {
        for (let key in entries) {
            if (typeof entries[key] === 'object' && entries[key] != null && !parents_three.includes(entries[key])) {
                parents_three.push(entries[key]);

                entries[key] = this.createObject(entries[key], position, [Array.isArray(entries[key]) ? 'Array' : 'Object'], throw_error, Array.from(parents_three));
            }
        }

        return new (path[0] === 'Object' ? PoonyaObject : PoonyaArray)(this.getByPath(path, position, iPoonyaPrototype, throw_error), entries, this);
    }
}

module.exports.Context = Context;
module.exports.Heap = Heap;
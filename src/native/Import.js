const { readdirSync, readFileSync } = require("fs")
    , { join, normalize, resolve } = require("path")
    , { NAMESPACE, FIELDFLAGS, SERVICE } = require('../classes/static')
    , { NativeNull, NativeInteger, NativeNumber, NativeString, NativeBoolean } = require('../classes/common/Native')
    , PoonyaObject = require('../classes/data/PoonyaObject')
    , Exceptions = require('../classes/exceptions')
    , NativeFunction = require('../classes/excecution/NativeFunction')
    , PoonyaPrototype = require('../classes/data/PoonyaPrototype')

/**
 * Функция, которая возвращает библиотеку при импорте
 *
 * @memberof Poonya
 * @function Import
 *
 * @param {string[]} import_statements Массив с идентификаторами библиотек
 * @param {
 *      {
 *          log: Function,
 *          error: Function,
 *          warn: Function
 *      }
 * } logger Логгер, в случае ошибок ипорта
 *
 * @protected
 */
let Import = () => {};

/**
 * Функция, которая добавляет новую библиотеку
 *
 * @memberof Poonya
 * @function AddLibrary
 *
 * @param {String} lib_id Идентификатор библиотеки
 * @param {PoonyaStaticLibrary} lib_object Объект библиотеки
 * @param {Boolean} p_global Это глобальная библиотека?
 *
 * @protected
 */
let AddLibrary = () => {};

/**
 * Функция, которая добавляет новую библиотеку
 *
 * @memberof Poonya
 * @function ImportDir
 *
 * @param {String} lib_dir Путь к папке, библиотеки из которой будем ипортировать
 *
 * @protected
 */
let ImportDir = () => {};

/**
 * @lends PoonyaStaticLibrary
 * @class
 */
class PoonyaStaticLibrary {
    /**
     * Статическая библиотека, добавляется глобально.
     *
     * @param {Object} data
     * @memberof Poonya
     * @constructs PoonyaStaticLibrary
     * @public
     */
    constructor(id, global = false, override = false, namespace) {
        AddLibrary(id, this, override);

        this.namespace = namespace;
        this.global = global;

        this._fields = new Map();
    }

    /**
     * Добавляет поле для импорта из библиотеки
     *
     * @param {String} field название поля, которое устанавливаем
     * @param {Any} data данные, который нужно импортировать
     * @public
     * @method
     */
    addField(field, data) {
        this._fields.set(field, data);
    }

    /**
     * Расширяет прототип класса переданного как proto
     *
     * @param {PoonyaPrototype} proto название поля, которое устанавливаем
     * @public
     * @method
     */
    expandClass(proto) {
        if (proto instanceof PoonyaPrototype) {
            this._fields.set(proto.name, proto);
        } else {
            throw new Error(`Only PoonyaPrototype instance can be passed as a prototype.`);
        }
    }

    /**
     * Добавляет стороннюю библиотеку как поле этой бибилотеки
     *
     * @param {String} ident идентификатор ассимилируемой библиотеки
     * @public
     * @method
     */
    addLib(ident) {
        const lib = global[NAMESPACE][Symbol.for('Modules')][Symbol.for(ident)];

        if (lib != null) {
            this._fields.set(lib.namespace, lib);
        } else {
            throw new Error(`Can't find library with identifier ${ident}`);
        }
    }

    /**
     * Вызывается для преобразования библиотеки в модуль памяти, к которому в последствии можно будет получить доступ
     *
     * @param {Context|PoonyaObject} parent контекст выполнения
     * @public
     * @method
     */
    importTo(parent, context, throw_error) {
        for (let [key, value] of this._fields)
            switch (typeof value) {
                case "bigint":
                    if (isNaN(value))
                        parent.set(key, new NativeNull());

                    else
                        parent.set(key, new NativeInteger(value));
                    break;
                case "number":
                    if (isNaN(value))
                        parent.set(key, new NativeNull());

                    else
                        parent.set(key, new NativeNumber(value));
                    break;
                case "string":
                    parent.set(key, new NativeString(value));
                    break;
                case "symbol":
                    parent.set(key, new NativeString(Symbol.keyFor(value)));
                    break;
                case "function":
                    parent.set(key, new NativeFunction(value));
                    break;
                case "boolean":
                    parent.set(key, new NativeBoolean(value));
                    break;
                case "undefined":
                case "object":
                    if (value == null)
                        parent.set(new NativeNull());
                    else {
                        if (value instanceof PoonyaStaticLibrary) {
                            const target = new PoonyaObject(context.getByPath(SERVICE.CONSTRUCTORS.OBJECT, -1, PoonyaPrototype, throw_error), null, context);

                            value.importTo(target, context, throw_error);

                            parent.set(key, target);
                        } else if (value instanceof PoonyaPrototype)
                            parent.set(key, value);
                        else if (value instanceof Array)
                            parent.set(key, new PoonyaArray(context.getByPath(SERVICE.CONSTRUCTORS.ARRAY, -1, PoonyaPrototype, throw_error), value, null, context));

                        else
                            parent.set(key, new PoonyaObject(context.getByPath(SERVICE.CONSTRUCTORS.OBJECT, -1, PoonyaPrototype, throw_error), value, null, context));
                    }
                    break;
            }
    }
}

(() => {
    const modules = Symbol.for('Modules');

    if (global[NAMESPACE] == null) {
        global[NAMESPACE] = new Object();

        global[NAMESPACE][modules] = new Map();
    }

    AddLibrary = (lib_id, lib_object, override = false) => {
        if (override || global[NAMESPACE][modules][lib_id = Symbol.for(lib_id)] == null) {
            global[NAMESPACE][modules][lib_id] = lib_object;
        } else {
            throw new TypeError('Library, with this id already imported. For ' + lib_id.toString());
        }
    };

    Import = (import_statements, logger) => {
        if (!(import_statements instanceof Array))
            throw new TypeError("import_statements must be Array");

        const statements = new Array();

        for (let i = 0, leng = import_statements.length; i < leng; i++) {
            statements.push(global[NAMESPACE][modules][Symbol.for(import_statements[i])]);
        }

        return statements;
    };

    ImportDir = (parent_path, lib_dir) => {
        lib_dir = resolve(lib_dir) !== normalize(lib_dir) ? join(parent_path, lib_dir) : lib_dir;

        const default_libs = readdirSync(lib_dir);

        for (let i = 0, leng = default_libs.length; i < leng; i++) {
            (
                new Function(
                    'FIELDFLAGS',
                    "Exceptions",
                    'NativeLibrary',
                    'PoonyaPrototype',
                    `"use strict";${readFileSync(join(lib_dir, default_libs[i]), 'utf-8')}`
                )
            )(FIELDFLAGS, Exceptions, PoonyaStaticLibrary, PoonyaPrototype);
        };
    };
})();

module.exports.PoonyaStaticLibrary = PoonyaStaticLibrary;
module.exports.ImportDir = ImportDir;
module.exports.Import = Import;
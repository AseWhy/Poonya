/**
 * @file src/importer.js
 * @description Содержит в себе набор фнукций, которые необходимы для импорта нативных, написанных на js в нашем случае, библиотека в память poonya
 * @license MIT
 * @author Astecom
 */

const { readdirSync, readFileSync } = require('fs')
    , { join, normalize, resolve } = require('path')
    , { NAMESPACE, SERVICE } = require('./classes/static')
    ,   PoonyaObject = require('./classes/data/PoonyaObject')
    ,   NativeFunction = require('./classes/data/NativeFunction')
    ,   PoonyaPrototype = require('./classes/data/PoonyaPrototype');

/**
 * Функция, которая возвращает библиотеку при импорте
 *
 * @memberof Poonya.Import
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
 * @memberof Poonya.Import
 * @function AddLibrary
 *
 * @param {String} lib_id Идентификатор библиотеки
 * @param {PoonyaStaticLibrary} lib_object Объект библиотеки
 * @param {Boolean} override если true, то если такая бибилотека уже была ранее создана, она будет переопределена
 *
 * @protected
 */
let AddLibrary = () => {};

/**
 * Функция, которая добавляет новую библиотеку
 *
 * @memberof Poonya.Import
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
     * @memberof Poonya.Import
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
    expandPrototype(proto) {
        if (PoonyaPrototype.isPrototypeOf(proto)) {
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
     * @param {PoonyaObject|Heap} parent хип памяти, или объект в который нужно ипортировать библиотеку
     * @public
     * @method
     */
    importTo(parent, context, throw_error) {
        for (let [key, value] of this._fields){
            switch (typeof value) {
                case 'bigint':
                    if (isNaN(value))
                        parent.set(
                            context,
                            key,
                            context.createObject(null, -1, SERVICE.CONSTRUCTORS.NULL, throw_error)
                        );
                    else
                        parent.set(
                            context,
                            key,
                            context.createObject(
                                value,
                                -1,
                                SERVICE.CONSTRUCTORS.INTEGER,
                                throw_error
                            )
                        );
                    break;
                case 'number':
                    if (isNaN(value))
                        parent.set(
                            context,
                            key,
                            context.createObject(null, -1, SERVICE.CONSTRUCTORS.NULL, throw_error)
                        );
                    else
                        parent.set(
                            context,
                            key,
                            context.createObject(
                                value,
                                -1,
                                SERVICE.CONSTRUCTORS.NUMBER,
                                throw_error
                            )
                        );
                    break;
                case 'string':
                    parent.set(
                        context,
                        key,
                        context.createObject(value, -1, SERVICE.CONSTRUCTORS.STRING, throw_error)
                    );
                    break;
                case 'symbol':
                    parent.set(
                        context,
                        key,
                        context.createObject(
                            Symbol.keyFor(value),
                            -1,
                            SERVICE.CONSTRUCTORS.STRING,
                            throw_error
                        )
                    );
                    break;
                case 'function':
                    if (PoonyaPrototype.isPrototypeOf(value)) {
                        parent.set(context, (value = new value(context)).name, value);
                    } else {
                        parent.set(context, key, new NativeFunction(value));
                    }
                    break;
                case 'boolean':
                    parent.set(
                        context,
                        key,
                        context.createObject(value, -1, SERVICE.CONSTRUCTORS.BOOLEAN, throw_error)
                    );
                    break;
                case 'undefined':
                case 'object':
                    if (value == null)
                        parent.set(
                            context,
                            key,
                            context.createObject(null, -1, SERVICE.CONSTRUCTORS.NULL, throw_error)
                        );
                    else {
                        if (value instanceof PoonyaStaticLibrary) {
                            const target = new PoonyaObject(
                                context.getByPath(
                                    SERVICE.CONSTRUCTORS.OBJECT,
                                    -1,
                                    PoonyaPrototype,
                                    throw_error
                                ),
                                null
                            );

                            value.importTo(target, context, throw_error);

                            parent.set(context, key, target);
                        } else if (value instanceof Array) {
                            parent.set(
                                context,
                                key,
                                new PoonyaArray(
                                    context.getByPath(
                                        SERVICE.CONSTRUCTORS.ARRAY,
                                        -1,
                                        PoonyaPrototype,
                                        throw_error
                                    ),
                                    value,
                                    null,
                                    context
                                )
                            );
                        } else
                            parent.set(
                                context,
                                key,
                                new PoonyaObject(
                                    context.getByPath(
                                        SERVICE.CONSTRUCTORS.OBJECT,
                                        -1,
                                        PoonyaPrototype,
                                        throw_error
                                    ),
                                    value,
                                    null,
                                    context
                                )
                            );
                    }
                    break;
            }
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
        if (override || global[NAMESPACE][modules][(lib_id = Symbol.for(lib_id))] == null) {
            global[NAMESPACE][modules][lib_id] = lib_object;
        } else {
            throw new TypeError('Library, with this id already imported. For ' + lib_id.toString());
        }
    };

    Import = (import_statements, logger) => {
        if (!(import_statements instanceof Array))
            throw new TypeError('import_statements must be Array');

        const statements = new Array();

        for (let i = 0, leng = import_statements.length; i < leng; i++) {
            statements.push(global[NAMESPACE][modules][Symbol.for(import_statements[i])]);
        }

        return statements;
    };

    ImportDir = (parent_path, lib_dir) => {
        lib_dir = resolve(lib_dir) !== normalize(lib_dir) ? join(parent_path, lib_dir) : lib_dir;

        const default_libs = readdirSync(lib_dir);

        for (let i = 0, leng = default_libs.length, cur, path; i < leng; i++) {
            cur = new module.constructor();

            path = join(lib_dir, default_libs[i]);

            cur.paths = [__dirname + '\\data'];

            cur.loaded = true;

            cur.file = default_libs[i];

            cur._compile(`"use strict";${readFileSync(path, 'utf-8')};`, path);
        }
    };
})();

module.exports.PoonyaStaticLibrary = PoonyaStaticLibrary;
module.exports.ImportDir = ImportDir;
module.exports.Import = Import;

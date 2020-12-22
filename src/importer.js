/**
 * @file src/importer.js
 * @description Содержит в себе набор фнукций, которые необходимы для импорта нативных, написанных на js в нашем случае, библиотека в память poonya
 * @license MIT
 * @author Astecom
 */

const 
    // #!if platform === 'node'
    Module = require('module'),
    { readdirSync, readFile } = require('fs'),
    { join, normalize, resolve } = require('path'),
    // #!endif
    { NAMESPACE, SERVICE } = require('./classes/static'),
    { IOError } = require('./classes/exceptions'),
    PoonyaObject = require('./classes/data/PoonyaObject'),
    NativeFunction = require('./classes/data/NativeFunction'),
    PoonyaPrototype = require('./classes/data/PoonyaPrototype');

// Пространство модулей в глобальном контексте
const modules = Symbol.for('Modules');

if (global[NAMESPACE] == null) {
    global[NAMESPACE] = new Object();

    global[NAMESPACE][modules] = new Map();
}

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
let AddLibrary = (lib_id, lib_object, override = false) => {
    if (override || global[NAMESPACE][modules][(lib_id = Symbol.for(lib_id))] == null) {
        global[NAMESPACE][modules][lib_id] = lib_object;
    } else {
        throw new TypeError('Library, with this id already imported. For ' + lib_id.toString());
    }
};

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
let Import = (import_statements, logger) => {
    if (!(import_statements instanceof Array))
        throw new TypeError('import_statements must be Array');

    const statements = new Array();

    for (let i = 0, leng = import_statements.length; i < leng; i++) {
        statements.push(global[NAMESPACE][modules][Symbol.for(import_statements[i])]);
    }

    return statements;
};

/**
 * Функция импорта файла библиотеки
 *
 * @memberof Poonya.Import
 * @function ImportFile
 *
 * @param {String} lib_dir путь, по которому можно найти файл библиотеки
 * @param {String} file файл с бибилиотекой
 *
 * @protected
 */
let ImportFile = async (lib_dir, file) => {};

// #!if platform === 'node'
class PoonyaModule extends Module {
    constructor(id) {
        super(id);
    }

    require(id){
        if(id === 'poonya') {
            return require('./preset');
        } else {
            return super.require(id);
        }
    }
}

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
let ImportDir = async (parent_path, lib_dir) => {
    lib_dir = resolve(lib_dir) !== normalize(lib_dir) ? join(parent_path, lib_dir) : lib_dir;

    const default_libs = readdirSync(lib_dir);

    for (let i = 0, leng = default_libs.length; i < leng; i++) {
        await ImportFile(default_libs[i])
    }
};

ImportFile = async (origin, file) => {
    const cur = new PoonyaModule(file);

    const path = join(lib_dir, file);

    cur.paths = [];

    cur.loaded = true;

    cur.file = path;

    return new Promise((res, rej) => {
        readFile(path, 'utf-8', (err, data) => {
            if(err)
                throw new IOError(path);

            cur._compile(`"use strict";${data};`, path);

            res();
        })
    })
}
// Для node есть специальная функция для импорта каталога
module.exports.ImportDir = ImportDir;
// #!endif

// #!if platform === 'browser'
// ~ function crequire(id){
// ~     if(id === 'poonya') {
// ~         const exports = new Object();
// ~ 
// ~         exports.FIELDFLAGS = FIELDFLAGS;
// ~         exports.Exceptions = require('./classes/exceptions');
// ~         exports.PoonyaStaticLibrary = PoonyaStaticLibrary;
// ~         exports.PoonyaPrototype = PoonyaPrototype;
// ~ 
// ~         return exports;
// ~     } else {
// ~         throw new Error('Unknown module ' + id);
// ~     }
// ~ }
// ~ 
// ~ ImportFile = (lib_dir, file) => {
// ~     const path = lib_dir + '/' + file;
// ~ 
// ~     return new Promise(async (res, rej) => {
// ~         try {
// ~            let wait = await fetch(path, { method: "GET" });
// ~ 
// ~            wait = await wait.text();
// ~ 
// ~            res(new Function('require', `"use strict";${wait}`)(crequire));
// ~         } catch (e) {
// ~            rej(new IOError(path));
// ~         }
// ~     })
// ~ }
// #!endif

module.exports.Import = Import;
module.exports.ImportFile = ImportFile;
module.exports.PoonyaStaticLibrary = PoonyaStaticLibrary;
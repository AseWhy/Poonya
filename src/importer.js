/**
 * @file src/importer.js
 * @description Содержит в себе набор фнукций, которые необходимы для импорта нативных, написанных на js в нашем случае, библиотека в память poonya
 * @author Astecom
 */

"use strict";

const 
    // #!if platform === 'node'
    Module = require('module'),
    { readdirSync, readFile } = require('fs'),
    { join, normalize, resolve } = require('path'),
    // #!endif
    { NAMESPACE, SERVICE } = require('./classes/static'),
    { IOError } = require('./classes/exceptions'),
    NativeFunction = require('./classes/data/NativeFunction'),
    PoonyaPrototype = require('./classes/data/PoonyaPrototype');

// Пространство модулей в глобальном контексте
const modules = Symbol.for('Modules');

if (global[NAMESPACE] == null) {
    global[NAMESPACE] = new Object();
}

if(global[NAMESPACE][modules] == null) {
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
    constructor(id, l_global = false, override = false, namespace) {
        AddLibrary(id, this, override);

        this.namespace = namespace != null ? namespace : 'space-' + (global[NAMESPACE][modules].size).toString(16) + (l_global ? '-global' : '');
        this.global = Boolean(l_global);

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
        field = String(field);

        if(this._fields.has(field))
            throw new Error('The "' + field + '" field alredy exists');
        else
            this._fields.set(field, data);
    }

    /**
     * Расширяет прототип класса переданного как proto, или создает новый прототип объекта
     *
     * @param {PoonyaPrototype} proto название поля, которое устанавливаем
     * @public
     * @method
     */
    expandPrototype(proto) {
        if (Object.prototype.isPrototypeOf.call(PoonyaPrototype, proto)) {
            if(this._fields.has(proto.name)) {
                this._fields.get(proto.name).expand(proto);
            } else {
                this._fields.set(proto.name, proto);
            }
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
     * Ипорт происходит синхронно, поэтому нет нужды в фуекции `resolve`
     * 
     * [1] - Пояснение
     * createObject - фукнция, котрая создает объект из текущего прототипа, который должен быть был ранее зарегистрирован в памяти.
     * Асинхронность, а следовательно функция resolve, тут нужна только если путь к прототипу представляет из себя выражение, где могут быть асинхрнонные 
     * функции. Тут их нет, объекты создаются из общепринятых прототипов, поэтому callback вызывается невыходя из функции - синхрнно.
     *
     * @param {PoonyaObject|Heap} parent хип памяти, или родительский объект в который нужно ипортировать библиотеку
     * @param {iContext} context контект, в котором будет использоватся эта библиотека
     * @param {Function} reject функция, которая будет вызвана при ошибке. 
     * @public
     * @method
     */
    importTo(parent, context, reject) {
        for (let [key, value] of this._fields){
            switch (typeof value) {
                case 'bigint':
                    if (isNaN(value))
                        // [1]
                        context.createObject(null, -1, SERVICE.CONSTRUCTORS.NULL, reject, new Array(),  result => parent.set(
                            context,
                            key,
                            result
                        ));
                    else
                        // [1]
                        context.createObject(
                            value,
                            -1,
                            SERVICE.CONSTRUCTORS.INTEGER,
                            reject, new Array(), 
                            result => parent.set(
                                context,
                                key,
                                result
                            )
                        );
                    break;
                case 'number':
                    if (isNaN(value))
                        // [1]
                        context.createObject(null, -1, SERVICE.CONSTRUCTORS.NULL, reject, new Array(),  result => parent.set(
                            context,
                            key,
                            result
                        ));
                    else
                        // [1]
                        context.createObject(
                            value,
                            -1,
                            SERVICE.CONSTRUCTORS.NUMBER,
                            reject, new Array(), 
                            result => parent.set(
                                context,
                                key,
                                result
                            )
                        );
                    break;
                case 'string':
                    // [1]
                    context.createObject(value, -1, SERVICE.CONSTRUCTORS.STRING, reject, new Array(),  result => parent.set(
                        context,
                        key,
                        result
                    ));
                    break;
                case 'symbol':
                    // [1]
                    context.createObject(
                        Symbol.keyFor(value),
                        -1,
                        SERVICE.CONSTRUCTORS.STRING,
                        reject, new Array(), 
                        result => parent.set(
                            context,
                            key,
                            result
                        )
                    );
                    break;
                case 'function':
                    if (Object.prototype.isPrototypeOf.call(PoonyaPrototype, value)) {
                        parent.set(context, (value = new value(context)).name, value);
                    } else {
                        parent.set(context, key, new NativeFunction(value));
                    }
                    break;
                case 'boolean':
                    // [1]
                    context.createObject(value, -1, SERVICE.CONSTRUCTORS.BOOLEAN, reject, new Array(),  result => parent.set(
                        context,
                        key,
                        result
                    ));
                    break;
                case 'undefined':
                case 'object':
                    if (value == null)
                        // [1]
                        context.createObject(null, -1, SERVICE.CONSTRUCTORS.NULL, reject, new Array(),  result => parent.set(
                            context,
                            key,
                            result
                        ));
                    else {
                        if (value instanceof PoonyaStaticLibrary) {
                            // [1]
                            context.createObject(null, -1, SERVICE.CONSTRUCTORS.OBJECT, reject, new Array(),  target => {
                                value.importTo(target, context, reject);

                                parent.set(context, key, target);
                            });
                        } else if (value instanceof Array) {
                            // [1]
                            context.createObject(value, -1, SERVICE.CONSTRUCTORS.ARRAY, reject, new Array(),  result => parent.set(
                                context,
                                key,
                                result
                            ));
                        } else {
                            // [1]
                            context.createObject(value, -1, SERVICE.CONSTRUCTORS.OBJECT, reject, new Array(),  result => parent.set(
                                context,
                                key,
                                result
                            ));
                        }
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
 *
 * @protected
 */
let Import = (import_statements) => {
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
let ImportFile = async () => {};

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

    for (let i = 0, leng = default_libs.length; i < leng; i++)
        await ImportFile(lib_dir, default_libs[i]);
};

ImportFile = (lib_dir, file) => {
    const cur = new PoonyaModule(file);

    const path = join(lib_dir, file);

    cur.paths = [];

    cur.loaded = true;

    cur.file = path;

    return new Promise(res => {
        readFile(path, 'utf-8', (err, data) => {
            if(err)
                throw new IOError(path);
            
            cur._compile(`"use strict";${data};`, path);

            res();
        });
    });
};
// Для node есть специальная функция для импорта каталога
module.exports.ImportDir = ImportDir;
// #!endif

// #!if platform === 'browser'
/*~
function crequire(id){
    if(id === 'poonya') {
        return require('./preset');
    } else {
        throw new Error('Unknown module ' + id);
    }
}

ImportFile = (lib_dir, file) => {
    const path = lib_dir + '/' + file;

    return new Promise((res, rej) => {
        try {
            fetch(path, { method: "GET" })
                .then(responce => responce.text())
                .then(responce => res(new Function('require', `"use strict";${wait}`)(crequire)));
        } catch (e) {
            rej(new IOError(path));
        }
    })
}
*/
// #!endif

module.exports.Import = Import;
module.exports.ImportFile = ImportFile;
module.exports.PoonyaStaticLibrary = PoonyaStaticLibrary;
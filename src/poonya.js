/**
 * @author Astecom
 * @version 0.4.5
 * @see {@link https://github.com/AseWhy/Poonya|GitHub}
 * @license MIT
 * @namespace Poonya
 * @description A templating engine used to create templates and then render them
 * 
 * <pre style="background: whitesmoke;overflow: hidden;border-left: 0.25em dashed;padding: 1em"><code>                     + @ W
 *                   + @ @ @ W #                                                         ____________________________________________________
 *                 : @ @ @ @ @ @                                                        |                      POONYA                       |
 *                 # * * * * @ @ *                                                     |      IS A TEMPLATING ENGINE THAT I HOPE WILL      |
 *               @ * * * * * * # W                                                    |           HELP YOU WITH TEXT PROCESSING           |
 *               * * * # @ # * * W                                                   |---------------------------------------------------|
 *             # @ @ @ @ @ @ @ @ W                                                  |              ASTECOM TRIED FOR YOU )              |
 *             @ @ @ @ @ # # @ @ W                                                 |     ______________________________________________|
 *             @ @ * * * * * * * W                                                |   /
 *             @ * * * * * * * * #                                               |  /
 *             * * * * @ @ @ @ @ @                                              | /
 *             * * @ @ @ @ @ @ @ @ +                                           |/
 *             # @ @ @ @ @ # * * * @                                     + W +
 *             * @ @ @ * * * * @ @ @                                   W , , @ @
 *               @ # * * * @ @ @ @ @ *                               @ , , * @ @ @
 *               @ * * * @ @ @ # * * *                             * , , , # @ @ @ #
 *                 * * @ @ # * * * * @ W                           , . , , , @ @ @ @ +
 *                 * @ @ * * * * @ @ @ @ + + + +                 # , , , * , @ @ @ @ @
 *                   W # * * * @ @ @ @ # * * * * # W             * : , , # , @ @ @ @ @
 *                     # * * # @ @ W * * * * * * * * # +         . . , , @ , @ @ @ @ @
 *                         W @ @ W * * * * * * * * * * * *       + , * : . * * * * * * * * @             + + + +
 *                           + * * * * * * * * * * * * * * + + W W , # , * + + + + * , , * * * W   # @ @ @ @ @ : :
 *                           + * * * * * * * * * * * * * * W # , , , @ * + + + + + * , , * * * * W @ @ @ @ @ , , ,
 *                           @ * * * * * * * * * * * * * * * @ , , + * . : . . @ + + , , * * , , @ @ @ @ @ , , , , #
 *                           * * * * * * * * * * * * * * * * , , * + . . # @ + . @ + * * * : , , # @ @ @ , , , , , #
 *                         + * * * * * * * * * * * * * * * * * * . . : @ @ @ @ + # + * * * * , * * # @ . , @ , , , +
 *                         + * * * * * * * * * * * * * * * * # . . W @ @ @ @ , , . * * * * * + + + + W , # , , W ,
 *                           * * * * * * * * * * * * * * # # # @ @ @ W @ @ , , , @ . , : * + + + + + * * , , : , @
 *                           * * * * * * * * * * * * * * * * + . @ @ @ @ , , , , , , , , + W . . . W + * , * , ,
 *                           W * * * * * * * * * * * * * * * # . @ W @ : , + , , , , , , , , @ W + . * * * , , .
 *                             * * * * * * * * * * * * * * @ * . @ @ @ , , W * * * * * , , , @ @ @ + W : . , ,
 *                             * * * * * * * * * * * * * * * * W @ @ @ , , W * * * * * # , , @ @ @ . : W # #
 *                             W * * * * * * * * * * @ @ * * * * @ @ @ , , W + + + + * * @ , @ @ @ : . # , ,
 *                           + * # * * * * * * * * @ @ @ @ @ * * W @ @ , , W + + + + * * , , @ @ @ . . * , # @
 *                           # * W * * * * * * * * @ @ @ @ @ * * * @ @ , , W + + + + * , , , @ @ @ + # * * W
 *                           @ * W * * * * * * * * @ @ @ @ @ * * * * @ , , W + + + * , , , @ @ @ W . : *
 *                           W @ W @ * * * * * * * @ @ @ @ @ # * * * @ , , W + + W , , , . @ @ W . . @ #
 *                             @ W @ @ * * * * * # + @ W @ @ @ * * * * @ , # * . , , , , @ @ @ : W +   +
 *                             @ @ @ @ @ * * * * *         + @ * * * * * * W , , , , , @ @ @ *
 *                             + @ W @ @ @ @ @ @             + # * * * * # @ # * * @ @ @ @ W +
 *                               @ @ W @ @ @ @ @ +             + * * @ @ @ @ @ W @ @ @ @ @ @ @ @ W
 *                                 @ @ W @ @ @ @ +               + @ @ @ @ @ @ @ @ W W @ @ @ @ @ @ +
 *                                   W W @ @ @ @ W                 # @ @ @ @ @ @ @ @ @ W @ @ @ @ *
 *                                         @ @ @ @                     @ W @ @ @ @ W @
 *                                         + @ @ *                           + # +
 * </code></pre>
 * 
 * * * * * * * * * * * * * * * * * 
 *                               *
 *  If disagree - criticize      *
 *  Criticizing - suggest        *
 *  Suggesting - perform         *
 *  Performing - be responsible! *
 *                               *
 *  - S.P. Korolev               *
 *                               *
 * * * * * * * * * * * * * * * * *
 */

// #!if platform === 'node'
// This file is compiled specifically for the node runtime, if you need a browser version use poonya.browser.bundle.js
// #!else
// This file is compiled specifically for the browser, if you need a node.js version use poonya.node.bundle.js
// #!endif

"use strict";

// #!secret
console.warn('Attention! You use raw version of poonya! Please, use poonya.browser.bundle.js or poonya.node.bundle.js for correct work it.');

const 
    { EventEmitter } = require("events"),
    // #!if platform === 'node'
    { readFile } = require("fs"),
    { Stream } = require('stream'),
    { normalize, extname, join } = require("path"),
    // #!endif
    { IOError, PoonyaException } = require('./classes/exceptions'),
    { Import, ImportDir, ImportFile } = require("./importer.js"),
    { Context, Heap } = require("./classes/storage"),
    { parser, parseExpression, parserMP } = require("./parser.js"),
    { SERVICE } = require('./classes/static'),
    { toFixed, toBytes, fromBytes, setImmediate } = require('./utils'),
    { iPoonyaConstructsData, iCodeEmitter } = require("./classes/interfaces"),
    lexer = require("./lexer/lexer.js");

// Private fields
const RESULT = Symbol('RESULT')
    , INIT = Symbol('INIT');

/**
 * @lends PoonyaOutputStream
 * @class
 */
class PoonyaOutputStream extends EventEmitter {
    /**
     * Класс вывода шаблонов, за счет этого интерфейса производится
     *
     * @param {Object} data
     * @param {Context} context
     * 
     * @property {Context} data данные которые уже были выведены
     * 
     * @memberof Poonya
     * @constructs Heap
     * @public
     */
    constructor() {
        super();

        this._data = new Array();
        this._ended = false;
    }

    /**
     * Преобразует поток в ReadableStream или в Stream.Writable для nodejs
     * 
     * @returns {ReadableStream|Stream.Writable} поток чтения, если это браузер, или поток записи если это nodejs
     * @method
     * @public
     */
    toReadable(){
        const _ = this;

        // #!if platform === 'browser'
        /*~
        return new ReadableStream({
            start(controller){
                _.on('data', controller.enqueue.bind(controller));
                _.on('end', controller.close.bind(controller));
            }
        });
        */
        // #!endif

        // #!if platform === 'node'
        const stream = new Stream.Writable();

        _.on('data', stream.write.bind(stream));
        _.on('end', stream.end.bind(stream));

        return stream;
        // #!endif
    }

    /**
     * Перенаправляет поток данных в `stream` переданный первым аргументом
     * 
     * @param {PoonyaOutputStream|Stream} stream поток которому необходимо передавать данные помимо этого
     * @returns`stream` Поток который был передан.
     * @method
     * @public
     */
    pipe(stream){
        if(typeof stream.write === 'function'){
            this.on('data', stream.write.bind(stream));

            return stream;
        } else {
            throw new TypeError('Is not a WriteStream');
        }
    }

    /**
     * Выводит данные
     * 
     * @param {Any} data данные которые необходимо вывести
     * @method
     * @public
     */
    write(data){
        this._data.push(data);

        this.emit('data', data);
    }

    /**
     * Завершает поток, посылает событие, после готоро
     */
    end(){
        this._ended = true;

        this.emit('end');
    }

    /**
     * Ожидает завершения записи потока, после чего возвращает массив с буффером данных
     * 
     * @async
     * @public
     * @method
     * @returns {Array<Any>} массив с переданными данными
     */
    complete(){
        if(!this._ended)
            return new Promise(res => this.on('end', () => res(this._data)));
        else
            return this._data;
    }
}

/**
 * @lends CodeEmitter;
 */
class CodeEmitter extends iCodeEmitter {
    /**
     * Абстрактный класс который предназначен для подготовке всех наследуемых эмитттеров.
     *
     * @param {String | iInputData} input Входящая строка с выражением
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Poonya
     * @constructs CodeEmitter
     * @abstract
     * @protected
     */
    constructor(input, import_s = [], logger = console, onload) {
        super();

        const _ = this;

        const emitter = new EventEmitter();

        // Poonya events
        _.on = emitter.on;
        _.once = emitter.once;
        _.emit = emitter.emit;

        // Service data
        _.input = null;

        _.loaded = false;

        _.logger = logger;

        if (typeof input === "string") {
            _.input = input;

            _.charset = 'utf-8';

            // #!if platform === 'node'
            _.path = module.parent ? module.parent.filename : module.filename;
            // #!endif
            // #!if platform === 'browser'
            // ~ _.path = window.location.href;
            // #!endif
            
            if(SERVICE.LOADED) {
                _[INIT](import_s, logger);
                
                setImmediate(() => onload.call(_));
            } else {
                SERVICE.ACTIONS.on('load', () => {
                    _[INIT](import_s, logger);

                    onload.call(_);
                });
            }
        } else if (typeof input === "object") {
            _.charset = typeof input.charset === "string" ? input.charset : "utf-8";

            // #!if platform === 'node'
            _.path = normalize(
                typeof input.path === "string" ? 
                    ['', '.'].includes(extname(input.path)) ?
                        join((module.parent ? module.parent.path : module.path), input.path + '.po') :
                        join((module.parent ? module.parent.path : module.path), input.path) :
                    module.parent ?
                        module.parent.filename :
                        module.filename
            );
            // #!endif

            // Защищаю от выполнения браузерного кода в nodejs
            // #!if platform === 'browser'
            // ~ _.path = typeof input.path === 'string' ? input.path.split('/').pop().split('.').length > 0 ? input.path : input.path + '.po' : 'anonymous.po';
            // #!endif

            if (typeof input.raw === "string")
                _.input = input.raw;
            else if (typeof input.path === "string") {
                try {
                    // #!if platform === 'node'
                    readFile(
                        _.path,
                        _.charset,
                        (error, data) => {
                            if(error)
                                throw error;

                            _.input = data;

                            if(SERVICE.LOADED) {
                                _[INIT](import_s, logger);

                                onload.call(_);
                            } else {
                                SERVICE.ACTIONS.on('load', () => {
                                    _[INIT](import_s, logger);

                                    onload.call(_);
                                });
                            }
                        }
                    );
                    // #!endif

                    // #!if platform === 'browser'
                    // ~ fetch(input.path, { method: "GET" })
                    // ~   .catch(e => { throw e })
                    // ~   .then(e => e.text())
                    // ~       .then(e => {
                    // ~           _.input = e
                    // ~
                    // ~           if(SERVICE.LOADED) {
                    // ~                _[INIT](import_s, logger);
                    // ~
                    // ~                onload.call(_);
                    // ~           } else {
                    // ~                SERVICE.ACTIONS.on('load', () => {
                    // ~                    _[INIT](import_s, logger);
                    // ~
                    // ~                    onload.call(_);
                    // ~                });
                    // ~           }
                    // ~       })
                    // #!endif
                } catch (e) {
                    throw new IOError(input.path);
                }
            } else throw new Error("BAD_DATA_FORMAT");
        } else {
            throw new Error("BAD_DATA_FORMAT");
        }
    }

    /**
     * Выводит сообщение об ошибке, прекращает выполнения текущего шаблона.
     *
     * @param {Number} pos Позиция в которой произшла ошибка
     * @param {String} error Сообщение с ошибкой
     * @param {Number} rad_of Радиус печати, т.е. количество строк которое будет печатать в вывод по мимо строки на которой произошла ошибка
     * @method
     * @public
     */
    throwError(pos, error, rad_of = 5) {
        rad_of = parseInt(rad_of);

        let buffer = [],

            data = this.input.split(/$\n/gm),

            line_dump = fromBytes(
                    toBytes(this.input).slice(0, pos)
                )
                .split(/$\n/gm),

            line = line_dump.length - 1,

            line_start =
                line - parseInt(rad_of / 2) < 0
                    ? 0
                    : line - parseInt(rad_of / 2),

            line_end =
                line_start + rad_of < data.length
                    ? line_start + rad_of
                    : data.length,

            ll = line_end.toString(16).length + 2;

        buffer.push(
            "  at ",
            this.path,
            ':',
            line + 1,
            ":", line_dump[line].length,
        );

        if(pos != -1) {
            buffer.push(' :>\n');

            for (let i = line_start; i < line_end; i++) {
                buffer.push("     ", toFixed(i + 1, ll), " |> ", data[i]);

                if (i === line) {
                    buffer.push(
                        "\n     ".padEnd(ll + 6, ' '),
                        " |> ".padEnd(line_dump[line].length + 3, ' '),
                        "^",
                    );
                }

                if (i + 1 !== line_end) buffer.push("\n");
            }
        }
        
        if(error instanceof PoonyaException) {
            if(SERVICE.CONFIG.DEBUG)
                console.trace(error);

            error.message += '\n' + buffer.join('');

            throw error;
        } else
            throw new PoonyaException(error, buffer.join(''));
    }

    /**
     * Инициалзирует блок инструкций/
     *
     * @param {String|Heap} import_s названия нативных библиотек для импорта
     * @param {Console} logger интерфейс логгинга, Console like
     * 
     * @method
     * @private
     */
    [INIT](import_s, logger){
        this.libraries = Import(["default", ...import_s], logger);

        this.import = import_s;

        this.data = null;
    }

    /**
     * Выполняет заданную блоку последовательность инструкций
     *
     * @param {String|Heap} data данные преданые в исполнитель
     * @param {Function} error функция вывода ошибок, опциаонально
     * @param {PoonyaOutputStream} out поток вывода из poonya
     * 
     * @method
     * @private
     */
    [RESULT](data, error, out, c_clone){
        if (Array.isArray(data)) {
            this.data.result(new Context(this.libraries, error, ...data), out, error, () => out.end());
        } else if(data instanceof Context){
            if(c_clone) {
                const clone = data.clone();

                clone.import(this.libraries, error);

                this.data.result(clone, out, error, () => out.end());
            } else {
                this.data.result(data, out, error, () => out.end());
            }
        } else {
            this.data.result(new Context(this.libraries, error, data), out, error, () => out.end());
        }
    }

    /**
     * Возвращает результат выполенения блока
     *
     * @param {Object|Heap|Context} data данные преданые в исполнитель
     * @param {Function} error функция вывода ошибок, опциаонально
     * @param {Boolean} c_clone если в `data` передан контекст, то при true, он будет склонирован, при false будет использован переданный контекст.
     * 
     * @returns {Array<Any>} результат выполнения блока
     * @method
     * @public
     */
    result(data = new Heap(), error = this.throwError.bind(this), c_clone = false) {
        const out = new PoonyaOutputStream();

        // Если вхождения уже загружены, выполняем последовательность
        if(this.loaded) {
            setImmediate(() => this[RESULT](data, error, out, c_clone));
        } else {
            // Иначе, ждем окончания загрузки и выполняем последовательность
            this.on('load', () => this[RESULT](data, error, out, c_clone));
        }

        return out;
    }
}

/**
 * @lends MessagePattern;
 */
class MessagePattern extends CodeEmitter {
    /**
     * Шаблон сообщения, на вход нужно подавать код вида: <br> <br>
     * <code>
     *  Not formatted text... <br>
     *  Not formatted text... <br>
     *  <?prefix> { <br>
     *  &nbsp;&nbsp;&nbsp;&nbsp;// You code here <br>
     *  } <br>
     *  Not formatted text... <br>
     *  Not formatted text... <br>
     * </code> <br>
     * Т.е. код поадется туда в фигурных скобках, а все что не в них будет распознано как текст.
     *
     * @param {String | iInputData} input Входящая строка с выражением
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Poonya
     * @constructs MessagePattern
     * @protected
     */
    constructor(input, block_prefix = 'poonya', import_s, logger = console) {
        super(input, import_s, logger, async () => {
            try {
                this.data = await parserMP(lexer(toBytes(this.input)), block_prefix, this.throwError.bind(this), this.path);
            } catch (e) {
                this.emit('error', e);
            }

            this.loaded = true;

            this.emit('load');
        });
    }
}

/**
 * @lends ExecutionPattern;
 */
class ExecutionPattern extends CodeEmitter {
    /**
     * Шаблон кода, все что подается сюда, будет распознаваться как код шаблонизатора: <br> <br>
     * <code>
     *  set somevar = arrays.create(); <br>
     *  <br>
     *  somevar <- 'Hello '; <br>
     *  somevar <- 'World'; <br>
     *  <br>
     *  repeat(0; 2){ <br>
     *  &nbsp;&nbsp;&nbsp;&nbsp;> objects.get(somevar, current); <br>
     *  } <br> <br>
     *  // По завершению выполнения шаблона будет выведено Hello World
     * </code> <br> <br>
     *
     * @param {String | iInputData} input Входящая строка с выражением
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Poonya
     * @constructs ExecutionPattern
     * @protected
     */
    constructor(input, import_s, logger = console) {
        super(input, import_s, logger, async () => {
            try {
                this.data = await parser(lexer(toBytes(this.input), false), this.throwError.bind(this), this.path);
            } catch (e) {
                this.emit('error', e);
            }

            this.loaded = true;

            this.emit('load');
        });
    }
}

/**
 * @lends ExpressionPattern;
 */
class ExpressionPattern extends CodeEmitter {
    /**
     * Шаблон выражения, сюда можно подать на всход выражение, а на выходе получить результат выполнения этого выражения: <br> <br>
     * <code>
     *  2 + (3 * (5 * (2 * 2)) / 3)
     * </code> <br> <br>
     * Пример выше выведет 22
     *
     * @param {String} input Входящая строка с выражением
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Poonya
     * @constructs ExpressionPattern
     * @protected
     */
    constructor(input, import_s, logger = console) {
        super(input, import_s, logger, () => {
            try {
                this.data = parseExpression(0, lexer(toBytes(this.input), false), this.throwError.bind(this)).data;
            } catch (e) {
                this.emit('error', e);
            }
            
            this.loaded = true;

            this.emit('load');
        });
    }

    [RESULT](data, error, c_clone){
        return new Promise(res => {
            if (data instanceof Context) {
                if(c_clone) {
                    const context = data.clone();
        
                    context.import(this.libraries, error);
        
                    this.data.result(context, [], error, result => result.result(context, null, null, res));
                } else {
                    this.data.result(data, [], error, result => result.result(data, null, null, res));
                }
            } else {
                if (Array.isArray(data)) {
                    const context = new Context(this.libraries, error, ...data);

                    this.data.result(
                        context,
                        [],
                        error,
                        result => result.result(context, null, null, res)
                    );
                } else {
                    const context = new Context(this.libraries, error, ...data);

                    this.data.result(
                        context,
                        [],
                        error,
                        result => result.result(context, null, null, res)
                    );
                }
            }
        });
    }

    /**
     * Возвращает результат выполенения выражения
     *
     * @returns {Object} результат выполнения выражения
     * @override
     * @method
     * @public
     * @async
     */
    result(data = new Heap(), error = this.throwError.bind(this), c_clone = false) {
        const _ = this;

        return new Promise(res => {
            if(_.loaded)
                _[RESULT](data, error, c_clone).then(res);
            else
                _.on('load', () => _[RESULT](data, error, c_clone).then(res));
        });
    }
}

/**
 * Создает контекст выполнения, с полями `data`
 * 
 * @param {Object} data поля инициализации контекста, вы можете передать сюда объект с глобальными переменными доступными в контексте
 * @param  {...String|...Array<String>} libs список библиотек для импорта
 * @returns {Promise<Context>} контекст выполнения
 * @memberof Poonya
 * @async
 */
function createContext(data, ...libs) {
    if(typeof data != 'object' || data == null)
        throw new Error('Param "data" must be an object.');

    libs = libs
        // Если передан массив с массивами
        .flat(Infinity)
        // Фильтурем список библиотек целевых библиотек, если среди них есть не строки отбрасываем их.
        .filter(e => typeof e != 'string');

    return new Promise(res => {
        if(SERVICE.LOADED) {        
            res(new Context(
                Import(['default', ...libs]),
        
                CodeEmitter.prototype.throwError.bind({
                    input: '',
                    charset: 'utf-8',
                    path: 'untitled.po',
                    logger: console
                }),

                data
            ));
        } else {
            SERVICE.ACTIONS.on('load', () => {
                res(new Context(
                    Import(['default', ...libs]),
            
                    CodeEmitter.prototype.throwError.bind({
                        input: '',
                        charset: 'utf-8',
                        path: 'untitled.po',
                        logger: console
                    }),
    
                    data
                ));
            });
        }
    });
}

/**
 * Конструирует шаблон, возвращая обещаение с загрузкой этого шаблона
 * 
 * @param {CodeEmitter} Pattern шаблон для создания
 * @param  {...Any} args аргументы вызов конструктора
 * @returns {Promise<iPoonyaConstructsData>} ответ конструктора шаблона
 * @memberof Poonya
 * @async
 */
function createPattern(Pattern, ...args) {
    if(Object.prototype.isPrototypeOf.call(CodeEmitter, Pattern)){
        Pattern = new Pattern(...args);

        return new Promise((res, rej) => {
            Pattern.on('load', (...args) => 
                res(Object.assign(new iPoonyaConstructsData(), {
                    data: Pattern,
                    args
                }))
            );

            Pattern.on('error', (...args) => 
                rej(Object.assign(new iPoonyaConstructsData(), {
                    data: Pattern,
                    args
                }))
            );
        });
    } else {
        throw new Error('The "Pattern" must be a "CodeEmitter" heir');
    }
}

(async () => {
    // #!if platform === 'node'
    // Load native default libraries
    await ImportDir(__dirname, '../native.libs');
    // #!endif
    // #!if platform === 'browser'
    // ~ require('../native.libs/default');
    // ~ require('../native.libs/default.html');
    // #!endif
    SERVICE.ACTIONS.emit('load');
})();

// #!if platform === 'browser'
// POONYA POLYFILL
/*~
(() => {
    const load = new Event('poonya:load');

    function parseHTML(html) {
        var t = document.createElement('template');

        t.innerHTML = html;

        return t.content.cloneNode(true);
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const entries = document.querySelectorAll('script[type="text/poonya"], script[lang="text/poonya"]');

        for(let i = 0, leng = entries.length, name, handler, imports, block_load, block_error, pattern; i < leng; i++){
            name = entries[i].getAttribute('name') ?? 'block-' + i;
            handler = entries[i].getAttribute('handler') ?? 'exec';
            imports = (entries[i].getAttribute('import') ?? '').split('|');

            block_load = new Event('poonya:load:' + name);
            block_error = new Event('poonya:error:' + name);

            if(handler == 'exec')
                pattern = new ExecutionPattern(entries[i].innerHTML, imports);
            else if(handler == 'message')
                pattern = new MessagePattern(entries[i].innerHTML, imports);
            else
                throw new Error('Unknown pattern handler in block "' + name + '" type "' + handler + '"');
            
            await new Promise((res, rej) => {
                pattern.on('load', async () => {
                    entries[i].replaceWith(...(await (pattern.result()).complete()).map(e => parseHTML(e)));

                    window.dispatchEvent(block_load);

                    res();
                });

                pattern.on('error', e => {
                    window.dispatchEvent(block_error);

                    res();
                })
            });
        }

        window.dispatchEvent(load);
    });
})();
*/
// #!endif

module.exports.CodeEmitter = CodeEmitter;
module.exports.MessagePattern = MessagePattern;
module.exports.PoonyaOutputStream = PoonyaOutputStream;
module.exports.ExpressionPattern = ExpressionPattern;
module.exports.ExecutionPattern = ExecutionPattern;
module.exports.createPattern = createPattern;
module.exports.createContext = createContext;
module.exports.ImportFile = ImportFile.bind(null, module.parent != null ? module.parent.path : module.path);

// #!if platform === 'node'
module.exports.ImportDir = ImportDir.bind(null, module.parent != null ? module.parent.path : module.path);
// #!endif
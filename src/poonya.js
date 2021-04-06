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
    { extname, join } = require("path"),
    // #!endif
    { IOError, PoonyaException } = require('./classes/exceptions'),
    { Import, ImportDir, ImportFile } = require("./importer.js"),
    { Context, Heap } = require("./classes/storage"),
    { parser, parseExpression, parserMP } = require("./parser/parser.js"),
    { SERVICE } = require('./classes/static'),
    { toFixed, toBytes, fromBytes, setImmediate, throwError, createCustomErrorHandler } = require('./utils'),
    { iPoonyaConstructsData, iCodeEmitter } = require("./classes/interfaces"),
    PoonyaOutputStream = require("./classes/common/PoonyaOutputStream"),
    lexer = require("./lexer/lexer.js");

// Private fields
const RESULT = Symbol('RESULT')
    , INIT = Symbol('INIT');

/**
 * @lends CodeEmitter;
 */
class CodeEmitter extends iCodeEmitter {
    /**
     * Абстрактный класс который предназначен для подготовке всех наследуемых эмитттеров.
     * An abstract class that prepares all inherited emitters.
     *
     * @param {String | iInputData} input Входящая строка с выражением
     *                                    Input string with expression
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     *                                 Array with native import libraries
     * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *                         Logger, you need to take console as the interface, with the functions log, warn, error;
     * 
     * @property {ParserData} data данные, которые были подготовлены парсером для разбора
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
            if(typeof input.path === "string") {
                _.path = '';

                const is_relative = input.path[0] == '.';
                const has_ext = extname(input.path) != '';

                if(has_ext) {
                    if(is_relative) {
                        _.path += join((module.parent ? module.parent.path : module.path), input.path)
                    } else {
                        _.path += input.path;
                    }
                } else {
                    if(is_relative) {
                        _.path += join((module.parent ? module.parent.path : module.path), input.path + '.po')
                    } else {
                        _.path += input.path + '.po';
                    }
                }
            } else {
                _.path = module.parent ?
                            module.parent.filename :
                            module.filename;
            }
            // #!endif

            // Защищаю от выполнения браузерного кода в nodejs
            // Protecting against execution of browser code in nodejs
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
     * Инициалзирует блок инструкций
     * Initializes a block of instructions
     *
     * @param {String|Heap} import_s названия нативных библиотек для импорта
     *                               names of native libraries for import
     * 
     * @method
     * @private
     */
    [INIT](import_s){
        this.libraries = Import(["default", ...import_s]);

        this.import = import_s;

        this.data = null;
    }

    /**
     * Выполняет заданную блоку последовательность инструкций
     * Executes a sequence of instructions given to a block
     *
     * @param {String|Heap} data данные преданые в исполнитель
     *                           data committed to performer
     * @param {Function} error функция вывода ошибок, опциаонально
     *                         error output function, optional
     * @param {PoonyaOutputStream} out поток вывода из poonya
     *                                 output stream from poonya
     * 
     * @method
     * @private
     */
    [RESULT](data, error, out, c_clone){
        if (Array.isArray(data)) {
            this.data.sequense.result(new Context(this.libraries, error, ...data).setSource(this.path), out, error, () => out.end());
        } else if(data instanceof Context){
            if(c_clone) {
                const clone = data.clone();

                clone.import(this.libraries);

                this.data.sequense.result(clone, out, error, () => out.end());
            } else {
                this.data.sequense.result(data, out, error, () => out.end());
            }
        } else {
            this.data.sequense.result(new Context(this.libraries, error, data).setSource(this.path), out, error, () => out.end());
        }
    }

    /**
     * Returns the result of block execution
     * Возвращает результат выполенения блока
     *
     * @param {Object|Heap|Context} data данные преданые в исполнитель
     *                                   data committed to performer
     * @param {Function} error функция вывода ошибок, опциаонально
     *                         error output function, optional
     * @param {Boolean} c_clone если в `data` передан контекст, то при true, он будет склонирован, при false будет использован переданный контекст.
     *                          if a context is passed to `data`, then if true, it will be cloned, if false, the transferred context will be used.
     * 
     * @returns {Array<Any>} результат выполнения блока
     *                       block execution result
     * @method
     * @public
     */
    result(data = new Heap(), error = throwError.bind(this), c_clone = false) {
        const out = new PoonyaOutputStream(),
              m_error = createCustomErrorHandler(error, out);

        // Если вхождения уже загружены, выполняем последовательность
        // If the entries have already been loaded, execute the sequence
        if(this.loaded) {
            setImmediate(() => this[RESULT](data, m_error, out, c_clone));
        } else {
            // Иначе, ждем окончания загрузки и выполняем последовательность
            // Otherwise, wait for the download to finish and execute the sequence
            this.on('load', () => this[RESULT](data, m_error, out, c_clone));
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
                this.data = await parserMP(this.input, block_prefix, this.path);
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
                this.data = await parser(this.input, this.path);
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
                this.data = parseExpression(0, lexer(toBytes(this.input), false)).data;
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
        
                    this.data.sequense.result(context, [], error, result => result.result(context, null, null, res));
                } else {
                    this.data.sequense.result(data, [], error, result => result.result(data, null, null, res));
                }
            } else {
                if (Array.isArray(data)) {
                    const context = new Context(this.libraries, error, ...data).setSource(this.path);

                    this.data.sequense.result(
                        context,
                        [],
                        error,
                        result => result.result(context, null, null, res)
                    );
                } else {
                    const context = new Context(this.libraries, error, ...data).setSource(this.path);

                    this.data.sequense.result(
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
    result(data = new Heap(), error = throwError.bind(this), c_clone = false) {
        const _ = this;

        return new Promise(res => {
            if(_.loaded)
                _[RESULT](data, error, c_clone).then(res).catch(e => {throw e});
            else
                _.on('load', () => _[RESULT](data, error, c_clone).then(res)).catch(e => {throw e});
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
function createContext(data = new Object, ...libs) {
    if(typeof data != 'object' || data == null)
        throw new Error('Param "data" must be an object.');

    libs = libs
        // Если передан массив с массивами
        .flat(Infinity)
        // Фильтурем список библиотек целевых библиотек, если среди них есть не строки отбрасываем их.
        .filter(e => typeof e == 'string');

    return new Promise(res => {
        if(SERVICE.LOADED) {        
            res(new Context(
                Import(['default', ...libs]),
        
                throwError.bind({
                    input: '',
                    charset: 'utf-8',
                    path: 'untitled.po',
                    logger: console
                }),

                data
            ).setSource(module.parent.filename));
        } else {
            SERVICE.ACTIONS.on('load', () => {
                res(new Context(
                    Import(['default', ...libs]),
            
                    throwError.bind({
                        input: '',
                        charset: 'utf-8',
                        path: 'untitled.po',
                        logger: console
                    }),
    
                    data
                ).setSource(module.parent.filename));
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
                rej(...args)
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

const presset = require('./preset');

//
// Static library
//
module.exports.PoonyaPrototype = presset.PoonyaPrototype;
module.exports.PoonyaStaticLibrary = presset.PoonyaStaticLibrary;
module.exports.Exceptions = presset.Exceptions;
module.exports.FIELDFLAGS = presset.FIELDFLAGS;
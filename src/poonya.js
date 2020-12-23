/**
 * @author Astecom
 * @license MIT
 * @version 0.4.5
 * @see {@link https://github.com/AseWhy/Poonya|GitHub}
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
    { normalize, extname } = require("path"),
    // #!endif
    { PoonyaException } = require('./classes/exceptions'),
    { Import, ImportDir, ImportFile } = require("./importer.js"),
    { Context, Heap } = require("./classes/storage"),
    { parser, parseExpression, parserMP } = require("./parser.js"),
    { SERVICE } = require('./classes/static'),
    { toFixed, toBytes } = require('./utils'),
    lexer = require("./lexer/lexer.js");

const RESULT = Symbol('RESULT')
    , INIT = Symbol('Init');

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
     * Перенаправляет поток данных в `stream` переданный первым аргументом
     * 
     * @param {PoonyaOutputStream} stream поток которому необходимо передавать данные помимо этого
     * @returns PoonyaOutputStream Поток который был передан.
     * @method
     * @public
     */
    pipe(stream){
        if(typeof stream.write === 'function'){
            this.on('data', stream.write);

            return stream;
        } else {
            throw new TypeError('Is not a WriteStream')
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
class CodeEmitter extends EventEmitter {
    /**
     * Абстрактный класс который предназначен для подготовке всех наследуемых эмитттеров.
     *
     * @param {
     *  String | {
     *          raw: String,
     *          path: String,
     *          charset: String
     *      }
     * } input Входящая строка с выражением
     *
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     *
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

        _.input = null;

        _.loaded = false;

        _.logger = logger;

        if (typeof input === "string") {
            _.input = input;

            _.charset = 'utf-8';

            // #!if platform === 'node'
            _.path = module.parent ? module.parent.filename : module.filename
            // #!endif
            // #!if platform === 'browser'
            // ~ _.path = window.location.href
            // #!endif
            
            if(SERVICE.LOADED) {
                _[INIT](import_s, logger);

                // #!if platform === 'node'
                setImmediate(() => onload.call(_));
                // #!endif

                // #!if platform === 'browser'
                // ~ setTimeout(() => onload.call(_), 0);
                // #!endif
            } else {
                SERVICE.ACTIONS.on('load', () => {
                    _[INIT](import_s, logger);

                    onload.call(_)
                });
            }
        } else if (typeof input === "object") {
            _.charset = typeof input.charset === "string" ? input.charset : "utf-8";

            // #!if platform === 'node'
            _.path = normalize(
                typeof input.path === "string" ? 
                    ['', '.'].includes(extname(input.path)) ?
                        input.path + '.po' :
                        input.path :
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

                    // Защищаю от выполнения браузерного кода в nodejs
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
     * @param {String} message Сообщение с ошибкой
     * @param {Number} rad_of Радиус печати, т.е. количество строк которое будет печатать в вывод по мимо строки на которой произошла ошибка
     * @method
     * @public
     */
    throwError(pos, message, rad_of = 5) {
        rad_of = parseInt(rad_of);

        let buffer = [message instanceof PoonyaException ? message.message : message],

            data = this.input.split("\n"),

            line_dump = toBytes(this.input)
                .slice(0, pos)
                .map(e => String.fromCharCode(e))
                .join('')
                .split("\n"),

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
            ", at ",
            this.path,
            ", at ",
            line,
            ":", line_dump[line].length,
            " symbol",
        );

        if(pos != -1) {
            buffer.push(' :>\n');

            for (let i = line_start; i < line_end; i++) {
                buffer.push(" ", toFixed(i, ll), " |> ", data[i]);

                if (i === line) {
                    buffer.push(
                        "\n ",
                        new Array(ll + 1).join(" "),
                        " |> " + new Array(line_dump[line].length).join(" "),
                        "^",
                    );
                }

                if (i + 1 !== line_end) buffer.push("\n");
            }
        }
        
        throw new Error(message.message + '\n' + buffer.join(""));
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
    [RESULT](data, error, out){
        if (Array.isArray(data)) {
            for (let i = 0, leng = data.length; i < leng; i++)
                if (typeof data[i] === "object" && !(data[i] instanceof Heap)) {
                    data[i] = new Heap(data[i]);
                }

            if (data.find((e) => !(e instanceof Heap)) == null) {
                this.data.result(new Context(this.libraries, error, ...data), out, error);

                out.end();
            } else {
                throw new TypeError("Data must have a Heap type");
            }
        } else {
            if (typeof data === "object" && !(data instanceof Heap)) {
                data = new Heap(data);
            }

            if (data instanceof Heap) {
                this.data.result(new Context(this.libraries, error, data), out, error);

                out.end();
            } else {
                throw new TypeError("Data must have a Heap type");
            }
        }
    }

    /**
     * Возвращает результат выполенения блока
     *
     * @param {String|Heap} data данные преданые в исполнитель
     * @param {Function} error функция вывода ошибок, опциаонально
     * 
     * @returns {Array<Any>} результат выполнения блока
     * @method
     * @public
     */
    result(data = new Heap(), error = this.throwError.bind(this)) {
        const out = new PoonyaOutputStream();

        // Если вхождения уже загружены, выполняем последовательность
        if(this.loaded) {
            // #!if platform === 'node'
            setImmediate(() => this[RESULT](data, error, out));
            // #!endif

            // #!if platform === 'browser'
            // ~ setTimeout(() => this[RESULT](data, error, out), 0);
            // #!endif
        } else
            // Иначе, ждем окончания загрузки и выполняем последовательность
            this.on('load', () => this[RESULT](data, error, out));

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
     * @param {
     *      String | {
     *          raw: String,
     *          path: String,
     *          charset: String
     *      }
     * } input Входящая строка с выражением
     *
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     *
     * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Poonya
     * @constructs MessagePattern
     * @protected
     */
    constructor(input, block_prefix = 'poonya', import_s, logger = console) {
        super(input, import_s, logger, async () => {
            this.data = await parserMP(lexer(toBytes(this.input)), block_prefix, this.throwError.bind(this), this.path);

            this.loaded = true;

            this.emit('load');
        });
    }
}

/**
 * @lends ExcecutionPattern;
 */
class ExcecutionPattern extends CodeEmitter {
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
     * @param {
     *      String | {
     *          raw: String,
     *          path: String,
     *          charset: String
     *      }
     * } input Входящая строка с выражением
     *
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     *
     * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Poonya
     * @constructs ExcecutionPattern
     * @protected
     */
    constructor(input, import_s, logger = console) {
        super(input, import_s, logger, async () => {
            this.data = await parser(lexer(toBytes(this.input), false), this.throwError.bind(this), this.path);

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
     *
     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
     *
     * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Poonya
     * @constructs ExpressionPattern
     * @protected
     */
    constructor(input, import_s, logger = console) {
        super(input, import_s, logger, () => {
            this.data = parseExpression(0, lexer(toBytes(this.input), false), this.throwError.bind(this)).data;
            
            this.loaded = true;

            this.emit('load');
        });
    }

    [RESULT](data, error){
        if (!(data instanceof Context)) {
            if (Array.isArray(data)) {
                for (let i = 0, leng = data.length; i < leng; i++)
                    if (
                        typeof data[i] === "object" &&
                        !(data[i] instanceof Heap)
                    ) {
                        data[i] = new Heap(data[i]);
                    }

                if (data.find((e) => !(e instanceof Heap)) == null) {
                    return this.data.result(
                        new Context(this.libraries, error, ...data),
                        [],
                        error,
                    );
                } else {
                    throw new TypeError("Data must have a Heap type");
                }
            } else {
                if (typeof data === "object" && !(data instanceof Heap)) {
                    data = new Heap(data);
                }

                if (data instanceof Heap) {
                    return this.data.result(
                        new Context(this.libraries, error, data),
                        [],
                        error,
                    );
                } else {
                    throw new TypeError("Data must have a Heap type");
                }
            }
        } else {
            return this.data.result(data, [], error);
        }
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
    result(data = new Heap(), error = this.throwError.bind(this)) {
        const _ = this;

        return new Promise((res, rej) => {
            if(_.loaded)
                res(_[RESULT](data, error));
            else
                _.on('load', () => res(_[RESULT](data, error)));
        });
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


module.exports.CodeEmitter = CodeEmitter;
module.exports.MessagePattern = MessagePattern;
module.exports.ExpressionPattern = ExpressionPattern;
module.exports.ExcecutionPattern = ExcecutionPattern;
module.exports.ImportFile = ImportFile.bind(null, module.parent != null ? module.parent.path : module.path);

// #!if platform === 'node'
module.exports.ImportDir = ImportDir.bind(null, module.parent != null ? module.parent.path : module.path);
// #!endif

// #!if platform === 'browser'
// ~ const load = new Event('poonya:load');
// ~
// ~ function parseHTML(html) {
// ~     var t = document.createElement('template');
// ~ 
// ~     t.innerHTML = html;
// ~ 
// ~     return t.content.cloneNode(true);
// ~ }
// ~ 
// ~ document.addEventListener('DOMContentLoaded', async () => {
// ~     const entries = document.querySelectorAll('script[type="text/poonya"], script[lang="text/poonya"]');
// ~ 
// ~     for(let i = 0, leng = entries.length; i < leng; i++){
// ~         const pattern = new ExcecutionPattern(entries[i].innerHTML, ['default.html']);
// ~         
// ~         await new Promise((res, rej) => {
// ~            pattern.on('load', async () => {
// ~                entries[i].replaceWith(...(await (pattern.result()).complete()).map(e => parseHTML(e)));
// ~
// ~                res();
// ~            })
// ~         })
// ~
// ~         window.dispatchEvent(load);
// ~     }
// ~ });
// #!endif
/**
 * @author Astecom
 * @license MIT
 * @namespace Poonya
 * @version 0.4.5
 * @see {@link https://github.com/AseWhy/Poonya|GitHub}
 * 
 * @todo Сделать литерал класса
 * @todo Сделать литерал функции
 * @todo что-то сделать с контекстом в этом случае
 * 
 * @description Шаблонизатор, используется для создания шаблонов, и их последующего вывода
 * 
 * <pre><code style='font-family: monospace'>
 *                      + @ W
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
 * ==========================================================================================================================================
 * </code></pre>
 */

"use strict";

const { EventEmitter } = require("events")
    , { readFileSync } = require("fs")
    , { normalize, extname } = require("path")
    , { PoonyaStaticLibrary, Import, ImportDir } = require("./src/native/Import")
    , { Context, Heap } = require("./src/classes/storage")
    , { parser, parseExpression } = require("./src/parser")
    , { CHARTYPE } = require('./src/classes/static')
    , { UnexpectedTokenException, PoonyaException } = require('./src/classes/exceptions')
    , { NativeString } = require('./src/classes/common/Native')
    , { maybeEquals } = require('./src/utils')
    , OutOperator = require("./src/classes/excecution/OutOperator")
    , lexer = require("./src/lexer");

/**
 * Форматирует число подгоняя его под общую длинну
 *
 * @param {Number} d Чило для формата
 * @param {Number} l Желаемая длинна
 * @memberof Poonya
 * @function toFixed
 * @protected
 * @static
 */
function toFixed(d, l) {
    return "0x" + d.toString(16).padStart(l - 2, "0");
}

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

    pipe(stream){
        if(typeof stream.write === 'function'){
            this.on('data', stream.write);

            return stream;
        } else {
            throw new TypeError('Is not a WriteStream')
        }
    }

    write(data){
        this._data.push(data);

        this.emit('data', data);
    }

    end(){
        this._ended = true;

        this.emit('end');
    }

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
class CodeEmitter {
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
     * @param {
     *      {
     *          log: Function,
     *          warn: Function,
     *          error: Function
     *      }
     *  } logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Poonya
     * @constructs CodeEmitter
     * @abstract
     * @protected
     */
    constructor(input, import_s = [], logger = console) {
        if (typeof input === "string") 
            this.input = input;
        else if (typeof input === "object") {
            this.charset = typeof input.charset === "string" ? input.charset : "utf-8";

            this.path = normalize(
                typeof input.path === "string" ? 
                    ['', '.'].includes(extname(input.path)) ?
                        input.path + '.po' :
                        input.path :
                    module.parent ?
                        module.parent.filename :
                        module.filename
            );

            if (typeof input.raw === "string")
                this.input = input.raw;
            else if (typeof input.path === "string") {
                this.input = readFileSync(
                    this.path,
                    this.charset
                );
            } else throw new Error("BAD_DATA_FORMAT");
        } else {
            throw new Error("BAD_DATA_FORMAT");
        }

        this.logger = logger;

        this.import = import_s;

        this.libraries = Import(["default.lib", ...import_s], logger);

        if (typeof this.input !== "string")
            throw new TypeError("The `input` parameter must have a string type. But now `input` have a `" + typeof this.input + "` type.",);
    }

    /**
     * Устанавливает новый хип памяти как текущий
     *
     * @param {Heap} heap Хип памяти который нужно установить.
     * @method
     * @public
     */
    setHeap(heap) {
        if (heap instanceof Heap)
            this.heap = heap;
        else 
            throw new TypeError();
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
            line_dump = Buffer.from(this.input)
                .subarray(0, pos)
                .toString("utf8")
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

        if(pos != 0) {
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

        if (message instanceof PoonyaException) 
            throw message;
        else
            throw new PoonyaException(buffer.join(""));
    }

    /**
     * Интерфейс выводу результат выполнения блока
     *
     * @param {Heap|Object} data Входные данные
     * @abstract
     * @method
     * @public
     */
    result(data = new Heap()) {
        // Do something
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
     * @param {
     *      {
     *          log: Function,
     *          warn: Function,
     *          error: Function
     *      }
     *  } logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Poonya
     * @constructs MessagePattern
     * @protected
     */
    constructor(input, block_prefix = 'poonya', import_s, logger = console) {
        super(input, import_s, logger);

        this.data = new Array();

        const entries = lexer(Buffer.from(this.input)),
            buffer = new Array();

        let hook_index = 0;

        for (let i = 0; true; i++) {
            if(entries[i] == null)
                break;

            if (
                (
                    block_prefix == null &&
                    entries[i].equals(CHARTYPE.OPERATOR, "{") ||
                    entries[i].contentEquals(block_prefix.toString()) &&
                    (
                        entries[i + 1].equals(CHARTYPE.OPERATOR, "{") ||
                        entries[i + 1].equals(CHARTYPE.SPACE) &&
                        entries[i + 2].equals(CHARTYPE.OPERATOR, "{")
                    )
                ) &&
                hook_index === 0
            ) {
                if(block_prefix != null)
                    i += entries[i + 1].equals(CHARTYPE.SPACE) ? 2 : 1;

                if (buffer.length > 0) {
                    this.data.push(
                        new OutOperator(
                            new NativeString(buffer.join("")),
                        ),
                    );

                    buffer.splice(0, buffer.length);
                }

                hook_index++;

                continue;
            } else if (
                entries[i].equals(CHARTYPE.OPERATOR, "}") &&
                hook_index === 1
            ) {
                this.data.push(
                    parser(
                        buffer.filter((e) => e.type !== CHARTYPE.SPACE),
                        this.throwError.bind(this),
                        this.path,
                    ),
                );

                buffer.splice(0, buffer.length);

                hook_index--;

                continue;
            } else {
                if(hook_index >= 1)
                    switch (true) {
                        case entries[i].equals(CHARTYPE.OPERATOR, "{"):
                            hook_index++;
                            break;
                        case entries[i].equals(CHARTYPE.OPERATOR, "}"):
                            hook_index--;
                            break;
                    }
            }

            if (!hook_index === 0) 
                buffer.push(entries[i].toString());
            else 
                buffer.push(entries[i]);
        }

        if (buffer.length !== 0)
            if (hook_index === 1) {
                this.data.push(
                    parser(
                        buffer.filter((e) => e.type !== CHARTYPE.SPACE),
                        this.throwError.bind(this),
                        this.path,
                    ),
                );

                buffer.splice(0, buffer.length);
            } else if (hook_index === 0) {
                this.data.push(
                    new OutOperator(
                        new NativeString(buffer.join("")),
                    ),
                );

                buffer.splice(0, buffer.length);
            } else {
                this.throwError(
                    entries[entries.length - 1].position,
                    new UnexpectedTokenException(
                        entries[entries.length - 1],
                        "}",
                    ),
                );
            }
    }

    /**
     * Возвращает результат выполенения блока
     *
     * @returns {Array<Any>} результат выполнения блока
     * @method
     * @public
     */
    result(data = new Heap(), error = this.throwError.bind(this)) {
        const out = new PoonyaOutputStream(), _ = this;

        setImmediate(() => {
            if (Array.isArray(data)) {
                for (let i = 0, leng = data.length; i < leng; i++)
                    if (typeof data[i] === "object" && !(data[i] instanceof Heap)) {
                        data[i] = new Heap(data[i]);
                    }
    
                if (data.find((e) => !(e instanceof Heap)) == null) {
                    const context = new Context(_.libraries, error, ...data[i]);
    
                    for (let i = 0, leng = _.data.length; i < leng; i++)
                        _.data[i].result(context, out, error);

                    out.end();
                } else {
                    throw new TypeError("Data must have a Heap type");
                }
            } else {
                if (typeof data === "object" && !(data instanceof Heap)) {
                    data = new Heap(data);
                }
    
                if (data instanceof Heap) {
                    const context = new Context(_.libraries, error, ...data);
    
                    for (let i = 0, leng = _.data.length; i < leng; i++)
                        _.data[i].result(context, out, error);

                    out.end();
                } else {
                    throw new TypeError("Data must have a Heap type");
                }
            }
        });

        return out;
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
     * @param {
     *      {
     *          log: Function,
     *          warn: Function,
     *          error: Function
     *      }
     *  } logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Poonya
     * @constructs ExcecutionPattern
     * @protected
     */
    constructor(input, import_s, logger = console) {
        super(input, import_s, logger);

        this.data = parser(
            lexer(Buffer.from(this.input), false),
            this.throwError.bind(this),
            this.path,
        );
    }

    /**
     * Возвращает результат выполенения блока
     *
     * @returns {Array<Any>} результат выполнения блока
     * @method
     * @public
     */
    result(data = new Heap(), error = this.throwError.bind(this)) {
        const out = new PoonyaOutputStream(), _ = this;

        setImmediate(() => {
            if (Array.isArray(data)) {
                for (let i = 0, leng = data.length; i < leng; i++)
                    if (typeof data[i] === "object" && !(data[i] instanceof Heap)) {
                        data[i] = new Heap(data[i]);
                    }
    
                if (data.find((e) => !(e instanceof Heap)) == null) {
                    _.data.result(new Context(_.libraries, error, ...data), out, error);

                    out.end();
                } else {
                    throw new TypeError("Data must have a Heap type");
                }
            } else {
                if (typeof data === "object" && !(data instanceof Heap)) {
                    data = new Heap(data);
                }
    
                if (data instanceof Heap) {
                    _.data.result(new Context(_.libraries, error, ...data), out, error);

                    out.end();
                } else {
                    throw new TypeError("Data must have a Heap type");
                }
            }
        })

        return out;
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
     * @param {
     *      {
     *          log: Function,
     *          warn: Function,
     *          error: Function
     *      }
     *  } logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
     *
     * @memberof Poonya
     * @constructs ExpressionPattern
     * @protected
     */
    constructor(input, import_s, logger = console) {
        super(input, import_s, logger);

        this.data = parseExpression(
            0,
            lexer(Buffer.from(this.input), false),
            this.throwError.bind(this),
        ).data;
    }

    /**
     * Возвращает результат выполенения выражения
     *
     * @returns {Object} результат выполнения выражения
     * @method
     * @public
     */
    result(data = new Heap(), error = this.throwError.bind(this)) {
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
                        new Context(this.libraries, error, ...data),
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
}

// Load native default libraries
{
    ImportDir(__dirname, '/native.libs');
}

module.exports.CodeEmitter = CodeEmitter;
module.exports.MessagePattern = MessagePattern;
module.exports.ExpressionPattern = ExpressionPattern;
module.exports.ExcecutionPattern = ExcecutionPattern;
module.exports.NativeLibrary = PoonyaStaticLibrary;
module.exports.ImportDir = ImportDir.bind(null, module.parent != null ? module.parent.path : module.path);
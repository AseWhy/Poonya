/**
 * @file src/utils.js
 * @description Содержит в себе набор утилит, которые нужны много где, и их нельзя отнести к какой-либо конкретной группе
 * @author Astecom
 */

"use strict";

const {
        SERVICE
    } = require('./classes/static'), {
        Operand
    } = require('./classes/common/ParserData'), {
        iPoonyaObject,
        iPoonyaPrototype,
        iCodeEmitter
    } = require('./classes/interfaces'),
    {   
        PoonyaException
    } = require("./classes/exceptions"),
    // #!if platform === 'node'
    {
        nextTick
    } = require('process'),
    // #!endif
        NativeFunction = require('./classes/data/NativeFunction');

/**
 * Фукция которая преобразует нативное значение в значение Poonya
 *
 * @memberof Poonya.Utils
 * @function Cast
 *
 * @param {Any} data Данные которые необходимо преобразовать
 * @param {iContext} context Контекст
 * @param {Array<Any>} parents_three дерево родителей объекта
 * @param {Function} resolve функция для вывод результата
 *
 * @protected
 */
function Cast(data, context, parents_three = new Array(), resolve) {
    ///
    /// При кастинге значения, значение data (js примитив) преобразовывается в значение poonya
    /// Никаких ассинхрнных операций тут нет, поэтому можно возвращать результат, как результат
    /// Кастинга примитива js
    ///
    switch (typeof data) {
        case 'bigint':
            context.createObject(data, -1, SERVICE.CONSTRUCTORS.INTEGER, null, parents_three, resolve);
        break;
        case 'number':
            context.createObject(data, -1, SERVICE.CONSTRUCTORS.NUMBER, null, parents_three, resolve);
        break;
        case 'string':
            context.createObject(data, -1, SERVICE.CONSTRUCTORS.STRING, null, parents_three, resolve);
        break;
        case 'symbol':
            context.createObject(Symbol.keyFor(data), -1, SERVICE.CONSTRUCTORS.STRING, null, parents_three, resolve);
        break;
        case 'boolean':
            context.createObject(data, -1, SERVICE.CONSTRUCTORS.BOOLEAN, null, parents_three, resolve);
        break;
        case 'undefined':
            context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null, parents_three, resolve);
        break;
        case 'object':
            switch (true) {
                case data === null:
                    context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null, parents_three, resolve);
                break;
                case data instanceof iPoonyaObject:
                case data instanceof iPoonyaPrototype:
                case data instanceof NativeFunction:
                case data instanceof Operand:
                    resolve(data);
                break;
                case data instanceof iCodeEmitter:
                    context.createObject(data, -1, SERVICE.CONSTRUCTORS.PATTERN, null, parents_three, resolve);
                break;
                default:
                    parents_three.push(data);

                    if (Array.isArray(data))
                        context.createObject(data, -1, SERVICE.CONSTRUCTORS.ARRAY, null, parents_three, resolve);
                    else
                        context.createObject(data, -1, SERVICE.CONSTRUCTORS.OBJECT, null, parents_three, resolve);
                break;
            }
        break;
        case 'function':
            resolve(new NativeFunction(data));
        break;
    }
}

/**
 * Создает кастомный обработчик ошибок, для вывода их в поток вывода
 * 
 * @param {throwError} error функция выброса исключений
 * @param {PoonyaOutputStream} out поток вывода
 * @returns кастомный обработчик ошибок
 */
 function createCustomErrorHandler(error, out) {
    return (position, content) => {
        try {
            error(position, content);
        } catch(e) {
            out.error(e);
        }
    }
}

/**
 * !! Необходимо привести контекст
 * 
 * Выводит сообщение об ошибке, прекращает выполнения текущего шаблона.
 * Displays an error message, terminates the execution of the current template.
 *
 * @param {Number} pos Позиция в которой произшла ошибка
 *                     The position at which the error occurred
 * 
 * @param {String} error Сообщение с ошибкой
 *                       Error message
 * 
 * @param {Number} rad_of Радиус печати, т.е. количество строк которое будет печатать в вывод по мимо строки на которой произошла ошибка
 *                        The radius of the seal, i.e. the number of lines that will print to the output next to the line on which the error occurred
 * @method
 * @public
 */
 function throwError(pos, error, rad_of = 5) {
    rad_of = parseInt(rad_of);

    const linked = this != null && this.data != null ? this.data.linker_data.getOwnChunck(pos) : null;

    const input = linked != null ? linked.toString() : this != null ? this.input : null;
    const path = linked != null ? linked.name : this != null ? this.path : null;
    const buffer = new Array();

    if(input) {
        let data = input.split(/$\n/gm),

            line_dump = fromBytes(
                    toBytes(input).slice(0, pos - (linked != null ? linked.from : 0))
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

        if(pos != -1) {
            buffer.push(
                "  at ",
                path,
                ':',
                line + 1,
                ":", line_dump[line].length,
                ' :>\n'
            );

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
    }

    if(error != null && !error.throwed) {
        if(error instanceof PoonyaException) {
            if(buffer.length != 0) {
                error.message += '\n' + buffer.join('');
            }

            error.throwed = true;

            throw error;
        } else
            throw new PoonyaException(error, buffer.join(''), true);
    }
}

/**
 * Иногда некоторые выражения записываются неоднозначно, допустим <br> <br>
 *
 * if (<b> < exp > </b>) {} <br>
 * <br>
 * Или <br>
 * <br>
 * if (<b> < exp > </b>) { <br>
 *  <br>
 * } <br>
 * <br>
 * Или <br>
 * <br>
 * if (<b> < exp > </b>) <br>
 * { <br>
 *  <br>
 * } <br>
 * <br>
 * И это все будет if, эта функцию убирает возможные 'линие символы'
 *
 * @param {Array<Token>} entries Выхождение, на вход
 * @param {Number} index Проверяемый индекс
 * @param {String} equalts_t Тип с которым сравниваем
 * @param {String|Array<String>} equalts_v Значение(я) с которым(и) сравниваем
 *
 * @memberof Poonya.Utils
 * @private
 */
function maybeEquals(entries, index, equalts_t, equalts_v) {
    while (entries[index] != null && entries[index].equals(equalts_t, equalts_v))
        entries.splice(index, 1);

    return true;
}

/**
 * Подсчитывает количиство неприрывных одинаковых вхождений
 *
 * @param {Array<Token>} entries вхождения для парсинга
 * @param {Number} start начальная позиция парсинга
 * @param {String} equalts_t Тип с которым сравниваем
 * @param {String|Array<String>} equalts_v Значение(я) с которым(и) сравниваем
 *
 * @memberof Poonya.Utils
 * @private
 */
function countKeys(entries, start, equalts_t, equalts_v) {
    for (let i = start, to = entries.length; i < to; i++)
        if (entries[i] == null || !entries[i].equals(equalts_t, equalts_v)) return i - start;
}

/**
 * Форматирует число подгоняя его под общую длинну
 *
 * @param {Number} d Чило для формата
 * @param {Number} l Желаемая длинна
 * @memberof Poonya.Utils
 * @function toFixed
 * @protected
 * @static
 */
function toFixed(d, l) {
    return '0x' + d.toString(16).padStart(l - 2, '0');
}

/**
 * Преобразует строку в массив байтов
 *
 * @function toBytes
 * @param {String} input Строка для преобразования
 * @memberof Poonya.Utils
 * @returns {Array<Number>} массив с байтами
 * @protected
 * @static
 */
function toBytes(input) {
    let bytes = new Array();

    for(let i = 0, char, leng = input.length; i < leng; i++)
        bytes.push((char = input.charCodeAt(i)) >>> 8, char & 0xFF);

    return bytes;
}

/**
 * Преобразует массив байтов в строку
 *
 * @function toBytes
 * @param {Array<Number>} input байты для преобразования
 * @memberof Poonya.Utils
 * @returns {String} преобразованная строка
 * @protected
 * @static
 */
function fromBytes(input) {
    let string = '';

    for(let i = 0, leng = input.length; i < leng; i += 2)
        string += String.fromCharCode((input[i] << 8) | input[i + 1]);
    
    return string;
}

// #!if platform === 'node'
const setImmediate = global.setImmediate;
// #!endif
// #!if platform === 'browser'
/*~
const setImmediate = function(func, ...args) {
    Promise.resolve().then(() => func(...args));
};
*/
// #!endif

// #!if platform === 'node'
const Tick = nextTick;
// #!endif
// #!if platform === 'browser'
// ~ const Tick = setImmediate;
// #!endif

module.exports.Tick = Tick;
module.exports.Cast = Cast;
module.exports.toFixed = toFixed;
module.exports.toBytes = toBytes;
module.exports.countKeys = countKeys;
module.exports.fromBytes = fromBytes;
module.exports.throwError = throwError;
module.exports.maybeEquals = maybeEquals;
module.exports.setImmediate = setImmediate;
module.exports.createCustomErrorHandler = createCustomErrorHandler;
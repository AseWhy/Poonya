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
 *
 * @protected
 */
function Cast(data, context, parents_three = new Array()) {
    ///
    /// При кастинге значения, значение data (js примитив) преобразовывается в значение poonya
    /// Никаких ассинхрнных операций тут нет, поэтому можно возвращать результат, как результат
    /// Кастинга примитива js
    ///
    let result;

    switch (typeof data) {
        case 'bigint':
            context.createObject(data, -1, SERVICE.CONSTRUCTORS.INTEGER, null, parents_three, d_result => result = d_result);
        break;
        case 'number':
            context.createObject(data, -1, SERVICE.CONSTRUCTORS.NUMBER, null, parents_three, d_result => result = d_result);
        break;
        case 'string':
            context.createObject(data, -1, SERVICE.CONSTRUCTORS.STRING, null, parents_three, d_result => result = d_result);
        break;
        case 'symbol':
            context.createObject(Symbol.keyFor(data), -1, SERVICE.CONSTRUCTORS.STRING, null, parents_three, d_result => result = d_result);
        break;
        case 'boolean':
            context.createObject(data, -1, SERVICE.CONSTRUCTORS.BOOLEAN, null, parents_three, d_result => result = d_result);
        break;
        case 'undefined':
            context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null, parents_three, d_result => result = d_result);
        break;
        case 'object':
            switch (true) {
                case data === null:
                    context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null, parents_three, d_result => result = d_result);
                break;
                case data instanceof iPoonyaObject:
                case data instanceof iPoonyaPrototype:
                case data instanceof NativeFunction:
                case data instanceof Operand:
                    result = data;
                break;
                case data instanceof iCodeEmitter:
                    context.createObject(data, -1, SERVICE.CONSTRUCTORS.PATTERN, null, parents_three, d_result => result = d_result);
                break;
                default:
                    parents_three.push(data);

                    if (Array.isArray(data))
                        context.createObject(data, -1, SERVICE.CONSTRUCTORS.ARRAY, null, parents_three, d_result => result = d_result);
                    else
                        context.createObject(data, -1, SERVICE.CONSTRUCTORS.OBJECT, null, parents_three, d_result => result = d_result);
                break;
            }
        break;
        case 'function':
            result = new NativeFunction(data);
        break;
    }

    return result;
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
    while (entries[index].equals(equalts_t, equalts_v))
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
const setImmediate = (function() {
    let head = new Object(), tail = head;

    const ID = Math.random();

    function onmessage(e) {
        if(e.data != ID)
            return;
        
        head = head.next;

        const func = head.func;

        const args = head.args;

        delete head.func;
        delete head.args;

        func(...args);
    }

    if(window.addEventListener) {
        window.addEventListener('message', onmessage);
    } else {
        window.attachEvent( 'onmessage', onmessage );
    }

    return function(func, ...args) {
        tail = tail.next = { func: func, args };

        window.postMessage(ID, "*");
    };
}());
*/
// #!endif

// #!if platform === 'node'
const Tick = nextTick;
// #!endif
// #!if platform === 'browser'
// ~ const Tick = setImmediate;
// #!endif

module.exports.setImmediate = setImmediate;
module.exports.maybeEquals = maybeEquals;
module.exports.countKeys = countKeys;
module.exports.fromBytes = fromBytes;
module.exports.toFixed = toFixed;
module.exports.toBytes = toBytes;
module.exports.Tick = Tick;
module.exports.Cast = Cast;
/**
 * @file src/utils.js
 * @description Содержит в себе набор утилит, которые нужны много где, и их нельзя отнести к какой-либо конкретной группе
 * @license MIT
 * @author Astecom
 */

"use strict";

const {
        SERVICE
    } = require('./classes/static'), {
        Operand
    } = require('./classes/common/ParserData'), {
        iPoonyaObject,
        iPoonyaPrototype
    } = require('./classes/interfaces'),
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
    switch (typeof data) {
        case 'bigint':
            return context.createObject(data, -1, SERVICE.CONSTRUCTORS.INTEGER, null, parents_three);
        case 'number':
            return context.createObject(data, -1, SERVICE.CONSTRUCTORS.NUMBER, null, parents_three);
        case 'string':
            return context.createObject(data, -1, SERVICE.CONSTRUCTORS.STRING, null, parents_three);
        case 'symbol':
            return context.createObject(Symbol.keyFor(data), -1, SERVICE.CONSTRUCTORS.STRING, null, parents_three);
        case 'boolean':
            return context.createObject(data, -1, SERVICE.CONSTRUCTORS.BOOLEAN, null, parents_three);
        case 'undefined':
            return context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null);
        case 'object':
            switch (true) {
                case data === null:
                    return context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null, parents_three);
                case data instanceof iPoonyaObject:
                case data instanceof iPoonyaPrototype:
                case data instanceof Operand:
                case data instanceof NativeFunction:
                    return data;
                default:
                    parents_three.push(data);

                    if (Array.isArray(data))
                        return context.createObject(data, -1, SERVICE.CONSTRUCTORS.ARRAY, null, parents_three);
                    else
                        return context.createObject(data, -1, SERVICE.CONSTRUCTORS.OBJECT, null, parents_three);
            }
        case 'function':
            return new NativeFunction(data);
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

module.exports.maybeEquals = maybeEquals;
module.exports.countKeys = countKeys;
module.exports.fromBytes = fromBytes;
module.exports.toFixed = toFixed;
module.exports.toBytes = toBytes;
module.exports.Cast = Cast;
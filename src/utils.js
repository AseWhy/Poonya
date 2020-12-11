/**
 * @file src/utils.js
 * @description Содержит в себе набор утилит, которые нужны много где, и их нельзя отнести к какой-либо конкретной группе
 * @license MIT
 * @author Astecom
 */

const {
        SERVICE
    } = require('./classes/static'),
    {
        Operand
    } = require('./classes/common/ParserData'),
    {
        iPoonyaObject,
        iPoonyaPrototype
    } = require('./classes/interfaces')
    ,   NativeFunction = require('./classes/excecution/expression/NativeFunction')
    ,   NativeString = require('./classes/common/native/NativeString')
    ,   NativeNumber = require('./classes/common/native/NativeNumber')
    ,   NativeInteger = require('./classes/common/native/NativeInteger')
    ,   NativeBoolean = require('./classes/common/native/NativeBoolean')
    ,   NativeNull = require('./classes/common/native/NativeNull');

/**
 * Фукция которая преобразует нативное значение в значение Poonya
 *
 * @memberof Poonya.Utils
 * @function Cast
 *
 * @param {Any} data Данные которые необходимо преобразовать
 * @param {iContext} Контекст
 * @param {Array<Any>} дерево родителей объекта
 *
 * @protected
 */
function Cast(data, context, parents_three = new Array()) {
    switch (typeof data) {
        case "bigint":
            return new NativeInteger(data);
        case "number":
            return new NativeNumber(data);
        case "string":
            return new NativeString(data);
        case "symbol":
            return new NativeString(Symbol.keyFor(data));
        case "boolean":
            return new NativeBoolean(data);
        case "object":
            switch (true) {
                case data === null:
                    return new NativeNull();
                case data instanceof iPoonyaObject:
                case data instanceof Operand:
                case data instanceof iPoonyaPrototype:
                    return data;
                default:
                    parents_three.push(data);

                    if(Array.isArray(data))
                        return context.createObject(data, -1, SERVICE.CONSTRUCTORS.ARRAY);
                    else
                        return context.createObject(data, -1, SERVICE.CONSTRUCTORS.OBJECT);
            }
        case "function":
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
 * @param {Array<LexerEntry>} entries Выхождение, на вход
 * @param {Number} index Проверяемый индекс
 * @param {String} equalts_t Тип с которым сравниваем
 * @param {String|Array<String>} equalts_v Значение(я) с которым(и) сравниваем
 *
 * @memberof Poonya.Utils
 * @private
 */
function maybeEquals(entries, index, equalts_t, equalts_v) {
    while (entries[index].equals(equalts_t, equalts_v)) {
        entries.splice(index, 1);
    }

    return true;
}


/**
 * Подсчитывает количиство неприрывных одинаковых вхождений
 * 
 * @param {Array<LexerEntry>} entries вхождения для парсинга
 * @param {Number} start начальная позиция парсинга
 * @param {String} equalts_t Тип с которым сравниваем
 * @param {String|Array<String>} equalts_v Значение(я) с которым(и) сравниваем
 * 
 * @memberof Poonya.Utils
 * @private
 */
function countKeys(entries, start, equalts_t, equalts_v){
    for(let i = start, to = entries.length; i < to; i++){
        if(entries[i] == null || !entries[i].equals(equalts_t, equalts_v))
            return i - start;
    }
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
    return "0x" + d.toString(16).padStart(l - 2, "0");
}

module.exports.maybeEquals = maybeEquals;
module.exports.countKeys = countKeys;
module.exports.toFixed = toFixed;
module.exports.Cast = Cast;
const {
        NativeInteger,
        NativeNumber,
        NativeString,
        NativeBoolean,
        NativeNull
    } = require("./classes/common/Native"),
    {
        SERVICE
    } = require('./classes/static'),
    {
        Operand
    } = require('./classes/common/ParserData'),
    {
        iPoonyaObject,
        iPoonyaPrototype
    } = require('./classes/interfaces')
    ,   NativeFunction = require('./classes/excecution/NativeFunction');

/**
 * Фукция которая преобразует нативное значение в значение Poonya
 *
 * @memberof Poonya
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
 * @memberof Poonya
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
 * @memberof Poonya
 * @private
 */
function countKeys(entries, start, equalts_t, equalts_v){
    for(let i = start, to = entries.length; i < to; i++){
        if(entries[i] == null || !entries[i].equals(equalts_t, equalts_v))
            return i - start;
    }
}

module.exports.maybeEquals = maybeEquals;
module.exports.countKeys = countKeys;
module.exports.Cast = Cast;
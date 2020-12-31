/**
 * @file src/classes/data/NativeFunction.js
 * @description Содержит в себе объект нативной функции, которая так-же вызывается при вызове функции
 * @author Astecom
 */

"use strict";

const { Operand } = require('../common/ParserData')
    , { SERVICE } = require('../static')
    , { NativeFunctionExecutionError } = require('../exceptions')
    , { iPoonyaObject, iPoonyaPrototype } = require('../interfaces');

/**
 * @lends NativeFunction
 * @class
 */
class NativeFunction {
    /**
     * Нативная функция, невозможно создать по средствам шаблона
     *
     * @param {Function} func функция, котороая будет вызвана при попытке результировать значение
     * @constructs NativeFunction
     * @memberof Poonya.Expression
     * @protected
     */
    constructor(func) {
        this.target = func;
        this.name = func.name;
    }

    /**
     * Вызывает функцию, которая была передана как параметр при создании нативной функции
     *
     * @param {Array<Any>} args аргументы функции
     * @param {iContext} context Контекст выполнения фукнции
     * @param {iPoonyaObject} thisArgs родительский объект
     * @param {Function} throw_error Метод выбрасывания ошибок
     * @param {Number} call_pos Позиция из которой происходит вызов
     *
     * @returns {Any} в зависимости от результата выполнения нативной функции
     */
    result(thisArg = null, args, context, out, call_pos, throw_error) {
        let data,
            args_f = new Array();

        for (let i = 0, leng = args.length; i < leng; i++) {
            args_f.push(args[i]
                .result(context, out, throw_error)  // Получаем значение poonya
                .result(context, out, throw_error)  // Преобразуем в нативное значение
            );
        }

        try {
            data = this.target.call(
                thisArg,
                {
                    args,
                    context,
                    throw_error,
                    position: call_pos,
                },
                ...args_f
            );
        } catch (e) {
            throw_error(call_pos, new NativeFunctionExecutionError(this.target.name, e.stack));
        }

        switch (typeof data) {
            case 'bigint':
                return context.createObject(data, -1, SERVICE.CONSTRUCTORS.INTEGER, null);
            case 'number':
                return context.createObject(data, -1, SERVICE.CONSTRUCTORS.NUMBER, null);
            case 'string':
                return context.createObject(data, -1, SERVICE.CONSTRUCTORS.STRING, null);
            case 'symbol':
                return context.createObject(
                    Symbol.keyFor(data),
                    -1,
                    SERVICE.CONSTRUCTORS.STRING,
                    null
                );
            case 'boolean':
                return context.createObject(data, -1, SERVICE.CONSTRUCTORS.BOOLEAN, null);
            case 'undefined':
                return context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null);
            case 'object':
                switch (true) {
                    case data === null:
                        return context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null);
                    case data instanceof iPoonyaObject:
                    case data instanceof Operand:
                    case data instanceof iPoonyaPrototype:
                        return data;
                    default:
                        if (Array.isArray(data))
                            return context.createObject(data, -1, SERVICE.CONSTRUCTORS.ARRAY, null);
                        else
                            return context.createObject(
                                data,
                                -1,
                                SERVICE.CONSTRUCTORS.OBJECT,
                                null
                            );
                }
            case 'function':
                return new NativeFunction(data);
        }
    }
}

module.exports = NativeFunction;

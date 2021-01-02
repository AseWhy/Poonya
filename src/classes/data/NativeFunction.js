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
     * @param {Function} reject Метод выбрасывания ошибок
     * @param {Number} call_pos Позиция из которой происходит вызов
     *
     * @returns {Any} в зависимости от результата выполнения нативной функции
     */
    result(thisArg = null, args, context, out, call_pos, reject, resolve) {
        let _ = this, args_f = new Array(), resolve_r = true, argc = args.length, i = 0;

        function c_resolve(data) {
            if(resolve_r)
                resolve_r = false;
            else
                return;

            switch (typeof data) {
                case 'bigint':
                    context.createObject(data, -1, SERVICE.CONSTRUCTORS.INTEGER, null, new Array(), resolve);
                break;
                case 'number':
                    context.createObject(data, -1, SERVICE.CONSTRUCTORS.NUMBER, null, new Array(), resolve);
                    break;
                case 'string':
                    context.createObject(data, -1, SERVICE.CONSTRUCTORS.STRING, null, new Array(), resolve);
                break;
                case 'symbol':
                    context.createObject(Symbol.keyFor(data), -1, SERVICE.CONSTRUCTORS.STRING, null, new Array(), resolve);
                break;
                case 'boolean':
                    context.createObject(data, -1, SERVICE.CONSTRUCTORS.BOOLEAN, null, new Array(), resolve);
                break;
                case 'undefined':
                    context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null, new Array(), resolve);
                break;
                case 'object':
                    switch (true) {
                        case data === null:
                            context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null, new Array(), resolve);
                        break;
                        case data instanceof iPoonyaPrototype || data instanceof iPoonyaObject || data instanceof Operand:
                            resolve(data);
                        break;
                        default:
                            if (Array.isArray(data))
                                context.createObject(data, -1, SERVICE.CONSTRUCTORS.ARRAY, null, new Array(), resolve);
                            else
                                context.createObject(data, -1, SERVICE.CONSTRUCTORS.OBJECT, null, new Array(), resolve);
                    }
                break;
                case 'function':
                    resolve(new NativeFunction(data));
                break;
            }
        }

        function start() {
            let data;

            try {
                data = _.target.call(
                    thisArg,

                    {
                        args,
                        context,
                        reject,
                        resolve: c_resolve,
                        position: call_pos,
                    },

                    ...args_f
                );
            } catch (err) {
                reject(call_pos, new NativeFunctionExecutionError(_.target.name, err instanceof Error ? err.stack : new Error().stack));
            }

            if(data instanceof Promise) {
                data
                    .catch(err => reject(call_pos, new NativeFunctionExecutionError(_.target.name, err instanceof Error ? err.stack : new Error().stack)))
                    .then(c_resolve);
            } else if(data !== undefined) {
                c_resolve(data);
            }
        }

        if(argc != 0){
            (function next() {
                args[i].result(context, out, reject, p_result => {
                    p_result.result(context, out, reject, d_result => {
                        args_f[i] = d_result;

                        if(++i >= argc) {
                            start();
                        } else {
                            next();
                        }
                    });
                });
            })();
        } else {
            start();
        }
    }
}

module.exports = NativeFunction;

/**
 * @file src/classes/excecution/expression/NativeFunction.js
 * @description Содержит в себе объект нативной функции, которая так-же вызывается при вызове функции
 * @author Astecom
 * @license MIT
 */

const { 
            Operand
    } = require('../../common/ParserData')
    , { 
            NativeFunctionReturnValueError
        ,   NativeFunctionExcecutionError 
    } = require('../../exceptions')
    , { 
            iPoonyaObject
    } = require('../../interfaces');

/**
 * @lends NativeFunction
 * @class
 */
class NativeFunction extends Operand {
    /**
     * Нативная функция, невозможно создать по средствам шаблона
     *
     * @param {Function} func функция, котороая будет вызвана при попытке результировать значение
     * @constructs NativeFunction
     * @memberof Poonya.Expression
     * @extends Operand
     * @protected
     */
    constructor(func) {
        super("native function");

        this.target = func;
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
        let buff, args_f = new Array();

        for (let i = 0, leng = args.length, res; i < leng; i++) {
            res = args[i].result(context, out, throw_error);

            if(res instanceof iPoonyaObject) {
                args_f.push(res.result(context, out, throw_error));
            } else {
                args_f.push(res);
            }
        }

        try {
            buff = this.target.call(thisArg, { 
                args,
                context,
                throw_error,
                position: call_pos
            }, ...args_f);
        } catch (e) {
            throw_error(call_pos, new NativeFunctionExcecutionError(this.target.name, e.stack));
        }

        switch(typeof buff){
            case "bigint":
            case "number":
                if(isNaN(buff))
                    return null;
                else 
                    return buff;
            case "string":
            case "boolean":
            case "symbol":
            case "function":
                return buff;
            case "undefined":
            case "object":
                if(buff == null)
                    return null;
                else {
                    return buff;
                }
            default:
                throw_error(call_pos, new NativeFunctionReturnValueError());
        }
    }

    /**
     * Создает пустую функцию.
     *
     * @returns {NativeFunction}
     * @static
     * @public
     * @method
     */
    static create() {
        return new NativeFunction(() => false);
    }
}

module.exports = NativeFunction;
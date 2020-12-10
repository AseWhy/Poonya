
const { Operand } = require('../common/ParserData')
    , { NativeFunctionReturnValueError } = require('../exceptions');

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
     * @memberof Poonya
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
     * @param {PoonyaObject} thisArgs родительский объект
     * @param {Function} throw_error Метод выбрасывания ошибок
     * @param {Number} call_pos Позиция из которой происходит вызов
     * @returns {IntegerLiteral|NumberLiteral|StringLiteral|BooleanLiteral|PoonyaObject|NullLiteral}
     */
    result(args, thisArgs = null, context, throw_error, call_pos) {
        let buff;

        try {
            buff = this.target.call(thisArgs, { 
                args,
                context,
                throw_error,
                position: call_pos
            }, ...args);
        } catch (e) {
            console.error(e);

            throw_error(call_pos, new NativeFunctionExcecutionError(this.target.name));
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
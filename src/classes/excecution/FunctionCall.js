const { Operand } = require("../common/ParserData")
    , { UnableToCreateAnObjectException, FieldNotAFunctionException } = require('../exceptions')
    , { iPoonyaPrototype } = require('../interfaces')
    ,   NativeFunction = require('./NativeFunction');

/**
 * @lends FunctionCall
 * @protected
 */
class FunctionCall extends Operand {
    /**
     * Вхождение вызова функции, после выполнения этого вхождения будет вызвана нативная функция
     *
     * @param {CodeEmitter} эмиттер который будет исполнятся при сполнении этого выхождения
     *
     * @constructs FunctionCall
     * @extends Operand
     * @memberof Poonya
     * @protected
     */
    constructor(query_stack, args, position) {
        super("call function");

        this.query_stack = [...query_stack];
        this.position = position;
        this.args = args;
    }

    /**
     * Получает переменную заданную литералами
     *
     * @param {iContext} context Контекст выполнения
     * @param {PoonyaOutputStream} out вывод шаблонизатора
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @returns {Any} В зависимости от возвращаемых функцией значения
     * @throws {ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        const data = context.getByPath(this.query_stack, this.position, null, throw_error, true),
            args = new Array();

        for (let i = 0, leng = this.args.length; i < leng; i++)
            args.push(this.args[i].result(context, out, throw_error));

        if (data.instance instanceof NativeFunction)
            return data.instance.result(args, data.parent, context, throw_error, this.position);
        else if (data.instance instanceof iPoonyaPrototype)
            throw_error(
                this.position,
                new UnableToCreateAnObjectException()
            );
        else {
            throw_error(
                this.position,
                new FieldNotAFunctionException(query_stack[query_stack.length - 1])
            );
        }
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @returns {String} Строковое представление вызова функции
     * @public
     * @method
     */
    toString() {
        return (
            "(" +
            this.query_stack.join(" => ") +
            ") <== (" +
            this.args.join(", ") +
            ")"
        );
    }
}

module.exports = FunctionCall;
/**
 * @file src/classes/excecution/expression/FunctionCall.js
 * @description Содержит в себе вхождение вызовва функции
 * @author Astecom
 */

"use strict";

const { Operand } = require('../../common/ParserData')
    , { UnableToCreateAnObjectException, FieldNotAFunctionException } = require('../../exceptions')
    , { iPoonyaPrototype } = require('../../interfaces')
    ,   NativeFunction = require('../../data/NativeFunction');

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
     * @memberof Poonya.Expression
     * @protected
     */
    constructor(query_stack, args, position) {
        super('call function');

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
        const data = context.getByPath(this.query_stack, this.position, null, throw_error, true);

        if (data.instance instanceof NativeFunction)
            return data.instance.result(data.parent, this.args, context, out, this.position, throw_error);
        else if (data.instance instanceof iPoonyaPrototype)
            throw_error(this.position, new UnableToCreateAnObjectException());
        else {
            throw_error(this.position, new FieldNotAFunctionException(this.query_stack[this.query_stack.length - 1]));
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
        return '(' + this.query_stack.join(' => ') + ') <== (' + this.args.join(', ') + ')';
    }
}

module.exports = FunctionCall;

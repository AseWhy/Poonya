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
     * @param {Function} reject Вызывается при ошибке
     * @param {Function} resolve Вызывается при завершении вызова функции
     *
     * @returns {Any} В зависимости от возвращаемых функцией значения
     * @throws {ParserException}
     *
     * @public
     * @method
     */
    result(context, out, reject, resolve) {
        context.getByPath(this.query_stack, this.position, null, reject, true, result => {
            if (result.instance instanceof NativeFunction)
                result.instance.result(result.parent, this.args, context, out, this.position, reject, resolve);
            else if (result.instance instanceof iPoonyaPrototype)
                reject(this.position, new UnableToCreateAnObjectException());
            else {
                reject(this.position, new FieldNotAFunctionException(this.query_stack[this.query_stack.length - 1]));
            }
        });
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

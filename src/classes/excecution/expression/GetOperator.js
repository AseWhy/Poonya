/**
 * @file src/classes/excecution/expression/GetOperator.js
 * @description Содержит в себе оператор получения значения по индексам
 * @author Astecom
 * @license MIT
 */

const { Operand } = require("../../common/ParserData");

/**
 * @lends GetOperator
 * @protected
 */
class GetOperator extends Operand {
    /**
     * Данные вызова шаблона, если передать в heap шаблон, то он выполнится с текущей памятью
     *
     * @param {CodeEmitter} эмиттер который будет исполнятся при сполнении этого выхождения
     *
     * @constructs GetOperator
     * @extends Operand
     * @memberof Poonya.Expression
     * @protected
     */
    constructor(position, stack) {
        super("get");

        this.position = position;
        this.query_stack = stack;
    }

    /**
     * Получает переменную заданную литералами
     *
     * @param {iContext} context Контекст выполнения
     * @param {PoonyaOutputStream} out вывод шаблонизатора
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @returns {Any} В зависимости от типа запрашиваемых данных
     * @throws {ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        const data = context.getByPath(this.query_stack, this.position, null, throw_error);

        if (data != null)
            return data.result(context, out, throw_error);

        else
            return null;
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @returns {String} Строковое представление получения доступа к полям
     * @public
     * @method
     */
    toString() {
        return "(" + this.query_stack.join(" => ") + ")";
    }
}

module.exports = GetOperator;
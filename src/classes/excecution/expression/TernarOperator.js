/**
 * @file src/classes/excecution/expression/TernarOperator.js
 * @description Содержит в себе тернарный оператор, который сериализуется как <condition> ? <v1> : <v2>
 * @author Astecom
 * @license MIT
 */

const { Operand } = require("../../common/ParserData")
    , { BooleanLiteral } = require('../../common/Literals');

/**
 * @lends TernarOperator
 * @protected
 */
class TernarOperator extends Operand {
    /**
     * Создает тернарные оператор
     *
     * @param {ExpressionGroup} condition Выражение условие
     * @param {ExpressionGroup} v1 Выражение, если истина
     * @param {ExpressionGroup} v2 Выражение, если ложь
     *
     * @constructs TernarOperator
     * @extends Operand
     * @memberof Poonya.Expression
     * @protected
     */
    constructor(condition, v1, v2) {
        super("ternar");

        this.condition = condition;
        this.v_o = v1;
        this.v_t = v2;
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @returns {String} Строковое представление теранарного оператора
     * @public
     * @method
     */
    toString(indent) {
        return (
            "< " +
            this.condition.toString(indent + "\t") +
            " > ? " +
            this.v_o +
            " : " +
            this.v_t
        );
    }

    /**
     * Выполняет теранарный оператор
     *
     * @param {iContext} context Контекст выполнения
     * @param {PoonyaOutputStream} out вывод шаблонизатора
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @returns {Any} В зависимости от возвращаемых операндами (`v1`, `v2`) начений
     * @throws {ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        if (BooleanLiteral.toPoonyaBoolean(
            this.condition.result(context, out, throw_error),
            this.condition.position
        ).result())
            return this.v_o.result(context, out, throw_error);

        else
            return this.v_t.result(context, out, throw_error);
    }
}

module.exports = TernarOperator;
/**
 * @file src/classes/excecution/statements/IfStatement.js
 * @description Содержит в себе оператор if, который используется для создания условных операций
 * @author Astecom
 * @license MIT
 */

const BooleanLiteral = require("../../common/literals/BooleanLiteral");

/**
 * @lends IfStatement
 * @protected
 */
class IfStatement {
    /**
     * Дескриптор оператора if
     *
     * @param {ExpressionGroup} condition Выражение - условие
     * @param {SequenceGroup} body_true Исполняемая последовательность, если true
     * @param {SequenceGroup} body_false Исполняемая последовательность, если false
     *
     * @constructs IfStatement
     * @memberof Poonya.Statements
     * @protected
     */
    constructor(condition, body_true, body_false) {
        this.condition = condition;
        this.body_true = body_true;
        this.body_false = body_false;
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @param {String} indent отступ слева, для более понятного отображения кода
     * @returns {String} Строковое представление выражения if
     * @public
     * @method
     */
    toString(indent) {
        return (
            "if (" +
            this.condition.toString(indent) +
            ") " +
            this.body_true.toString(indent) +
            (
                this.body_false != null
                    ? " else " + this.body_false.toString(indent)
                    : ""
            )
        );
    }

    /**
     * Выполняет проверку условия, и выполняет нужную группу в зависимости от результатов выполнения условия
     *
     * @param {iContext} context Контекст выполнения
     * @param {PoonyaOutputStream} out вывод шаблонизатора
     * @param {Function} throw_error Вызывается при ошибке
     *
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
            this.body_true.result(context, out, throw_error);
        else if (this.body_false != null)
            this.body_false.result(context, out, throw_error);
    }
}

module.exports = IfStatement;
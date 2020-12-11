/**
 * @file src/classes/excecution/statements/WhileStatement.js
 * @description Содержит в себе оператор while, который используется для создания цикличных условных операций
 * @author Astecom
 * @license MIT
 */

const { BooleanLiteral } = require("../../common/ParserData");

/**
 * @lends WhileStatement
 * @protected
 */
class WhileStatement {
    /**
     * Дескриптор оператора while
     *
     * @param {ExpressionGroup} condition Выражение - условие
     * @param {SequenceGroup} body Основная исполняемая последовательность
     *
     * @constructs WhileStatement
     * @memberof Poonya.Statements
     * @protected
     */
    constructor(condition, body) {
        this.condition = condition;
        this.body = body;
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @param {String} indent отступ слева, для более понятного отображения кода
     * @returns {String} Строковое представление выражения while
     * @public
     * @method
     */
    toString(indent) {
        return (
            "while (" +
            this.condition.toString(indent) +
            ") " +
            this.body.toString(indent)
        );
    }

    /**
     * Выполняет основной блок, до тех пор, пока выполняется условие переданное первым аргументом
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
        while (BooleanLiteral.toPoonyaBoolean(
            this.condition.result(context, out, throw_error),
            this.condition.position
        ).result())
            this.body.result(context, out, throw_error);
    }
}

module.exports = WhileStatement;
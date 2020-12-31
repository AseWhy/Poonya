/**
 * @file src/classes/excecution/statements/OutStatement.js
 * @description Содержит в себе оператор вывода, который используется для вывода информации из шаблона
 * @author Astecom
 */

"use strict";

/**
 * @lends OutStatement
 * @protected
 */
class OutStatement {
    /**
     * Оператор вывода который Сериализуется как > (...expression)
     * Выводит данные из шаблона
     *
     * @constructs OutStatement
     *
     * @param {ExpressionGroup} expression выражение, результаты выполнения которого будем выводить
     *
     * @memberof Poonya.Statements
     * @protected
     */
    constructor(expression) {
        this.expression = expression;
        this.position = expression.position;
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @returns {String} Строковое представление вывода выражения
     * @public
     * @method
     */
    toString() {
        return '> ' + this.expression.toString();
    }

    /**
     * Выполняет вывод информации из шаблона
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
        out.write(
            this.expression.result(context, out, throw_error).result(context, out, throw_error)
        );
    }
}

module.exports = OutStatement;

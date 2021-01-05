/**
 * @file src/classes/excecution/statements/OutStatement.js
 * @description Содержит в себе оператор вывода, который используется для вывода информации из шаблона
 * @author Astecom
 */

"use strict";

const { Tick } = require("../../../utils");

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
     * @param {Function} reject Вызывается при ошибке
     * @param {Function} resolve функция возврата результата
     *
     * @throws {ParserException}
     *
     * @public
     * @method
     */
    result(context, out, reject, resolve) {
        this.expression.result(context, out, reject, p_result => {
            if(p_result != null)
                p_result.result(context, out, reject, d_result => {
                    out.write(d_result);

                    Tick(resolve, d_result);
                });
            else
                Tick(resolve, null);
        });
    }
}

module.exports = OutStatement;

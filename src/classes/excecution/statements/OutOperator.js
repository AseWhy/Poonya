/**
 * @file src/classes/excecution/statements/OutOperator.js
 * @description Содержит в себе оператор вывода, который используется для вывода информации из шаблона
 * @author Astecom
 * @license MIT
 */

const { iPoonyaObject } = require('../../interfaces');

/**
 * @lends OutOperator
 * @protected
 */
class OutOperator {
    /**
     * Оператор вывода который Сериализуется как > (...expression)
     * Выводит данные из шаблона
     *
     * @constructs OutOperator
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
        return "> " + this.expression.toString();
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
        const data = this.expression.result(context, out, throw_error);

        if(data instanceof iPoonyaObject) {
            out.write(data.result(context, out, throw_error));
        } else {
            out.write(data);
        }
    }
}

module.exports = OutOperator;
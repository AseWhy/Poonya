const PoonyaObject = require('../data/PoonyaObject');

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
     * @memberof Poonya
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

        out.write(data instanceof PoonyaObject ? data.result(context, out, throw_error) : data);
    }
}

module.exports = OutOperator;
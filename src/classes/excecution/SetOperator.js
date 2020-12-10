const { TheFieldAlreadyHasBeenDeclaredException } = require('../exceptions');

/**
 * @lends SetOperator
 * @protected
 */
class SetOperator {
    /**
     * Объект который Сериализуется как set = (expression...)
     *
     * @param {String} name поле, которое нужно установить в текущем контексте
     * @param {ExpressionGroup} value Значение, которое поле получит после выполнения этого вхождения
     *
     * @constructs SetOperator
     * @memberof Poonya
     * @protected
     */
    constructor(name, value) {
        this.name = name.toString();
        this.position = name.position;
        this.value = value;
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @returns {String} Строковое представление устновки значения переменной
     * @public
     * @method
     */
    toString(indent) {
        return "set " + this.name + " = " + this.value.toString(indent + "\t");
    }

    /**
     * Производит установку значения переменной в текущем контексте
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
        if (!context.has(this.name, "up")) {
            context.set(this.name, this.value.result(context, out, throw_error), "up");
        } else {
            throw_error(
                this.position,
                new TheFieldAlreadyHasBeenDeclaredException(this.name)
            );
        }
    }
}

module.exports = SetOperator;
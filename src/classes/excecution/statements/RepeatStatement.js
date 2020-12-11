/**
 * @file src/classes/excecution/statements/RepeatStatement.js
 * @description Содержит в себе оператор repeat, который используется для создания цикличных конечных конструкций
 * @author Astecom
 * @license MIT
 */

const { TheFieldMustBeNumberException } = require('../../exceptions');

/**
 * @lends RepeatStatement;
 * @protected
 */
class RepeatStatement {
    /**
     * Дескриптор оператора repeat
     *
     * @param {ExpressionGroup} from Выражение - выполнять c
     * @param {ExpressionGroup} to Выражение - выполнять по
     * @param {SequenceGroup} body Основная исполняемая последовательность
     *
     * @constructs RepeatStatement
     * @memberof Poonya.Statements
     * @protected
     */
    constructor(from, to, body) {
        this.from = from;
        this.to = to;
        this.body = body;
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @param {String} indent отступ слева, для более понятного отображения кода
     * @returns {String} Строковое представление выражения repeat
     * @public
     * @method
     */
    toString(indent) {
        return "repeat (" + this.from.toString(indent) + "; " + this.to.toString(indent) + ") " + this.body.toString(indent);
    }

    /**
     * Выполняет главную выполняему последовательность от `from` до `to`
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
        let from = this.from.result(context, out, throw_error),
            to = this.to.result(context, out, throw_error),
            difference = from < to ? 1 : -1;

        if (typeof from !== "number")
            throw_error(
                this.from.position,
                new TheFieldMustBeNumberException("From")
            );

        if (typeof to !== "number")
            throw_error(
                this.to.position,
                new TheFieldMustBeNumberException("To")
            );

        from = parseInt(from);
        to = parseInt(to);

        while (from != to) {
            context.addLevel();

            context.set("current", from, "up");

            this.body.result(context, out, throw_error, false);

            from += difference;

            context.popLevel();
        }
    }
}

module.exports = RepeatStatement;
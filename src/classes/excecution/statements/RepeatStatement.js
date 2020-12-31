/**
 * @file src/classes/excecution/statements/RepeatStatement.js
 * @description Содержит в себе оператор repeat, который используется для создания цикличных конечных конструкций
 * @author Astecom
 */

"use strict";

const { TheFieldMustBeNumberException } = require('../../exceptions')
    ,   PoonyaNumber = require('../../data/PoonyaNumber');

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
        return (
            'repeat (' +
            this.from.toString(indent) +
            '; ' +
            this.to.toString(indent) +
            ') ' +
            this.body.toString(indent)
        );
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
            difference;

        if (!(from instanceof PoonyaNumber))
            throw_error(this.from.position, new TheFieldMustBeNumberException('From'));

        if (!(to instanceof PoonyaNumber))
            throw_error(this.to.position, new TheFieldMustBeNumberException('To'));

        difference =
            (from = Math.floor(from.result(context, out, throw_error))) <
            (to = Math.floor(to.result(context, out, throw_error)))
                ? 1 : -1;

        while (from != to) {
            context.addLevel();

            context.set('current', from, 'up');

            this.body.result(context, out, throw_error, false);

            from += difference;

            context.popLevel();
        }
    }
}

module.exports = RepeatStatement;

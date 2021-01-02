/**
 * @file src/classes/excecution/statements/IfStatement.js
 * @description Содержит в себе оператор if, который используется для создания условных операций
 * @author Astecom
 */

"use strict";

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
            'if (' +
                this.condition.toString(indent) +
            ') ' +
            this.body_true.toString(indent) +
            (
                this.body_false != null ?
                    ' else ' +
                    this.body_false.toString(indent) :
                    ''
            )
        );
    }

    /**
     * Выполняет проверку условия, и выполняет нужную группу в зависимости от результатов выполнения условия
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
        const _ = this;

        _.condition.result(context, out, reject, result => {
            if (context.toBooleanResult(result))
                _.body_true.result(context, out, reject, resolve);
            else if(_.body_false != null)
                _.body_false.result(context, out, reject, resolve);
            else
                resolve();
        });
    }
}

module.exports = IfStatement;

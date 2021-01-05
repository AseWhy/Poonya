/**
 * @file src/classes/excecution/statements/WhileStatement.js
 * @description Содержит в себе инструкцию while, который используется для создания цикличных условных операций
 * @author Astecom
 */

"use strict";

const { Tick } = require("../../../utils");

/**
 * @lends WhileStatement
 * @protected
 */
class WhileStatement {
    /**
     * Дескриптор инструкции while
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
        return 'while (' + this.condition.toString(indent) + ') ' + this.body.toString(indent);
    }

    /**
     * Выполняет основной блок, до тех пор, пока выполняется условие переданное первым аргументом
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
     * @async
     */
    result(context, out, reject, resolve) {
        let _ = this;

        (function tick(result){
            _.condition.result(context, out, reject, d_result => {
                if(context.toBooleanResult(d_result)) {
                    _.body.result(context, out, reject, tick);
                } else {
                    Tick(resolve, result);

                    return;
                }
            });
        })();
    }
}

module.exports = WhileStatement;

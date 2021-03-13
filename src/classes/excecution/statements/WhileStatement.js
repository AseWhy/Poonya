/**
 * @file src/classes/excecution/statements/WhileStatement.js
 * @description Содержит в себе инструкцию while, который используется для создания цикличных условных операций
 * @author Astecom
 */

"use strict";

const { Tick } = require("../../../utils")
    , { iStatement } = require("../../interfaces")
    , BreakStatement = require("./BreakStatement")
    , ContinueStatement = require("./ContinueStatement");

/**
 * @lends WhileStatement
 * @protected
 */
class WhileStatement extends iStatement {
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
        super();

        this.condition = condition;
        this.body = body;

        this.body.interrupted();
        this.body.continued();
    }

    /**
     * @see iStatement.__sync
     * 
     * @param {Function} reject функция выбрасывания исключений
     * 
     * @method
     * 
     * @returns {WhileStatement}
     */
    __sync(reject) {
        this.condition.__sync(reject);
        this.body.__sync(reject);

        return this;
    }

    /**
     * @see iStatement.__executable
     * 
     * @returns {Array<SequenceGroup>} список исполняемых блоков
     * @method
     */
    __executable(){
        return [ this.body ];
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
                if(
                    context.toBooleanResult(d_result) &&
                    !(
                        result instanceof BreakStatement
                    )
                ) {
                    _.body.result(context, out, reject, tick);
                } else {
                    Tick(
                        resolve,
                        // 
                        // Защита, чтобы инструкция выхода из цикла не предавалась дальше по цепочке
                        // 
                        (
                            result instanceof BreakStatement ||
                            result instanceof ContinueStatement
                        ) ?
                            null :
                            result
                    );

                    return;
                }
            });
        })(null);
    }
}

module.exports = WhileStatement;

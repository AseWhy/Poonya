/**
 * @file src/classes/excecution/statements/RepeatStatement.js
 * @description Содержит в себе оператор repeat, который используется для создания цикличных конечных конструкций
 * @author Astecom
 */

"use strict";
const { TheFieldMustBeNumberException } = require('../../exceptions')
    , { Tick } = require('../../../utils')
    , { iStatement } = require('../../interfaces')
    ,   PoonyaNumber = require('../../data/PoonyaNumber')
    ,   BreakStatement = require('./BreakStatement')
    ,   ContinueStatement = require('./ContinueStatement');

/**
 * @lends RepeatStatement;
 * @protected
 */
class RepeatStatement extends iStatement {
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
        super();

        this.from = from;
        this.to = to;
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
     * @returns {RepeatStatement}
     */
    __sync(reject) {
        this.from.__sync(reject);
        this.to.__sync(reject);
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
     * @param {Function} reject Вызывается при ошибке
     * @param {Function} resolve функция возврата результата
     *
     * @throws {ParserException}
     *
     * @public
     * @method
     */
    result(context, out, reject, resolve) {
        let _ = this, difference;

        _.from.result(context, out, reject, from_d => {
            _.to.result(context, out, reject, to_d => {
                if (!(from_d instanceof PoonyaNumber))
                    reject(_.from.position, new TheFieldMustBeNumberException('From'));
        
                if (!(to_d instanceof PoonyaNumber))
                    reject(_.to.position, new TheFieldMustBeNumberException('To'));

                from_d.result(context, out, reject, from => {
                    to_d.result(context, out, reject, to => {
                        difference = from < to ? 1 : -1;

                        from = Math.floor(from);
                        to = Math.floor(to);

                        function end(result) {
                            from += difference;

                            context.popLevel();

                            Tick(tick, result, difference);
                        }

                        function tick(result){
                            if(
                                from == to ||
                                result instanceof BreakStatement
                            ){
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
                
                            context.addLevel();
                
                            context.set('current', from, 'up');
                            
                            _.body.result(context, out, reject, end, false);
                        }

                        tick();
                    });
                });
            });
        });
    }
}

module.exports = RepeatStatement;

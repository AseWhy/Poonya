/**
 * @file src/classes/excecution/statements/RepeatStatement.js
 * @description Содержит в себе оператор repeat, который используется для создания цикличных конечных конструкций
 * @author Astecom
 */

"use strict";
const { TheFieldMustBeNumberException } = require('../../exceptions')
    , { Tick } = require('../../../utils')
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
                            if(from == to){
                                Tick(resolve, result);
                
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

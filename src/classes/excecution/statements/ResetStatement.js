/**
 * @file src/classes/excecution/statements/ResetStatement.js
 * @description Содержит в себе оператор обновления значения переменной
 * @author Astecom
 */

"use strict";

const ExpressionGroup = require('../expression/ExpressionGroup')
    , { iPoonyaObject, iPoonyaPrototype, iContext, iStatement } = require('../../interfaces')
    , { GetFieldOfNullException, TheFieldNotHasDeclaredExceprion } = require('../../exceptions')
    , { GET } = require('../../static')
    , { Tick } = require('../../../utils')
    , { Operand } = require('../../common/ParserData')
    , PoonyaObject = require('../../data/PoonyaObject');

/**
 * @lends ResetStatement
 * @protected
 */
class ResetStatement extends iStatement {
    /**
     * Производит переустновку значения переменной переданной как левой операнд на выражение, которое передано как правый операнд.
     * Объект который сериализуется как name = (...expression)
     *
     * @param {Number} position Позиция в начала оператора во входящих данных
     * @param {String[]} query_stack Путь поля в памяти
     * @param {ExpressionGroup} value Данные которые нужно устновить
     *
     * @constructs PushStatement
     * @memberof Poonya.Statements
     * @protected
     */
    constructor(position, query_stack, value) {
        super();

        this.query_stack = query_stack;
        this.position = position;
        this.value = value;
    }

    /**
     * @see iStatement.__sync
     * 
     * @param {Function} reject функция выбрасывания исключений
     * 
     * @method
     * @returns {ResetStatement}
     */
    __sync(reject) {
        this.value.__sync(reject);

        for(const elem of this.query_stack) {
            if(elem instanceof Operand) {
                elem.__sync(reject);
            }
        }

        return this;
    }

    /**
     * @see iStatement.__executable
     * 
     * @returns {Array<SequenceGroup>} список исполняемых блоков
     * @method
     */
     __executable(){
        return new Array();
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @returns {String} Строковое представление переопределения переменной
     * @public
     * @method
     */
    toString(indent) {
        return (
            '(' +
            this.query_stack.map(e => (typeof e === 'number' || e instanceof Operand ? `[${e.toString(indent)}]` : e)).join(' => ') +
            ') = ' +
            this.value.toString(indent + '\t')
        );
    }

    /**
     * Производит переопределение перемнной
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
        let _ = this,
            target = context,
            query_stack = Array.from(_.query_stack),
            leng = query_stack.length,
            index = 0;

        function get(of_p) {
            if(++index < leng){
                if (target instanceof PoonyaObject) {
                    target = target.get(of_p, context);
                } else if(target instanceof iContext){
                    target = target.get(of_p);
                } else if (target instanceof iPoonyaPrototype) {
                    target = target[GET](of_p, context);
                } else {
                    reject(_.position, new GetFieldOfNullException(of_p));
                }
            
                next();
            } else {
                if (target instanceof iPoonyaObject || target instanceof iContext) {
                    _.value.result(context, out, reject, value => {
                        if(target instanceof iContext) {
                            if(target.has(of_p)) {
                                target.set(of_p, value);
                            } else {
                                reject(_.position, new TheFieldNotHasDeclaredExceprion(of_p));
                            }
                        } else {
                            target.set(context, of_p, value);
                        }
                        
                        Tick(resolve, value);
                    });
                } else
                    reject(_.position, new GetFieldOfNullException(query_stack[index - 1]));
            }
        }

        function next(){
            if (query_stack[index] instanceof ExpressionGroup)
                query_stack[index].result(context, null, reject, result => get(result.toRawData()));
            else
                get(query_stack[index]);
        }

        next();
    }
}

module.exports = ResetStatement;

/**
 * @file src/classes/excecution/statements/PushStatement.js
 * @description Содержит в себе оператор вставки, который используется для обновления массива, путем вставки в его конец значения
 * @author Astecom
 * @license MIT
 */

"use strict";

const { Tick } = require('../../../utils')
    , { TheFieldMustBeAnArrayInstanceExceprion } = require('../../exceptions')
    , { iStatement } = require('../../interfaces')
    , { Operand } = require('../../common/ParserData')
    , PoonyaArray = require('../../data/PoonyaArray');

/**
 * @lends PushStatement
 * @protected
 */
class PushStatement extends iStatement {
    /**
     * Объект который Сериализуется как var_name <- (expression...)
     * Это опреатор для работы с массивами, и он заменяет свойство push
     *
     * @param {Number} position Позиция в начала оператора во входящих данных
     * @param {String[]} query_stack Путь к полю которое поле получит
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
     * @returns {PushStatement}
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
     * @returns {String} Строковое представление добавления элемента в массив (операция push)
     * @public
     * @method
     */
    toString(indent) {
        return (
            '(' +
                this.query_stack.map(e => (typeof e === 'number' ? `[${e}]` : e)).join(' => ') +
            ') <- ' +
                this.value.toString(indent + '\t')
        );
    }

    /**
     * Производит добавление значения `value` в массив который должен быть передан как левый операнд
     *
     * @param {iContext} context Контекст выполнения
     * @param {PoonyaOutputStream} out вывод шаблонизатора
     * @param {Function} reject Вызывается при ошибке
     * @param {Function} resolve функция возврата результата
     *
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, reject, resolve) {
        const _ = this;

        context.getByPath(_.query_stack, _.position, PoonyaArray, reject, false, array => {
            if(array != null){
                _.value.result(context, out, reject, result => {
                    array.push(context, result);

                    Tick(resolve, result);
                });
            } else {
                reject(
                    _.position,
                    new TheFieldMustBeAnArrayInstanceExceprion(_.query_stack[0])
                );
            }
        });
    }
}

module.exports = PushStatement;
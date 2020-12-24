/**
 * @file src/classes/excecution/statements/PushStatement.js
 * @description Содержит в себе оператор вставки, который используется для обновления массива, путем вставки в его конец значения
 * @author Astecom
 * @license MIT
 */

"use strict";

const ExpressionGroup = require('../expression/ExpressionGroup'),
    {
        TheFieldMustBeAnArrayInstanceExceprion,
        GetFieldOfNullException,
    } = require('../../exceptions')
    ,   PoonyaArray = require('../../data/PoonyaArray')
    ,   PoonyaObject = require('../../data/PoonyaObject');

/**
 * @lends PushStatement
 * @protected
 */
class PushStatement {
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
        this.query_stack = query_stack;
        this.position = position;
        this.value = value;
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
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @throws {Exceptions.ParserException}
     *
     * @public
     * @method
     */
    result(context, out, throw_error) {
        let query_data = context.get(this.query_stack[0]),
            query_stack = [...this.query_stack];

        if (query_data instanceof PoonyaObject) {
            let index = 1;

            for (let leng = query_stack.length; query_data && index < leng; index++) {
                if (query_stack[index] instanceof ExpressionGroup)
                    query_stack[index] = query_stack[index]
                        .result(context, out, throw_error)
                        .toRawData();

                query_data = query_data.get(query_stack[index]) || null;
            }

            if (query_data instanceof PoonyaArray)
                query_data.push(context, this.value.result(context, out, throw_error));
            else
                throw_error(
                    this.position,
                    new TheFieldMustBeAnArrayInstanceExceprion(query_stack[index - 1])
                );
        } else throw_error(this.position, new GetFieldOfNullException(query_stack[0]));
    }
}

module.exports = PushStatement;

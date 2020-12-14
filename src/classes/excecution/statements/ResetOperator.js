/**
 * @file src/classes/excecution/statements/ResetOperator.js
 * @description Содержит в себе оператор обновления значения переменной
 * @author Astecom
 * @license MIT
 */

const ExpressionGroup = require('../expression/ExpressionGroup')
    , { iPoonyaObject } = require('../../interfaces')
    , { TheFieldNotHasDeclaredExceprion, GetFieldOfNullException } = require('../../exceptions');

/**
 * @lends ResetOperator
 * @protected
 */
class ResetOperator {
    /**
     * Производит переустновку значения переменной переданной как левой операнд на выражение, которое передано как правый операнд.
     * Объект который сериализуется как name = (...expression)
     *
     * @param {Number} position Позиция в начала оператора во входящих данных
     * @param {String[]} query_stack Путь поля в памяти
     * @param {ExpressionGroup} value Данные которые нужно устновить
     *
     * @constructs PushOperator
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
     * @returns {String} Строковое представление переопределения переменной
     * @public
     * @method
     */
    toString(indent) {
        return (
            '(' +
            this.query_stack.map(e => (typeof e === 'number' ? `[${e}]` : e)).join(' => ') +
            ') = ' +
            this.value.toString(indent + '\t')
        );
    }

    /**
     * Производит переопределение перемнной
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
        let query_data = context.get(this.query_stack[0]),
            query_stack = [...this.query_stack];

        if (query_stack.length > 1) {
            let index = 1;

            for (let leng = query_stack.length - 1; query_data && index < leng; index++) {
                if (query_stack[index] instanceof ExpressionGroup)
                    query_stack[index] = query_stack[index]
                        .result(context, out, throw_error)
                        .toRawData();

                query_data = query_data.get(query_stack[index]) || null;
            }

            if (query_data instanceof iPoonyaObject) {
                const last_index = query_stack[query_stack.length - 1];

                query_data.set(
                    context,
                    last_index instanceof ExpressionGroup
                        ? last_index.result(context, out, throw_error).toRawData()
                        : last_index,
                    this.value.result(context, out, throw_error)
                );
            } else throw_error(this.position, new GetFieldOfNullException(query_stack[index]));
        } else {
            if (query_data != null)
                context.set(query_stack[0], this.value.result(context, out, throw_error));
            else throw_error(this.position, new TheFieldNotHasDeclaredExceprion(query_stack[0]));
        }
    }
}

module.exports = ResetOperator;

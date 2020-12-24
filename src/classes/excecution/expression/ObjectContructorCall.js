/**
 * @file src/classes/excecution/expression/ObjectContructorCall.js
 * @description Содержит в конструктор объекта который сериализуется как
 *  Object ->
 *      field -> value...
 * @author Astecom
 * @license MIT
 */

"use strict";

const { Operand } = require('../../common/ParserData');

/**
 * @lends ObjectContructorCall
 * @protected
 */
class ObjectContructorCall extends Operand {
    /**
     * Литеральный конструктор объекта
     *
     * @param {String[]} query_stack путь к конструктору в памяти
     * @param {Map<String, ExpressionGroup>|String|Number|Boolean|BigInt} initial данные объекта для инициализации
     * @param {Number} position позиция начала объявления объекта
     *
     * @constructs ObjectContructorCall
     * @extends Operand
     * @memberof Poonya.Expression
     * @protected
     */
    constructor(query_stack, initial, position) {
        super('object-creator');

        this.query_stack = query_stack != null ? query_stack : SERVICE.CONSTRUCTORS.OBJECT;
        this.initial = initial;
        this.position = position;
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @param {String} indent отступ слева, для более понятного отображения кода
     * @returns {String} Строковое представление выражения while
     * @public
     * @method
     */
    toString(indent = '\t') {
        if (this.initial instanceof Map) {
            const items = [...this.initial.entries()];

            return (
                'new (' +
                this.query_stack
                    .map(e => (typeof e !== 'string' ? `[${e.toString()}]` : e.toString()))
                    .join(' => ') +
                ') -> ' +
                    (
                        items.length > 0 ? (
                            '\n' + items.map((e, i) => {
                                if (e[1] instanceof ObjectContructorCall)
                                    return indent + e[0] + ' -> ' + e[1].toString(indent + '\t');
                                else
                                    return (
                                        indent +
                                        e[0] +
                                        ' -> ' +
                                        e[1].toString(indent + '\t') +
                                        (i + 1 != items.length ? ',' : '')
                                    );
                            })
                            .join('\n')
                        ) : '*'
                    )
            );
        } else {
            return `(${this.initial}) <- (${this.query_stack
                .map(e => (typeof e !== 'string' ? `[${e.toString()}]` : e.toString()))
                .join(' => ')})`;
        }
    }

    /**
     * Коздает новый объект с инициированным значением `initial`
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
        return context.createObject(this.initial, this.position, this.query_stack, throw_error);
    }
}

module.exports = ObjectContructorCall;
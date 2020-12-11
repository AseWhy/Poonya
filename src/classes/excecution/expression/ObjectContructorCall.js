/**
 * @file src/classes/excecution/expression/ObjectContructorCall.js
 * @description Содержит в конструктор объекта который сериализуется как
 *  Object ->
 *      field -> value...
 * @author Astecom
 * @license MIT
 */

const { Operand } = require("../../common/ParserData")
    , { IS } = require('../../static')
    , { iPoonyaPrototype } = require('../../interfaces')
    , { IsNotAConstructorException } = require('../../exceptions')
    , PoonyaObject = require('../../data/PoonyaObject')
    , PoonyaArray = require('../../data/PoonyaArray');

/**
 * @lends ObjectContructorCall
 * @protected
 */
class ObjectContructorCall extends Operand {
    /**
     * Литеральный конструктор объекта
     *
     * @param {String[]} query_stack путь к конструктору в памяти
     * @param {Map<String, ExpressionGroup>} fields поля объекта при инициализации
     * @param {Number} position позиция начала объявления объекта
     *
     * @constructs ObjectContructorCall
     * @extends Operand
     * @memberof Poonya.Expression
     * @protected
     */
    constructor(query_stack = 'Object', fields, position) {
        super('object-creator');

        this.query_stack = query_stack != null ? query_stack : SERVICE.CONSTRUCTORS.OBJECT;
        this.fields = fields;
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
    toString(indent) {
        const items = [...this.fields.entries()];

        return (
            "new (" + this.name + ") -> \n" +
            items.map((e, i) => {
                if (e[1] instanceof ObjectContructorCall)
                    return indent + e[0] + ' -> ' + e[1].toString(indent + '\t');

                else
                    return indent + e[0] + ' -> ' + e[1].toString(indent + '\t') + (i + 1 != items.length ? ',' : '');
            }).join('\n')
        );
    }

    /**
     * Выполняет основной блок, до тех пор, пока выполняется условие переданное первым аргументом
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
        const proto = context.getByPath(this.query_stack, this.position, iPoonyaPrototype);

        if (proto != null) {
            let instance = new (proto[IS]('Array') ? PoonyaObject : PoonyaArray)(proto, null, context);

            for (let fieled of this.fields) {
                instance.set(fieled[0], fieled[1].result(context, out, throw_error));
            }

            return instance;
        } else {
            throw_error(this.position, new IsNotAConstructorException(this.query_stack));
        }
    }
}

module.exports = ObjectContructorCall;
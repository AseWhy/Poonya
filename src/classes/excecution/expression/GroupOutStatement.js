/**
 * @file src/classes/excecution/expression/GroupOutStatement.js
 * @description Содержит в себе оператор группового вывода {}
 * @author Astecom
 */

"use strict";

const { Operand } = require("../../common/ParserData")
    , { Tick, Cast } = require("../../../utils")
    , { iPoonyaPrototype } = require("../../interfaces")
    , { FieldNotAFunctionException } = require("../../exceptions")
    , PoonyaOutputStream = require("../../common/PoonyaOutputStream")
    , NativeFunction = require("../../data/NativeFunction");

/**
 * @lends GroupOutStatement
 * @protected
 */
class GroupOutStatement extends Operand {
    /**
     * Литеральный блок группового вывода
     *
     * @param {SequenceGroup} body Основная исполняемая последовательность
     * @param {Function} query_stack путь к функции форматтера (функция которая будет форматировать вывод)
     * @param {Number} position позиция вызова
     *
     * @constructs GroupOutStatement
     * @extends Operand
     * @memberof Poonya.Expression
     * @protected
     */
    constructor(body, query_stack, position) {
        super('group-output');

        this.query_stack = query_stack != null ? [ ...query_stack ] : null;
        this.position = position;
        this.body = body;

        this.body.interrupted();
    }

    /**
     * Синхронизирует значение группы с родительской группой
     * 
     * @param {Function} функция выбрасывания исключений
     * 
     * @override
     * @method
     * @returns {GroupOutStatement}
     */
     __sync(reject){
         if(this.query_stack != null) {
            for(const elem of this.query_stack) {
                if(elem instanceof Operand) {
                    elem.__sync(reject);
                }
            }
        }

        this.body.__sync(reject);

        return this;
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @param {String} indent отступ слева, для более понятного отображения кода
     * @returns {String} Строковое представление выражения if
     * @public
     * @method
     */
    toString(indent) {
        return (this.query_stack ? '(' + this.query_stack.join(' => ') + ') <- ' : '') + this.body.toString(indent);
    }

    /**
     * Начинает вывод файл
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
        const _ = this
            , stream_mask = new PoonyaOutputStream();

        _.body.result(context, stream_mask, reject, () => {
            if(_.query_stack == null) {
                Tick(Cast.bind(null, stream_mask._data, context, [], resolve));
            } else {
                context.getByPath(_.query_stack, _.position, null, reject, true, result => {
                    if (result.instance instanceof NativeFunction) {
                        result.instance.result(
                            result.parent, 
                            stream_mask._data, 
                            context, 
                            out, 
                            _.position,
                            reject, 
                            resolve
                        );
                    } else if (result.instance instanceof iPoonyaPrototype)
                        reject(_.position, new UnableToCreateAnObjectException());
                    else {
                        reject(_.position, new FieldNotAFunctionException(_.query_stack[_.query_stack.length - 1]));
                    }
                });
            }
        })
    }
}

module.exports = GroupOutStatement;

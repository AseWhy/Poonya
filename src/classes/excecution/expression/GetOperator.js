/**
 * @file src/classes/excecution/expression/GetOperator.js
 * @description Содержит в себе оператор получения значения по индексам
 * @author Astecom
 */

"use strict";

const { Operand } = require('../../common/ParserData')
    , { SERVICE, FIELDFLAGS } = require('../../static')
    ,   NativeFunction = require('../../data/NativeFunction');

/**
 * @lends GetOperator
 * @protected
 */
class GetOperator extends Operand {
    /**
     * Данные вызова шаблона, если передать в heap шаблон, то он выполнится с текущей памятью
     *
     * @param {CodeEmitter} эмиттер который будет исполнятся при сполнении этого выхождения
     *
     * @constructs GetOperator
     * @extends Operand
     * @memberof Poonya.Expression
     * @protected
     */
    constructor(position, stack) {
        super('get');

        this.position = position;
        this.query_stack = stack;
    }

    /**
     * Синхронизирует значение группы с родительской группой
     * 
     * @param {Function} функция выбрасывания исключений
     * 
     * @override
     * @method
     * @returns {GetOperator}
     */
     __sync(reject){
        for(const elem of this.query_stack) {
            if(elem instanceof Operand) {
                elem.__sync(reject);
            }
        }

        return this;
    }

    /**
     * Получает переменную заданную литералами
     *
     * @param {iContext} context Контекст выполнения
     * @param {PoonyaOutputStream} out вывод шаблонизатора
     * @param {Function} reject Вызывается при ошибке
     * @param {Function} resolve Вызывается при успешном получении значения
     *
     * @returns {Any} В зависимости от типа запрашиваемых данных
     * @throws {ParserException}
     *
     * @public
     * @method
     */
    result(context, out, reject, resolve) {
        context.getByPath(this.query_stack, this.position, null, reject, true, result => {
            if (result.instance != null)
                if(result.instance instanceof NativeFunction)
                    if((result.flags & FIELDFLAGS.PROPERTY) != 0)
                        return result.instance.result(result.parent, [], context, out, this.position, reject, resolve);
                    else
                        return context.createObject(`[NativeCode:${result.instance.name}]`, this.position, SERVICE.CONSTRUCTORS.STRING, reject, new Array(), resolve);
                else
                    resolve(result.instance);
            else
                context.createObject(null, this.position, SERVICE.CONSTRUCTORS.NULL, reject, new Array(), resolve);
        });
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @returns {String} Строковое представление получения доступа к полям
     * @public
     * @method
     */
    toString() {
        return '(' + this.query_stack.join(' => ') + ')';
    }
}

module.exports = GetOperator;

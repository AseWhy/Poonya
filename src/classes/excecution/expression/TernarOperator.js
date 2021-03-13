/**
 * @file src/classes/excecution/expression/TernarOperator.js
 * @description Содержит в себе тернарный оператор, который сериализуется как <condition> ? <v1> : <v2>
 * @author Astecom
 */

"use strict";

const { Operand } = require('../../common/ParserData');

/**
 * @lends TernarOperator
 * @protected
 */
class TernarOperator extends Operand {
    /**
     * Создает тернарные оператор
     *
     * @param {ExpressionGroup} condition Выражение условие
     * @param {ExpressionGroup} v1 Выражение, если истина
     * @param {ExpressionGroup} v2 Выражение, если ложь
     *
     * @constructs TernarOperator
     * @extends Operand
     * @memberof Poonya.Expression
     * @protected
     */
    constructor(condition, v1, v2) {
        super('ternar');

        this.condition = condition;
        this.v_o = v1;
        this.v_t = v2;
    }

    /**
     * Синхронизирует значение группы с родительской группой
     * 
     * @param {Function} функция выбрасывания исключений
     * 
     * @override
     * @method
     * @returns {TernarOperator}
     */
     __sync(reject){
        condition.__sync(reject);
        v_o.__sync(reject);
        v_t.__sync(reject);

        return this;
    }

    /**
     * Сериализует текущий объект в строку
     *
     * @returns {String} Строковое представление теранарного оператора
     * @public
     * @method
     */
    toString(indent) {
        return (
            '< ' + this.condition.toString(indent + '\t') + ' > ? ' + this.v_o + ' : ' + this.v_t
        );
    }

    /**
     * Выполняет теранарный оператор
     *
     * @param {iContext} context Контекст выполнения
     * @param {PoonyaOutputStream} out вывод шаблонизатора
     * @param {Function} reject Вызывается при ошибке
     * @param {Function} resolve Вызывается при завершении выполнения тернарного выражения
     *
     * @throws {ParserException}
     *
     * @public
     * @method
     */
    result(context, out, reject, resolve) {
        const _ = this;

        _.condition.result(context, out, reject, result => {
            if (context.toBooleanResult(result))
                _.v_o.result(context, out, reject, resolve);
            else 
                _.v_t.result(context, out, reject, resolve);
        });
    }
}

module.exports = TernarOperator;

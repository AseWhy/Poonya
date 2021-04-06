/**
 * @file src/classes/excecution/statements/SetStatement.js
 * @description Содержит в себе оператор set, который используется для устновки значения в области памяти
 * @author Astecom
 */

"use strict";

const { TheFieldAlreadyHasBeenDeclaredException } = require('../../exceptions')
    , { Tick } = require('../../../utils')
    , { iStatement } = require('../../interfaces');

/**
 * @lends SetStatement
 * @protected
 */
class SetStatement extends iStatement {
    /**
     * Объект который Сериализуется как set = (expression...)
     *
     * @param {String} name поле, которое нужно установить в текущем контексте
     * @param {ExpressionGroup} value Значение, которое поле получит после выполнения этого вхождения
     *
     * @constructs SetStatement
     * @memberof Poonya.Statements
     * @protected
     */
    constructor(name, value) {
        super();

        this.name = name.toString();
        this.position = name.position;
        this.value = value;
    }

    /**
     * @see iStatement.__sync
     * 
     * @param {Function} reject функция выбрасывания исключений
     * 
     * @method
     * 
     * @returns {SetStatement}
     */
    __sync(reject) {
        this.value.__sync(reject);

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
     * @returns {String} Строковое представление устновки значения переменной
     * @public
     * @method
     */
    toString(indent) {
        return 'set ' + this.name + ' = ' + this.value.toString(indent + '\t');
    }

    /**
     * Производит установку значения переменной в текущем контексте
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
        const _ = this;

        if (!context.has(_.name, 'up')) {
            _.value.result(context, out, reject, result => {
                context.set(_.name, result, 'up');

                Tick(resolve, result);
            });
        } else {
            reject(_.position, new TheFieldAlreadyHasBeenDeclaredException(_.name));
        }
    }
}

module.exports = SetStatement;

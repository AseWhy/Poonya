/**
 * @file src/classes/excecution/statements/SequenceMainGroup.js
 * @description Содержит в себе оператор главную сполняемую группу, т.е. группу которая явлся родетелем дочерних исполняемых групп, при нормальных условиях.
 * @author Astecom
 */

"use strict";

const { Tick } = require("../../../utils")
    , { iStatement } = require("../../interfaces")
    , { UnexpectedTokenException } = require("../../exceptions")
    ,   BreakStatement = require("./BreakStatement")
    ,   ContinueStatement = require("./ContinueStatement");

/**
 * @lends SequenceMainGroup;
 * @protected
 */
class SequenceMainGroup extends iStatement {
    /**
     * Главная исполняемая последовательность
     *
     * @param {Array} init Данные для инициалзации
     *
     * @constructs SequenceMainGroup
     * @memberof Poonya.Statements
     * @protected
     */
    constructor(init) {
        super();

        this.Sequence = Array.isArray(init) ? init : new Array();
    }

    /**
     * !! Это главная группа, этот метод должен быть вызван сразу после окончания формирования группы !!
     * 
     * @see iStatement.__sync
     * 
     * @param {Function} reject функция выбрасывания исключений
     * 
     * @method
     * 
     * @returns {SequenceMainGroup}
     */
    __sync(reject) {
        for(const elem of this.Sequence) {
            for(const block of elem.__executable()) {
                if(this.can_break) 
                    block.interrupted();

                if(this.can_continue) 
                    block.continued();

                if(this.can_return) 
                    block.terminable();
            };

            if(elem instanceof BreakStatement)
                reject(elem.position, new UnexpectedTokenException('break'));

            if(elem instanceof ContinueStatement)
                reject(elem.position, new UnexpectedTokenException('continue'));
            
            elem.__sync(reject);
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
     * Добавляет элемент в стэк
     *
     * @param {Any} elem То что добавляем в стэк исполнения
     *
     * @public
     * @method
     */
    push(elem) {
        this.Sequence.push(elem);
    }

    /**
     * Выполняет текущую последовательность
     *
     * @param {iContext} context Контекст выполнения
     * @param {PoonyaOutputStream} out вывод шаблонизатора
     * @param {Function} reject Вызывается при ошибке
     * @param {Function} resolve функция возврата результата
     *
     * @public
     * @method
     */
    result(context, out, reject, resolve) {
        let _ = this, i = 0, leng = _.Sequence.length;

        function next(result){
            Tick(tick, result);
        }

        function tick(result){
            if(i >= leng){
                if(result && typeof result.result === 'function') {
                    result.result(context, out, reject, p_result => {
                        Tick(resolve, p_result);
                    });
                } else {
                    Tick(resolve, result);
                }

                return;
            }

            _.Sequence[i++].result(context, out, reject, next);
        }

        tick();
    }

    /**
     * Сериализует текущую группу в текст
     *
     * @param {String} indent отступ слева, для лучшей читаемости
     * @returns {String} отфрматированный текст
     */
    toString(indent = '\t') {
        return `{\n${indent}${this.Sequence.map(e => e.toString(indent + '\t')).join(
            '\n\n' + indent
        )}\n${indent.substring(0, indent.length - 1)}}`;
    }
}

module.exports = SequenceMainGroup;

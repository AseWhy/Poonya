/**
 * @file src/classes/excecution/statements/SequenceGroup.js
 * @description Содержит в себе дочернуюю исполняемую группу, которая, при нормальных услвиях, является чустью главной исполняемой группы.
 * @author Astecom
 */

"use strict";

const { Tick } = require("../../../utils")
    , { iStatement } = require("../../interfaces")
    , { UnexpectedTokenException } = require("../../exceptions")
    , BreakStatement = require("./BreakStatement")
    , ContinueStatement = require("./ContinueStatement");

/**
 * @lends SequenceGroup;
 * @protected
 */
class SequenceGroup extends iStatement {
    /**
     * Исполняемая последовательность
     * 
     * @param {Boolean} can_break можно ли завершить это выражение оператором break
     * @param {Boolean} can_continue можно ли завершить это выражение оператором continue
     * @param {Boolean} can_return можно ли завершить это выражение оператором return
     *
     * @constructs SequenceGroup
     * @memberof Poonya.Statements
     * @protected
     */
    constructor(can_break = false, can_continue = false, can_return = false) {
        super();

        this.Sequence = new Array();
        this.can_break = can_break;
        this.can_continue = can_continue;
        this.can_return = can_return;
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
     * Синхронизирует флаги родительской группы с дочерними
     * 
     * @param {Function} reject функция выбрасывания исключений
     * 
     * @method
     * 
     * @returns {SequenceGroup}
     */
    __sync(reject){
        for(const elem of this.Sequence) {
            for(const block of elem.__executable()) {
                if(this.can_break) 
                    block.interrupted();

                if(this.can_continue) 
                    block.continued();

                if(this.can_return) 
                    block.terminable();
            };

            if(elem instanceof BreakStatement && !this.can_break)
                reject(elem.position, new UnexpectedTokenException('break'));

            if(elem instanceof ContinueStatement && !this.can_continue)
                reject(elem.position, new UnexpectedTokenException('continue'));

            elem.__sync(reject);
        }

        return this;
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
        // 
        // Проталкиваю нужное мне выражение в общую группу
        // 
        this.Sequence.push(elem);
    }

    /**
     * Ставит флаг на последовательности, что её можно прервать оператором breack
     * 
     * @public
     * @method
     */
    interrupted() {
        this.can_break = true;
    }

    /**
     * Ставит флаг на последовательности, что последовательность можно превать оператором continue
     * 
     * @public
     * @method
     */
    continued() {
        this.can_continue = true;
    }

    /**
     * Ставит флаг на последовательности, что последовательность можно превать оператором return
     * 
     * @public
     * @method
     */
    terminable() {
        this.can_return = true;
    }

    /**
     * Выполняет текущую последовательность
     *
     * @param {iContext} context Контекст выполнения
     * @param {PoonyaOutputStream} out вывод шаблонизатора
     * @param {Function} reject Вызывается при ошибке
     * @param {Function} resolve функция возврата результата
     * @param {Boolean} level_ops Если true, то операции с уровнями памяти будут происходить автоматически
     *
     * @public
     * @method
     */
    result(context, out, reject, resolve, level_ops = true) {
        let _ = this, i = 0, leng = _.Sequence.length;

        if (level_ops)
            context.addLevel();

        function next(result){
            Tick(tick, result);
        }

        function tick(result){
            if(
                i >= leng ||
                result instanceof BreakStatement && _.can_break ||
                result instanceof ContinueStatement && _.can_continue
            ){
                if (level_ops)
                    context.popLevel();

                Tick(resolve, result);

                return;
            }

            _.Sequence[i++].result(context, out, reject, next);
        }

        tick(null);
    }

    /**
     * Сериализует текущую группу в текст
     *
     * @param {String} indent отступ слева, для лучшей читаемости
     * @returns {String} отфрматированный текст
     */
    toString(indent = 0) {
        return `{\n${indent}${this.Sequence.map(e => e.toString(indent + '\t')).join(
            '\n\n' + indent
        )}\n${indent.substring(0, indent.length - 1)}}`;
    }
}

module.exports = SequenceGroup;

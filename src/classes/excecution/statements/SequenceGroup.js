/**
 * @file src/classes/excecution/statements/SequenceGroup.js
 * @description Содержит в себе дочернуюю исполняемую группу, которая, при нормальных услвиях, является чустью главной исполняемой группы.
 * @author Astecom
 */

"use strict";

const { Tick } = require("../../../utils");

/**
 * @lends SequenceGroup;
 * @protected
 */
class SequenceGroup {
    /**
     * Исполняемая последовательность
     *
     * @constructs SequenceGroup
     * @memberof Poonya.Statements
     * @protected
     */
    constructor() {
        this.Sequence = new Array();
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
    result(context, out, reject, resolve, level_ops = true) {
        let _ = this, i = 0, leng = _.Sequence.length;

        if (level_ops)
            context.addLevel();

        function next(result){
            Tick(tick, result);
        }

        function tick(result){
            if(i >= leng){
                if (level_ops)
                    context.popLevel();
                
                Tick(resolve, result);

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
    toString(indent = 0) {
        return `{\n${indent}${this.Sequence.map(e => e.toString(indent + '\t')).join(
            '\n\n' + indent
        )}\n${indent.substring(0, indent.length - 1)}}`;
    }
}

module.exports = SequenceGroup;

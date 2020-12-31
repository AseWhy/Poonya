/**
 * @file src/classes/excecution/statements/SequenceGroup.js
 * @description Содержит в себе дочернуюю исполняемую группу, которая, при нормальных услвиях, является чустью главной исполняемой группы.
 * @author Astecom
 */

"use strict";

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
     * @param {Function} throw_error Вызывается при ошибке
     *
     * @public
     * @method
     */
    result(context, out, throw_error, level_ops = true) {
        if (level_ops) context.addLevel();

        for (let i = 0, leng = this.Sequence.length; i < leng; i++) {
            this.Sequence[i].result(context, out, throw_error);
        }

        if (level_ops) context.popLevel();
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

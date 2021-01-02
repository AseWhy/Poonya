/**
 * @file src/classes/excecution/statements/SequenceMainGroup.js
 * @description Содержит в себе оператор главную сполняемую группу, т.е. группу которая явлся родетелем дочерних исполняемых групп, при нормальных условиях.
 * @author Astecom
 */

"use strict";

/**
 * @lends SequenceMainGroup;
 * @protected
 */
class SequenceMainGroup {
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
        this.Sequence = Array.isArray(init) ? init : new Array();
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

        (function tick(result){
            if(i >= leng){
                if(result && typeof result.result === 'function') {
                    result.result(context, out, reject, p_result => {
                        resolve(p_result);
                    });
                } else {
                    resolve(result);
                }

                return;
            }

            _.Sequence[i++].result(context, out, reject, tick);
        })();
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

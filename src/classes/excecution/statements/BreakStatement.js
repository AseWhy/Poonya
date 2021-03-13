/**
 * @file src/classes/excecution/statements/BreakStatement.js
 * @description Содержит в себе оператор break, который используется для прерывания итераций массивов, и выхода из группового вывода
 * @author Astecom
 */

const { Tick } = require("../../../utils")
    , { iStatement } = require("../../interfaces");

/**
 * @lends BreakStatement
 * @protected
 */
class BreakStatement extends iStatement {
    /**
     * Дескриптор оператора break
     *
     * @param {Number} position позиция оператора
     *
     * @constructs BreakStatement
     * @memberof Poonya.Statements
     * @protected
     */
    constructor(position){
        super();

        this.position = position;
    }

    /**
     * @see iStatement.__sync
     * 
     * @param {Function} reject функция выбрасывания исключений
     * 
     * @method
     * @returns {BreakStatement}
     */
    __sync(reject) {
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
     * Преобразовывет оператор break  в строку
     * 
     * @returns {String} строкове представление оператора
     */
    toString(){
        return 'break;';
    }

    /**
     * Выполняет прерывание перебора
     * 
     * @returns {BreakStatement}
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
        Tick(resolve, this);
    }
}

module.exports = BreakStatement;
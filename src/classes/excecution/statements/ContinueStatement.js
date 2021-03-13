/**
 * @file src/classes/excecution/statements/ContinueStatement.js
 * @description Содержит в себе оператор continue, который используется для перехода к следующей итерации
 * @author Astecom
 */

const { iStatement } = require("../../interfaces")
    , { Tick } = require('../../../utils');

/**
 * @lends ContinueStatement
 * @protected
 */
class ContinueStatement extends iStatement {
    /**
     * Дескриптор оператора continue
     *
     * @param {Number} position позиция оператора
     *
     * @constructs ContinueStatement
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
     * @returns {ContinueStatement}
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
     * Преобразовывет оператор continue в строку
     * 
     * @returns {String} строкове представление оператора
     */
    toString(){
        return 'continue;';
    }
    
    /**
     * Выполняет переход к следующей итерации цикла
     * 
     * @returns {ContinueStatement}
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

module.exports = ContinueStatement;
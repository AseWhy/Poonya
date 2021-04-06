/**
 * @file src/classes/excecution/statements/UseStatement.js
 * @description Содержит в себе оператор use, который используется для иморта статической библиотеки в текущий контекст
 * @author Astecom
 */

const { Tick } = require("../../../utils")
    , { iStatement } = require("../../interfaces")
    , { Import } = require("../../../importer")
    , { CannotImportStaticLibrary } = require("../../exceptions")
    ,   ExpressionGroup = require("../expression/ExpressionGroup");

/**
* @lends UseStatement
* @protected
*/
class UseStatement extends iStatement {
    /**
     * Дескриптор оператора break
     *
     * @param {Number} position позиция оператора
     * @param {ExpressionGroup} libraries имя бибилиотеки для иморта
     * 
     * @constructs UseStatement
     * @memberof Poonya.Statements
     * @protected
     */
    constructor(position, libraries) {
        super();

        this.libraries = libraries;
        this.position = position;
    }

    /**
     * @see iStatement.__sync
     * 
     * @method
     * @returns {UseStatement}
     */
    __sync() {
        return this;
    }

    /**
     * @see iStatement.__executable
     * 
     * @returns {Array<SequenceGroup>} список исполняемых блоков
     * @method
     */
    __executable() {
        return new Array();
    }

    /**
     * Преобразовывет оператор break  в строку
     * 
     * @param {String} indent отступ слева
     * 
     * @returns {String} строкове представление оператора
     */
    toString(indent) {
        return 'use ' + this.libraries.toString(indent) + ';';
    }

    /**
     * Выполняет прерывание перебора
     * 
     * @returns {UseStatement}
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
        this.libraries.result(context, out, reject, result => {
            result.result(context, out, reject, d_result => {
                const libraries = new Array();

                if(Array.isArray(d_result)) {
                    libraries.push(...d_result.map(e => e != null ? e.toString() : 'null').filter(e => e != null));
                } else {
                    if(d_result != null) {
                        libraries.push(d_result.toString());
                    }
                }

                const imports = Import(libraries).filter(e => e != null);

                if(imports.length != libraries.length) {
                    const imported = imports.map(e => e.name);

                    reject(this.position, new CannotImportStaticLibrary(libraries.filter(e => !imported.includes(e))));
                }

                context.import(imports, reject, false);

                Tick(resolve);
            })
        });
    }
}

module.exports = UseStatement;
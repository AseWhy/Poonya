/**
 * @file src/interfaces.js
 * @description Тут собраны интерфейсы, для боллее удобного последующего сравнения объектов
 * @author Astecom
 */

"use strict";

// Storage
class iContext {}

// Datas
class iPoonyaObject {}
class iPoonyaPrototype {}

// Poonya interfaces

/**
 * @lends iPoonyaConstructsData
 * @interface iPoonyaConstructsData
 */
class iPoonyaConstructsData {
    /**
     * Интерфейс ответа функции кострукирующий шаблон, на основе промисов - `patternCreator`
     * 
     * @constructs iPoonyaConstructsData
     * @property {CodeEmitter} Pattern шаблон, который должен быть создан
     * @property {Array<Any>} args аргументы возвращенные по завершении инициализации шаблона
     */
    constructor(){}
}

module.exports.iContext = iContext;
module.exports.iPoonyaObject = iPoonyaObject;
module.exports.iPoonyaPrototype = iPoonyaPrototype;
module.exports.iPoonyaConstructsData = iPoonyaConstructsData;
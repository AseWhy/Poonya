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
     * @property {CodeEmitter} data шаблон, который должен быть создан
     * @property {Array<Any>} args аргументы возвращенные по завершении инициализации шаблона
     */
    constructor(){}
}

/**
 * @lends iPathData
 * @interface iPathData
 */
class iPathData {
    /**
     * Интерфейс описывающий возвращаемые контекстом данные при поиске пути
     * 
     * @constructs iPathData
     * @property {ParserData} instance найденое значение
     * @property {PoonyaObject|iPoonyaPrototype} parent родительский объект, если это поле объекта
     * @property {Number} index глубина поиска
     */
    constructor(){}
}

module.exports.iContext = iContext;
module.exports.iPathData = iPathData;
module.exports.iPoonyaObject = iPoonyaObject;
module.exports.iPoonyaPrototype = iPoonyaPrototype;
module.exports.iPoonyaConstructsData = iPoonyaConstructsData;
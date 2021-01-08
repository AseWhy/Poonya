/**
 * @file src/interfaces.js
 * @description Тут собраны интерфейсы, для боллее удобного последующего сравнения объектов
 * @author Astecom
 */

"use strict";

// Poonya
class iCodeEmitter {}

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

/**
 * @lends iInputData
 * @interface iInputData
 */
class iInputData {
    /**
     * Интерфейс описывающий возвращаемые контекстом данные при поиске пути
     * 
     * @constructs iInputData
     * @property {?String} raw Ввод шаблонизатора
     * @property {?String} path Путь к файлу(необязательно, если переданы сырые данные). Путь к файлу указывается относительно файла, из которого был импортирован poonya
     * @property {?String} charset кодировка файла, по умолчанию это utf-8
     */
    constructor(){}
}

module.exports.iContext = iContext;
module.exports.iPathData = iPathData;
module.exports.iInputData = iInputData;
module.exports.iCodeEmitter = iCodeEmitter;
module.exports.iPoonyaObject = iPoonyaObject;
module.exports.iPoonyaPrototype = iPoonyaPrototype;
module.exports.iPoonyaConstructsData = iPoonyaConstructsData;
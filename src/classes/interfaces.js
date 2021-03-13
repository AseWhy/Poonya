/**
 * @file src/interfaces.js
 * @description Тут собраны интерфейсы, для боллее удобного последующего сравнения объектов
 * @author Astecom
 */

"use strict";

const EventEmitter = require("events");

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

/**
 * @lends iPoonyaOutputStream
 * @interface iPoonyaOutputStream
 */
class iPoonyaOutputStream extends EventEmitter {
    /**
     * Интерфейс вывода шаблонов
     * Template output interface
     *
     * @param {Object} data
     * @param {Context} context
     *
     * @property {Context} data данные которые уже были выведены
     *
     * @memberof Poonya
     * @constructs iPoonyaOutputStream
     * @public
     */
    constructor(){
        super();
    }

    /**
     * Выводит данные
     * Outputs data
     *
     * @param {Any} data данные которые необходимо вывести
     *                   data to be displayed
     * @method
     * @public
     */
    write(data){

    }

    /**
     * Redirects the data stream to `stream` passed as the first argument
     * Перенаправляет поток данных в `stream` переданный первым аргументом
     *
     * @param {PoonyaOutputStream|Stream} stream поток которому необходимо передавать данные помимо этого
     *                                           the stream to which you need to transfer data in addition to this
     * @returns `stream` Поток который был передан.
     * @returns `stream` The stream that was sent.
     * @method
     * @public
     */
    pipe(stream){

    }

    /**
     * Преобразует поток в ReadableStream или в Stream.Writable для nodejs
     * Converts stream to ReadableStream or Stream.Writable for nodejs
     *
     * @returns {ReadableStream|Stream.Writable} a read stream if it's a browser, or a write stream if it's nodejs
     *                                           поток чтения, если это браузер, или поток записи если это nodejs
     * @method
     * @public
     */
    toReadable(){

    }

   /**
     * Ожидает завершения записи потока, после чего возвращает массив с буффером данных
     * Waits for the stream to finish writing, then returns an array with a data buffer
     *
     * @async
     * @public
     * @method
     * @returns {Array<Any>} массив с переданными данными
     *                       array with passed data
     */
    complete(){

    }
}

// Excecute

/**
 * @lends iStatement
 * @interface iStatement
 */
class iStatement {
    /**
     * Возвращет список исполняемых блоков, если такие есть.
     * 
     * @method
     * @returns {Array<iStatement>} список исполняемых блоков, если такие есть.
     */
    __executable(){
        return new Array();
    }
    /**
     * Синхронизирует группы выражений с оснновной группой
     * 
     * @method
     * 
     * @returns {iStatement}
     */
    __sync(reject){
        return this;
    };
}

module.exports.iContext = iContext;
module.exports.iPathData = iPathData;
module.exports.iInputData = iInputData;
module.exports.iCodeEmitter = iCodeEmitter;
module.exports.iPoonyaObject = iPoonyaObject;
module.exports.iPoonyaPrototype = iPoonyaPrototype;
module.exports.iPoonyaConstructsData = iPoonyaConstructsData;
module.exports.iStatement = iStatement;
module.exports.iPoonyaOutputStream = iPoonyaOutputStream;
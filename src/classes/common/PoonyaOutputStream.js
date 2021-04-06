/**
 * @file src/classes/common/PoonyaOutputStream.js
 * @description Cодержит поток вывода данных poonya
 * @author Astecom
 */

"use strict";

const { iPoonyaOutputStream } = require("../interfaces");
// #!if platform === 'node'
const { Stream } = require('stream');
// #!endif

/**
 * @lends PoonyaOutputStream
 * @class
 */
class PoonyaOutputStream extends iPoonyaOutputStream {
    /**
     * Класс вывода шаблонов, за счет этого интерфейса производится
     * Template output class, due to this interface is created
     *
     * @param {Object} data
     * @param {Context} context
     *
     * @property {Context} data данные которые уже были выведены
     *
     * @memberof Poonya
     * @constructs Heap
     * @public
     */
    constructor() {
        super();

        this._data = new Array();
        this._ended = false;
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
    toReadable() {
        const _ = this;

        // #!if platform === 'browser'
        /*~
        return new ReadableStream({
            start(controller){
                _.on('data', controller.enqueue.bind(controller));
                _.on('end', controller.close.bind(controller));
            }
        });
        */
        // #!endif
        // #!if platform === 'node'
        const stream = new Stream.Writable();

        _.on('data', stream.write.bind(stream));
        _.on('error', stream.emit.bind(stream, 'error'));
        _.on('end', stream.end.bind(stream));

        return stream;
        // #!endif
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
    pipe(stream) {
        if (typeof stream.write === 'function') {
            this.on('data', stream.write.bind(stream));

            return stream;
        } else {
            throw new TypeError('Is not a WriteStream');
        }
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
    write(data) {
        this._data.push(data);

        this.emit('data', data);
    }

    error(error) {
        this._data.push(error);

        this.emit('error', error);
    }

    end() {
        this._ended = true;

        this.emit('end');
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
    complete() {
        if (!this._ended)
            return new Promise((res, rej) => {
                this.on('end', () => res(this._data));
                this.on('error', error => rej(error))
            });
        else
            return this._data;
    }
}

module.exports = PoonyaOutputStream;
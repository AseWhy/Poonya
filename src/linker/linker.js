/**
 * @file src/linker.js
 * @description Содержит в себе линкер, который позваоляет импортировать содержимое других файлов в исполняему последовательность poonya
 * @author Astecom
 */

"use strict";

const 
    // #!if platform === 'node'
    { readFile } = require('fs'),
    { join, dirname, extname } = require('path'),
    // #!endif
    { maybeEquals } = require('../utils'),
    { CHARTYPE } = require('../classes/static'),
    { IOError } = require('../classes/exceptions'),
      Exceptions = require('../classes/exceptions'),
      lexer = require('../lexer/lexer'),
      ChunkData = require("./ChunkData"),
      LinkerData = require("./LinkerData");

/**
 * Препроцессораня функция, линкует файлы.
 *
 * @param {Array<Token>} data данные для парсинга
 * @param {String} passed_parent_path Путь к файлу, который сейчас обрабатываем
 * @param {Function} reject Фукцния выбрасывания ошибок
 *
 * @memberof Poonya.Linker
 * @returns {LinkerData}
 * @protected
 * @async
 */
async function linker(data, passed_parent_path, reject) {
    const r_data = new LinkerData(data, []);

    for (let i = 0;; i++) {
        if (data[i] == null) {
            return r_data;
        }

        if (data[i].equals(CHARTYPE.WORD, 'include')) {
            if (maybeEquals(data, i + 1, CHARTYPE.NEWLINE) && data[i + 1].equals(CHARTYPE.STRING)) {
                let path,
                    content,
                    chunck = r_data.getOwnChunck(data[i].position), 
                    parent_path = chunck == null ? passed_parent_path : chunck.name;
                
                // #!if platform === 'node'
                    path = join(dirname(parent_path), data[i + 1].data.toString());

                    path = extname(path) == '' ? path + '.po' : path;

                    content = new Promise(res => {
                        readFile(path, (err, r_data) => {
                            if(err) {
                                reject(data[i].position, new IOError(path));

                                return;
                            };

                            res(r_data.toString());
                        });
                    });
                // #!endif

                // #!if platform === 'browser'
                /*~
                    path = window.location.origin + '/' + parent_path.split('/').slice(0, -1).join('/') + '/' + data[i + 1].data.toString();

                    path = path.split('/').pop().split('.').length > 0 ? path : path + '.po'
                    
                    content = fetch(path, { method: 'GET' }).then(e => e.text());
                */
                // #!endif

                if(path == parent_path) {
                    reject(data[i].position, new Exceptions.IsRecursiveLink(parent_path));
                }

                if (parent_path != null) {
                    try {
                        const chunck = new ChunkData(path, await content, data[i].position);
                        const lexed = lexer(chunck.raw, false);
                        const last_pos = lexed[lexed.length - 1].position;

                        for(const current of data.slice(i)) {
                            current.position += last_pos;
                        }

                        for(const current of lexed) {
                            current.position += data[i].position;
                        }

                        data.splice(
                            i,
                            data[i-- + 2].equals(CHARTYPE.OPERATOR, ';') ? 3 : 2,
                            ...lexed
                        );

                        r_data.chuncks.push(chunck);
                    } catch (e) {
                        reject(data[i].position, new Exceptions.LinkerIOError(path));
                    }
                } else {
                    reject(data[i].position, new Exceptions.LinkerPathNotGiveExceptrion());
                }
            }
        }
    }
}

module.exports = linker;

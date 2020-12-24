/**
 * @file src/linker.js
 * @description Содержит в себе линкер, который позваоляет импортировать содержимое других файлов в исполняему последовательность poonya
 * @license MIT
 * @author Astecom
 */

const 
    // #!if platform === 'node'
    { readFile } = require('fs'),
    { join, dirname } = require('path'),
    // #!endif
    { maybeEquals } = require('./utils'),
    { CHARTYPE } = require('./classes/static'),
    { IOError } = require('./classes/exceptions'),
    lexer = require('./lexer/lexer');

/**
 * Препроцессораня функция, линкует файлы.
 *
 * @param {Array<LexerEntry>} data данные для парсинга
 * @param {String} parent_path Путь к файлу, который сейчас обрабатываем
 * @param {Function} throw_error Фукцния выбрасывания ошибок
 *
 * @memberof Poonya.Linker
 * @protected
 * @async
 */
async function linker(data, parent_path, throw_error) {
    for (let i = 0; true; i++) {
        if (data[i] == null) return data;

        if (data[i].equals(CHARTYPE.WORD, 'include')) {
            if (maybeEquals(data, i + 1, CHARTYPE.NEWLINE) && data[i + 1].equals(CHARTYPE.STRING)) {
                let path, content;
                
                // #!if platform === 'node'
                    path = join(dirname(parent_path), data[i + 1].data.toString());

                    content = new Promise((res, rej) => {
                        readFile(path, (err, data) => {
                            if(err)
                                throw new IOError(path);

                            res(data);
                        })
                    });
                // #!endif

                // #!if platform === 'browser'
                /*~
                    const buffer = parent_path.split('/');
                    
                    path = window.location.origin + '/' + buffer.slice(0, buffer.length - 1).join('/') + '/' + data[i + 1].data.toString();
                    
                    content = fetch(path, { method: 'GET' }).then(e => e.blob);
                */
                // #!endif

                if (parent_path != null) {
                    try {
                        data.splice(
                            i,
                            data[i + 2].equals(CHARTYPE.OPERATOR, ';') ? 3 : 2,
                            ...lexer(content, false)
                        );
                    } catch (e) {
                        throw_error(data[i].position, new Exceptions.LinkerIOError(path));
                    }
                } else {
                    throw_error(data[i].position, new Exceptions.LinkerPathNotGiveExceptrion());
                }
            }
        }
    }
}

module.exports = linker;

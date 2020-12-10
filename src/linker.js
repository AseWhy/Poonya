const { readFileSync } = require("fs")
    , { join, dirname } = require("path")
    , { maybeEquals } = require("./utils")
    , { CHARTYPE } = require('./classes/static')
    , lexer = require('./lexer');

/**
 * Препроцессораня функция, линкует файлы.
 *
 * @param {Array<LexerEntry>} data данные для парсинга
 * @param {String} parent_path Путь к файлу, который сейчас обрабатываем
 * @param {Function} throw_error Фукцния выбрасывания ошибок
 *
 * @memberof Poonya
 * @protected
 */
function linker(data, parent_path, throw_error) {
    for (let i = 0; true; i++) {
        if (data[i] == null)
            return data;

        if (data[i].equals(CHARTYPE.WORD, "include")) {
            if (maybeEquals(data, i + 1, CHARTYPE.NEWLINE) &&
                data[i + 1].equals(CHARTYPE.STRING)) {
                const path = join(
                    dirname(parent_path),
                    data[i + 1].data.toString()
                );

                if (parent_path != null) {
                    try {
                        data.splice(
                            i,
                            data[i + 2].equals(CHARTYPE.OPERATOR, ";") ? 3 : 2,
                            ...lexer(readFileSync(path), false)
                        );
                    } catch (e) {
                        throw_error(
                            data[i].position,
                            new Exceptions.LinkerIOError(path)
                        );
                    }
                } else {
                    throw_error(
                        data[i].position,
                        new Exceptions.LinkerPathNotGiveExceptrion()
                    );
                }
            }
        }
    }
}

module.exports = linker;
/**
 * @file src/lexer.js
 * @description Содержит в себе лексер, который преобразует строку в набор токенов.
 * @license MIT
 * @author Astecom
 */

const { CHARTYPE } = require('../classes/static')
    ,   LexerEntry = require('./LexerEntry');

/**
 * Лексер, который производит лексический разбор подаваемого текста в буффере
 *
 * @param {Buffer} buffer Буффер с `сырыми` данными
 * @param {Boolean} allow_spaces разрешены ли пробелы, если `false`, то лексер вернет ответ без пробелов
 *
 * @memberof Poonya.Lexer
 * @protected
 */
function lexer(buffer, allow_spaces = true) {
    const Export = new Array();

    let buff = new Array(),
        is_string = false,
        is_comment = false,
        is_multiline = false,
        string_entry = null,
        cur = null,
        last = null;

    for (let i = 0, leng = buffer.byteLength; i < leng; i++) {
        switch (buffer[i]) {
            case 32:
            case 9:
                cur = CHARTYPE.SPACE;
                break;
            case 46:
                cur = CHARTYPE.POINT;
                break;
            case 10:
            case 13:
                cur = CHARTYPE.NEWLINE;
                break;
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                cur = CHARTYPE.NUMBER;
                break;
            case 34:
            case 39:
            case 96:
                cur = CHARTYPE.STRING;
                break;
            case 60:
            case 61:
            case 62:
            case 63:
            case 43:
            case 44:
            case 45:
            case 47:
            case 40:
            case 41:
            case 42:
            case 59:
            case 58:
            case 38:
            case 123:
            case 124:
            case 125:
            case 91:
            case 93:
            case 33:
                cur = CHARTYPE.OPERATOR;
                break;
            default:
                cur = CHARTYPE.WORD;
                break;
        }

        if (
            (cur === CHARTYPE.NEWLINE && last === CHARTYPE.NEWLINE) ||
            (cur === CHARTYPE.POINT && last === CHARTYPE.NUMBER) ||
            (cur === CHARTYPE.NUMBER && last === CHARTYPE.WORD)
        ) {
            buff.push(buffer[i]);

            continue;
        }

        // Если предыдущий и текущий тип символов это операторы
        if (cur === CHARTYPE.OPERATOR && last === CHARTYPE.OPERATOR) {
            if (
                buff.length === 1 && // В буффере не больше одного символа
                (buff[0] === 33 || // пердыдущий символ был '!'
                    buff[0] === 60 || // пердыдущий символ был '<'
                    buff[0] === 62) && // пердыдущий символ был '>'
                buffer[i] === 61 // текущий символ '='
            ) {
                buff.push(buffer[i]);

                if (allow_spaces || last !== CHARTYPE.SPACE)
                    Export.push(new LexerEntry(last, Buffer.from(buff), i, string_entry));

                string_entry = null;

                buff.splice(0, buff.length);

                last = undefined;

                if (i + 1 === leng) return Export;

                continue;
            }

            if (
                buff.length === 1 && // В буффере не больше одного символа
                buff[0] === 47 // Предыдущий символ это /
            ) {
                if (
                    buffer[i] === 47 // Текущий символ это /
                ) {
                    is_comment = true;
                    is_multiline = false;

                    continue;
                } else if (
                    buffer[i] === 62 // Текущий символ это >
                ) {
                    is_comment = true;
                    is_multiline = true;

                    continue;
                }
            }
        }

        if (!is_string && !is_comment) {
            if (
                (cur !== last || last === CHARTYPE.STRING || last === CHARTYPE.OPERATOR) &&
                last != null
            ) {
                if (allow_spaces || last !== CHARTYPE.SPACE)
                    Export.push(new LexerEntry(last, Buffer.from(buff), i, string_entry));

                string_entry = null;

                buff.splice(0, buff.length);
            }

            if (cur === CHARTYPE.STRING) {
                is_string = true;

                string_entry = buffer[i];

                last = cur;

                continue;
            }

            buff.push(buffer[i]);

            last = cur;
        } else if (is_comment) {
            if (is_multiline) {
                if (
                    buffer[i] === 47 && // Текущий символ это /
                    buff[buff.length - 1] === 60 // Предыдущий символ это <
                ) {
                    is_comment = false;

                    last = undefined;

                    buff.splice(0, buff.length);

                    continue;
                }
            } else {
                if (cur === CHARTYPE.NEWLINE) {
                    is_comment = false;

                    last = CHARTYPE.NEWLINE;

                    buff.splice(0, buff.length);

                    continue;
                }
            }

            buff.push(buffer[i]);
        } else {
            if (cur === CHARTYPE.STRING && buffer[i] === string_entry) {
                is_string = false;

                last = cur;

                continue;
            }

            buff.push(buffer[i]);

            last = cur;
        }
    }

    if (allow_spaces || cur !== CHARTYPE.SPACE)
        Export.push(
            new LexerEntry(
                cur,
                Buffer.from(buff),
                buffer.byteLength - buff.length - 1,
                string_entry
            )
        );

    return Export;
}

module.exports = lexer;
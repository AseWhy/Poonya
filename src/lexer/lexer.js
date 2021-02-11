/**
 * @file src/lexer.js
 * @description Содержит в себе лексер, который преобразует строку в набор токенов.
 * @author Astecom
 */

"use strict";

const { CHARTYPE } = require('../classes/static')
    ,   Token = require('./Token');

/**
 * Лексер, который производит лексический разбор подаваемого текста в буффере
 *
 * @param {Buffer|UInt8Array|Array} input Вход с `сырыми` данными
 * @param {Boolean} allow_spaces разрешены ли пробелы, если `false`, то лексер вернет ответ без пробелов
 *
 * @memberof Poonya.Lexer
 * @protected
 */
function lexer(input, allow_spaces = true) {
    if(!Array.isArray(input)) {
        throw TypeError('Only array-like data can be input to the lexer');
    }

    let buff = new Array(),
        is_string = false,
        is_comment = false,
        is_multiline = false,
        string_entry = null,
        last_token = null,
        cur = null,
        last = null;

    const Export = new Array();

    const clear = () => {
        buff.splice(0, buff.length);
    };

    const append = (index) => {
        buff.push(input[index - 1], input[index]);
    };

    const firstIs = (...is) => {
        return is.includes(buff[1]);
    };

    const lastIs = (...is) => {
        return is.includes(buff[buff.length - 1]);
    };

    for (let i = 1, leng = input.length; i < leng; i += 2) {
        switch (input[i]) {
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
            append(i);

            continue;
        }

        // Префиксы чисел
        if(
            cur === CHARTYPE.NUMBER &&
            last === CHARTYPE.OPERATOR &&
            firstIs(43, 45) &&
            (
                last_token == null ||
                last_token.type != CHARTYPE.NUMBER
            )
        ) {
            last = cur;

            append(i);

            continue;
        }

        // Если предыдущий и текущий тип символов это операторы
        if (cur === CHARTYPE.OPERATOR && last === CHARTYPE.OPERATOR) {
            if (
                buff.length === 2 &&    // В буффере не больше одного символа
                firstIs(33, 60, 62) &&
                input[i] === 61         // текущий символ '='
            ) {
                append(i);

                if (allow_spaces || last !== CHARTYPE.SPACE)
                    Export.push(last_token = new Token(last, buff, i, string_entry));

                string_entry = null;

                clear(i);

                last = undefined;

                if (i + 1 === leng) return Export;

                continue;
            }

            if (
                buff.length === 2 &&    // В буффере не больше одного символа
                firstIs(47)             // Предыдущий символ это /
            ) {
                if (
                    input[i] === 47     // Текущий символ это /
                ) {
                    is_comment = true;
                    is_multiline = false;

                    continue;
                } else if (
                    input[i] === 62     // Текущий символ это >
                ) {
                    is_comment = true;
                    is_multiline = true;

                    continue;
                }
            }
        }

        if (!is_string && !is_comment) {
            if (
                (cur !== last || last === CHARTYPE.STRING || last === CHARTYPE.OPERATOR) && last != null
            ) {
                if (allow_spaces || last !== CHARTYPE.SPACE)
                    Export.push(last_token = new Token(last, buff, i, string_entry));

                string_entry = null;

                clear(i);
            }

            if (cur === CHARTYPE.STRING) {
                is_string = true;

                string_entry = input[i];

                last = cur;

                continue;
            }

            append(i);

            last = cur;
        } else if (is_comment) {
            if (is_multiline) {
                if (
                    input[i] === 47 && // Текущий символ это /
                    lastIs(60) // Предыдущий символ это <
                ) {
                    is_comment = false;

                    last = undefined;

                    clear(i);

                    continue;
                }
            } else {
                if (cur === CHARTYPE.NEWLINE) {
                    is_comment = false;

                    last = CHARTYPE.NEWLINE;

                    clear(i);

                    continue;
                }
            }

            append(i);
        } else {
            if (cur === CHARTYPE.STRING && input[i] === string_entry) {
                is_string = false;

                last = cur;

                continue;
            }

            append(i);

            last = cur;
        }
    }

    if (!is_comment && (allow_spaces || cur !== CHARTYPE.SPACE) && buff.length != 0)
        Export.push(
            new Token(
                cur,
                buff,
                input.length - buff.length - 1,
                string_entry
            )
        );

    return Export;
}

module.exports = lexer;
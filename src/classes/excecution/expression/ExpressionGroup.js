/**
 * @file src/classes/excecution/expression/ExpressionGroup.js
 * @description Cодержит группу выражений, которая выполняется при выполнении выражения
 * @author Astecom
 */

"use strict";

const { Operand, Operator } = require('../../common/ParserData')
    , { CHARTYPE, OPERATOR, SERVICE } = require('../../static')
    , { UnableToRecognizeTypeException, TheSequenceException } = require('../../exceptions')
    , { Cast } = require('../../../utils')
    ,   ObjectContructorCall = require('./ObjectContructorCall');

/**
 * @lends MessagePattern;
 */
class ExpressionGroup extends Operand {
    /**
     * Группа выражения, водержит последовательность, кторая выполняется как выражение.
     *
     * @param {Number} position начало выражения
     * @param {?Array<Token>} initial иницированное значение выражения
     *
     * @constructs MessagePattern
     * @memberof Poonya.Expression
     * @protected
     */
    constructor(position, initial) {
        super('expression');

        this.data = initial != null ? [...initial] : new Array();
        this.position = position;
        this.validated = false;
    }

    /**
     * Если выражение завершено, то врнет true, иначе же вернет false
     *
     * @returns {Boolean} Завершено ли выражение
     * @public
     * @method
     */
    isNotDone() {
        return this.data[this.data.length - 1] instanceof Operator;
    }

    /**
     * Сериализует текущее выражение как строку
     *
     * @returns {String} Строковое представление выражения
     * @public
     * @method
     */
    toString(indent) {
        return this.data.map(e => e.toString(indent)).join(' ');
    }

    /**
     * Добавляет вхождение в выражение
     *
     * @param {Token} entry Выхождение, которое нужно добавить
     * @param {Function} reject Функция выбрасывания ошибок
     *
     * @throws {Exceptions.TheSequenceException}
     *
     * @public
     * @method
     */
    append(entry, reject) {
        let current;

        switch (entry.type) {
            case CHARTYPE.NUMBER:
                current = new ObjectContructorCall(
                    SERVICE.CONSTRUCTORS.NUMBER,
                    parseInt(entry.data.toString()),
                    entry.position
                );
                break;
            case CHARTYPE.STRING:
                current = new ObjectContructorCall(
                    SERVICE.CONSTRUCTORS.STRING,
                    entry.data.toString(),
                    entry.position
                );
                break;
            case CHARTYPE.OPERATOR:
                current = new Operator(entry);
                break;
            case CHARTYPE.WORD:
                switch (entry.data.toString()) {
                    case 'true':
                        current = new ObjectContructorCall(
                            SERVICE.CONSTRUCTORS.BOOLEAN,
                            true,
                            entry.position
                        );
                        break;
                    case 'false':
                        current = new ObjectContructorCall(
                            SERVICE.CONSTRUCTORS.BOOLEAN,
                            false,
                            entry.position
                        );
                        break;
                    case 'null':
                        current = new ObjectContructorCall(
                            SERVICE.CONSTRUCTORS.NULL,
                            null,
                            entry.position
                        );
                        break;
                }
                break;
            default:
                if (entry instanceof Operator || entry instanceof Operand) current = entry;
                else reject(entry.position, new UnableToRecognizeTypeException(entry.type));
                break;
        }

        if(this.data.length !== 0) {
            if (
                (current instanceof Operator && this.data[this.data.length - 1] instanceof Operator) ||
                (current instanceof Operand && this.data[this.data.length - 1] instanceof Operand)
            )
                reject(entry.position, new TheSequenceException(current, this.data[this.data.length - 1]));
        } else {
            if(current instanceof Operator)
                reject(entry.position, new TheSequenceException(current, '[ExpressionStart]'));
        }

        this.data.push(current);
    }

    /**
     * Окончательно форматирует выражение по всем правилоам алгебры.
     *
     * @param {Function} reject Функция выбрасывания ошибок
     *
     * @public
     * @method
     */
    complete(reject) {
        // Stage 1 => 2 + 2 * 2 => 2 + (2 * 2)
        if (
            this.data.filter(e => e.op_p === OPERATOR.MULT || e.op_p === OPERATOR.DIVIDE).length > 0
        ) {
            let mltexp = false,
                dump = Array.from(this.data),
                stack = null;

            this.data.splice(0, this.data.length);

            for (let i = 0, leng = dump.length; i < leng; i++) {
                if (dump[i + 1] && dump[i + 1].type === 'operator')
                    switch (dump[i + 1].op_p) {
                        case OPERATOR.MULT:
                        case OPERATOR.DIVIDE:
                            if (mltexp) break;

                            mltexp = true;

                            stack = new ExpressionGroup(dump[i + 1].position);

                            this.append(stack, reject);
                            break;
                        case OPERATOR.PLUS:
                        case OPERATOR.MINUS:
                        case OPERATOR.EQUAL:
                        case OPERATOR.LARGER:
                        case OPERATOR.LESS:
                        case OPERATOR.OR:
                        case OPERATOR.AND:
                            if (!mltexp) break;

                            mltexp = false;

                            stack.append(dump[i], reject);

                            stack.complete();

                            stack = null;
                            continue;
                        default:
                            break;
                    }

                if (mltexp) {
                    stack.append(dump[i], reject); // Добавляем в суб стек
                } else {
                    this.append(dump[i], reject); // Добавляем в основной стек
                }
            }
        }

        // Stage 2 => a & b => (a) & (b)
        if (this.data.filter(e => e.op_p === OPERATOR.AND).length > 0) {
            let dump = Array.from(this.data),
                stack = new ExpressionGroup(dump[0].position);

            this.data.splice(0, this.data.length);

            for (let i = 0, leng = dump.length; i < leng; i++) {
                if (dump[i] && dump[i].type === 'operator' && dump[i].op_p === OPERATOR.AND) {
                    stack.complete();

                    this.append(stack, reject);

                    this.append(dump[i], reject);

                    stack = new ExpressionGroup(dump[i].position);

                    continue;
                }

                stack.append(dump[i], reject);
            }

            stack.complete();

            this.append(stack, reject);
        }

        // Stage 3 => a | b => (a) | (b)
        if (this.data.filter(e => e.op_p === OPERATOR.OR).length > 0) {
            let dump = Array.from(this.data),
                stack = new ExpressionGroup(dump[0].position);

            this.data.splice(0, this.data.length);

            for (let i = 0, leng = dump.length; i < leng; i++) {
                if (dump[i] && dump[i].type === 'operator' && dump[i].op_p === OPERATOR.OR) {
                    stack.complete();

                    this.append(stack, reject);

                    this.append(dump[i], reject);

                    stack = new ExpressionGroup(dump[i].position);

                    continue;
                }

                stack.append(dump[i], reject);
            }

            stack.complete();

            this.append(stack, reject);
        }

        this.validated = true;
    }

    /**
     * Выполняет последовательность выражения, возвращая результат выполнения
     *
     * @param {iContext} context Контекст выполнения
     * @param {PoonyaOutputStream} out вывод шаблонизатора
     * @param {Function} reject Вызывается при ошибке
     * @param {Function} resolve Вызывается при возврате результата выполнения выражения
     *
     * @returns {Any} В зависимости от результатов выполнения выражения
     * @throws {ParserException}
     *
     * @public
     * @method
     */
    result(context, out, reject, resolve) {
        let _ = this, i = 1, leng = _.data.length, result = null;

        function tick() {
            // Получем прромежуточное значение
            _.data[i + 1].result(context, out, reject, cur => {
                switch (true) {
                    case _.data[i].equals(OPERATOR.PLUS):
                        result += cur.toRawData();
                    break;
                    case _.data[i].equals(OPERATOR.MINUS):
                        result -= cur.toRawData();
                    break;
                    case _.data[i].equals(OPERATOR.MULT):
                        result *= cur.toRawData();
                    break;
                    case _.data[i].equals(OPERATOR.DIVIDE):
                        result /= cur.toRawData();
                    break;
                    case _.data[i].equals(OPERATOR.LARGER):
                        result = result > cur.toRawData();
                    break;
                    case _.data[i].equals(OPERATOR.LESS):
                        result = result < cur.toRawData();
                    break;
                    case _.data[i].equals(OPERATOR.EQUAL):
                        result = result == cur.toRawData();
                    break;
                    case _.data[i].equals(OPERATOR.ELARGER):
                        result = result >= cur.toRawData();
                    break;
                    case _.data[i].equals(OPERATOR.ELESS):
                        result = result <= cur.toRawData();
                    break;
                    case _.data[i].equals(OPERATOR.NEQUAL):
                        result = result != cur.toRawData();
                    break;
                    case _.data[i].equals(OPERATOR.AND):
                        result = result && cur.toRawData();

                        if (!result)
                            return result;
                    break;
                    case _.data[i].equals(OPERATOR.OR):
                        result = result || cur.toRawData();

                        if (result)
                            return result;
                    break;
                }

                if((i += 2) >= leng) {
                    resolve(Cast(result, context));
                } else {
                    tick();
                }
            });
        }

        _.data[0].result(context, out, reject, p_result => {
            p_result.result(context, out, reject, d_result => {
                result = d_result;

                if(_.data.length > 1)
                    tick();
                else
                    resolve(Cast(result, context));
            });
        });
    }
}

module.exports = ExpressionGroup;
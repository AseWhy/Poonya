/**
 * @file src/classes/common/ParserData.js
 * @description Cодержит прототипы исполняемых данных.
 * @author Astecom
 * @license MIT
 */

const { OPERATOR } = require('../static');

/**
 * @lends ParserData
 * @class
 */
class ParserData {
    /**
     * @param {String} type тип данных
     * @constructs ParserData
     * @memberof Poonya
     * @abstract
     * @protected
     */
    constructor(type = 'undefined') {
        this.type = type;
    }
}

/**
 * @lends Operand
 * @class
 */
class Operand extends ParserData {
    /**
     * @param {String} type тип данных
     * @constructs Operand
     * @memberof Poonya
     * @abstract
     * @protected
     */
    constructor(name = 'undefined') {
        super('operand');

        this.name = name;
    }
}

/**
 * @lends Operator
 * @class
 */
class Operator extends ParserData {
    /**
     * @param {LexerEntry} data вхождение лексера описывающее текущий оператор
     * @constructs Operator
     * @memberof Poonya
     * @extends ParserData
     * @protected
     */
    constructor(data) {
        super('operator');

        this.position = data.position;
        this.raw = data.data;

        switch (data.data.toString()) {
            case '+':
                this.op_p = OPERATOR.PLUS;
                break;
            case '-':
                this.op_p = OPERATOR.MINUS;
                break;
            case '*':
                this.op_p = OPERATOR.MULT;
                break;
            case '/':
                this.op_p = OPERATOR.DIVIDE;
                break;
            case '>':
                this.op_p = OPERATOR.LARGER;
                break;
            case '<':
                this.op_p = OPERATOR.LESS;
                break;
            case '>=':
                this.op_p = OPERATOR.ELARGER;
                break;
            case '<=':
                this.op_p = OPERATOR.ELESS;
                break;
            case '=':
                this.op_p = OPERATOR.EQUAL;
                break;
            case '!=':
                this.op_p = OPERATOR.NEQUAL;
                break;
            case '&':
                this.op_p = OPERATOR.AND;
                break;
            case '|':
                this.op_p = OPERATOR.OR;
                break;
        }
    }

    /**
     * Сравнивает оператор с текущим
     *
     * @param {OPERATOR} t сравниваемый тип оператора
     * @public
     * @method
     * @returns {Boolean}
     */
    equals(t) {
        return this.op_p === t;
    }

    /**
     * Сериализует текущий оператор в строку
     *
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.raw.toString();
    }
}

module.exports.Operand = Operand;
module.exports.Operator = Operator;
module.exports.ParserData = ParserData;

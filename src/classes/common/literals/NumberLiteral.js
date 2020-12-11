/**
 * @file src/classes/common/literal/NumberLiteral.js
 * @description Cодержит прототип литерального числового значения
 * @author Astecom
 * @license MIT
 */

const { CHARTYPE } = require('../../static')
    , { ParserData } = require('../ParserData')
    , { Literal } = require("../Literals")
    , LexerEntry = require('../../../lexer/LexerEntry');

/**
 * @lends NumberLiteral
 * @class
 */
class NumberLiteral extends Literal {
    /**
     * Дескриптор числа в шаблонизаторе
     *
     * @param {LexerEntry} data Вхождение лексера описывающее число
     * @constructs NumberLiteral
     * @memberof Poonya.Literal
     * @extends Literal
     * @protected
     */
    constructor(data) {
        super(data, "NumberLiteral");

        this.data = data.data.toString();

        this.unsigned = false;
    }

    /**
     * Сериализует текущее число
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.data + "n";
    }

    /**
     * Отрезает дробную часть у числа
     *
     * @method
     * @public
     */
    toInteger() {
        this.unsigned = true;
    }

    /**
     * Добавляет дробную часть числу
     *
     * @method
     * @public
     */
    toDouble() {
        this.unsigned = false;
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {Number}
     */
    result() {
        return this.unsigned ? parseInt(this.data) : parseFloat(this.data);
    }

    /**
     * Преобразует в значение переданное первым аргументом как число шаблонизатора
     *
     * @param {Any} data Данные из которых нужно преобразовать
     * @param {?Number} pos Позция вхождения
     * @returns {NumberLiteral}
     * @static
     * @public
     * @method
     */
    static toPoonyaNumber(data, pos = 0) {
        if (!(data instanceof ParserData))
            return new NumberLiteral(
                new LexerEntry(
                    CHARTYPE.NUMBER,
                    Buffer.from(new Number(data).toString()),
                    pos,
                    null
                )
            );

        switch (data.entry.type) {
            case CHARTYPE.STRING:
            case CHARTYPE.WORD:
                return new NumberLiteral(
                    new LexerEntry(CHARTYPE.NUMBER, data.entry.data, pos, null)
                );
            case CHARTYPE.NUMBER:
                return new NumberLiteral(
                    new LexerEntry(
                        CHARTYPE.NUMBER,
                        Buffer.from(data.entry.data.toString()),
                        pos,
                        null
                    )
                );
        }

        return new NumberLiteral(
            new LexerEntry(CHARTYPE.NUMBER, Buffer.from([48]), pos, null)
        );
    }

    /**
     * Создает пустое число со значнием 0
     *
     * @param {?Number} pos позиция к которой нужно привзать новосозданное число
     * @returns {NumberLiteral}
     * @static
     * @public
     * @method
     */
    static create(pos = 0) {
        return new NumberLiteral(
            new LexerEntry(CHARTYPE.START, Buffer.from([48]), pos, null)
        );
    }
}

module.exports = NumberLiteral;
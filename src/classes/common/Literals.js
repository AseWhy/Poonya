const { Operand, ParserData } = require('./ParserData')
    , { CHARTYPE } = require('../static')
    , LexerEntry = require('../LexerEntry');

/**
 * @lends Literal
 * @class
 */
class Literal extends Operand {
    /**
     * @param {LexerEntry} entry вхождение лексера описывающее текущий литерал
     * @param {String} name наименование литерала
     * @constructs Literal
     * @memberof Poonya
     * @extends Operand
     * @protected
     */
    constructor(entry, name) {
        super("literal");

        this.position = entry.position;
        this.operand_name = name;
    }

    /**
     * @abstract
     * @method
     * @public
     */
    result() {

    }

    /**
     * Сравнивает имя литерала с переданных значением
     *
     * @param {String} f имя литерала с которым сравниваем
     * @method
     * @public
     * @returns {Boolean}
     */
    equals(f) {
        return this.name === f;
    }

    /**
     * Сериализует текущий литерал
     *
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.name + " { " + this.result() + " }";
    }
}

/**
 * @lends IntegerLiteral
 * @class
 */
class IntegerLiteral extends Literal {
    /**
     * Дескриптор целого числа в шаблонизаторе
     *
     * @param {LexerEntry} data Вхождение лексера описывающее целое число
     * @constructs IntegerLiteral
     * @memberof Poonya
     * @extends Literal
     * @protected
     */
    constructor(data) {
        super(data, "IntegerLiteral");

        this.data = data.data.toString();
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {BigInt}
     */
    result() {
        return BigInt(this.data);
    }

    /**
     * Сериализует текущее целое число
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.data + "i";
    }

    /**
     * Преобразует в значение переданное первым аргументом как целое число шаблонизатора
     *
     * @param {Any} data Данные из которых нужно преобразовать
     * @param {?Number} pos Позция вхождения
     * @returns {IntegerLiteral}
     * @static
     * @public
     * @method
     */
    static toPoonyaNumber(data, pos = 0) {
        if (!(data instanceof ParserData))
            return new IntegerLiteral(
                new LexerEntry(
                    CHARTYPE.NUMBER,
                    Buffer.from(BigInt(data).toString()),
                    pos,
                    null,
                ),
            );

        switch (data.entry.type) {
            case CHARTYPE.STRING:
            case CHARTYPE.WORD:
                return new IntegerLiteral(
                    new LexerEntry(CHARTYPE.NUMBER, data.entry.data, pos, null),
                );
            case CHARTYPE.NUMBER:
                return new IntegerLiteral(
                    new LexerEntry(
                        CHARTYPE.NUMBER,
                        Buffer.from(data.entry.data.toString()),
                        pos,
                        null,
                    ),
                );
        }

        return new IntegerLiteral(
            new LexerEntry(CHARTYPE.NUMBER, Buffer.from([48]), pos, null),
        );
    }

    /**
     * Создает пустое целое число со значнием 0
     *
     * @param {?Number} pos позиция к которой нужно привзать новосозданное целое число
     * @returns {IntegerLiteral}
     * @static
     * @public
     * @method
     */
    static create(pos = 0) {
        return new NumberLiteral(
            new LexerEntry(CHARTYPE.START, Buffer.from([48]), pos, null),
        );
    }
}

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
     * @memberof Poonya
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
                    null,
                ),
            );

        switch (data.entry.type) {
            case CHARTYPE.STRING:
            case CHARTYPE.WORD:
                return new NumberLiteral(
                    new LexerEntry(CHARTYPE.NUMBER, data.entry.data, pos, null),
                );
            case CHARTYPE.NUMBER:
                return new NumberLiteral(
                    new LexerEntry(
                        CHARTYPE.NUMBER,
                        Buffer.from(data.entry.data.toString()),
                        pos,
                        null,
                    ),
                );
        }

        return new NumberLiteral(
            new LexerEntry(CHARTYPE.NUMBER, Buffer.from([48]), pos, null),
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
            new LexerEntry(CHARTYPE.START, Buffer.from([48]), pos, null),
        );
    }
}

/**
 * @lends StringLiteral
 * @class
 */
class StringLiteral extends Literal {
    /**
     * Дескриптор литерала строки
     *
     * @param {LexerEntry} data Вхождение лексера описывающее строку
     * @constructs StringLiteral
     * @memberof Poonya
     * @extends Literal
     * @protected
     */
    constructor(data) {
        super(data, "StringLiteral");

        this.data = data.data.toString();
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    result() {
        return this.data.toString();
    }

    /**
     * Преобразует в значение переданное первым аргументом как строку шаблонизатора
     *
     * @param {Any} data Данные из которых нужно преобразовать
     * @param {?Number} pos Позция вхождения
     * @returns {StringLiteral}
     * @static
     * @public
     * @method
     */
    static toPoonyaString(data, pos = 0) {
        if (!(data instanceof ParserData))
            return new StringLiteral(
                new LexerEntry(
                    CHARTYPE.WORD,
                    Buffer.from(new String(data).toString()),
                    pos,
                    null,
                ),
            );

        switch (data.entry.type) {
            case CHARTYPE.STRING:
            case CHARTYPE.WORD:
                return new StringLiteral(
                    new LexerEntry(CHARTYPE.WORD, data.entry.data, pos, null),
                );
            case CHARTYPE.NUMBER:
                return new StringLiteral(
                    new LexerEntry(
                        CHARTYPE.WORD,
                        Buffer.from(data.entry.data.toString()),
                        pos,
                        null,
                    ),
                );
        }

        return new StringLiteral(
            new LexerEntry(CHARTYPE.WORD, Buffer.from([]), pos, null),
        );
    }

    /**
     * Сериализует текущую строку
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return (
            '"' +
            this.data.toString().replace(/\n/, "\\n").replace(/"/g, '\\"') +
            '"'
        );
    }

    /**
     * Создает пустую строку с длинной равной нулю
     *
     * @param {?Number} pos позиция к которой нужно привзать новосозданный литерал
     * @returns {StringLiteral}
     * @static
     * @public
     * @method
     */
    static create(pos = 0) {
        return new StringLiteral(
            new LexerEntry(CHARTYPE.START, Buffer.from([]), pos, null),
        );
    }
}

/**
 * @lends BooleanLiteral
 * @class
 */
class BooleanLiteral extends Literal {
    /**
     * Дескриптор лбулевого итерала
     *
     * @param {LexerEntry} data Вхождение лексера описывающее булевый литерал
     * @constructs BooleanLiteral
     * @memberof Poonya
     * @extends Literal
     * @protected
     */
    constructor(data) {
        super(data, "BooleanLiteral");

        this.data =
            data.data.toString() === "true"
                ? Buffer.from([1])
                : Buffer.from([0]);
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {Boolean}
     */
    result() {
        return this.data[0] !== 0;
    }

    /**
     * Сериализует текущее булевое значение
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return this.data[0] !== 0 ? "true" : "false";
    }

    /**
     * Преобразует в значение переданное первым аргументом как булевое значение шаблонизатора
     *
     * @param {Any} data Данные из которых нужно преобразовать
     * @param {?Number} pos Позция вхождения
     * @returns {BooleanLiteral}
     * @static
     * @public
     * @method
     */
    static toPoonyaBoolean(data, pos = 0) {
        if (!(data instanceof ParserData))
            return new BooleanLiteral(
                new LexerEntry(
                    CHARTYPE.WORD,
                    Buffer.from(new Boolean(data).toString()),
                    pos,
                    null,
                ),
            );

        if (data.entry.data.byteLength === 1) {
            return new BooleanLiteral(
                new LexerEntry(
                    CHARTYPE.WORD,
                    Buffer.from(data.entry.data[0] === 0 ? "false" : "true"),
                    pos,
                    null,
                ),
            );
        } else {
            switch (data.entry.type) {
                case CHARTYPE.STRING:
                case CHARTYPE.WORD:
                    switch (data.entry.data.toString()) {
                        case "true":
                            return new BooleanLiteral(
                                new LexerEntry(
                                    CHARTYPE.WORD,
                                    Buffer.from("true"),
                                    pos,
                                    null,
                                ),
                            );
                        case "false":
                            return new BooleanLiteral(
                                new LexerEntry(
                                    CHARTYPE.WORD,
                                    Buffer.from("false"),
                                    pos,
                                    null,
                                ),
                            );
                    }
                    break;
                case CHARTYPE.NUMBER:
                    switch (data.entry.data.toString()) {
                        case "0":
                            return new BooleanLiteral(
                                new LexerEntry(
                                    CHARTYPE.WORD,
                                    Buffer.from("false"),
                                    pos,
                                    null,
                                ),
                            );
                        default:
                            return new BooleanLiteral(
                                new LexerEntry(
                                    CHARTYPE.WORD,
                                    Buffer.from("true"),
                                    pos,
                                    null,
                                ),
                            );
                    }
            }

            return new BooleanLiteral(
                new LexerEntry(CHARTYPE.WORD, Buffer.from("false"), pos, null),
            );
        }
    }

    /**
     * Создает пустую булевое значение равное `false`
     *
     * @param {?Number} pos позиция к которой нужно привзать новосозданный литерал
     * @returns {BooleanLiteral}
     * @static
     * @public
     * @method
     */
    static create(pos = 0) {
        return new BooleanLiteral(
            new LexerEntry(CHARTYPE.START, Buffer.from([0]), pos, null),
        );
    }
}

/**
 * @lends NullLiteral
 * @class
 */
class NullLiteral extends Literal {
    /**
     * Дескриптор литерала null
     *
     * @param {LexerEntry} data Вхождение лексера описывающее null
     * @constructs NullLiteral
     * @memberof Poonya
     * @extends Literal
     * @protected
     */
    constructor(data) {
        super(data, "NullLiteral");
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {null}
     */
    result() {
        return null;
    }

    /**
     * Сериализует текущее булевое значение
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    toString() {
        return "Null";
    }

    /**
     * Стоздает новый null литерал
     *
     * @param {?Number} pos позиция к которой нужно привзать новосозданный литерал
     * @returns {NullLiteral}
     * @static
     * @public
     * @method
     */
    static create() {
        return new NullLiteral(
            new LexerEntry(CHARTYPE.START, Buffer.from([]), 0, null),
        );
    }
}

module.exports.Literal = Literal;
module.exports.NullLiteral = NullLiteral;
module.exports.StringLiteral = StringLiteral;
module.exports.NumberLiteral = NumberLiteral;
module.exports.BooleanLiteral = BooleanLiteral;
module.exports.IntegerLiteral = IntegerLiteral;
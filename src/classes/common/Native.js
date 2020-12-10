const { Operand } = require('./ParserData');

/**
 * @lends Native
 * @class
 */
class Native extends Operand {
    /**
     * @param {String} name наименование литерала
     * @constructs Native
     * @memberof Poonya
     * @extends Operand
     * @protected
     */
    constructor(name) {
        super("native");

        this.position = 0;
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
        return this.name + " [N] { " + this.result() + " }";
    }
}

/**
 * @lends NativeInteger
 * @class
 */
class NativeInteger extends Native {
    /**
     * Дескриптор нативного целого числа в шаблонизаторе
     *
     * @param {BigInt} data данные для преобразования
     * @constructs NativeInteger
     * @memberof Poonya
     * @extends Native
     * @protected
     */
    constructor(data) {
        super("NativeInteger");

        if(!isNaN(data) && typeof data === 'bigint')
            this.data = data;
        else
            throw new TypeError('For NativeInteger, the data type passed to the constructor must be a bigint')
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
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {BigInt}
     */
    result(){
        return this.data;
    }
}

/**
 * @lends NativeNumber
 * @class
 */
class NativeNumber extends Native {
    /**
     * Дескриптор нативного числа в шаблонизаторе
     *
     * @param {Number} data данные для преобразования
     * @constructs NativeNumber
     * @memberof Poonya
     * @extends Native
     * @protected
     */
    constructor(data) {
        super("NativeNumber");

        if(!isNaN(data) && typeof data === 'number')
            this.data = data;
        else
            throw new TypeError('For NativeNumber, the data type passed to the constructor must be a number')
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
        return this.data + "n";
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {Number}
     */
    result(){
        return this.data;
    }
}

/**
 * @lends NativeString
 * @class
 */
class NativeString extends Native {
    /**
     * Дескриптор нативной строки в шаблонизаторе
     *
     * @param {String} data данные для преобразования
     * @constructs NativeString
     * @memberof Poonya
     * @extends Native
     * @protected
     */
    constructor(data) {
        super("NativeString");

        if(typeof data === 'string')
            this.data = data;
        else
            throw new TypeError('For NativeString, the data type passed to the constructor must be a string')
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
        return `'${this.data}'`;
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {String}
     */
    result(){
        return this.data;
    }
}

/**
 * @lends NativeBoolean
 * @class
 */
class NativeBoolean extends Native {
    /**
     * Дескриптор нативного булевого значения в шаблонизаторе
     *
     * @param {Boolean} data данные для преобразования
     * @constructs NativeBoolean
     * @memberof Poonya
     * @extends Native
     * @protected
     */
    constructor(data) {
        super("NativeBoolean");

        if(typeof data === 'boolean')
            this.data = data;
        else
            throw new TypeError('For NativeBoolean, the data type passed to the constructor must be a boolean')
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
        return `${this.data}`;
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {Boolean}
     */
    result(){
        return this.data;
    }
}

/**
 * @lends NativeNull
 * @class
 */
class NativeNull extends Native {
    /**
     * Дескриптор нативного null в шаблонизаторе
     *
     * @constructs NativeNull
     * @memberof Poonya
     * @extends Native
     * @protected
     */
    constructor() {
        super("NativeNull");
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
        return `null`;
    }

    /**
     * Возвращает серриалзованное значение результата выполнения
     *
     * @override
     * @method
     * @public
     * @returns {null}
     */
    result(){
        return null;
    }
}

module.exports.Native = Native;
module.exports.NativeNull = NativeNull;
module.exports.NativeNumber = NativeNumber;
module.exports.NativeString = NativeString;
module.exports.NativeBoolean = NativeBoolean;
module.exports.NativeInteger = NativeInteger;
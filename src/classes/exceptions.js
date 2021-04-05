/**
 * @file src/classes/exceptions.js
 * @description Тут я сгруппировал всевозможные исклюения
 * @author Astecom
 */

"use strict";

const { SERVICE } = require('./static')
    , { dirname } = require('path');

/**
 * Класс ошибки шаблонизатора
 *
 * @memberof Poonya.Exceptions
 * @name ParserException
 * @class
 * @protected
 */
class PoonyaException {
    constructor(header, message, throwed = false) {
        this.message = 'PoonyaException / ' + header + (message != null ? ': \n' + message : '');
        this.throwed = throwed;
    }

    toString(){
        return this.message;
    }
}

/**
 * Основное исключение парсера
 *
 * @memberof Poonya.Exceptions
 * @name ParserException
 * @class
 * @protected
 */
class ParserException extends PoonyaException {
    constructor(header, message) {
        super('Parser exception / ' + header, message);
    }
}

/**
 * Основное исключение линкера
 *
 * @memberof Poonya.Exceptions
 * @name LinkerException
 * @class
 * @protected
 */
class LinkerException extends PoonyaException {
    constructor(header, message) {
        super('Linker exception / ' + header, message);
    }
}

/**
 * Исключение последовательности, неожиданная последовательность
 *
 * @memberof Poonya.Exceptions
 * @name TheSequenceException
 * @class
 * @protected
 */
class TheSequenceException extends ParserException {
    constructor(entry, last) {
        super(`Wrong order: condition operator: '${entry.toString()}' after '${last.toString()}'`);
    }
}

/**
 * Исключение неизвестного токена
 *
 * @memberof Poonya.Exceptions
 * @name UnexpectedTokenException
 * @class
 * @protected
 */
class UnexpectedTokenException extends ParserException {
    constructor(token, expected) {
        super(`Unexpected token '${token.toString()}'` + (expected ? `when expected '${expected.toString()}'` : ''));
    }
}

/**
 * Исключение неизвестного токена
 *
 * @memberof Poonya.Exceptions
 * @name UnexpectedTokenStatement
 * @class
 * @protected
 */
class UnexpectedTokenStatement extends ParserException {
    constructor(statement, token, expected) {
        super(
            `Error parsing the '${statement.toString()}' statement. Expected '${expected.toString()}', when actually: '${token.toString()}'`
        );
    }
}

/**
 * Логическое исключение
 *
 * @memberof Poonya.Exceptions
 * @name ParserLogicException
 * @class
 * @protected
 */
class ParserLogicException extends ParserException {
    constructor() {
        super('The expression has incorrect logic');
    }
}

/**
 * Исключение пустого аргумента при вызове функции
 *
 * @memberof Poonya.Exceptions
 * @name ParserEmtyArgumentException
 * @class
 * @protected
 */
class ParserEmtyArgumentException extends ParserException {
    constructor() {
        super(
            'It is not possible to pass an empty argument to a function, use null to denote an empty value'
        );
    }
}

/**
 * Не передан путь родтельскому шаблону
 *
 * @memberof Poonya.Exceptions
 * @name LinkerPathNotGiveExceptrion
 * @class
 * @protected
 */
class LinkerPathNotGiveException extends LinkerException {
    constructor() {
        super('To use include, you must pass the path to the current execution file');
    }
}

/**
 * Ошибка открытия файла
 *
 * @memberof Poonya.Exceptions
 * @name LinkerIOError
 * @class
 * @protected
 */
class IOError extends LinkerException {
    constructor(path) {
        super("An error occured while opening file: '" + path + "'");
    }
}

/**
 * Ошибка использования стороннего шаблона
 *
 * @memberof Poonya.Exceptions
 * @name LinkerIOError
 * @class
 * @protected
 */
class LinkerIOError extends IOError {
    constructor(path) {
        super(path);
    }
}

/**
 * Ошибка выполнения нативной функции
 *
 * @memberof Poonya.Exceptions
 * @name NativeFunctionExecutionError
 * @class
 * @protected
 */
class NativeFunctionExecutionError extends PoonyaException {
    constructor(name, stack) {
        const exp = /^\s*at\s(?:new\s)?([aA-zZ.аА-яЯё]+)\s\((.*)\)$/;

        stack = stack.split('\n');

        for (let i = 0, leng = stack.length, cur; i < leng; i++) {
            if (exp.test(stack[i])) {
                cur = stack[i].match(exp);

                if (
                    cur[1] === 'NativeFunction.result' &&
                    SERVICE.ROOTPATH == dirname(cur[2]).substring(0, SERVICE.ROOTPATH.length)
                ) {
                    stack = stack.slice(0, i);

                    break;
                }
            }
        }

        super(
            "Critical error while executing a native function '" + name + "'",
            '* > \t' + stack.join('\n * > \t')
        );
    }
}

/**
 * Ошибка типа, возвращаемого нативной функцией
 *
 * @memberof Poonya.Exceptions
 * @name NativeFunctionReturnValueError
 * @class
 * @protected
 */
class NativeFunctionReturnValueError extends PoonyaException {
    constructor() {
        super('Function can only return simple types');
    }
}

/**
 * Невозможно получить n от null
 *
 * @memberof Poonya.Exceptions
 * @name GetFieldOfNullException
 * @class
 * @protected
 */
class GetFieldOfNullException extends PoonyaException {
    constructor(field) {
        super(`Cannot get property '${field}' of null`);
    }
}

/**
 * Поле не является функцией
 *
 * @memberof Poonya.Exceptions
 * @name FieldNotAFunctionException
 * @class
 * @protected
 */
class FieldNotAFunctionException extends PoonyaException {
    constructor(field) {
        super(`The field '${field}' is not a function`);
    }
}

/**
 * Поле уже объявлено
 *
 * @memberof Poonya.Exceptions
 * @name TheFieldAlreadyHasBeenDeclaredException
 * @class
 * @protected
 */
class TheFieldAlreadyHasBeenDeclaredException extends PoonyaException {
    constructor(field) {
        super(`The '${field}' field is already declared`);
    }
}

/**
 * Поле должно быть массивом
 *
 * @memberof Poonya.Exceptions
 * @name TheFieldMustBeAnArrayInstanceExceprion
 * @class
 * @protected
 */
class TheFieldMustBeAnArrayInstanceExceprion extends PoonyaException {
    constructor(field) {
        super(`Field '${field}' must be an Array instance`);
    }
}

/**
 * Поле не объявлено
 *
 * @memberof Poonya.Exceptions
 * @name TheFieldNotHasDeclaredExceprion
 * @class
 * @protected
 */
class TheFieldNotHasDeclaredExceprion extends PoonyaException {
    constructor(field) {
        super(`Field '${field}' is not declared`);
    }
}

/**
 * Поле должно иметь тип числа
 *
 * @memberof Poonya.Exceptions
 * @name TheFieldMustBeNumberException
 * @class
 * @protected
 */
class TheFieldMustBeNumberException extends PoonyaException {
    constructor(field) {
        super(`'${field}' must be a number, or a container containing a number`);
    }
}

/**
 * Невозможно распознать тип вхождения
 *
 * @memberof Poonya.Exceptions
 * @name UnableToRecognizeTypeException
 * @class
 * @protected
 */
class UnableToRecognizeTypeException extends ParserException {
    constructor(type) {
        super(`Unable to recognize type '${type}'`);
    }
}

/**
 * Ошибка сегментации сегментов вызова (...exp, ...exp, ) <-
 *
 * @memberof Poonya.Exceptions
 * @name SegmentationFaultEmptyArgumentException
 * @class
 * @protected
 */
class SegmentationFaultEmptyArgumentException extends ParserException {
    constructor(blockname) {
        super(`Segmentation fault: empty argument for ` + blockname);
    }
}

/**
 * Незавршенное объявление объекта
 *
 * @memberof Poonya.Exceptions
 * @name SegmentationFaultEmptyArgumentException
 * @class
 * @protected
 */
class ParserUnfinishedNotationException extends ParserException {
    constructor() {
        super(`Parser fault: unfinished notation`);
    }
}

/**
 * Ошибка сегментации сегментов вызова (...exp, ...exp, ) <-
 *
 * @memberof Poonya.Exceptions
 * @name SegmentationFaultMaximumSegmentsForBlockException
 * @class
 * @protected
 */
class SegmentationFaultMaximumSegmentsForBlockException extends ParserException {
    constructor(blockname) {
        super(`Segmentation fault exceeded the maximum number of segments for block ` + blockname);
    }
}

/**
 * somed.dss[ <...exp> ] <-
 *
 * @memberof Poonya.Exceptions
 * @name UnexpectedWordTypeAndGetException
 * @class
 * @protected
 */
class UnexpectedWordTypeAndGetException extends ParserException {
    constructor(value, type) {
        super(`Expected word type expression and get ${value}[${type}]`);
    }
}

/**
 * Невозможно получить доступ к полю, неправильно сотавлено выражение
 *
 * @memberof Poonya.Exceptions
 * @name InvalidSequenceForLetiableAccessException
 * @class
 * @protected
 */
class InvalidSequenceForLetiableAccessException extends ParserException {
    constructor() {
        super(`Invalid sequence for letiable access`);
    }
}

/**
 * Критическая ошибка парсера
 *
 * @memberof Poonya.Exceptions
 * @name CriticalParserErrorException
 * @class
 * @protected
 */
class CriticalParserErrorException extends ParserException {
    constructor() {
        super(`Critical parser error`);
    }
}

/**
 * Критическая ошибка парсера
 *
 * @memberof Poonya.Exceptions
 * @name CriticalParserErrorUnexpectedEndOfExpression
 * @class
 * @protected
 */
class CriticalParserErrorUnexpectedEndOfExpression extends ParserException {
    constructor() {
        super(`Critical parser error: unexprected end of expression`);
    }
}

/**
 * Критическая ошибка парсера, неожиданный конец ввода
 *
 * @memberof Poonya.Exceptions
 * @name CriticalParserErrorUnexpectedEndOfInputException
 * @class
 * @protected
 */
class CriticalParserErrorUnexpectedEndOfInputException extends ParserException {
    constructor() {
        super(`Critical parser error: unexpected end of input`);
    }
}

/**
 * Критическая ошибка парсера, не переданны данные для парсинга
 *
 * @memberof Poonya.Exceptions
 * @name CriticalParserErrorNoRawDataTransmittedException
 * @class
 * @protected
 */
class CriticalParserErrorNoRawDataTransmittedException extends ParserException {
    constructor() {
        super(`Critical parser error: no raw data transmitted`);
    }
}

/**
 * Прыжок через два уровня
 *
 * @memberof Poonya.Exceptions
 * @name BadArrowNotationJTException
 * @class
 * @protected
 */
class BadArrowNotationJTException extends ParserException {
    constructor() {
        super(`Bad array notation: jumping two levels is not possible`);
    }
}

/**
 * Неожиданный переход на более высокий уровень
 *
 * @memberof Poonya.Exceptions
 * @name BadArrowNotationJTULException
 * @class
 * @protected
 */
class BadArrowNotationJTULException extends ParserException {
    constructor() {
        super(`Bad array notation: unexpected transition to a upper level`);
    }
}

/**
 * Невозможно создать пустой объект, ключи уже объявлены
 *
 * @memberof Poonya.Exceptions
 * @name BadEmptyObjectException
 * @class
 * @protected
 */
class BadEmptyObjectException extends ParserException {
    constructor() {
        super(`Cannot create an empty object after declaring its keys`);
    }
}

/**
 * Неправильный тип ключа
 *
 * @memberof Poonya.Exceptions
 * @name BadKeyInvalidTypeException
 * @class
 * @protected
 */
class BadKeyInvalidTypeException extends PoonyaException {
    constructor() {
        super(`Wrong key type: it can be set only by a numeric or string key`);
    }
}

/**
 * Невозможно создать пустой объект, ключи уже объявлены
 *
 * @memberof Poonya.Exceptions
 * @name BadKeyProtectedFieldException
 * @class
 * @protected
 */
class BadKeyProtectedFieldException extends PoonyaException {
    constructor() {
        super(`Cannot set this field, the field is protected from changes`);
    }
}

/**
 * Попытка создать объект вызывав его как функцию
 *
 * @memberof Poonya.Exceptions
 * @name UnableToCreateAnObjectException
 * @class
 * @protected
 */
class UnableToCreateAnObjectException extends PoonyaException {
    constructor() {
        super(
            `Unable to create an object by calling its constructor as a function, pick ConstructorName -> *;`
        );
    }
}

/**
 * Попытка вызывать несуществующий констурктор
 *
 * @memberof Poonya.Exceptions
 * @name IsNotAConstructorException
 * @class
 * @protected
 */
class IsNotAConstructorException extends PoonyaException {
    constructor(path) {
        super(
            `${path
                .map(e => (typeof e === 'number' ? '[' + e + ']' : e.toString()))
                .join(' -> ')} - not a constructor`
        );
    }
}

/**
 * Рекурсивное включение файла, когда файл пытается заинклудить сам себя.
 *
 * @memberof Poonya.Exceptions
 * @name IsRecursiveLink
 * @class
 * @protected
 */
 class IsRecursiveLink extends PoonyaException {
    constructor(path) {
        super('The "' + path + '" source file has a recursive inclusion of itself');
    }
}

module.exports.IOError = IOError;
module.exports.IsRecursiveLink = IsRecursiveLink;
module.exports.LinkerIOError = LinkerIOError;
module.exports.LinkerException = LinkerException;
module.exports.PoonyaException = PoonyaException;
module.exports.ParserException = ParserException;
module.exports.TheSequenceException = TheSequenceException;
module.exports.ParserLogicException = ParserLogicException;
module.exports.GetFieldOfNullException = GetFieldOfNullException;
module.exports.BadEmptyObjectException = BadEmptyObjectException;
module.exports.UnexpectedTokenException = UnexpectedTokenException;
module.exports.UnexpectedTokenStatement = UnexpectedTokenStatement;
module.exports.FieldNotAFunctionException = FieldNotAFunctionException;
module.exports.BadKeyInvalidTypeException = BadKeyInvalidTypeException;
module.exports.IsNotAConstructorException = IsNotAConstructorException;
module.exports.ParserEmtyArgumentException = ParserEmtyArgumentException;
module.exports.LinkerPathNotGiveException = LinkerPathNotGiveException;
module.exports.CriticalParserErrorException = CriticalParserErrorException;
module.exports.NativeFunctionExecutionError = NativeFunctionExecutionError;
module.exports.BadKeyProtectedFieldException = BadKeyProtectedFieldException;
module.exports.TheFieldMustBeNumberException = TheFieldMustBeNumberException;
module.exports.NativeFunctionReturnValueError = NativeFunctionReturnValueError;
module.exports.UnableToRecognizeTypeException = UnableToRecognizeTypeException;
module.exports.TheFieldNotHasDeclaredExceprion = TheFieldNotHasDeclaredExceprion;
module.exports.UnableToCreateAnObjectException = UnableToCreateAnObjectException;
module.exports.BadArrowNotationJumpingTwoLevels = BadArrowNotationJTException;
module.exports.UnexpectedWordTypeAndGetException = UnexpectedWordTypeAndGetException;
module.exports.ParserUnfinishedNotationException = ParserUnfinishedNotationException;
module.exports.BadArrowNotationJumpingToUpperLevel = BadArrowNotationJTULException;
module.exports.TheFieldMustBeAnArrayInstanceExceprion = TheFieldMustBeAnArrayInstanceExceprion;
module.exports.TheFieldAlreadyHasBeenDeclaredException = TheFieldAlreadyHasBeenDeclaredException;
module.exports.SegmentationFaultEmptyArgumentException = SegmentationFaultEmptyArgumentException;
module.exports.InvalidSequenceForLetiableAccessException = InvalidSequenceForLetiableAccessException;
module.exports.CriticalParserErrorUnexpectedEndOfExpression = CriticalParserErrorUnexpectedEndOfExpression;
module.exports.CriticalParserErrorUnexpectedEndOfInputException = CriticalParserErrorUnexpectedEndOfInputException;
module.exports.CriticalParserErrorNoRawDataTransmittedException = CriticalParserErrorNoRawDataTransmittedException;
module.exports.SegmentationFaultMaximumSegmentsForBlockException = SegmentationFaultMaximumSegmentsForBlockException;
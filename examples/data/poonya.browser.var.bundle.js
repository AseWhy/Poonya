var poonya;poonya =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 363:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const {
  PoonyaStaticLibrary,
  FIELDFLAGS
} = __webpack_require__(802);

const QUOTE_EXP = /"/g;
const TAG_EXP = /\<([aA-zZ0-9]+)/;

function format(val) {
  if (val === null) {
    return 'null';
  }

  if (val === undefined) {
    return 'undefined';
  }

  return val.toString();
}

new class DefaultTagsStaticLibrary extends PoonyaStaticLibrary {
  constructor() {
    super('default.html.tags', false, false, 'TAGS');
    this.addField('A', 'a', FIELDFLAGS.CONSTANT);
    this.addField('ABBR', 'abbr', FIELDFLAGS.CONSTANT);
    this.addField('ADDRESS', 'address', FIELDFLAGS.CONSTANT);
    this.addField('AREA', 'area', FIELDFLAGS.CONSTANT);
    this.addField('ARTICLE', 'article', FIELDFLAGS.CONSTANT);
    this.addField('ASIDE', 'aside', FIELDFLAGS.CONSTANT);
    this.addField('AUDIO', 'audio', FIELDFLAGS.CONSTANT);
    this.addField('B', 'b', FIELDFLAGS.CONSTANT);
    this.addField('BASE', 'base', FIELDFLAGS.CONSTANT);
    this.addField('BDI', 'bdi', FIELDFLAGS.CONSTANT);
    this.addField('BDO', 'bdo', FIELDFLAGS.CONSTANT);
    this.addField('BLOCKQUOTE', 'blockquote', FIELDFLAGS.CONSTANT);
    this.addField('BODY', 'body', FIELDFLAGS.CONSTANT);
    this.addField('BR', 'br', FIELDFLAGS.CONSTANT);
    this.addField('BUTTON', 'button', FIELDFLAGS.CONSTANT);
    this.addField('CANVAS', 'canvas', FIELDFLAGS.CONSTANT);
    this.addField('CAPTION', 'caption', FIELDFLAGS.CONSTANT);
    this.addField('CITE', 'cite', FIELDFLAGS.CONSTANT);
    this.addField('CODE', 'code', FIELDFLAGS.CONSTANT);
    this.addField('COL', 'col', FIELDFLAGS.CONSTANT);
    this.addField('COLGROUP', 'colgroup', FIELDFLAGS.CONSTANT);
    this.addField('DATA', 'data', FIELDFLAGS.CONSTANT);
    this.addField('DATALIST', 'datalist', FIELDFLAGS.CONSTANT);
    this.addField('DD', 'dd', FIELDFLAGS.CONSTANT);
    this.addField('DEL', 'del', FIELDFLAGS.CONSTANT);
    this.addField('DETAILS', 'details', FIELDFLAGS.CONSTANT);
    this.addField('DFN', 'dfn', FIELDFLAGS.CONSTANT);
    this.addField('DIALOG', 'dialog', FIELDFLAGS.CONSTANT);
    this.addField('DIV', 'div', FIELDFLAGS.CONSTANT);
    this.addField('DL', 'dl', FIELDFLAGS.CONSTANT);
    this.addField('DT', 'dt', FIELDFLAGS.CONSTANT);
    this.addField('EM', 'em', FIELDFLAGS.CONSTANT);
    this.addField('EMBED', 'embed', FIELDFLAGS.CONSTANT);
    this.addField('FIELDSET', 'fieldset', FIELDFLAGS.CONSTANT);
    this.addField('FIGCAPTION', 'figcaption', FIELDFLAGS.CONSTANT);
    this.addField('FIGURE', 'figure', FIELDFLAGS.CONSTANT);
    this.addField('FOOTER', 'footer', FIELDFLAGS.CONSTANT);
    this.addField('FORM', 'form', FIELDFLAGS.CONSTANT);
    this.addField('H1', 'h1', FIELDFLAGS.CONSTANT);
    this.addField('H2', 'h2', FIELDFLAGS.CONSTANT);
    this.addField('H3', 'h3', FIELDFLAGS.CONSTANT);
    this.addField('H4', 'h4', FIELDFLAGS.CONSTANT);
    this.addField('H5', 'h5', FIELDFLAGS.CONSTANT);
    this.addField('H6', 'h6', FIELDFLAGS.CONSTANT);
    this.addField('HEAD', 'head', FIELDFLAGS.CONSTANT);
    this.addField('HEADER', 'header', FIELDFLAGS.CONSTANT);
    this.addField('HR', 'hr', FIELDFLAGS.CONSTANT);
    this.addField('HTML', 'html', FIELDFLAGS.CONSTANT);
    this.addField('I', 'i', FIELDFLAGS.CONSTANT);
    this.addField('IFRAME', 'iframe', FIELDFLAGS.CONSTANT);
    this.addField('IMG', 'img', FIELDFLAGS.CONSTANT);
    this.addField('INPUT', 'input', FIELDFLAGS.CONSTANT);
    this.addField('INS', 'ins', FIELDFLAGS.CONSTANT);
    this.addField('KBD', 'kbd', FIELDFLAGS.CONSTANT);
    this.addField('LABEL', 'label', FIELDFLAGS.CONSTANT);
    this.addField('LEGEND', 'legend', FIELDFLAGS.CONSTANT);
    this.addField('LI', 'li', FIELDFLAGS.CONSTANT);
    this.addField('LINK', 'link', FIELDFLAGS.CONSTANT);
    this.addField('MAIN', 'main', FIELDFLAGS.CONSTANT);
    this.addField('MAP', 'map', FIELDFLAGS.CONSTANT);
    this.addField('MARK', 'mark', FIELDFLAGS.CONSTANT);
    this.addField('META', 'meta', FIELDFLAGS.CONSTANT);
    this.addField('METER', 'meter', FIELDFLAGS.CONSTANT);
    this.addField('NAV', 'nav', FIELDFLAGS.CONSTANT);
    this.addField('NOSCRIPT', 'noscript', FIELDFLAGS.CONSTANT);
    this.addField('OBJECT', 'object', FIELDFLAGS.CONSTANT);
    this.addField('OL', 'ol', FIELDFLAGS.CONSTANT);
    this.addField('OPTGROUP', 'optgroup', FIELDFLAGS.CONSTANT);
    this.addField('OPTION', 'option', FIELDFLAGS.CONSTANT);
    this.addField('OUTPUT', 'output', FIELDFLAGS.CONSTANT);
    this.addField('P', 'p', FIELDFLAGS.CONSTANT);
    this.addField('PARAM', 'param', FIELDFLAGS.CONSTANT);
    this.addField('PICTURE', 'picture', FIELDFLAGS.CONSTANT);
    this.addField('PRE', 'pre', FIELDFLAGS.CONSTANT);
    this.addField('PROGRESS', 'progress', FIELDFLAGS.CONSTANT);
    this.addField('Q', 'q', FIELDFLAGS.CONSTANT);
    this.addField('RUBY', 'ruby', FIELDFLAGS.CONSTANT);
    this.addField('RB', 'rb', FIELDFLAGS.CONSTANT);
    this.addField('RT', 'rt', FIELDFLAGS.CONSTANT);
    this.addField('RTC', 'rtc', FIELDFLAGS.CONSTANT);
    this.addField('RP', 'rp', FIELDFLAGS.CONSTANT);
    this.addField('S', 's', FIELDFLAGS.CONSTANT);
    this.addField('SAMP', 'samp', FIELDFLAGS.CONSTANT);
    this.addField('SCRIPT', 'script', FIELDFLAGS.CONSTANT);
    this.addField('SECTION', 'section', FIELDFLAGS.CONSTANT);
    this.addField('SELECT', 'select', FIELDFLAGS.CONSTANT);
    this.addField('SMALL', 'small', FIELDFLAGS.CONSTANT);
    this.addField('SOURCE', 'source', FIELDFLAGS.CONSTANT);
    this.addField('SPAN', 'span', FIELDFLAGS.CONSTANT);
    this.addField('STRONG', 'strong', FIELDFLAGS.CONSTANT);
    this.addField('STYLE', 'style', FIELDFLAGS.CONSTANT);
    this.addField('SUB', 'sub', FIELDFLAGS.CONSTANT);
    this.addField('SUMMARY', 'summary', FIELDFLAGS.CONSTANT);
    this.addField('SUP', 'sup', FIELDFLAGS.CONSTANT);
    this.addField('TABLE', 'table', FIELDFLAGS.CONSTANT);
    this.addField('TBODY', 'tbody', FIELDFLAGS.CONSTANT);
    this.addField('TD', 'td', FIELDFLAGS.CONSTANT);
    this.addField('TEMPLATE', 'template', FIELDFLAGS.CONSTANT);
    this.addField('TEXTAREA', 'textarea', FIELDFLAGS.CONSTANT);
    this.addField('TFOOT', 'tfoot', FIELDFLAGS.CONSTANT);
    this.addField('TH', 'th', FIELDFLAGS.CONSTANT);
    this.addField('THEAD', 'thead', FIELDFLAGS.CONSTANT);
    this.addField('TIME', 'time', FIELDFLAGS.CONSTANT);
    this.addField('TITLE', 'title', FIELDFLAGS.CONSTANT);
    this.addField('TR', 'tr', FIELDFLAGS.CONSTANT);
    this.addField('TRACK', 'track', FIELDFLAGS.CONSTANT);
    this.addField('U', 'u', FIELDFLAGS.CONSTANT);
    this.addField('UL', 'ul', FIELDFLAGS.CONSTANT);
    this.addField('VAR', 'var', FIELDFLAGS.CONSTANT);
    this.addField('VIDEO', 'video', FIELDFLAGS.CONSTANT);
    this.addField('WBR', 'wbr', FIELDFLAGS.CONSTANT);
  }

}();
new class DefaultHtmlStaticLibrary extends PoonyaStaticLibrary {
  constructor() {
    super('default.html', false, false, 'html');
    this.addLib('default.html.tags', FIELDFLAGS.CONSTANT);
    this.addField('createElement', this.createElement, FIELDFLAGS.CONSTANT);
    this.addField('getElementName', this.getElementName, FIELDFLAGS.CONSTANT);
    this.addField('isElement', this.isElement, FIELDFLAGS.CONSTANT);
    this.addField('createTag', this.createTag, FIELDFLAGS.CONSTANT);
    this.addField('closeTag', this.closeTag, FIELDFLAGS.CONSTANT);
  }

  createElement(service, tag, content, attrs) {
    if (typeof tag === 'string' && typeof content === 'string') {
      let form_attrs = new Array();

      for (let key in attrs) form_attrs.push(`${key}="${format(attrs[key]).replace(QUOTE_EXP, '\\"')}"`);

      return `<${tag} ${form_attrs.join(' ')}>${content}</${tag}>`;
    } else {
      return null;
    }
  }

  getElementName(service, element) {
    if (typeof element == 'string') return element.match(TAG_EXP)[1];else return null;
  }

  isElement(service, element, is) {
    if (typeof element == 'string') return element.match(TAG_EXP)[1] == is;else return false;
  }

  createTag(service, tag, attrs) {
    if (typeof tag == 'string') {
      let form_attrs = new Array();

      for (let key in attrs) form_attrs.push(`${key}="${format(attrs[key]).replace(QUOTE_EXP, '\\"')}"`);

      return `<${tag}${form_attrs.length > 0 ? ' ' + form_attrs.join(' ') : ''}>`;
    } else {
      return null;
    }
  }

  closeTag(service, tag) {
    if (typeof tag == 'string') {
      return `</${tag}>`;
    } else {
      return null;
    }
  }

}();

/***/ }),

/***/ 49:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const {
  PoonyaStaticLibrary,
  PoonyaPrototype,
  FIELDFLAGS,
  Exceptions
} = __webpack_require__(802),
      date = new Date();

new class DefaultMathStaticLibrary extends PoonyaStaticLibrary {
  constructor() {
    super('default.math', false, false, 'math');
    this.addField('floor', this.floor, FIELDFLAGS.CONSTANT);
    this.addField('round', this.round, FIELDFLAGS.CONSTANT);
    this.addField('ceil', this.ceil, FIELDFLAGS.CONSTANT);
    this.addField('abs', this.abs, FIELDFLAGS.CONSTANT);
  }

  ceil(service, n) {
    if (typeof n === 'number' && !isNaN(n)) return Math.ceil(n);
    return null;
  }

  floor(service, n) {
    if (typeof n === 'number' && !isNaN(n)) return Math.floor(n);
    return null;
  }

  round(service, n) {
    if (typeof n === 'number' && !isNaN(n)) return Math.round(n);
    return null;
  }

  abs(service, n) {
    if (typeof n === 'number' && !isNaN(n)) return Math.abs(n);
    return null;
  }

}();
new class DefaultRegExpStaticLibrary extends PoonyaStaticLibrary {
  constructor() {
    super('default.regexp', false, false, 'regexp');
    this.addField('test', this.test, FIELDFLAGS.CONSTANT);
    this.addField('replace', this.replace, FIELDFLAGS.CONSTANT);
  }

  test(service, expression, flags, string) {
    return new RegExp(expression, flags ? flags : undefined).test(string);
  }

  replace(service, expression, flags, string, to) {
    return string.replace(new RegExp(expression, flags ? flags : undefined), to);
  }

}();
new class DefaultDatesStaticLibrary extends PoonyaStaticLibrary {
  constructor() {
    super('default.dates', false, false, 'dates');
    this.addField('minutes', this.minutes, FIELDFLAGS.CONSTANT);
    this.addField('seconds', this.seconds, FIELDFLAGS.CONSTANT);
    this.addField('month', this.month, FIELDFLAGS.CONSTANT);
    this.addField('hours', this.hours, FIELDFLAGS.CONSTANT);
    this.addField('year', this.year, FIELDFLAGS.CONSTANT);
    this.addField('day', this.day, FIELDFLAGS.CONSTANT);
    this.addField('now', this.now, FIELDFLAGS.CONSTANT);
  }

  year() {
    return date.getUTCFullYear();
  }

  month() {
    return date.getUTCMonth();
  }

  day() {
    return date.getUTCDay();
  }

  hours() {
    return date.getUTCHours();
  }

  minutes() {
    return date.getUTCMinutes();
  }

  seconds() {
    return date.getUTCSeconds();
  }

  now() {
    return Date.now();
  }

}();
new class DefaultNumbersStaticLibrary extends PoonyaStaticLibrary {
  constructor() {
    super('default.numbers', false, false, 'numbers');
    this.addField('random', this.random, FIELDFLAGS.CONSTANT);
    this.addField('isNumber', this.isNumber, FIELDFLAGS.CONSTANT);
    this.addField('parseInt', this.parseInt, FIELDFLAGS.CONSTANT);
  }

  random(service, f, t) {
    if (typeof f == 'number' && typeof t == 'number' && !isNaN(f) && !isNaN(t)) return Math.random();else return Math.round(f + Math.random() * (t - f));
  }

  isNumber(service, o) {
    return !isNaN(o) && typeof o === 'number';
  }

  parseInt(service, numb) {
    return isNaN(numb = parseInt(numb)) ? null : numb;
  }

}();

class PoonyaObjectPrototype extends PoonyaPrototype {
  constructor() {
    super([], 'Object');
    this.addField('create', this.create, FIELDFLAGS.CONSTANT | FIELDFLAGS.STATIC);
    this.addField('values', this.values, FIELDFLAGS.CONSTANT);
    this.addField('assign', this.assign, FIELDFLAGS.CONSTANT);
    this.addField('remove', this.remove, FIELDFLAGS.CONSTANT);
    this.addField('keys', this.keys, FIELDFLAGS.CONSTANT);
    this.addField('set', this.set, FIELDFLAGS.CONSTANT);
    this.addField('has', this.has, FIELDFLAGS.CONSTANT);
    this.addField('get', this.get, FIELDFLAGS.CONSTANT);
  }

  keys() {
    return this.keys();
  }

  values() {
    return this.values();
  }

  assign(service, ...args) {
    for (let i = 0, leng = args.length; i < leng; i++) this.append(args[i]);
  }

  set(service, key, value) {
    this.set(service.context, key, value);
  }

  has(service, key) {
    return this.has(key);
  }

  get(service, key) {
    return this.get(key);
  }

  remove(service, key) {
    this.delete(key);
  }

  create() {
    return new Object();
  }

}

class PoonyaIntegerPrototype extends PoonyaPrototype {
  constructor() {
    super([], 'Integer');
  }

}

class PoonyaNumberPrototype extends PoonyaPrototype {
  constructor() {
    super([], 'Number');
  }

}

class PoonyaBooleanPrototype extends PoonyaPrototype {
  constructor() {
    super([], 'Boolean');
  }

}

class PoonyaNullPrototype extends PoonyaPrototype {
  constructor() {
    super([], 'Null');
  }

}

class PoonyaStringPrototype extends PoonyaPrototype {
  constructor(context) {
    super([], 'String');
    this.addField('charAt', this.charAt, FIELDFLAGS.CONSTANT, context);
    this.addField('length', this.length, FIELDFLAGS.CONSTANT | FIELDFLAGS.PROPERTY, context);
  }

  charAt(service, index) {
    if (index != null) {
      return this.data.charAt(index);
    } else return null;
  }

  length(service) {
    return this.data.length;
  }

}

class PoonyaArrayPrototype extends PoonyaPrototype {
  constructor(context) {
    super([], 'Array');
    this.addField('from', this.from, FIELDFLAGS.CONSTANT | FIELDFLAGS.STATIC, context);
    this.addField('includes', this.includes, FIELDFLAGS.CONSTANT, context);
    this.addField('indexOf', this.indexOf, FIELDFLAGS.CONSTANT, context);
    this.addField('concat', this.concat, FIELDFLAGS.CONSTANT, context);
    this.addField('append', this.append, FIELDFLAGS.CONSTANT, context);
    this.addField('length', this.length, FIELDFLAGS.CONSTANT, context);
    this.addField('remove', this.remove, FIELDFLAGS.CONSTANT, context);
    this.addField('slice', this.slice, FIELDFLAGS.CONSTANT, context);
    this.addField('pop', this.pop, FIELDFLAGS.CONSTANT, context);
  }

  from(service, ...defs) {
    return defs;
  }

  includes(service, target) {
    for (let [key, value] of this.fields) {
      if (value.result(service.context, null, service.throw_error) == target) return true;
    }

    return false;
  }

  remove(service, from, to) {
    if (typeof from != 'number' || isNaN(from)) service.throw_error(service.position, new Exceptions.PoonyaException('From must have a number type'));
    if (typeof to != 'number' || isNaN(to)) service.throw_error(service.position, new Exceptions.PoonyaException('To must have a number type'));
    const delta = to - from;

    while (from != to) {
      this.remove(from);
      from += delta;
    }
  }

  indexOf(service, target) {
    for (let [key, value] of this.fields) {
      if (value.result(service.context, null, service.throw_error) == target) return key;
    }

    return -1;
  }

  length() {
    return this.fields.size;
  }

  append(service, value) {
    this.push(value);
  }

  concat(service, ...args) {
    for (let i = 0, leng = args.length; i < leng; i++) {
      for (let j = 0, j_leng = args[i].length; j < j_leng; j++) {
        this.push(args[i][j]);
      }
    }
  }

  slice(service, from, to) {
    if (typeof from != 'number' || isNaN(from)) service.throw_error(service.position, new Exceptions.PoonyaException('From must have a number type'));
    if (typeof to != 'number' || isNaN(to)) service.throw_error(service.position, new Exceptions.PoonyaException('To must have a number type'));
    const delta = to - from,
          out = new Array();

    while (from != to) {
      out.push(this.get(from));
      from += delta;
    }

    return out;
  }

  pop(service) {
    const buffer = this.fields.get(this.fields.size - 1);
    this.fields.remove(this.fields.size - 1);
    return buffer;
  }

}

new class DefaultStaticLibrary extends PoonyaStaticLibrary {
  constructor() {
    super('default', true);
    this.expandPrototype(PoonyaObjectPrototype);
    this.expandPrototype(PoonyaArrayPrototype);
    this.expandPrototype(PoonyaStringPrototype);
    this.expandPrototype(PoonyaIntegerPrototype);
    this.expandPrototype(PoonyaBooleanPrototype);
    this.expandPrototype(PoonyaNumberPrototype);
    this.expandPrototype(PoonyaNullPrototype);
    this.addField('endd', '\n\n', FIELDFLAGS.CONSTANT);
    this.addField('endl', '\n', FIELDFLAGS.CONSTANT);
    this.addField('tab', '\t', FIELDFLAGS.CONSTANT);
    this.addField('log', this.log, FIELDFLAGS.CONSTANT);
    this.addLib('default.numbers');
    this.addLib('default.regexp');
    this.addLib('default.dates');
    this.addLib('default.math');
  }

  log(service, ...args) {
    console.log(...args);
  }

}();

/***/ }),

/***/ 18:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/common/ParserData.js
 * @description Cодержит прототипы исполняемых данных.
 * @author Astecom
 * @license MIT
 */
const {
  OPERATOR
} = __webpack_require__(718);
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

/***/ }),

/***/ 240:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/data/NativeFunction.js
 * @description Содержит в себе объект нативной функции, которая так-же вызывается при вызове функции
 * @author Astecom
 * @license MIT
 */
const {
  Operand
} = __webpack_require__(18),
      {
  SERVICE
} = __webpack_require__(718),
      {
  NativeFunctionExcecutionError
} = __webpack_require__(880),
      {
  iPoonyaObject,
  iPoonyaPrototype
} = __webpack_require__(540);
/**
 * @lends NativeFunction
 * @class
 */


class NativeFunction {
  /**
   * Нативная функция, невозможно создать по средствам шаблона
   *
   * @param {Function} func функция, котороая будет вызвана при попытке результировать значение
   * @constructs NativeFunction
   * @memberof Poonya.Expression
   * @protected
   */
  constructor(func) {
    this.target = func;
    this.name = func.name;
  }
  /**
   * Вызывает функцию, которая была передана как параметр при создании нативной функции
   *
   * @param {Array<Any>} args аргументы функции
   * @param {iContext} context Контекст выполнения фукнции
   * @param {iPoonyaObject} thisArgs родительский объект
   * @param {Function} throw_error Метод выбрасывания ошибок
   * @param {Number} call_pos Позиция из которой происходит вызов
   *
   * @returns {Any} в зависимости от результата выполнения нативной функции
   */


  result(thisArg = null, args, context, out, call_pos, throw_error) {
    let data,
        args_f = new Array();

    for (let i = 0, leng = args.length; i < leng; i++) {
      args_f.push(args[i].result(context, out, throw_error) // Получаем значение poonya
      .result(context, out, throw_error) // Преобразуем в нативное значение
      );
    }

    try {
      data = this.target.call(thisArg, {
        args,
        context,
        throw_error,
        position: call_pos
      }, ...args_f);
    } catch (e) {
      throw_error(call_pos, new NativeFunctionExcecutionError(this.target.name, e.stack));
    }

    switch (typeof data) {
      case 'bigint':
        return context.createObject(data, -1, SERVICE.CONSTRUCTORS.INTEGER, null);

      case 'number':
        return context.createObject(data, -1, SERVICE.CONSTRUCTORS.NUMBER, null);

      case 'string':
        return context.createObject(data, -1, SERVICE.CONSTRUCTORS.STRING, null);

      case 'symbol':
        return context.createObject(Symbol.keyFor(data), -1, SERVICE.CONSTRUCTORS.STRING, null);

      case 'boolean':
        return context.createObject(data, -1, SERVICE.CONSTRUCTORS.BOOLEAN, null);

      case 'undefined':
        return context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null);

      case 'object':
        switch (true) {
          case data === null:
            return context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null);

          case data instanceof iPoonyaObject:
          case data instanceof Operand:
          case data instanceof iPoonyaPrototype:
            return data;

          default:
            if (Array.isArray(data)) return context.createObject(data, -1, SERVICE.CONSTRUCTORS.ARRAY, null);else return context.createObject(data, -1, SERVICE.CONSTRUCTORS.OBJECT, null);
        }

      case 'function':
        return new NativeFunction(data);
    }
  }

}

module.exports = NativeFunction;

/***/ }),

/***/ 609:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/data/PoonyaArray.js
 * @description Cодержит класс массива Poonya
 * @author Astecom
 * @license MIT
 */
const {
  FIELDFLAGS
} = __webpack_require__(718),
      PoonyaObject = __webpack_require__(741),
      NativeFunction = __webpack_require__(240);
/**
 * @lends PoonyaArray
 * @class
 */


class PoonyaArray extends PoonyaObject {
  /**
   * Дескриптор массива в poonya
   *
   * @param {iPoonyaPrototype} prototype Прототип массива
   * @param {Object} init Объект, который будет использоваться для иницализации текущего массива
   * @param {iContext} context Текущий контекст, который будет использовать при кастинге значений
   * 
   * @memberof Poonya.Data
   * @constructs PoonyaArray
   * @extends PoonyaObject
   * @public
   */
  constructor(prototype = null, init, context) {
    super(prototype);

    if (init) {
      if (Array.isArray(init)) {
        for (let i = 0, leng = init.length; i < leng; i++) {
          this.push(context, init[i]);
        }
      } else {
        for (let key in init) {
          switch (typeof key) {
            case "string":
              this.set(context, parseInt(key), init[key]);
              break;

            case "number":
              this.set(context, key, init[key]);
              break;
          }
        }
      }
    }
  }
  /**
   * Возвращает копию этого объекта
   * 
   * @returns {PoonyaArray} клонированый объект
   */


  clone() {
    const obj = new PoonyaArray(this.prototype);
    obj.fields = new Map(this.fields);
    obj.field_attrs = new Map(this.field_attrs);
    return obj;
  }
  /**
   * Добавляет данные в модуль памяти
   *
   * @param {iContext} context контекст, по которому будет преобразовано значение в случе необходимости
   * @param {Object} data данные которые нужно добавить
   * @param {Array<Any>} parents_three стэк родителей добавляемого значения
   * @method
   * @public
   */


  push(context, data, parents_three = new Array()) {
    this.set(context, this.fields.size, data, parents_three);
  }
  /**
   * Сериализует массив в javascript массив
   *
   * @override
   * @method
   * @public
   */


  result(context, out, throw_error) {
    let output = new Array(this.fields.size),
        data;

    for (let [key, value] of this.fields) {
      data = this.field_attrs.get(key);
      if (data == null || (data & FIELDFLAGS.NOOUTPUT) === 0) if (value instanceof NativeFunction) output[key] = value != null ? value.target : null;else output[key] = value != null ? value.result(context, out, throw_error) : null;
    }

    return output;
  }
  /**
   * Сериализует массив в простое значение.
   *
   * @override
   * @method
   * @public
   */


  toRawData() {
    return `[Array:${this.prototype.name}]`;
  }

}

module.exports = PoonyaArray;

/***/ }),

/***/ 481:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/data/PoonyaBoolean.js
 * @description Cодержит класс булевого значения Poonya
 * @author Astecom
 * @license MIT
 */
const PoonyaObject = __webpack_require__(741);
/**
 * @lends PoonyaBoolean
 * @class
 */


class PoonyaBoolean extends PoonyaObject {
  /**
   * Дескриптор массива в poonya
   *
   * @param {iPoonyaPrototype} prototype Прототип массива
   * @param {Boolean} init Исходное значение
   * 
   * @memberof Poonya.Data
   * @constructs PoonyaBoolean
   * @extends PoonyaObject
   * @public
   */
  constructor(prototype = null, init) {
    super(prototype);
    this.data = init;
  }
  /**
   * Применяет новое значение к текущему объекту
   * 
   * @param {Boolean} value значение, которое нужно применить к этомй объекту
   * @method
   * @override
   */


  append(value) {
    this.data = value;
  }
  /**
   * Возвращает копию этого объекта
   * 
   * @returns {PoonyaBoolean} клонированый объект
   */


  clone() {
    return new PoonyaBoolean(this.prototype, this.data);
  }
  /**
   * Устанавливать значения булевому значеню нельзя
   * 
   * @override
   * @method
   * @public
   */


  set() {}
  /**
   * Удалять значения булевому значеню нельзя
   * 
   * @override
   * @method
   * @public
   */


  remove() {}
  /**
   * Сериализует булевое значение в значение результата выполнения
   *
   * @override
   * @method
   * @public
   */


  result(context, out, throw_error) {
    return this.data;
  }
  /**
   * Сериализует булевое значение в javascript boolean
   *
   * @override
   * @method
   * @public
   */


  toRawData() {
    return this.data;
  }

}

module.exports = PoonyaBoolean;

/***/ }),

/***/ 526:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/data/PoonyaInteger.js
 * @description Cодержит класс целого числа Poonya
 * @author Astecom
 * @license MIT
 */
const PoonyaObject = __webpack_require__(741);
/**
 * @lends PoonyaInteger
 * @class
 */


class PoonyaInteger extends PoonyaObject {
  /**
   * Дескриптор массива в poonya
   *
   * @param {iPoonyaPrototype} prototype Прототип массива
   * @param {BigInt} init Исходное целое число
   * 
   * @memberof Poonya.Data
   * @constructs PoonyaInteger
   * @extends PoonyaObject
   * @public
   */
  constructor(prototype = null, init) {
    super(prototype);
    this.data = init;
  }
  /**
   * Возвращает копию этого объекта
   * 
   * @returns {PoonyaInteger} клонированый объект
   */


  clone() {
    return new PoonyaInteger(this.prototype, this.data);
  }
  /**
   * Применяет новое значение к текущему объекту
   * 
   * @param {BigInt} value значение, которое нужно применить к этомй объекту
   * @method
   * @override
   */


  append(value) {
    this.data = value;
  }
  /**
   * Устанавливать значения целому числу нельзя
   * 
   * @override
   * @method
   * @public
   */


  set() {}
  /**
   * Удалять значения целому числу нельзя
   * 
   * @override
   * @method
   * @public
   */


  remove() {}
  /**
   * Сериализует челое число в значение результата выполнения
   *
   * @override
   * @method
   * @public
   */


  result(context, out, throw_error) {
    return this.data;
  }
  /**
   * Сериализует челое число в javascript bigint
   *
   * @override
   * @method
   * @public
   */


  toRawData() {
    return this.data;
  }

}

module.exports = PoonyaInteger;

/***/ }),

/***/ 711:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/data/PoonyaNull.js
 * @description Cодержит класс null объекта Poonya
 * @author Astecom
 * @license MIT
 */
const PoonyaObject = __webpack_require__(741);
/**
 * @lends PoonyaNull
 * @class
 */


class PoonyaNull extends PoonyaObject {
  /**
   * Дескриптор массива в poonya
   *
   * @param {iPoonyaPrototype} prototype Прототип массива
   * 
   * @memberof Poonya.Data
   * @constructs PoonyaNull
   * @extends PoonyaObject
   * @public
   */
  constructor(prototype = null) {
    super(prototype);
  }
  /**
   * Возвращает копию этого объекта
   * 
   * @returns {PoonyaNull} клонированый объект
   */


  clone() {
    return new PoonyaNull(this.prototype);
  }
  /**
   * Применяет новое значение к текущему объекту
   * 
   * @param {Boolean} value значение, которое нужно применить к этомй объекту
   * @method
   * @override
   */


  append(value) {}
  /**
   * Устанавливать значения для null нельзя
   * 
   * @override
   * @method
   * @public
   */


  set() {}
  /**
   * Удалять значения для null нельзя
   * 
   * @override
   * @method
   * @public
   */


  remove() {}
  /**
   * Сериализует null в значение резуьтата выполнения
   *
   * @override
   * @method
   * @public
   */


  result(context, out, throw_error) {
    return null;
  }
  /**
   * Сериализует null в javascript null
   *
   * @override
   * @method
   * @public
   */


  toRawData() {
    return null;
  }

}

module.exports = PoonyaNull;

/***/ }),

/***/ 418:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/data/PoonyaNumber.js
 * @description Cодержит класс числа Poonya
 * @author Astecom
 * @license MIT
 */
const PoonyaObject = __webpack_require__(741);
/**
 * @lends PoonyaNumber
 * @class
 */


class PoonyaNumber extends PoonyaObject {
  /**
   * Дескриптор массива в poonya
   *
   * @param {iPoonyaPrototype} prototype Прототип массива
   * @param {Number} init Исходное число
   * 
   * @memberof Poonya.Data
   * @constructs PoonyaNumber
   * @extends PoonyaObject
   * @public
   */
  constructor(prototype = null, init) {
    super(prototype);
    this.data = init;
  }
  /**
   * Возвращает копию этого объекта
   * 
   * @returns {PoonyaNumber} клонированый объект
   */


  clone() {
    return new PoonyaNumber(this.prototype, this.data);
  }
  /**
   * Применяет новое значение к текущему объекту
   * 
   * @param {Number} value значение, которое нужно применить к этомй объекту
   * @method
   * @override
   */


  append(value) {
    this.data = value;
  }
  /**
   * Устанавливать значения числу нельзя
   * 
   * @override
   * @method
   * @public
   */


  set() {}
  /**
   * Удалять значения числу нельзя
   * 
   * @override
   * @method
   * @public
   */


  remove() {}
  /**
   * Сериализует число значение результата выполнения
   *
   * @override
   * @method
   * @public
   */


  result(context, out, throw_error) {
    return this.data;
  }
  /**
   * Сериализует число в javascript число
   *
   * @override
   * @method
   * @public
   */


  toRawData() {
    return this.data;
  }

}

module.exports = PoonyaNumber;

/***/ }),

/***/ 741:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/data/PoonyaObject.js
 * @description Cодержит класс объекта Poonya
 * @author Astecom
 * @license MIT
 */
const {
  BadKeyInvalidTypeException,
  BadKeyProtectedFieldException
} = __webpack_require__(880),
      {
  iContext
} = __webpack_require__(540),
      {
  SUPER_CALL,
  GET,
  FIELDFLAGS,
  CONFIG
} = __webpack_require__(718),
      {
  Cast
} = __webpack_require__(0),
      {
  iPoonyaObject,
  iPoonyaPrototype
} = __webpack_require__(540),
      NativeFunction = __webpack_require__(240);
/**
 * @lends PoonyaObject
 * @class
 */


class PoonyaObject extends iPoonyaObject {
  /**
   * Дескриптор объекта в poonya
   *
   * @param {PoonyaObject} prototype - Прототип объекта, если необходимо
   * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память
   * @param {Object} init - Объект инициализации
   * 
   * @memberof Poonya.Data
   * 
   * @constructs PoonyaObject
   * @public
   */
  constructor(prototype, init, context) {
    super();
    this.fields = new Map();
    this.field_attrs = new Map();
    this.raw = false;

    if (prototype instanceof iPoonyaPrototype) {
      prototype[SUPER_CALL](this);
      this.prototype = prototype;
    }

    if (init != null) this.append(context, init);
  }
  /**
   * Возвращает копию этого объекта
   * 
   * @returns {PoonyaObject} клонированый объект
   */


  clone() {
    const obj = new PoonyaObject(this.prototype);
    obj.fields = new Map(this.fields);
    obj.field_attrs = new Map(this.field_attrs);
    return obj;
  }
  /**
   * Проверяет, существует ли ключ в текущем объекте
   *
   * @param {String} key ключ который прверяем
   * @method
   * @public
   */


  has(key) {
    return this.fields.has(key);
  }
  /**
   * Удаляет ключ из объекта
   *
   * @param {String} key ключ который нужно удалить
   * @method
   * @public
   */


  remove(key) {
    return this.fields.delete(key) && this.field_attrs.delete(key);
  }
  /**
   * Получет значение из текущей области памяти по ключу `key`
   *
   * @param {String} key ключ, по которому происходит получение значения
   * @param {iContext} context контекст, который будет использоваться для кастинга значения
   * @method
   * @public
   */


  get(key, context) {
    let data = this.fields.get(key);

    if (data != null) {
      return data;
    } else {
      return this.prototype[GET](key, context, false);
    }
  }
  /**
   * Запрещает изменение поля
   *
   * @param {String|Number} key ключ для получения поля
   * @public
   * @method
   */


  setConstant(key) {
    let current = 0x0;

    if ((current = this.field_attrs.get(key)) != null) {
      this.field_attrs.set(key, current | FIELDFLAGS.CONSTANT);
    } else {
      throw new Error('Cannot find filed ' + key + ' in ' + this.prototype.name + '.Object');
    }
  }
  /**
   * Скрывает поле при выводе
   *
   * @param {String|Number} key ключ для получения поля
   * @public
   * @method
   */


  setHide(key) {
    let current = 0x0;

    if ((current = this.field_attrs.get(key)) != null) {
      this.field_attrs.set(key, current | FIELDFLAGS.NOOUTPUT);
    } else {
      throw new Error('Cannot find filed ' + key + ' in ' + this.prototype.name + '.Object');
    }
  }
  /**
   * Обновляет данные в текущем объекте
   *
   * @param {iContext} context контекст, по которому будет приобразовано значение в случае необходимости
   * @param {Object} data данные которые нужно обновить
   * 
   * @method
   * @public
   */


  append(context, data) {
    if (typeof data === "object") {
      if (Array.isArray(data)) {
        for (let i = 0, leng = data.length; i < leng; i++) this.set(context, i, data[i], data);
      } else {
        if (data instanceof PoonyaObject) {
          for (let entry of data.fields) {
            this.set(context, entry[0], entry[1]);
          }
        } else {
          for (let key in data) this.set(context, key, data[key]);
        }
      }
    } else {
      throw new TypeError();
    }
  }
  /**
   * Устанавливает значение для текущей области памяти
   *
   * @param {String} key ключ по которому будет происходить установка
   * @param {Object} data данные которые будут установлены
   * @param {?Array<Object>} parents_three стэк родителей
   * @method
   * @public
   */


  set(context, key, data, parents_three = new Array()) {
    if (typeof key !== "string" && typeof key !== "number") throw new BadKeyInvalidTypeException();
    const attrs = this.field_attrs.get(key);
    if (attrs != null && (attrs & FIELDFLAGS.CONSTANT) === 0) throw new BadKeyProtectedFieldException();

    try {
      this.fields.set(key, Cast(data, context, parents_three));
    } catch (e) {
      if (CONFIG.DEBUG) console.error(e);
      throw new Error("Error when cast value of " + key);
    }
  }
  /**
   * Возвращает строковой эквивалент объекта
   *
   * @param {iContext} context текущий контекст
   * @param {Array<String>} out Выходной массив
   * @param {Function} throw_error Функция вызывающаяся при ошибках
   * 
   * @returns {String}
   */


  toString(context, out, throw_error) {
    let toString = this.fields.get('toString');

    if (toString != null) {
      return toString.result(context, out, throw_error);
    } else {
      return `[Object${this.prototype.name}]`;
    }
  }
  /**
   * ДеСериализует значени объекта в javascript объект
   *
   * @param {?iContext} context текущий контекст
   * @param {?Array<String>} out Выходной массив
   * @param {?Function} throw_error Функция вызывающаяся при ошибках
   * @method
   * @public
   */


  result(context, out, throw_error) {
    let output = new Object(),
        data;

    for (let [key, value] of this.fields) {
      data = this.field_attrs.get(key);
      if (data == null || (data & FIELDFLAGS.NOOUTPUT) === 0) if (value instanceof NativeFunction) output[key] = value != null ? value.target : null;else output[key] = value != null ? value.result(context, out, throw_error) : null;
    }

    return output;
  }
  /**
   * Сериализует объект в простое значение.
   *
   * @override
   * @method
   * @public
   */


  toRawData() {
    return `[Object:${this.prototype.name}]`;
  }

}

module.exports = PoonyaObject;

/***/ }),

/***/ 494:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/data/PoonyaPrototype.js
 * @description Cодержит объект прототипа объекта Poonya
 * @author Astecom
 * @license MIT
 */
const {
  IS,
  GET,
  FIELDFLAGS,
  SUPER_CALL
} = __webpack_require__(718),
      {
  iPoonyaPrototype
} = __webpack_require__(540),
      {
  Cast
} = __webpack_require__(0);
/**
 * @lends PoonyaPrototype
 * @class
 */


class PoonyaPrototype extends iPoonyaPrototype {
  /**
   * Прототип объекта, позволяет
   *
   * @param {?PoonyaPrototype[]} parents прототипы объекта, если необходимо
   * @param {String} name имя прототипа, который необъодимо создать
   *
   * @property {String} name имя прототипа
   * @property {PoonyaPrototype[]} _parents
   * @property {Map<String|Number, Operand>} _fields_data
   * @property {Map<String|Number, Number>} _fields
   *
   * @memberof Poonya.Data
   * @constructs PoonyaPrototype
   * @public
   */
  constructor(parents = [], name) {
    super();
    if (parents.find(e => !e instanceof iPoonyaPrototype) != null) throw new Error('Only descendants of iPoonyaPrototype should be specified as parents of the target class');

    if (typeof name === 'string' || name == null) {
      this.name = name != null ? name : 'Object';
    } else {
      throw new Error('Only string value can be passed as name');
    }

    this._parents = [...parents];
    this._fields_data = new Map();
    this._fields = new Map();
  }
  /**
   * Возвращает копию этого объекта
   * 
   * @returns {PoonyaPrototype} клонированый объект
   */


  clone() {
    const obj = new PoonyaPrototype(this._parents, this.name);
    obj._fields = new Map(this._fields);
    obj._fields_data = new Map(this._fields_data);
    return obj;
  }
  /**
   * Добавляет родительский прототип целевому
   *
   * @param {iPoonyaPrototype} parent прототип объекта
   * @memberof Poonya
   * @constructs PoonyaObject
   * @public
   */


  addParent(parent) {
    if (parent instanceof iPoonyaPrototype) this._parents.push(parent);else throw new TypeError("Parent must be an iPoonyaPrototype instance.");
  }
  /**
   * Устанавливает данные прототипа объекта
   *
   * @param {String} field поле которое нужно установить
   * @param {Any} data данные которые нужно установить
   * @param {FIELDFLAGS} flags флаги поля
   * @method
   * @public
   */


  addField(field, data, flags, context) {
    this._fields.set(field, Cast(data, context));

    this._fields_data.set(field, flags);
  }
  /**
   * Проверяет, является ли текщуий прототип, наследником другого протитипа
   *
   * @param {String} key ключ прототипа, который ищем
   * @returns {Boolean} является ли текущий прототип подтипом другого прототипа
   * @protected
   * @method
   */


  [IS](key) {
    if (key === this.name) return true;else for (let i = 0, leng = this._parents; i < leng; i++) {
      if (this._parents[IS](key)) return true;
    }
    return false;
  }
  /**
   * Получает статическое значение прототипа
   *
   * @param {String} key ключ, по которому получаем значение
   * @param {iContext} context объект, который хочет получить поле
   * @param {Boolean} static_assces если true - то значит поле пытваются получить не создав объект - т.е. статически
   * @protected
   * @method
   * @returns {Operand|null}
   */


  [GET](key, context, static_assces = true) {
    // Буффер данных
    let data;

    if ((data = this._fields.get(key)) != null) {
      if (!static_assces || (this._fields_data.get(key) & FIELDFLAGS.STATIC) !== 0) return data;else return null;
    } else {
      for (let i = 0, leng = this._parents.length; i < leng; i++) {
        if (data = this._parents[i].get(key, context, static_assces) != null) {
          return data;
        }
      }

      return null;
    }
  }
  /**
   * Вызывает супер вызов всех родительских конструкторов
   *
   * @param {PoonyaObject} child дочерний объект, который необходимо собрать
   * @method
   * @protected
   */


  [SUPER_CALL](child) {
    // Копируем значения полей 
    for (let [key, value] of this._fields_data) child.field_attrs.set(key, value); // Вызываем конструкторы родительских прототипов


    for (let i = 0, leng = this._parents.length; i < leng; i++) this._parents[i][SUPER_CALL](child);
  }
  /**
   * Сериализует объект в простое значение.
   *
   * @override
   * @method
   * @public
   */


  toRawData() {
    return `[Prototype:${this.name}]`;
  }

}

module.exports = PoonyaPrototype;

/***/ }),

/***/ 419:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/data/PoonyaString.js
 * @description Cодержит класс строки Poonya
 * @author Astecom
 * @license MIT
 */
const PoonyaObject = __webpack_require__(741);
/**
 * @lends PoonyaString
 * @class
 */


class PoonyaString extends PoonyaObject {
  /**
   * Дескриптор объекта строки в poonya
   *
   * @param {iPoonyaPrototype} prototype Прототип строки
   * @param {String} init Исходная строка
   * 
   * @memberof Poonya.Data
   * @constructs PoonyaString
   * @extends PoonyaObject
   * @public
   */
  constructor(prototype = null, init) {
    super(prototype);
    this.data = init;
  }
  /**
   * Возвращает копию этого объекта
   * 
   * @returns {PoonyaString} клонированый объект
   */


  clone() {
    return new PoonyaString(this.prototype, this.data);
  }
  /**
   * Применяет новое значение к текущему объекту
   * 
   * @param {String} value значение, которое нужно применить к этомй объекту
   * @method
   * @override
   */


  append(value) {
    this.data = value;
  }
  /**
   * Получает символ по индексу, или значени из прототипа по ключу.
   * 
   * @param {String|Number} key ключ, по которому нужно получить значение
   * @param {iContext} context контекст, который будет использоваться для кастинга значения
   * 
   * @method
   * @override
   */


  get(key, context) {
    let data = this.data[key];

    if (typeof data === 'string') {
      return new PoonyaString(this.prototype, data);
    } else {
      return super.get(key, context);
    }
  }
  /**
   * Устанавливать значения строке нельзя
   * 
   * @override
   * @method
   * @public
   */


  set() {}
  /**
   * Удалять значения строке нельзя
   * 
   * @override
   * @method
   * @public
   */


  remove() {}
  /**
   * Сериализует строку значение результата
   *
   * @override
   * @method
   * @public
   */


  result(context, out, throw_error) {
    return this.data;
  }
  /**
   * Сериализует строку в javascript строку
   *
   * @override
   * @method
   * @public
   */


  toRawData() {
    return this.data;
  }

}

module.exports = PoonyaString;

/***/ }),

/***/ 888:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/excecution/expression/ExpressionGroup.js
 * @description Cодержит группу выражений, которая выполняется при выполнении выражения
 * @author Astecom
 * @license MIT
 */
const {
  Operand,
  Operator
} = __webpack_require__(18),
      {
  CHARTYPE,
  OPERATOR,
  SERVICE
} = __webpack_require__(718),
      {
  UnableToRecognizeTypeException,
  TheSequenceException
} = __webpack_require__(880),
      {
  Cast
} = __webpack_require__(0),
      ObjectContructorCall = __webpack_require__(202);
/**
 * @lends MessagePattern;
 */


class ExpressionGroup extends Operand {
  /**
   * Группа выражения, водержит последовательность, кторая выполняется как выражение.
   *
   * @param {Number} position начало выражения
   * @param {?Array<LexerEntry>} initial иницированное значение выражения
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
   * @param {LexerEntry} entry Выхождение, которое нужно добавить
   * @param {Function} throw_error Функция выбрасывания ошибок
   *
   * @throws {Exceptions.TheSequenceException}
   *
   * @public
   * @method
   */


  append(entry, throw_error) {
    let current;

    switch (entry.type) {
      case CHARTYPE.NUMBER:
        current = new ObjectContructorCall(SERVICE.CONSTRUCTORS.NUMBER, parseInt(entry.data.toString()), entry.position);
        break;

      case CHARTYPE.STRING:
        current = new ObjectContructorCall(SERVICE.CONSTRUCTORS.STRING, entry.data.toString(), entry.position);
        break;

      case CHARTYPE.OPERATOR:
        current = new Operator(entry);
        break;

      case CHARTYPE.WORD:
        switch (entry.data.toString()) {
          case 'true':
            current = new ObjectContructorCall(SERVICE.CONSTRUCTORS.BOOLEAN, true, entry.position);
            break;

          case 'false':
            current = new ObjectContructorCall(SERVICE.CONSTRUCTORS.BOOLEAN, false, entry.position);
            break;

          case 'null':
            current = new ObjectContructorCall(SERVICE.CONSTRUCTORS.NULL, null, entry.position);
            break;
        }

        break;

      default:
        if (entry instanceof Operator || entry instanceof Operand) current = entry;else throw_error(entry.position, new UnableToRecognizeTypeException(entry.type));
        break;
    }

    if (this.data.length !== 0 && (current instanceof Operator && this.data[this.data.length - 1] instanceof Operator || current instanceof Operand && this.data[this.data.length - 1] instanceof Operand)) throw_error(entry.position, new TheSequenceException(current, this.data[this.data.length - 1]));
    this.data.push(current);
  }
  /**
   * Окончательно форматирует выражение по всем правилоам алгебры.
   *
   * @param {Function} throw_error Функция выбрасывания ошибок
   *
   * @public
   * @method
   */


  complete(throw_error) {
    // Stage 1 => 2 + 2 * 2 => 2 + (2 * 2)
    if (this.data.filter(e => e.op_p === OPERATOR.MULT || e.op_p === OPERATOR.DIVIDE).length > 0) {
      let mltexp = false,
          dump = Array.from(this.data),
          stack = null;
      this.data.splice(0, this.data.length);

      for (let i = 0, leng = dump.length; i < leng; i++) {
        if (dump[i + 1] && dump[i + 1].type === 'operator') switch (dump[i + 1].op_p) {
          case OPERATOR.MULT:
          case OPERATOR.DIVIDE:
            if (mltexp) break;
            mltexp = true;
            stack = new ExpressionGroup(dump[i + 1].position);
            this.append(stack, throw_error);
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
            stack.append(dump[i], throw_error);
            stack.complete();
            stack = null;
            continue;

          default:
            break;
        }

        if (mltexp) {
          stack.append(dump[i], throw_error); // Добавляем в суб стек
        } else {
          this.append(dump[i], throw_error); // Добавляем в основной стек
        }
      }
    } // Stage 2 => a & b => (a) & (b)


    if (this.data.filter(e => e.op_p === OPERATOR.AND).length > 0) {
      let dump = Array.from(this.data),
          stack = new ExpressionGroup(dump[0].position);
      this.data.splice(0, this.data.length);

      for (let i = 0, leng = dump.length; i < leng; i++) {
        if (dump[i] && dump[i].type === 'operator' && dump[i].op_p === OPERATOR.AND) {
          stack.complete();
          this.append(stack, throw_error);
          this.append(dump[i], throw_error);
          stack = new ExpressionGroup(dump[i].position);
          continue;
        }

        stack.append(dump[i], throw_error);
      }

      stack.complete();
      this.append(stack, throw_error);
    } // Stage 3 => a | b => (a) | (b)


    if (this.data.filter(e => e.op_p === OPERATOR.OR).length > 0) {
      let dump = Array.from(this.data),
          stack = new ExpressionGroup(dump[0].position);
      this.data.splice(0, this.data.length);

      for (let i = 0, leng = dump.length; i < leng; i++) {
        if (dump[i] && dump[i].type === 'operator' && dump[i].op_p === OPERATOR.OR) {
          stack.complete();
          this.append(stack, throw_error);
          this.append(dump[i], throw_error);
          stack = new ExpressionGroup(dump[i].position);
          continue;
        }

        stack.append(dump[i], throw_error);
      }

      stack.complete();
      this.append(stack, throw_error);
    }

    this.validated = true;
  }
  /**
   * Выполняет последовательность выражения, возвращая результат выполнения
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @returns {Any} В зависимости от результатов выполнения выражения
   * @throws {ParserException}
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    let result = this.data[0] != null ? this.data[0].result(context, out, throw_error) // Результируем значение функции
    .result(context, out, throw_error) // Результируем значение контейнера
    : null;

    for (let i = 1, leng = this.data.length, cur; i < leng; i += 2) {
      // Получем значение функции
      cur = this.data[i + 1].result(context, out, throw_error);

      switch (true) {
        case this.data[i].equals(OPERATOR.PLUS):
          result += cur.toRawData();
          break;

        case this.data[i].equals(OPERATOR.MINUS):
          result -= cur.toRawData();
          break;

        case this.data[i].equals(OPERATOR.MULT):
          result *= cur.toRawData();
          break;

        case this.data[i].equals(OPERATOR.DIVIDE):
          result /= cur.toRawData();
          break;

        case this.data[i].equals(OPERATOR.LARGER):
          result = result > cur.toRawData();
          break;

        case this.data[i].equals(OPERATOR.LESS):
          result = result < cur.toRawData();
          break;

        case this.data[i].equals(OPERATOR.EQUAL):
          result = result == cur.toRawData();
          break;

        case this.data[i].equals(OPERATOR.ELARGER):
          result = result >= cur.toRawData();
          break;

        case this.data[i].equals(OPERATOR.ELESS):
          result = result <= cur.toRawData();
          break;

        case this.data[i].equals(OPERATOR.NEQUAL):
          result = result != cur.toRawData();
          break;

        case this.data[i].equals(OPERATOR.AND):
          result = result && cur.toRawData();
          if (!result) return result;
          break;

        case this.data[i].equals(OPERATOR.OR):
          result = result || cur.toRawData();
          if (result) return result;
          break;
      }
    }

    return Cast(result, context);
  }

}

module.exports = ExpressionGroup;

/***/ }),

/***/ 408:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/excecution/expression/FunctionCall.js
 * @description Содержит в себе вхождение вызовва функции
 * @author Astecom
 * @license MIT
 */
const {
  Operand
} = __webpack_require__(18),
      {
  UnableToCreateAnObjectException,
  FieldNotAFunctionException
} = __webpack_require__(880),
      {
  iPoonyaPrototype
} = __webpack_require__(540);

NativeFunction = __webpack_require__(240);
/**
 * @lends FunctionCall
 * @protected
 */

class FunctionCall extends Operand {
  /**
   * Вхождение вызова функции, после выполнения этого вхождения будет вызвана нативная функция
   *
   * @param {CodeEmitter} эмиттер который будет исполнятся при сполнении этого выхождения
   *
   * @constructs FunctionCall
   * @extends Operand
   * @memberof Poonya.Expression
   * @protected
   */
  constructor(query_stack, args, position) {
    super('call function');
    this.query_stack = [...query_stack];
    this.position = position;
    this.args = args;
  }
  /**
   * Получает переменную заданную литералами
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @returns {Any} В зависимости от возвращаемых функцией значения
   * @throws {ParserException}
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    const data = context.getByPath(this.query_stack, this.position, null, throw_error, true);
    if (data.instance instanceof NativeFunction) return data.instance.result(data.parent, this.args, context, out, this.position, throw_error);else if (data.instance instanceof iPoonyaPrototype) throw_error(this.position, new UnableToCreateAnObjectException());else {
      throw_error(this.position, new FieldNotAFunctionException(this.query_stack[this.query_stack.length - 1]));
    }
  }
  /**
   * Сериализует текущий объект в строку
   *
   * @returns {String} Строковое представление вызова функции
   * @public
   * @method
   */


  toString() {
    return '(' + this.query_stack.join(' => ') + ') <== (' + this.args.join(', ') + ')';
  }

}

module.exports = FunctionCall;

/***/ }),

/***/ 338:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/excecution/expression/GetOperator.js
 * @description Содержит в себе оператор получения значения по индексам
 * @author Astecom
 * @license MIT
 */
const {
  Operand
} = __webpack_require__(18),
      {
  SERVICE,
  FIELDFLAGS
} = __webpack_require__(718),
      NativeFunction = __webpack_require__(240);
/**
 * @lends GetOperator
 * @protected
 */


class GetOperator extends Operand {
  /**
   * Данные вызова шаблона, если передать в heap шаблон, то он выполнится с текущей памятью
   *
   * @param {CodeEmitter} эмиттер который будет исполнятся при сполнении этого выхождения
   *
   * @constructs GetOperator
   * @extends Operand
   * @memberof Poonya.Expression
   * @protected
   */
  constructor(position, stack) {
    super('get');
    this.position = position;
    this.query_stack = stack;
  }
  /**
   * Получает переменную заданную литералами
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @returns {Any} В зависимости от типа запрашиваемых данных
   * @throws {ParserException}
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    const data = context.getByPath(this.query_stack, this.position, null, throw_error, true);
    if (data.instance != null) {
      if (data.instance instanceof NativeFunction) {
        if ((data.flags & FIELDFLAGS.PROPERTY) != 0) return data.instance.result(data.parent, [], context, out, this.position, throw_error);else return context.createObject(`[NativeCode:${data.instance.name}]`, this.position, SERVICE.CONSTRUCTORS.STRING, throw_error);
      } else return data.instance;
    } else return context.createObject(null, this.position, SERVICE.CONSTRUCTORS.NULL, throw_error);
  }
  /**
   * Сериализует текущий объект в строку
   *
   * @returns {String} Строковое представление получения доступа к полям
   * @public
   * @method
   */


  toString() {
    return '(' + this.query_stack.join(' => ') + ')';
  }

}

module.exports = GetOperator;

/***/ }),

/***/ 202:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/excecution/expression/ObjectContructorCall.js
 * @description Содержит в конструктор объекта который сериализуется как
 *  Object ->
 *      field -> value...
 * @author Astecom
 * @license MIT
 */
const {
  Operand
} = __webpack_require__(18);
/**
 * @lends ObjectContructorCall
 * @protected
 */


class ObjectContructorCall extends Operand {
  /**
   * Литеральный конструктор объекта
   *
   * @param {String[]} query_stack путь к конструктору в памяти
   * @param {Map<String, ExpressionGroup>|String|Number|Boolean|BigInt} initial данные объекта для инициализации
   * @param {Number} position позиция начала объявления объекта
   *
   * @constructs ObjectContructorCall
   * @extends Operand
   * @memberof Poonya.Expression
   * @protected
   */
  constructor(query_stack, initial, position) {
    super('object-creator');
    this.query_stack = query_stack != null ? query_stack : SERVICE.CONSTRUCTORS.OBJECT;
    this.initial = initial;
    this.position = position;
  }
  /**
   * Сериализует текущий объект в строку
   *
   * @param {String} indent отступ слева, для более понятного отображения кода
   * @returns {String} Строковое представление выражения while
   * @public
   * @method
   */


  toString(indent = '\t') {
    if (this.initial instanceof Map) {
      const items = [...this.initial.entries()];
      return 'new (' + this.query_stack.map(e => typeof e !== 'string' ? `[${e.toString()}]` : e.toString()).join(' => ') + ') -> ' + (items.length > 0 ? '\n' + items.map((e, i) => {
        if (e[1] instanceof ObjectContructorCall) return indent + e[0] + ' -> ' + e[1].toString(indent + '\t');else return indent + e[0] + ' -> ' + e[1].toString(indent + '\t') + (i + 1 != items.length ? ',' : '');
      }).join('\n') : '*');
    } else {
      return `(${this.initial}) <- (${this.query_stack.map(e => typeof e !== 'string' ? `[${e.toString()}]` : e.toString()).join(' => ')})`;
    }
  }
  /**
   * Коздает новый объект с инициированным значением `initial`
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @throws {ParserException}
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    return context.createObject(this.initial, this.position, this.query_stack, throw_error);
  }

}

module.exports = ObjectContructorCall;

/***/ }),

/***/ 335:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/excecution/expression/TernarOperator.js
 * @description Содержит в себе тернарный оператор, который сериализуется как <condition> ? <v1> : <v2>
 * @author Astecom
 * @license MIT
 */
const {
  Operand
} = __webpack_require__(18);
/**
 * @lends TernarOperator
 * @protected
 */


class TernarOperator extends Operand {
  /**
   * Создает тернарные оператор
   *
   * @param {ExpressionGroup} condition Выражение условие
   * @param {ExpressionGroup} v1 Выражение, если истина
   * @param {ExpressionGroup} v2 Выражение, если ложь
   *
   * @constructs TernarOperator
   * @extends Operand
   * @memberof Poonya.Expression
   * @protected
   */
  constructor(condition, v1, v2) {
    super('ternar');
    this.condition = condition;
    this.v_o = v1;
    this.v_t = v2;
  }
  /**
   * Сериализует текущий объект в строку
   *
   * @returns {String} Строковое представление теранарного оператора
   * @public
   * @method
   */


  toString(indent) {
    return '< ' + this.condition.toString(indent + '\t') + ' > ? ' + this.v_o + ' : ' + this.v_t;
  }
  /**
   * Выполняет теранарный оператор
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @returns {Any} В зависимости от возвращаемых операндами (`v1`, `v2`) начений
   * @throws {ParserException}
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    if (context.toBooleanResult(this.condition.result(context, out, throw_error))) return this.v_o.result(context, out, throw_error);else return this.v_t.result(context, out, throw_error);
  }

}

module.exports = TernarOperator;

/***/ }),

/***/ 342:
/***/ ((module) => {

/**
 * @file src/classes/excecution/statements/IfStatement.js
 * @description Содержит в себе оператор if, который используется для создания условных операций
 * @author Astecom
 * @license MIT
 */

/**
 * @lends IfStatement
 * @protected
 */
class IfStatement {
  /**
   * Дескриптор оператора if
   *
   * @param {ExpressionGroup} condition Выражение - условие
   * @param {SequenceGroup} body_true Исполняемая последовательность, если true
   * @param {SequenceGroup} body_false Исполняемая последовательность, если false
   *
   * @constructs IfStatement
   * @memberof Poonya.Statements
   * @protected
   */
  constructor(condition, body_true, body_false) {
    this.condition = condition;
    this.body_true = body_true;
    this.body_false = body_false;
  }
  /**
   * Сериализует текущий объект в строку
   *
   * @param {String} indent отступ слева, для более понятного отображения кода
   * @returns {String} Строковое представление выражения if
   * @public
   * @method
   */


  toString(indent) {
    return 'if (' + this.condition.toString(indent) + ') ' + this.body_true.toString(indent) + (this.body_false != null ? ' else ' + this.body_false.toString(indent) : '');
  }
  /**
   * Выполняет проверку условия, и выполняет нужную группу в зависимости от результатов выполнения условия
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @throws {ParserException}
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    if (context.toBooleanResult(this.condition.result(context, out, throw_error))) this.body_true.result(context, out, throw_error);else if (this.body_false != null) this.body_false.result(context, out, throw_error);
  }

}

module.exports = IfStatement;

/***/ }),

/***/ 625:
/***/ ((module) => {

/**
 * @file src/classes/excecution/statements/OutOperator.js
 * @description Содержит в себе оператор вывода, который используется для вывода информации из шаблона
 * @author Astecom
 * @license MIT
 */

/**
 * @lends OutOperator
 * @protected
 */
class OutOperator {
  /**
   * Оператор вывода который Сериализуется как > (...expression)
   * Выводит данные из шаблона
   *
   * @constructs OutOperator
   *
   * @param {ExpressionGroup} expression выражение, результаты выполнения которого будем выводить
   *
   * @memberof Poonya.Statements
   * @protected
   */
  constructor(expression) {
    this.expression = expression;
    this.position = expression.position;
  }
  /**
   * Сериализует текущий объект в строку
   *
   * @returns {String} Строковое представление вывода выражения
   * @public
   * @method
   */


  toString() {
    return '> ' + this.expression.toString();
  }
  /**
   * Выполняет вывод информации из шаблона
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @throws {ParserException}
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    out.write(this.expression.result(context, out, throw_error).result(context, out, throw_error));
  }

}

module.exports = OutOperator;

/***/ }),

/***/ 902:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/excecution/statements/PushOperator.js
 * @description Содержит в себе оператор вставки, который используется для обновления массива, путем вставки в его конец значения
 * @author Astecom
 * @license MIT
 */
const ExpressionGroup = __webpack_require__(888),
      {
  TheFieldMustBeAnArrayInstanceExceprion,
  GetFieldOfNullException
} = __webpack_require__(880),
      PoonyaArray = __webpack_require__(609),
      PoonyaObject = __webpack_require__(741);
/**
 * @lends PushOperator
 * @protected
 */


class PushOperator {
  /**
   * Объект который Сериализуется как var_name <- (expression...)
   * Это опреатор для работы с массивами, и он заменяет свойство push
   *
   * @param {Number} position Позиция в начала оператора во входящих данных
   * @param {String[]} query_stack Путь к полю которое поле получит
   * @param {ExpressionGroup} value Данные которые нужно устновить
   *
   * @constructs PushOperator
   * @memberof Poonya.Statements
   * @protected
   */
  constructor(position, query_stack, value) {
    this.query_stack = query_stack;
    this.position = position;
    this.value = value;
  }
  /**
   * Сериализует текущий объект в строку
   *
   * @returns {String} Строковое представление добавления элемента в массив (операция push)
   * @public
   * @method
   */


  toString(indent) {
    return '(' + this.query_stack.map(e => typeof e === 'number' ? `[${e}]` : e).join(' => ') + ') <- ' + this.value.toString(indent + '\t');
  }
  /**
   * Производит добавление значения `value` в массив который должен быть передан как левый операнд
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @throws {Exceptions.ParserException}
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    let query_data = context.get(this.query_stack[0]),
        query_stack = [...this.query_stack];

    if (query_data instanceof PoonyaObject) {
      let index = 1;

      for (let leng = query_stack.length; query_data && index < leng; index++) {
        if (query_stack[index] instanceof ExpressionGroup) query_stack[index] = query_stack[index].result(context, out, throw_error).toRawData();
        query_data = query_data.get(query_stack[index]) || null;
      }

      if (query_data instanceof PoonyaArray) query_data.push(context, this.value.result(context, out, throw_error));else throw_error(this.position, new TheFieldMustBeAnArrayInstanceExceprion(query_stack[index - 1]));
    } else throw_error(this.position, new GetFieldOfNullException(query_stack[0]));
  }

}

module.exports = PushOperator;

/***/ }),

/***/ 567:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/excecution/statements/RepeatStatement.js
 * @description Содержит в себе оператор repeat, который используется для создания цикличных конечных конструкций
 * @author Astecom
 * @license MIT
 */
const {
  TheFieldMustBeNumberException
} = __webpack_require__(880),
      PoonyaNumber = __webpack_require__(418);
/**
 * @lends RepeatStatement;
 * @protected
 */


class RepeatStatement {
  /**
   * Дескриптор оператора repeat
   *
   * @param {ExpressionGroup} from Выражение - выполнять c
   * @param {ExpressionGroup} to Выражение - выполнять по
   * @param {SequenceGroup} body Основная исполняемая последовательность
   *
   * @constructs RepeatStatement
   * @memberof Poonya.Statements
   * @protected
   */
  constructor(from, to, body) {
    this.from = from;
    this.to = to;
    this.body = body;
  }
  /**
   * Сериализует текущий объект в строку
   *
   * @param {String} indent отступ слева, для более понятного отображения кода
   * @returns {String} Строковое представление выражения repeat
   * @public
   * @method
   */


  toString(indent) {
    return 'repeat (' + this.from.toString(indent) + '; ' + this.to.toString(indent) + ') ' + this.body.toString(indent);
  }
  /**
   * Выполняет главную выполняему последовательность от `from` до `to`
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @throws {ParserException}
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    let from = this.from.result(context, out, throw_error),
        to = this.to.result(context, out, throw_error),
        difference;
    if (!(from instanceof PoonyaNumber)) throw_error(this.from.position, new TheFieldMustBeNumberException('From'));
    if (!(to instanceof PoonyaNumber)) throw_error(this.to.position, new TheFieldMustBeNumberException('To'));
    difference = (from = Math.floor(from.result(context, out, throw_error))) < (to = Math.floor(to.result(context, out, throw_error))) ? 1 : -1;

    while (from != to) {
      context.addLevel();
      context.set('current', from, 'up');
      this.body.result(context, out, throw_error, false);
      from += difference;
      context.popLevel();
    }
  }

}

module.exports = RepeatStatement;

/***/ }),

/***/ 447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/excecution/statements/ResetOperator.js
 * @description Содержит в себе оператор обновления значения переменной
 * @author Astecom
 * @license MIT
 */
const ExpressionGroup = __webpack_require__(888),
      {
  iPoonyaObject
} = __webpack_require__(540),
      {
  TheFieldNotHasDeclaredExceprion,
  GetFieldOfNullException
} = __webpack_require__(880);
/**
 * @lends ResetOperator
 * @protected
 */


class ResetOperator {
  /**
   * Производит переустновку значения переменной переданной как левой операнд на выражение, которое передано как правый операнд.
   * Объект который сериализуется как name = (...expression)
   *
   * @param {Number} position Позиция в начала оператора во входящих данных
   * @param {String[]} query_stack Путь поля в памяти
   * @param {ExpressionGroup} value Данные которые нужно устновить
   *
   * @constructs PushOperator
   * @memberof Poonya.Statements
   * @protected
   */
  constructor(position, query_stack, value) {
    this.query_stack = query_stack;
    this.position = position;
    this.value = value;
  }
  /**
   * Сериализует текущий объект в строку
   *
   * @returns {String} Строковое представление переопределения переменной
   * @public
   * @method
   */


  toString(indent) {
    return '(' + this.query_stack.map(e => typeof e === 'number' ? `[${e}]` : e).join(' => ') + ') = ' + this.value.toString(indent + '\t');
  }
  /**
   * Производит переопределение перемнной
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @throws {ParserException}
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    let query_data = context.get(this.query_stack[0]),
        query_stack = [...this.query_stack];

    if (query_stack.length > 1) {
      let index = 1;

      for (let leng = query_stack.length - 1; query_data && index < leng; index++) {
        if (query_stack[index] instanceof ExpressionGroup) query_stack[index] = query_stack[index].result(context, out, throw_error).toRawData();
        query_data = query_data.get(query_stack[index]) || null;
      }

      if (query_data instanceof iPoonyaObject) {
        const last_index = query_stack[query_stack.length - 1];
        query_data.set(context, last_index instanceof ExpressionGroup ? last_index.result(context, out, throw_error).toRawData() : last_index, this.value.result(context, out, throw_error));
      } else throw_error(this.position, new GetFieldOfNullException(query_stack[index]));
    } else {
      if (query_data != null) context.set(query_stack[0], this.value.result(context, out, throw_error));else throw_error(this.position, new TheFieldNotHasDeclaredExceprion(query_stack[0]));
    }
  }

}

module.exports = ResetOperator;

/***/ }),

/***/ 967:
/***/ ((module) => {

/**
 * @file src/classes/excecution/statements/SequenceGroup.js
 * @description Содержит в себе дочернуюю исполняемую группу, которая, при нормальных услвиях, является чустью главной исполняемой группы.
 * @author Astecom
 * @license MIT
 */

/**
 * @lends SequenceGroup;
 * @protected
 */
class SequenceGroup {
  /**
   * Исполняемая последовательность
   *
   * @constructs SequenceGroup
   * @memberof Poonya.Statements
   * @protected
   */
  constructor() {
    this.Sequence = new Array();
  }
  /**
   * Добавляет элемент в стэк
   *
   * @param {Any} elem То что добавляем в стэк исполнения
   *
   * @public
   * @method
   */


  push(elem) {
    this.Sequence.push(elem);
  }
  /**
   * Выполняет текущую последовательность
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @public
   * @method
   */


  result(context, out, throw_error, level_ops = true) {
    if (level_ops) context.addLevel();

    for (let i = 0, leng = this.Sequence.length; i < leng; i++) {
      this.Sequence[i].result(context, out, throw_error);
    }

    if (level_ops) context.popLevel();
  }
  /**
   * Сериализует текущую группу в текст
   *
   * @param {String} indent отступ слева, для лучшей читаемости
   * @returns {String} отфрматированный текст
   */


  toString(indent = 0) {
    return `{\n${indent}${this.Sequence.map(e => e.toString(indent + '\t')).join('\n\n' + indent)}\n${indent.substring(0, indent.length - 1)}}`;
  }

}

module.exports = SequenceGroup;

/***/ }),

/***/ 946:
/***/ ((module) => {

/**
 * @file src/classes/excecution/statements/SequenceMainGroup.js
 * @description Содержит в себе оператор главную сполняемую группу, т.е. группу которая явлся родетелем дочерних исполняемых групп, при нормальных условиях.
 * @author Astecom
 * @license MIT
 */

/**
 * @lends SequenceMainGroup;
 * @protected
 */
class SequenceMainGroup {
  /**
   * Главная исполняемая последовательность
   *
   * @param {Array} init Данные для инициалзации
   *
   * @constructs SequenceMainGroup
   * @memberof Poonya.Statements
   * @protected
   */
  constructor(init) {
    this.Sequence = Array.isArray(init) ? init : new Array();
  }
  /**
   * Добавляет элемент в стэк
   *
   * @param {Any} elem То что добавляем в стэк исполнения
   *
   * @public
   * @method
   */


  push(elem) {
    this.Sequence.push(elem);
  }
  /**
   * Выполняет текущую последовательность
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    for (let i = 0, leng = this.Sequence.length; i < leng; i++) this.Sequence[i].result(context, out, throw_error);
  }
  /**
   * Сериализует текущую группу в текст
   *
   * @param {String} indent отступ слева, для лучшей читаемости
   * @returns {String} отфрматированный текст
   */


  toString(indent = '\t') {
    return `{\n${indent}${this.Sequence.map(e => e.toString(indent + '\t')).join('\n\n' + indent)}\n${indent.substring(0, indent.length - 1)}}`;
  }

}

module.exports = SequenceMainGroup;

/***/ }),

/***/ 782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/excecution/statements/SetOperator.js
 * @description Содержит в себе оператор set, который используется для устновки значения в области памяти
 * @author Astecom
 * @license MIT
 */
const {
  TheFieldAlreadyHasBeenDeclaredException
} = __webpack_require__(880);
/**
 * @lends SetOperator
 * @protected
 */


class SetOperator {
  /**
   * Объект который Сериализуется как set = (expression...)
   *
   * @param {String} name поле, которое нужно установить в текущем контексте
   * @param {ExpressionGroup} value Значение, которое поле получит после выполнения этого вхождения
   *
   * @constructs SetOperator
   * @memberof Poonya.Statements
   * @protected
   */
  constructor(name, value) {
    this.name = name.toString();
    this.position = name.position;
    this.value = value;
  }
  /**
   * Сериализует текущий объект в строку
   *
   * @returns {String} Строковое представление устновки значения переменной
   * @public
   * @method
   */


  toString(indent) {
    return 'set ' + this.name + ' = ' + this.value.toString(indent + '\t');
  }
  /**
   * Производит установку значения переменной в текущем контексте
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @throws {ParserException}
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    if (!context.has(this.name, 'up')) {
      context.set(this.name, this.value.result(context, out, throw_error), 'up');
    } else {
      throw_error(this.position, new TheFieldAlreadyHasBeenDeclaredException(this.name));
    }
  }

}

module.exports = SetOperator;

/***/ }),

/***/ 627:
/***/ ((module) => {

/**
 * @file src/classes/excecution/statements/WhileStatement.js
 * @description Содержит в себе оператор while, который используется для создания цикличных условных операций
 * @author Astecom
 * @license MIT
 */

/**
 * @lends WhileStatement
 * @protected
 */
class WhileStatement {
  /**
   * Дескриптор оператора while
   *
   * @param {ExpressionGroup} condition Выражение - условие
   * @param {SequenceGroup} body Основная исполняемая последовательность
   *
   * @constructs WhileStatement
   * @memberof Poonya.Statements
   * @protected
   */
  constructor(condition, body) {
    this.condition = condition;
    this.body = body;
  }
  /**
   * Сериализует текущий объект в строку
   *
   * @param {String} indent отступ слева, для более понятного отображения кода
   * @returns {String} Строковое представление выражения while
   * @public
   * @method
   */


  toString(indent) {
    return 'while (' + this.condition.toString(indent) + ') ' + this.body.toString(indent);
  }
  /**
   * Выполняет основной блок, до тех пор, пока выполняется условие переданное первым аргументом
   *
   * @param {iContext} context Контекст выполнения
   * @param {PoonyaOutputStream} out вывод шаблонизатора
   * @param {Function} throw_error Вызывается при ошибке
   *
   * @throws {ParserException}
   *
   * @public
   * @method
   */


  result(context, out, throw_error) {
    while (context.toBooleanResult(this.condition.result(context, out, throw_error))) this.body.result(context, out, throw_error);
  }

}

module.exports = WhileStatement;

/***/ }),

/***/ 880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/classes/exceptions.js
 * @description Тут я сгруппировал всевозможные исклюения
 * @author Astecom
 * @license MIT
 */
const {
  SERVICE
} = __webpack_require__(718),
      {
  dirname
} = __webpack_require__(386);
/**
 * Класс ошибки шаблонизатора
 *
 * @memberof Poonya.Exceptions
 * @name ParserException
 * @class
 * @protected
 */


class PoonyaException {
  constructor(header, message) {
    this.message = 'PoonyaException / ' + header + (message != null ? ': \n' + message : '');
  }

}
/**
 * Основное исключение шаблонизатора
 *
 * @memberof Poonya.Exceptions
 * @name ParserException
 * @class
 * @protected
 */


class ParserException extends PoonyaException {
  constructor() {
    super('Error when processing raw data');
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


class TheSequenceException extends PoonyaException {
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


class UnexpectedTokenException extends PoonyaException {
  constructor(token, expected) {
    super(`Unexpected token '${token.toString()}' when expected '${expected.toString()}'`);
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


class UnexpectedTokenStatement extends PoonyaException {
  constructor(statement, token, expected) {
    super(`Error parsing the '${statement.toString()}' statement. Expected '${expected.toString()}', when actually: '${token.toString()}'`);
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


class ParserLogicException extends PoonyaException {
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


class ParserEmtyArgumentException extends PoonyaException {
  constructor() {
    super('It is not possible to pass an empty argument to a function, use null to denote an empty value');
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


class LinkerPathNotGiveExceptrion extends PoonyaException {
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


class IOError extends PoonyaException {
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
 * @name NativeFunctionExcecutionError
 * @class
 * @protected
 */


class NativeFunctionExcecutionError extends PoonyaException {
  constructor(name, stack) {
    const exp = /^\s*at\s(?:new\s)?([aA-zZ.аА-яЯё]+)\s\((.*)\)$/;
    stack = stack.split('\n');

    for (let i = 0, leng = stack.length, cur; i < leng; i++) {
      if (exp.test(stack[i])) {
        cur = stack[i].match(exp);

        if (cur[1] === 'NativeFunction.result' && SERVICE.ROOTPATH == dirname(cur[2]).substring(0, SERVICE.ROOTPATH.length)) {
          stack = stack.slice(0, i);
          break;
        }
      }
    }

    super("Critical error while executing a native function '" + name + "'", '* > \t' + stack.join('\n * > \t'));
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


class UnableToRecognizeTypeException extends PoonyaException {
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


class SegmentationFaultEmptyArgumentException extends PoonyaException {
  constructor(blockname) {
    super(`Segmentation fault: empty argument for ` + blockname);
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


class SegmentationFaultMaximumSegmentsForBlockException extends PoonyaException {
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


class UnexpectedWordTypeAndGetException extends PoonyaException {
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


class InvalidSequenceForLetiableAccessException extends PoonyaException {
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


class CriticalParserErrorException extends PoonyaException {
  constructor() {
    super(`Critical parser error`);
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


class CriticalParserErrorUnexpectedEndOfInputException extends PoonyaException {
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


class CriticalParserErrorNoRawDataTransmittedException extends PoonyaException {
  constructor() {
    super(`Critical parser error: no raw data transmitted`);
  }

}
/**
 * Прыжок через два уровня
 *
 * @memberof Poonya.Exceptions
 * @name BadArrowNotationJumpingTwoLevels
 * @class
 * @protected
 */


class BadArrowNotationJumpingTwoLevels extends PoonyaException {
  constructor() {
    super(`Bad array notation: jumping two levels is not possible`);
  }

}
/**
 * Неожиданный переход на более высокий уровень
 *
 * @memberof Poonya.Exceptions
 * @name BadArrowNotationJumpingToUpperLevel
 * @class
 * @protected
 */


class BadArrowNotationJumpingToUpperLevel extends PoonyaException {
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


class BadEmptyObjectException extends PoonyaException {
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
    super(`Unable to create an object by calling its constructor as a function, pick ConstructorName -> *;`);
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
    super(`${path.map(e => typeof e === 'number' ? '[' + e + ']' : e.toString()).join(' -> ')} - not a constructor`);
  }

}

module.exports.IOError = IOError;
module.exports.LinkerIOError = LinkerIOError;
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
module.exports.LinkerPathNotGiveExceptrion = LinkerPathNotGiveExceptrion;
module.exports.CriticalParserErrorException = CriticalParserErrorException;
module.exports.NativeFunctionExcecutionError = NativeFunctionExcecutionError;
module.exports.BadKeyProtectedFieldException = BadKeyProtectedFieldException;
module.exports.TheFieldMustBeNumberException = TheFieldMustBeNumberException;
module.exports.NativeFunctionReturnValueError = NativeFunctionReturnValueError;
module.exports.UnableToRecognizeTypeException = UnableToRecognizeTypeException;
module.exports.TheFieldNotHasDeclaredExceprion = TheFieldNotHasDeclaredExceprion;
module.exports.UnableToCreateAnObjectException = UnableToCreateAnObjectException;
module.exports.BadArrowNotationJumpingTwoLevels = BadArrowNotationJumpingTwoLevels;
module.exports.UnexpectedWordTypeAndGetException = UnexpectedWordTypeAndGetException;
module.exports.BadArrowNotationJumpingToUpperLevel = BadArrowNotationJumpingToUpperLevel;
module.exports.TheFieldMustBeAnArrayInstanceExceprion = TheFieldMustBeAnArrayInstanceExceprion;
module.exports.TheFieldAlreadyHasBeenDeclaredException = TheFieldAlreadyHasBeenDeclaredException;
module.exports.SegmentationFaultEmptyArgumentException = SegmentationFaultEmptyArgumentException;
module.exports.InvalidSequenceForLetiableAccessException = InvalidSequenceForLetiableAccessException;
module.exports.CriticalParserErrorUnexpectedEndOfInputException = CriticalParserErrorUnexpectedEndOfInputException;
module.exports.CriticalParserErrorNoRawDataTransmittedException = CriticalParserErrorNoRawDataTransmittedException;
module.exports.SegmentationFaultMaximumSegmentsForBlockException = SegmentationFaultMaximumSegmentsForBlockException;

/***/ }),

/***/ 540:
/***/ ((module) => {

/**
 * @file src/interfaces.js
 * @description Тут собраны интерфейсы, для боллее удобного последующего сравнения объектов
 * @license MIT
 * @author Astecom
 */
// Storage
class iContext {} // Datas


class iPoonyaObject {}

class iPoonyaPrototype {}

module.exports.iContext = iContext;
module.exports.iPoonyaObject = iPoonyaObject;
module.exports.iPoonyaPrototype = iPoonyaPrototype;

/***/ }),

/***/ 718:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/static.js
 * @description Содержит в себе набор статических полей
 * @license MIT
 * @author Astecom
 */
const {
  EventEmitter
} = __webpack_require__(246); // Защищенные поля для PoonyaPrototype


const GET = Symbol('GET'),
      IS = Symbol('IS'),
      SUPER_CALL = Symbol('SEPER_CALL');
/**
 * Типы символов
 *
 * @memberof Poonya.Static
 * @constant CHARTYPE
 * @property {Number} START     - Стартовый символ, ничего не значит        ``
 * @property {Number} NUMBER    - Числовой тип                              `0-9.0-9`
 * @property {Number} WORD      - Литеральный тип `                         `set`
 * @property {Number} SPACE     - Тип пробела                               ` \t`
 * @property {Number} POINT     - Тип точки                                 `.`
 * @property {Number} STRING    - Строковой тип                             `'something...'`
 * @property {Number} NEWLINE   - Тип новой строки                          `\n|\r`
 * @property {Number} OPERATOR  - Тип оператора                             `= > <...`
 * @protected
 * @enum
 * @static
 */

const CHARTYPE = {
  START: 0x0,
  NUMBER: 0x2,
  WORD: 0x3,
  SPACE: 0x4,
  POINT: 0x5,
  STRING: 0x6,
  NEWLINE: 0x7,
  OPERATOR: 0x8
};
/**
 * Типы операторов
 *
 * @memberof Poonya.Static
 * @constant OPERATOR
 * @property {Number} PLUS      - Оператор сложения                         `+`
 * @property {Number} MINUS     - Оператор вычитания                        `-`
 * @property {Number} MULT      - Оператор умножения                        `*`
 * @property {Number} DIVIDE    - Оператор деления                          `/`
 * @property {Number} EQUAL     - Оператор сравнения                        `=`
 * @property {Number} NEQUAL    - Оператор сложжения (отр)                  `!=`
 * @property {Number} LARGER    - Оператор сравнение (a больше b)           `>`
 * @property {Number} LESS      - Оператор сравнение (a меньше b)           `<`
 * @property {Number} ELARGER   - Оператор сравнение (a больше или равно b) `>=`
 * @property {Number} ELESS     - Оператор сравнение (a меньши или равно b) `<=`
 * @property {Number} AND       - Оператор сравнение (a и b)                `&`
 * @property {Number} OR        - Оператор сравнение (a или b)              `|`
 * @protected
 * @enum
 * @static
 */

const OPERATOR = {
  PLUS: 0x0,
  MINUS: 0x1,
  MULT: 0x2,
  DIVIDE: 0x3,
  EQUAL: 0x4,
  NEQUAL: 0x5,
  LARGER: 0x6,
  LESS: 0x7,
  ELARGER: 0x8,
  ELESS: 0x9,
  AND: 0xa,
  OR: 0xb
};
/**
 * Флаги для полей
 *
 * @memberof Poonya.Static
 * @constant FIELDFLAGS
 * @property {Number} NOOUTPUT - Запрет вывода, при серриализации объекта в объект js, это поле будет скрыто
 * @property {Number} CONSTANT - Константное значение, невозможно изменить оператором присваивания
 * @property {Number} STATIC   - Статическое значение прототипа
 * @property {Number} PROPERTY - Сделать это поле доступным как свойство
 * @protected
 * @enum
 * @static
 */

const FIELDFLAGS = {
  NOOUTPUT: 0x1,
  CONSTANT: 0x2,
  STATIC: 0x4,
  PROPERTY: 0x8
};
/**
 * Занимаемая область в глобальном контексте
 *
 * @memberof Poonya.Static
 * @constant NAMESPACE
 * @protected
 * @static
 */

const NAMESPACE = Symbol.for('POONYA-' + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + '-win32');
/**
 * Сервисная константа, для служебной информации
 *
 * @memberof Poonya.Static
 * @constant SERVICE
 * @property {Number} CONSTRUCTORS - конструкторы объектов
 * @property {String} ROOTPATH - путь к src папке
 * @protected
 * @static
 */

const SERVICE = {
  CONSTRUCTORS: {
    OBJECT: ['Object'],
    ARRAY: ['Array'],
    BOOLEAN: ['Boolean'],
    STRING: ['String'],
    NUMBER: ['Number'],
    INTEGER: ['Integer'],
    NULL: ['Null']
  },
  CONFIG: {
    DEBUG: false
  },
  LOADED: false,
  ACTIONS: new EventEmitter(),

  get SPACE() {
    return __webpack_require__.g[NAMESPACE];
  }

};
SERVICE.ACTIONS.on('load', () => SERVICE.LOADED = true);
module.exports.FIELDFLAGS = FIELDFLAGS;
module.exports.SUPER_CALL = SUPER_CALL;
module.exports.NAMESPACE = NAMESPACE;
module.exports.OPERATOR = OPERATOR;
module.exports.CHARTYPE = CHARTYPE;
module.exports.SERVICE = SERVICE;
module.exports.CONFIG = SERVICE.CONFIG;
module.exports.GET = GET;
module.exports.IS = IS;

/***/ }),

/***/ 643:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/storage.js
 * @description Содержит в себе напиор классов и функций для управления динамической памятью.
 * @license MIT
 * @author Astecom
 */
const {
  GetFieldOfNullException,
  IsNotAConstructorException
} = __webpack_require__(880),
      {
  GET,
  SERVICE,
  IS
} = __webpack_require__(718),
      {
  Cast
} = __webpack_require__(0),
      {
  iContext,
  iPoonyaPrototype
} = __webpack_require__(540),
      {
  PoonyaStaticLibrary
} = __webpack_require__(701),
      ExpressionGroup = __webpack_require__(888),
      PoonyaObject = __webpack_require__(741),
      PoonyaArray = __webpack_require__(609),
      PoonyaInteger = __webpack_require__(526),
      PoonyaNumber = __webpack_require__(418),
      PoonyaString = __webpack_require__(419),
      PoonyaBoolean = __webpack_require__(481),
      PoonyaNull = __webpack_require__(711);
/**
 * @lends Heap
 * @class
 */


class Heap extends Map {
  /**
   * Модуль памяти, может использоваться для манипульций с памятью.
   *
   * @param {iContext} context - Контекст, типы из которого будт использоваться для кастинга значений, при необходимости
   * @param {Object} data - Данные инициализации модуля памяти
   *
   * @memberof Poonya.Storage
   * @constructs Heap
   * @public
   */
  constructor(context, data) {
    super();
    if (data != null) this.append(context, data);
  }
  /**
   * Обновляет данные в текущем объекте
   *
   * @param {iContext} context - Контекст, типы из которого будт использоваться для кастинга значений, при необходимости
   * @param {Object} data - Данные которые нужно обновить
   *
   * @method
   * @public
   */


  append(context, data) {
    if (typeof data === 'object') {
      if (Array.isArray(data)) {
        for (let i = 0, leng = data.length; i < leng; i++) this.set(context, i, data[i]);
      } else {
        if (data instanceof PoonyaObject) {
          for (let entry of data.fields) {
            this.set(context, entry[0], entry[1]);
          }
        } else if (data instanceof Heap) {
          for (let entry of data) {
            this.set(context, entry[0], entry[1]);
          }
        } else {
          for (let key in data) this.set(context, key, data[key]);
        }
      }
    } else {
      throw new TypeError();
    }
  }
  /**
   * Получет значение из текущей области памяти по ключу `key`
   *
   * @param {String} key ключ, по которому происходит получение значения
   * @method
   * @public
   */


  get(key) {
    return super.get(key);
  }
  /**
   * Устанавливает значение для текущей области памяти
   *
   * @param {String} key ключ по которому будет происходить установка
   * @param {Object} data данные которые будут установлены
   * @param {?Array<Object>} parents_three стэк родителей
   * @method
   * @public
   */


  set(context, key, data, parents_three = new Array()) {
    if (typeof key !== 'string' && typeof key !== 'number') throw new TypeError('Bad key ' + key);

    try {
      super.set(key, Cast(data, context, parents_three));
    } catch (e) {
      console.log(e);
      console.error('Error when cast value of ' + key);
    }
  }
  /**
   * ДеСериализует значени е хипа памяти в javascript объект
   *
   * @param {?iContext} context контекст выполнения
   * @param {?Array<String>} out Выходной массив
   * @param {?Function} throw_error Функция вызывающаяся при ошибках
   * @method
   * @public
   */


  result(context, out, throw_error) {
    let output = new Object();

    for (let [key, value] of this) if (value instanceof NativeFunction) output[key] = value != null ? value.result(context, out, throw_error) : null;else output[key] = value != null ? value.target : null;

    return output;
  }

}
/**
 * @lends Context
 * @class
 */


class Context extends iContext {
  /**
   * Контекст выполнения
   *
   * @param {PoonyaStaticLibrary[]} libraries бибилиотеки для инициалзиции контекста
   * @param {Function} throw_error функция, которая будет вызвана при ошибке
   * @param {...Heap} initial Значения переданные для инициализации
   *
   * @memberof Poonya.Storage
   * @constructs Context
   * @implements iContext
   * @classdesc Определяет набор данных для манипуляции в шаблонизаторе
   * @protected
   */
  constructor(libraries, throw_error, ...initial) {
    super();
    this.levels = new Array();

    if (libraries != null) {
      // Корневой слой
      this.levels.push(new Heap(this, null));

      for (let i = 0, leng = libraries.length, target; i < leng; i++) {
        if (libraries[i] instanceof PoonyaStaticLibrary) {
          if (libraries[i].global) {
            libraries[i].importTo(this.levels[0], this, throw_error);
          } else {
            target = this.createObject(null, -1, SERVICE.CONSTRUCTORS.OBJECT, throw_error);
            libraries[i].importTo(target, this, throw_error);
            this.levels[0].set(this, libraries[i].namespace, target);
          }
        }
      }
    }

    this.levels.push(...initial.filter(e => e instanceof Heap));
  }
  /**
   * Клонирует текущий контекст, возвращает новый кнотекст, со всеми уровнями текущего контекста
   *
   * @returns {iContext} клонированный контекст
   * @method
   * @public
   */


  clone() {
    return new Context(null, null, this.levels);
  }
  /**
   * Добавляет уроень в текущий контекст
   * @method
   * @public
   */


  addLevel(level) {
    if (level != null) {
      if (level instanceof Heap) this.levels.push(level);else throw new Error('The level for the context must be heap, or indexed by the heap');
    } else {
      this.levels.push(new Heap(this, null));
    }
  }
  /**
   * Выходит из текущего контекста
   * @method
   * @public
   */


  popLevel() {
    this.levels.pop();
  }
  /**
   * Получет значение из текущего контекста
   *
   * @param {String} val адрес* в памяти
   * @method
   * @public
   */


  get(val) {
    let b = null,
        p = this.levels.length - 1;

    while (p >= 0 && (b = this.levels[p--].get(val)) == null);

    return b;
  }
  /**
   * Проверяет, имеется ли значение в заданном контексте
   *
   * @param {String} val адрес* в памяти
   * @param {String} params дополнительные параметры поиска
   * @method
   * @public
   *
   * @description
   * params может быть равен:
   *  `tree` - поиск по всему дереву
   *  `up` - поиск по самомой верхней области памяти
   *  `root` - поиск по самой нижней области памяти
   */


  has(val, params = 'tree') {
    switch (params) {
      case 'tree':
        return this.get(val) !== null;

      case 'up':
        return this.levels[this.levels.length - 1].has(val);

      case 'root':
        return this.levels[0].has(val);
    }
  }
  /**
   * Устанавливает значение в контексте исполнения
   *
   * @param {String} val адрес* в памяти
   * @param {Object} data Значение для установки
   * @param {String} params дополнительные параметры поиска
   * @method
   * @public
   *
   * @description
   * params может быть равен:
   *  `tree` - поиск по всему дереву
   *  `up` - поиск по самомой верхней области памяти
   *  `root` - поиск по самой нижней области памяти
   */


  set(val, data, params = 'tree') {
    switch (params) {
      case 'tree':
        let p = this.levels.length;

        while (--p >= 0) {
          if (this.levels[p].get(val) != null) {
            this.levels[p].set(this, val, data);
            return;
          }
        }

        this.levels[this.levels.length - 1].set(this, val, data);
        break;

      case 'up':
        this.levels[this.levels.length - 1].set(this, val, data);
        break;

      case 'down':
        this.levels[0].set(this, val, data);
        break;
    }
  }
  /**
   * Возвращает данные из текущего контекста, по заданному пути
   *
   * @param {Array<String|Number|Operand>} path путь, по которому можно получить значение
   * @param {Number} position Позиция вызова(необходимо в случае возникновения ошибки)
   * @param {Object} type Тип который необходимо получить
   * @param {Function} throw_error Фукцния которая выбрасывает ошибку(необходимо в случае возникновения ошибки)
   * @param {Boolean} return_full_info Возвращать полную информацию о переменной, включая родительский объект(если имеется)
   *
   * @returns {?ParserData|?{
   *  instance: ParserData,
   *  parent: PoonyaObject|iPoonyaPrototype,
   *  index: Number
   * }} если по заданому пути существует значение вернет его, если нет то вернет null
   * @method
   * @public
   */


  getByPath(path, position, type = null, throw_error, return_full_info = false) {
    let instance = this.get(path[0]),
        parent = null,
        flags = 0,
        query_stack = Array.from(path),
        leng = query_stack.length,
        index = 1;

    for (; instance && index < leng; index++) {
      if (query_stack[index] instanceof ExpressionGroup) query_stack[index] = query_stack[index].result(this, null, throw_error).toRawData();

      if (instance instanceof PoonyaObject) {
        parent = instance;
        flags = instance.field_attrs.get(query_stack[index]);
        instance = instance.get(query_stack[index]);
      } else if (instance instanceof iPoonyaPrototype) {
        instance = instance[GET](query_stack[index], this);
      } else {
        throw_error(position, new GetFieldOfNullException(query_stack[index]));
      }
    }

    if (type == null || instance instanceof type) {
      if (return_full_info) {
        return {
          instance,
          parent,
          index,
          flags
        };
      } else {
        return instance;
      }
    } else return null;
  }
  /**
   * Сравнивает инстанцию, возвращает эквивалент в boolean
   *
   * @param {Any} instance инстанция которую стравнием
   * @returns {Boolean}
   */


  toBooleanResult(instance) {
    if (instance instanceof PoonyaBoolean) {
      return instance.data;
    }

    if (instance instanceof PoonyaInteger || instance instanceof PoonyaNumber) {
      return instance.data != 0;
    }

    if (instance instanceof PoonyaNull) {
      return false;
    }

    if (instance instanceof PoonyaObject || instance instanceof PoonyaArray) {
      return true;
    }

    if (instance instanceof PoonyaString) {
      return instance.data.length != 0;
    }

    return instance != null;
  }
  /**
   *
   * @param {*} initial
   * @param {*} position
   * @param {*} path
   * @param {*} throw_error
   * @param {*} parents_three
   *
   * @returns {PoonyaObject} если по заданому пути существует значение вернет его, если нет то вернет null
   * @method
   * @public
   */


  createObject(initial, position, path, throw_error, parents_three = new Array()) {
    const prototype = this.getByPath(path, position, iPoonyaPrototype, throw_error);

    if (prototype != null) {
      let init = new Object();

      if (initial instanceof Map) {
        for (let entry of initial) {
          if (!parents_three.includes(entry[1])) {
            if (typeof entry[1].result === 'function') init[entry[0]] = entry[1].result(this, null, throw_error);else init[entry[0]] = entry[1];
          }
        }
      } else if (typeof initial === 'object' && initial != null) {
        for (let key in initial) {
          if (!parents_three.includes(initial[key])) {
            if (typeof initial[key].result === 'function') init[key] = initial[key].result(this, null, throw_error);else init[key] = initial[key];
          }
        }
      } else {
        init = initial;
      }

      switch (true) {
        case prototype[IS]('String'):
          return new PoonyaString(prototype, init, this);

        case prototype[IS]('Integer'):
          return new PoonyaInteger(prototype, init, this);

        case prototype[IS]('Boolean'):
          return new PoonyaBoolean(prototype, init, this);

        case prototype[IS]('Number'):
          return new PoonyaNumber(prototype, init, this);

        case prototype[IS]('Null'):
          return new PoonyaNull(prototype, init, this);

        case prototype[IS]('Array'):
          return new PoonyaArray(prototype, init, this);

        default:
          return new PoonyaObject(prototype, init, this);
      }
    } else {
      throw_error(position, new IsNotAConstructorException(path));
    }
  }

}

module.exports.Context = Context;
module.exports.Heap = Heap;

/***/ }),

/***/ 701:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/importer.js
 * @description Содержит в себе набор фнукций, которые необходимы для импорта нативных, написанных на js в нашем случае, библиотека в память poonya
 * @license MIT
 * @author Astecom
 */
const {
  NAMESPACE,
  SERVICE
} = __webpack_require__(718),
      {
  IOError
} = __webpack_require__(880),
      PoonyaObject = __webpack_require__(741),
      NativeFunction = __webpack_require__(240),
      PoonyaPrototype = __webpack_require__(494); // Пространство модулей в глобальном контексте


const modules = Symbol.for('Modules');

if (__webpack_require__.g[NAMESPACE] == null) {
  __webpack_require__.g[NAMESPACE] = new Object();
  __webpack_require__.g[NAMESPACE][modules] = new Map();
}
/**
 * @lends PoonyaStaticLibrary
 * @class
 */


class PoonyaStaticLibrary {
  /**
   * Статическая библиотека, добавляется глобально.
   *
   * @param {Object} data
   * @memberof Poonya.Import
   * @constructs PoonyaStaticLibrary
   * @public
   */
  constructor(id, global = false, override = false, namespace) {
    AddLibrary(id, this, override);
    this.namespace = namespace;
    this.global = global;
    this._fields = new Map();
  }
  /**
   * Добавляет поле для импорта из библиотеки
   *
   * @param {String} field название поля, которое устанавливаем
   * @param {Any} data данные, который нужно импортировать
   * @public
   * @method
   */


  addField(field, data) {
    this._fields.set(field, data);
  }
  /**
   * Расширяет прототип класса переданного как proto
   *
   * @param {PoonyaPrototype} proto название поля, которое устанавливаем
   * @public
   * @method
   */


  expandPrototype(proto) {
    if (PoonyaPrototype.isPrototypeOf(proto)) {
      this._fields.set(proto.name, proto);
    } else {
      throw new Error(`Only PoonyaPrototype instance can be passed as a prototype.`);
    }
  }
  /**
   * Добавляет стороннюю библиотеку как поле этой бибилотеки
   *
   * @param {String} ident идентификатор ассимилируемой библиотеки
   * @public
   * @method
   */


  addLib(ident) {
    const lib = __webpack_require__.g[NAMESPACE][Symbol.for('Modules')][Symbol.for(ident)];

    if (lib != null) {
      this._fields.set(lib.namespace, lib);
    } else {
      throw new Error(`Can't find library with identifier ${ident}`);
    }
  }
  /**
   * Вызывается для преобразования библиотеки в модуль памяти, к которому в последствии можно будет получить доступ
   *
   * @param {PoonyaObject|Heap} parent хип памяти, или объект в который нужно ипортировать библиотеку
   * @public
   * @method
   */


  importTo(parent, context, throw_error) {
    for (let [key, value] of this._fields) {
      switch (typeof value) {
        case 'bigint':
          if (isNaN(value)) parent.set(context, key, context.createObject(null, -1, SERVICE.CONSTRUCTORS.NULL, throw_error));else parent.set(context, key, context.createObject(value, -1, SERVICE.CONSTRUCTORS.INTEGER, throw_error));
          break;

        case 'number':
          if (isNaN(value)) parent.set(context, key, context.createObject(null, -1, SERVICE.CONSTRUCTORS.NULL, throw_error));else parent.set(context, key, context.createObject(value, -1, SERVICE.CONSTRUCTORS.NUMBER, throw_error));
          break;

        case 'string':
          parent.set(context, key, context.createObject(value, -1, SERVICE.CONSTRUCTORS.STRING, throw_error));
          break;

        case 'symbol':
          parent.set(context, key, context.createObject(Symbol.keyFor(value), -1, SERVICE.CONSTRUCTORS.STRING, throw_error));
          break;

        case 'function':
          if (PoonyaPrototype.isPrototypeOf(value)) {
            parent.set(context, (value = new value(context)).name, value);
          } else {
            parent.set(context, key, new NativeFunction(value));
          }

          break;

        case 'boolean':
          parent.set(context, key, context.createObject(value, -1, SERVICE.CONSTRUCTORS.BOOLEAN, throw_error));
          break;

        case 'undefined':
        case 'object':
          if (value == null) parent.set(context, key, context.createObject(null, -1, SERVICE.CONSTRUCTORS.NULL, throw_error));else {
            if (value instanceof PoonyaStaticLibrary) {
              const target = new PoonyaObject(context.getByPath(SERVICE.CONSTRUCTORS.OBJECT, -1, PoonyaPrototype, throw_error), null);
              value.importTo(target, context, throw_error);
              parent.set(context, key, target);
            } else if (value instanceof Array) {
              parent.set(context, key, new PoonyaArray(context.getByPath(SERVICE.CONSTRUCTORS.ARRAY, -1, PoonyaPrototype, throw_error), value, null, context));
            } else parent.set(context, key, new PoonyaObject(context.getByPath(SERVICE.CONSTRUCTORS.OBJECT, -1, PoonyaPrototype, throw_error), value, null, context));
          }
          break;
      }
    }
  }

}
/**
 * Функция, которая добавляет новую библиотеку
 *
 * @memberof Poonya.Import
 * @function AddLibrary
 *
 * @param {String} lib_id Идентификатор библиотеки
 * @param {PoonyaStaticLibrary} lib_object Объект библиотеки
 * @param {Boolean} override если true, то если такая бибилотека уже была ранее создана, она будет переопределена
 *
 * @protected
 */


let AddLibrary = (lib_id, lib_object, override = false) => {
  if (override || __webpack_require__.g[NAMESPACE][modules][lib_id = Symbol.for(lib_id)] == null) {
    __webpack_require__.g[NAMESPACE][modules][lib_id] = lib_object;
  } else {
    throw new TypeError('Library, with this id already imported. For ' + lib_id.toString());
  }
};
/**
 * Функция, которая возвращает библиотеку при импорте
 *
 * @memberof Poonya.Import
 * @function Import
 *
 * @param {string[]} import_statements Массив с идентификаторами библиотек
 * @param {
 *      {
 *          log: Function,
 *          error: Function,
 *          warn: Function
 *      }
 * } logger Логгер, в случае ошибок ипорта
 *
 * @protected
 */


let Import = (import_statements, logger) => {
  if (!(import_statements instanceof Array)) throw new TypeError('import_statements must be Array');
  const statements = new Array();

  for (let i = 0, leng = import_statements.length; i < leng; i++) {
    statements.push(__webpack_require__.g[NAMESPACE][modules][Symbol.for(import_statements[i])]);
  }

  return statements;
};
/**
 * Функция импорта файла библиотеки
 *
 * @memberof Poonya.Import
 * @function ImportFile
 *
 * @param {String} lib_dir путь, по которому можно найти файл библиотеки
 * @param {String} file файл с бибилиотекой
 *
 * @protected
 */


let ImportFile = async (lib_dir, file) => {};

function crequire(id) {
  if (id === 'poonya') {
    return __webpack_require__(802);
  } else {
    throw new Error('Unknown module ' + id);
  }
}

ImportFile = (lib_dir, file) => {
  const path = lib_dir + '/' + file;
  return new Promise(async (res, rej) => {
    try {
      let wait = await fetch(path, {
        method: "GET"
      });
      wait = await wait.text();
      res(new Function('require', `"use strict";${wait}`)(crequire));
    } catch (e) {
      rej(new IOError(path));
    }
  });
};

module.exports.Import = Import;
module.exports.ImportFile = ImportFile;
module.exports.PoonyaStaticLibrary = PoonyaStaticLibrary;

/***/ }),

/***/ 173:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/LexerEntry.js
 * @description Содержит в себе класс вхождение лексера, массив которых получается на выходе из лексера
 * @license MIT
 * @author Astecom
 */
const {
  CHARTYPE
} = __webpack_require__(718);
/**
 * @lends LexerEntry
 * @class
 */


class LexerEntry {
  /**
   * Вхождение лексера
   *
   * @param {CHARTYPE} type тип выхождения
   * @param {Array} data Данные вхождения
   * @param {Number} position Позиция вхождения
   * @param {String} s_separator Дополнительное окружение вхождения, допустим для строки это ''
   * @constructs LexerEntry
   * @memberof Poonya.Lexer
   * @protected
   */
  constructor(type, data, position, s_separator) {
    this.type = type;
    this.data = String.fromCharCode.apply(null, data);
    this.position = position - data.length > 0 ? position - data.length + 1 : 0;
    this.leng = data.length;
    this.string_separator = s_separator != null ? String.fromCharCode(s_separator) : null;
  }
  /**
   * Сравнивает текущее вхождение с преданным `t` типом и `s` содержанием.
   *
   * @param {*} t Тип с которым нужно сравнить текущее вхождение
   * @param {?String|String[]} s содержание с котрым необходимо сравнить текущее вхождение
   * @returns {Boolean}
   */


  equals(t, s) {
    return t == this.type && (s != null ? Array.isArray(s) ? s.includes(this.toString()) : this.toString() == s : true);
  }
  /**
   * Сравнивает текущее вхождение с преданным `s` содержанием.
   *
   * @param {?String|String[]} s содержание с котрым необходимо сравнить текущее вхождение
   * @returns {Boolean}
   */


  contentEquals(s) {
    return Array.isArray(s) ? s.includes(this.toRawString()) : this.toRawString() == s;
  }
  /**
   * Преобразует вхождение в строку
   *
   * @public
   * @method
   */


  toString() {
    return this.type != CHARTYPE.STRING ? this.data : this.string_separator + this.data + this.string_separator;
  }
  /**
   * Преобразует вхождение в чистую строку данных, без скобок и пр.
   *
   * @public
   * @method
   */


  toRawString() {
    return this.data;
  }

}

module.exports = LexerEntry;

/***/ }),

/***/ 324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/lexer.js
 * @description Содержит в себе лексер, который преобразует строку в набор токенов.
 * @license MIT
 * @author Astecom
 */
const {
  CHARTYPE
} = __webpack_require__(718),
      LexerEntry = __webpack_require__(173);
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
  const Export = new Array();
  let buff = new Array(),
      is_string = false,
      is_comment = false,
      is_multiline = false,
      string_entry = null,
      cur = null,
      last = null;

  if (Array.isArray(input)) {
    // Преобразуем входные данные в обычный массив, если на вход были поданы массив подобные данные
    input = Array.from(input);
  } else {
    throw TypeError('Only array-like data can be input to the lexer');
  }

  for (let i = 0, leng = input.length; i < leng; i++) {
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

    if (cur === CHARTYPE.NEWLINE && last === CHARTYPE.NEWLINE || cur === CHARTYPE.POINT && last === CHARTYPE.NUMBER || cur === CHARTYPE.NUMBER && last === CHARTYPE.WORD) {
      buff.push(input[i]);
      continue;
    } // Если предыдущий и текущий тип символов это операторы


    if (cur === CHARTYPE.OPERATOR && last === CHARTYPE.OPERATOR) {
      if (buff.length === 1 && ( // В буффере не больше одного символа
      buff[0] === 33 || // пердыдущий символ был '!'
      buff[0] === 60 || // пердыдущий символ был '<'
      buff[0] === 62) && // пердыдущий символ был '>'
      input[i] === 61 // текущий символ '='
      ) {
          buff.push(input[i]);
          if (allow_spaces || last !== CHARTYPE.SPACE) Export.push(new LexerEntry(last, buff, i, string_entry));
          string_entry = null;
          buff.splice(0, buff.length);
          last = undefined;
          if (i + 1 === leng) return Export;
          continue;
        }

      if (buff.length === 1 && // В буффере не больше одного символа
      buff[0] === 47 // Предыдущий символ это /
      ) {
          if (input[i] === 47 // Текущий символ это /
          ) {
              is_comment = true;
              is_multiline = false;
              continue;
            } else if (input[i] === 62 // Текущий символ это >
          ) {
              is_comment = true;
              is_multiline = true;
              continue;
            }
        }
    }

    if (!is_string && !is_comment) {
      if ((cur !== last || last === CHARTYPE.STRING || last === CHARTYPE.OPERATOR) && last != null) {
        if (allow_spaces || last !== CHARTYPE.SPACE) Export.push(new LexerEntry(last, buff, i, string_entry));
        string_entry = null;
        buff.splice(0, buff.length);
      }

      if (cur === CHARTYPE.STRING) {
        is_string = true;
        string_entry = input[i];
        last = cur;
        continue;
      }

      buff.push(input[i]);
      last = cur;
    } else if (is_comment) {
      if (is_multiline) {
        if (input[i] === 47 && // Текущий символ это /
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

      buff.push(input[i]);
    } else {
      if (cur === CHARTYPE.STRING && input[i] === string_entry) {
        is_string = false;
        last = cur;
        continue;
      }

      buff.push(input[i]);
      last = cur;
    }
  }

  if (allow_spaces || cur !== CHARTYPE.SPACE) Export.push(new LexerEntry(cur, buff, input.byteLength - buff.length - 1, string_entry));
  return Export;
}

module.exports = lexer;

/***/ }),

/***/ 805:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/linker.js
 * @description Содержит в себе линкер, который позваоляет импортировать содержимое других файлов в исполняему последовательность poonya
 * @license MIT
 * @author Astecom
 */
const {
  maybeEquals
} = __webpack_require__(0),
      {
  CHARTYPE
} = __webpack_require__(718),
      {
  IOError
} = __webpack_require__(880),
      lexer = __webpack_require__(324);
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
        const buffer = parent_path.split('/');
        path = window.location.origin + '/' + buffer.slice(0, buffer.length - 1).join('/') + '/' + data[i + 1].data.toString();
        content = fetch(path, {
          method: 'GET'
        }).then(e => e.blob);

        if (parent_path != null) {
          try {
            data.splice(i, data[i + 2].equals(CHARTYPE.OPERATOR, ';') ? 3 : 2, ...lexer(content, false));
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

/***/ }),

/***/ 585:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/parser.js
 * @description Содержит в себе парсер исходного кода poonya, на выходе экспортируемых функций можно получить либо выражение, либо главную исполняемую последовательность
 * @license MIT
 * @author Astecom
 */
const {
  ParserException,
  BadEmptyObjectException,
  ParserEmtyArgumentException,
  UnexpectedTokenException,
  BadArrowNotationJumpingToUpperLevel,
  BadArrowNotationJumpingTwoLevels,
  ParserLogicException,
  InvalidSequenceForLetiableAccessException,
  CriticalParserErrorUnexpectedEndOfInputException,
  SegmentationFaultEmptyArgumentException,
  SegmentationFaultMaximumSegmentsForBlockException,
  UnexpectedTokenStatement,
  UnexpectedWordTypeAndGetException,
  CriticalParserErrorException,
  CriticalParserErrorNoRawDataTransmittedException
} = __webpack_require__(880),
      {
  maybeEquals,
  countKeys
} = __webpack_require__(0),
      {
  CHARTYPE,
  SERVICE
} = __webpack_require__(718),
      FunctionCall = __webpack_require__(408),
      ObjectContructorCall = __webpack_require__(202),
      TernarOperator = __webpack_require__(335),
      ExpressionGroup = __webpack_require__(888),
      GetOperator = __webpack_require__(338),
      IfStatement = __webpack_require__(342),
      SequenceGroup = __webpack_require__(967),
      OutOperator = __webpack_require__(625),
      WhileStatement = __webpack_require__(627),
      RepeatStatement = __webpack_require__(567),
      SetOperator = __webpack_require__(782),
      ResetOperator = __webpack_require__(447),
      PushOperator = __webpack_require__(902),
      SequenceMainGroup = __webpack_require__(946),
      linker = __webpack_require__(805);
/**
 * Парсит вызов функции, возвращает объект вызова функции, и позицию с которой можно продолжить прасинг
 *
 * @param {Array<String|Number>} query_stack стек доступа к имени переменной
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Number} block_start Начальная позиция вызова
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: FunctionCall, jump: Number}} объект вызова функции, и позиция с которой можно продолжить прасинг
 *
 * @memberof Poonya.Parser
 * @protected
 */


function parseFunctionCall(query_stack, start, data, throw_error, block_start) {
  const args = segmentationParser(start, data, throw_error, ",", Infinity, `Function (${query_stack.map(e => typeof e === "number" ? `[${e}]` : e).join(" => ")})`);
  return {
    data: new FunctionCall(query_stack, args.data, block_start),
    jump: args.jump
  };
}
/**
 * Парсит литеральное объявление объекта
 *
 * ->
 *  key1 -> value1,
 *  key2 -> value2,
 *  key1 --> value1...
 *
 * @param {Number[]|String[]|Operand[]} query_stack путь к конструктору объекта
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: ObjectContructorCall, jump: Number}} объект тернарного выражения, и позиция с которой можно продолжить прасинг
 *
 * @memberof Poonya.Parser
 * @protected
 */


function parseObject(query_stack, start, data, throw_error, level = 0) {
  let result = null,
      count = 0,
      entries = new Array([]),
      last_row = start,
      expected = 0; // Ожидаемое следующие значение

  for (let i = start; true; i++) {
    maybeEquals(data, i, CHARTYPE.NEWLINE);

    switch (true) {
      case data[i].equals(CHARTYPE.OPERATOR, '*') && expected === 0:
        if (entries.length !== 1) throw_error(data[i].position, new BadEmptyObjectException());
        return {
          data: new ObjectContructorCall(query_stack, new Map(), data[start].position),
          jump: i - start
        };

      case data[i] === undefined || expected === 3 && !data[i].equals(CHARTYPE.OPERATOR, ',') || data[i].equals(CHARTYPE.OPERATOR, ';'):
        if (entries[entries.length - 1].length !== 2) throw_error(data[i].position, new ParserEmtyArgumentException());
        return {
          data: new ObjectContructorCall(query_stack, new Map(entries), data[start].position),
          jump: i - start
        };

      default:
        switch (expected) {
          case 0:
            if (data[i].equals(CHARTYPE.WORD) || data[i].equals(CHARTYPE.STRING)) {
              entries[entries.length - 1][0] = data[i].toRawString();
            } else if (data[i].equals(CHARTYPE.NUMBER)) {
              entries[entries.length - 1][0] = parseInt(data[i].toRawString());
            } else {
              throw_error(data[i].position, new UnexpectedTokenException(data[i], 'any word'));
            }

            expected = 1;
            continue;

          case 1:
            count = countKeys(data, i, CHARTYPE.OPERATOR, '-'); // - ('-' * level)

            if (count === level + 1) {
              i += count;

              if (!data[i].equals(CHARTYPE.OPERATOR, '>')) {
                throw_error(data[i].position, new UnexpectedTokenException(data[i], '>'));
              }

              expected = 2;
            } else {
              entries.pop();

              if (count < level + 1) {
                return {
                  data: new ObjectContructorCall(query_stack, new Map(entries), data[start].position),
                  jump: last_row - start
                };
              } else {
                throw_error(data[i].position, new BadArrowNotationJumpingToUpperLevel());
              }
            }

            continue;

          case 2:
            count = countKeys(data, i + 1, CHARTYPE.OPERATOR, '-'); /// Если как значение передан инициализатор другого объекта
            ///
            /// some ->
            ///     some1 --> 'some',

            if (data[i + level + 3] != null && (data[i].equals(CHARTYPE.WORD) || data[i].equals(CHARTYPE.NUMBER)) && count === level + 2 && data[i + level + 3].equals(CHARTYPE.OPERATOR, '>')) {
              result = parseObject(SERVICE.CONSTRUCTORS.OBJECT, i, data, throw_error, level + 1);
              i += result.jump - 1;
              entries[entries.length - 1][1] = result.data;
              expected = 3; /// Неправильная нотация
              /// Попытка произвести нотация на два уровня выше чем родительская
              ///
            } else if (count > level + 2) {
              throw_error(data[i + 1].position, new BadArrowNotationJumpingTwoLevels()); /// Если как значение передано выражение
              ///
              /// some -> 'somesome...';
            } else {
              result = parseExpression(i, data, throw_error, [',', ';']); // Текущие данные ставим как результат парсинга выражения

              entries[entries.length - 1][1] = result.data; // Ожидаем следующий маркер

              expected = 3; // Отматываем маркер пасинга назад

              if (data[i].equals(CHARTYPE.OPERATOR, ';')) {
                // Перемщаем картку за символ ;
                i += result.jump - 2;
              } else {
                // Перемещаем картку после возвращенного маркера
                i += result.jump - 1;
              }
            }

            continue;

          case 3:
            entries.push([]);
            last_row = i;
            expected = 0;
            continue;
        }

        break;
    }
  }
}
/**
 * Парсит тернарное выражение, возвращает объект тернарного выражения, и позицию с которой можно продолжить прасинг
 *
 * @param {ExpressionGroup} condition Условие, при котором тернарное выражение будет верным
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: TernarOperator, jump: Number}} объект тернарного выражения, и позиция с которой можно продолжить прасинг
 *
 * @memberof Poonya.Parser
 * @protected
 */


function parseTernar(condition, start, data, throw_error) {
  let hook_index = 0,
      buffer = new Array(),
      args = new Array();

  function push(token) {
    if (buffer.length !== 0) {
      args.push(parseExpression(0, buffer, throw_error).data);
      buffer.splice(0, buffer.length);
    } else throw_error(token != undefined ? token.position : data[start], new ParserEmtyArgumentException());
  }

  for (let i = start; true; i++) {
    switch (true) {
      case data[i] === undefined || data[i].equals(CHARTYPE.OPERATOR, ";") || data[i].equals(CHARTYPE.NEWLINE) || data[i].equals(CHARTYPE.OPERATOR, ")") && hook_index <= 0:
        push(data[i]);
        if (args[0] === undefined || args[1] === undefined) throw_error(data[start].position, new ParserEmtyArgumentException());
        return {
          data: new TernarOperator(condition, args[0], args[1]),
          jump: i - start - (data[i] && data[i].equals(CHARTYPE.OPERATOR, ")") ? 1 : 0)
        };

      case data[i].equals(CHARTYPE.OPERATOR, "("):
        buffer.push(data[i]);
        hook_index++;
        break;

      case data[i].equals(CHARTYPE.OPERATOR, ")"):
        buffer.push(data[i]);
        hook_index--;
        break;

      case data[i].equals(CHARTYPE.OPERATOR, ":") && hook_index === 0 && args.length === 0:
        push(data[i]);
        break;

      case data[i].equals(CHARTYPE.OPERATOR, ":") && hook_index === 0 && args.length !== 0:
        throw_error(data[i].position, new ParserLogicException());
        break;

      default:
        buffer.push(data[i]);
        break;
    }
  }
}
/**
 * Парсит название, позвращает массив со стэком запроса, по которому можно получит доступ к переменной, и позицию с которой можно продолжить парсинг
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: Array<Number|String>, jump: Number}} массив со стэком запроса, по которому можно получит доступ к переменной, и позиция с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */


function parseVarName(start, data, throw_error) {
  let buffer = new Array(),
      point_before = true,
      hook_index = 0,
      hook_start = 0;
  if (data.length === 0) return {
    data: [],
    jump: 0
  };

  for (let i = start; true; i++) {
    switch (true) {
      case data[i] == null || data[i].equals(CHARTYPE.OPERATOR) && !data[i].equals(CHARTYPE.OPERATOR, ["[", "]"]) || data[i].equals(CHARTYPE.NEWLINE) || data[i].equals(CHARTYPE.SPACE):
        return {
          data: buffer,
          jump: i - start
        };

      case data[i].equals(CHARTYPE.WORD) && point_before:
        buffer.push(data[i].toString());
        point_before = !point_before;
        continue;

      case data[i].equals(CHARTYPE.POINT) && !point_before:
        point_before = !point_before;
        continue;

      case data[i].equals(CHARTYPE.OPERATOR, "[") && !point_before:
        i++; // Индекс скобок

        hook_index = 0; // Позиция начала парсинга

        hook_start = i; // ...[3 + 4 + 5]...
        //    ^^^^^^^^^^

        while (data[i] != null && !(data[i].equals(CHARTYPE.OPERATOR, "]") && hook_index === 0)) {
          if (data[i].equals(CHARTYPE.OPERATOR, "[")) hook_index++;else if (data[i].equals(CHARTYPE.OPERATOR, "]")) hook_index--;
          i++;
        }

        if (hook_index != 0) throw_error(data[i].position, new ParserLogicException()); // Вставляем выражение как оператор доступа

        buffer.push(parseExpression(0, data.slice(hook_start, i), throw_error).data);
        continue;

      default:
        throw_error(data[i].position, new InvalidSequenceForLetiableAccessException());
        continue;
    }
  }
}
/**
 * Парсит выражение, позвращает выражение и позицию, с которой можно продолжить парсинг
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} data Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 * @param {String} end_marker Маркер конца выражения
 *
 * @returns {{data: ExpressionGroup, jump: Number}} выражение и позиция, с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */


function parseExpression(start, data, throw_error, end_marker = ';') {
  if (data.length === 0) return {
    data: new ExpressionGroup(0),
    jump: 0
  };
  const buffer = new ExpressionGroup(data[0].position),
        result = new Array();

  for (let i = start; true; i++) {
    if (data[i] == undefined || data[i].equals(CHARTYPE.OPERATOR, ")") || data[i].contentEquals(end_marker) || data[i].equals(CHARTYPE.NEWLINE)) {
      if (data[i] == undefined && buffer.isNotDone()) throw_error(data[i - 1].position, new CriticalParserErrorUnexpectedEndOfInputException());
      buffer.complete(throw_error);
      return {
        data: buffer,
        jump: i - start
      };
    }

    switch (true) {
      // Какое-то слово
      case data[i].equals(CHARTYPE.WORD):
        // Ключевые слова
        switch (data[i].toString()) {
          case "true":
          case "false":
          case "null":
            buffer.append(data[i], throw_error);
            continue;
        }

        result[0] = parseVarName(i, data, throw_error);

        if (data[i + result[0].jump] != null && data[i + result[0].jump].equals(CHARTYPE.OPERATOR, "(")) {
          // Функция
          result[1] = parseFunctionCall(result[0].data, i + result[0].jump + 1, data, throw_error, data[i].position);
          i += result[0].jump + result[1].jump + 1;
          buffer.append(result[1].data, throw_error);
        } else if (data[i + result[0].jump + 1] != null && data[i + result[0].jump].equals(CHARTYPE.OPERATOR, "-") && data[i + result[0].jump + 1].equals(CHARTYPE.OPERATOR, ">")) {
          // Конструктор объекта
          result[1] = parseObject(result[0].data, i + result[0].jump + 2, data, throw_error, 0);
          i += result[0].jump + result[1].jump + 2;
          buffer.append(result[1].data, throw_error);
        } else {
          // Получение значения переменной
          buffer.append(new GetOperator(data[i].position, result[0].data), throw_error);
          i += result[0].jump - 1;
        }

        continue;
      // Конструктор объекта

      case data[i + 1] != null && data[i].equals(CHARTYPE.OPERATOR, "-") && data[i + 1].equals(CHARTYPE.OPERATOR, ">"):
        // Конструктор объекта
        result[0] = parseObject(SERVICE.CONSTRUCTORS.OBJECT, i + 2, data, throw_error, 0);
        i += result[0].jump + 2;
        buffer.append(result[0].data, throw_error);
        continue;
      // Другая группа выражений

      case data[i].equals(CHARTYPE.OPERATOR, "("):
        result[0] = parseExpression(i + 1, data, throw_error);
        i += result[0].jump + 1;
        buffer.append(result[0].data, throw_error);
        continue;
      // Тернарное выражение

      case data[i].equals(CHARTYPE.OPERATOR, "?"):
        buffer.complete(throw_error);
        result[0] = parseTernar(new ExpressionGroup(data[i].position, buffer.data), i + 1, data, throw_error);
        return {
          data: result[0].data,
          jump: i - start + result[0].jump + 2
        };
      // Операторы строки числа и т.д

      case data[i].equals(CHARTYPE.STRING) || data[i].equals(CHARTYPE.NUMBER) || data[i].equals(CHARTYPE.OPERATOR, ["/", "*", "+", "-", "!=", ">", "<", ">=", "<=", "=", "|", "&"]):
        buffer.append(data[i], throw_error);
        continue;
      // Неизвестно что это

      default:
        throw_error(data[i].position, new UnexpectedTokenException(data[i].toString(), "*"));
    }
  }
}
/**
 * Парсит исполняемый сегмент, после чего возвращает величину прыжка и данные исполнения
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error {@link CodeEmitter.throwError} - Вызывается при ошибке функция, котора первым ��ргументм принимает позицию вхождения на котором произошла ошибка
 * @param {String} segment_separator Разделитель для сегментов
 * @param {Number} max_segments Максимальное число сегментов, если это число сегментов будет превышено, будет выбражено исключение
 * @param {String} blockname Название блока
 *
 * @returns {{data: Array<ExpressionGroup>, jump: Number}} массив со стэком запроса, по которому можно получит доступ к переменной, и позиция с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */


function segmentationParser(start, entries, throw_error, segment_separator = ",", max_segments = Infinity, blockname = "unknown") {
  let hook_index = 0,
      buffer = [new Array()];

  for (let i = start; true; i++) {
    maybeEquals(entries, i, CHARTYPE.NEWLINE);

    switch (true) {
      case entries[i] === undefined || entries[i].equals(CHARTYPE.OPERATOR, ")") && hook_index <= 0:
        if (buffer.length > 0 && buffer[buffer.length - 1].length > 0) {
          buffer[buffer.length - 1] = parseExpression(0, buffer[buffer.length - 1], throw_error).data;
        } else if (buffer.length > 1) {
          throw_error(entries[i - 1].position, new SegmentationFaultEmptyArgumentException(blockname));
        } else {
          buffer.splice(buffer.length - 1, 1);
        }

        return {
          // Сегменты
          data: buffer,
          // Прыжок парсера
          jump: i - start
        };

      case entries[i].equals(CHARTYPE.OPERATOR, "("):
        hook_index++;
        buffer[buffer.length - 1].push(entries[i]);
        continue;

      case entries[i].equals(CHARTYPE.OPERATOR, ")"):
        if (hook_index > 0) {
          hook_index--;
          buffer[buffer.length - 1].push(entries[i]);
        } else throw_error(entries[i].position, new ParserLogicException());

        continue;

      case entries[i].contentEquals(segment_separator) && hook_index === 0:
        if (buffer[buffer.length - 1].length > 0) {
          buffer[buffer.length - 1] = parseExpression(0, buffer[buffer.length - 1], throw_error).data;
          buffer.push(new Array());
          if (buffer.length > max_segments) throw_error(entries[i].position, new SegmentationFaultMaximumSegmentsForBlockException(blockname));
        } else {
          throw_error(entries[i].position, new SegmentationFaultEmptyArgumentException(blockname));
        }

        break;

      default:
        buffer[buffer.length - 1].push(entries[i]);
        break;
    }
  }
}
/**
 * Используется для того, чтобы вырезать исполняемые сегменты из исполняемых блоков `{}`
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: Array<SequenceGroup>, jump: Number}} массив с выражениями, и позиция с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */


function segmentCutter(start, entries, throw_error) {
  let hook_index = 0,
      body = new Array();

  for (let i = start; true; i++) {
    switch (true) {
      case entries[i] === undefined || entries[i].equals(CHARTYPE.OPERATOR, "}") && hook_index <= 0:
        return {
          // Сегменты
          data: codeBlockParser(0, body, throw_error).data,
          // Прыжок парсера
          jump: i - start
        };

      case entries[i].equals(CHARTYPE.OPERATOR, "{"):
        hook_index++;
        body.push(entries[i]);
        continue;

      case entries[i].equals(CHARTYPE.OPERATOR, "}"):
        if (hook_index > 0) {
          hook_index--;
          body.push(entries[i]);
        } else throw_error(entries[i].position, new ParserLogicException());

        continue;

      default:
        body.push(entries[i]);
        break;
    }
  }
}
/**
 * Парсит блок if, возвращзает серриализованый блок if.
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {{data: IfStatement, jump: Number}} Объякт дескриптор блока if, и позиция с которой можно продолжить парсинг
 *
 * @memberof Poonya.Parser
 * @protected
 */


function ifStatementParser(start, entries, throw_error) {
  let index = start,
      result = new Array();

  if (maybeEquals(entries, index + 1, CHARTYPE.NEWLINE) && entries[index + 1].equals(CHARTYPE.OPERATOR, "(")) {
    // statement ( ...parse... )
    result[0] = segmentationParser(index + 2, entries, throw_error, "", 1, "if");
    index += result[0].jump + 3; // { expression }

    if (maybeEquals(entries, index, CHARTYPE.NEWLINE) && entries[index].equals(CHARTYPE.OPERATOR, "{")) {
      result[1] = segmentCutter(index + 1, entries, throw_error);
      index += result[1].jump + 1; // Else statement

      if (entries[index + 1] != null && entries[index + 1].equals(CHARTYPE.WORD, "else")) {
        // { expression }
        if (maybeEquals(entries, index + 2, CHARTYPE.NEWLINE) && entries[index + 2].equals(CHARTYPE.OPERATOR, "{")) {
          result[2] = segmentCutter(index + 3, entries, throw_error);
          index += result[2].jump + 3;
          return {
            data: new IfStatement(result[0].data[0], result[1].data, result[2].data),
            jump: index - start
          };
        } else if (maybeEquals(entries, index + 2, CHARTYPE.NEWLINE) && entries[index + 2].equals(CHARTYPE.WORD, "if")) {
          result[2] = ifStatementParser(index + 2, entries, throw_error);
          index += result[2].jump + 2;
          return {
            data: new IfStatement(result[0].data[0], result[1].data, result[2].data),
            jump: index - start
          };
        } else {
          throw_error(entries[index + 2].position, new UnexpectedTokenStatement("else", entries[index + 2].toString(), "{"));
        }
      } else {
        return {
          data: new IfStatement(result[0].data[0], result[1].data),
          jump: index - start
        };
      }
    } else {
      throw_error(entries[index].position, new UnexpectedTokenStatement("if", entries[index].toString(), "{"));
    }
  } else {
    throw_error(entries[index + 1].position, new UnexpectedTokenStatement("if", entries[index + 1].toString(), "("));
  }
}
/**
 * Парсит тело (главное тело или секции исполняемых блоков) преобразуя вхождения в исполняемую последовательность.
 *
 * @param {Number} start Начальная позиция разбора, для выражения
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 *
 * @returns {
 *      {
 *          data: SequenceGroup,
 *          jump: Number
 *      }
 * } Исполняемый стэк, и позиция с которой можно продолжить парсинг
 * @memberof Poonya.Parser
 * @protected
 */


function codeBlockParser(start, entries, throw_error) {
  const buffer = new SequenceGroup(),
        result = new Array();

  for (let i = start, leng = entries.length; true; i++) {
    try {
      if (entries[i] == null) {
        return {
          data: buffer,
          jump: i - start
        };
      }

      switch (true) {
        case entries[i].equals(CHARTYPE.NEWLINE):
          continue;

        case entries[i].equals(CHARTYPE.OPERATOR, ">"):
          result[0] = parseExpression(i + 1, entries, throw_error);
          i += result[0].jump + 1;
          buffer.push(new OutOperator(result[0].data));
          continue;

        case entries[i].equals(CHARTYPE.WORD, "if"):
          result[0] = ifStatementParser(i, entries, throw_error);
          i += result[0].jump;
          buffer.push(result[0].data);
          continue;

        case entries[i].equals(CHARTYPE.WORD, "while"):
          if (i + 1 < leng && maybeEquals(entries, i + 1, CHARTYPE.NEWLINE) && entries[i + 1].equals(CHARTYPE.OPERATOR, "(")) {
            // statement ( ...parse... )
            result[0] = segmentationParser(i + 2, entries, throw_error, "", 1, "while");
            i += result[0].jump + 3; // { expression }

            if (maybeEquals(entries, i, CHARTYPE.NEWLINE) && entries[i].equals(CHARTYPE.OPERATOR, "{")) {
              result[1] = segmentCutter(i + 1, entries, throw_error);
              i += result[1].jump + 1;
              buffer.push(new WhileStatement(result[0].data[0], result[1].data));
            } else {
              throw_error(entries[i].position, new UnexpectedTokenStatement("while", entries[i].toString(), "{"));
            }
          } else {
            throw_error(entries[i + 1].position, new UnexpectedTokenStatement("while", entries[i + 1].toString(), "("));
          }

          continue;

        case entries[i].equals(CHARTYPE.WORD, "repeat"):
          if (i + 1 < leng && maybeEquals(entries, i + 1, CHARTYPE.NEWLINE) && entries[i + 1].equals(CHARTYPE.OPERATOR, "(")) {
            // statement ( ...parse... )
            result[0] = segmentationParser(i + 2, entries, throw_error, ";", 2, "repeat");
            i += result[0].jump + 3; // { expression }

            if (maybeEquals(entries, i, CHARTYPE.NEWLINE) && entries[i].equals(CHARTYPE.OPERATOR, "{")) {
              result[1] = segmentCutter(i + 1, entries, throw_error);
              i += result[1].jump + 1;
              buffer.push(new RepeatStatement(result[0].data[0], result[0].data[1], result[1].data));
            } else {
              throw_error(entries[i].position, new UnexpectedTokenStatement("repeat", entries[i].toString(), "{"));
            }
          } else {
            throw_error(entries[i + 1].position, new UnexpectedTokenStatement("repeat", entries[i + 1].toString(), "("));
          }

          continue;

        case entries[i].equals(CHARTYPE.WORD, "set"):
          if (i + 1 < leng && maybeEquals(entries, i + 1, CHARTYPE.NEWLINE) && entries[i + 1].equals(CHARTYPE.WORD)) {
            if (i + 2 < leng && maybeEquals(entries, i + 2, CHARTYPE.NEWLINE) && entries[i + 2].equals(CHARTYPE.OPERATOR, "=")) {
              result[0] = parseExpression(i + 3, entries, throw_error);
              buffer.push(new SetOperator(entries[i + 1], result[0].data));
              i += result[0].jump + 3;
              continue;
            } else {
              throw_error(entries[i + 3].position, new UnexpectedWordTypeAndGetException(entries[i + 2].toString(), entries[i + 2].type));
            }
          } else {
            throw_error(entries[i + 2].position, new UnexpectedWordTypeAndGetException(entries[i + 1].toString(), entries[i + 1].type));
          }

        case entries[i].equals(CHARTYPE.WORD):
          result[0] = parseVarName(i, entries, throw_error); // Если следующий символ доступен

          if (i + result[0].jump < leng) {
            // Переопределение
            if (entries[i + result[0].jump].equals(CHARTYPE.OPERATOR, "=")) {
              result[1] = parseExpression(result[0].jump + i + 1, entries, throw_error);
              buffer.push(new ResetOperator(entries[i + result[0].jump].position, result[0].data, result[1].data));
              i += result[0].jump + result[1].jump + 1; // Добавление
            } else if (entries[i + result[0].jump].equals(CHARTYPE.OPERATOR, "<")) {
              if (entries[i + result[0].jump + 1].equals(CHARTYPE.OPERATOR, "-")) {
                result[1] = parseExpression(result[0].jump + i + 2, entries, throw_error);
                buffer.push(new PushOperator(entries[i + result[0].jump].position, result[0].data, result[1].data));
                i += result[0].jump + result[1].jump + 2;
              } else {
                throw_error(entries[i + result[0].jump + 1].position, new UnexpectedTokenException(entries[i + result[0].jump + 1].toString(), "-"));
              } // Вызов функции

            } else if (entries[i + result[0].jump].equals(CHARTYPE.OPERATOR, "(")) {
              result[1] = parseExpression(i, entries, throw_error);
              buffer.push(result[1].data);
              i += result[1].jump; // Ошибка
            } else {
              throw_error(entries[i].position, new InvalidSequenceForLetiableAccessException());
            }
          } else {
            i += result[0].jump;
          }

          continue;

        case entries[i].equals(CHARTYPE.NUMBER) || entries[i].equals(CHARTYPE.STRING):
          result[0] = parseExpression(i, entries, throw_error);
          buffer.push(result[0].data);
          i += result[0].jump;
          continue;

        default:
          throw_error(entries[i].position, new UnexpectedTokenException(entries[i].toString(), "*"));
      }
    } catch (e) {
      if (!e instanceof ParserException) {
        if (entries.length != 0) {
          if (entries[i] != null) throw_error(entries[i].position, new CriticalParserErrorException());else throw_error(entries[entries.length - 1].position, new CriticalParserErrorUnexpectedEndOfInputException());
        } else {
          throw_error(0, new CriticalParserErrorNoRawDataTransmittedException());
        }
      } else {
        throw e;
      }
    }
  }
}
/**
 * Парсит вхождения, которые можно получить вызовом функции @see {@link lexer}
 *
 * @param {Array<LexerEntry>} entries Вхождения которые будут обработаны парсером
 * @param {Function} throw_error {@link CodeEmitter.throwError} - Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
 * @param {?String} parent_path Путь к шаблону
 *
 * @returns {SequenceMainGroup} Тело исполнителя
 *
 * @memberof Poonya.Parser
 * @protected
 * @async
 */


async function parser(entries, throw_error, parent_path) {
  return new SequenceMainGroup(codeBlockParser(0, await linker(entries, parent_path, throw_error), throw_error).data.Sequence);
}
/**
 * Парсит шаблон сообщения, которое помимо кода Poonya может содержать и любые другие символы вне префикса
 * 
 * @param {Array<LexerEntry>} entries Вхождения для парсинга
 * @param {String} block_prefix Префикс для обозначения начала блока кода poonya
 * @param {Function} throw_error {@link CodeEmitter.throwError} - Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождени
 * @param {String} parent_path Путь к шаблону
 * 
 * @returns {SequenceMainGroup} Тело исполнителя
 *
 * @memberof Poonya.Parser
 * @protected
 * @async
 */


async function parserMP(entries, block_prefix, throw_error, parent_path) {
  let hook_index = 0,
      buffer = new Array(),
      out = new SequenceMainGroup();

  for (let i = 0; true; i++) {
    if (entries[i] == null) break;

    if ((block_prefix == null && entries[i].equals(CHARTYPE.OPERATOR, "{") || block_prefix != null && entries[i].contentEquals(block_prefix.toString()) && (entries[i + 1].equals(CHARTYPE.OPERATOR, "{") || entries[i + 1].equals(CHARTYPE.SPACE) && entries[i + 2].equals(CHARTYPE.OPERATOR, "{"))) && hook_index === 0) {
      if (block_prefix != null) i += entries[i + 1].equals(CHARTYPE.SPACE) ? 2 : 1;

      if (buffer.length > 0) {
        out.push(new OutOperator(new ObjectContructorCall(SERVICE.CONSTRUCTORS.STRING, buffer.join(""), entries[i].position)));
        buffer.splice(0, buffer.length);
      }

      hook_index++;
      continue;
    } else if (entries[i].equals(CHARTYPE.OPERATOR, "}") && hook_index === 1) {
      out.push(codeBlockParser(0, await linker(buffer.filter(e => e.type !== CHARTYPE.SPACE), parent_path, throw_error), throw_error).data);
      buffer.splice(0, buffer.length);
      hook_index--;
      continue;
    } else {
      if (hook_index >= 1) switch (true) {
        case entries[i].equals(CHARTYPE.OPERATOR, "{"):
          hook_index++;
          break;

        case entries[i].equals(CHARTYPE.OPERATOR, "}"):
          hook_index--;
          break;
      }
    }

    if (!hook_index === 0) buffer.push(entries[i].toString());else buffer.push(entries[i]);
  }

  if (buffer.length !== 0) if (hook_index === 1) {
    out.push(codeBlockParser(0, await linker(buffer.filter(e => e.type !== CHARTYPE.SPACE), parent_path, throw_error), throw_error).data);
    buffer.splice(0, buffer.length);
  } else if (hook_index === 0) {
    if (buffer.length != 0) {
      out.push(new OutOperator(new ObjectContructorCall(SERVICE.CONSTRUCTORS.STRING, buffer.join(""), entries[entries.length - 1].position)));
      buffer.splice(0, buffer.length);
    }
  } else {
    throw_error(entries[entries.length - 1].position, new UnexpectedTokenException(entries[entries.length - 1], "}"));
  }
  return out;
}

module.exports.parser = parser;
module.exports.parserMP = parserMP;
module.exports.parseExpression = parseExpression;

/***/ }),

/***/ 358:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * @author Astecom
 * @license MIT
 * @version 0.4.5
 * @see {@link https://github.com/AseWhy/Poonya|GitHub}
 * @namespace Poonya
 * @description A templating engine used to create templates and then render them
 * 
 * <pre style="background: whitesmoke;overflow: hidden;border-left: 0.25em dashed;padding: 1em"><code>                     + @ W
 *                   + @ @ @ W #                                                         ____________________________________________________
 *                 : @ @ @ @ @ @                                                        |                      POONYA                       |
 *                 # * * * * @ @ *                                                     |      IS A TEMPLATING ENGINE THAT I HOPE WILL      |
 *               @ * * * * * * # W                                                    |           HELP YOU WITH TEXT PROCESSING           |
 *               * * * # @ # * * W                                                   |---------------------------------------------------|
 *             # @ @ @ @ @ @ @ @ W                                                  |              ASTECOM TRIED FOR YOU )              |
 *             @ @ @ @ @ # # @ @ W                                                 |     ______________________________________________|
 *             @ @ * * * * * * * W                                                |   /
 *             @ * * * * * * * * #                                               |  /
 *             * * * * @ @ @ @ @ @                                              | /
 *             * * @ @ @ @ @ @ @ @ +                                           |/
 *             # @ @ @ @ @ # * * * @                                     + W +
 *             * @ @ @ * * * * @ @ @                                   W , , @ @
 *               @ # * * * @ @ @ @ @ *                               @ , , * @ @ @
 *               @ * * * @ @ @ # * * *                             * , , , # @ @ @ #
 *                 * * @ @ # * * * * @ W                           , . , , , @ @ @ @ +
 *                 * @ @ * * * * @ @ @ @ + + + +                 # , , , * , @ @ @ @ @
 *                   W # * * * @ @ @ @ # * * * * # W             * : , , # , @ @ @ @ @
 *                     # * * # @ @ W * * * * * * * * # +         . . , , @ , @ @ @ @ @
 *                         W @ @ W * * * * * * * * * * * *       + , * : . * * * * * * * * @             + + + +
 *                           + * * * * * * * * * * * * * * + + W W , # , * + + + + * , , * * * W   # @ @ @ @ @ : :
 *                           + * * * * * * * * * * * * * * W # , , , @ * + + + + + * , , * * * * W @ @ @ @ @ , , ,
 *                           @ * * * * * * * * * * * * * * * @ , , + * . : . . @ + + , , * * , , @ @ @ @ @ , , , , #
 *                           * * * * * * * * * * * * * * * * , , * + . . # @ + . @ + * * * : , , # @ @ @ , , , , , #
 *                         + * * * * * * * * * * * * * * * * * * . . : @ @ @ @ + # + * * * * , * * # @ . , @ , , , +
 *                         + * * * * * * * * * * * * * * * * # . . W @ @ @ @ , , . * * * * * + + + + W , # , , W ,
 *                           * * * * * * * * * * * * * * # # # @ @ @ W @ @ , , , @ . , : * + + + + + * * , , : , @
 *                           * * * * * * * * * * * * * * * * + . @ @ @ @ , , , , , , , , + W . . . W + * , * , ,
 *                           W * * * * * * * * * * * * * * * # . @ W @ : , + , , , , , , , , @ W + . * * * , , .
 *                             * * * * * * * * * * * * * * @ * . @ @ @ , , W * * * * * , , , @ @ @ + W : . , ,
 *                             * * * * * * * * * * * * * * * * W @ @ @ , , W * * * * * # , , @ @ @ . : W # #
 *                             W * * * * * * * * * * @ @ * * * * @ @ @ , , W + + + + * * @ , @ @ @ : . # , ,
 *                           + * # * * * * * * * * @ @ @ @ @ * * W @ @ , , W + + + + * * , , @ @ @ . . * , # @
 *                           # * W * * * * * * * * @ @ @ @ @ * * * @ @ , , W + + + + * , , , @ @ @ + # * * W
 *                           @ * W * * * * * * * * @ @ @ @ @ * * * * @ , , W + + + * , , , @ @ @ W . : *
 *                           W @ W @ * * * * * * * @ @ @ @ @ # * * * @ , , W + + W , , , . @ @ W . . @ #
 *                             @ W @ @ * * * * * # + @ W @ @ @ * * * * @ , # * . , , , , @ @ @ : W +   +
 *                             @ @ @ @ @ * * * * *         + @ * * * * * * W , , , , , @ @ @ *
 *                             + @ W @ @ @ @ @ @             + # * * * * # @ # * * @ @ @ @ W +
 *                               @ @ W @ @ @ @ @ +             + * * @ @ @ @ @ W @ @ @ @ @ @ @ @ W
 *                                 @ @ W @ @ @ @ +               + @ @ @ @ @ @ @ @ W W @ @ @ @ @ @ +
 *                                   W W @ @ @ @ W                 # @ @ @ @ @ @ @ @ @ W @ @ @ @ *
 *                                         @ @ @ @                     @ W @ @ @ @ W @
 *                                         + @ @ *                           + # +
 * </code></pre>
 * 
 * * * * * * * * * * * * * * * * * 
 *                               *
 *  If disagree - criticize      *
 *  Criticizing - suggest        *
 *  Suggesting - perform         *
 *  Performing - be responsible! *
 *                               *
 *  - S.P. Korolev               *
 *                               *
 * * * * * * * * * * * * * * * * *
 */
// This file is compiled specifically for the browser, if you need a node.js version use poonya.node.bundle.js


const {
  EventEmitter
} = __webpack_require__(246),
      {
  PoonyaException
} = __webpack_require__(880),
      {
  Import,
  ImportDir,
  ImportFile
} = __webpack_require__(701),
      {
  Context,
  Heap
} = __webpack_require__(643),
      {
  parser,
  parseExpression,
  parserMP
} = __webpack_require__(585),
      {
  SERVICE
} = __webpack_require__(718),
      {
  toFixed,
  toBytes
} = __webpack_require__(0),
      lexer = __webpack_require__(324);

const RESULT = Symbol('RESULT'),
      INIT = Symbol('Init');
/**
 * @lends PoonyaOutputStream
 * @class
 */

class PoonyaOutputStream extends EventEmitter {
  /**
   * Класс вывода шаблонов, за счет этого интерфейса производится
   *
   * @param {Object} data
   * @param {Context} context
   * 
   * @property {Context} data данные которые уже были выведены
   * 
   * @memberof Poonya
   * @constructs Heap
   * @public
   */
  constructor() {
    super();
    this._data = new Array();
    this._ended = false;
  }
  /**
   * Перенаправляет поток данных в `stream` переданный первым аргументом
   * 
   * @param {PoonyaOutputStream} stream поток которому необходимо передавать данные помимо этого
   * @returns PoonyaOutputStream Поток который был передан.
   * @method
   * @public
   */


  pipe(stream) {
    if (typeof stream.write === 'function') {
      this.on('data', stream.write);
      return stream;
    } else {
      throw new TypeError('Is not a WriteStream');
    }
  }
  /**
   * Выводит данные
   * 
   * @param {Any} data данные которые необходимо вывести
   * @method
   * @public
   */


  write(data) {
    this._data.push(data);

    this.emit('data', data);
  }
  /**
   * Завершает поток, посылает событие, после готоро
   */


  end() {
    this._ended = true;
    this.emit('end');
  }
  /**
   * Ожидает завершения записи потока, после чего возвращает массив с буффером данных
   * 
   * @async
   * @public
   * @method
   * @returns {Array<Any>} массив с переданными данными
   */


  complete() {
    if (!this._ended) return new Promise(res => this.on('end', () => res(this._data)));else return this._data;
  }

}
/**
 * @lends CodeEmitter;
 */


class CodeEmitter extends EventEmitter {
  /**
   * Абстрактный класс который предназначен для подготовке всех наследуемых эмитттеров.
   *
   * @param {
   *  String | {
   *          raw: String,
   *          path: String,
   *          charset: String
   *      }
   * } input Входящая строка с выражением
   *
   * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
   *
   * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
   *
   * @memberof Poonya
   * @constructs CodeEmitter
   * @abstract
   * @protected
   */
  constructor(input, import_s = [], logger = console, onload) {
    super();

    const _ = this;

    _.input = null;
    _.loaded = false;
    _.logger = logger;

    if (typeof input === "string") {
      _.input = input;
      _.charset = 'utf-8';
      _.path = window.location.href;

      if (SERVICE.LOADED) {
        _[INIT](import_s, logger);

        setTimeout(() => onload.call(_), 0);
      } else {
        SERVICE.ACTIONS.on('load', () => {
          _[INIT](import_s, logger);

          onload.call(_);
        });
      }
    } else if (typeof input === "object") {
      _.charset = typeof input.charset === "string" ? input.charset : "utf-8"; // Защищаю от выполнения браузерного кода в nodejs

      _.path = typeof input.path === 'string' ? input.path.split('/').pop().split('.').length > 0 ? input.path : input.path + '.po' : 'anonymous.po';
      if (typeof input.raw === "string") _.input = input.raw;else if (typeof input.path === "string") {
        try {
          // Защищаю от выполнения браузерного кода в nodejs
          fetch(input.path, {
            method: "GET"
          }).catch(e => {
            throw e;
          }).then(e => e.text()).then(e => {
            _.input = e;

            if (SERVICE.LOADED) {
              _[INIT](import_s, logger);

              onload.call(_);
            } else {
              SERVICE.ACTIONS.on('load', () => {
                _[INIT](import_s, logger);

                onload.call(_);
              });
            }
          });
        } catch (e) {
          throw new IOError(input.path);
        }
      } else throw new Error("BAD_DATA_FORMAT");
    } else {
      throw new Error("BAD_DATA_FORMAT");
    }
  }
  /**
   * Выводит сообщение об ошибке, прекращает выполнения текущего шаблона.
   *
   * @param {Number} pos Позиция в которой произшла ошибка
   * @param {String} message Сообщение с ошибкой
   * @param {Number} rad_of Радиус печати, т.е. количество строк которое будет печатать в вывод по мимо строки на которой произошла ошибка
   * @method
   * @public
   */


  throwError(pos, message, rad_of = 5) {
    rad_of = parseInt(rad_of);
    let buffer = [message instanceof PoonyaException ? message.message : message],
        data = this.input.split("\n"),
        line_dump = toBytes(this.input).slice(0, pos).map(e => String.fromCharCode(e)).join('').split("\n"),
        line = line_dump.length - 1,
        line_start = line - parseInt(rad_of / 2) < 0 ? 0 : line - parseInt(rad_of / 2),
        line_end = line_start + rad_of < data.length ? line_start + rad_of : data.length,
        ll = line_end.toString(16).length + 2;
    buffer.push(", at ", this.path, ", at ", line, ":", line_dump[line].length, " symbol");

    if (pos != -1) {
      buffer.push(' :>\n');

      for (let i = line_start; i < line_end; i++) {
        buffer.push(" ", toFixed(i, ll), " |> ", data[i]);

        if (i === line) {
          buffer.push("\n ", new Array(ll + 1).join(" "), " |> " + new Array(line_dump[line].length).join(" "), "^");
        }

        if (i + 1 !== line_end) buffer.push("\n");
      }
    }

    throw new Error(message.message + '\n' + buffer.join(""));
  }
  /**
   * Инициалзирует блок инструкций/
   *
   * @param {String|Heap} import_s названия нативных библиотек для импорта
   * @param {Console} logger интерфейс логгинга, Console like
   * 
   * @method
   * @private
   */


  [INIT](import_s, logger) {
    this.libraries = Import(["default", ...import_s], logger);
    this.import = import_s;
    this.data = null;
  }
  /**
   * Выполняет заданную блоку последовательность инструкций
   *
   * @param {String|Heap} data данные преданые в исполнитель
   * @param {Function} error функция вывода ошибок, опциаонально
   * @param {PoonyaOutputStream} out поток вывода из poonya
   * 
   * @method
   * @private
   */


  [RESULT](data, error, out) {
    if (Array.isArray(data)) {
      for (let i = 0, leng = data.length; i < leng; i++) if (typeof data[i] === "object" && !(data[i] instanceof Heap)) {
        data[i] = new Heap(data[i]);
      }

      if (data.find(e => !(e instanceof Heap)) == null) {
        this.data.result(new Context(this.libraries, error, ...data), out, error);
        out.end();
      } else {
        throw new TypeError("Data must have a Heap type");
      }
    } else {
      if (typeof data === "object" && !(data instanceof Heap)) {
        data = new Heap(data);
      }

      if (data instanceof Heap) {
        this.data.result(new Context(this.libraries, error, data), out, error);
        out.end();
      } else {
        throw new TypeError("Data must have a Heap type");
      }
    }
  }
  /**
   * Возвращает результат выполенения блока
   *
   * @param {String|Heap} data данные преданые в исполнитель
   * @param {Function} error функция вывода ошибок, опциаонально
   * 
   * @returns {Array<Any>} результат выполнения блока
   * @method
   * @public
   */


  result(data = new Heap(), error = this.throwError.bind(this)) {
    const out = new PoonyaOutputStream(); // Если вхождения уже загружены, выполняем последовательность

    if (this.loaded) {
      setTimeout(() => this[RESULT](data, error, out), 0);
    } else // Иначе, ждем окончания загрузки и выполняем последовательность
      this.on('load', () => this[RESULT](data, error, out));

    return out;
  }

}
/**
 * @lends MessagePattern;
 */


class MessagePattern extends CodeEmitter {
  /**
   * Шаблон сообщения, на вход нужно подавать код вида: <br> <br>
   * <code>
   *  Not formatted text... <br>
   *  Not formatted text... <br>
   *  <?prefix> { <br>
   *  &nbsp;&nbsp;&nbsp;&nbsp;// You code here <br>
   *  } <br>
   *  Not formatted text... <br>
   *  Not formatted text... <br>
   * </code> <br>
   * Т.е. код поадется туда в фигурных скобках, а все что не в них будет распознано как текст.
   *
   * @param {
   *      String | {
   *          raw: String,
   *          path: String,
   *          charset: String
   *      }
   * } input Входящая строка с выражением
   *
   * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
   *
   * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
   *
   * @memberof Poonya
   * @constructs MessagePattern
   * @protected
   */
  constructor(input, block_prefix = 'poonya', import_s, logger = console) {
    super(input, import_s, logger, async () => {
      this.data = await parserMP(lexer(toBytes(this.input)), block_prefix, this.throwError.bind(this), this.path);
      this.loaded = true;
      this.emit('load');
    });
  }

}
/**
 * @lends ExcecutionPattern;
 */


class ExcecutionPattern extends CodeEmitter {
  /**
   * Шаблон кода, все что подается сюда, будет распознаваться как код шаблонизатора: <br> <br>
   * <code>
   *  set somevar = arrays.create(); <br>
   *  <br>
   *  somevar <- 'Hello '; <br>
   *  somevar <- 'World'; <br>
   *  <br>
   *  repeat(0; 2){ <br>
   *  &nbsp;&nbsp;&nbsp;&nbsp;> objects.get(somevar, current); <br>
   *  } <br> <br>
   *  // По завершению выполнения шаблона будет выведено Hello World
   * </code> <br> <br>
   *
   * @param {
   *      String | {
   *          raw: String,
   *          path: String,
   *          charset: String
   *      }
   * } input Входящая строка с выражением
   *
   * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
   *
   * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
   *
   * @memberof Poonya
   * @constructs ExcecutionPattern
   * @protected
   */
  constructor(input, import_s, logger = console) {
    super(input, import_s, logger, async () => {
      this.data = await parser(lexer(toBytes(this.input), false), this.throwError.bind(this), this.path);
      this.loaded = true;
      this.emit('load');
    });
  }

}
/**
 * @lends ExpressionPattern;
 */


class ExpressionPattern extends CodeEmitter {
  /**
   * Шаблон выражения, сюда можно подать на всход выражение, а на выходе получить результат выполнения этого выражения: <br> <br>
   * <code>
   *  2 + (3 * (5 * (2 * 2)) / 3)
   * </code> <br> <br>
   * Пример выше выведет 22
   *
   * @param {String} input Входящая строка с выражением
   *
   * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
   *
   * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
   *
   * @memberof Poonya
   * @constructs ExpressionPattern
   * @protected
   */
  constructor(input, import_s, logger = console) {
    super(input, import_s, logger, () => {
      this.data = parseExpression(0, lexer(toBytes(this.input), false), this.throwError.bind(this)).data;
      this.loaded = true;
      this.emit('load');
    });
  }

  [RESULT](data, error) {
    if (!(data instanceof Context)) {
      if (Array.isArray(data)) {
        for (let i = 0, leng = data.length; i < leng; i++) if (typeof data[i] === "object" && !(data[i] instanceof Heap)) {
          data[i] = new Heap(data[i]);
        }

        if (data.find(e => !(e instanceof Heap)) == null) {
          return this.data.result(new Context(this.libraries, error, ...data), [], error);
        } else {
          throw new TypeError("Data must have a Heap type");
        }
      } else {
        if (typeof data === "object" && !(data instanceof Heap)) {
          data = new Heap(data);
        }

        if (data instanceof Heap) {
          return this.data.result(new Context(this.libraries, error, data), [], error);
        } else {
          throw new TypeError("Data must have a Heap type");
        }
      }
    } else {
      return this.data.result(data, [], error);
    }
  }
  /**
   * Возвращает результат выполенения выражения
   *
   * @returns {Object} результат выполнения выражения
   * @override
   * @method
   * @public
   * @async
   */


  result(data = new Heap(), error = this.throwError.bind(this)) {
    const _ = this;

    return new Promise((res, rej) => {
      if (_.loaded) res(_[RESULT](data, error));else _.on('load', () => res(_[RESULT](data, error)));
    });
  }

}

(async () => {
  __webpack_require__(49);

  __webpack_require__(363);

  SERVICE.ACTIONS.emit('load');
})();

module.exports.CodeEmitter = CodeEmitter;
module.exports.MessagePattern = MessagePattern;
module.exports.ExpressionPattern = ExpressionPattern;
module.exports.ExcecutionPattern = ExcecutionPattern;
module.exports.ImportFile = ImportFile.bind(null, module.parent != null ? module.parent.path : module.path);
const load = new Event('poonya:load');

function parseHTML(html) {
  var t = document.createElement('template');
  t.innerHTML = html;
  return t.content.cloneNode(true);
}

document.addEventListener('DOMContentLoaded', async () => {
  const entries = document.querySelectorAll('script[type="text/poonya"], script[lang="text/poonya"]');

  for (let i = 0, leng = entries.length; i < leng; i++) {
    const pattern = new ExcecutionPattern(entries[i].innerHTML, ['default.html']);
    await new Promise((res, rej) => {
      pattern.on('load', async () => {
        entries[i].replaceWith(...(await pattern.result().complete()).map(e => parseHTML(e)));
        res();
      });
    });
    window.dispatchEvent(load);
  }
}); // #!endif

/***/ }),

/***/ 802:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/preset.js
 * @description Содержит в себе прессеть данных для создания нативных бибилотек
 * @license MIT
 * @author Astecom
 */
module.exports.FIELDFLAGS = __webpack_require__(718).FIELDFLAGS;
module.exports.Exceptions = __webpack_require__(880);
module.exports.PoonyaStaticLibrary = __webpack_require__(701).PoonyaStaticLibrary;
module.exports.PoonyaPrototype = __webpack_require__(494);

/***/ }),

/***/ 0:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @file src/utils.js
 * @description Содержит в себе набор утилит, которые нужны много где, и их нельзя отнести к какой-либо конкретной группе
 * @license MIT
 * @author Astecom
 */
const {
  SERVICE
} = __webpack_require__(718),
      {
  Operand
} = __webpack_require__(18),
      {
  iPoonyaObject,
  iPoonyaPrototype
} = __webpack_require__(540),
      NativeFunction = __webpack_require__(240);
/**
 * Фукция которая преобразует нативное значение в значение Poonya
 *
 * @memberof Poonya.Utils
 * @function Cast
 *
 * @param {Any} data Данные которые необходимо преобразовать
 * @param {iContext} context Контекст
 * @param {Array<Any>} parents_three дерево родителей объекта
 *
 * @protected
 */


function Cast(data, context, parents_three = new Array()) {
  switch (typeof data) {
    case 'bigint':
      return context.createObject(data, -1, SERVICE.CONSTRUCTORS.INTEGER, null, parents_three);

    case 'number':
      return context.createObject(data, -1, SERVICE.CONSTRUCTORS.NUMBER, null, parents_three);

    case 'string':
      return context.createObject(data, -1, SERVICE.CONSTRUCTORS.STRING, null, parents_three);

    case 'symbol':
      return context.createObject(Symbol.keyFor(data), -1, SERVICE.CONSTRUCTORS.STRING, null, parents_three);

    case 'boolean':
      return context.createObject(data, -1, SERVICE.CONSTRUCTORS.BOOLEAN, null, parents_three);

    case 'undefined':
      return context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null);

    case 'object':
      switch (true) {
        case data === null:
          return context.createObject(data, -1, SERVICE.CONSTRUCTORS.NULL, null, parents_three);

        case data instanceof iPoonyaObject:
        case data instanceof iPoonyaPrototype:
        case data instanceof Operand:
        case data instanceof NativeFunction:
          return data;

        default:
          parents_three.push(data);
          if (Array.isArray(data)) return context.createObject(data, -1, SERVICE.CONSTRUCTORS.ARRAY, null, parents_three);else return context.createObject(data, -1, SERVICE.CONSTRUCTORS.OBJECT, null, parents_three);
      }

    case 'function':
      return new NativeFunction(data);
  }
}
/**
 * Иногда некоторые выражения записываются неоднозначно, допустим <br> <br>
 *
 * if (<b> < exp > </b>) {} <br>
 * <br>
 * Или <br>
 * <br>
 * if (<b> < exp > </b>) { <br>
 *  <br>
 * } <br>
 * <br>
 * Или <br>
 * <br>
 * if (<b> < exp > </b>) <br>
 * { <br>
 *  <br>
 * } <br>
 * <br>
 * И это все будет if, эта функцию убирает возможные 'линие символы'
 *
 * @param {Array<LexerEntry>} entries Выхождение, на вход
 * @param {Number} index Проверяемый индекс
 * @param {String} equalts_t Тип с которым сравниваем
 * @param {String|Array<String>} equalts_v Значение(я) с которым(и) сравниваем
 *
 * @memberof Poonya.Utils
 * @private
 */


function maybeEquals(entries, index, equalts_t, equalts_v) {
  while (entries[index].equals(equalts_t, equalts_v)) {
    entries.splice(index, 1);
  }

  return true;
}
/**
 * Подсчитывает количиство неприрывных одинаковых вхождений
 *
 * @param {Array<LexerEntry>} entries вхождения для парсинга
 * @param {Number} start начальная позиция парсинга
 * @param {String} equalts_t Тип с которым сравниваем
 * @param {String|Array<String>} equalts_v Значение(я) с которым(и) сравниваем
 *
 * @memberof Poonya.Utils
 * @private
 */


function countKeys(entries, start, equalts_t, equalts_v) {
  for (let i = start, to = entries.length; i < to; i++) {
    if (entries[i] == null || !entries[i].equals(equalts_t, equalts_v)) return i - start;
  }
}
/**
 * Форматирует число подгоняя его под общую длинну
 *
 * @param {Number} d Чило для формата
 * @param {Number} l Желаемая длинна
 * @memberof Poonya.Utils
 * @function toFixed
 * @protected
 * @static
 */


function toFixed(d, l) {
  return '0x' + d.toString(16).padStart(l - 2, '0');
}
/**
 * Преобразует строку в массив байтов
 *
 * @param {String} s Строка для преобразования
 * @memberof Poonya.Utils
 * @function toBytes
 * @protected
 * @static
 */


function toBytes(s) {
  return s.split('').map(e => e.charCodeAt());
}

module.exports.maybeEquals = maybeEquals;
module.exports.countKeys = countKeys;
module.exports.toFixed = toFixed;
module.exports.toBytes = toBytes;
module.exports.Cast = Cast;

/***/ }),

/***/ 246:
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;

if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}

module.exports = EventEmitter;
module.exports.once = once; // Backwards-compat with node 0.10.x

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }

    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}; // Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.


EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }

  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];

  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);

  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

  if (doError) {
    var er;
    if (args.length > 0) er = args[0];

    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    } // At least give some kind of context to the user


    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];
  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;

  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object

      events = target._events;
    }

    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    } // Check for listener leak


    m = _getMaxListeners(target);

    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true; // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax

      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
}; // Emits a 'removeListener' event if and only if the listener was removed.


EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this; // not listening for removeListener, no need to emit

  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }

    return this;
  } // emit removeListener for all listeners on all events


  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;

    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }

    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;

function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);

  for (var i = 0; i < n; ++i) copy[i] = arr[i];

  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];

  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);

  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }

  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }

      resolve([].slice.call(arguments));
    }

    ;
    var errorListener; // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.

    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}

/***/ }),

/***/ 386:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(358);
/******/ })()
;
define('poonya', [], () =>
    /******/ (() => {
        // webpackBootstrap
        /******/ var __webpack_modules__ = {
            /***/ 722: /***/ (
                __unused_webpack_module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                const { PoonyaStaticLibrary, FIELDFLAGS } = __webpack_require__(
                    40
                );

                const QUOTE_EXP = /"/g;
                const TAG_EXP = /<([aA-zZ0-9]+)/;

                function format(val) {
                    if (val === null) {
                        return 'null';
                    }

                    if (val === undefined) {
                        return 'undefined';
                    }

                    return val.toString();
                }

                new (class DefaultTagsStaticLibrary extends PoonyaStaticLibrary {
                    constructor() {
                        super('default.html.tags', false, false, 'TAGS');
                        this.addField('A', 'a', FIELDFLAGS.CONSTANT);
                        this.addField('ABBR', 'abbr', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'ADDRESS',
                            'address',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('AREA', 'area', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'ARTICLE',
                            'article',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('ASIDE', 'aside', FIELDFLAGS.CONSTANT);
                        this.addField('AUDIO', 'audio', FIELDFLAGS.CONSTANT);
                        this.addField('B', 'b', FIELDFLAGS.CONSTANT);
                        this.addField('BASE', 'base', FIELDFLAGS.CONSTANT);
                        this.addField('BDI', 'bdi', FIELDFLAGS.CONSTANT);
                        this.addField('BDO', 'bdo', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'BLOCKQUOTE',
                            'blockquote',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('BODY', 'body', FIELDFLAGS.CONSTANT);
                        this.addField('BR', 'br', FIELDFLAGS.CONSTANT);
                        this.addField('BUTTON', 'button', FIELDFLAGS.CONSTANT);
                        this.addField('CANVAS', 'canvas', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'CAPTION',
                            'caption',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('CITE', 'cite', FIELDFLAGS.CONSTANT);
                        this.addField('CODE', 'code', FIELDFLAGS.CONSTANT);
                        this.addField('COL', 'col', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'COLGROUP',
                            'colgroup',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('DATA', 'data', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'DATALIST',
                            'datalist',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('DD', 'dd', FIELDFLAGS.CONSTANT);
                        this.addField('DEL', 'del', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'DETAILS',
                            'details',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('DFN', 'dfn', FIELDFLAGS.CONSTANT);
                        this.addField('DIALOG', 'dialog', FIELDFLAGS.CONSTANT);
                        this.addField('DIV', 'div', FIELDFLAGS.CONSTANT);
                        this.addField('DL', 'dl', FIELDFLAGS.CONSTANT);
                        this.addField('DT', 'dt', FIELDFLAGS.CONSTANT);
                        this.addField('EM', 'em', FIELDFLAGS.CONSTANT);
                        this.addField('EMBED', 'embed', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'FIELDSET',
                            'fieldset',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField(
                            'FIGCAPTION',
                            'figcaption',
                            FIELDFLAGS.CONSTANT
                        );
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
                        this.addField(
                            'NOSCRIPT',
                            'noscript',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('OBJECT', 'object', FIELDFLAGS.CONSTANT);
                        this.addField('OL', 'ol', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'OPTGROUP',
                            'optgroup',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('OPTION', 'option', FIELDFLAGS.CONSTANT);
                        this.addField('OUTPUT', 'output', FIELDFLAGS.CONSTANT);
                        this.addField('P', 'p', FIELDFLAGS.CONSTANT);
                        this.addField('PARAM', 'param', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'PICTURE',
                            'picture',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('PRE', 'pre', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'PROGRESS',
                            'progress',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('Q', 'q', FIELDFLAGS.CONSTANT);
                        this.addField('RUBY', 'ruby', FIELDFLAGS.CONSTANT);
                        this.addField('RB', 'rb', FIELDFLAGS.CONSTANT);
                        this.addField('RT', 'rt', FIELDFLAGS.CONSTANT);
                        this.addField('RTC', 'rtc', FIELDFLAGS.CONSTANT);
                        this.addField('RP', 'rp', FIELDFLAGS.CONSTANT);
                        this.addField('S', 's', FIELDFLAGS.CONSTANT);
                        this.addField('SAMP', 'samp', FIELDFLAGS.CONSTANT);
                        this.addField('SCRIPT', 'script', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'SECTION',
                            'section',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('SELECT', 'select', FIELDFLAGS.CONSTANT);
                        this.addField('SMALL', 'small', FIELDFLAGS.CONSTANT);
                        this.addField('SOURCE', 'source', FIELDFLAGS.CONSTANT);
                        this.addField('SPAN', 'span', FIELDFLAGS.CONSTANT);
                        this.addField('STRONG', 'strong', FIELDFLAGS.CONSTANT);
                        this.addField('STYLE', 'style', FIELDFLAGS.CONSTANT);
                        this.addField('SUB', 'sub', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'SUMMARY',
                            'summary',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('SUP', 'sup', FIELDFLAGS.CONSTANT);
                        this.addField('TABLE', 'table', FIELDFLAGS.CONSTANT);
                        this.addField('TBODY', 'tbody', FIELDFLAGS.CONSTANT);
                        this.addField('TD', 'td', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'TEMPLATE',
                            'template',
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField(
                            'TEXTAREA',
                            'textarea',
                            FIELDFLAGS.CONSTANT
                        );
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
                })();
                new (class DefaultHtmlStaticLibrary extends PoonyaStaticLibrary {
                    constructor() {
                        super('default.html', false, false, 'html');
                        this.addLib('default.html.tags', FIELDFLAGS.CONSTANT);
                        this.addField(
                            'createElement',
                            this.createElement,
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField(
                            'getElementName',
                            this.getElementName,
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField(
                            'isElement',
                            this.isElement,
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField(
                            'createTag',
                            this.createTag,
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField(
                            'closeTag',
                            this.closeTag,
                            FIELDFLAGS.CONSTANT
                        );
                    }

                    createElement(service, tag, content, attrs = new Array()) {
                        if (typeof tag != 'string') {
                            tag = tag != null ? tag.toString() : '';
                        }

                        if (typeof content != 'string') {
                            content = content != null ? content.toString() : '';
                        }

                        let form_attrs = new Array();

                        for (let key in attrs)
                            form_attrs.push(
                                `${key}="${format(attrs[key]).replace(
                                    QUOTE_EXP,
                                    '\\"'
                                )}"`
                            );

                        return `<${tag}${
                            form_attrs.length > 0
                                ? ' ' + form_attrs.join(' ')
                                : ''
                        }>${content}</${tag}>`;
                    }

                    getElementName(service, element) {
                        if (typeof element == 'string')
                            return element.match(TAG_EXP)[1];
                        else return null;
                    }

                    isElement(service, element, is) {
                        if (typeof element == 'string')
                            return element.match(TAG_EXP)[1] == is;
                        else return false;
                    }

                    createTag(service, tag, attrs = new Array()) {
                        if (typeof tag == 'string') {
                            let form_attrs = new Array();

                            for (let key in attrs)
                                form_attrs.push(
                                    `${key}="${format(attrs[key]).replace(
                                        QUOTE_EXP,
                                        '\\"'
                                    )}"`
                                );

                            return `<${tag}${
                                form_attrs.length > 0
                                    ? ' ' + form_attrs.join(' ')
                                    : ''
                            }>`;
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
                })();

                /***/
            },

            /***/ 990: /***/ (
                __unused_webpack_module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                const {
                    PoonyaStaticLibrary,
                    PoonyaPrototype,
                    FIELDFLAGS,
                    Exceptions,
                } = __webpack_require__(40);

                new (class DefaultMathStaticLibrary extends PoonyaStaticLibrary {
                    constructor() {
                        super('default.joiners', false, false, 'Join');
                        this.addField(
                            'concat',
                            this.concat,
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('raw', this.raw, FIELDFLAGS.CONSTANT);
                    }

                    concat(service, ...data) {
                        return Array.prototype.join.call(data, '');
                    }

                    raw(service, ...data) {
                        return data;
                    }
                })();
                new (class DefaultMathStaticLibrary extends PoonyaStaticLibrary {
                    constructor() {
                        super('default.math', false, false, 'Math');
                        this.addField('floor', this.floor, FIELDFLAGS.CONSTANT);
                        this.addField('round', this.round, FIELDFLAGS.CONSTANT);
                        this.addField('ceil', this.ceil, FIELDFLAGS.CONSTANT);
                        this.addField('abs', this.abs, FIELDFLAGS.CONSTANT);
                    }

                    ceil(service, n) {
                        if (typeof n === 'number' && !isNaN(n))
                            return Math.ceil(n);
                        return null;
                    }

                    floor(service, n) {
                        if (typeof n === 'number' && !isNaN(n))
                            return Math.floor(n);
                        return null;
                    }

                    round(service, n) {
                        if (typeof n === 'number' && !isNaN(n))
                            return Math.round(n);
                        return null;
                    }

                    abs(service, n) {
                        if (typeof n === 'number' && !isNaN(n))
                            return Math.abs(n);
                        return null;
                    }
                })();
                new (class DefaultDatesStaticLibrary extends PoonyaStaticLibrary {
                    constructor() {
                        super('default.dates', false, false, 'Date');
                        this.addField(
                            'minutes',
                            this.minutes,
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField(
                            'seconds',
                            this.seconds,
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('month', this.month, FIELDFLAGS.CONSTANT);
                        this.addField('hours', this.hours, FIELDFLAGS.CONSTANT);
                        this.addField('year', this.year, FIELDFLAGS.CONSTANT);
                        this.addField('day', this.day, FIELDFLAGS.CONSTANT);
                        this.addField('now', this.now, FIELDFLAGS.CONSTANT);
                        this.date = new Date();
                    }

                    year() {
                        return this.date.getUTCFullYear();
                    }

                    month() {
                        return this.date.getUTCMonth();
                    }

                    day() {
                        return this.date.getUTCDay();
                    }

                    hours() {
                        return this.date.getUTCHours();
                    }

                    minutes() {
                        return this.date.getUTCMinutes();
                    }

                    seconds() {
                        return this.date.getUTCSeconds();
                    }

                    now() {
                        return this.date.getTime();
                    }
                })();

                class PoonyaObjectPrototype extends PoonyaPrototype {
                    constructor() {
                        super([], 'Object');
                        this.addField(
                            'create',
                            this.create,
                            FIELDFLAGS.CONSTANT | FIELDFLAGS.STATIC
                        );
                        this.addField(
                            'values',
                            this.values,
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField(
                            'assign',
                            this.assign,
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField(
                            'remove',
                            this.remove,
                            FIELDFLAGS.CONSTANT
                        );
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
                        for (let i = 0, leng = args.length; i < leng; i++)
                            this.append(args[i]);

                        return null;
                    }

                    set(service, key, value) {
                        this.set(service.context, key, value);
                        return null;
                    }

                    has(service, key) {
                        return this.has(key);
                    }

                    get(service, key) {
                        return this.get(key);
                    }

                    remove(service, key) {
                        this.delete(key);
                        return null;
                    }

                    create() {
                        return new Object();
                    }
                }

                class PoonyaNumberPrototype extends PoonyaPrototype {
                    constructor() {
                        super([], 'Number');
                        this.addField(
                            'random',
                            this.random,
                            FIELDFLAGS.CONSTANT | FIELDFLAGS.STATIC
                        );
                        this.addField(
                            'isNumber',
                            this.isNumber,
                            FIELDFLAGS.CONSTANT | FIELDFLAGS.STATIC
                        );
                        this.addField(
                            'parseInt',
                            this.parseInt,
                            FIELDFLAGS.CONSTANT | FIELDFLAGS.STATIC
                        );
                    }

                    random(service, f, t) {
                        if (
                            typeof f != 'number' ||
                            typeof t != 'number' ||
                            isNaN(f) ||
                            isNaN(t)
                        )
                            return Math.random();
                        else return Math.round(f + Math.random() * (t - f));
                    }

                    isNumber(service, o) {
                        return typeof o === 'number' && !isNaN(o);
                    }

                    parseInt(service, numb) {
                        return isNaN((numb = parseInt(numb))) ? null : numb;
                    }
                }

                class PoonyaIntegerPrototype extends PoonyaPrototype {
                    constructor(context, reject) {
                        let pNumber = null; //
                        // Ищу прототип числа в текущем контексте
                        //

                        context.getByPath(
                            ['Number'],
                            -1,
                            null,
                            reject,
                            null,
                            (result) => (pNumber = result)
                        ); //
                        // Integer extends Number
                        //

                        super([pNumber], 'Integer'); //
                        // Methods
                        //

                        this.addField(
                            'parseInt',
                            this.parseInt,
                            FIELDFLAGS.CONSTANT | FIELDFLAGS.STATIC
                        );
                        this.addField(
                            'isInteger',
                            this.isInteger,
                            FIELDFLAGS.CONSTANT | FIELDFLAGS.STATIC
                        );
                    }

                    isInteger(service, o) {
                        return typeof o === 'bigint';
                    }

                    parseInt(service, numb) {
                        return BigInt(numb);
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

                class PoonyaPatternPrototype extends PoonyaPrototype {
                    constructor() {
                        super([], 'Pattern');
                    }
                }

                class PoonyaStringPrototype extends PoonyaPrototype {
                    constructor(context) {
                        super([], 'String');
                        this.addField(
                            'charAt',
                            this.charAt,
                            FIELDFLAGS.CONSTANT,
                            context
                        );
                        this.addField(
                            'length',
                            this.length,
                            FIELDFLAGS.CONSTANT | FIELDFLAGS.PROPERTY,
                            context
                        );
                        this.addField(
                            'fromaCharCode',
                            this.fromaCharCode,
                            FIELDFLAGS.CONSTANT | FIELDFLAGS.STATIC,
                            context
                        );
                    }

                    fromaCharCode(service, code) {
                        return String.fromCharCode(code);
                    }

                    charAt(service, index) {
                        if (index != null) {
                            return this.data.charAt(index);
                        } else return null;
                    }

                    length() {
                        return this.data.length;
                    }
                }

                class PoonyaArrayPrototype extends PoonyaPrototype {
                    constructor(context) {
                        super([], 'Array');
                        this.addField(
                            'from',
                            this.from,
                            FIELDFLAGS.CONSTANT | FIELDFLAGS.STATIC,
                            context
                        );
                        this.addField(
                            'includes',
                            this.includes,
                            FIELDFLAGS.CONSTANT,
                            context
                        );
                        this.addField(
                            'indexOf',
                            this.indexOf,
                            FIELDFLAGS.CONSTANT,
                            context
                        );
                        this.addField(
                            'concat',
                            this.concat,
                            FIELDFLAGS.CONSTANT,
                            context
                        );
                        this.addField(
                            'append',
                            this.append,
                            FIELDFLAGS.CONSTANT,
                            context
                        );
                        this.addField(
                            'length',
                            this.length,
                            FIELDFLAGS.CONSTANT | FIELDFLAGS.PROPERTY,
                            context
                        );
                        this.addField(
                            'remove',
                            this.remove,
                            FIELDFLAGS.CONSTANT,
                            context
                        );
                        this.addField(
                            'slice',
                            this.slice,
                            FIELDFLAGS.CONSTANT,
                            context
                        );
                        this.addField(
                            'pop',
                            this.pop,
                            FIELDFLAGS.CONSTANT,
                            context
                        );
                    }

                    from(service, ...defs) {
                        return defs;
                    }

                    includes(service, target) {
                        for (let field of this.fields) {
                            if (
                                field.value.result(
                                    service.context,
                                    null,
                                    service.reject
                                ) == target
                            )
                                return true;
                        }

                        return false;
                    }

                    remove(service, from, to) {
                        if (typeof from != 'number' || isNaN(from))
                            service.reject(
                                service.position,
                                new Exceptions.PoonyaException(
                                    'From must have a number type'
                                )
                            );
                        if (typeof to != 'number' || isNaN(to))
                            service.reject(
                                service.position,
                                new Exceptions.PoonyaException(
                                    'To must have a number type'
                                )
                            );
                        const delta = to - from;

                        while (from != to) {
                            this.remove(from);
                            from += delta;
                        }

                        return null;
                    }

                    indexOf(service, target) {
                        for (let [key, value] of this.fields) {
                            if (
                                value.result(
                                    service.context,
                                    null,
                                    service.reject
                                ) == target
                            )
                                return key;
                        }

                        return -1;
                    }

                    length() {
                        return this.fields.size;
                    }

                    append(service, value) {
                        this.push(value);
                        return null;
                    }

                    concat(service, ...args) {
                        for (let i = 0, leng = args.length; i < leng; i++) {
                            for (
                                let j = 0, j_leng = args[i].length;
                                j < j_leng;
                                j++
                            ) {
                                this.push(args[i][j]);
                            }
                        }

                        return null;
                    }

                    slice(service, from, to) {
                        if (typeof from != 'number' || isNaN(from))
                            service.reject(
                                service.position,
                                new Exceptions.PoonyaException(
                                    'From must have a number type'
                                )
                            );
                        if (typeof to != 'number' || isNaN(to))
                            service.reject(
                                service.position,
                                new Exceptions.PoonyaException(
                                    'To must have a number type'
                                )
                            );
                        const delta = to - from,
                            out = new Array();

                        while (from != to) {
                            out.push(this.get(from));
                            from += delta;
                        }

                        return out;
                    }

                    pop() {
                        const buffer = this.fields.get(this.fields.size - 1);
                        this.fields.remove(this.fields.size - 1);
                        return buffer;
                    }
                }

                new (class DefaultStaticLibrary extends PoonyaStaticLibrary {
                    constructor() {
                        super('default', true);
                        this.expandPrototype(PoonyaObjectPrototype);
                        this.expandPrototype(PoonyaArrayPrototype);
                        this.expandPrototype(PoonyaStringPrototype);
                        this.expandPrototype(PoonyaBooleanPrototype);
                        this.expandPrototype(PoonyaNumberPrototype);
                        this.expandPrototype(PoonyaIntegerPrototype);
                        this.expandPrototype(PoonyaNullPrototype);
                        this.expandPrototype(PoonyaPatternPrototype);
                        this.addField('endd', '\n\n', FIELDFLAGS.CONSTANT);
                        this.addField('endl', '\n', FIELDFLAGS.CONSTANT);
                        this.addField('tab', '\t', FIELDFLAGS.CONSTANT);
                        this.addField('log', this.log, FIELDFLAGS.CONSTANT);
                        this.addField('wait', this.wait, FIELDFLAGS.CONSTANT);
                        this.addField(
                            'require',
                            this.require,
                            FIELDFLAGS.CONSTANT
                        );
                        this.addField('eval', this.eval, FIELDFLAGS.CONSTANT);
                        this.addLib('default.joiners');
                        this.addLib('default.dates');
                        this.addLib('default.math');
                    }

                    require(service, r_path) {
                        (async () => {
                            let path, content;
                            /*LIQUID*/

                            path =
                                window.location.origin +
                                '/' +
                                service.context.source
                                    .split('/')
                                    .slice(0, -1)
                                    .join('/') +
                                '/' +
                                r_path;
                            path =
                                path.split('/').pop().split('.').length > 0
                                    ? path
                                    : path + '.po';
                            content = fetch(path, {
                                method: 'GET',
                            }).then((e) => e.text());
                            /*LIQUID-END*/

                            if (path == service.context.source) {
                                service.reject(
                                    data[i].position,
                                    new Exceptions.IsRecursiveLink(
                                        service.context.source
                                    )
                                );
                            }

                            try {
                                service.resolve(
                                    await service.context
                                        .clone()
                                        .setSource(path)
                                        .eval(await content)
                                );
                            } catch (e) {
                                service.reject(
                                    data[i].position,
                                    new Exceptions.LinkerIOError(path)
                                );
                            }
                        })();
                    }

                    eval(srvice, string) {
                        return service.context.eval(string);
                    }

                    wait(service, milis) {
                        setTimeout(service.resolve, milis);
                    }

                    log(service, ...args) {
                        console.log(...args);
                        return null;
                    }
                })();

                /***/
            },

            /***/ 138: /***/ (module) => {
                'use strict';
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
                var ReflectApply =
                    R && typeof R.apply === 'function'
                        ? R.apply
                        : function ReflectApply(target, receiver, args) {
                              return Function.prototype.apply.call(
                                  target,
                                  receiver,
                                  args
                              );
                          };
                var ReflectOwnKeys;

                if (R && typeof R.ownKeys === 'function') {
                    ReflectOwnKeys = R.ownKeys;
                } else if (Object.getOwnPropertySymbols) {
                    ReflectOwnKeys = function ReflectOwnKeys(target) {
                        return Object.getOwnPropertyNames(target).concat(
                            Object.getOwnPropertySymbols(target)
                        );
                    };
                } else {
                    ReflectOwnKeys = function ReflectOwnKeys(target) {
                        return Object.getOwnPropertyNames(target);
                    };
                }

                function ProcessEmitWarning(warning) {
                    if (console && console.warn) console.warn(warning);
                }

                var NumberIsNaN =
                    Number.isNaN ||
                    function NumberIsNaN(value) {
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
                        throw new TypeError(
                            'The "listener" argument must be of type Function. Received type ' +
                                typeof listener
                        );
                    }
                }

                Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
                    enumerable: true,
                    get: function () {
                        return defaultMaxListeners;
                    },
                    set: function (arg) {
                        if (
                            typeof arg !== 'number' ||
                            arg < 0 ||
                            NumberIsNaN(arg)
                        ) {
                            throw new RangeError(
                                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                                    arg +
                                    '.'
                            );
                        }

                        defaultMaxListeners = arg;
                    },
                });

                EventEmitter.init = function () {
                    if (
                        this._events === undefined ||
                        this._events === Object.getPrototypeOf(this)._events
                    ) {
                        this._events = Object.create(null);
                        this._eventsCount = 0;
                    }

                    this._maxListeners = this._maxListeners || undefined;
                }; // Obviously not all Emitters should be limited to 10. This function allows
                // that to be increased. Set to zero for unlimited.

                EventEmitter.prototype.setMaxListeners = function setMaxListeners(
                    n
                ) {
                    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
                        throw new RangeError(
                            'The value of "n" is out of range. It must be a non-negative number. Received ' +
                                n +
                                '.'
                        );
                    }

                    this._maxListeners = n;
                    return this;
                };

                function _getMaxListeners(that) {
                    if (that._maxListeners === undefined)
                        return EventEmitter.defaultMaxListeners;
                    return that._maxListeners;
                }

                EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
                    return _getMaxListeners(this);
                };

                EventEmitter.prototype.emit = function emit(type) {
                    var args = [];

                    for (var i = 1; i < arguments.length; i++)
                        args.push(arguments[i]);

                    var doError = type === 'error';
                    var events = this._events;
                    if (events !== undefined)
                        doError = doError && events.error === undefined;
                    else if (!doError) return false; // If there is no 'error' event listener then throw.

                    if (doError) {
                        var er;
                        if (args.length > 0) er = args[0];

                        if (er instanceof Error) {
                            // Note: The comments on the `throw` lines are intentional, they show
                            // up in Node's output if this results in an unhandled exception.
                            throw er; // Unhandled 'error' event
                        } // At least give some kind of context to the user

                        var err = new Error(
                            'Unhandled error.' +
                                (er ? ' (' + er.message + ')' : '')
                        );
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

                        for (var i = 0; i < len; ++i)
                            ReflectApply(listeners[i], this, args);
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
                            target.emit(
                                'newListener',
                                type,
                                listener.listener ? listener.listener : listener
                            ); // Re-assign `events` because a newListener handler could have caused the
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
                            existing = events[type] = prepend
                                ? [listener, existing]
                                : [existing, listener]; // If we've already got an array, just append.
                        } else if (prepend) {
                            existing.unshift(listener);
                        } else {
                            existing.push(listener);
                        } // Check for listener leak

                        m = _getMaxListeners(target);

                        if (m > 0 && existing.length > m && !existing.warned) {
                            existing.warned = true; // No error code for this since it is a Warning
                            // eslint-disable-next-line no-restricted-syntax

                            var w = new Error(
                                'Possible EventEmitter memory leak detected. ' +
                                    existing.length +
                                    ' ' +
                                    String(type) +
                                    ' listeners ' +
                                    'added. Use emitter.setMaxListeners() to ' +
                                    'increase limit'
                            );
                            w.name = 'MaxListenersExceededWarning';
                            w.emitter = target;
                            w.type = type;
                            w.count = existing.length;
                            ProcessEmitWarning(w);
                        }
                    }

                    return target;
                }

                EventEmitter.prototype.addListener = function addListener(
                    type,
                    listener
                ) {
                    return _addListener(this, type, listener, false);
                };

                EventEmitter.prototype.on = EventEmitter.prototype.addListener;

                EventEmitter.prototype.prependListener = function prependListener(
                    type,
                    listener
                ) {
                    return _addListener(this, type, listener, true);
                };

                function onceWrapper() {
                    if (!this.fired) {
                        this.target.removeListener(this.type, this.wrapFn);
                        this.fired = true;
                        if (arguments.length === 0)
                            return this.listener.call(this.target);
                        return this.listener.apply(this.target, arguments);
                    }
                }

                function _onceWrap(target, type, listener) {
                    var state = {
                        fired: false,
                        wrapFn: undefined,
                        target: target,
                        type: type,
                        listener: listener,
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

                EventEmitter.prototype.prependOnceListener = function prependOnceListener(
                    type,
                    listener
                ) {
                    checkListener(listener);
                    this.prependListener(type, _onceWrap(this, type, listener));
                    return this;
                }; // Emits a 'removeListener' event if and only if the listener was removed.

                EventEmitter.prototype.removeListener = function removeListener(
                    type,
                    listener
                ) {
                    var list, events, position, i, originalListener;
                    checkListener(listener);
                    events = this._events;
                    if (events === undefined) return this;
                    list = events[type];
                    if (list === undefined) return this;

                    if (list === listener || list.listener === listener) {
                        if (--this._eventsCount === 0)
                            this._events = Object.create(null);
                        else {
                            delete events[type];
                            if (events.removeListener)
                                this.emit(
                                    'removeListener',
                                    type,
                                    list.listener || listener
                                );
                        }
                    } else if (typeof list !== 'function') {
                        position = -1;

                        for (i = list.length - 1; i >= 0; i--) {
                            if (
                                list[i] === listener ||
                                list[i].listener === listener
                            ) {
                                originalListener = list[i].listener;
                                position = i;
                                break;
                            }
                        }

                        if (position < 0) return this;
                        if (position === 0) list.shift();
                        else {
                            spliceOne(list, position);
                        }
                        if (list.length === 1) events[type] = list[0];
                        if (events.removeListener !== undefined)
                            this.emit(
                                'removeListener',
                                type,
                                originalListener || listener
                            );
                    }

                    return this;
                };

                EventEmitter.prototype.off =
                    EventEmitter.prototype.removeListener;

                EventEmitter.prototype.removeAllListeners = function removeAllListeners(
                    type
                ) {
                    var listeners, events, i;
                    events = this._events;
                    if (events === undefined) return this; // not listening for removeListener, no need to emit

                    if (events.removeListener === undefined) {
                        if (arguments.length === 0) {
                            this._events = Object.create(null);
                            this._eventsCount = 0;
                        } else if (events[type] !== undefined) {
                            if (--this._eventsCount === 0)
                                this._events = Object.create(null);
                            else delete events[type];
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
                    if (typeof evlistener === 'function')
                        return unwrap
                            ? [evlistener.listener || evlistener]
                            : [evlistener];
                    return unwrap
                        ? unwrapListeners(evlistener)
                        : arrayClone(evlistener, evlistener.length);
                }

                EventEmitter.prototype.listeners = function listeners(type) {
                    return _listeners(this, type, true);
                };

                EventEmitter.prototype.rawListeners = function rawListeners(
                    type
                ) {
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
                    return this._eventsCount > 0
                        ? ReflectOwnKeys(this._events)
                        : [];
                };

                function arrayClone(arr, n) {
                    var copy = new Array(n);

                    for (var i = 0; i < n; ++i) copy[i] = arr[i];

                    return copy;
                }

                function spliceOne(list, index) {
                    for (; index + 1 < list.length; index++)
                        list[index] = list[index + 1];

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

                /***/
            },

            /***/ 501: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/common/ParserData.js
                 * @description Cодержит прототипы исполняемых данных.
                 * @author Astecom
                 */

                const { OPERATOR } = __webpack_require__(351);
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
                    /**
                     * Синхронизирует группы выражений с оснновной группой
                     *
                     * @method
                     *
                     * @returns {Operand}
                     */

                    __sync(reject) {
                        return this;
                    }

                    /**
                     * Возвращет список исполняемых блоков, если такие есть.
                     *
                     * @method
                     * @returns {Array<iStatement>} список исполняемых блоков, если такие есть.
                     */
                    __executable() {
                        return new Array();
                    }
                }
                /**
                 * @lends Operator
                 * @class
                 */

                class Operator extends ParserData {
                    /**
                     * @param {Token} data вхождение лексера описывающее текущий оператор
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

                /***/
            },

            /***/ 580: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/common/PoonyaOutputStream.js
                 * @description Cодержит поток вывода данных poonya
                 * @author Astecom
                 */

                const { iPoonyaOutputStream } = __webpack_require__(161);
                /**
                 * @lends PoonyaOutputStream
                 * @class
                 */

                class PoonyaOutputStream extends iPoonyaOutputStream {
                    /**
                     * Класс вывода шаблонов, за счет этого интерфейса производится
                     * Template output class, due to this interface is created
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
                     * Преобразует поток в ReadableStream или в Stream.Writable для nodejs
                     * Converts stream to ReadableStream or Stream.Writable for nodejs
                     *
                     * @returns {ReadableStream|Stream.Writable} a read stream if it's a browser, or a write stream if it's nodejs
                     *                                           поток чтения, если это браузер, или поток записи если это nodejs
                     * @method
                     * @public
                     */

                    toReadable() {
                        const _ = this;
                        /*LIQUID*/

                        return new ReadableStream({
                            start(controller) {
                                _.on(
                                    'data',
                                    controller.enqueue.bind(controller)
                                );

                                _.on('end', controller.close.bind(controller));
                            },
                        });
                        /*LIQUID-END*/
                    }
                    /**
                     * Redirects the data stream to `stream` passed as the first argument
                     * Перенаправляет поток данных в `stream` переданный первым аргументом
                     *
                     * @param {PoonyaOutputStream|Stream} stream поток которому необходимо передавать данные помимо этого
                     *                                           the stream to which you need to transfer data in addition to this
                     * @returns `stream` Поток который был передан.
                     * @returns `stream` The stream that was sent.
                     * @method
                     * @public
                     */

                    pipe(stream) {
                        if (typeof stream.write === 'function') {
                            this.on('data', stream.write.bind(stream));
                            return stream;
                        } else {
                            throw new TypeError('Is not a WriteStream');
                        }
                    }
                    /**
                     * Выводит данные
                     * Outputs data
                     *
                     * @param {Any} data данные которые необходимо вывести
                     *                   data to be displayed
                     * @method
                     * @public
                     */

                    write(data) {
                        this._data.push(data);

                        this.emit('data', data);
                    }

                    error(error) {
                        this._data.push(error);

                        this.emit('error', error);
                    }

                    end() {
                        this._ended = true;
                        this.emit('end');
                    }
                    /**
                     * Ожидает завершения записи потока, после чего возвращает массив с буффером данных
                     * Waits for the stream to finish writing, then returns an array with a data buffer
                     *
                     * @async
                     * @public
                     * @method
                     * @returns {Array<Any>} массив с переданными данными
                     *                       array with passed data
                     */

                    complete() {
                        if (!this._ended)
                            return new Promise((res, rej) => {
                                this.on('end', () => res(this._data));
                                this.on('error', (error) => rej(error));
                            });
                        else return this._data;
                    }
                }

                module.exports = PoonyaOutputStream;

                /***/
            },

            /***/ 329: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/data/NativeFunction.js
                 * @description Содержит в себе объект нативной функции, которая так-же вызывается при вызове функции
                 * @author Astecom
                 */

                const { Operand } = __webpack_require__(501),
                    { SERVICE } = __webpack_require__(351),
                    { NativeFunctionExecutionError } = __webpack_require__(943),
                    {
                        iPoonyaObject,
                        iPoonyaPrototype,
                        iCodeEmitter,
                    } = __webpack_require__(161);
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
                     * @param {Function} reject Метод выбрасывания ошибок
                     * @param {Number} call_pos Позиция из которой происходит вызов
                     *
                     * @returns {Any} в зависимости от результата выполнения нативной функции
                     */

                    result(
                        thisArg = null,
                        args,
                        context,
                        out,
                        call_pos,
                        reject,
                        resolve
                    ) {
                        let _ = this,
                            args_f = new Array(),
                            resolve_r = true,
                            argc = args.length,
                            i = 0;

                        function c_resolve(data) {
                            if (resolve_r) resolve_r = false;
                            else return;

                            switch (typeof data) {
                                case 'bigint':
                                    context.createObject(
                                        data,
                                        -1,
                                        SERVICE.CONSTRUCTORS.INTEGER,
                                        null,
                                        new Array(),
                                        resolve
                                    );
                                    break;

                                case 'number':
                                    context.createObject(
                                        data,
                                        -1,
                                        SERVICE.CONSTRUCTORS.NUMBER,
                                        null,
                                        new Array(),
                                        resolve
                                    );
                                    break;

                                case 'string':
                                    context.createObject(
                                        data,
                                        -1,
                                        SERVICE.CONSTRUCTORS.STRING,
                                        null,
                                        new Array(),
                                        resolve
                                    );
                                    break;

                                case 'symbol':
                                    context.createObject(
                                        Symbol.keyFor(data),
                                        -1,
                                        SERVICE.CONSTRUCTORS.STRING,
                                        null,
                                        new Array(),
                                        resolve
                                    );
                                    break;

                                case 'boolean':
                                    context.createObject(
                                        data,
                                        -1,
                                        SERVICE.CONSTRUCTORS.BOOLEAN,
                                        null,
                                        new Array(),
                                        resolve
                                    );
                                    break;

                                case 'undefined':
                                    context.createObject(
                                        data,
                                        -1,
                                        SERVICE.CONSTRUCTORS.NULL,
                                        null,
                                        new Array(),
                                        resolve
                                    );
                                    break;

                                case 'object':
                                    switch (true) {
                                        case data === null:
                                            context.createObject(
                                                data,
                                                -1,
                                                SERVICE.CONSTRUCTORS.NULL,
                                                null,
                                                new Array(),
                                                resolve
                                            );
                                            break;

                                        case data instanceof iCodeEmitter:
                                            context.createObject(
                                                data,
                                                -1,
                                                SERVICE.CONSTRUCTORS.PATTERN,
                                                null,
                                                new Array(),
                                                resolve
                                            );
                                            break;

                                        case data instanceof iPoonyaPrototype ||
                                            data instanceof iPoonyaObject ||
                                            data instanceof Operand:
                                            resolve(data);
                                            break;

                                        default:
                                            if (Array.isArray(data))
                                                context.createObject(
                                                    data,
                                                    -1,
                                                    SERVICE.CONSTRUCTORS.ARRAY,
                                                    null,
                                                    new Array(),
                                                    resolve
                                                );
                                            else
                                                context.createObject(
                                                    data,
                                                    -1,
                                                    SERVICE.CONSTRUCTORS.OBJECT,
                                                    null,
                                                    new Array(),
                                                    resolve
                                                );
                                    }

                                    break;

                                case 'function':
                                    resolve(new NativeFunction(data));
                                    break;
                            }
                        }

                        function start() {
                            let data;

                            try {
                                data = _.target.call(
                                    thisArg,
                                    {
                                        args,
                                        context,
                                        reject,
                                        resolve: c_resolve,
                                        position: call_pos,
                                    },
                                    ...args_f
                                );
                            } catch (err) {
                                reject(
                                    call_pos,
                                    new NativeFunctionExecutionError(
                                        _.target.name,
                                        err instanceof Error
                                            ? err.stack
                                            : new Error().stack
                                    )
                                );
                            }

                            if (data instanceof Promise) {
                                data.catch((err) =>
                                    reject(
                                        call_pos,
                                        new NativeFunctionExecutionError(
                                            _.target.name,
                                            err instanceof Error
                                                ? err.stack
                                                : new Error().stack
                                        )
                                    )
                                ).then(c_resolve);
                            } else if (data !== undefined) {
                                c_resolve(data);
                            }
                        }

                        if (argc != 0) {
                            (function next() {
                                if (args[i] instanceof Operand) {
                                    args[i].result(
                                        context,
                                        out,
                                        reject,
                                        (p_result) => {
                                            p_result.result(
                                                context,
                                                out,
                                                reject,
                                                (d_result) => {
                                                    args_f[i] = d_result;

                                                    if (++i >= argc) {
                                                        start();
                                                    } else {
                                                        next();
                                                    }
                                                }
                                            );
                                        }
                                    );
                                } else {
                                    args_f[i] = args[i];

                                    if (++i >= argc) {
                                        start();
                                    } else {
                                        next();
                                    }
                                }
                            })();
                        } else {
                            start();
                        }
                    }
                }

                module.exports = NativeFunction;

                /***/
            },

            /***/ 36: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/data/PoonyaArray.js
                 * @description Cодержит класс массива Poonya
                 * @author Astecom
                 */

                const { FIELDFLAGS } = __webpack_require__(351),
                    PoonyaObject = __webpack_require__(753),
                    NativeFunction = __webpack_require__(329);
                /**
                 * @lends PoonyaArray
                 * @class
                 */

                class PoonyaArray extends PoonyaObject {
                    /**
                     * Дескриптор массива в poonya
                     *
                     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
                     * @param {Boolean} init - Данные для инициализации объекта.
                     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
                     * @param {Function} reject - Функция для выброса исключения.
                     *
                     * @memberof Poonya.Data
                     * @constructs PoonyaArray
                     * @extends PoonyaObject
                     * @public
                     */
                    constructor(prototype = null, init, context, reject) {
                        const computed = new Object();

                        if (init) {
                            if (Array.isArray(init)) {
                                for (
                                    let i = 0, leng = init.length;
                                    i < leng;
                                    i++
                                ) {
                                    computed[i] = init[key];
                                }
                            } else {
                                for (let key in init) {
                                    switch (typeof key) {
                                        case 'string':
                                            computed[parseInt(key)] = init[key];
                                            break;

                                        case 'number':
                                            computed[key] = init[key];
                                            break;
                                    }
                                }
                            }
                        }

                        super(prototype, computed, context, reject);
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
                        this.set(
                            context,
                            this.fields.size,
                            data,
                            parents_three
                        );
                    }
                    /**
                     * Сериализует массив в javascript массив
                     *
                     * @override
                     * @method
                     * @public
                     */

                    result(context, out, reject, resolve) {
                        let output = new Array(this.fields.size),
                            data;

                        for (let [key, value] of this.fields) {
                            data = this.field_attrs.get(key);
                            if (
                                data == null ||
                                (data & FIELDFLAGS.NOOUTPUT) === 0
                            )
                                if (value instanceof NativeFunction)
                                    output[key] =
                                        value != null ? value.target : null;
                                else if (value != null)
                                    value.result(
                                        context,
                                        out,
                                        reject,
                                        (result) => (output[key] = result)
                                    );
                        }

                        resolve(output);
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

                /***/
            },

            /***/ 839: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/data/PoonyaBoolean.js
                 * @description Cодержит класс булевого значения Poonya
                 * @author Astecom
                 */

                const PoonyaObject = __webpack_require__(753);
                /**
                 * @lends PoonyaBoolean
                 * @class
                 */

                class PoonyaBoolean extends PoonyaObject {
                    /**
                     * Дескриптор массива в poonya
                     *
                     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
                     * @param {Boolean} init - Данные для инициализации объекта.
                     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
                     * @param {Function} reject - Функция для выброса исключения.
                     *
                     * @memberof Poonya.Data
                     * @constructs PoonyaBoolean
                     * @extends PoonyaObject
                     * @public
                     */
                    constructor(prototype = null, init, context, reject) {
                        super(prototype, init, context, reject);
                        this.data =
                            typeof init == 'boolean'
                                ? init
                                : init == 'true'
                                ? true
                                : init == 'false'
                                ? false
                                : true;
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

                    result(context, out, reject, resolve) {
                        resolve(this.data);
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

                /***/
            },

            /***/ 550: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/data/PoonyaInteger.js
                 * @description Cодержит класс целого числа Poonya
                 * @author Astecom
                 */

                const PoonyaObject = __webpack_require__(753);
                /**
                 * @lends PoonyaInteger
                 * @class
                 */

                class PoonyaInteger extends PoonyaObject {
                    /**
                     * Дескриптор массива в poonya
                     *
                     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
                     * @param {BigInt} init - Данные для инициализации объекта.
                     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
                     * @param {Function} reject - Функция для выброса исключения.
                     *
                     * @memberof Poonya.Data
                     * @constructs PoonyaInteger
                     * @extends PoonyaObject
                     * @public
                     */
                    constructor(prototype = null, init, context, reject) {
                        super(prototype, init, context, reject);
                        this.data = BigInt(init);
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

                    result(context, out, reject, resolve) {
                        resolve(this.data);
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

                /***/
            },

            /***/ 679: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/data/PoonyaNull.js
                 * @description Cодержит класс null объекта Poonya
                 * @author Astecom
                 */

                const PoonyaObject = __webpack_require__(753);
                /**
                 * @lends PoonyaNull
                 * @class
                 */

                class PoonyaNull extends PoonyaObject {
                    /**
                     * Дескриптор массива в poonya
                     *
                     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
                     * @param {null} init - Данные для инициализации объекта.
                     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
                     * @param {Function} reject - Функция для выброса исключения.
                     *
                     * @memberof Poonya.Data
                     * @constructs PoonyaNull
                     * @extends PoonyaObject
                     * @public
                     */
                    constructor(prototype = null, init, context, reject) {
                        super(prototype, null, context, reject);
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

                    append() {}
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

                    result(context, out, reject, resolve) {
                        resolve(null);
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

                /***/
            },

            /***/ 220: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/data/PoonyaNumber.js
                 * @description Cодержит класс числа Poonya
                 * @author Astecom
                 */

                const PoonyaObject = __webpack_require__(753);
                /**
                 * @lends PoonyaNumber
                 * @class
                 */

                class PoonyaNumber extends PoonyaObject {
                    /**
                     * Дескриптор массива в poonya
                     *
                     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
                     * @param {Number} init - Данные для инициализации объекта.
                     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
                     * @param {Function} reject - Функция для выброса исключения.
                     *
                     * @memberof Poonya.Data
                     * @constructs PoonyaNumber
                     * @extends PoonyaObject
                     * @public
                     */
                    constructor(prototype = null, init, context, reject) {
                        super(prototype, init, context, reject);
                        this.data = parseFloat(init);
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

                    result(context, out, reject, resolve) {
                        resolve(this.data);
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

                /***/
            },

            /***/ 753: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/data/PoonyaObject.js
                 * @description Cодержит класс объекта Poonya
                 * @author Astecom
                 */

                const {
                        BadKeyInvalidTypeException,
                        BadKeyProtectedFieldException,
                    } = __webpack_require__(943),
                    {
                        SUPER_CALL,
                        GET,
                        FIELDFLAGS,
                        CONFIG,
                    } = __webpack_require__(351),
                    { Cast } = __webpack_require__(88),
                    { iPoonyaObject, iPoonyaPrototype } = __webpack_require__(
                        161
                    ),
                    NativeFunction = __webpack_require__(329);
                /**
                 * @lends PoonyaObject
                 * @class
                 */

                class PoonyaObject extends iPoonyaObject {
                    /**
                     * Дескриптор объекта в poonya
                     *
                     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
                     * @param {Object} init - Данные для инициализации объекта.
                     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
                     * @param {Function} reject - Функция для выброса исключения.
                     *
                     * @memberof Poonya.Data
                     *
                     * @constructs PoonyaObject
                     * @public
                     */
                    constructor(prototype, init, context, reject) {
                        super();
                        this.fields = new Map();
                        this.field_attrs = new Map();
                        this.raw = false;

                        if (prototype instanceof iPoonyaPrototype) {
                            prototype[SUPER_CALL](this, init);
                            this.prototype = prototype;
                        }

                        if (typeof init == 'object' && init != null)
                            this.append(context, init);
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
                        obj.raw = this.raw;
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
                        return (
                            this.fields.delete(key) &&
                            this.field_attrs.delete(key)
                        );
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
                            this.field_attrs.set(
                                key,
                                current | FIELDFLAGS.CONSTANT
                            );
                        } else {
                            throw new Error(
                                'Cannot find filed ' +
                                    key +
                                    ' in ' +
                                    this.prototype.name +
                                    '.Object'
                            );
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
                            this.field_attrs.set(
                                key,
                                current | FIELDFLAGS.NOOUTPUT
                            );
                        } else {
                            throw new Error(
                                'Cannot find filed ' +
                                    key +
                                    ' in ' +
                                    this.prototype.name +
                                    '.Object'
                            );
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
                        if (typeof data === 'object') {
                            if (Array.isArray(data)) {
                                for (
                                    let i = 0, leng = data.length;
                                    i < leng;
                                    i++
                                )
                                    this.set(context, i, data[i], data);
                            } else {
                                if (data instanceof PoonyaObject) {
                                    for (let entry of data.fields) {
                                        this.set(context, entry[0], entry[1]);
                                    }
                                } else {
                                    for (let key in data)
                                        this.set(context, key, data[key]);
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
                        if (typeof key !== 'string' && typeof key !== 'number')
                            throw new BadKeyInvalidTypeException();
                        const attrs = this.field_attrs.get(key);
                        if (
                            attrs != null &&
                            (attrs & FIELDFLAGS.CONSTANT) === 0
                        )
                            throw new BadKeyProtectedFieldException();

                        try {
                            Cast(
                                data,
                                context,
                                parents_three,
                                this.fields.set.bind(this.fields, key)
                            );
                        } catch (e) {
                            if (CONFIG.DEBUG) console.error(e);
                            throw new Error('Error when cast value of ' + key);
                        }
                    }
                    /**
                     * Возвращает строковой эквивалент объекта
                     *
                     * @param {iContext} context текущий контекст
                     * @param {Array<String>} out Выходной массив
                     * @param {Function} reject Функция вызывающаяся при ошибках
                     *
                     * @returns {String}
                     */

                    toString(context, out, reject) {
                        let toString = this.fields.get('toString');

                        if (toString != null) {
                            return toString.result(context, out, reject);
                        } else {
                            return `[Object${this.prototype.name}]`;
                        }
                    }
                    /**
                     * ДеСериализует значени объекта в javascript объект
                     *
                     * @param {?iContext} context текущий контекст
                     * @param {?Array<String>} out Выходной массив
                     * @param {?Function} reject Функция вызывающаяся при ошибках
                     * @method
                     * @public
                     */

                    result(context, out, reject, resolve) {
                        let output = new Object(),
                            data;

                        for (let [key, value] of this.fields) {
                            data = this.field_attrs.get(key);
                            if (
                                data == null ||
                                (data & FIELDFLAGS.NOOUTPUT) === 0
                            )
                                if (value instanceof NativeFunction)
                                    output[key] =
                                        value != null ? value.target : null;
                                ///
                                /// Поскольку асинхронными, в poonya, могут быть только нативные функции, то значения оберторк можно получить синхрнно
                                ///
                                else if (value != null)
                                    value.result(
                                        context,
                                        out,
                                        reject,
                                        (result) => (output[key] = result)
                                    );
                        }

                        resolve(output);
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

                /***/
            },

            /***/ 360: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/data/PoonyaPattern.js
                 * @description Cодержит класс строки Poonya
                 * @author Astecom
                 */

                const { Cast } = __webpack_require__(88);

                const { iCodeEmitter } = __webpack_require__(161);

                const PoonyaObject = __webpack_require__(753);
                /**
                 * @lends PoonyaPattern
                 * @class
                 */

                class PoonyaPattern extends PoonyaObject {
                    /**
                     * Дескриптор объекта строки в poonya
                     *
                     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
                     * @param {iCodeEmitter} init - Данные для инициализации объекта.
                     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
                     * @param {Function} reject - Функция для выброса исключения.
                     *
                     * @memberof Poonya.Data
                     * @constructs PoonyaPattern
                     * @extends PoonyaObject
                     * @public
                     */
                    constructor(prototype = null, init, context, reject) {
                        super(prototype, init, context, reject);
                        this.data = init;
                    }
                    /**
                     * Возвращает копию этого объекта
                     *
                     * @returns {PoonyaPattern} клонированый объект
                     */

                    clone() {
                        return new PoonyaPattern(this.prototype, this.data);
                    }
                    /**
                     * Нельзя получить данные из шаблона по индексу
                     *
                     * @method
                     * @override
                     */

                    get() {
                        return null;
                    }
                    /**
                     * Устанавливать значения шаблону нельзя
                     *
                     * @override
                     * @method
                     * @public
                     */

                    set() {}
                    /**
                     * Удалять значения шаблону нельзя
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

                    result(context, out, reject, resolve) {
                        const result = this.data.result();
                        if (result instanceof Promise)
                            result.then((d_result) =>
                                Cast(d_result, context, [], resolve)
                            );
                        else
                            result
                                .complete()
                                .then((d_result) =>
                                    Cast(d_result, context, [], resolve)
                                );
                    }
                    /**
                     * Сериализует строку в javascript строку
                     *
                     * @override
                     * @method
                     * @public
                     */

                    toRawData() {
                        return '[Object:Pattern]';
                    }
                }

                module.exports = PoonyaPattern;

                /***/
            },

            /***/ 326: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/data/PoonyaPrototype.js
                 * @description Cодержит объект прототипа объекта Poonya
                 * @author Astecom
                 */

                const { IS, GET, FIELDFLAGS, SUPER_CALL } = __webpack_require__(
                        351
                    ),
                    { iPoonyaPrototype } = __webpack_require__(161),
                    { Cast } = __webpack_require__(88);
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
                        if (
                            parents.find(
                                (e) => !(e instanceof iPoonyaPrototype)
                            ) != null
                        )
                            throw new Error(
                                'Only descendants of iPoonyaPrototype should be specified as parents of the target class'
                            );

                        if (typeof name === 'string' || name == null) {
                            this.name = name != null ? name : 'Object';
                        } else {
                            throw new Error(
                                'Only string value can be passed as name'
                            );
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
                        const obj = new PoonyaPrototype(
                            this._parents,
                            this.name
                        );
                        obj._fields = new Map(this._fields);
                        obj._fields_data = new Map(this._fields_data);
                        return obj;
                    }
                    /**
                     * Добавляет родительский прототип целевому
                     *
                     * @param {iPoonyaPrototype} parent прототип объекта
                     * @method
                     * @public
                     */

                    expand(parent) {
                        if (parent instanceof iPoonyaPrototype)
                            this._parents.push(parent);
                        else
                            throw new TypeError(
                                'Parent must be an iPoonyaPrototype instance.'
                            );
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
                        Cast(
                            data,
                            context,
                            [],
                            this._fields.set.bind(this._fields, field)
                        );

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
                        if (key === this.name) return true;
                        else
                            for (
                                let i = 0, leng = this._parents;
                                i < leng;
                                i++
                            ) {
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
                            if (
                                !static_assces ||
                                (this._fields_data.get(key) &
                                    FIELDFLAGS.STATIC) !==
                                    0
                            )
                                return data;
                            else return null;
                        } else {
                            for (
                                let i = 0, leng = this._parents.length;
                                i < leng;
                                i++
                            ) {
                                if (
                                    (data = this._parents[i][GET](
                                        key,
                                        context,
                                        static_assces
                                    )) != null
                                ) {
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
                     * @param {Map} data данные для инициализауии объекта
                     *
                     * @method
                     * @protected
                     */

                    [SUPER_CALL](child, data) {
                        //
                        // Копирую свойства полей
                        //
                        for (let [key, value] of this._fields_data)
                            child.field_attrs.set(key, value); //
                        // Получаю конструктор этого прототипа
                        //

                        const constructor = [
                            ...this._fields_data.entries(),
                        ].find((e) => e === FIELDFLAGS.CONSTRUCTOR); //
                        // Если нашел, вызываю его
                        //

                        if (
                            constructor != null &&
                            typeof this._fields.get(constructor[0]) ==
                                'function'
                        )
                            this._fields.get(constructor[0]).call(child, data); //
                        // Вызываем конструкторы родительских прототипов
                        //

                        for (
                            let i = 0, leng = this._parents.length;
                            i < leng;
                            i++
                        )
                            this._parents[i][SUPER_CALL](child, data);
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

                /***/
            },

            /***/ 809: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/data/PoonyaString.js
                 * @description Cодержит класс строки Poonya
                 * @author Astecom
                 */

                const PoonyaObject = __webpack_require__(753);
                /**
                 * @lends PoonyaString
                 * @class
                 */

                class PoonyaString extends PoonyaObject {
                    /**
                     * Дескриптор объекта строки в poonya
                     *
                     * @param {iPoonyaPrototype} prototype - Прототип объекта, если необходимо.
                     * @param {String} init - Данные для инициализации объекта.
                     * @param {iContext} context - Контекст, который будет использоваться для кастинга значения при передачи их в память.
                     * @param {Function} reject - Функция для выброса исключения.
                     *
                     * @memberof Poonya.Data
                     * @constructs PoonyaString
                     * @extends PoonyaObject
                     * @public
                     */
                    constructor(prototype = null, init, context, reject) {
                        super(prototype, init, context, reject);
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

                    result(context, out, reject, resolve) {
                        resolve(this.data);
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

                /***/
            },

            /***/ 515: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/expression/ExpressionGroup.js
                 * @description Cодержит группу выражений, которая выполняется при выполнении выражения
                 * @author Astecom
                 */

                const { Operand, Operator } = __webpack_require__(501),
                    { CHARTYPE, OPERATOR, SERVICE } = __webpack_require__(351),
                    {
                        UnableToRecognizeTypeException,
                        TheSequenceException,
                    } = __webpack_require__(943),
                    { Cast, Tick } = __webpack_require__(88),
                    ObjectContructorCall = __webpack_require__(657),
                    Token = __webpack_require__(359);
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
                        this.data =
                            initial != null ? [...initial] : new Array();
                        this.position = position;
                        this.validated = false;
                    }
                    /**
                     * Синхронизирует значение группы с родительской группой
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @override
                     * @method
                     * @returns {ExpressionGroup}
                     */

                    __sync(reject) {
                        for (const elem of this.data) {
                            if (elem instanceof Operand) {
                                elem.__sync(reject);
                            }
                        }

                        return this;
                    }
                    /**
                     * Если выражение завершено, то врнет true, иначе же вернет false
                     *
                     * @returns {Boolean} Завершено ли выражение
                     * @public
                     * @method
                     */

                    isNotDone() {
                        return (
                            this.data[this.data.length - 1] instanceof Operator
                        );
                    }
                    /**
                     * Сериализует текущее выражение как строку
                     *
                     * @returns {String} Строковое представление выражения
                     * @public
                     * @method
                     */

                    toString(indent) {
                        return this.data
                            .map((e) => e.toString(indent))
                            .join(' ');
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
                                    parseFloat(entry.data.toString()),
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
                                if (
                                    entry instanceof Operator ||
                                    entry instanceof Operand
                                )
                                    current = entry;
                                else
                                    reject(
                                        entry.position,
                                        new UnableToRecognizeTypeException(
                                            entry.type
                                        )
                                    );
                                break;
                        }

                        if (this.data.length !== 0) {
                            if (
                                current instanceof Operator &&
                                this.data[this.data.length - 1] instanceof
                                    Operator
                            )
                                reject(
                                    entry.position,
                                    new TheSequenceException(
                                        current,
                                        this.data[this.data.length - 1]
                                    )
                                );
                            //
                            // 4 4 => 4 + 4
                            // 'Hello' ' ' 'World' => 'Hello world'
                            //
                            else if (
                                current instanceof Operand &&
                                this.data[this.data.length - 1] instanceof
                                    Operand
                            )
                                this.data.push(
                                    new Operator(
                                        new Token(
                                            CHARTYPE.OPERATOR,
                                            [0x0, 0x2b],
                                            -1
                                        )
                                    )
                                );
                        } else if (current instanceof Operator)
                            reject(
                                entry.position,
                                new TheSequenceException(
                                    current,
                                    '[ExpressionStart]'
                                )
                            );

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
                            this.data.filter(
                                (e) =>
                                    e.op_p === OPERATOR.MULT ||
                                    e.op_p === OPERATOR.DIVIDE
                            ).length > 0
                        ) {
                            let mltexp = false,
                                dump = Array.from(this.data),
                                stack = null;
                            this.data.splice(0, this.data.length);

                            for (let i = 0, leng = dump.length; i < leng; i++) {
                                if (
                                    dump[i + 1] &&
                                    dump[i + 1].type === 'operator'
                                )
                                    switch (dump[i + 1].op_p) {
                                        case OPERATOR.MULT:
                                        case OPERATOR.DIVIDE:
                                            if (mltexp) break;
                                            mltexp = true;
                                            stack = new ExpressionGroup(
                                                dump[i + 1].position
                                            );
                                            this.append(stack, reject);
                                            break;

                                        case OPERATOR.PLUS:
                                        case OPERATOR.MINUS:
                                        case OPERATOR.EQUAL:
                                        case OPERATOR.LARGER:
                                        case OPERATOR.LESS:
                                        case OPERATOR.ELARGER:
                                        case OPERATOR.ELESS:
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
                        } // Stage 2 => a & b => (a) & (b)

                        if (
                            this.data.filter((e) => e.op_p === OPERATOR.AND)
                                .length > 0
                        ) {
                            let dump = Array.from(this.data),
                                stack = new ExpressionGroup(dump[0].position);
                            this.data.splice(0, this.data.length);

                            for (let i = 0, leng = dump.length; i < leng; i++) {
                                if (
                                    dump[i] &&
                                    dump[i].type === 'operator' &&
                                    dump[i].op_p === OPERATOR.AND
                                ) {
                                    stack.complete();
                                    this.append(stack, reject);
                                    this.append(dump[i], reject);
                                    stack = new ExpressionGroup(
                                        dump[i].position
                                    );
                                    continue;
                                }

                                stack.append(dump[i], reject);
                            }

                            stack.complete();
                            this.append(stack, reject);
                        } // Stage 3 => a | b => (a) | (b)

                        if (
                            this.data.filter((e) => e.op_p === OPERATOR.OR)
                                .length > 0
                        ) {
                            let dump = Array.from(this.data),
                                stack = new ExpressionGroup(dump[0].position);
                            this.data.splice(0, this.data.length);

                            for (let i = 0, leng = dump.length; i < leng; i++) {
                                if (
                                    dump[i] &&
                                    dump[i].type === 'operator' &&
                                    dump[i].op_p === OPERATOR.OR
                                ) {
                                    stack.complete();
                                    this.append(stack, reject);
                                    this.append(dump[i], reject);
                                    stack = new ExpressionGroup(
                                        dump[i].position
                                    );
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
                        let _ = this,
                            i = 1,
                            leng = _.data.length,
                            result = null;

                        function tick() {
                            // Получем прромежуточное значение
                            _.data[i + 1].result(
                                context,
                                out,
                                reject,
                                (cur) => {
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

                                            if (!result) {
                                                Cast(
                                                    result,
                                                    context,
                                                    [],
                                                    resolve
                                                );
                                                return;
                                            }

                                            break;

                                        case _.data[i].equals(OPERATOR.OR):
                                            result = result || cur.toRawData();

                                            if (result) {
                                                Cast(
                                                    result,
                                                    context,
                                                    [],
                                                    resolve
                                                );
                                                return;
                                            }

                                            break;
                                    }

                                    if ((i += 2) >= leng) {
                                        Cast(result, context, [], resolve);
                                    } else {
                                        Tick(tick);
                                    }
                                }
                            );
                        }

                        _.data[0].result(context, out, reject, (p_result) => {
                            p_result.result(
                                context,
                                out,
                                reject,
                                (d_result) => {
                                    result = d_result;
                                    if (_.data.length > 1) tick();
                                    else Cast(result, context, [], resolve);
                                }
                            );
                        });
                    }
                }

                module.exports = ExpressionGroup;

                /***/
            },

            /***/ 79: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/expression/FunctionCall.js
                 * @description Содержит в себе вхождение вызовва функции
                 * @author Astecom
                 */

                const { Operand } = __webpack_require__(501),
                    {
                        UnableToCreateAnObjectException,
                        FieldNotAFunctionException,
                    } = __webpack_require__(943),
                    { iPoonyaPrototype } = __webpack_require__(161),
                    NativeFunction = __webpack_require__(329);
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
                     * Синхронизирует значение группы с родительской группой
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @override
                     * @method
                     * @returns {FunctionCall}
                     */

                    __sync(reject) {
                        for (const elem of this.query_stack.concat(this.args)) {
                            if (elem instanceof Operand) {
                                elem.__sync(reject);
                            }
                        }

                        return this;
                    }
                    /**
                     * Получает переменную заданную литералами
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve Вызывается при завершении вызова функции
                     *
                     * @returns {Any} В зависимости от возвращаемых функцией значения
                     * @throws {ParserException}
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        context.getByPath(
                            this.query_stack,
                            this.position,
                            null,
                            reject,
                            true,
                            (result) => {
                                if (result.instance instanceof NativeFunction)
                                    result.instance.result(
                                        result.parent,
                                        this.args,
                                        context,
                                        out,
                                        this.position,
                                        reject,
                                        resolve
                                    );
                                else if (
                                    result.instance instanceof iPoonyaPrototype
                                )
                                    reject(
                                        this.position,
                                        new UnableToCreateAnObjectException()
                                    );
                                else {
                                    reject(
                                        this.position,
                                        new FieldNotAFunctionException(
                                            this.query_stack[
                                                this.query_stack.length - 1
                                            ]
                                        )
                                    );
                                }
                            }
                        );
                    }
                    /**
                     * Сериализует текущий объект в строку
                     *
                     * @returns {String} Строковое представление вызова функции
                     * @public
                     * @method
                     */

                    toString() {
                        return (
                            '(' +
                            this.query_stack.join(' => ') +
                            ') <== (' +
                            this.args.join(', ') +
                            ')'
                        );
                    }
                }

                module.exports = FunctionCall;

                /***/
            },

            /***/ 346: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/expression/GetOperator.js
                 * @description Содержит в себе оператор получения значения по индексам
                 * @author Astecom
                 */

                const { Operand } = __webpack_require__(501),
                    { SERVICE, FIELDFLAGS } = __webpack_require__(351),
                    NativeFunction = __webpack_require__(329);
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
                     * Синхронизирует значение группы с родительской группой
                     *
                     * @param {Function} функция выбрасывания исключений
                     *
                     * @override
                     * @method
                     * @returns {GetOperator}
                     */

                    __sync(reject) {
                        for (const elem of this.query_stack) {
                            if (elem instanceof Operand) {
                                elem.__sync(reject);
                            }
                        }

                        return this;
                    }
                    /**
                     * Получает переменную заданную литералами
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve Вызывается при успешном получении значения
                     *
                     * @returns {Any} В зависимости от типа запрашиваемых данных
                     * @throws {ParserException}
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        context.getByPath(
                            this.query_stack,
                            this.position,
                            null,
                            reject,
                            true,
                            (result) => {
                                if (result.instance != null) {
                                    if (
                                        result.instance instanceof
                                        NativeFunction
                                    ) {
                                        if (
                                            (result.flags &
                                                FIELDFLAGS.PROPERTY) !=
                                            0
                                        )
                                            return result.instance.result(
                                                result.parent,
                                                [],
                                                context,
                                                out,
                                                this.position,
                                                reject,
                                                resolve
                                            );
                                        else
                                            return context.createObject(
                                                `[NativeCode:${result.instance.name}]`,
                                                this.position,
                                                SERVICE.CONSTRUCTORS.STRING,
                                                reject,
                                                new Array(),
                                                resolve
                                            );
                                    } else resolve(result.instance);
                                } else
                                    context.createObject(
                                        null,
                                        this.position,
                                        SERVICE.CONSTRUCTORS.NULL,
                                        reject,
                                        new Array(),
                                        resolve
                                    );
                            }
                        );
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

                /***/
            },

            /***/ 281: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/expression/GroupOutStatement.js
                 * @description Содержит в себе оператор группового вывода {}
                 * @author Astecom
                 */

                const { Operand } = __webpack_require__(501),
                    { Tick, Cast } = __webpack_require__(88),
                    { iPoonyaPrototype } = __webpack_require__(161),
                    { FieldNotAFunctionException } = __webpack_require__(943),
                    PoonyaOutputStream = __webpack_require__(580),
                    NativeFunction = __webpack_require__(329);
                /**
                 * @lends GroupOutStatement
                 * @protected
                 */

                class GroupOutStatement extends Operand {
                    /**
                     * Литеральный блок группового вывода
                     *
                     * @param {SequenceGroup} body Основная исполняемая последовательность
                     * @param {Function} query_stack путь к функции форматтера (функция которая будет форматировать вывод)
                     * @param {Number} position позиция вызова
                     *
                     * @constructs GroupOutStatement
                     * @extends Operand
                     * @memberof Poonya.Expression
                     * @protected
                     */
                    constructor(body, query_stack, position) {
                        super('group-output');
                        this.query_stack =
                            query_stack != null ? [...query_stack] : null;
                        this.position = position;
                        this.body = body;
                        this.body.interrupted();
                    }
                    /**
                     * Синхронизирует значение группы с родительской группой
                     *
                     * @param {Function} функция выбрасывания исключений
                     *
                     * @override
                     * @method
                     * @returns {GroupOutStatement}
                     */

                    __sync(reject) {
                        if (this.query_stack != null) {
                            for (const elem of this.query_stack) {
                                if (elem instanceof Operand) {
                                    elem.__sync(reject);
                                }
                            }
                        }

                        this.body.__sync(reject);

                        return this;
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
                        return (
                            (this.query_stack
                                ? '(' + this.query_stack.join(' => ') + ') <- '
                                : '') + this.body.toString(indent)
                        );
                    }
                    /**
                     * Начинает вывод файл
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     *
                     * @throws {ParserException}
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        const _ = this,
                            stream_mask = new PoonyaOutputStream();

                        _.body.result(context, stream_mask, reject, () => {
                            if (_.query_stack == null) {
                                Tick(
                                    Cast.bind(
                                        null,
                                        stream_mask._data,
                                        context,
                                        [],
                                        resolve
                                    )
                                );
                            } else {
                                context.getByPath(
                                    _.query_stack,
                                    _.position,
                                    null,
                                    reject,
                                    true,
                                    (result) => {
                                        if (
                                            result.instance instanceof
                                            NativeFunction
                                        ) {
                                            result.instance.result(
                                                result.parent,
                                                stream_mask._data,
                                                context,
                                                out,
                                                _.position,
                                                reject,
                                                resolve
                                            );
                                        } else if (
                                            result.instance instanceof
                                            iPoonyaPrototype
                                        )
                                            reject(
                                                _.position,
                                                new UnableToCreateAnObjectException()
                                            );
                                        else {
                                            reject(
                                                _.position,
                                                new FieldNotAFunctionException(
                                                    _.query_stack[
                                                        _.query_stack.length - 1
                                                    ]
                                                )
                                            );
                                        }
                                    }
                                );
                            }
                        });
                    }
                }

                module.exports = GroupOutStatement;

                /***/
            },

            /***/ 657: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/expression/ObjectContructorCall.js
                 * @description Содержит в конструктор объекта который сериализуется как
                 *  Object ->
                 *      field -> value...
                 * @author Astecom
                 */

                const { Operand } = __webpack_require__(501),
                    { SERVICE } = __webpack_require__(351);
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
                        this.query_stack =
                            query_stack != null
                                ? query_stack
                                : SERVICE.CONSTRUCTORS.OBJECT;
                        this.initial = initial;
                        this.position = position;
                    }
                    /**
                     * Синхронизирует значение группы с родительской группой
                     *
                     * @param {Function} функция выбрасывания исключений
                     *
                     * @override
                     * @method
                     * @returns {ObjectContructorCall}
                     */

                    __sync(reject) {
                        for (const elem of this.query_stack) {
                            if (elem instanceof Operand) {
                                elem.__sync(reject);
                            }
                        }

                        return this;
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
                            return (
                                'new (' +
                                this.query_stack
                                    .map((e) =>
                                        typeof e !== 'string'
                                            ? `[${e.toString()}]`
                                            : e.toString()
                                    )
                                    .join(' => ') +
                                ') -> ' +
                                (items.length > 0
                                    ? '\n' +
                                      items
                                          .map((e, i) => {
                                              if (
                                                  e[1] instanceof
                                                  ObjectContructorCall
                                              )
                                                  return (
                                                      indent +
                                                      e[0] +
                                                      ' -> ' +
                                                      e[1].toString(
                                                          indent + '\t'
                                                      )
                                                  );
                                              else
                                                  return (
                                                      indent +
                                                      e[0] +
                                                      ' -> ' +
                                                      e[1].toString(
                                                          indent + '\t'
                                                      ) +
                                                      (i + 1 != items.length
                                                          ? ','
                                                          : '')
                                                  );
                                          })
                                          .join('\n')
                                    : '*')
                            );
                        } else {
                            return `(${
                                this.initial
                            }) <- (${this.query_stack
                                .map((e) =>
                                    typeof e !== 'string'
                                        ? `[${e.toString()}]`
                                        : e.toString()
                                )
                                .join(' => ')})`;
                        }
                    }
                    /**
                     * Коздает новый объект с инициированным значением `initial`
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve Вызывается при завершении создания объекта
                     *
                     * @throws {ParserException}
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        context.createObject(
                            this.initial,
                            this.position,
                            this.query_stack,
                            reject,
                            new Array(),
                            resolve
                        );
                    }
                }

                module.exports = ObjectContructorCall;

                /***/
            },

            /***/ 923: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/expression/TernarOperator.js
                 * @description Содержит в себе тернарный оператор, который сериализуется как <condition> ? <v1> : <v2>
                 * @author Astecom
                 */

                const { Operand } = __webpack_require__(501);
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
                     * Синхронизирует значение группы с родительской группой
                     *
                     * @param {Function} функция выбрасывания исключений
                     *
                     * @override
                     * @method
                     * @returns {TernarOperator}
                     */

                    __sync(reject) {
                        this.condition.__sync(reject);

                        this.v_o.__sync(reject);

                        this.v_t.__sync(reject);

                        return this;
                    }
                    /**
                     * Сериализует текущий объект в строку
                     *
                     * @returns {String} Строковое представление теранарного оператора
                     * @public
                     * @method
                     */

                    toString(indent) {
                        return (
                            '< ' +
                            this.condition.toString(indent + '\t') +
                            ' > ? ' +
                            this.v_o +
                            ' : ' +
                            this.v_t
                        );
                    }
                    /**
                     * Выполняет теранарный оператор
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve Вызывается при завершении выполнения тернарного выражения
                     *
                     * @throws {ParserException}
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        const _ = this;

                        _.condition.result(context, out, reject, (result) => {
                            if (context.toBooleanResult(result))
                                _.v_o.result(context, out, reject, resolve);
                            else _.v_t.result(context, out, reject, resolve);
                        });
                    }
                }

                module.exports = TernarOperator;

                /***/
            },

            /***/ 707: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                /**
                 * @file src/classes/excecution/statements/BreakStatement.js
                 * @description Содержит в себе оператор break, который используется для прерывания итераций массивов, и выхода из группового вывода
                 * @author Astecom
                 */
                const { Tick } = __webpack_require__(88),
                    { iStatement } = __webpack_require__(161);
                /**
                 * @lends BreakStatement
                 * @protected
                 */

                class BreakStatement extends iStatement {
                    /**
                     * Дескриптор оператора break
                     *
                     * @param {Number} position позиция оператора
                     *
                     * @constructs BreakStatement
                     * @memberof Poonya.Statements
                     * @protected
                     */
                    constructor(position) {
                        super();
                        this.position = position;
                    }
                    /**
                     * @see iStatement.__sync
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @method
                     * @returns {BreakStatement}
                     */

                    __sync(reject) {
                        return this;
                    }
                    /**
                     * @see iStatement.__executable
                     *
                     * @returns {Array<SequenceGroup>} список исполняемых блоков
                     * @method
                     */

                    __executable() {
                        return new Array();
                    }
                    /**
                     * Преобразовывет оператор break  в строку
                     *
                     * @returns {String} строкове представление оператора
                     */

                    toString() {
                        return 'break;';
                    }
                    /**
                     * Выполняет прерывание перебора
                     *
                     * @returns {BreakStatement}
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        Tick(resolve, this);
                    }
                }

                module.exports = BreakStatement;

                /***/
            },

            /***/ 914: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                /**
                 * @file src/classes/excecution/statements/ContinueStatement.js
                 * @description Содержит в себе оператор continue, который используется для перехода к следующей итерации
                 * @author Astecom
                 */
                const { iStatement } = __webpack_require__(161),
                    { Tick } = __webpack_require__(88);
                /**
                 * @lends ContinueStatement
                 * @protected
                 */

                class ContinueStatement extends iStatement {
                    /**
                     * Дескриптор оператора continue
                     *
                     * @param {Number} position позиция оператора
                     *
                     * @constructs ContinueStatement
                     * @memberof Poonya.Statements
                     * @protected
                     */
                    constructor(position) {
                        super();
                        this.position = position;
                    }
                    /**
                     * @see iStatement.__sync
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @method
                     * @returns {ContinueStatement}
                     */

                    __sync(reject) {
                        return this;
                    }
                    /**
                     * @see iStatement.__executable
                     *
                     * @returns {Array<SequenceGroup>} список исполняемых блоков
                     * @method
                     */

                    __executable() {
                        return new Array();
                    }
                    /**
                     * Преобразовывет оператор continue в строку
                     *
                     * @returns {String} строкове представление оператора
                     */

                    toString() {
                        return 'continue;';
                    }
                    /**
                     * Выполняет переход к следующей итерации цикла
                     *
                     * @returns {ContinueStatement}
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        Tick(resolve, this);
                    }
                }

                module.exports = ContinueStatement;

                /***/
            },

            /***/ 602: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/statements/IfStatement.js
                 * @description Содержит в себе оператор if, который используется для создания условных операций
                 * @author Astecom
                 */

                const { Tick } = __webpack_require__(88),
                    { iStatement } = __webpack_require__(161);
                /**
                 * @lends IfStatement
                 * @protected
                 */

                class IfStatement extends iStatement {
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
                        super();
                        this.condition = condition;
                        this.body_true = body_true;
                        this.body_false = body_false;
                    }
                    /**
                     * @see iStatement.__sync
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @method
                     *  @returns {IfStatement}
                     */

                    __sync(reject) {
                        this.condition.__sync(reject);

                        if (this.body_true) this.body_true.__sync(reject);
                        if (this.body_false) this.body_false.__sync(reject);
                        return this;
                    }
                    /**
                     * @see iStatement.__executable
                     *
                     * @returns {Array<SequenceGroup>} список исполняемых блоков
                     * @method
                     */

                    __executable() {
                        return [this.body_true, this.body_false].filter(
                            (e) => e != undefined
                        );
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
                        return (
                            'if (' +
                            this.condition.toString(indent) +
                            ') ' +
                            this.body_true.toString(indent) +
                            (this.body_false != null
                                ? ' else ' + this.body_false.toString(indent)
                                : '')
                        );
                    }
                    /**
                     * Выполняет проверку условия, и выполняет нужную группу в зависимости от результатов выполнения условия
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     *
                     * @throws {ParserException}
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        const _ = this;

                        _.condition.result(context, out, reject, (result) => {
                            if (context.toBooleanResult(result))
                                _.body_true.result(
                                    context,
                                    out,
                                    reject,
                                    resolve
                                );
                            else if (_.body_false != null)
                                _.body_false.result(
                                    context,
                                    out,
                                    reject,
                                    resolve
                                );
                            else Tick(resolve, null);
                        });
                    }
                }

                module.exports = IfStatement;

                /***/
            },

            /***/ 254: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/statements/OutStatement.js
                 * @description Содержит в себе оператор вывода, который используется для вывода информации из шаблона
                 * @author Astecom
                 */

                const { Tick } = __webpack_require__(88),
                    { iStatement } = __webpack_require__(161);
                /**
                 * @lends OutStatement
                 * @protected
                 */

                class OutStatement extends iStatement {
                    /**
                     * Оператор вывода который Сериализуется как > (...expression)
                     * Выводит данные из шаблона
                     *
                     * @constructs OutStatement
                     *
                     * @param {ExpressionGroup} expression выражение, результаты выполнения которого будем выводить
                     *
                     * @memberof Poonya.Statements
                     * @protected
                     */
                    constructor(expression) {
                        super();
                        this.expression = expression;
                        this.position = expression.position;
                    }
                    /**
                     * @see iStatement.__sync
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @method
                     * @returns {OutStatement}
                     */

                    __sync(reject) {
                        this.expression.__sync(reject);

                        return this;
                    }
                    /**
                     * @see iStatement.__executable
                     *
                     * @returns {Array<SequenceGroup>} список исполняемых блоков
                     * @method
                     */

                    __executable() {
                        return new Array();
                    }
                    /**
                     * Сериализует текущий объект в строку
                     *
                     * @returns {String} Строковое представление вывода выражения
                     * @public
                     * @method
                     */

                    toString(indent) {
                        return '> ' + this.expression.toString(indent);
                    }
                    /**
                     * Выполняет вывод информации из шаблона
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     *
                     * @throws {ParserException}
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        this.expression.result(
                            context,
                            out,
                            reject,
                            (p_result) => {
                                if (p_result != null)
                                    p_result.result(
                                        context,
                                        out,
                                        reject,
                                        (d_result) => {
                                            out.write(d_result);
                                            Tick(resolve, d_result);
                                        }
                                    );
                                else Tick(resolve, null);
                            }
                        );
                    }
                }

                module.exports = OutStatement;

                /***/
            },

            /***/ 505: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/statements/PushStatement.js
                 * @description Содержит в себе оператор вставки, который используется для обновления массива, путем вставки в его конец значения
                 * @author Astecom
                 * @license MIT
                 */

                const { Tick } = __webpack_require__(88),
                    {
                        TheFieldMustBeAnArrayInstanceExceprion,
                    } = __webpack_require__(943),
                    { iStatement } = __webpack_require__(161),
                    { Operand } = __webpack_require__(501),
                    PoonyaArray = __webpack_require__(36);
                /**
                 * @lends PushStatement
                 * @protected
                 */

                class PushStatement extends iStatement {
                    /**
                     * Объект который Сериализуется как var_name <- (expression...)
                     * Это опреатор для работы с массивами, и он заменяет свойство push
                     *
                     * @param {Number} position Позиция в начала оператора во входящих данных
                     * @param {String[]} query_stack Путь к полю которое поле получит
                     * @param {ExpressionGroup} value Данные которые нужно устновить
                     *
                     * @constructs PushStatement
                     * @memberof Poonya.Statements
                     * @protected
                     */
                    constructor(position, query_stack, value) {
                        super();
                        this.query_stack = query_stack;
                        this.position = position;
                        this.value = value;
                    }
                    /**
                     * @see iStatement.__sync
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @method
                     * @returns {PushStatement}
                     */

                    __sync(reject) {
                        this.value.__sync(reject);

                        for (const elem of this.query_stack) {
                            if (elem instanceof Operand) {
                                elem.__sync(reject);
                            }
                        }

                        return this;
                    }
                    /**
                     * @see iStatement.__executable
                     *
                     * @returns {Array<SequenceGroup>} список исполняемых блоков
                     * @method
                     */

                    __executable() {
                        return new Array();
                    }
                    /**
                     * Сериализует текущий объект в строку
                     *
                     * @returns {String} Строковое представление добавления элемента в массив (операция push)
                     * @public
                     * @method
                     */

                    toString(indent) {
                        return (
                            '(' +
                            this.query_stack
                                .map((e) =>
                                    typeof e === 'number' ? `[${e}]` : e
                                )
                                .join(' => ') +
                            ') <- ' +
                            this.value.toString(indent + '\t')
                        );
                    }
                    /**
                     * Производит добавление значения `value` в массив который должен быть передан как левый операнд
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     *
                     * @throws {Exceptions.ParserException}
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        const _ = this;

                        context.getByPath(
                            _.query_stack,
                            _.position,
                            PoonyaArray,
                            reject,
                            false,
                            (array) => {
                                if (array != null) {
                                    _.value.result(
                                        context,
                                        out,
                                        reject,
                                        (result) => {
                                            array.push(context, result);
                                            Tick(resolve, result);
                                        }
                                    );
                                } else {
                                    reject(
                                        _.position,
                                        new TheFieldMustBeAnArrayInstanceExceprion(
                                            _.query_stack[0]
                                        )
                                    );
                                }
                            }
                        );
                    }
                }

                module.exports = PushStatement;

                /***/
            },

            /***/ 91: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/statements/RepeatStatement.js
                 * @description Содержит в себе оператор repeat, который используется для создания цикличных конечных конструкций
                 * @author Astecom
                 */

                const { TheFieldMustBeNumberException } = __webpack_require__(
                        943
                    ),
                    { Tick } = __webpack_require__(88),
                    { iStatement } = __webpack_require__(161),
                    PoonyaNumber = __webpack_require__(220),
                    BreakStatement = __webpack_require__(707),
                    ContinueStatement = __webpack_require__(914);
                /**
                 * @lends RepeatStatement;
                 * @protected
                 */

                class RepeatStatement extends iStatement {
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
                        super();
                        this.from = from;
                        this.to = to;
                        this.body = body;
                        this.body.interrupted();
                        this.body.continued();
                    }
                    /**
                     * @see iStatement.__sync
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @method
                     * @returns {RepeatStatement}
                     */

                    __sync(reject) {
                        this.from.__sync(reject);

                        this.to.__sync(reject);

                        this.body.__sync(reject);

                        return this;
                    }
                    /**
                     * @see iStatement.__executable
                     *
                     * @returns {Array<SequenceGroup>} список исполняемых блоков
                     * @method
                     */

                    __executable() {
                        return [this.body];
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
                        return (
                            'repeat (' +
                            this.from.toString(indent) +
                            '; ' +
                            this.to.toString(indent) +
                            ') ' +
                            this.body.toString(indent)
                        );
                    }
                    /**
                     * Выполняет главную выполняему последовательность от `from` до `to`
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     *
                     * @throws {ParserException}
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        let _ = this,
                            difference;

                        _.from.result(context, out, reject, (from_d) => {
                            _.to.result(context, out, reject, (to_d) => {
                                if (!(from_d instanceof PoonyaNumber))
                                    reject(
                                        _.from.position,
                                        new TheFieldMustBeNumberException(
                                            'From'
                                        )
                                    );
                                if (!(to_d instanceof PoonyaNumber))
                                    reject(
                                        _.to.position,
                                        new TheFieldMustBeNumberException('To')
                                    );
                                from_d.result(context, out, reject, (from) => {
                                    to_d.result(context, out, reject, (to) => {
                                        difference = from < to ? 1 : -1;
                                        from = Math.floor(from);
                                        to = Math.floor(to);

                                        function end(result) {
                                            from += difference;
                                            context.popLevel();
                                            Tick(tick, result, difference);
                                        }

                                        function tick(result) {
                                            if (
                                                from == to ||
                                                result instanceof BreakStatement
                                            ) {
                                                Tick(
                                                    resolve, //
                                                    // Защита, чтобы инструкция выхода из цикла не предавалась дальше по цепочке
                                                    //
                                                    result instanceof
                                                        BreakStatement ||
                                                        result instanceof
                                                            ContinueStatement
                                                        ? null
                                                        : result
                                                );
                                                return;
                                            }

                                            context.addLevel();
                                            context.set('current', from, 'up');

                                            _.body.result(
                                                context,
                                                out,
                                                reject,
                                                end,
                                                false
                                            );
                                        }

                                        tick();
                                    });
                                });
                            });
                        });
                    }
                }

                module.exports = RepeatStatement;

                /***/
            },

            /***/ 498: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/statements/ResetStatement.js
                 * @description Содержит в себе оператор обновления значения переменной
                 * @author Astecom
                 */

                const ExpressionGroup = __webpack_require__(515),
                    {
                        iPoonyaObject,
                        iPoonyaPrototype,
                        iContext,
                        iStatement,
                    } = __webpack_require__(161),
                    {
                        GetFieldOfNullException,
                        TheFieldNotHasDeclaredExceprion,
                    } = __webpack_require__(943),
                    { GET } = __webpack_require__(351),
                    { Tick } = __webpack_require__(88),
                    { Operand } = __webpack_require__(501),
                    PoonyaObject = __webpack_require__(753);
                /**
                 * @lends ResetStatement
                 * @protected
                 */

                class ResetStatement extends iStatement {
                    /**
                     * Производит переустновку значения переменной переданной как левой операнд на выражение, которое передано как правый операнд.
                     * Объект который сериализуется как name = (...expression)
                     *
                     * @param {Number} position Позиция в начала оператора во входящих данных
                     * @param {String[]} query_stack Путь поля в памяти
                     * @param {ExpressionGroup} value Данные которые нужно устновить
                     *
                     * @constructs PushStatement
                     * @memberof Poonya.Statements
                     * @protected
                     */
                    constructor(position, query_stack, value) {
                        super();
                        this.query_stack = query_stack;
                        this.position = position;
                        this.value = value;
                    }
                    /**
                     * @see iStatement.__sync
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @method
                     * @returns {ResetStatement}
                     */

                    __sync(reject) {
                        this.value.__sync(reject);

                        for (const elem of this.query_stack) {
                            if (elem instanceof Operand) {
                                elem.__sync(reject);
                            }
                        }

                        return this;
                    }
                    /**
                     * @see iStatement.__executable
                     *
                     * @returns {Array<SequenceGroup>} список исполняемых блоков
                     * @method
                     */

                    __executable() {
                        return new Array();
                    }
                    /**
                     * Сериализует текущий объект в строку
                     *
                     * @returns {String} Строковое представление переопределения переменной
                     * @public
                     * @method
                     */

                    toString(indent) {
                        return (
                            '(' +
                            this.query_stack
                                .map((e) =>
                                    typeof e === 'number' ||
                                    e instanceof Operand
                                        ? `[${e.toString(indent)}]`
                                        : e
                                )
                                .join(' => ') +
                            ') = ' +
                            this.value.toString(indent + '\t')
                        );
                    }
                    /**
                     * Производит переопределение перемнной
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     *
                     * @throws {ParserException}
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        let _ = this,
                            target = context,
                            query_stack = Array.from(_.query_stack),
                            leng = query_stack.length,
                            index = 0;

                        function get(of_p) {
                            if (++index < leng) {
                                if (target instanceof PoonyaObject) {
                                    target = target.get(of_p, context);
                                } else if (target instanceof iContext) {
                                    target = target.get(of_p);
                                } else if (target instanceof iPoonyaPrototype) {
                                    target = target[GET](of_p, context);
                                } else {
                                    reject(
                                        _.position,
                                        new GetFieldOfNullException(of_p)
                                    );
                                }

                                next();
                            } else {
                                if (
                                    target instanceof iPoonyaObject ||
                                    target instanceof iContext
                                ) {
                                    _.value.result(
                                        context,
                                        out,
                                        reject,
                                        (value) => {
                                            if (target instanceof iContext) {
                                                if (target.has(of_p)) {
                                                    target.set(of_p, value);
                                                } else {
                                                    reject(
                                                        _.position,
                                                        new TheFieldNotHasDeclaredExceprion(
                                                            of_p
                                                        )
                                                    );
                                                }
                                            } else {
                                                target.set(
                                                    context,
                                                    of_p,
                                                    value
                                                );
                                            }

                                            Tick(resolve, value);
                                        }
                                    );
                                } else
                                    reject(
                                        _.position,
                                        new GetFieldOfNullException(
                                            query_stack[index - 1]
                                        )
                                    );
                            }
                        }

                        function next() {
                            if (query_stack[index] instanceof ExpressionGroup)
                                query_stack[index].result(
                                    context,
                                    null,
                                    reject,
                                    (result) => get(result.toRawData())
                                );
                            else get(query_stack[index]);
                        }

                        next();
                    }
                }

                module.exports = ResetStatement;

                /***/
            },

            /***/ 530: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/statements/SequenceGroup.js
                 * @description Содержит в себе дочернуюю исполняемую группу, которая, при нормальных услвиях, является чустью главной исполняемой группы.
                 * @author Astecom
                 */

                const { Tick } = __webpack_require__(88),
                    { iStatement } = __webpack_require__(161),
                    { UnexpectedTokenException } = __webpack_require__(943),
                    BreakStatement = __webpack_require__(707),
                    ContinueStatement = __webpack_require__(914);
                /**
                 * @lends SequenceGroup;
                 * @protected
                 */

                class SequenceGroup extends iStatement {
                    /**
                     * Исполняемая последовательность
                     *
                     * @param {Boolean} can_break можно ли завершить это выражение оператором break
                     * @param {Boolean} can_continue можно ли завершить это выражение оператором continue
                     * @param {Boolean} can_return можно ли завершить это выражение оператором return
                     *
                     * @constructs SequenceGroup
                     * @memberof Poonya.Statements
                     * @protected
                     */
                    constructor(
                        can_break = false,
                        can_continue = false,
                        can_return = false
                    ) {
                        super();
                        this.Sequence = new Array();
                        this.can_break = can_break;
                        this.can_continue = can_continue;
                        this.can_return = can_return;
                    }
                    /**
                     * @see iStatement.__executable
                     *
                     * @returns {Array<SequenceGroup>} список исполняемых блоков
                     * @method
                     */

                    __executable() {
                        return new Array();
                    }
                    /**
                     * Синхронизирует флаги родительской группы с дочерними
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @method
                     *
                     * @returns {SequenceGroup}
                     */

                    __sync(reject) {
                        for (const elem of this.Sequence) {
                            for (const block of elem.__executable()) {
                                if (this.can_break) block.interrupted();
                                if (this.can_continue) block.continued();
                                if (this.can_return) block.terminable();
                            }

                            if (
                                elem instanceof BreakStatement &&
                                !this.can_break
                            )
                                reject(
                                    elem.position,
                                    new UnexpectedTokenException('break')
                                );
                            if (
                                elem instanceof ContinueStatement &&
                                !this.can_continue
                            )
                                reject(
                                    elem.position,
                                    new UnexpectedTokenException('continue')
                                );

                            elem.__sync(reject);
                        }

                        return this;
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
                        //
                        // Проталкиваю нужное мне выражение в общую группу
                        //
                        this.Sequence.push(elem);
                    }
                    /**
                     * Ставит флаг на последовательности, что её можно прервать оператором breack
                     *
                     * @public
                     * @method
                     */

                    interrupted() {
                        this.can_break = true;
                    }
                    /**
                     * Ставит флаг на последовательности, что последовательность можно превать оператором continue
                     *
                     * @public
                     * @method
                     */

                    continued() {
                        this.can_continue = true;
                    }
                    /**
                     * Ставит флаг на последовательности, что последовательность можно превать оператором return
                     *
                     * @public
                     * @method
                     */

                    terminable() {
                        this.can_return = true;
                    }
                    /**
                     * Выполняет текущую последовательность
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     * @param {Boolean} level_ops Если true, то операции с уровнями памяти будут происходить автоматически
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve, level_ops = true) {
                        let _ = this,
                            i = 0,
                            leng = _.Sequence.length;

                        if (level_ops) context.addLevel();

                        function next(result) {
                            Tick(tick, result);
                        }

                        function tick(result) {
                            if (
                                i >= leng ||
                                (result instanceof BreakStatement &&
                                    _.can_break) ||
                                (result instanceof ContinueStatement &&
                                    _.can_continue)
                            ) {
                                if (level_ops) context.popLevel();
                                Tick(resolve, result);
                                return;
                            }

                            _.Sequence[i++].result(context, out, reject, next);
                        }

                        tick(null);
                    }
                    /**
                     * Сериализует текущую группу в текст
                     *
                     * @param {String} indent отступ слева, для лучшей читаемости
                     * @returns {String} отфрматированный текст
                     */

                    toString(indent = 0) {
                        return `{\n${indent}${this.Sequence.map((e) =>
                            e.toString(indent + '\t')
                        ).join('\n\n' + indent)}\n${indent.substring(
                            0,
                            indent.length - 1
                        )}}`;
                    }
                }

                module.exports = SequenceGroup;

                /***/
            },

            /***/ 404: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/statements/SequenceMainGroup.js
                 * @description Содержит в себе оператор главную сполняемую группу, т.е. группу которая явлся родетелем дочерних исполняемых групп, при нормальных условиях.
                 * @author Astecom
                 */

                const { Tick } = __webpack_require__(88),
                    { iStatement } = __webpack_require__(161),
                    { UnexpectedTokenException } = __webpack_require__(943),
                    BreakStatement = __webpack_require__(707),
                    ContinueStatement = __webpack_require__(914);
                /**
                 * @lends SequenceMainGroup;
                 * @protected
                 */

                class SequenceMainGroup extends iStatement {
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
                        super();
                        this.Sequence = Array.isArray(init)
                            ? init
                            : new Array();
                    }
                    /**
                     * !! Это главная группа, этот метод должен быть вызван сразу после окончания формирования группы !!
                     *
                     * @see iStatement.__sync
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @method
                     *
                     * @returns {SequenceMainGroup}
                     */

                    __sync(reject) {
                        for (const elem of this.Sequence) {
                            for (const block of elem.__executable()) {
                                if (this.can_break) block.interrupted();
                                if (this.can_continue) block.continued();
                                if (this.can_return) block.terminable();
                            }

                            if (elem instanceof BreakStatement)
                                reject(
                                    elem.position,
                                    new UnexpectedTokenException('break')
                                );
                            if (elem instanceof ContinueStatement)
                                reject(
                                    elem.position,
                                    new UnexpectedTokenException('continue')
                                );

                            elem.__sync(reject);
                        }

                        return this;
                    }
                    /**
                     * @see iStatement.__executable
                     *
                     * @returns {Array<SequenceGroup>} список исполняемых блоков
                     * @method
                     */

                    __executable() {
                        return new Array();
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
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        let _ = this,
                            i = 0,
                            leng = _.Sequence.length;

                        function next(result) {
                            Tick(tick, result);
                        }

                        function tick(result) {
                            if (i >= leng) {
                                if (
                                    result &&
                                    typeof result.result === 'function'
                                ) {
                                    result.result(
                                        context,
                                        out,
                                        reject,
                                        (p_result) => {
                                            Tick(resolve, p_result);
                                        }
                                    );
                                } else {
                                    Tick(resolve, result);
                                }

                                return;
                            }

                            _.Sequence[i++].result(context, out, reject, next);
                        }

                        tick();
                    }
                    /**
                     * Сериализует текущую группу в текст
                     *
                     * @param {String} indent отступ слева, для лучшей читаемости
                     * @returns {String} отфрматированный текст
                     */

                    toString(indent = '\t') {
                        return `{\n${indent}${this.Sequence.map((e) =>
                            e.toString(indent + '\t')
                        ).join('\n\n' + indent)}\n${indent.substring(
                            0,
                            indent.length - 1
                        )}}`;
                    }
                }

                module.exports = SequenceMainGroup;

                /***/
            },

            /***/ 859: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/statements/SetStatement.js
                 * @description Содержит в себе оператор set, который используется для устновки значения в области памяти
                 * @author Astecom
                 */

                const {
                        TheFieldAlreadyHasBeenDeclaredException,
                    } = __webpack_require__(943),
                    { Tick } = __webpack_require__(88),
                    { iStatement } = __webpack_require__(161);
                /**
                 * @lends SetStatement
                 * @protected
                 */

                class SetStatement extends iStatement {
                    /**
                     * Объект который Сериализуется как set = (expression...)
                     *
                     * @param {String} name поле, которое нужно установить в текущем контексте
                     * @param {ExpressionGroup} value Значение, которое поле получит после выполнения этого вхождения
                     *
                     * @constructs SetStatement
                     * @memberof Poonya.Statements
                     * @protected
                     */
                    constructor(name, value) {
                        super();
                        this.name = name.toString();
                        this.position = name.position;
                        this.value = value;
                    }
                    /**
                     * @see iStatement.__sync
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @method
                     *
                     * @returns {SetStatement}
                     */

                    __sync(reject) {
                        this.value.__sync(reject);

                        return this;
                    }
                    /**
                     * @see iStatement.__executable
                     *
                     * @returns {Array<SequenceGroup>} список исполняемых блоков
                     * @method
                     */

                    __executable() {
                        return new Array();
                    }
                    /**
                     * Сериализует текущий объект в строку
                     *
                     * @returns {String} Строковое представление устновки значения переменной
                     * @public
                     * @method
                     */

                    toString(indent) {
                        return (
                            'set ' +
                            this.name +
                            ' = ' +
                            this.value.toString(indent + '\t')
                        );
                    }
                    /**
                     * Производит установку значения переменной в текущем контексте
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     *
                     * @throws {ParserException}
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        const _ = this;

                        if (!context.has(_.name, 'up')) {
                            _.value.result(context, out, reject, (result) => {
                                context.set(_.name, result, 'up');
                                Tick(resolve, result);
                            });
                        } else {
                            reject(
                                _.position,
                                new TheFieldAlreadyHasBeenDeclaredException(
                                    _.name
                                )
                            );
                        }
                    }
                }

                module.exports = SetStatement;

                /***/
            },

            /***/ 887: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                /**
                 * @file src/classes/excecution/statements/UseStatement.js
                 * @description Содержит в себе оператор use, который используется для иморта статической библиотеки в текущий контекст
                 * @author Astecom
                 */
                const { Tick } = __webpack_require__(88),
                    { iStatement } = __webpack_require__(161),
                    { Import } = __webpack_require__(742),
                    { CannotImportStaticLibrary } = __webpack_require__(943),
                    ExpressionGroup = __webpack_require__(515);
                /**
                 * @lends UseStatement
                 * @protected
                 */

                class UseStatement extends iStatement {
                    /**
                     * Дескриптор оператора use
                     *
                     * @param {Number} position позиция оператора
                     * @param {ExpressionGroup} libraries имя бибилиотеки для иморта
                     *
                     * @constructs UseStatement
                     * @memberof Poonya.Statements
                     * @protected
                     */
                    constructor(position, libraries) {
                        super();
                        this.libraries = libraries;
                        this.position = position;
                    }
                    /**
                     * @see iStatement.__sync
                     *
                     * @method
                     * @returns {UseStatement}
                     */

                    __sync() {
                        return this;
                    }
                    /**
                     * @see iStatement.__executable
                     *
                     * @returns {Array<SequenceGroup>} список исполняемых блоков
                     * @method
                     */

                    __executable() {
                        return new Array();
                    }
                    /**
                     * Преобразовывет оператор use в строку
                     *
                     * @param {String} indent отступ слева
                     *
                     * @returns {String} строкове представление оператора
                     */

                    toString(indent) {
                        return 'use ' + this.libraries.toString(indent) + ';';
                    }
                    /**
                     * Выполняет импорт статической библиотеки
                     *
                     * @returns {UseStatement}
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     *
                     * @public
                     * @method
                     */

                    result(context, out, reject, resolve) {
                        this.libraries.result(
                            context,
                            out,
                            reject,
                            (result) => {
                                result.result(
                                    context,
                                    out,
                                    reject,
                                    (d_result) => {
                                        const libraries = new Array();

                                        if (Array.isArray(d_result)) {
                                            libraries.push(
                                                ...d_result
                                                    .map((e) =>
                                                        e != null
                                                            ? e.toString()
                                                            : 'null'
                                                    )
                                                    .filter((e) => e != null)
                                            );
                                        } else {
                                            if (d_result != null) {
                                                libraries.push(
                                                    d_result.toString()
                                                );
                                            }
                                        }

                                        const imports = Import(
                                            libraries
                                        ).filter((e) => e != null);

                                        if (
                                            imports.length != libraries.length
                                        ) {
                                            const imported = imports.map(
                                                (e) => e.name
                                            );
                                            reject(
                                                this.position,
                                                new CannotImportStaticLibrary(
                                                    libraries.filter(
                                                        (e) =>
                                                            !imported.includes(
                                                                e
                                                            )
                                                    )
                                                )
                                            );
                                        }

                                        context.import(imports, reject, false);
                                        Tick(resolve);
                                    }
                                );
                            }
                        );
                    }
                }

                module.exports = UseStatement;

                /***/
            },

            /***/ 267: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/excecution/statements/WhileStatement.js
                 * @description Содержит в себе инструкцию while, который используется для создания цикличных условных операций
                 * @author Astecom
                 */

                const { Tick } = __webpack_require__(88),
                    { iStatement } = __webpack_require__(161),
                    BreakStatement = __webpack_require__(707),
                    ContinueStatement = __webpack_require__(914);
                /**
                 * @lends WhileStatement
                 * @protected
                 */

                class WhileStatement extends iStatement {
                    /**
                     * Дескриптор инструкции while
                     *
                     * @param {ExpressionGroup} condition Выражение - условие
                     * @param {SequenceGroup} body Основная исполняемая последовательность
                     *
                     * @constructs WhileStatement
                     * @memberof Poonya.Statements
                     * @protected
                     */
                    constructor(condition, body) {
                        super();
                        this.condition = condition;
                        this.body = body;
                        this.body.interrupted();
                        this.body.continued();
                    }
                    /**
                     * @see iStatement.__sync
                     *
                     * @param {Function} reject функция выбрасывания исключений
                     *
                     * @method
                     *
                     * @returns {WhileStatement}
                     */

                    __sync(reject) {
                        this.condition.__sync(reject);

                        this.body.__sync(reject);

                        return this;
                    }
                    /**
                     * @see iStatement.__executable
                     *
                     * @returns {Array<SequenceGroup>} список исполняемых блоков
                     * @method
                     */

                    __executable() {
                        return [this.body];
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
                        return (
                            'while (' +
                            this.condition.toString(indent) +
                            ') ' +
                            this.body.toString(indent)
                        );
                    }
                    /**
                     * Выполняет основной блок, до тех пор, пока выполняется условие переданное первым аргументом
                     *
                     * @param {iContext} context Контекст выполнения
                     * @param {PoonyaOutputStream} out вывод шаблонизатора
                     * @param {Function} reject Вызывается при ошибке
                     * @param {Function} resolve функция возврата результата
                     *
                     * @throws {ParserException}
                     *
                     * @public
                     * @method
                     * @async
                     */

                    result(context, out, reject, resolve) {
                        let _ = this;

                        (function tick(result) {
                            _.condition.result(
                                context,
                                out,
                                reject,
                                (d_result) => {
                                    if (
                                        context.toBooleanResult(d_result) &&
                                        !(result instanceof BreakStatement)
                                    ) {
                                        _.body.result(
                                            context,
                                            out,
                                            reject,
                                            tick
                                        );
                                    } else {
                                        Tick(
                                            resolve, //
                                            // Защита, чтобы инструкция выхода из цикла не предавалась дальше по цепочке
                                            //
                                            result instanceof BreakStatement ||
                                                result instanceof
                                                    ContinueStatement
                                                ? null
                                                : result
                                        );
                                        return;
                                    }
                                }
                            );
                        })(null);
                    }
                }

                module.exports = WhileStatement;

                /***/
            },

            /***/ 943: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/classes/exceptions.js
                 * @description Тут я сгруппировал всевозможные исклюения
                 * @author Astecom
                 */

                const { SERVICE } = __webpack_require__(351),
                    { dirname } = __webpack_require__(386);
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
                        this.message =
                            'PoonyaException / ' +
                            header +
                            (message != null ? ': \n' + message : '');
                        this.throwed = throwed;
                    }

                    toString() {
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
                 * Основное исключение лексера
                 *
                 * @memberof Poonya.Exceptions
                 * @name LexerException
                 * @class
                 * @protected
                 */

                class LexerException extends PoonyaException {
                    constructor(header, message) {
                        super('Lexer exception / ' + header, message);
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
                        super(
                            `Wrong order: condition operator: '${entry.toString()}' after '${last.toString()}'`
                        );
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
                        super(
                            `Unexpected token '${token.toString()}'` +
                                (expected
                                    ? `when expected '${expected.toString()}'`
                                    : '')
                        );
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
                        super(
                            'To use include, you must pass the path to the current execution file'
                        );
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
                        super(
                            "An error occured while opening file: '" +
                                path +
                                "'"
                        );
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

                        for (
                            let i = 0, leng = stack.length, cur;
                            i < leng;
                            i++
                        ) {
                            if (exp.test(stack[i])) {
                                cur = stack[i].match(exp);

                                if (
                                    cur[1] === 'NativeFunction.result' &&
                                    SERVICE.ROOTPATH ==
                                        dirname(cur[2]).substring(
                                            0,
                                            SERVICE.ROOTPATH.length
                                        )
                                ) {
                                    stack = stack.slice(0, i);
                                    break;
                                }
                            }
                        }

                        super(
                            "Critical error while executing a native function '" +
                                name +
                                "'",
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
                        super(
                            `'${field}' must be a number, or a container containing a number`
                        );
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
                        super(
                            `Segmentation fault: empty argument for ` +
                                blockname
                        );
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
                        super(
                            `Segmentation fault exceeded the maximum number of segments for block ` +
                                blockname
                        );
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
                        super(
                            `Expected word type expression and get ${value}[${type}]`
                        );
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
                        super(
                            `Critical parser error: unexprected end of expression`
                        );
                    }
                }
                /**
                 * Критическая ошибка лексера, неожиданный конец ввода
                 *
                 * @memberof Poonya.Exceptions
                 * @name CriticalLexerErrorUnexpectedEndOfInputException
                 * @class
                 * @protected
                 */

                class CriticalLexerErrorUnexpectedEndOfInputException extends LexerException {
                    constructor() {
                        super(`Critical lexer error: unexpected end of input`);
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
                        super(
                            `Bad array notation: jumping two levels is not possible`
                        );
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
                        super(
                            `Bad array notation: unexpected transition to a upper level`
                        );
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
                        super(
                            `Cannot create an empty object after declaring its keys`
                        );
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
                        super(
                            `Wrong key type: it can be set only by a numeric or string key`
                        );
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
                        super(
                            `Cannot set this field, the field is protected from changes`
                        );
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
                                .map((e) =>
                                    typeof e === 'number'
                                        ? '[' + e + ']'
                                        : e.toString()
                                )
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
                        super(
                            'The "' +
                                path +
                                '" source file has a recursive inclusion of itself'
                        );
                    }
                }
                /**
                 * Невозможно импортировать статическую библиотеку, возможно неправильно указано имя.
                 *
                 * @memberof Poonya.Exceptions
                 * @name CannotImportStaticLibrary
                 * @class
                 * @protected
                 */

                class CannotImportStaticLibrary extends PoonyaException {
                    constructor(...libs) {
                        super(
                            `library ${libs
                                .map((e) => `"${e}"`)
                                .join(
                                    ', '
                                )} cannot be imported, possibly the wrong library identifier for import was specified`
                        );
                    }
                }

                module.exports.IOError = IOError;
                module.exports.LinkerIOError = LinkerIOError;
                module.exports.LexerException = LexerException;
                module.exports.IsRecursiveLink = IsRecursiveLink;
                module.exports.LinkerException = LinkerException;
                module.exports.PoonyaException = PoonyaException;
                module.exports.ParserException = ParserException;
                module.exports.TheSequenceException = TheSequenceException;
                module.exports.ParserLogicException = ParserLogicException;
                module.exports.GetFieldOfNullException = GetFieldOfNullException;
                module.exports.BadEmptyObjectException = BadEmptyObjectException;
                module.exports.UnexpectedTokenException = UnexpectedTokenException;
                module.exports.UnexpectedTokenStatement = UnexpectedTokenStatement;
                module.exports.CannotImportStaticLibrary = CannotImportStaticLibrary;
                module.exports.FieldNotAFunctionException = FieldNotAFunctionException;
                module.exports.BadKeyInvalidTypeException = BadKeyInvalidTypeException;
                module.exports.IsNotAConstructorException = IsNotAConstructorException;
                module.exports.LinkerPathNotGiveException = LinkerPathNotGiveException;
                module.exports.ParserEmtyArgumentException = ParserEmtyArgumentException;
                module.exports.CriticalParserErrorException = CriticalParserErrorException;
                module.exports.NativeFunctionExecutionError = NativeFunctionExecutionError;
                module.exports.BadKeyProtectedFieldException = BadKeyProtectedFieldException;
                module.exports.TheFieldMustBeNumberException = TheFieldMustBeNumberException;
                module.exports.BadArrowNotationJumpingTwoLevels = BadArrowNotationJTException;
                module.exports.NativeFunctionReturnValueError = NativeFunctionReturnValueError;
                module.exports.UnableToRecognizeTypeException = UnableToRecognizeTypeException;
                module.exports.TheFieldNotHasDeclaredExceprion = TheFieldNotHasDeclaredExceprion;
                module.exports.UnableToCreateAnObjectException = UnableToCreateAnObjectException;
                module.exports.BadArrowNotationJumpingToUpperLevel = BadArrowNotationJTULException;
                module.exports.UnexpectedWordTypeAndGetException = UnexpectedWordTypeAndGetException;
                module.exports.ParserUnfinishedNotationException = ParserUnfinishedNotationException;
                module.exports.TheFieldMustBeAnArrayInstanceExceprion = TheFieldMustBeAnArrayInstanceExceprion;
                module.exports.TheFieldAlreadyHasBeenDeclaredException = TheFieldAlreadyHasBeenDeclaredException;
                module.exports.SegmentationFaultEmptyArgumentException = SegmentationFaultEmptyArgumentException;
                module.exports.InvalidSequenceForLetiableAccessException = InvalidSequenceForLetiableAccessException;
                module.exports.CriticalParserErrorUnexpectedEndOfExpression = CriticalParserErrorUnexpectedEndOfExpression;
                module.exports.CriticalLexerErrorUnexpectedEndOfInputException = CriticalLexerErrorUnexpectedEndOfInputException;
                module.exports.CriticalParserErrorUnexpectedEndOfInputException = CriticalParserErrorUnexpectedEndOfInputException;
                module.exports.CriticalParserErrorNoRawDataTransmittedException = CriticalParserErrorNoRawDataTransmittedException;
                module.exports.SegmentationFaultMaximumSegmentsForBlockException = SegmentationFaultMaximumSegmentsForBlockException;

                /***/
            },

            /***/ 161: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/interfaces.js
                 * @description Тут собраны интерфейсы, для боллее удобного последующего сравнения объектов
                 * @author Astecom
                 */

                const EventEmitter = __webpack_require__(138); // Poonya

                class iCodeEmitter {} // Storage

                class iContext {} // Datas

                class iPoonyaObject {}

                class iPoonyaPrototype {} // Poonya interfaces

                /**
                 * @lends iPoonyaConstructsData
                 * @interface iPoonyaConstructsData
                 */

                class iPoonyaConstructsData {
                    /**
                     * Интерфейс ответа функции кострукирующий шаблон, на основе промисов - `patternCreator`
                     *
                     * @constructs iPoonyaConstructsData
                     * @property {CodeEmitter} data шаблон, который должен быть создан
                     * @property {Array<Any>} args аргументы возвращенные по завершении инициализации шаблона
                     */
                    constructor() {}
                }
                /**
                 * @lends iPathData
                 * @interface iPathData
                 */

                class iPathData {
                    /**
                     * Интерфейс описывающий возвращаемые контекстом данные при поиске пути
                     *
                     * @constructs iPathData
                     * @property {ParserData} instance найденое значение
                     * @property {PoonyaObject|iPoonyaPrototype} parent родительский объект, если это поле объекта
                     * @property {Number} index глубина поиска
                     */
                    constructor() {}
                }
                /**
                 * @lends iInputData
                 * @interface iInputData
                 */

                class iInputData {
                    /**
                     * Интерфейс описывающий возвращаемые контекстом данные при поиске пути
                     *
                     * @constructs iInputData
                     * @property {?String} raw Ввод шаблонизатора
                     * @property {?String} path Путь к файлу(необязательно, если переданы сырые данные). Путь к файлу указывается относительно файла, из которого был импортирован poonya
                     * @property {?String} charset кодировка файла, по умолчанию это utf-8
                     */
                    constructor() {}
                }
                /**
                 * @lends iPoonyaOutputStream
                 * @interface iPoonyaOutputStream
                 */

                class iPoonyaOutputStream extends EventEmitter {
                    /**
                     * Интерфейс вывода шаблонов
                     * Template output interface
                     *
                     * @param {Object} data
                     * @param {Context} context
                     *
                     * @property {Context} data данные которые уже были выведены
                     *
                     * @memberof Poonya
                     * @constructs iPoonyaOutputStream
                     * @public
                     */
                    constructor() {
                        super();
                    }
                    /**
                     * Выводит данные
                     * Outputs data
                     *
                     * @param {Any} data данные которые необходимо вывести
                     *                   data to be displayed
                     * @method
                     * @public
                     */

                    write(data) {}
                    /**
                     * Redirects the data stream to `stream` passed as the first argument
                     * Перенаправляет поток данных в `stream` переданный первым аргументом
                     *
                     * @param {PoonyaOutputStream|Stream} stream поток которому необходимо передавать данные помимо этого
                     *                                           the stream to which you need to transfer data in addition to this
                     * @returns `stream` Поток который был передан.
                     * @returns `stream` The stream that was sent.
                     * @method
                     * @public
                     */

                    pipe(stream) {}
                    /**
                     * Преобразует поток в ReadableStream или в Stream.Writable для nodejs
                     * Converts stream to ReadableStream or Stream.Writable for nodejs
                     *
                     * @returns {ReadableStream|Stream.Writable} a read stream if it's a browser, or a write stream if it's nodejs
                     *                                           поток чтения, если это браузер, или поток записи если это nodejs
                     * @method
                     * @public
                     */

                    toReadable() {}
                    /**
                     * Ожидает завершения записи потока, после чего возвращает массив с буффером данных
                     * Waits for the stream to finish writing, then returns an array with a data buffer
                     *
                     * @async
                     * @public
                     * @method
                     * @returns {Array<Any>} массив с переданными данными
                     *                       array with passed data
                     */

                    complete() {}
                } // Excecute

                /**
                 * @lends iStatement
                 * @interface iStatement
                 */

                class iStatement {
                    /**
                     * Возвращет список исполняемых блоков, если такие есть.
                     *
                     * @method
                     * @returns {Array<iStatement>} список исполняемых блоков, если такие есть.
                     */
                    __executable() {
                        return new Array();
                    }
                    /**
                     * Синхронизирует группы выражений с оснновной группой
                     *
                     * @method
                     *
                     * @returns {iStatement}
                     */

                    __sync(reject) {
                        return this;
                    }
                }

                module.exports.iContext = iContext;
                module.exports.iPathData = iPathData;
                module.exports.iInputData = iInputData;
                module.exports.iCodeEmitter = iCodeEmitter;
                module.exports.iPoonyaObject = iPoonyaObject;
                module.exports.iPoonyaPrototype = iPoonyaPrototype;
                module.exports.iPoonyaConstructsData = iPoonyaConstructsData;
                module.exports.iStatement = iStatement;
                module.exports.iPoonyaOutputStream = iPoonyaOutputStream;

                /***/
            },

            /***/ 351: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/static.js
                 * @description Содержит в себе набор статических полей
                 * @author Astecom
                 */

                const { EventEmitter } = __webpack_require__(138); // Защищенные поля для PoonyaPrototype

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
                    OPERATOR: 0x8,
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
                    OR: 0xb,
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
                 * @property {Number} CONSTRUCTOR - Поле является функцией конструктором.
                 * @protected
                 * @enum
                 * @static
                 */

                const FIELDFLAGS = {
                    NOOUTPUT: 0x1,
                    CONSTANT: 0x2,
                    STATIC: 0x4,
                    PROPERTY: 0x8,
                    CONSTRUCTOR: 0x10,
                };
                /**
                 * Занимаемая область в глобальном контексте
                 *
                 * @memberof Poonya.Static
                 * @constant NAMESPACE
                 * @protected
                 * @static
                 */

                /*LIQUID*/

                const NAMESPACE = Symbol.for(
                    'POONYA-' +
                        Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) +
                        '-win32'
                );
                /*LIQUID-END*/

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
                        NULL: ['Null'],
                        PATTERN: ['Pattern'],
                    },
                    CONFIG: {
                        DEBUG:
                            /*LIQUID*/
                            false,
                        /*LIQUID-END*/
                    },
                    LOADED: false,
                    ACTIONS: new EventEmitter(),

                    get SPACE() {
                        return __webpack_require__.g[NAMESPACE];
                    },
                };
                SERVICE.ACTIONS.on('load', () => (SERVICE.LOADED = true));
                SERVICE.ACTIONS.setMaxListeners(Infinity);
                module.exports.FIELDFLAGS = FIELDFLAGS;
                module.exports.SUPER_CALL = SUPER_CALL;
                module.exports.NAMESPACE = NAMESPACE;
                module.exports.OPERATOR = OPERATOR;
                module.exports.CHARTYPE = CHARTYPE;
                module.exports.SERVICE = SERVICE;
                module.exports.CONFIG = SERVICE.CONFIG;
                module.exports.GET = GET;
                module.exports.IS = IS;

                /***/
            },

            /***/ 591: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/storage.js
                 * @description Содержит в себе напиор классов и функций для управления динамической памятью.
                 * @author Astecom
                 */

                const { Operand } = __webpack_require__(501);

                const PoonyaPattern = __webpack_require__(360),
                    {
                        GetFieldOfNullException,
                        IsNotAConstructorException,
                        PoonyaException,
                    } = __webpack_require__(943),
                    { GET, SERVICE, IS, CONFIG } = __webpack_require__(351),
                    { Cast, toBytes, throwError } = __webpack_require__(88),
                    {
                        iContext,
                        iPoonyaPrototype,
                        iPathData,
                        iCodeEmitter,
                        iPoonyaObject,
                        iPoonyaOutputStream,
                    } = __webpack_require__(161),
                    { PoonyaStaticLibrary } = __webpack_require__(742),
                    { parser } = __webpack_require__(190),
                    lexer = __webpack_require__(94),
                    NativeFunction = __webpack_require__(329),
                    ExpressionGroup = __webpack_require__(515),
                    PoonyaObject = __webpack_require__(753),
                    PoonyaArray = __webpack_require__(36),
                    PoonyaInteger = __webpack_require__(550),
                    PoonyaNumber = __webpack_require__(220),
                    PoonyaString = __webpack_require__(809),
                    PoonyaBoolean = __webpack_require__(839),
                    PoonyaNull = __webpack_require__(679);
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
                                for (
                                    let i = 0, leng = data.length;
                                    i < leng;
                                    i++
                                )
                                    this.set(context, i, data[i]);
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
                                    for (let key in data)
                                        this.set(context, key, data[key]);
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
                        if (typeof key !== 'string' && typeof key !== 'number')
                            throw new TypeError('Bad key ' + key);

                        try {
                            Cast(
                                data,
                                context,
                                parents_three,
                                super.set.bind(this, key)
                            );
                        } catch (e) {
                            if (CONFIG.DEBUG) console.error(e);
                            console.error('Error when cast value of ' + key);
                        }
                    }
                    /**
                     * ДеСериализует значени е хипа памяти в javascript объект
                     *
                     * @param {?iContext} context контекст выполнения
                     * @param {?Array<String>} out Выходной массив
                     * @param {?Function} reject Функция вызывающаяся при ошибках
                     * @method
                     * @public
                     */

                    result(context, out, reject) {
                        let output = new Object();

                        for (let [key, value] of this)
                            if (value instanceof NativeFunction)
                                output[key] =
                                    value != null
                                        ? value.result(context, out, reject)
                                        : null;
                            else
                                output[key] =
                                    value != null ? value.target : null;

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
                     * @param {Function} reject функция, которая будет вызвана при ошибке
                     * @param {...Heap} initial Значения переданные для инициализации
                     *
                     * @memberof Poonya.Storage
                     * @constructs Context
                     * @implements {iContext}
                     * @classdesc Определяет набор данных для манипуляции в шаблонизаторе
                     * @protected
                     */
                    constructor(libraries, reject, ...initial) {
                        super();
                        this.levels = new Array();
                        this.source = '';
                        this._lib_cache = new Array(); // Если переданы дидлиотеки для импорта, то импортируем их в этот контекст

                        if (libraries != null) this.import(libraries, reject); // Перебераем переданные для инициалзации объекты

                        this.levels.push(
                            ...initial
                                .map(
                                    // Есл это хип
                                    (e) =>
                                        e instanceof Heap // То ничего не делаем
                                            ? e // Иначе, если это объект
                                            : typeof e === 'object' // Создаем новый хип с ним
                                            ? new Heap(this, e) // Если это не объект вставляем вместо него null
                                            : null // Удаляем все не объекты
                                )
                                .filter((e) => e !== null)
                        );
                    }
                    /**
                     * Устнаваливает истоник контекста (путь к файлу, из-за выполнения которого этот контекст был создан)
                     *
                     * @param {String} new_source
                     * @returns
                     */

                    setSource(new_source) {
                        this.source = new_source;
                        return this;
                    }
                    /**
                     * Импортирует нативные библиотеки `libraries` в текущий контекст.
                     *
                     * @param {Array<PoonyaStaticLibrary>} libraries массив с библиотеками, которые нужно импортировать
                     * @param {Function} reject фукнция вызова ошибки
                     * @param {Boolean} add_root_level если true, то при имотрте будет добавлен новый слой памяти
                     */

                    import(libraries, reject, add_root_level = true) {
                        if (libraries != null) {
                            // Корневой слой
                            if (add_root_level) {
                                this.addLevel();
                            }

                            for (
                                let i = 0, leng = libraries.length, target;
                                i < leng;
                                i++
                            ) {
                                if (
                                    libraries[i] instanceof
                                        PoonyaStaticLibrary &&
                                    !this._lib_cache.includes(
                                        libraries[i].namespace
                                    )
                                ) {
                                    if (libraries[i].global) {
                                        libraries[i].importTo(
                                            this.levels[0],
                                            this,
                                            reject
                                        );
                                    } else {
                                        this.createObject(
                                            null,
                                            -1,
                                            SERVICE.CONSTRUCTORS.OBJECT,
                                            reject,
                                            new Array(),
                                            (p_target) => (target = p_target)
                                        );
                                        libraries[i].importTo(
                                            target,
                                            this,
                                            reject
                                        );
                                        this.levels[0].set(
                                            this,
                                            libraries[i].namespace,
                                            target
                                        );
                                    }

                                    this._lib_cache.push(
                                        libraries[i].namespace
                                    );
                                }
                            }
                        }
                    }
                    /**
                     * Выполняет код poonya из строки
                     *
                     * @param {String} input Вход шаблона
                     * @param {?PoonyaOutputStream} out Вывод шаблонизатора
                     *
                     * @method
                     * @public
                     * @async
                     */

                    eval(input, out) {
                        return new Promise((res, rej) => {
                            parser(input, this.source)
                                .catch((error) => rej(error))
                                .then((result) => {
                                    if (result) {
                                        result.sequense.result(
                                            this,
                                            out != null
                                                ? out
                                                : new iPoonyaOutputStream(),
                                            (position, content) => {
                                                try {
                                                    throwError.call(
                                                        {
                                                            input,
                                                            path: this.source,
                                                        },
                                                        position,
                                                        content
                                                    );
                                                } catch (e) {
                                                    rej(e);
                                                }
                                            },
                                            res
                                        );
                                    }
                                });
                        });
                    }
                    /**
                     * Клонирует текущий контекст, возвращает новый кнотекст, со всеми уровнями текущего контекста
                     *
                     * @returns {iContext} клонированный контекст
                     * @method
                     * @public
                     */

                    clone() {
                        const clone = new Context(
                            null,
                            null,
                            ...this.levels
                        ).setSource(this.source);
                        clone._lib_cache = Array.from(this._lib_cache);
                        return clone;
                    }
                    /**
                     * Добавляет уровень в текущий контекст
                     *
                     * @param {?Heap} level уровень который необходимо добавить
                     * @returns {Number} позиция области памяти в птекущем контексте
                     * @method
                     * @public
                     */

                    addLevel(level) {
                        let seed = -0x1;

                        if (level != null) {
                            if (level instanceof Heap) {
                                seed = this.levels.push(level) - 1;
                            } else
                                throw new Error(
                                    'The level for the context must be heap, or indexed by the heap'
                                );
                        } else {
                            seed = this.levels.push(new Heap(this, null)) - 1;
                        }

                        return seed;
                    }
                    /**
                     * Выходит из текущей области памяти
                     *
                     * @param {?Number} index позиция, области памти которую необходимо удалить.
                     * @param {Boolean} trnc если `true` то уддаляет все уровни выше.
                     * @method
                     * @public
                     */

                    popLevel(index, trnc = true) {
                        if (index != null) {
                            this.levels.splice(index, trnc ? Infinity : 1);
                        } else {
                            this.levels.pop();
                        }
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

                        while (
                            p >= 0 &&
                            (b = this.levels[p--].get(val)) == null
                        );

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
                                return this.levels[this.levels.length - 1].has(
                                    val
                                );

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
                        let p;

                        switch (params) {
                            case 'tree':
                                p = this.levels.length;

                                while (--p >= 0) {
                                    if (this.levels[p].get(val) != null) {
                                        this.levels[p].set(this, val, data);
                                        return;
                                    }
                                }

                                this.levels[this.levels.length - 1].set(
                                    this,
                                    val,
                                    data
                                );
                                break;

                            case 'up':
                                this.levels[this.levels.length - 1].set(
                                    this,
                                    val,
                                    data
                                );
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
                     * @param {Function} reject Фукцния которая выбрасывает ошибку(необходимо в случае возникновения ошибки)
                     * @param {Boolean} return_full_info Возвращать полную информацию о переменной, включая родительский объект(если имеется)
                     * @param {Function} resolve функция возврата результата
                     *
                     * @returns {ParserData|iPathData|null} если по заданому пути существует значение вернет его, если нет то вернет null
                     * @method
                     * @public
                     * @async
                     */

                    getByPath(
                        path,
                        position,
                        type = null,
                        reject,
                        return_full_info = false,
                        resolve
                    ) {
                        let _ = this,
                            instance = _,
                            parent = null,
                            flags = 0,
                            query_stack = Array.from(path),
                            leng = query_stack.length,
                            index = 0;

                        function get(of_p) {
                            if (instance instanceof PoonyaObject) {
                                parent = instance;
                                flags = instance.field_attrs.get(of_p);
                                instance = instance.get(of_p, _);
                            } else if (instance instanceof Context) {
                                parent = instance;
                                instance = instance.get(of_p, _);
                            } else if (instance instanceof iPoonyaPrototype) {
                                instance = instance[GET](of_p, _);
                            } else {
                                reject(
                                    position,
                                    new GetFieldOfNullException(of_p)
                                );
                            }

                            if (++index < leng) {
                                next();
                            } else {
                                if (type == null || instance instanceof type) {
                                    if (return_full_info) {
                                        resolve(
                                            Object.assign(new iPathData(), {
                                                instance,
                                                parent,
                                                index,
                                                flags,
                                            })
                                        );
                                    } else {
                                        resolve(instance);
                                    }
                                } else resolve(null);
                            }
                        }

                        function next() {
                            if (query_stack[index] instanceof ExpressionGroup)
                                query_stack[index].result(
                                    _,
                                    null,
                                    reject,
                                    (result) => {
                                        get(result.toRawData());
                                    }
                                );
                            else get(query_stack[index]);
                        }

                        next();
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

                        if (
                            instance instanceof PoonyaInteger ||
                            instance instanceof PoonyaNumber
                        ) {
                            return instance.data != 0;
                        }

                        if (instance instanceof PoonyaNull) {
                            return false;
                        }

                        if (
                            instance instanceof PoonyaObject ||
                            instance instanceof PoonyaArray
                        ) {
                            return true;
                        }

                        if (instance instanceof PoonyaString) {
                            return instance.data.length != 0;
                        }

                        return instance != null;
                    }
                    /**
                     * Создает объект используя конструктор вызванный по пути `path`
                     *
                     * @param {Object} initial Значения для инициализации объекта
                     * @param {Number} position Позиция, с который вызывается конструктор
                     * @param {Array<String>} path Путь к конструктору в памяти
                     * @param {Function} reject Функция вызова ошибки
                     * @param {Array<String>} parents_three Дерево родителей объекта
                     * @param {Function} resolve функция возврата результата
                     *
                     * @returns {PoonyaObject} если по заданому пути существует значение вернет его, если нет то вернет null
                     * @method
                     * @public
                     * @async
                     */

                    createObject(
                        initial,
                        position,
                        path,
                        reject,
                        parents_three = new Array(),
                        resolve
                    ) {
                        const _ = this;

                        _.getByPath(
                            path,
                            position,
                            iPoonyaPrototype,
                            reject,
                            false,
                            (prototype) => {
                                let init = new Object(),
                                    cur = 0,
                                    from =
                                        initial instanceof Map
                                            ? Array.from(initial.entries())
                                            : typeof initial === 'object' &&
                                              initial != null
                                            ? Object.entries(initial)
                                            : null;

                                function done() {
                                    switch (true) {
                                        case prototype[IS]('String'):
                                            resolve(
                                                new PoonyaString(
                                                    prototype,
                                                    init,
                                                    _,
                                                    reject
                                                )
                                            );
                                            return;

                                        case prototype[IS]('Integer'):
                                            resolve(
                                                new PoonyaInteger(
                                                    prototype,
                                                    init,
                                                    _,
                                                    reject
                                                )
                                            );
                                            return;

                                        case prototype[IS]('Boolean'):
                                            resolve(
                                                new PoonyaBoolean(
                                                    prototype,
                                                    init,
                                                    _,
                                                    reject
                                                )
                                            );
                                            return;

                                        case prototype[IS]('Number'):
                                            resolve(
                                                new PoonyaNumber(
                                                    prototype,
                                                    init,
                                                    _,
                                                    reject
                                                )
                                            );
                                            return;

                                        case prototype[IS]('Null'):
                                            resolve(
                                                new PoonyaNull(
                                                    prototype,
                                                    init,
                                                    _,
                                                    reject
                                                )
                                            );
                                            return;

                                        case prototype[IS]('Array'):
                                            resolve(
                                                new PoonyaArray(
                                                    prototype,
                                                    init,
                                                    _,
                                                    reject
                                                )
                                            );
                                            return;

                                        case prototype[IS]('Pattern'):
                                            resolve(
                                                new PoonyaPattern(
                                                    prototype,
                                                    init,
                                                    _,
                                                    reject
                                                )
                                            );
                                            break;

                                        default:
                                            resolve(
                                                new PoonyaObject(
                                                    prototype,
                                                    init,
                                                    _,
                                                    reject
                                                )
                                            );
                                            return;
                                    }
                                }

                                function next() {
                                    const entry = from[cur++];

                                    if (entry != null) {
                                        if (!parents_three.includes(entry[1])) {
                                            if (
                                                entry[1] instanceof
                                                    iPoonyaPrototype ||
                                                entry[1] instanceof
                                                    iPoonyaObject ||
                                                entry[1] instanceof Operand
                                            )
                                                entry[1].result(
                                                    _,
                                                    null,
                                                    reject,
                                                    set.bind(null, entry[0])
                                                );
                                            else set(entry[0], entry[1]);
                                        } else next();
                                    } else {
                                        done();
                                    }
                                }

                                function set(key, value) {
                                    init[key] = value;
                                    next();
                                }

                                if (prototype != null) {
                                    if (
                                        typeof from == 'object' &&
                                        from != null &&
                                        !(initial instanceof iCodeEmitter)
                                    ) {
                                        next();
                                    } else {
                                        init = initial;
                                        done();
                                    }
                                } else {
                                    reject(
                                        position,
                                        new IsNotAConstructorException(path)
                                    );
                                }
                            }
                        );
                    }
                }

                module.exports.Context = Context;
                module.exports.Heap = Heap;

                /***/
            },

            /***/ 742: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/importer.js
                 * @description Содержит в себе набор фнукций, которые необходимы для импорта нативных, написанных на js в нашем случае, библиотека в память poonya
                 * @author Astecom
                 */

                const { NAMESPACE, SERVICE } = __webpack_require__(351),
                    { IOError } = __webpack_require__(943),
                    NativeFunction = __webpack_require__(329),
                    PoonyaPrototype = __webpack_require__(326); // Пространство модулей в глобальном контексте

                const modules = Symbol.for('Modules');

                if (__webpack_require__.g[NAMESPACE] == null) {
                    __webpack_require__.g[NAMESPACE] = new Object();
                }

                if (__webpack_require__.g[NAMESPACE][modules] == null) {
                    __webpack_require__.g[NAMESPACE][modules] = new Map();
                }

                if (__webpack_require__.g[NAMESPACE].modules == null) {
                    __webpack_require__.g[NAMESPACE].modules = 0;
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
                    constructor(
                        id,
                        l_global = false,
                        override = false,
                        namespace
                    ) {
                        AddLibrary(id, this, override);
                        this.namespace =
                            namespace != null
                                ? namespace
                                : 'space-' +
                                  (++__webpack_require__.g[NAMESPACE]
                                      .modules).toString(16) +
                                  (l_global ? '-global' : '');
                        this.global = Boolean(l_global);
                        this.name = id;
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
                        field = String(field);
                        if (this._fields.has(field))
                            throw new Error(
                                'The "' + field + '" field alredy exists'
                            );
                        else this._fields.set(field, data);
                    }
                    /**
                     * Расширяет прототип класса переданного как proto, или создает новый прототип объекта
                     *
                     * @param {PoonyaPrototype} proto название поля, которое устанавливаем
                     * @public
                     * @method
                     */

                    expandPrototype(proto) {
                        if (
                            Object.prototype.isPrototypeOf.call(
                                PoonyaPrototype,
                                proto
                            )
                        ) {
                            if (this._fields.has(proto.name)) {
                                this._fields.get(proto.name).expand(proto);
                            } else {
                                this._fields.set(proto.name, proto);
                            }
                        } else {
                            throw new Error(
                                `Only PoonyaPrototype instance can be passed as a prototype.`
                            );
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
                        const lib =
                            __webpack_require__.g[NAMESPACE][
                                Symbol.for('Modules')
                            ][Symbol.for(ident)];

                        if (lib != null) {
                            this._fields.set(lib.namespace, lib);
                        } else {
                            throw new Error(
                                `Can't find library with identifier ${ident}`
                            );
                        }
                    }
                    /**
                     * Вызывается для преобразования библиотеки в модуль памяти, к которому в последствии можно будет получить доступ
                     *
                     * Ипорт происходит синхронно, поэтому нет нужды в фуекции `resolve`
                     *
                     * [1] - Пояснение
                     * createObject - фукнция, котрая создает объект из текущего прототипа, который должен быть был ранее зарегистрирован в памяти.
                     * Асинхронность, а следовательно функция resolve, тут нужна только если путь к прототипу представляет из себя выражение, где могут быть асинхрнонные
                     * функции. Тут их нет, объекты создаются из общепринятых прототипов, поэтому callback вызывается невыходя из функции - синхрнно.
                     *
                     * @param {PoonyaObject|Heap} parent хип памяти, или родительский объект в который нужно ипортировать библиотеку
                     * @param {iContext} context контект, в котором будет использоватся эта библиотека
                     * @param {Function} reject функция, которая будет вызвана при ошибке.
                     * @public
                     * @method
                     */

                    importTo(parent, context, reject) {
                        for (let [key, value] of this._fields) {
                            switch (typeof value) {
                                case 'bigint':
                                    if (isNaN(value))
                                        // [1]
                                        context.createObject(
                                            null,
                                            -1,
                                            SERVICE.CONSTRUCTORS.NULL,
                                            reject,
                                            new Array(),
                                            (result) =>
                                                parent.set(context, key, result)
                                        );
                                    // [1]
                                    else
                                        context.createObject(
                                            value,
                                            -1,
                                            SERVICE.CONSTRUCTORS.INTEGER,
                                            reject,
                                            new Array(),
                                            (result) =>
                                                parent.set(context, key, result)
                                        );
                                    break;

                                case 'number':
                                    if (isNaN(value))
                                        // [1]
                                        context.createObject(
                                            null,
                                            -1,
                                            SERVICE.CONSTRUCTORS.NULL,
                                            reject,
                                            new Array(),
                                            (result) =>
                                                parent.set(context, key, result)
                                        );
                                    // [1]
                                    else
                                        context.createObject(
                                            value,
                                            -1,
                                            SERVICE.CONSTRUCTORS.NUMBER,
                                            reject,
                                            new Array(),
                                            (result) =>
                                                parent.set(context, key, result)
                                        );
                                    break;

                                case 'string':
                                    // [1]
                                    context.createObject(
                                        value,
                                        -1,
                                        SERVICE.CONSTRUCTORS.STRING,
                                        reject,
                                        new Array(),
                                        (result) =>
                                            parent.set(context, key, result)
                                    );
                                    break;

                                case 'symbol':
                                    // [1]
                                    context.createObject(
                                        Symbol.keyFor(value),
                                        -1,
                                        SERVICE.CONSTRUCTORS.STRING,
                                        reject,
                                        new Array(),
                                        (result) =>
                                            parent.set(context, key, result)
                                    );
                                    break;

                                case 'function':
                                    if (
                                        Object.prototype.isPrototypeOf.call(
                                            PoonyaPrototype,
                                            value
                                        )
                                    ) {
                                        parent.set(
                                            context,
                                            (value = new value(context, reject))
                                                .name,
                                            value
                                        );
                                    } else {
                                        parent.set(
                                            context,
                                            key,
                                            new NativeFunction(value)
                                        );
                                    }

                                    break;

                                case 'boolean':
                                    // [1]
                                    context.createObject(
                                        value,
                                        -1,
                                        SERVICE.CONSTRUCTORS.BOOLEAN,
                                        reject,
                                        new Array(),
                                        (result) =>
                                            parent.set(context, key, result)
                                    );
                                    break;

                                case 'undefined':
                                case 'object':
                                    if (value == null)
                                        // [1]
                                        context.createObject(
                                            null,
                                            -1,
                                            SERVICE.CONSTRUCTORS.NULL,
                                            reject,
                                            new Array(),
                                            (result) =>
                                                parent.set(context, key, result)
                                        );
                                    else {
                                        if (
                                            value instanceof PoonyaStaticLibrary
                                        ) {
                                            // [1]
                                            context.createObject(
                                                null,
                                                -1,
                                                SERVICE.CONSTRUCTORS.OBJECT,
                                                reject,
                                                new Array(),
                                                (target) => {
                                                    value.importTo(
                                                        target,
                                                        context,
                                                        reject
                                                    );
                                                    parent.set(
                                                        context,
                                                        key,
                                                        target
                                                    );
                                                }
                                            );
                                        } else if (value instanceof Array) {
                                            // [1]
                                            context.createObject(
                                                value,
                                                -1,
                                                SERVICE.CONSTRUCTORS.ARRAY,
                                                reject,
                                                new Array(),
                                                (result) =>
                                                    parent.set(
                                                        context,
                                                        key,
                                                        result
                                                    )
                                            );
                                        } else {
                                            // [1]
                                            context.createObject(
                                                value,
                                                -1,
                                                SERVICE.CONSTRUCTORS.OBJECT,
                                                reject,
                                                new Array(),
                                                (result) =>
                                                    parent.set(
                                                        context,
                                                        key,
                                                        result
                                                    )
                                            );
                                        }
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
                    lib_id = Symbol.for(lib_id);

                    if (
                        __webpack_require__.g[NAMESPACE][modules][lib_id] ==
                        null
                    ) {
                        __webpack_require__.g[NAMESPACE][modules][
                            lib_id
                        ] = lib_object;
                    } else if (
                        override &&
                        __webpack_require__.g[NAMESPACE][modules][lib_id] !=
                            null
                    ) {
                        Object.assign(
                            __webpack_require__.g[NAMESPACE][modules][lib_id],
                            lib_object
                        );
                    } else {
                        throw new TypeError(
                            'Library, with this id already imported. For ' +
                                lib_id.toString()
                        );
                    }
                };
                /**
                 * Функция, которая возвращает библиотеку при импорте
                 *
                 * @memberof Poonya.Import
                 * @function Import
                 *
                 * @param {string[]} import_statements Массив с идентификаторами библиотек
                 *
                 * @protected
                 */

                let Import = (import_statements) => {
                    if (!(import_statements instanceof Array))
                        throw new TypeError('import_statements must be Array');
                    const statements = new Array();

                    for (
                        let i = 0, leng = import_statements.length;
                        i < leng;
                        i++
                    ) {
                        statements.push(
                            __webpack_require__.g[NAMESPACE][modules][
                                Symbol.for(import_statements[i])
                            ]
                        );
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

                let ImportFile = async () => {};
                /*LIQUID*/

                function crequire(id) {
                    if (id === 'poonya') {
                        return __webpack_require__(40);
                    } else {
                        throw new Error('Unknown module ' + id);
                    }
                }

                ImportFile = (lib_dir, file) => {
                    const path = lib_dir + '/' + file;
                    return new Promise((res, rej) => {
                        try {
                            fetch(path, {
                                method: 'GET',
                            })
                                .then((responce) => responce.text())
                                .then((responce) =>
                                    res(
                                        new Function(
                                            'require',
                                            `"use strict";${wait}`
                                        )(crequire)
                                    )
                                );
                        } catch (e) {
                            rej(new IOError(path));
                        }
                    });
                };
                /*LIQUID-END*/

                module.exports.Import = Import;
                module.exports.ImportFile = ImportFile;
                module.exports.PoonyaStaticLibrary = PoonyaStaticLibrary;

                /***/
            },

            /***/ 359: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/Token.js
                 * @description Содержит в себе класс вхождение лексера, массив которых получается на выходе из лексера
                 * @author Astecom
                 */

                const { CHARTYPE } = __webpack_require__(351),
                    { fromBytes } = __webpack_require__(88);
                /**
                 * @lends Token
                 * @class
                 */

                class Token {
                    /**
                     * Вхождение лексера
                     *
                     * @param {CHARTYPE} type тип выхождения
                     * @param {Array} data Данные вхождения
                     * @param {Number} position Позиция вхождения
                     * @param {String} s_separator Дополнительное окружение вхождения, допустим для строки это ''
                     * @constructs Token
                     * @memberof Poonya.Lexer
                     * @protected
                     */
                    constructor(type, data, position, s_separator) {
                        this.type = type;
                        this.data = fromBytes(data);
                        this.position =
                            position - data.length > 0
                                ? position - data.length + 1
                                : 0;
                        this.leng = data.length;
                        this.string_separator =
                            s_separator != null
                                ? String.fromCharCode(s_separator)
                                : null;

                        if (s_separator != null) {
                            //
                            // 4 байта, 2 символа.
                            //
                            this.position -= 4;
                        }
                    }
                    /**
                     * Сравнивает текущее вхождение с преданным `t` типом и `s` содержанием.
                     *
                     * @param {CHARTYPE} t Тип с которым нужно сравнить текущее вхождение
                     * @param {?String|String[]} s содержание с котрым необходимо сравнить текущее вхождение
                     * @returns {Boolean}
                     */

                    equals(t, s) {
                        return (
                            t == this.type &&
                            (s != null
                                ? Array.isArray(s)
                                    ? s.includes(this.toString())
                                    : this.toString() == s
                                : true)
                        );
                    }
                    /**
                     * Сравнивает текущее вхождение с преданным `s` содержанием.
                     *
                     * @param {?String|String[]} s содержание с котрым необходимо сравнить текущее вхождение
                     * @returns {Boolean}
                     */

                    contentEquals(s) {
                        return Array.isArray(s)
                            ? s.includes(this.toRawString())
                            : this.toRawString() == s;
                    }
                    /**
                     * Преобразует вхождение в строку
                     *
                     * @public
                     * @method
                     */

                    toString() {
                        return this.type != CHARTYPE.STRING
                            ? this.data
                            : this.string_separator +
                                  this.data +
                                  this.string_separator;
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

                module.exports = Token;

                /***/
            },

            /***/ 94: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/lexer.js
                 * @description Содержит в себе лексер, который преобразует строку в набор токенов.
                 * @author Astecom
                 */

                const {
                    CriticalLexerErrorUnexpectedEndOfInputException,
                } = __webpack_require__(943);

                const { CHARTYPE } = __webpack_require__(351),
                    Token = __webpack_require__(359);

                const { throwError, fromBytes } = __webpack_require__(88);
                /**
                 * Лексер, который производит лексический разбор подаваемого текста в буффере
                 *
                 * @param {Buffer|UInt8Array|Array} input Вход с `сырыми` данными
                 * @param {Boolean} allow_spaces разрешены ли пробелы, если `false`, то лексер вернет ответ без пробелов
                 * @param {Number} offset - смещение позиции байтов
                 *
                 * @memberof Poonya.Lexer
                 * @protected
                 */

                function lexer(input, allow_spaces = true, offset = 0) {
                    if (!Array.isArray(input)) {
                        throw TypeError(
                            'Only array-like data can be input to the lexer'
                        );
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
                        buff.push(input[index], input[index + 1]);
                    }; //
                    // Проверяет первый записанный символ текущего токена
                    //

                    const firstIs = (...is) => {
                        return is.includes(buff[1]);
                    }; //
                    // Проверяет последний записанный символ текущего токена
                    //

                    const lastIs = (...is) => {
                        return is.includes(buff[buff.length - 1]);
                    };

                    for (let i = 0, leng = input.length; i < leng; i += 2) {
                        //
                        // Строка кодируется по 2 байта, если первый байт не 0, значит символ выходит за пределы ascii,
                        // а значит не может является ничем кроме вхождения типа слова
                        //
                        if (input[i] != 0) cur = CHARTYPE.WORD;
                        else
                            switch (input[i + 1]) {
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
                            } //
                        // Тут обрабатываю все на типа
                        // 5. - цифра и точка
                        // \n\n - два переноса объединяем в один
                        // d4 - если сначала идет слово а потом цифра объединяем все это в слово
                        //

                        if (
                            (cur === CHARTYPE.NEWLINE &&
                                last === CHARTYPE.NEWLINE) ||
                            (cur === CHARTYPE.POINT &&
                                last === CHARTYPE.NUMBER) ||
                            (cur === CHARTYPE.NUMBER && last === CHARTYPE.WORD)
                        ) {
                            append(i);
                            continue;
                        } // Префиксы чисел

                        if (
                            cur === CHARTYPE.NUMBER &&
                            last === CHARTYPE.OPERATOR &&
                            firstIs(43, 45) &&
                            (last_token == null ||
                                last_token.type != CHARTYPE.NUMBER)
                        ) {
                            last = cur;
                            append(i);
                            continue;
                        } // Если предыдущий и текущий тип символов это операторы

                        if (
                            cur === CHARTYPE.OPERATOR &&
                            last === CHARTYPE.OPERATOR
                        ) {
                            if (
                                buff.length === 2 && // В буффере не больше одного символа
                                firstIs(33, 60, 62) &&
                                input[i] === 0 &&
                                input[i + 1] === 61 // текущий символ '='
                            ) {
                                append(i);
                                if (allow_spaces || last !== CHARTYPE.SPACE)
                                    Export.push(
                                        (last_token = new Token(
                                            last,
                                            buff,
                                            offset + i,
                                            string_entry
                                        ))
                                    );
                                string_entry = null;
                                clear(i);
                                last = undefined;
                                if (i + 1 === leng) return Export;
                                continue;
                            }

                            if (
                                input[i] === 0 &&
                                buff.length === 2 && // В буффере не больше одного символа
                                firstIs(47) // Предыдущий символ это /
                            ) {
                                if (
                                    input[i + 1] === 47 // Текущий символ это /
                                ) {
                                    is_comment = true;
                                    is_multiline = false;
                                    continue;
                                } else if (
                                    input[i + 1] === 62 // Текущий символ это >
                                ) {
                                    is_comment = true;
                                    is_multiline = true;
                                    continue;
                                }
                            }
                        }

                        if (!is_string && !is_comment) {
                            if (
                                (cur !== last ||
                                    last === CHARTYPE.STRING ||
                                    last === CHARTYPE.OPERATOR) &&
                                last != null
                            ) {
                                if (allow_spaces || last !== CHARTYPE.SPACE)
                                    Export.push(
                                        (last_token = new Token(
                                            last,
                                            buff,
                                            offset + i,
                                            string_entry
                                        ))
                                    );
                                string_entry = null;
                                clear(i);
                            }

                            if (cur === CHARTYPE.STRING) {
                                is_string = true;
                                string_entry = input[i + 1];
                                last = cur;
                                continue;
                            }

                            append(i);
                            last = cur;
                        } else if (is_comment) {
                            if (is_multiline) {
                                if (
                                    input[i] === 0 &&
                                    input[i + 1] === 47 && // Текущий символ это /
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
                            if (
                                cur === CHARTYPE.STRING &&
                                input[i + 1] === string_entry &&
                                input[i] === 0
                            ) {
                                is_string = false;
                                last = cur;
                                continue;
                            }

                            append(i);
                            last = cur;
                        }
                    }

                    if (is_comment || is_string) {
                        throwError.call(
                            {
                                input: fromBytes(input),
                            },
                            offset + input.length - 1,
                            new CriticalLexerErrorUnexpectedEndOfInputException()
                        );
                    }

                    if (
                        !is_comment &&
                        (allow_spaces || cur !== CHARTYPE.SPACE) &&
                        buff.length != 0
                    )
                        Export.push(
                            new Token(
                                cur,
                                buff,
                                offset + input.length - buff.length - 1,
                                string_entry
                            )
                        );
                    return Export;
                }

                module.exports = lexer;

                /***/
            },

            /***/ 700: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                const { toBytes, fromBytes } = __webpack_require__(88);

                module.exports = class ChunkData {
                    constructor(name, raw, from) {
                        this.name = name;
                        this.raw = toBytes(raw);
                        this.from = from;
                        this.to = from + this.raw.length * 2;
                    }
                    /**
                     * Проверяет поизию токена, на принадлежность к текйщему чанку
                     *
                     * @param {Number} position позиция токена
                     * @returns true если приндалежит false если не приндалежит
                     */

                    isOwnChunckPosition(position) {
                        return position >= this.from && position <= this.to;
                    }

                    toString() {
                        return fromBytes(this.raw);
                    }
                };

                /***/
            },

            /***/ 946: /***/ (module) => {
                module.exports = class LinkerData {
                    constructor(contents, chuncks) {
                        this.contents = contents;
                        this.chuncks = chuncks;
                    }
                    /**
                     * исходя из позиции токена возвращает тот чанк которому он принадлежит.
                     *
                     * @param {Number} position позиция токена для которой нужно получить чанк
                     * @returns
                     */

                    getOwnChunck(position) {
                        for (const chunck of this.chuncks) {
                            if (chunck.isOwnChunckPosition(position)) {
                                return chunck;
                            }
                        }

                        return null;
                    }
                };

                /***/
            },

            /***/ 478: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/linker.js
                 * @description Содержит в себе линкер, который позваоляет импортировать содержимое других файлов в исполняему последовательность poonya
                 * @author Astecom
                 */

                const { maybeEquals } = __webpack_require__(88),
                    { CHARTYPE } = __webpack_require__(351),
                    { IOError } = __webpack_require__(943),
                    Exceptions = __webpack_require__(943),
                    lexer = __webpack_require__(94),
                    ChunkData = __webpack_require__(700),
                    LinkerData = __webpack_require__(946);
                /**
                 * Препроцессораня функция, линкует файлы.
                 *
                 * @param {Array<Token>} data данные для парсинга
                 * @param {String} passed_parent_path Путь к файлу, который сейчас обрабатываем
                 * @param {Function} reject Фукцния выбрасывания ошибок
                 *
                 * @memberof Poonya.Linker
                 * @returns {LinkerData}
                 * @protected
                 * @async
                 */

                async function linker(data, passed_parent_path, reject) {
                    const r_data = new LinkerData(data, []);

                    for (let i = 0; ; i++) {
                        if (data[i] == null) {
                            return r_data;
                        }

                        if (data[i].equals(CHARTYPE.WORD, 'include')) {
                            if (
                                maybeEquals(data, i + 1, CHARTYPE.NEWLINE) &&
                                data[i + 1].equals(CHARTYPE.STRING)
                            ) {
                                let path,
                                    content,
                                    chunck = r_data.getOwnChunck(
                                        data[i].position
                                    ),
                                    parent_path =
                                        chunck == null
                                            ? passed_parent_path
                                            : chunck.name;
                                /*LIQUID*/

                                path =
                                    window.location.origin +
                                    '/' +
                                    parent_path
                                        .split('/')
                                        .slice(0, -1)
                                        .join('/') +
                                    '/' +
                                    data[i + 1].data.toString();
                                path =
                                    path.split('/').pop().split('.').length > 0
                                        ? path
                                        : path + '.po';
                                content = fetch(path, {
                                    method: 'GET',
                                }).then((e) => e.text());
                                /*LIQUID-END*/

                                if (path == parent_path) {
                                    reject(
                                        data[i].position,
                                        new Exceptions.IsRecursiveLink(
                                            parent_path
                                        )
                                    );
                                }

                                if (parent_path != null) {
                                    try {
                                        const chunck = new ChunkData(
                                            path,
                                            await content,
                                            data[i].position
                                        );
                                        const lexed = lexer(chunck.raw, false);
                                        const last_pos =
                                            lexed[lexed.length - 1].position;

                                        for (const current of data.slice(i)) {
                                            current.position += last_pos;
                                        }

                                        for (const current of lexed) {
                                            current.position +=
                                                data[i].position;
                                        }

                                        data.splice(
                                            i,
                                            data[i-- + 2].equals(
                                                CHARTYPE.OPERATOR,
                                                ';'
                                            )
                                                ? 3
                                                : 2,
                                            ...lexed
                                        );
                                        r_data.chuncks.push(chunck);
                                    } catch (e) {
                                        reject(
                                            data[i].position,
                                            new Exceptions.LinkerIOError(path)
                                        );
                                    }
                                } else {
                                    reject(
                                        data[i].position,
                                        new Exceptions.LinkerPathNotGiveExceptrion()
                                    );
                                }
                            }
                        }
                    }
                }

                module.exports = linker;

                /***/
            },

            /***/ 938: /***/ (module) => {
                module.exports = class ParserData {
                    constructor(linker_data, sequense) {
                        this.linker_data = linker_data;
                        this.sequense = sequense;
                    }
                };

                /***/
            },

            /***/ 190: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/parser.js
                 * @description Содержит в себе парсер исходного кода poonya, на выходе экспортируемых функций можно получить либо выражение, либо главную исполняемую последовательность
                 * @author Astecom
                 */

                const {
                        PoonyaException,
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
                        CriticalParserErrorNoRawDataTransmittedException,
                        CriticalParserErrorUnexpectedEndOfExpression,
                        ParserUnfinishedNotationException,
                    } = __webpack_require__(943),
                    {
                        maybeEquals,
                        countKeys,
                        throwError,
                        toBytes,
                    } = __webpack_require__(88),
                    { CHARTYPE, SERVICE } = __webpack_require__(351),
                    ParserData = __webpack_require__(938),
                    UseStatement = __webpack_require__(887),
                    FunctionCall = __webpack_require__(79),
                    ObjectContructorCall = __webpack_require__(657),
                    TernarOperator = __webpack_require__(923),
                    ExpressionGroup = __webpack_require__(515),
                    GetOperator = __webpack_require__(346),
                    IfStatement = __webpack_require__(602),
                    SequenceGroup = __webpack_require__(530),
                    OutStatement = __webpack_require__(254),
                    WhileStatement = __webpack_require__(267),
                    RepeatStatement = __webpack_require__(91),
                    SetStatement = __webpack_require__(859),
                    ResetStatement = __webpack_require__(498),
                    PushStatement = __webpack_require__(505),
                    SequenceMainGroup = __webpack_require__(404),
                    GroupOutStatement = __webpack_require__(281),
                    BreakStatement = __webpack_require__(707),
                    ContinueStatement = __webpack_require__(914),
                    linker = __webpack_require__(478),
                    lexer = __webpack_require__(94),
                    LinkerData = __webpack_require__(946);

                const KEYWORDS = ['true', 'false', 'null'];
                /**
                 * Парсит вызов функции, возвращает объект вызова функции, и позицию с которой можно продолжить прасинг
                 *
                 * @param {Array<String|Number>} query_stack стек доступа к имени переменной
                 * @param {Number} start Начальная позиция разбора, для выражения
                 * @param {Array<Token>} data Вхождения которые будут обработаны парсером
                 * @param {Number} block_start Начальная позиция вызова
                 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
                 *
                 * @returns {{data: FunctionCall, jump: Number}} объект вызова функции, и позиция с которой можно продолжить прасинг
                 *
                 * @memberof Poonya.Parser
                 * @protected
                 */

                function parseFunctionCall(
                    query_stack,
                    start,
                    data,
                    reject,
                    block_start
                ) {
                    const args = segmentationParser(
                        start,
                        data,
                        reject,
                        ',',
                        Infinity,
                        `(${query_stack
                            .map((e) => (typeof e === 'number' ? `[${e}]` : e))
                            .join(' => ')})()`
                    );
                    return {
                        data: new FunctionCall(
                            query_stack,
                            args.data,
                            block_start
                        ),
                        jump: args.jump,
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
                 * @param {Array<Token>} data Вхождения которые будут обработаны парсером
                 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
                 *
                 * @returns {{data: ObjectContructorCall, jump: Number}} объект тернарного выражения, и позиция с которой можно продолжить прасинг
                 *
                 * @memberof Poonya.Parser
                 * @protected
                 */

                function parseObject(
                    query_stack,
                    start,
                    data,
                    reject,
                    level = 0
                ) {
                    let result = null,
                        count = 0,
                        entries = new Array([]),
                        last_row = start,
                        expected = 0; // Ожидаемое следующие значение

                    for (let i = start; ; i++) {
                        switch (true) {
                            case data[i] === undefined ||
                                (expected === 3 &&
                                    !data[i].equals(CHARTYPE.OPERATOR, ',')) ||
                                data[i].equals(CHARTYPE.OPERATOR, [';', ')']):
                                if (entries.length == 1) {
                                    if (entries[entries.length - 1].length == 0)
                                        reject(
                                            data[i].position,
                                            new ParserUnfinishedNotationException()
                                        );
                                    else if (
                                        entries[entries.length - 1].length == 1
                                    )
                                        return {
                                            data: new ObjectContructorCall(
                                                query_stack,
                                                entries[0][0],
                                                data[start].position
                                            ),
                                            jump: i - start,
                                        };
                                    else
                                        return {
                                            data: new ObjectContructorCall(
                                                query_stack,
                                                new Map(entries),
                                                data[start].position
                                            ),
                                            jump: i - start,
                                        };
                                } else {
                                    if (entries[entries.length - 1].length != 2)
                                        reject(
                                            data[i].position,
                                            new ParserUnfinishedNotationException()
                                        );
                                    return {
                                        data: new ObjectContructorCall(
                                            query_stack,
                                            new Map(entries),
                                            data[start].position
                                        ),
                                        jump: i - start,
                                    };
                                }

                            case data[i].equals(CHARTYPE.OPERATOR, '*') &&
                                expected === 0:
                                if (entries.length !== 1)
                                    reject(
                                        data[i].position,
                                        new BadEmptyObjectException()
                                    );
                                return {
                                    data: new ObjectContructorCall(
                                        query_stack,
                                        new Map(),
                                        data[start].position
                                    ),
                                    jump: i - start,
                                };

                            case data[i].equals(CHARTYPE.NEWLINE):
                                continue;

                            default:
                                switch (expected) {
                                    case 0:
                                        if (
                                            data[i].equals(CHARTYPE.WORD) ||
                                            data[i].equals(CHARTYPE.STRING)
                                        ) {
                                            entries[
                                                entries.length - 1
                                            ][0] = data[i].toRawString();
                                        } else if (
                                            data[i].equals(CHARTYPE.NUMBER)
                                        ) {
                                            entries[
                                                entries.length - 1
                                            ][0] = data[i].toRawString();
                                        } else {
                                            reject(
                                                data[i].position,
                                                new UnexpectedTokenException(
                                                    data[i],
                                                    '[Word]'
                                                )
                                            );
                                        }

                                        expected = 1;
                                        continue;

                                    case 1:
                                        count = countKeys(
                                            data,
                                            i,
                                            CHARTYPE.OPERATOR,
                                            '-'
                                        ); // - ('-' * level)

                                        if (count === level + 1) {
                                            i += count;

                                            if (
                                                !data[i].equals(
                                                    CHARTYPE.OPERATOR,
                                                    '>'
                                                )
                                            ) {
                                                reject(
                                                    data[i].position,
                                                    new UnexpectedTokenException(
                                                        data[i],
                                                        '>'
                                                    )
                                                );
                                            }

                                            expected = 2;
                                        } else {
                                            entries.pop();

                                            if (count < level + 1) {
                                                return {
                                                    data: new ObjectContructorCall(
                                                        query_stack,
                                                        new Map(entries),
                                                        data[start].position
                                                    ),
                                                    jump: last_row - start,
                                                };
                                            } else {
                                                reject(
                                                    data[i].position,
                                                    new BadArrowNotationJumpingToUpperLevel()
                                                );
                                            }
                                        }

                                        continue;

                                    case 2:
                                        count = countKeys(
                                            data,
                                            i + 1,
                                            CHARTYPE.OPERATOR,
                                            '-'
                                        ); /// Если как значение передан инициализатор другого объекта
                                        ///
                                        /// some ->
                                        ///     some1 --> 'some',

                                        if (
                                            data[i + level + 3] != null &&
                                            (data[i].equals(CHARTYPE.WORD) ||
                                                data[i].equals(
                                                    CHARTYPE.NUMBER
                                                )) &&
                                            count === level + 2 &&
                                            data[i + level + 3].equals(
                                                CHARTYPE.OPERATOR,
                                                '>'
                                            )
                                        ) {
                                            result = parseObject(
                                                SERVICE.CONSTRUCTORS.OBJECT,
                                                i,
                                                data,
                                                reject,
                                                level + 1
                                            );
                                            i += result.jump - 1;
                                            entries[entries.length - 1][1] =
                                                result.data;
                                            expected = 3; /// Неправильная нотация
                                            /// Попытка произвести нотация на два уровня выше чем родительская
                                            ///
                                        } else if (count > level + 2) {
                                            reject(
                                                data[i + 1].position,
                                                new BadArrowNotationJumpingTwoLevels()
                                            ); /// Если как значение передано выражение
                                            ///
                                            /// some -> 'somesome...';
                                        } else {
                                            result = parseExpression(
                                                i,
                                                data,
                                                reject,
                                                [',', ';']
                                            ); // Текущие данные ставим как результат парсинга выражения

                                            entries[entries.length - 1][1] =
                                                result.data; // Ожидаем следующий маркер

                                            expected = 3; // Отматываем маркер пасинга назад

                                            if (
                                                data[i].equals(
                                                    CHARTYPE.OPERATOR,
                                                    ';'
                                                )
                                            ) {
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
                 * @param {Array<Token>} data Вхождения которые будут обработаны парсером
                 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
                 *
                 * @returns {{data: TernarOperator, jump: Number}} объект тернарного выражения, и позиция с которой можно продолжить прасинг
                 *
                 * @memberof Poonya.Parser
                 * @protected
                 */

                function parseTernar(condition, start, data, reject) {
                    let hook_index = 0,
                        buffer = new Array(),
                        args = new Array();

                    function push(token) {
                        if (buffer.length !== 0) {
                            args.push(parseExpression(0, buffer, reject).data);
                            buffer.splice(0, buffer.length);
                        } else {
                            reject(
                                token != undefined
                                    ? token.position
                                    : data[start].position,
                                new ParserEmtyArgumentException()
                            );
                        }
                    }

                    for (let i = start; ; i++) {
                        switch (true) {
                            case data[i] === undefined ||
                                data[i].equals(CHARTYPE.OPERATOR, ';') ||
                                data[i].equals(CHARTYPE.NEWLINE) ||
                                (data[i].equals(CHARTYPE.OPERATOR, ')') &&
                                    hook_index <= 0):
                                push(data[i]);
                                if (
                                    args[0] === undefined ||
                                    args[1] === undefined
                                )
                                    reject(
                                        data[start].position,
                                        new ParserEmtyArgumentException()
                                    );
                                return {
                                    data: new TernarOperator(
                                        condition,
                                        args[0],
                                        args[1]
                                    ),
                                    jump:
                                        i -
                                        start -
                                        (data[i] &&
                                        data[i].equals(CHARTYPE.OPERATOR, ')')
                                            ? 1
                                            : 0),
                                };

                            case data[i].equals(CHARTYPE.OPERATOR, '('):
                                buffer.push(data[i]);
                                hook_index++;
                                break;

                            case data[i].equals(CHARTYPE.OPERATOR, ')'):
                                buffer.push(data[i]);
                                hook_index--;
                                break;

                            case data[i].equals(CHARTYPE.OPERATOR, ':') &&
                                hook_index === 0 &&
                                args.length === 0:
                                push(data[i]);
                                break;

                            case data[i].equals(CHARTYPE.OPERATOR, ':') &&
                                hook_index === 0 &&
                                args.length !== 0:
                                reject(
                                    data[i].position,
                                    new ParserLogicException()
                                );
                                break;

                            default:
                                buffer.push(data[i]);
                                break;
                        }
                    }
                }
                /**
                 * Парсит групповой вывод <formatter?> <-? {  }
                 *
                 * @param {Number} start Начальная позиция разбора, для выражения
                 * @param {Array<Token>} data Вхождения которые будут обработаны парсером
                 * @param {?Array<String | ExpressionGroup>} path путь к обработчику, опционально
                 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
                 *
                 * @returns {{data: GroupOutStatement, jump: Number}} массив со стэком запроса, по которому можно получит доступ к переменной, и позиция с которой можно продолжить парсинг
                 *
                 * @memberof Poonya.Parser
                 * @protected
                 */

                function parseGroupOut(entries, start, path, reject) {
                    const segments = segmentCutter(start, entries, reject);
                    return {
                        data: new GroupOutStatement(segments.data, path, start),
                        jump: segments.jump,
                    };
                }
                /**
                 * Парсит название, позвращает массив со стэком запроса, по которому можно получит доступ к переменной, и позицию с которой можно продолжить парсинг
                 *
                 * @param {Number} start Начальная позиция разбора, для выражения
                 * @param {Array<Token>} data Вхождения которые будут обработаны парсером
                 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
                 *
                 * @returns {{data: Array<Number|String>, jump: Number}} массив со стэком запроса, по которому можно получит доступ к переменной, и позиция с которой можно продолжить парсинг
                 *
                 * @memberof Poonya.Parser
                 * @protected
                 */

                function parseVarName(start, data, reject) {
                    let buffer = new Array(),
                        point_before = true,
                        hook_index = 0,
                        hook_start = 0;
                    if (data.length === 0)
                        return {
                            data: [],
                            jump: 0,
                        };

                    for (let i = start; ; i++) {
                        maybeEquals(data, i, CHARTYPE.NEWLINE);

                        switch (true) {
                            case data[i] == null ||
                                (point_before &&
                                    !data[i].equals(CHARTYPE.WORD)) ||
                                (!point_before &&
                                    !data[i].equals(CHARTYPE.OPERATOR, '[') &&
                                    !data[i].equals(CHARTYPE.POINT)):
                                return {
                                    data: buffer,
                                    jump: i - start,
                                };

                            case data[i].equals(CHARTYPE.WORD) && point_before:
                                buffer.push(data[i].toString());
                                point_before = !point_before;
                                continue;

                            case data[i].equals(CHARTYPE.POINT) &&
                                !point_before:
                                point_before = !point_before;
                                continue;

                            case data[i].equals(CHARTYPE.OPERATOR, '[') &&
                                !point_before:
                                i++; // Индекс скобок

                                hook_index = 0; // Позиция начала парсинга

                                hook_start = i; //
                                // ...[3 + 4 + 5]...
                                //    ^^^^^^^^^^

                                while (
                                    data[i] != null &&
                                    !(
                                        data[i].equals(
                                            CHARTYPE.OPERATOR,
                                            ']'
                                        ) && hook_index === 0
                                    )
                                ) {
                                    if (
                                        data[i].equals(CHARTYPE.OPERATOR, '[')
                                    ) {
                                        hook_index++;
                                    } else if (
                                        data[i].equals(CHARTYPE.OPERATOR, ']')
                                    ) {
                                        hook_index--;
                                    }

                                    i++;
                                }

                                if (hook_index != 0) {
                                    reject(
                                        data[i].position,
                                        new ParserLogicException()
                                    );
                                } //
                                // Вставляем выражение как оператор доступа
                                //

                                buffer.push(
                                    parseExpression(
                                        0,
                                        data.slice(hook_start, i),
                                        reject
                                    ).data
                                );
                                continue;

                            default:
                                reject(
                                    data[i].position,
                                    new InvalidSequenceForLetiableAccessException()
                                );
                                continue;
                        }
                    }
                }
                /**
                 * Парсит выражение, позвращает выражение и позицию, с которой можно продолжить парсинг
                 *
                 * @param {Number} start Начальная позиция разбора, для выражения
                 * @param {Array<Token>} entries Вхождения которые будут обработаны парсером
                 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
                 * @param {String} end_marker Маркер конца выражения
                 *
                 * @returns {{data: ExpressionGroup, jump: Number}} выражение и позиция, с которой можно продолжить парсинг
                 *
                 * @memberof Poonya.Parser
                 * @protected
                 */

                function parseExpression(
                    start,
                    entries,
                    reject,
                    end_marker = ';'
                ) {
                    if (entries.length === 0)
                        return {
                            data: new ExpressionGroup(0),
                            jump: 0,
                        };
                    const buffer = new ExpressionGroup(entries[0].position),
                        result = new Array();

                    for (let i = start; ; i++) {
                        if (
                            entries[i] == undefined ||
                            entries[i].equals(CHARTYPE.OPERATOR, ')') ||
                            entries[i].contentEquals(end_marker)
                        ) {
                            if (buffer.isNotDone())
                                reject(
                                    entries[i - 1].position,
                                    entries[i] == undefined
                                        ? new CriticalParserErrorUnexpectedEndOfInputException()
                                        : new CriticalParserErrorUnexpectedEndOfExpression()
                                );
                            buffer.complete(reject);
                            return {
                                data: buffer,
                                jump: i - start,
                            };
                        }

                        if (entries[i].equals(CHARTYPE.NEWLINE)) continue;

                        switch (true) {
                            // Какое-то слово
                            case entries[i].equals(CHARTYPE.WORD):
                                // Ключевые слова
                                if (KEYWORDS.includes(entries[i].toString())) {
                                    buffer.append(entries[i], reject);
                                    continue;
                                } //
                                // Если не ключевое слово, то разбираем как название перемнной
                                //

                                result[0] = parseVarName(i, entries, reject); //
                                // Проверяю следующий токен, если это (, значит впереди функция
                                //

                                if (
                                    entries[i + result[0].jump] != null &&
                                    entries[i + result[0].jump].equals(
                                        CHARTYPE.OPERATOR,
                                        '('
                                    )
                                ) {
                                    // Функция
                                    result[1] = parseFunctionCall(
                                        result[0].data,
                                        i + result[0].jump + 1,
                                        entries,
                                        reject,
                                        entries[i].position
                                    );
                                    i += result[0].jump + result[1].jump + 1;
                                    buffer.append(result[1].data, reject);
                                } else {
                                    //
                                    // Если ->, значит конструктор объектта
                                    //
                                    if (
                                        entries[i + result[0].jump + 1] != null
                                    ) {
                                        if (
                                            entries[i + result[0].jump].equals(
                                                CHARTYPE.OPERATOR,
                                                '-'
                                            )
                                        ) {
                                            if (
                                                entries[
                                                    i + result[0].jump + 1
                                                ].equals(CHARTYPE.OPERATOR, '>')
                                            ) {
                                                // Конструктор объекта
                                                result[1] = parseObject(
                                                    result[0].data,
                                                    i + result[0].jump + 2,
                                                    entries,
                                                    reject,
                                                    0
                                                );
                                                i +=
                                                    result[0].jump +
                                                    result[1].jump +
                                                    1; //
                                                // Если недопрыгнул
                                                //

                                                if (
                                                    entries[i + 1] &&
                                                    entries[i + 1].equals(
                                                        CHARTYPE.OPERATOR,
                                                        '*'
                                                    )
                                                )
                                                    i += 1;
                                                buffer.append(
                                                    result[1].data,
                                                    reject
                                                );
                                            } else {
                                                buffer.append(
                                                    new GetOperator(
                                                        entries[i].position,
                                                        result[0].data
                                                    ),
                                                    reject
                                                );
                                                i += result[0].jump - 1;
                                            } //
                                            // Если <-, значит групповой вывод
                                            //
                                        } else if (
                                            entries[i + result[0].jump].equals(
                                                CHARTYPE.OPERATOR,
                                                '<'
                                            )
                                        ) {
                                            if (
                                                entries[
                                                    i + result[0].jump + 1
                                                ].equals(CHARTYPE.OPERATOR, '-')
                                            ) {
                                                result[1] = parseGroupOut(
                                                    entries,
                                                    i + result[0].jump + 3,
                                                    result[0].data,
                                                    reject
                                                );
                                                i +=
                                                    result[0].jump +
                                                    result[1].jump +
                                                    1;
                                                buffer.append(
                                                    result[1].data,
                                                    reject
                                                );
                                            } else {
                                                buffer.append(
                                                    new GetOperator(
                                                        entries[i].position,
                                                        result[0].data
                                                    ),
                                                    reject
                                                );
                                                i += result[0].jump - 1;
                                            }
                                        } else {
                                            buffer.append(
                                                new GetOperator(
                                                    entries[i].position,
                                                    result[0].data
                                                ),
                                                reject
                                            );
                                            i += result[0].jump - 1;
                                        }
                                    } else {
                                        buffer.append(
                                            new GetOperator(
                                                entries[i].position,
                                                result[0].data
                                            ),
                                            reject
                                        );
                                        i += result[0].jump - 1;
                                    }
                                }

                                continue;
                            //
                            // Конструктор объекта
                            //

                            case entries[i + 1] != null &&
                                entries[i + 1].equals(CHARTYPE.OPERATOR, '>') &&
                                maybeEquals(entries, i + 2, CHARTYPE.NEWLINE) &&
                                entries[i].equals(CHARTYPE.OPERATOR, '-'):
                                result[0] = parseObject(
                                    SERVICE.CONSTRUCTORS.OBJECT,
                                    i + 2,
                                    entries,
                                    reject,
                                    0
                                );
                                i += result[0].jump + 2;
                                buffer.append(result[0].data, reject);
                                continue;
                            //
                            // Групповой вывод (без обработчика)
                            //

                            case entries[i].equals(CHARTYPE.OPERATOR, '{'):
                                result[0] = parseGroupOut(
                                    entries,
                                    i + 1,
                                    null,
                                    reject
                                );
                                i += result[0].jump + 1;
                                buffer.append(result[0].data, reject);
                                continue;
                            //
                            // Другая группа выражений
                            //

                            case entries[i].equals(CHARTYPE.OPERATOR, '('):
                                result[0] = parseExpression(
                                    i + 1,
                                    entries,
                                    reject
                                );
                                i += result[0].jump + 1;
                                buffer.append(result[0].data, reject);
                                continue;
                            //
                            // Тернарное выражение
                            //

                            case entries[i].equals(CHARTYPE.OPERATOR, '?'):
                                buffer.complete(reject);
                                result[0] = parseTernar(
                                    new ExpressionGroup(
                                        entries[i].position,
                                        buffer.data
                                    ),
                                    i + 1,
                                    entries,
                                    reject
                                );
                                return {
                                    data: result[0].data,
                                    jump: i - start + result[0].jump + 2,
                                };
                            //
                            // Операторы строки числа и т.д
                            //

                            case entries[i].equals(CHARTYPE.STRING) ||
                                entries[i].equals(CHARTYPE.NUMBER) ||
                                entries[i].equals(CHARTYPE.OPERATOR, [
                                    '/',
                                    '*',
                                    '+',
                                    '-',
                                    '!=',
                                    '>',
                                    '<',
                                    '>=',
                                    '<=',
                                    '=',
                                    '|',
                                    '&',
                                ]):
                                buffer.append(entries[i], reject);
                                continue;
                            //
                            // Неизвестно что это, завершаем парсинг выражения на этом
                            //

                            default:
                                if (buffer.isNotDone())
                                    reject(
                                        entries[i - 1].position,
                                        new CriticalParserErrorUnexpectedEndOfExpression()
                                    );
                                buffer.complete(reject);
                                return {
                                    data: buffer,
                                    jump: i - start,
                                };
                        }
                    }
                }
                /**
                 * Парсит исполняемый сегмент, после чего возвращает величину прыжка и данные исполнения
                 *
                 * @param {Number} start Начальная позиция разбора, для выражения
                 * @param {Array<Token>} entries Вхождения которые будут обработаны парсером
                 * @param {Function} reject {@link CodeEmitter.throwError} - Вызывается при ошибке функция, котора первым аргументом принимает позицию вхождения на котором произошла ошибка
                 * @param {String} segment_separator Разделитель для сегментов
                 * @param {Number} max_segments Максимальное число сегментов, если это число сегментов будет превышено, будет выбражено исключение
                 * @param {String} blockname Название блока
                 *
                 * @returns {{data: Array<ExpressionGroup>, jump: Number}} массив со стэком запроса, по которому можно получит доступ к переменной, и позиция с которой можно продолжить парсинг
                 *
                 * @memberof Poonya.Parser
                 * @protected
                 */

                function segmentationParser(
                    start,
                    entries,
                    reject,
                    segment_separator = ',',
                    max_segments = Infinity,
                    blockname = 'unknown'
                ) {
                    let hook_index = 0,
                        buffer = [new Array()];

                    for (let i = start; ; i++) {
                        if (
                            entries[i] != null &&
                            entries[i].equals(CHARTYPE.NEWLINE)
                        )
                            continue;

                        switch (true) {
                            case entries[i] === undefined ||
                                (entries[i].equals(CHARTYPE.OPERATOR, ')') &&
                                    hook_index <= 0):
                                if (
                                    buffer.length > 0 &&
                                    buffer[buffer.length - 1].length > 0
                                ) {
                                    buffer[buffer.length - 1] = parseExpression(
                                        0,
                                        buffer[buffer.length - 1],
                                        reject
                                    ).data;
                                } else if (buffer.length > 1) {
                                    reject(
                                        entries[i - 1].position,
                                        new SegmentationFaultEmptyArgumentException(
                                            blockname
                                        )
                                    );
                                } else {
                                    buffer.splice(buffer.length - 1, 1);
                                }

                                return {
                                    // Сегменты
                                    data: buffer,
                                    // Прыжок парсера
                                    jump: i - start,
                                };

                            case entries[i].equals(CHARTYPE.OPERATOR, '('):
                                hook_index++;
                                buffer[buffer.length - 1].push(entries[i]);
                                continue;

                            case entries[i].equals(CHARTYPE.OPERATOR, ')'):
                                if (hook_index > 0) {
                                    hook_index--;
                                    buffer[buffer.length - 1].push(entries[i]);
                                } else
                                    reject(
                                        entries[i].position,
                                        new ParserLogicException()
                                    );

                                continue;

                            case entries[i].contentEquals(segment_separator) &&
                                hook_index === 0:
                                if (buffer[buffer.length - 1].length > 0) {
                                    buffer[buffer.length - 1] = parseExpression(
                                        0,
                                        buffer[buffer.length - 1],
                                        reject
                                    ).data;
                                    buffer.push(new Array());
                                    if (buffer.length > max_segments)
                                        reject(
                                            entries[i].position,
                                            new SegmentationFaultMaximumSegmentsForBlockException(
                                                blockname
                                            )
                                        );
                                } else {
                                    reject(
                                        entries[i].position,
                                        new SegmentationFaultEmptyArgumentException(
                                            blockname
                                        )
                                    );
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
                 * ***Данные туда подаются исключая первую фигурную скобку - ...}***
                 *
                 * @param {Number} start Начальная позиция разбора, для выражения
                 * @param {Array<Token>} entries Вхождения которые будут обработаны парсером
                 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
                 *
                 * @returns {{data: Array<SequenceGroup>, jump: Number}} массив с выражениями, и позиция с которой можно продолжить парсинг
                 *
                 * @memberof Poonya.Parser
                 * @protected
                 */

                function segmentCutter(start, entries, reject) {
                    let hook_index = 0,
                        body = new Array();

                    for (let i = start; ; i++) {
                        switch (true) {
                            case entries[i] === undefined ||
                                (entries[i].equals(CHARTYPE.OPERATOR, '}') &&
                                    hook_index < 1):
                                return {
                                    // Сегменты
                                    data: codeBlockParser(0, body, reject).data,
                                    // Прыжок парсера
                                    jump: i - start,
                                };

                            case entries[i].equals(CHARTYPE.OPERATOR, '{'):
                                hook_index++;
                                body.push(entries[i]);
                                continue;

                            case entries[i].equals(CHARTYPE.OPERATOR, '}'):
                                if (hook_index-- > 0) {
                                    body.push(entries[i]);
                                } else {
                                    reject(
                                        entries[i].position,
                                        new ParserLogicException()
                                    );
                                }

                                continue;

                            default:
                                body.push(entries[i]);
                                continue;
                        }
                    }
                }
                /**
                 * Парсит блок if, возвращзает серриализованый блок if.
                 *
                 * @param {Number} start Начальная позиция разбора, для выражения
                 * @param {Array<Token>} entries Вхождения которые будут обработаны парсером
                 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
                 *
                 * @returns {{data: IfStatement, jump: Number}} Объякт дескриптор блока if, и позиция с которой можно продолжить парсинг
                 *
                 * @memberof Poonya.Parser
                 * @protected
                 */

                function ifStatementParser(start, entries, reject) {
                    let index = start,
                        result = new Array();

                    if (
                        maybeEquals(entries, index + 1, CHARTYPE.NEWLINE) &&
                        entries[index + 1].equals(CHARTYPE.OPERATOR, '(')
                    ) {
                        // statement ( ...parse... )
                        result[0] = segmentationParser(
                            index + 2,
                            entries,
                            reject,
                            '',
                            1,
                            'if'
                        );
                        index += result[0].jump + 3; // { expression }

                        if (
                            maybeEquals(entries, index, CHARTYPE.NEWLINE) &&
                            entries[index].equals(CHARTYPE.OPERATOR, '{')
                        ) {
                            result[1] = segmentCutter(
                                index + 1,
                                entries,
                                reject
                            );
                            index += result[1].jump + 1; // Else statement

                            if (
                                entries[index + 1] != null &&
                                entries[index + 1].equals(CHARTYPE.WORD, 'else')
                            ) {
                                // { expression }
                                if (
                                    maybeEquals(
                                        entries,
                                        index + 2,
                                        CHARTYPE.NEWLINE
                                    ) &&
                                    entries[index + 2].equals(
                                        CHARTYPE.OPERATOR,
                                        '{'
                                    )
                                ) {
                                    result[2] = segmentCutter(
                                        index + 3,
                                        entries,
                                        reject
                                    );
                                    index += result[2].jump + 3;
                                    return {
                                        data: new IfStatement(
                                            result[0].data[0],
                                            result[1].data,
                                            result[2].data
                                        ),
                                        jump: index - start,
                                    }; //
                                    // else if...
                                    //
                                } else if (
                                    maybeEquals(
                                        entries,
                                        index + 2,
                                        CHARTYPE.NEWLINE
                                    ) &&
                                    entries[index + 2].equals(
                                        CHARTYPE.WORD,
                                        'if'
                                    )
                                ) {
                                    result[2] = ifStatementParser(
                                        index + 2,
                                        entries,
                                        reject
                                    );
                                    index += result[2].jump + 2;
                                    return {
                                        data: new IfStatement(
                                            result[0].data[0],
                                            result[1].data,
                                            result[2].data
                                        ),
                                        jump: index - start,
                                    };
                                } else {
                                    reject(
                                        entries[index + 2].position,
                                        new UnexpectedTokenStatement(
                                            'else',
                                            entries[index + 2].toString(),
                                            '{'
                                        )
                                    );
                                }
                            } else {
                                return {
                                    data: new IfStatement(
                                        result[0].data[0],
                                        result[1].data
                                    ),
                                    jump: index - start,
                                };
                            }
                        } else {
                            reject(
                                entries[index].position,
                                new UnexpectedTokenStatement(
                                    'if',
                                    entries[index].toString(),
                                    '{'
                                )
                            );
                        }
                    } else {
                        reject(
                            entries[index + 1].position,
                            new UnexpectedTokenStatement(
                                'if',
                                entries[index + 1].toString(),
                                '('
                            )
                        );
                    }
                }
                /**
                 * Парсит тело (главное тело или секции исполняемых блоков) преобразуя вхождения в исполняемую последовательность.
                 *
                 * @param {Number} start Начальная позиция разбора, для выражения
                 * @param {Array<Token>} entries Вхождения которые будут обработаны парсером
                 * @param {Function} reject Вызываем при ошибке функция, котора первым аргументм принимает позицию вхождения на котором произошла ошибка
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

                function codeBlockParser(start, entries, reject) {
                    const buffer = new SequenceGroup(),
                        result = new Array();

                    for (let i = start, leng = entries.length; ; i++) {
                        try {
                            if (entries[i] == null) {
                                return {
                                    data: buffer,
                                    jump: i - start,
                                };
                            }

                            switch (true) {
                                case entries[i].equals(CHARTYPE.NEWLINE) ||
                                    entries[i].equals(CHARTYPE.OPERATOR, ';'):
                                    continue;

                                case entries[i].equals(CHARTYPE.OPERATOR, '>'):
                                    result[0] = parseExpression(
                                        i + 1,
                                        entries,
                                        reject
                                    );
                                    i += result[0].jump + 1;
                                    buffer.push(
                                        new OutStatement(result[0].data)
                                    );
                                    continue;

                                case entries[i].equals(CHARTYPE.WORD, 'if'):
                                    result[0] = ifStatementParser(
                                        i,
                                        entries,
                                        reject
                                    );
                                    i += result[0].jump;
                                    buffer.push(result[0].data);
                                    continue;

                                case entries[i].equals(CHARTYPE.WORD, 'use'):
                                    result[0] = parseExpression(
                                        i + 1,
                                        entries,
                                        reject
                                    );
                                    buffer.push(
                                        new UseStatement(
                                            entries[i + 1].position,
                                            result[0].data
                                        )
                                    );
                                    i += result[0].jump + 1;
                                    continue;
                                    break;

                                case entries[i].equals(CHARTYPE.WORD, 'while'):
                                    if (
                                        i + 1 < leng &&
                                        maybeEquals(
                                            entries,
                                            i + 1,
                                            CHARTYPE.NEWLINE
                                        ) &&
                                        entries[i + 1].equals(
                                            CHARTYPE.OPERATOR,
                                            '('
                                        )
                                    ) {
                                        //
                                        // statement ( ...parse... )
                                        //
                                        result[0] = segmentationParser(
                                            i + 2,
                                            entries,
                                            reject,
                                            '',
                                            1,
                                            'while'
                                        );
                                        i += result[0].jump + 3; // { expression }

                                        if (
                                            maybeEquals(
                                                entries,
                                                i,
                                                CHARTYPE.NEWLINE
                                            ) &&
                                            entries[i].equals(
                                                CHARTYPE.OPERATOR,
                                                '{'
                                            )
                                        ) {
                                            result[1] = segmentCutter(
                                                i + 1,
                                                entries,
                                                reject
                                            );
                                            i += result[1].jump + 1;
                                            buffer.push(
                                                new WhileStatement(
                                                    result[0].data[0],
                                                    result[1].data
                                                )
                                            );
                                        } else {
                                            reject(
                                                entries[i].position,
                                                new UnexpectedTokenStatement(
                                                    'while',
                                                    entries[i].toString(),
                                                    '{'
                                                )
                                            );
                                        }
                                    } else {
                                        reject(
                                            entries[i + 1].position,
                                            new UnexpectedTokenStatement(
                                                'while',
                                                entries[i + 1].toString(),
                                                '('
                                            )
                                        );
                                    }

                                    continue;

                                case entries[i].equals(CHARTYPE.WORD, 'repeat'):
                                    if (
                                        i + 1 < leng &&
                                        maybeEquals(
                                            entries,
                                            i + 1,
                                            CHARTYPE.NEWLINE
                                        ) &&
                                        entries[i + 1].equals(
                                            CHARTYPE.OPERATOR,
                                            '('
                                        )
                                    ) {
                                        //
                                        // statement ( ...parse... )
                                        //
                                        result[0] = segmentationParser(
                                            i + 2,
                                            entries,
                                            reject,
                                            [';', ','],
                                            2,
                                            'repeat'
                                        );
                                        i += result[0].jump + 3;
                                        if (result[0].data.length < 2)
                                            reject(
                                                entries[i].position,
                                                new ParserEmtyArgumentException()
                                            ); // { expression }

                                        if (
                                            maybeEquals(
                                                entries,
                                                i,
                                                CHARTYPE.NEWLINE
                                            ) &&
                                            entries[i].equals(
                                                CHARTYPE.OPERATOR,
                                                '{'
                                            )
                                        ) {
                                            result[1] = segmentCutter(
                                                i + 1,
                                                entries,
                                                reject
                                            );
                                            i += result[1].jump + 1;
                                            buffer.push(
                                                new RepeatStatement(
                                                    result[0].data[0],
                                                    result[0].data[1],
                                                    result[1].data
                                                )
                                            );
                                        } else {
                                            reject(
                                                entries[i].position,
                                                new UnexpectedTokenStatement(
                                                    'repeat',
                                                    entries[i].toString(),
                                                    '{'
                                                )
                                            );
                                        }
                                    } else {
                                        reject(
                                            entries[i + 1].position,
                                            new UnexpectedTokenStatement(
                                                'repeat',
                                                entries[i + 1].toString(),
                                                '('
                                            )
                                        );
                                    }

                                    continue;

                                case entries[i].equals(CHARTYPE.WORD, 'set'):
                                    if (
                                        i + 1 < leng &&
                                        maybeEquals(
                                            entries,
                                            i + 1,
                                            CHARTYPE.NEWLINE
                                        ) &&
                                        entries[i + 1].equals(CHARTYPE.WORD)
                                    ) {
                                        if (
                                            i + 2 < leng &&
                                            maybeEquals(
                                                entries,
                                                i + 2,
                                                CHARTYPE.NEWLINE
                                            ) &&
                                            entries[i + 2].equals(
                                                CHARTYPE.OPERATOR,
                                                '='
                                            )
                                        ) {
                                            result[0] = parseExpression(
                                                i + 3,
                                                entries,
                                                reject
                                            );
                                            buffer.push(
                                                new SetStatement(
                                                    entries[i + 1],
                                                    result[0].data
                                                )
                                            );
                                            i += result[0].jump + 3;
                                            continue;
                                        } else {
                                            reject(
                                                entries[i + 3].position,
                                                new UnexpectedWordTypeAndGetException(
                                                    entries[i + 2].toString(),
                                                    entries[i + 2].type
                                                )
                                            );
                                        }
                                    } else {
                                        reject(
                                            entries[i + 2].position,
                                            new UnexpectedWordTypeAndGetException(
                                                entries[i + 1].toString(),
                                                entries[i + 1].type
                                            )
                                        );
                                    }

                                    continue;
                                //
                                // Оператор break
                                //

                                case entries[i].equals(CHARTYPE.WORD, 'break'):
                                    buffer.push(
                                        new BreakStatement(entries[i].position)
                                    );
                                    continue;
                                //
                                // Оператор continue
                                //

                                case entries[i].equals(
                                    CHARTYPE.WORD,
                                    'continue'
                                ):
                                    buffer.push(
                                        new ContinueStatement(
                                            entries[i].position
                                        )
                                    );
                                    continue;
                                //
                                // Текущий - слово
                                //

                                case entries[i].equals(CHARTYPE.WORD):
                                    result[0] = parseVarName(
                                        i,
                                        entries,
                                        reject
                                    ); //
                                    // Если следующий символ доступен
                                    //

                                    if (i + result[0].jump < leng) {
                                        //
                                        // Переопределение
                                        //
                                        if (
                                            entries[i + result[0].jump].equals(
                                                CHARTYPE.OPERATOR,
                                                '='
                                            )
                                        ) {
                                            result[1] = parseExpression(
                                                result[0].jump + i + 1,
                                                entries,
                                                reject
                                            );
                                            buffer.push(
                                                new ResetStatement(
                                                    entries[
                                                        i + result[0].jump
                                                    ].position,
                                                    result[0].data,
                                                    result[1].data
                                                )
                                            );
                                            i +=
                                                result[0].jump +
                                                result[1].jump +
                                                1; //
                                            // Добавление <-
                                            //
                                        } else if (
                                            entries[i + result[0].jump].equals(
                                                CHARTYPE.OPERATOR,
                                                '<'
                                            )
                                        ) {
                                            if (
                                                entries[
                                                    i + result[0].jump + 1
                                                ].equals(CHARTYPE.OPERATOR, '-')
                                            ) {
                                                if (
                                                    entries[
                                                        i + result[0].jump + 2
                                                    ].equals(
                                                        CHARTYPE.OPERATOR,
                                                        '{'
                                                    )
                                                ) {
                                                    result[0] = parseExpression(
                                                        i,
                                                        entries,
                                                        reject
                                                    );
                                                    buffer.push(result[0].data);
                                                    i += result[0].jump;
                                                } else {
                                                    result[1] = parseExpression(
                                                        result[0].jump + i + 2,
                                                        entries,
                                                        reject
                                                    );
                                                    buffer.push(
                                                        new PushStatement(
                                                            entries[
                                                                i +
                                                                    result[0]
                                                                        .jump
                                                            ].position,
                                                            result[0].data,
                                                            result[1].data
                                                        )
                                                    );
                                                    i +=
                                                        result[0].jump +
                                                        result[1].jump +
                                                        2;
                                                }
                                            } else {
                                                reject(
                                                    entries[
                                                        i + result[0].jump + 1
                                                    ].position,
                                                    new UnexpectedTokenException(
                                                        entries[
                                                            i +
                                                                result[0].jump +
                                                                1
                                                        ].toString(),
                                                        '-'
                                                    )
                                                );
                                            } //
                                            // Конструктор объекта
                                            //
                                        } else if (
                                            entries[i + result[0].jump].equals(
                                                CHARTYPE.OPERATOR,
                                                '-'
                                            )
                                        ) {
                                            if (
                                                entries[
                                                    i + result[0].jump + 1
                                                ].equals(CHARTYPE.OPERATOR, '>')
                                            ) {
                                                result[0] = parseExpression(
                                                    i,
                                                    entries,
                                                    reject
                                                );
                                                buffer.push(result[0].data);
                                                i += result[0].jump;
                                            } else {
                                                reject(
                                                    entries[
                                                        i + result[0].jump + 1
                                                    ].position,
                                                    new UnexpectedTokenException(
                                                        entries[
                                                            i +
                                                                result[0].jump +
                                                                1
                                                        ].toString(),
                                                        '-'
                                                    )
                                                );
                                            } //
                                            // Вызов функции
                                            //
                                        } else if (
                                            entries[i + result[0].jump].equals(
                                                CHARTYPE.OPERATOR,
                                                '('
                                            )
                                        ) {
                                            result[1] = parseExpression(
                                                i,
                                                entries,
                                                reject
                                            );
                                            buffer.push(result[1].data);
                                            i += result[1].jump; //
                                            // Ошибка
                                            //
                                        } else {
                                            reject(
                                                entries[i].position,
                                                new InvalidSequenceForLetiableAccessException()
                                            );
                                        }
                                    } else {
                                        i += result[0].jump;
                                    }

                                    continue;

                                case entries[i].equals(CHARTYPE.NUMBER) ||
                                    entries[i].equals(CHARTYPE.STRING) ||
                                    entries[i].equals(CHARTYPE.WORD, [
                                        'true',
                                        'false',
                                        'null',
                                    ]) ||
                                    entries[i].equals(CHARTYPE.OPERATOR, '{'):
                                    result[0] = parseExpression(
                                        i,
                                        entries,
                                        reject
                                    );
                                    buffer.push(result[0].data);
                                    i += result[0].jump;
                                    continue;

                                default:
                                    reject(
                                        entries[i].position,
                                        new UnexpectedTokenException(
                                            entries[i].toString(),
                                            '*'
                                        )
                                    );
                            }
                        } catch (e) {
                            if (SERVICE.CONFIG.DEBUG) console.trace(e);

                            if (e instanceof PoonyaException) {
                                throw e;
                            } else {
                                if (entries.length != 0) {
                                    if (entries[i] != null)
                                        reject(
                                            entries[i].position,
                                            new CriticalParserErrorException()
                                        );
                                    else
                                        reject(
                                            entries[entries.length - 1]
                                                .position,
                                            new CriticalParserErrorUnexpectedEndOfInputException()
                                        );
                                } else {
                                    reject(
                                        0,
                                        new CriticalParserErrorNoRawDataTransmittedException()
                                    );
                                }
                            }
                        }
                    }
                }
                /**
                 * Парсит вхождения, которые можно получить вызовом функции @see {@link lexer}
                 *
                 * @param {String} input Входящая строка для разбора
                 * @param {?String} parent_path Путь к шаблону
                 *
                 * @returns {ParserData} Тело исполнителя
                 *
                 * @memberof Poonya.Parser
                 * @protected
                 * @async
                 */

                async function parser(input, parent_path) {
                    const linked = await linker(
                        lexer(toBytes(input), false),
                        parent_path,
                        throwError
                    );
                    const data = new ParserData(linked);
                    const reject = throwError.bind({
                        data: data,
                        path: parent_path,
                        input,
                    });
                    data.sequense = new SequenceMainGroup(
                        codeBlockParser(
                            0,
                            linked.contents,
                            reject
                        ).data.Sequence
                    ).__sync(reject);
                    return data;
                }
                /**
                 * Парсит шаблон сообщения, которое помимо кода Poonya может содержать и любые другие символы вне префикса.
                 *
                 * @param {String} input Входящая строка для разбора
                 * @param {String} block_prefix Префикс для обозначения начала блока кода poonya
                 * @param {String} parent_path Путь к шаблону
                 *
                 * @returns {SequenceMainGroup} Тело исполнителя
                 *
                 * @memberof Poonya.Parser
                 * @protected
                 * @async
                 */

                async function parserMP(input, block_prefix, parent_path) {
                    let hook_index = 0,
                        buffer = new Array(),
                        out = new SequenceMainGroup(),
                        chuncks = new Array(),
                        entries = lexer(toBytes(input), true),
                        reject = throwError.bind({
                            path: parent_path,
                            input,
                        });
                    for (let i = 0; ; i++) {
                        if (entries[i] == null) break;

                        if (
                            ((block_prefix == null &&
                                entries[i].equals(CHARTYPE.OPERATOR, '{')) ||
                                (block_prefix != null &&
                                    entries[i].contentEquals(
                                        block_prefix.toString()
                                    ) &&
                                    (entries[i + 1].equals(
                                        CHARTYPE.OPERATOR,
                                        '{'
                                    ) ||
                                        (entries[i + 1].equals(
                                            CHARTYPE.SPACE
                                        ) &&
                                            entries[i + 2].equals(
                                                CHARTYPE.OPERATOR,
                                                '{'
                                            ))))) &&
                            hook_index === 0
                        ) {
                            if (block_prefix != null)
                                i += entries[i + 1].equals(CHARTYPE.SPACE)
                                    ? 2
                                    : 1;

                            if (buffer.length > 0) {
                                out.push(
                                    new OutStatement(
                                        new ObjectContructorCall(
                                            SERVICE.CONSTRUCTORS.STRING,
                                            buffer.join(''),
                                            entries[i].position
                                        )
                                    )
                                );
                                buffer.splice(0, buffer.length);
                            }

                            hook_index++;
                            continue;
                        } else if (
                            entries[i].equals(CHARTYPE.OPERATOR, '}') &&
                            hook_index === 1
                        ) {
                            const tmp_linked = await linker(
                                buffer.filter((e) => e.type !== CHARTYPE.SPACE),
                                parent_path,
                                throwError
                            );
                            const tmp_data = new ParserData(tmp_linked);
                            const reject = throwError.bind({
                                data: tmp_data,
                                path: parent_path,
                                input,
                            });
                            out.push(
                                codeBlockParser(0, tmp_linked.contents, reject)
                                    .data
                            );
                            buffer.splice(0, buffer.length);
                            chuncks.push(...tmp_linked.chuncks);
                            hook_index--;
                            continue;
                        } else {
                            if (hook_index >= 1)
                                switch (true) {
                                    case entries[i].equals(
                                        CHARTYPE.OPERATOR,
                                        '{'
                                    ):
                                        hook_index++;
                                        break;

                                    case entries[i].equals(
                                        CHARTYPE.OPERATOR,
                                        '}'
                                    ):
                                        hook_index--;
                                        break;
                                }
                        }

                        if (!hook_index === 0)
                            buffer.push(entries[i].toString());
                        else buffer.push(entries[i]);
                    }

                    if (buffer.length !== 0)
                        if (hook_index === 1) {
                            const tmp_linked = await linker(
                                buffer.filter((e) => e.type !== CHARTYPE.SPACE),
                                parent_path,
                                reject
                            );
                            const tmp_data = new ParserData(tmp_linked);
                            const reject = throwError.bind({
                                data: tmp_data,
                                path: parent_path,
                                input,
                            });
                            out.push(
                                codeBlockParser(0, tmp_linked.contents, reject)
                                    .data
                            );
                            chuncks.push(...tmp_linked.chuncks);
                            buffer.splice(0, buffer.length);
                        } else if (hook_index === 0) {
                            if (buffer.length != 0) {
                                out.push(
                                    new OutStatement(
                                        new ObjectContructorCall(
                                            SERVICE.CONSTRUCTORS.STRING,
                                            buffer.join(''),
                                            entries[entries.length - 1].position
                                        )
                                    )
                                );
                                buffer.splice(0, buffer.length);
                            }
                        } else {
                            reject(
                                entries[entries.length - 1].position,
                                new UnexpectedTokenException(
                                    entries[entries.length - 1],
                                    '}'
                                )
                            );
                        }

                    const synced = out.__sync(reject);

                    return new ParserData(
                        new LinkerData(synced, chuncks),
                        synced
                    );
                }

                module.exports.parser = parser;
                module.exports.parserMP = parserMP;
                module.exports.parseExpression = parseExpression;

                /***/
            },

            /***/ 216: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /* module decorator */ module = __webpack_require__.nmd(module);
                /**
                 * @author Astecom
                 * @version 0.4.5
                 * @see {@link https://github.com/AseWhy/Poonya|GitHub}
                 * @license MIT
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

                const { EventEmitter } = __webpack_require__(138),
                    { IOError, PoonyaException } = __webpack_require__(943),
                    { Import, ImportDir, ImportFile } = __webpack_require__(
                        742
                    ),
                    { Context, Heap } = __webpack_require__(591),
                    { parser, parseExpression, parserMP } = __webpack_require__(
                        190
                    ),
                    { SERVICE } = __webpack_require__(351),
                    {
                        toFixed,
                        toBytes,
                        fromBytes,
                        setImmediate,
                        throwError,
                        createCustomErrorHandler,
                    } = __webpack_require__(88),
                    {
                        iPoonyaConstructsData,
                        iCodeEmitter,
                    } = __webpack_require__(161),
                    PoonyaOutputStream = __webpack_require__(580),
                    lexer = __webpack_require__(94); // Private fields

                const RESULT = Symbol('RESULT'),
                    INIT = Symbol('INIT');
                /**
                 * @lends CodeEmitter;
                 */

                class CodeEmitter extends iCodeEmitter {
                    /**
                     * Абстрактный класс который предназначен для подготовке всех наследуемых эмитттеров.
                     * An abstract class that prepares all inherited emitters.
                     *
                     * @param {String | iInputData} input Входящая строка с выражением
                     *                                    Input string with expression
                     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
                     *                                 Array with native import libraries
                     * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
                     *                         Logger, you need to take console as the interface, with the functions log, warn, error;
                     *
                     * @property {ParserData} data данные, которые были подготовлены парсером для разбора
                     *
                     * @memberof Poonya
                     * @constructs CodeEmitter
                     * @abstract
                     * @protected
                     */
                    constructor(
                        input,
                        import_s = [],
                        logger = console,
                        onload
                    ) {
                        super();

                        const _ = this;

                        const emitter = new EventEmitter(); // Poonya events

                        _.on = emitter.on;
                        _.once = emitter.once;
                        _.emit = emitter.emit; // Service data

                        _.input = null;
                        _.loaded = false;
                        _.logger = logger;

                        if (typeof input === 'string') {
                            _.input = input;
                            _.charset = 'utf-8';
                            /*LIQUID*/

                            _.path = window.location.href;
                            /*LIQUID-END*/

                            if (SERVICE.LOADED) {
                                _[INIT](import_s, logger);

                                setImmediate(() => onload.call(_));
                            } else {
                                SERVICE.ACTIONS.on('load', () => {
                                    _[INIT](import_s, logger);

                                    onload.call(_);
                                });
                            }
                        } else if (typeof input === 'object') {
                            _.charset =
                                typeof input.charset === 'string'
                                    ? input.charset
                                    : 'utf-8'; // Защищаю от выполнения браузерного кода в nodejs
                            // Protecting against execution of browser code in nodejs

                            /*LIQUID*/

                            _.path =
                                typeof input.path === 'string'
                                    ? input.path.split('/').pop().split('.')
                                          .length > 0
                                        ? input.path
                                        : input.path + '.po'
                                    : 'anonymous.po';
                            /*LIQUID-END*/

                            if (typeof input.raw === 'string')
                                _.input = input.raw;
                            else if (typeof input.path === 'string') {
                                try {
                                    /*LIQUID*/
                                    fetch(input.path, {
                                        method: 'GET',
                                    })
                                        /*LIQUID-END*/

                                        /*LIQUID*/
                                        .catch((e) => {
                                            throw e;
                                        })
                                        /*LIQUID-END*/

                                        /*LIQUID*/
                                        .then((e) => e.text())
                                        /*LIQUID-END*/

                                        /*LIQUID*/
                                        .then((e) => {
                                            /*LIQUID-END*/

                                            /*LIQUID*/
                                            _.input = e;
                                            /*LIQUID-END*/

                                            /*LIQUID*/

                                            /*LIQUID-END*/

                                            /*LIQUID*/

                                            if (SERVICE.LOADED) {
                                                /*LIQUID-END*/

                                                /*LIQUID*/
                                                _[INIT](import_s, logger);
                                                /*LIQUID-END*/

                                                /*LIQUID*/

                                                /*LIQUID-END*/

                                                /*LIQUID*/

                                                onload.call(_);
                                                /*LIQUID-END*/

                                                /*LIQUID*/
                                            } else {
                                                /*LIQUID-END*/

                                                /*LIQUID*/
                                                SERVICE.ACTIONS.on(
                                                    'load',
                                                    () => {
                                                        /*LIQUID-END*/

                                                        /*LIQUID*/
                                                        _[INIT](
                                                            import_s,
                                                            logger
                                                        );
                                                        /*LIQUID-END*/

                                                        /*LIQUID*/

                                                        /*LIQUID-END*/

                                                        /*LIQUID*/

                                                        onload.call(_);
                                                        /*LIQUID-END*/

                                                        /*LIQUID*/
                                                    }
                                                );
                                                /*LIQUID-END*/

                                                /*LIQUID*/
                                            }
                                            /*LIQUID-END*/

                                            /*LIQUID*/
                                        });
                                    /*LIQUID-END*/
                                } catch (e) {
                                    throw new IOError(input.path);
                                }
                            } else throw new Error('BAD_DATA_FORMAT');
                        } else {
                            throw new Error('BAD_DATA_FORMAT');
                        }
                    }
                    /**
                     * Инициалзирует блок инструкций
                     * Initializes a block of instructions
                     *
                     * @param {String|Heap} import_s названия нативных библиотек для импорта
                     *                               names of native libraries for import
                     *
                     * @method
                     * @private
                     */

                    [INIT](import_s) {
                        this.libraries = Import(['default', ...import_s]);
                        this.import = import_s;
                        this.data = null;
                    }
                    /**
                     * Выполняет заданную блоку последовательность инструкций
                     * Executes a sequence of instructions given to a block
                     *
                     * @param {String|Heap} data данные преданые в исполнитель
                     *                           data committed to performer
                     * @param {Function} error функция вывода ошибок, опциаонально
                     *                         error output function, optional
                     * @param {PoonyaOutputStream} out поток вывода из poonya
                     *                                 output stream from poonya
                     *
                     * @method
                     * @private
                     */

                    [RESULT](data, error, out, c_clone) {
                        if (Array.isArray(data)) {
                            this.data.sequense.result(
                                new Context(
                                    this.libraries,
                                    error,
                                    ...data
                                ).setSource(this.path),
                                out,
                                error,
                                () => out.end()
                            );
                        } else if (data instanceof Context) {
                            if (c_clone) {
                                const clone = data.clone();
                                clone.import(this.libraries);
                                this.data.sequense.result(
                                    clone,
                                    out,
                                    error,
                                    () => out.end()
                                );
                            } else {
                                this.data.sequense.result(
                                    data,
                                    out,
                                    error,
                                    () => out.end()
                                );
                            }
                        } else {
                            this.data.sequense.result(
                                new Context(
                                    this.libraries,
                                    error,
                                    data
                                ).setSource(this.path),
                                out,
                                error,
                                () => out.end()
                            );
                        }
                    }
                    /**
                     * Returns the result of block execution
                     * Возвращает результат выполенения блока
                     *
                     * @param {Object|Heap|Context} data данные преданые в исполнитель
                     *                                   data committed to performer
                     * @param {Function} error функция вывода ошибок, опциаонально
                     *                         error output function, optional
                     * @param {Boolean} c_clone если в `data` передан контекст, то при true, он будет склонирован, при false будет использован переданный контекст.
                     *                          if a context is passed to `data`, then if true, it will be cloned, if false, the transferred context will be used.
                     *
                     * @returns {Array<Any>} результат выполнения блока
                     *                       block execution result
                     * @method
                     * @public
                     */

                    result(
                        data = new Heap(),
                        error = throwError.bind(this),
                        c_clone = false
                    ) {
                        const out = new PoonyaOutputStream(),
                            m_error = createCustomErrorHandler(error, out); // Если вхождения уже загружены, выполняем последовательность
                        // If the entries have already been loaded, execute the sequence

                        if (this.loaded) {
                            setImmediate(() =>
                                this[RESULT](data, m_error, out, c_clone)
                            );
                        } else {
                            // Иначе, ждем окончания загрузки и выполняем последовательность
                            // Otherwise, wait for the download to finish and execute the sequence
                            this.on('load', () =>
                                this[RESULT](data, m_error, out, c_clone)
                            );
                        }

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
                     * @param {String | iInputData} input Входящая строка с выражением
                     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
                     * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
                     *
                     * @memberof Poonya
                     * @constructs MessagePattern
                     * @protected
                     */
                    constructor(
                        input,
                        block_prefix = 'poonya',
                        import_s,
                        logger = console
                    ) {
                        super(input, import_s, logger, async () => {
                            try {
                                this.data = await parserMP(
                                    this.input,
                                    block_prefix,
                                    this.path
                                );
                            } catch (e) {
                                this.emit('error', e);
                            }

                            this.loaded = true;
                            this.emit('load');
                        });
                    }
                }
                /**
                 * @lends ExecutionPattern;
                 */

                class ExecutionPattern extends CodeEmitter {
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
                     * @param {String | iInputData} input Входящая строка с выражением
                     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
                     * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
                     *
                     * @memberof Poonya
                     * @constructs ExecutionPattern
                     * @protected
                     */
                    constructor(input, import_s, logger = console) {
                        super(input, import_s, logger, async () => {
                            try {
                                this.data = await parser(this.input, this.path);
                            } catch (e) {
                                this.emit('error', e);
                            }

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
                     * @param {Array<String>} import_s Массив с нативными библиотеками для импорта
                     * @param {Console} logger Логгер, за интерфейс нужно взять console, с функциями log, warn, error;
                     *
                     * @memberof Poonya
                     * @constructs ExpressionPattern
                     * @protected
                     */
                    constructor(input, import_s, logger = console) {
                        super(input, import_s, logger, () => {
                            try {
                                this.data = parseExpression(
                                    0,
                                    lexer(toBytes(this.input), false)
                                ).data;
                            } catch (e) {
                                this.emit('error', e);
                            }

                            this.loaded = true;
                            this.emit('load');
                        });
                    }

                    [RESULT](data, error, c_clone) {
                        return new Promise((res) => {
                            if (data instanceof Context) {
                                if (c_clone) {
                                    const context = data.clone();
                                    context.import(this.libraries, error);
                                    this.data.sequense.result(
                                        context,
                                        [],
                                        error,
                                        (result) =>
                                            result.result(
                                                context,
                                                null,
                                                null,
                                                res
                                            )
                                    );
                                } else {
                                    this.data.sequense.result(
                                        data,
                                        [],
                                        error,
                                        (result) =>
                                            result.result(data, null, null, res)
                                    );
                                }
                            } else {
                                if (Array.isArray(data)) {
                                    const context = new Context(
                                        this.libraries,
                                        error,
                                        ...data
                                    ).setSource(this.path);
                                    this.data.sequense.result(
                                        context,
                                        [],
                                        error,
                                        (result) =>
                                            result.result(
                                                context,
                                                null,
                                                null,
                                                res
                                            )
                                    );
                                } else {
                                    const context = new Context(
                                        this.libraries,
                                        error,
                                        ...data
                                    ).setSource(this.path);
                                    this.data.sequense.result(
                                        context,
                                        [],
                                        error,
                                        (result) =>
                                            result.result(
                                                context,
                                                null,
                                                null,
                                                res
                                            )
                                    );
                                }
                            }
                        });
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

                    result(
                        data = new Heap(),
                        error = throwError.bind(this),
                        c_clone = false
                    ) {
                        const _ = this;

                        return new Promise((res) => {
                            if (_.loaded)
                                _[RESULT](data, error, c_clone)
                                    .then(res)
                                    .catch((e) => {
                                        throw e;
                                    });
                            else
                                _.on('load', () =>
                                    _[RESULT](data, error, c_clone).then(res)
                                ).catch((e) => {
                                    throw e;
                                });
                        });
                    }
                }
                /**
                 * Создает контекст выполнения, с полями `data`
                 *
                 * @param {Object} data поля инициализации контекста, вы можете передать сюда объект с глобальными переменными доступными в контексте
                 * @param  {...String|...Array<String>} libs список библиотек для импорта
                 * @returns {Promise<Context>} контекст выполнения
                 * @memberof Poonya
                 * @async
                 */

                function createContext(data = new Object(), ...libs) {
                    if (typeof data != 'object' || data == null)
                        throw new Error('Param "data" must be an object.');
                    libs = libs // Если передан массив с массивами
                        .flat(Infinity) // Фильтурем список библиотек целевых библиотек, если среди них есть не строки отбрасываем их.
                        .filter((e) => typeof e == 'string');
                    return new Promise((res) => {
                        if (SERVICE.LOADED) {
                            res(
                                new Context(
                                    Import(['default', ...libs]),
                                    throwError.bind({
                                        input: '',
                                        charset: 'utf-8',
                                        path: 'untitled.po',
                                        logger: console,
                                    }),
                                    data
                                ).setSource(
                                    /*LIQUID*/
                                    window.location.origin
                                    /*LIQUID-END*/
                                )
                            );
                        } else {
                            SERVICE.ACTIONS.on('load', () => {
                                res(
                                    new Context(
                                        Import(['default', ...libs]),
                                        throwError.bind({
                                            input: '',
                                            charset: 'utf-8',
                                            path: 'untitled.po',
                                            logger: console,
                                        }),
                                        data
                                    ).setSource(
                                        /*LIQUID*/
                                        window.location.origin
                                        /*LIQUID-END*/
                                    )
                                );
                            });
                        }
                    });
                }
                /**
                 * Конструирует шаблон, возвращая обещаение с загрузкой этого шаблона
                 *
                 * @param {CodeEmitter} Pattern шаблон для создания
                 * @param  {...Any} args аргументы вызов конструктора
                 * @returns {Promise<iPoonyaConstructsData>} ответ конструктора шаблона
                 * @memberof Poonya
                 * @async
                 */

                function createPattern(Pattern, ...args) {
                    if (
                        Object.prototype.isPrototypeOf.call(
                            CodeEmitter,
                            Pattern
                        )
                    ) {
                        Pattern = new Pattern(...args);
                        return new Promise((res, rej) => {
                            Pattern.on('load', (...args) =>
                                res(
                                    Object.assign(new iPoonyaConstructsData(), {
                                        data: Pattern,
                                        args,
                                    })
                                )
                            );
                            Pattern.on('error', (...args) => rej(...args));
                        });
                    } else {
                        throw new Error(
                            'The "Pattern" must be a "CodeEmitter" heir'
                        );
                    }
                }

                (async () => {
                    /*LIQUID*/
                    __webpack_require__(990);
                    /*LIQUID-END*/

                    /*LIQUID*/

                    __webpack_require__(722);
                    /*LIQUID-END*/

                    SERVICE.ACTIONS.emit('load');
                })(); // POONYA POLYFILL

                /*LIQUID*/

                (() => {
                    const load = new Event('poonya:load');

                    function parseHTML(html) {
                        var t = document.createElement('template');
                        t.innerHTML = html;
                        return t.content.cloneNode(true);
                    }

                    document.addEventListener('DOMContentLoaded', async () => {
                        const entries = document.querySelectorAll(
                            'script[type="text/poonya"], script[lang="text/poonya"]'
                        );

                        for (
                            let i = 0,
                                leng = entries.length,
                                name,
                                handler,
                                imports,
                                block_load,
                                block_error,
                                pattern;
                            i < leng;
                            i++
                        ) {
                            name =
                                entries[i].getAttribute('name') ?? 'block-' + i;
                            handler =
                                entries[i].getAttribute('handler') ?? 'exec';
                            imports = (
                                entries[i].getAttribute('import') ?? ''
                            ).split('|');
                            block_load = new Event('poonya:load:' + name);
                            block_error = new Event('poonya:error:' + name);
                            if (handler == 'exec')
                                pattern = new ExecutionPattern(
                                    entries[i].innerHTML,
                                    imports
                                );
                            else if (handler == 'message')
                                pattern = new MessagePattern(
                                    entries[i].innerHTML,
                                    imports
                                );
                            else
                                throw new Error(
                                    'Unknown pattern handler in block "' +
                                        name +
                                        '" type "' +
                                        handler +
                                        '"'
                                );
                            await new Promise((res, rej) => {
                                pattern.on('load', async () => {
                                    entries[i].replaceWith(
                                        ...(
                                            await pattern.result().complete()
                                        ).map((e) => parseHTML(e))
                                    );
                                    window.dispatchEvent(block_load);
                                    res();
                                });
                                pattern.on('error', (e) => {
                                    window.dispatchEvent(block_error);
                                    res();
                                });
                            });
                        }

                        window.dispatchEvent(load);
                    });
                })();
                /*LIQUID-END*/

                module.exports.CodeEmitter = CodeEmitter;
                module.exports.MessagePattern = MessagePattern;
                module.exports.PoonyaOutputStream = PoonyaOutputStream;
                module.exports.ExpressionPattern = ExpressionPattern;
                module.exports.ExecutionPattern = ExecutionPattern;
                module.exports.createPattern = createPattern;
                module.exports.createContext = createContext;
                module.exports.ImportFile = ImportFile.bind(
                    null,
                    module.parent != null ? module.parent.path : module.path
                );

                const presset = __webpack_require__(40); //
                // Static library
                //

                module.exports.PoonyaPrototype = presset.PoonyaPrototype;
                module.exports.PoonyaStaticLibrary =
                    presset.PoonyaStaticLibrary;
                module.exports.Exceptions = presset.Exceptions;
                module.exports.FIELDFLAGS = presset.FIELDFLAGS;

                /***/
            },

            /***/ 40: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/preset.js
                 * @description Содержит в себе прессеть данных для создания нативных бибилотек
                 * @author Astecom
                 */

                module.exports.FIELDFLAGS = __webpack_require__(351).FIELDFLAGS;
                module.exports.Exceptions = __webpack_require__(943);
                module.exports.PoonyaStaticLibrary = __webpack_require__(
                    742
                ).PoonyaStaticLibrary;
                module.exports.PoonyaPrototype = __webpack_require__(326);

                /***/
            },

            /***/ 88: /***/ (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) => {
                'use strict';
                /**
                 * @file src/utils.js
                 * @description Содержит в себе набор утилит, которые нужны много где, и их нельзя отнести к какой-либо конкретной группе
                 * @author Astecom
                 */

                const { SERVICE } = __webpack_require__(351),
                    { Operand } = __webpack_require__(501),
                    {
                        iPoonyaObject,
                        iPoonyaPrototype,
                        iCodeEmitter,
                    } = __webpack_require__(161),
                    { PoonyaException } = __webpack_require__(943),
                    NativeFunction = __webpack_require__(329);
                /**
                 * Фукция которая преобразует нативное значение в значение Poonya
                 *
                 * @memberof Poonya.Utils
                 * @function Cast
                 *
                 * @param {Any} data Данные которые необходимо преобразовать
                 * @param {iContext} context Контекст
                 * @param {Array<Any>} parents_three дерево родителей объекта
                 * @param {Function} resolve функция для вывод результата
                 *
                 * @protected
                 */

                function Cast(
                    data,
                    context,
                    parents_three = new Array(),
                    resolve
                ) {
                    ///
                    /// При кастинге значения, значение data (js примитив) преобразовывается в значение poonya
                    /// Никаких ассинхрнных операций тут нет, поэтому можно возвращать результат, как результат
                    /// Кастинга примитива js
                    ///
                    switch (typeof data) {
                        case 'bigint':
                            context.createObject(
                                data,
                                -1,
                                SERVICE.CONSTRUCTORS.INTEGER,
                                null,
                                parents_three,
                                resolve
                            );
                            break;

                        case 'number':
                            context.createObject(
                                data,
                                -1,
                                SERVICE.CONSTRUCTORS.NUMBER,
                                null,
                                parents_three,
                                resolve
                            );
                            break;

                        case 'string':
                            context.createObject(
                                data,
                                -1,
                                SERVICE.CONSTRUCTORS.STRING,
                                null,
                                parents_three,
                                resolve
                            );
                            break;

                        case 'symbol':
                            context.createObject(
                                Symbol.keyFor(data),
                                -1,
                                SERVICE.CONSTRUCTORS.STRING,
                                null,
                                parents_three,
                                resolve
                            );
                            break;

                        case 'boolean':
                            context.createObject(
                                data,
                                -1,
                                SERVICE.CONSTRUCTORS.BOOLEAN,
                                null,
                                parents_three,
                                resolve
                            );
                            break;

                        case 'undefined':
                            context.createObject(
                                data,
                                -1,
                                SERVICE.CONSTRUCTORS.NULL,
                                null,
                                parents_three,
                                resolve
                            );
                            break;

                        case 'object':
                            switch (true) {
                                case data === null:
                                    context.createObject(
                                        data,
                                        -1,
                                        SERVICE.CONSTRUCTORS.NULL,
                                        null,
                                        parents_three,
                                        resolve
                                    );
                                    break;

                                case data instanceof iPoonyaObject:
                                case data instanceof iPoonyaPrototype:
                                case data instanceof NativeFunction:
                                case data instanceof Operand:
                                    resolve(data);
                                    break;

                                case data instanceof iCodeEmitter:
                                    context.createObject(
                                        data,
                                        -1,
                                        SERVICE.CONSTRUCTORS.PATTERN,
                                        null,
                                        parents_three,
                                        resolve
                                    );
                                    break;

                                default:
                                    parents_three.push(data);
                                    if (Array.isArray(data))
                                        context.createObject(
                                            data,
                                            -1,
                                            SERVICE.CONSTRUCTORS.ARRAY,
                                            null,
                                            parents_three,
                                            resolve
                                        );
                                    else
                                        context.createObject(
                                            data,
                                            -1,
                                            SERVICE.CONSTRUCTORS.OBJECT,
                                            null,
                                            parents_three,
                                            resolve
                                        );
                                    break;
                            }

                            break;

                        case 'function':
                            resolve(new NativeFunction(data));
                            break;
                    }
                }
                /**
                 * Создает кастомный обработчик ошибок, для вывода их в поток вывода
                 *
                 * @param {throwError} error функция выброса исключений
                 * @param {PoonyaOutputStream} out поток вывода
                 * @returns кастомный обработчик ошибок
                 */

                function createCustomErrorHandler(error, out) {
                    return (position, content) => {
                        try {
                            error(position, content);
                        } catch (e) {
                            out.error(e);
                        }
                    };
                }
                /**
                 * !! Необходимо привести контекст
                 *
                 * Выводит сообщение об ошибке, прекращает выполнения текущего шаблона.
                 * Displays an error message, terminates the execution of the current template.
                 *
                 * @param {Number} pos Позиция в которой произшла ошибка
                 *                     The position at which the error occurred
                 *
                 * @param {String} error Сообщение с ошибкой
                 *                       Error message
                 *
                 * @param {Number} rad_of Радиус печати, т.е. количество строк которое будет печатать в вывод по мимо строки на которой произошла ошибка
                 *                        The radius of the seal, i.e. the number of lines that will print to the output next to the line on which the error occurred
                 * @method
                 * @public
                 */

                function throwError(pos, error, rad_of = 5) {
                    rad_of = parseInt(rad_of);
                    const linked =
                        this != null && this.data != null
                            ? this.data.linker_data.getOwnChunck(pos)
                            : null;
                    const input =
                        linked != null
                            ? linked.toString()
                            : this != null
                            ? this.input
                            : null;
                    const path =
                        linked != null
                            ? linked.name
                            : this != null
                            ? this.path
                            : null;
                    const buffer = new Array();

                    if (input) {
                        let data = input.split(/$\n/gm),
                            line_dump = fromBytes(
                                toBytes(input).slice(
                                    0,
                                    pos - (linked != null ? linked.from : 0)
                                )
                            ).split(/$\n/gm),
                            line = line_dump.length - 1,
                            line_start =
                                line - parseInt(rad_of / 2) < 0
                                    ? 0
                                    : line - parseInt(rad_of / 2),
                            line_end =
                                line_start + rad_of < data.length
                                    ? line_start + rad_of
                                    : data.length,
                            ll = line_end.toString(16).length + 2;

                        if (pos != -1) {
                            buffer.push(
                                '  at ',
                                path,
                                ':',
                                line + 1,
                                ':',
                                line_dump[line].length,
                                ' :>\n'
                            );

                            for (let i = line_start; i < line_end; i++) {
                                buffer.push(
                                    '     ',
                                    toFixed(i + 1, ll),
                                    ' |> ',
                                    data[i]
                                );

                                if (i === line) {
                                    buffer.push(
                                        '\n     '.padEnd(ll + 6, ' '),
                                        ' |> '.padEnd(
                                            line_dump[line].length + 3,
                                            ' '
                                        ),
                                        '^'
                                    );
                                }

                                if (i + 1 !== line_end) buffer.push('\n');
                            }
                        }
                    }

                    if (error != null && !error.throwed) {
                        if (error instanceof PoonyaException) {
                            if (buffer.length != 0) {
                                error.message += '\n' + buffer.join('');
                            }

                            error.throwed = true;
                            throw error;
                        } else
                            throw new PoonyaException(
                                error,
                                buffer.join(''),
                                true
                            );
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
                 * @param {Array<Token>} entries Выхождение, на вход
                 * @param {Number} index Проверяемый индекс
                 * @param {String} equalts_t Тип с которым сравниваем
                 * @param {String|Array<String>} equalts_v Значение(я) с которым(и) сравниваем
                 *
                 * @memberof Poonya.Utils
                 * @private
                 */

                function maybeEquals(entries, index, equalts_t, equalts_v) {
                    while (
                        entries[index] != null &&
                        entries[index].equals(equalts_t, equalts_v)
                    )
                        entries.splice(index, 1);

                    return true;
                }
                /**
                 * Подсчитывает количиство неприрывных одинаковых вхождений
                 *
                 * @param {Array<Token>} entries вхождения для парсинга
                 * @param {Number} start начальная позиция парсинга
                 * @param {String} equalts_t Тип с которым сравниваем
                 * @param {String|Array<String>} equalts_v Значение(я) с которым(и) сравниваем
                 *
                 * @memberof Poonya.Utils
                 * @private
                 */

                function countKeys(entries, start, equalts_t, equalts_v) {
                    for (let i = start, to = entries.length; i < to; i++)
                        if (
                            entries[i] == null ||
                            !entries[i].equals(equalts_t, equalts_v)
                        )
                            return i - start;
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
                 * @function toBytes
                 * @param {String} input Строка для преобразования
                 * @memberof Poonya.Utils
                 * @returns {Array<Number>} массив с байтами
                 * @protected
                 * @static
                 */

                function toBytes(input) {
                    let bytes = new Array();

                    for (let i = 0, char, leng = input.length; i < leng; i++)
                        bytes.push(
                            (char = input.charCodeAt(i)) >>> 8,
                            char & 0xff
                        );

                    return bytes;
                }
                /**
                 * Преобразует массив байтов в строку
                 *
                 * @function toBytes
                 * @param {Array<Number>} input байты для преобразования
                 * @memberof Poonya.Utils
                 * @returns {String} преобразованная строка
                 * @protected
                 * @static
                 */

                function fromBytes(input) {
                    let string = '';

                    for (let i = 0, leng = input.length; i < leng; i += 2)
                        string += String.fromCharCode(
                            (input[i] << 8) | input[i + 1]
                        );

                    return string;
                }
                /*LIQUID*/

                const setImmediate = function (func, ...args) {
                    Promise.resolve().then(() => func(...args));
                };
                /*LIQUID-END*/

                /*LIQUID*/

                const Tick = setImmediate;
                /*LIQUID-END*/

                module.exports.Tick = Tick;
                module.exports.Cast = Cast;
                module.exports.toFixed = toFixed;
                module.exports.toBytes = toBytes;
                module.exports.countKeys = countKeys;
                module.exports.fromBytes = fromBytes;
                module.exports.throwError = throwError;
                module.exports.maybeEquals = maybeEquals;
                module.exports.setImmediate = setImmediate;
                module.exports.createCustomErrorHandler = createCustomErrorHandler;

                /***/
            },

            /***/ 386: /***/ () => {
                /* (ignored) */
                /***/
            },

            /******/
        }; // The module cache
        /************************************************************************/
        /******/ /******/ var __webpack_module_cache__ = {}; // The require function
        /******/
        /******/ /******/ function __webpack_require__(moduleId) {
            /******/ // Check if module is in cache
            /******/ if (__webpack_module_cache__[moduleId]) {
                /******/ return __webpack_module_cache__[moduleId].exports;
                /******/
            } // Create a new module (and put it into the cache)
            /******/ /******/ var module = (__webpack_module_cache__[
                moduleId
            ] = {
                /******/ id: moduleId,
                /******/ loaded: false,
                /******/ exports: {},
                /******/
            }); // Execute the module function
            /******/
            /******/ /******/ __webpack_modules__[moduleId](
                module,
                module.exports,
                __webpack_require__
            ); // Flag the module as loaded
            /******/
            /******/ /******/ module.loaded = true; // Return the exports of the module
            /******/
            /******/ /******/ return module.exports;
            /******/
        } /* webpack/runtime/global */
        /******/
        /************************************************************************/
        /******/ /******/ (() => {
            /******/ __webpack_require__.g = (function () {
                /******/ if (typeof globalThis === 'object') return globalThis;
                /******/ try {
                    /******/ return this || new Function('return this')();
                    /******/
                } catch (e) {
                    /******/ if (typeof window === 'object') return window;
                    /******/
                }
                /******/
            })();
            /******/
        })(); /* webpack/runtime/node module decorator */
        /******/
        /******/ /******/ (() => {
            /******/ __webpack_require__.nmd = (module) => {
                /******/ module.paths = [];
                /******/ if (!module.children) module.children = [];
                /******/ return module;
                /******/
            };
            /******/
        })(); // module exports must be returned from runtime so entry inlining is disabled // startup // Load entry module and return exports
        /******/
        /************************************************************************/
        /******/ /******/ /******/ /******/ return __webpack_require__(216);
        /******/
    })());

const { PoonyaStaticLibrary, FIELDFLAGS }= require('poonya');

const QUOTE_EXP = /"/g;
const TAG_EXP = /<([aA-zZ0-9]+)/;

function format(val){
    if(val === null){
        return 'null';
    }

    if(val === undefined){
        return 'undefined';
    }

    return val.toString();
}

new class DefaultTagsStaticLibrary extends PoonyaStaticLibrary {
    constructor(){
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
};

new class DefaultHtmlStaticLibrary extends PoonyaStaticLibrary {
    constructor(){
        super('default.html', false, false, 'html');

        this.addLib('default.html.tags', FIELDFLAGS.CONSTANT);
        this.addField('createElement', this.createElement, FIELDFLAGS.CONSTANT);
        this.addField('getElementName', this.getElementName, FIELDFLAGS.CONSTANT);
        this.addField('isElement', this.isElement, FIELDFLAGS.CONSTANT);
        this.addField('createTag', this.createTag, FIELDFLAGS.CONSTANT);
        this.addField('closeTag', this.closeTag, FIELDFLAGS.CONSTANT);
    }

    createElement(service, tag, content, attrs){
        if(typeof tag === 'string' && typeof content === 'string') {
            let form_attrs = new Array();

            for(let key in attrs)
                form_attrs.push(`${key}="${format(attrs[key]).replace(QUOTE_EXP, '\\"')}"`);

            return `<${tag} ${form_attrs.join(' ')}>${content}</${tag}>`;
        } else {
            return null;
        }
    }

    getElementName(service, element) {
        if(typeof element == 'string')
            return element.match(TAG_EXP)[1];
        else
            return null;
    }

    isElement(service, element, is) {
        if(typeof element == 'string')
            return element.match(TAG_EXP)[1] == is;
        else
            return false;
    }

    createTag(service, tag, attrs) {
        if(typeof tag == 'string'){
            let form_attrs = new Array();

            for(let key in attrs)
                form_attrs.push(`${key}="${format(attrs[key]).replace(QUOTE_EXP, '\\"')}"`);

            return `<${tag}${form_attrs.length > 0 ? ' ' + form_attrs.join(' ') : ''}>`;
        } else {
            return null;
        }
    }

    closeTag(service, tag) {
        if(typeof tag == 'string'){
            return `</${tag}>`;
        } else {
            return null;
        }
    }
};
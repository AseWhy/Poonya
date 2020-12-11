const { PoonyaStaticLibrary, PoonyaNativePrototype, FIELDFLAGS, Exceptions } = module.import()

function format(val){
    if(val === null){
        return 'null';
    }

    if(val === undefined){
        return 'undefined';
    }

    return val.toString();
}

new class DefaultMathStaticLibrary extends PoonyaStaticLibrary {
    constructor(){
        super('default.html.tags', false, false, 'TAGS');

        this.addField('A', 'a')
		this.addField('ABBR', 'abbr')
		this.addField('ADDRESS', 'address')
		this.addField('AREA', 'area')
		this.addField('ARTICLE', 'article')
		this.addField('ASIDE', 'aside')
		this.addField('AUDIO', 'audio')
		this.addField('B', 'b')
		this.addField('BASE', 'base')
		this.addField('BDI', 'bdi')
		this.addField('BDO', 'bdo')
		this.addField('BLOCKQUOTE', 'blockquote')
		this.addField('BODY', 'body')
		this.addField('BR', 'br')
		this.addField('BUTTON', 'button')
		this.addField('CANVAS', 'canvas')
		this.addField('CAPTION', 'caption')
		this.addField('CITE', 'cite')
		this.addField('CODE', 'code')
		this.addField('COL', 'col')
		this.addField('COLGROUP', 'colgroup')
		this.addField('DATA', 'data')
		this.addField('DATALIST', 'datalist')
		this.addField('DD', 'dd')
		this.addField('DEL', 'del')
		this.addField('DETAILS', 'details')
		this.addField('DFN', 'dfn')
		this.addField('DIALOG', 'dialog')
		this.addField('DIV', 'div')
		this.addField('DL', 'dl')
		this.addField('DT', 'dt')
		this.addField('EM', 'em')
		this.addField('EMBED', 'embed')
		this.addField('FIELDSET', 'fieldset')
		this.addField('FIGCAPTION', 'figcaption')
		this.addField('FIGURE', 'figure')
		this.addField('FOOTER', 'footer')
		this.addField('FORM', 'form')
		this.addField('H1-H6', 'h1-h6')
		this.addField('HEAD', 'head')
		this.addField('HEADER', 'header')
		this.addField('HR', 'hr')
		this.addField('HTML', 'html')
		this.addField('I', 'i')
		this.addField('IFRAME', 'iframe')
		this.addField('IMG', 'img')
		this.addField('INPUT', 'input')
		this.addField('INS', 'ins')
		this.addField('KBD', 'kbd')
		this.addField('LABEL', 'label')
		this.addField('LEGEND', 'legend')
		this.addField('LI', 'li')
		this.addField('LINK', 'link')
		this.addField('MAIN', 'main')
		this.addField('MAP', 'map')
		this.addField('MARK', 'mark')
		this.addField('META', 'meta')
		this.addField('METER', 'meter')
		this.addField('NAV', 'nav')
		this.addField('NOSCRIPT', 'noscript')
		this.addField('OBJECT', 'object')
		this.addField('OL', 'ol')
		this.addField('OPTGROUP', 'optgroup')
		this.addField('OPTION', 'option')
		this.addField('OUTPUT', 'output')
		this.addField('P', 'p')
		this.addField('PARAM', 'param')
		this.addField('PICTURE', 'picture')
		this.addField('PRE', 'pre')
		this.addField('PROGRESS', 'progress')
		this.addField('Q', 'q')
		this.addField('RUBY', 'ruby')
		this.addField('RB', 'rb')
		this.addField('RT', 'rt')
		this.addField('RTC', 'rtc')
		this.addField('RP', 'rp')
		this.addField('S', 's')
		this.addField('SAMP', 'samp')
		this.addField('SCRIPT', 'script')
		this.addField('SECTION', 'section')
		this.addField('SELECT', 'select')
		this.addField('SMALL', 'small')
		this.addField('SOURCE', 'source')
		this.addField('SPAN', 'span')
		this.addField('STRONG', 'strong')
		this.addField('STYLE', 'style')
		this.addField('SUB', 'sub')
		this.addField('SUMMARY', 'summary')
		this.addField('SUP', 'sup')
		this.addField('TABLE', 'table')
		this.addField('TBODY', 'tbody')
		this.addField('TD', 'td')
		this.addField('TEMPLATE', 'template')
		this.addField('TEXTAREA', 'textarea')
		this.addField('TFOOT', 'tfoot')
		this.addField('TH', 'th')
		this.addField('THEAD', 'thead')
		this.addField('TIME', 'time')
		this.addField('TITLE', 'title')
		this.addField('TR', 'tr')
		this.addField('TRACK', 'track')
		this.addField('U', 'u')
		this.addField('UL', 'ul')
		this.addField('VAR', 'var')
		this.addField('VIDEO', 'video')
		this.addField('WBR', 'wbr')
    }
}

new class DefaultNumbersStaticLibrary extends PoonyaStaticLibrary {
    constructor(){
        super('default.html', false, false, 'html');

        this.addLib('default.html.tags')
        this.addField('createElement', this.createElement);
    }

    createElement(service, tag, content, attrs){
        let form_attrs = new Array();

        for(let key in attrs)
            form_attrs.push(`${key}="${format(attrs[key]).replace(/"/g, '\\"')}"`);

        return `<${tag} ${form_attrs.join(' ')}>${content}</${tag}>`
    }
}
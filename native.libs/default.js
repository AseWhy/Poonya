const { PoonyaStaticLibrary, PoonyaPrototype, FIELDFLAGS, Exceptions } = require('poonya')
    ,   date = new Date();

new class DefaultMathStaticLibrary extends PoonyaStaticLibrary {
    constructor(){
        super('default.math', false, false, 'math');

        this.addField('floor', this.floor, FIELDFLAGS.CONSTANT);
        this.addField('round', this.round, FIELDFLAGS.CONSTANT);
        this.addField('ceil', this.ceil, FIELDFLAGS.CONSTANT);
        this.addField('abs', this.abs, FIELDFLAGS.CONSTANT);
    }

    ceil(service, n) {
        if(typeof n === 'number' && !isNaN(n))
            return Math.ceil(n);
        return null;
    }

    floor(service, n) {
        if(typeof n === 'number' && !isNaN(n))
            return Math.floor(n);
        return null;
    }

    round(service, n){
        if(typeof n === 'number' && !isNaN(n))
            return Math.round(n);
        return null;
    }

    abs(service, n){
        if(typeof n === 'number' && !isNaN(n))
            return Math.abs(n);
        return null;
    }
}

new class DefaultRegExpStaticLibrary extends PoonyaStaticLibrary {
    constructor(){
        super('default.regexp', false, false, 'regexp');

        this.addField('test', this.test, FIELDFLAGS.CONSTANT);
        this.addField('replace', this.replace, FIELDFLAGS.CONSTANT);
    }

    test (service, expression, flags, string) {
        return new RegExp(expression, flags ? flags : undefined).test(string);
    }

    replace (service, expression, flags, string, to) {
        return string.replace(new RegExp(expression, flags ? flags : undefined), to);
    }
}

new class DefaultDatesStaticLibrary extends PoonyaStaticLibrary {
    constructor(){
        super('default.dates', false, false, 'dates');

        this.addField('minutes', this.minutes, FIELDFLAGS.CONSTANT);
        this.addField('seconds', this.seconds, FIELDFLAGS.CONSTANT);
        this.addField('month', this.month, FIELDFLAGS.CONSTANT);
        this.addField('hours', this.hours, FIELDFLAGS.CONSTANT);
        this.addField('year', this.year, FIELDFLAGS.CONSTANT);
        this.addField('day', this.day, FIELDFLAGS.CONSTANT);
        this.addField('now', this.now, FIELDFLAGS.CONSTANT);
    }

    year(){
        return date.getUTCFullYear();
    }

    month(){
        return date.getUTCMonth();
    }

    day(){
        return date.getUTCDay();
    }

    hours(){
        return date.getUTCHours();
    }

    minutes(){
        return date.getUTCMinutes();
    }

    seconds(){
        return date.getUTCSeconds();
    }

    now(){
        return Date.now()
    }
}

new class DefaultNumbersStaticLibrary extends PoonyaStaticLibrary {
    constructor(){
        super('default.numbers', false, false, 'numbers');

        this.addField('random', this.random, FIELDFLAGS.CONSTANT);
        this.addField('isNumber', this.isNumber, FIELDFLAGS.CONSTANT);
        this.addField('parseInt', this.parseInt, FIELDFLAGS.CONSTANT);
    }

    random(service, f, t){
        if(typeof f == 'number' && typeof t == 'number' && !isNaN(f) && !isNaN(t))
            return Math.random()
        else
            return Math.round(f + Math.random() * (t - f));
    }

    isNumber(service, o){
        return !isNaN(o) && typeof o === 'number';
    }

    parseInt(service, numb){
        return isNaN(numb = parseInt(numb)) ? null : numb;
    }
}

class PoonyaObjectPrototype extends PoonyaPrototype {
    constructor(){
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

    keys(){
        return this.keys();
    }

    values(){
        return this.values();
    }

    assign(service, ...args){
        for(let i = 0, leng = args.length; i < leng; i++)
            this.append(args[i]);
    }

    set(service, key, value){
        this.set(service.context, key, value);
    }

    has(service, key){
        return this.has(key);
    }

    get(service, key){
        return this.get(key);
    }

    remove(service, key){
        this.delete(key);
    }

    create(){
        return new Object();
    }
}

class PoonyaIntegerPrototype extends PoonyaPrototype {
    constructor(){
        super([], 'Integer');
    }
}

class PoonyaNumberPrototype extends PoonyaPrototype {
    constructor(){
        super([], 'Number');
    }
}

class PoonyaBooleanPrototype extends PoonyaPrototype {
    constructor(){
        super([], 'Boolean');
    }
}

class PoonyaNullPrototype extends PoonyaPrototype {
    constructor(){
        super([], 'Null');
    }
}

class PoonyaStringPrototype extends PoonyaPrototype {
    constructor(context){
        super([], 'String');

        this.addField('charAt', this.charAt, FIELDFLAGS.CONSTANT, context);
        this.addField('length', this.length, FIELDFLAGS.CONSTANT | FIELDFLAGS.PROPERTY, context);
    }

    charAt(service, index){
        if(index != null) {
            return this.data.charAt(index);
        } else return null;
    }

    length(service) {
        return this.data.length;
    }
}

class PoonyaArrayPrototype extends PoonyaPrototype {
    constructor(context){
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

    from(service,...defs){
        return defs;
    }

    includes(service, target){
        for(let [key, value] of this.fields){
            if(value.result(service.context, null, service.throw_error) == target)
                return true;
        }

        return false;
    }

    remove(service, from, to){
        if(typeof from != 'number' || isNaN(from))
            service.throw_error(service.position, new Exceptions.PoonyaException('From must have a number type'));

        if(typeof to != 'number' || isNaN(to))
            service.throw_error(service.position, new Exceptions.PoonyaException('To must have a number type'))

        const delta = to - from;

        while(from != to){
            this.remove(from);

            from += delta;
        }
    }

    indexOf(service, target){
        for(let [key, value] of this.fields){
            if(value.result(service.context, null, service.throw_error) == target)
                return key;
        }
        
        return -1;
    }

    length(){
        return this.fields.size;
    }

    append(service, value){
        this.push(value)
    }

    concat(service, ...args){
        for(let i = 0, leng = args.length; i < leng; i++) {
            for(let j = 0, j_leng = args[i].length; j < j_leng; j++){
                this.push(args[i][j]);
            }
        }
    }

    slice(service, from, to){
        if(typeof from != 'number' || isNaN(from))
            service.throw_error(service.position, new Exceptions.PoonyaException('From must have a number type'));

        if(typeof to != 'number' || isNaN(to))
            service.throw_error(service.position, new Exceptions.PoonyaException('To must have a number type'));

        const delta = to - from
            , out = new Array();

        while(from != to){
            out.push(this.get(from));

            from += delta;
        }

        return out;
    }

    pop(service){
        const buffer = this.fields.get(this.fields.size - 1);

        this.fields.remove(this.fields.size - 1);

        return buffer;
    }
}

new class DefaultStaticLibrary extends PoonyaStaticLibrary {
    constructor(){
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

    log(service, ...args){
        console.log(...args)
    }
}
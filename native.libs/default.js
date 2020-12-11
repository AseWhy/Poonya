const { PoonyaStaticLibrary, PoonyaNativePrototype, FIELDFLAGS, Exceptions } = module.import()
    ,   date = new Date();

new class DefaultMathStaticLibrary extends PoonyaStaticLibrary {
    constructor(){
        super('default.math', false, false, 'math');

        this.addField('floor', this.floor);
        this.addField('round', this.round);
        this.addField('ceil', this.ceil);
        this.addField('abs', this.abs);
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

        this.addField('test', this.test);
        this.addField('replace', this.replace);
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

        this.addField('minutes', this.minutes);
        this.addField('seconds', this.seconds);
        this.addField('month', this.month);
        this.addField('hours', this.hours);
        this.addField('year', this.year);
        this.addField('day', this.day);
        this.addField('now', this.now);
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

        this.addField('random', this.random);
        this.addField('isNumber', this.isNumber);
        this.addField('parseInt', this.parseInt);
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

class PoonyaObjectPrototype extends PoonyaNativePrototype {
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
        this.set(key, value);
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

class PoonyaArrayPrototype extends PoonyaNativePrototype {
    constructor(){
        super([], 'Array');

        this.addField('unregister', this.unregister, FIELDFLAGS.CONSTANT);
        this.addField('includes', this.includes, FIELDFLAGS.CONSTANT);
        this.addField('indexOf', this.indexOf, FIELDFLAGS.CONSTANT);
        this.addField('create', this.create, FIELDFLAGS.CONSTANT | FIELDFLAGS.STATIC);
        this.addField('concat', this.concat, FIELDFLAGS.CONSTANT);
        this.addField('append', this.append, FIELDFLAGS.CONSTANT);
        this.addField('length', this.length, FIELDFLAGS.CONSTANT);
        this.addField('remove', this.remove, FIELDFLAGS.CONSTANT);
        this.addField('slice', this.slice, FIELDFLAGS.CONSTANT);
        this.addField('from', this.from, FIELDFLAGS.CONSTANT | FIELDFLAGS.STATIC);
        this.addField('pop', this.pop, FIELDFLAGS.CONSTANT);
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

    create(){
        return new Array();
    }

    unregister(service){
        
    }
}

new class DefaultStringStaticLibrary extends PoonyaStaticLibrary {
    constructor(){
        super('default.strings', false, false, 'strings');

        this.addField('getUniqueIdent', this.getUniqueIdent);
        this.addField('unregister', this.unregister);
        this.addField('substring', this.substring);
        this.addField('toString', this.toString);
        this.addField('replace', this.replace);
        this.addField('length', this.length);
        this.addField('split', this.split);
        this.addField('trim', this.trim);
        this.addField('join', this.join);
    }

    toString(service, obj){
        if(obj != null){
            return obj.toString();
        } else {
            return 'null';
        }
    }

    getUniqueIdent(){
        return Utils.unique_id() + Utils.random_id();
    }

    substring (service, input, from, to) {
        if(typeof input === "string")
            return input.substring(from, to);
        else
            return null
    }

    replace(service, input, from, to){
        return input.replace(from, to);
    }

    trim(service, str){
        if(typeof str === 'string')
            return str.trim();
        else
            return str;
    }

    length(service, string){
        return string.length;
    }

    split(service, input, splitter){
        if(typeof input === "string")
            return input.split(splitter);
        else
            return null
    }

    unregister(service, input){
        if(typeof input === "string")
            return input.toLowerCase();
        else
            return null
    }

    join(service, arr, p, s){
        if(arr != null){
            s = s || "";

            if(p !== null){
                const o = new Array(),
                    l = arr.length,
                    r = [/#/g, /&/g];
                
                if(p.indexOf("&") === -1)
                    for(let i = 0; i < l; i++) 
                        o.push(arr[i], p.replace(r[0], i + 1));
                else
                    for(let i = 0; i < l; i++) 
                        o.push(p.replace(r[0], i + 1).replace(r[1], arr[i]));

                return o.join(s);
            } else {
                return arr.join(s);
            }
        } else {
            return null;
        }
    }
}

new class DefaultStaticLibrary extends PoonyaStaticLibrary {
    constructor(){
        super('default', true);

        this.addField('endd', '\n\n');
        this.addField('endl', '\n');
        this.addField('tab', '\t');

        this.addField('log', this.log);

        this.expandClass(new PoonyaObjectPrototype());
        this.expandClass(new PoonyaArrayPrototype());

        this.addLib('default.strings');
        this.addLib('default.numbers');
        this.addLib('default.regexp');
        this.addLib('default.dates');
        this.addLib('default.math');
    }

    log(service, ...args){
        global.common_logger.log(...args)
    }
}
const date = new Date();

new class DefaultMathStaticLibrary extends NativeLibrary {
    constructor(){
        super('default.lib.math', false, false, 'math');

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

new class DefaultRegExpStaticLibrary extends NativeLibrary {
    constructor(){
        super('default.lib.regexp', false, false, 'regexp');

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

new class DefaultDatesStaticLibrary extends NativeLibrary {
    constructor(){
        super('default.lib.dates', false, false, 'dates');

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

new class DefaultNumbersStaticLibrary extends NativeLibrary {
    constructor(){
        super('default.lib.numbers', false, false, 'numbers');

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

class PoonyaObjectPrototype extends PoonyaPrototype {
    constructor(){
        super([], 'Object');

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
}

class PoonyaArrayPrototype extends PoonyaPrototype {
    constructor(){
        super([], 'Array');

        this.addField('unregister', this.unregister, FIELDFLAGS.CONSTANT);
        this.addField('includes', this.includes, FIELDFLAGS.CONSTANT);
        this.addField('indexOf', this.indexOf, FIELDFLAGS.CONSTANT);
        this.addField('create', this.create, FIELDFLAGS.CONSTANT);
        this.addField('concat', this.concat, FIELDFLAGS.CONSTANT);
        this.addField('append', this.append, FIELDFLAGS.CONSTANT);
        this.addField('length', this.length, FIELDFLAGS.CONSTANT);
        this.addField('remove', this.remove, FIELDFLAGS.CONSTANT);
        this.addField('slice', this.slice, FIELDFLAGS.CONSTANT);
        this.addField('from', this.from, FIELDFLAGS.CONSTANT);
        this.addField('pop', this.pop, FIELDFLAGS.CONSTANT);
    }

    from(service,...defs){
        return defs;
    }

    includes(service, arr, target){
        if(arr != null){
            return arr.includes(target);
        } else {
            return false;
        }
    }

    remove(service, arr, from, to){
        const rest = arr.slice((to || from) + 1 || arr.length);

        arr.length = from < 0 ? arr.length + from : from;

        arr.push.apply(arr, rest);

        return arr;
    }

    indexOf(service, arr, value){
        return arr.indexOf(value);
    }

    length(service, array){
        return array.length;
    }

    append(service, arr, value){
        if(arr != null){
            arr.push(value);

            return arr;
        } else {
            return null;
        }
    }

    concat(service, ...args){
        return [].concat(...args);
    }

    slice(service, arr, ...args){
        if(arr != null){
            return arr.slice(...args);
        } else {
            return null;
        }
    }

    pop(service, arr){
        if(arr != null){
            arr.pop();

            return arr;
        } else {
            return null;
        }
    }

    create(){
        return new Array();
    }

    unregister(service, arr){
        if(arr != null){
            for(let i = 0, leng = arr.length;i < leng;i++)
                arr[i] = arr[i] != null ? arr[i].toString().toLowerCase() : 'null';
            
            return arr;
        } else {
            return null;
        }
    }
}

new class DefaultStringStaticLibrary extends NativeLibrary {
    constructor(){
        super('default.lib.strings', false, false, 'strings');

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

new class DefaultStaticLibrary extends NativeLibrary {
    constructor(){
        super('default.lib', true);

        this.addField('endd', '\n\n');
        this.addField('endl', '\n');

        this.addField('log', this.log);

        this.expandClass(new PoonyaObjectPrototype());
        this.expandClass(new PoonyaArrayPrototype());

        this.addLib('default.lib.strings');
        this.addLib('default.lib.numbers');
        this.addLib('default.lib.regexp');
        this.addLib('default.lib.dates');
        this.addLib('default.lib.math');
    }

    log(service, ...args){
        global.common_logger.log(...args)
    }
}
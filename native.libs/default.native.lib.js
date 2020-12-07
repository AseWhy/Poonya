const date = new Date();

new class DefaultMathStaticLibrary extends NativeLibrary {
    constructor(){
        super('default.lib.math');

        this.addMethod('floor', this.floor);
        this.addMethod('round', this.round);
        this.addMethod('ceil', this.ceil);
        this.addMethod('abs', this.abs);
    }

    ceil(n) {
        if(typeof n === 'number' && !isNaN(n))
            return Math.ceil(n);
        return null;
    }

    floor(n) {
        if(typeof n === 'number' && !isNaN(n))
            return Math.floor(n);
        return null;
    }

    round(n){
        if(typeof n === 'number' && !isNaN(n))
            return Math.round(n);
        return null;
    }

    abs(n){
        if(typeof n === 'number' && !isNaN(n))
            return Math.abs(n);
        return null;
    }
}

new class DefaultRegExpStaticLibrary extends NativeLibrary {
    constructor(){
        super('default.lib.regexp');

        this.addMethod('test', this.test);
        this.addMethod('replace', this.replace);
    }

    test (expression, flags, string) {
        return new RegExp(expression, flags ? flags : undefined).test(string);
    }

    replace (expression, flags, string, to) {
        return string.replace(new RegExp(expression, flags ? flags : undefined), to);
    }
}

new class DefaultDatesStaticLibrary extends NativeLibrary {
    constructor(){
        super('default.lib.dates');

        this.addMethod('minutes', this.minutes);
        this.addMethod('seconds', this.seconds);
        this.addMethod('month', this.month);
        this.addMethod('hours', this.hours);
        this.addMethod('year', this.year);
        this.addMethod('day', this.day);
        this.addMethod('now', this.now);
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
        super('default.lib.numbers');

        this.addMethod('random', this.random);
        this.addMethod('isNumber', this.isNumber);
        this.addMethod('parseInt', this.parseInt);
    }

    random(f, t){
        if(typeof f == 'number' && typeof t == 'number' && !isNaN(f) && !isNaN(t))
            return Math.random()
        else
            return Math.round(f + Math.random() * (t - f));
    }

    isNumber(o){
        return !isNaN(o) && typeof o === 'number';
    }

    parseInt(numb){
        return isNaN(numb = parseInt(numb)) ? null : numb;
    }
}

new class DefaultObjectsStaticLibrary extends NativeLibrary {
    constructor(){
        super('default.lib.objects');

        this.addMethod('values', this.values);
        this.addMethod('assign', this.assign);
        this.addMethod('create', this.create);
        this.addMethod('remove', this.remove);
        this.addMethod('keys', this.keys);
        this.addMethod('set', this.set);
        this.addMethod('has', this.has);
        this.addMethod('get', this.get);
    }

    keys(obj){
        return Object.keys(obj);
    }

    values(obj){
        return Object.values(obj);
    }

    assign(obj, ...args){
        if(typeof obj === 'object')
            return Object.assign(obj, ...args);
        else
            return null;
    }

    set(obj, key, value){
        obj[key] = value;

        return obj;
    }

    has(obj, key){
        return obj[key] !== undefined;
    }

    get(obj, key){
        return obj[key];
    }

    create(){
        return new Object();
    }

    remove(obj, key){
        delete obj[key];

        return obj;
    }
}

new class DefaultArraysStaticLibrary extends NativeLibrary {
    constructor(){
        super('default.lib.arrays');

        this.addMethod('unregister', this.unregister);
        this.addMethod('includes', this.includes);
        this.addMethod('indexOf', this.indexOf);
        this.addMethod('create', this.create);
        this.addMethod('concat', this.concat);
        this.addMethod('append', this.append);
        this.addMethod('length', this.length);
        this.addMethod('remove', this.remove);
        this.addMethod('slice', this.slice);
        this.addMethod('from', this.from);
        this.addMethod('pop', this.pop);
    }

    from(...defs){
        return defs;
    }

    includes(arr, target){
        if(arr != null){
            return arr.includes(target);
        } else {
            return false;
        }
    }

    remove(arr, from, to){
        const rest = arr.slice((to || from) + 1 || arr.length);

        arr.length = from < 0 ? arr.length + from : from;

        arr.push.apply(arr, rest);

        return arr;
    }

    indexOf(arr, value){
        return arr.indexOf(value);
    }

    length(array){
        return array.length;
    }

    append(arr, value){
        if(arr != null){
            arr.push(value);

            return arr;
        } else {
            return null;
        }
    }

    concat(...args){
        return [].concat(...args);
    }

    slice(arr, ...args){
        if(arr != null){
            return arr.slice(...args);
        } else {
            return null;
        }
    }

    pop(arr){
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

    unregister(arr){
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
        super('default.lib.strings');

        this.addMethod('getUniqueIdent', this.getUniqueIdent);
        this.addMethod('unregister', this.unregister);
        this.addMethod('substring', this.substring);
        this.addMethod('toString', this.toString);
        this.addMethod('replace', this.replace);
        this.addMethod('length', this.length);
        this.addMethod('split', this.split);
        this.addMethod('trim', this.trim);
        this.addMethod('join', this.join);
    }

    toString(obj){
        if(obj != null){
            return obj.toString();
        } else {
            return 'null';
        }
    }

    getUniqueIdent(){
        return Utils.unique_id() + Utils.random_id();
    }

    substring (input, from, to) {
        if(typeof input === "string")
            return input.substring(from, to);
        else
            return null
    }

    replace(input, from, to){
        return input.replace(from, to);
    }

    trim(str){
        if(typeof str === 'string')
            return str.trim();
        else
            return str;
    }

    length(string){
        return string.length;
    }

    split(input, splitter){
        if(typeof input === "string")
            return input.split(splitter);
        else
            return null
    }

    unregister(input){
        if(typeof input === "string")
            return input.toLowerCase();
        else
            return null
    }

    join(arr, p, s){
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

        this.addMethod('log', this.log);

        this.addLib('default.lib.strings');
        this.addLib('default.lib.objects');
        this.addLib('default.lib.numbers');
        this.addLib('default.lib.regexp');
        this.addLib('default.lib.arrays');
        this.addLib('default.lib.dates');
        this.addLib('default.lib.math');
    }

    log(...args){
        global.common_logger.log(...args)
    }
}
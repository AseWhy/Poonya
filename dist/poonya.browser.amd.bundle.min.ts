import { EventEmitter } from 'events';
import { Writable } from 'stream';
import { ImportFile as _ImportFile } from '../src/importer';
import { iPoonyaConstructsData } from '../src/classes/interfaces';
import { Heap, Context } from '../src/classes/storage';

export interface iInputData {
    raw?: String;
    path?: String;
    charset?: String;
}

export class PoonyaOutputStream extends EventEmitter {
    constructor(){
        super();
    }

    toReadable() : ReadableStream | Writable { return; };
    pipe<T>(stream: T) : T { return; };
    write(data: any) : void  {};
    end() : void {}
    complete() : Promise<Array<any>> | Array<any> { return new Promise(res => {}) };
}

export class CodeEmitter extends EventEmitter {
    constructor(input: iInputData | String, import_s: Array<String>, logger: Console, onload: Function){super();}
    throwError(pos: Number, error: Function, {rad_of = 5} : {rad_of: Number}) : void {}
    result(data?: Object | Heap | Context, error?: Function) : PoonyaOutputStream { return new PoonyaOutputStream() };
}

export class MessagePattern extends CodeEmitter{
    constructor(input: iInputData | String, {block_prefix = 'poonya'} : {block_prefix: String}, import_s?: Array<String>, logger?: Console){
        super(null, null, null, null);
    }
}

export class ExecutionPattern extends CodeEmitter{
    constructor(input: iInputData | String, import_s?: Array<String>, logger?: Console){
        super(null, null, null, null);
    }
}

export class ExpressionPattern extends CodeEmitter{
    constructor(input: iInputData | String, import_s?: Array<String>, logger?: Console){
        super(null, null, null, null);
    }
}

export function createContext(data: any, libs: String | Array<String>) : Promise<Context>{ return new Promise(res => {}) };
export function createPattern(Pattern: CodeEmitter, ...args: any) : Promise<iPoonyaConstructsData> { return new Promise(res => {}) };
export const ImportFile = _ImportFile;
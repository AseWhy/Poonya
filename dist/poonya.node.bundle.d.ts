import { EventEmitter } from 'events';
import { Writable } from 'stream';
import { ImportFile as _ImportFile, ImportDir as _ImportDir } from '../src/importer';
import { iPoonyaConstructsData } from '../src/classes/interfaces';
import { Heap, Context } from '../src/classes/storage';
import presset from '../src/preset';

export interface iInputData {
    raw?: String;
    path?: String;
    charset?: String;
}

export class PoonyaOutputStream extends EventEmitter {
    toReadable() : ReadableStream | Writable;
    pipe<T>(stream: T) : T;
    write(data: any) : void  {};
    end() : void {}
    complete() : Promise<Array<any>> | Array<any>;
}

export abstract class CodeEmitter extends EventEmitter {
    constructor(input: iInputData | String, import_s: Array<String>, logger: Console, onload: Function);
    abstract throwError(pos: Number, error: Function, { rad_of = 5 } : { rad_of: Number }) : void;
    abstract result(data?: Object | Heap | Context, error?: Function) : PoonyaOutputStream;
}

export class MessagePattern extends CodeEmitter{
    constructor(input: iInputData | String, {block_prefix = 'poonya'} : {block_prefix: String}, import_s?: Array<String>, logger?: Console);
}

export class ExecutionPattern extends CodeEmitter{
    constructor(input: iInputData | String, import_s?: Array<String>, logger?: Console);
}

export class ExpressionPattern extends CodeEmitter{
    constructor(input: iInputData | String, import_s?: Array<String>, logger?: Console)
}

export function createContext(data: object, ...libs: Array<string | Array<string>>) : Promise<Context>;
export function createPattern(Pattern: CodeEmitter, ...args: any[]) : Promise<iPoonyaConstructsData>;
export const ImportFile = _ImportFile;
export const ImportDir = _ImportDir;

//
// Static library
//
module.exports.PoonyaPrototype = presset.PoonyaPrototype;
module.exports.PoonyaStaticLibrary = presset.PoonyaStaticLibrary;
module.exports.Exceptions = presset.Exceptions;
module.exports.FIELDFLAGS = presset.FIELDFLAGS;
import { EventEmitter } from 'events';
import { Writable } from 'stream';
import { ImportFile as _ImportFile, ImportDir as _ImportDir } from '../src/importer';
import { iPoonyaConstructsData } from '../src/classes/interfaces';
import { Heap, Context } from '../src/classes/storage';
import { Exceptions as _Exceptions, FIELDFLAGS as _FIELDFLAGS, PoonyaPrototype as _PoonyaPrototype, PoonyaStaticLibrary as _PoonyaStaticLibrary } from '../src/preset';
declare interface iInputData {
    raw?: String;
    path?: String;
    charset?: String;
}
declare class PoonyaOutputStream extends EventEmitter {
    toReadable() : ReadableStream | Writable;
    pipe<T>(stream: T) : T;
    write(data: any) : void;
    end() : void;
    complete() : Promise<Array<any>> | Array<any>;
}

declare abstract class CodeEmitter extends EventEmitter {
    constructor(input: iInputData | String, import_s: Array<String>, logger: Console, onload: Function);
    abstract throwError(pos: Number, error: Function, { rad_of } : { rad_of: Number }) : void;
    abstract result(data?: Object | Heap | Context, error?: Function) : PoonyaOutputStream;
}

declare class MessagePattern extends CodeEmitter {
    throwError(pos: Number, error: Function, { rad_of }: { rad_of: Number; }): void;
    result(data?: Object | Heap | Context, error?: Function): PoonyaOutputStream;
    constructor(input: iInputData | String, { block_prefix } : { block_prefix: String }, import_s?: Array<String>, logger?: Console);
}

declare class ExecutionPattern extends CodeEmitter{
    throwError(pos: Number, error: Function, { rad_of }: { rad_of: Number; }): void;
    result(data?: Object | Heap | Context, error?: Function): PoonyaOutputStream;
    constructor(input: iInputData | String, import_s?: Array<String>, logger?: Console);
}

declare class ExpressionPattern extends CodeEmitter {
    throwError(pos: Number, error: Function, { rad_of }: { rad_of: Number; }): void;
    result(data?: Object | Heap | Context, error?: Function): PoonyaOutputStream;
    constructor(input: iInputData | String, import_s?: Array<String>, logger?: Console)
}

declare function createContext(data: object, ...libs: Array<string | Array<string>>) : Promise<Context>;
declare function createPattern<T extends CodeEmitter>(Pattern: { new (...args: any[]): T }, ...args: any[]) : Promise<iPoonyaConstructsData>;
declare const ImportDir: typeof _ImportDir;
declare const ImportFile: typeof _ImportFile;

//
// Static library
//
declare const PoonyaPrototype: typeof _PoonyaPrototype;
declare const PoonyaStaticLibrary: typeof _PoonyaStaticLibrary;
declare const Exceptions: typeof _Exceptions;
declare const FIELDFLAGS: typeof _FIELDFLAGS;

export = ChunkHandler;

declare class ChunkHandler {
    constructor();
    isString (value: any): boolean;
    isArray (value: any): boolean;
    isObject (value: any): boolean;
    isEmpty (value: any): boolean;
    isEmptyArray (value: any): boolean;
    isEmptyObject (value: any): boolean;
    blockingTest (ms: number): number;
    getBestSize (length: number|string, split?: number|string): number;
    getRandomInt (min: number, max: number): number;
    make (value: string|Array<string>|Array<object>|Array<number>, size?: string|number): Array<string>|Array<object>|Array<number>;
    makeAleatory (value: number|Array<string>|Array<object>|Array<number>, numberOfChunks: number): Array<string>|Array<object>|Array<number>;
    merge (data: object): string|Array<string>|Array<object>|Array<number>;
    add (name: string, data: object, part: number): this;
    remove (name: string): this;
    clean (): this;
    get (name: string): string;
    getBody (): object;
    promisify (fn: Function): this;
}

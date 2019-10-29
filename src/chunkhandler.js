/*!
 * ChunkHandler ES6 v1.2.0 [NodeJS or Browser]
 * https://github.com/aalfiann/chunk-handler
 *
 * Copyright 2019 M ABD AZIZ ALFIAN
 * Released under the MIT license
 * https://github.com/aalfiann/chunk-handler/blob/master/LICENSE
 */
"use strict";
/**
 * Chunk Handler Class
 */
class ChunkHandler {

    /**
     * Constructor 
     */
    constructor() {
        this.body = {};
    }

    /**
     * Determine value is string
     * @param {*} value
     * @return {bool} 
     */
    isString (value) {
        return typeof value === 'string' || value instanceof String;
    }

    /**
     * Determine value is array
     * @param {*} value 
     * @return {bool}
     */
    isArray (value) {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    /**
     * Determine value is object
     * @param {*} value 
     * @return {bool}
     */
    isObject (value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    /**
     * Determine value is empty
     * @param {var} value
     * @return {bool} 
     */
    isEmpty(value) {
        return (value === undefined || value === null || value === '');
    }

    /**
     * Determine value is empty and array
     * @param {*} value 
     * @return {bool}
     */
    isEmptyArray(value) {
        return (value === undefined || value === null || value.length === 0);
    }

    /**
     * Determine object value is empty
     * @param {*} value 
     * @return {bool}
     */
    isEmptyObject(value) {
        return ((value === undefined || value === null) || (Object.keys(value).length === 0 && value.constructor === Object));
    }

    /**
     * Blocking test for asynchronous
     * @param {integer} ms      this is miliseconds value for event block
     * @return {int}
     */
    blockingTest(ms=1000) {
        var start = Date.now();
        var time = start + ms;
        while (Date.now() < time) {};
        return start;
    }

    /**
     * Get best size to chunk
     * @param {int|string} length       this is the maximum array/string length number
     * @param {int|string} split        [optional] split value will create maximum (value*10) means if split is 5 then will make array length not more than 50
     * @return {int} 
     */
    getBestSize(length,split=5) {
        length = parseInt(length);
        split = parseInt(split);
        if(split < 1 || split > 10) {
            throw new Error('Split value must be between 1-10');
        }
        if(length <= 100000 && split > 1) {
            split = 1;
        }
        if(length > 100000 && length <= 1000000 && split === 1) {
            split = 5;
        }
        var max = (split * 10);
        var start = (max-(Math.ceil(max/10)));
        var slice = (max-start);
        switch(true) {
            case (length <= 5000000 && length > 4000000):
                return Math.ceil(length/(max-(slice * 1)));
            case (length <= 4000000 && length > 3500000):
                return Math.ceil(length/(max-(slice * 2)));
            case (length <= 3500000 && length > 3000000):
                return Math.ceil(length/(max-(slice * 3)));
            case (length <= 3000000 && length > 2500000):
                return Math.ceil(length/(max-(slice * 4)));
            case (length <= 2500000 && length > 2000000):
                return Math.ceil(length/(max-(slice * 5)));
            case (length <= 2000000 && length > 1500000):
                return Math.ceil(length/(max-(slice * 6)));
            case (length <= 1500000 && length > 1000000):
                return Math.ceil(length/(max-(slice * 7)));
            case (length <= 1000000 && length > 500000):
                return Math.ceil(length/(max-(slice * 8)));
            case (length <= 500000 && length > 100000):
                return Math.ceil(length/(max-(slice * 9)));
            case (length <= 100000 && length > 50000):
                return Math.ceil(length/3);
            case (length <= 50000 && length > 10000):
                return Math.ceil(length/2);
            case (length <= 10000 && length > 1):
                return Math.ceil(length/1);
            default:
                return Math.ceil(length/max);
        }
    }

    /**
     * Make value to be chunked
     * @param {string|array} value      this is value to be chunked
     * @param {string|int} size         [optional] if value is type string then size will make split from letters per size number
     * @return {array}
     */
    make(value,size=100) {
        size = parseInt(size);

        if(!this.isString(value) && !this.isArray(value)) throw new Error('Value must be string or array');

        if(this.isString(value)) {
            var i = 0, o = 0, numChunks = Math.ceil(value.length / size), chunks = new Array(numChunks);
            for(i, o; i < numChunks; ++i, o += size) {
                chunks[i] = value.substr(o, size);
            }
            return chunks;
        } else {
            var result = [];
            // add each chunk to the result
            var x = 0, len = Math.ceil(value.length / size);
            for (x; x < len; x++) {
                var start = x * size;
                var end = start + size;
                result.push(value.slice(start, end));
            }
            return result;
        }
    }

    /**
     * Merge data chunked
     * @param {object} data     data is an array from this.get(name) 
     * @return {mixed}          could be string or array
     */
    merge(data) {
        if(!this.isArray(data) && this.isEmptyArray(data)) return '';
        
        var file = '';
        var i = 0, len = data.length;

        if(!this.isEmpty(data[0].data)){
            if(!this.isEmpty(data[0].part)) {
                data.sort(function(a, b) {
                    return parseFloat(a.part) - parseFloat(b.part);
                });
            }

            if(this.isArray(data[0].data)) {
                file = [];
            }
            
            for(i;i<len;i++) {
                if(this.isArray(data[i].data)) {
                    file = file.concat(data[i].data);
                } else {
                    file += data[i].data;
                }
            }
        } else {
            if(this.isArray(data[0])) {
                file = [];
            }

            for(i;i<len;i++) {
                if(this.isArray(data[i])) {
                    file = file.concat(data[i]);
                } else {
                    file += data[i];
                }
            }
        }
        return file;
    }

    /**
     * Add new or replace data chunk by it's name
     * @param {string} name 
     * @param {object} data
     * @param {int} part
     * @return {this}
     */
    add(name,data,part='') {
        if(this.isString(name)) {
            name = name.replace(/[^A-Z0-9]/ig, "_");
            if(data) {
                if(!this.isEmpty(part)) {
                    part = parseInt(part);
                    if(this.isEmpty(this.body[name])) {
                        this.body[name] = [];
                        this.body[name].push({'part':part,'data':data});
                    } else {
                        this.body[name].push({'part':part,'data':data});
                    }
                } else {
                    if(this.isEmpty(this.body[name])) {
                        this.body[name] = [];
                        this.body[name].push({'data':data});
                    } else {
                        this.body[name].push({'data':data});
                    }
                }
            }
        }
        return this;
    }

    /**
     * Remove data chunk by name
     * @param {string} name
     * @return {this}
     */
    remove(name) {
        if(this.isString(name)) {
            name = name.replace(/[^A-Z0-9]/ig, "_");
            delete this.body[name];
        }
        return this;
    }

    /**
     * Cleanup all data chunk
     */
    clean() {
        this.body = {};
        return this;
    }

    /**
     * Get data chunk by name
     * @param {string} name
     * @return {string} 
     */
    get(name) {
        name = name.replace(/[^A-Z0-9]/ig, "_");
        return this.body[name];
    }
  
    /**
     * Get all data chunk
     * @return {object}
     */
    getBody() {
        return this.body;
    }

    /**
     * Make asynchronous process with Promise
     * @param {*} fn
     * @return {this} 
     */
    promisify(fn) {
        var self = this;
        return new Promise(function(resolve, reject) {
            try{
                resolve(fn.call(self,self));
            } catch (err) {
                reject(err);
            }
        });
    }

}

if(typeof window === "undefined") module.exports = ChunkHandler;
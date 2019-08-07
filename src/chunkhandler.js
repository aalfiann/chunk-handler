/**
 * Chunk Handler
 */
'use strict';

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
        return (!Array.isArray(value) || !value.length);
    }

    /**
     * Determine object value is empty
     * @param {*} value 
     * @return {bool}
     */
    isEmptyObject(value) {
        for(var key in value) {
            if(value.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    /**
     * Make value to be chunked
     * @param {string|array} value      this is value to be chunked
     * @param {string|int} size         [optional] if value is type string then size will make split from letters per size number
     * @return {array}
     */
    make(value,size=100) {
        // default size to 100 item array or 100 chars string
        size = parseInt(size);

        if(!this.isString(value) && !this.isArray(value)) throw new Error('Value must be string or array');

        if(this.isString(value)) {
            var reg = new RegExp('.{1,' + size + '}', 'g');
            return value.match(reg);
        } else {
            var result = [];
            // add each chunk to the result
            for (var x = 0; x < Math.ceil(value.length / size); x++) {
                var start = x * size;
                var end = start + size;
                result.push(value.slice(start, end));
            }      
            return result;
        }
    }

    /**
     * Merge data chunked
     * @param {*} data      data is an array from this.get(name) 
     * @return {mixed}      could be string or array
     */
    merge(data) {
        if(!this.isArray(data) && this.isEmptyArray(data)) return '';

        data.sort(function(a, b) {
            return parseFloat(a.part) - parseFloat(b.part);
        });
        
        if(this.isArray(data[0].data)) {
            var file = [];
        } else {
            var file = '';
        }
        
        for(var i=0;i<data.length;i++) {
            if(this.isArray(data[i].data)) {
                file = file.concat(data[i].data);
            } else {
                file += data[i].data;
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
    add(name,data,part=null) {
        if(this.isString(name)) {
            if(data) {
                if(part) part = parseInt(part);
                if(this.isEmpty(this.body[name])) {
                    this.body[name] = [];
                    this.body[name].push({'part':part,'data':data});
                } else {
                    this.body[name].push({'part':part,'data':data});
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
        return this.body[name];
    }
  
    /**
     * Get all data chunk
     * @return {object}
     */
    getBody() {
        return this.body;
    }

}

module.exports = ChunkHandler;
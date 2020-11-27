/* ChunkHandler v1.3.4 | (c) 2020 M ABD AZIZ ALFIAN | MIT License | https://github.com/aalfiann/chunk-handler */
"use strict";
/**
 * Chunk Handler Class
 */

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ChunkHandler = /*#__PURE__*/function () {
  /**
   * Constructor 
   */
  function ChunkHandler() {
    _classCallCheck(this, ChunkHandler);

    this.body = {};
  }
  /**
   * Determine value is string
   * @param {*} value
   * @return {bool} 
   */


  _createClass(ChunkHandler, [{
    key: "isString",
    value: function isString(value) {
      return typeof value === 'string' || value instanceof String;
    }
    /**
     * Determine value is array
     * @param {*} value 
     * @return {bool}
     */

  }, {
    key: "isArray",
    value: function isArray(value) {
      if (value === undefined || value === '') {
        return false;
      }

      return value && _typeof(value) === 'object' && value.constructor === Array;
    }
    /**
     * Determine value is object
     * @param {*} value 
     * @return {bool}
     */

  }, {
    key: "isObject",
    value: function isObject(value) {
      if (value === undefined || value === '') {
        return false;
      }

      return value && _typeof(value) === 'object' && value.constructor === Object;
    }
    /**
     * Determine value is empty
     * @param {var} value
     * @return {bool} 
     */

  }, {
    key: "isEmpty",
    value: function isEmpty(value) {
      return value === undefined || value === null || value === '';
    }
    /**
     * Determine value is empty and array
     * @param {*} value 
     * @return {bool}
     */

  }, {
    key: "isEmptyArray",
    value: function isEmptyArray(value) {
      return value === undefined || value === null || value.length === 0;
    }
    /**
     * Determine object value is empty
     * @param {*} value 
     * @return {bool}
     */

  }, {
    key: "isEmptyObject",
    value: function isEmptyObject(value) {
      return value === undefined || value === null || Object.keys(value).length === 0 && value.constructor === Object;
    }
    /**
     * Blocking test for asynchronous
     * @param {integer} ms      this is miliseconds value for event block
     * @return {int}
     */

  }, {
    key: "blockingTest",
    value: function blockingTest() {
      var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var start = Date.now();
      var time = start + ms;

      while (Date.now() < time) {}

      ;
      return start;
    }
    /**
     * Get best size to chunk
     * @param {int|string} length       this is the maximum array/string length number
     * @param {int|string} split        [optional] split value will create maximum (value*10) means if split is 5 then will make array length not more than 50
     * @return {int} 
     */

  }, {
    key: "getBestSize",
    value: function getBestSize(length) {
      var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      length = parseInt(length);
      split = parseInt(split);

      if (split < 1 || split > 10) {
        throw new Error('Split value must be between 1-10');
      }

      if (length <= 100000 && split > 1) {
        split = 1;
      }

      if (length > 100000 && length <= 1000000 && split === 1) {
        split = 5;
      }

      var max = split * 10;
      var start = max - Math.ceil(max / 10);
      var slice = max - start;

      switch (true) {
        case length <= 5000000 && length > 4000000:
          return Math.ceil(length / (max - slice * 1));

        case length <= 4000000 && length > 3500000:
          return Math.ceil(length / (max - slice * 2));

        case length <= 3500000 && length > 3000000:
          return Math.ceil(length / (max - slice * 3));

        case length <= 3000000 && length > 2500000:
          return Math.ceil(length / (max - slice * 4));

        case length <= 2500000 && length > 2000000:
          return Math.ceil(length / (max - slice * 5));

        case length <= 2000000 && length > 1500000:
          return Math.ceil(length / (max - slice * 6));

        case length <= 1500000 && length > 1000000:
          return Math.ceil(length / (max - slice * 7));

        case length <= 1000000 && length > 500000:
          return Math.ceil(length / (max - slice * 8));

        case length <= 500000 && length > 100000:
          return Math.ceil(length / (max - slice * 9));

        case length <= 100000 && length > 50000:
          return Math.ceil(length / 3);

        case length <= 50000 && length > 10000:
          return Math.ceil(length / 2);

        case length <= 10000 && length > 1:
          return Math.ceil(length / 1);

        default:
          return Math.ceil(length / max);
      }
    }
    /**
     * Get random number between min and max values
     * @param {int} min min random value (included)
     * @param {int} max max random value (included)
     */

  }, {
    key: "getRandomInt",
    value: function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Make value to be chunked
     * @param {string|array} value      this is value to be chunked
     * @param {string|int} size         [optional] if value is type string then size will make split from letters per size number
     * @return {array}
     */

  }, {
    key: "make",
    value: function make(value) {
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      size = parseInt(size);
      if (!this.isString(value) && !this.isArray(value)) throw new Error('Value must be string or array');

      if (this.isString(value)) {
        var i = 0,
            o = 0,
            numChunks = Math.ceil(value.length / size),
            chunks = new Array(numChunks);

        for (i, o; i < numChunks; ++i, o += size) {
          chunks[i] = value.substr(o, size);
        }

        return chunks;
      } else {
        var result = []; // add each chunk to the result

        var x = 0,
            len = Math.ceil(value.length / size);

        for (x; x < len; x++) {
          var start = x * size;
          var end = start + size;
          result.push(value.slice(start, end));
        }

        return result;
      }
    }
    /**
     * Make aleatory chunks from value
     * @param {array} value         this is the array to be aleatory chunked 
     * @param {int} numberOfChunks  the number of chunks that will be created 
     */

  }, {
    key: "makeAleatory",
    value: function makeAleatory(value, numberOfChunks) {
      var array = value;
      var result = new Array();
      var chunkSize = parseInt(value.length / numberOfChunks, 10);
      var chunkIndex = 0;

      for (chunkIndex = 0; chunkIndex < numberOfChunks; chunkIndex++) {
        result[parseInt(chunkIndex, 10)] = [];

        for (var itemIndex = 0; itemIndex < chunkSize; itemIndex++) {
          // Gets a random index to be included in the chunk
          var randomIndex = this.getRandomInt(0, array.length - 1); // Inserts the item and remove it from array

          result[parseInt(chunkIndex, 10)].push(array.splice(randomIndex, 1)[0]);
        }
      } // Add the remaining items


      if (array.length > 0) {
        var _result$parseInt;

        (_result$parseInt = result[parseInt(chunkIndex - 1, 10)]).push.apply(_result$parseInt, _toConsumableArray(array));
      }

      return result;
    }
    /**
     * Merge data chunked
     * @param {object} data     data is an array from this.get(name) 
     * @return {mixed}          could be string or array
     */

  }, {
    key: "merge",
    value: function merge(data) {
      if (!this.isArray(data) && this.isEmptyArray(data)) return '';
      var file = '';
      var i = 0,
          len = data.length;

      if (!this.isEmpty(data[0].data)) {
        if (!this.isEmpty(data[0].part)) {
          data.sort(function (a, b) {
            return parseFloat(a.part) - parseFloat(b.part);
          });
        }

        if (this.isArray(data[0].data)) {
          file = [];
        }

        for (i; i < len; i++) {
          if (this.isArray(data[i].data)) {
            file = file.concat(data[i].data);
          } else {
            file += data[i].data;
          }
        }
      } else {
        if (this.isArray(data[0])) {
          file = [];
        }

        for (i; i < len; i++) {
          if (this.isArray(data[i])) {
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

  }, {
    key: "add",
    value: function add(name, data) {
      var part = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (this.isString(name)) {
        name = name.replace(/[^A-Z0-9]/ig, "_");

        if (data) {
          if (!this.isEmpty(part)) {
            part = parseInt(part);

            if (this.isEmpty(this.body[name])) {
              this.body[name] = [];
              this.body[name].push({
                'part': part,
                'data': data
              });
            } else {
              this.body[name].push({
                'part': part,
                'data': data
              });
            }
          } else {
            if (this.isEmpty(this.body[name])) {
              this.body[name] = [];
              this.body[name].push({
                'data': data
              });
            } else {
              this.body[name].push({
                'data': data
              });
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

  }, {
    key: "remove",
    value: function remove(name) {
      if (this.isString(name)) {
        name = name.replace(/[^A-Z0-9]/ig, "_");
        delete this.body[name];
      }

      return this;
    }
    /**
     * Cleanup all data chunk
     */

  }, {
    key: "clean",
    value: function clean() {
      this.body = {};
      return this;
    }
    /**
     * Get data chunk by name
     * @param {string} name
     * @return {string} 
     */

  }, {
    key: "get",
    value: function get(name) {
      name = name.replace(/[^A-Z0-9]/ig, "_");
      return this.body[name];
    }
    /**
     * Get all data chunk
     * @return {object}
     */

  }, {
    key: "getBody",
    value: function getBody() {
      return this.body;
    }
    /**
     * Make asynchronous process with Promise
     * @param {*} fn
     * @return {this} 
     */

  }, {
    key: "promisify",
    value: function promisify(fn) {
      var self = this;
      return new Promise(function (resolve, reject) {
        try {
          resolve(fn.call(self, self));
        } catch (err) {
          reject(err);
        }
      });
    }
  }]);

  return ChunkHandler;
}();

if (typeof window === "undefined") module.exports = ChunkHandler;
/*!
 * ChunkHandler ES5 v1.3.0 [Browser]
 * https://github.com/aalfiann/chunk-handler
 *
 * Copyright 2019 M ABD AZIZ ALFIAN
 * Released under the MIT license
 * https://github.com/aalfiann/chunk-handler/blob/master/LICENSE
 */
"use strict";
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ChunkHandler = function () {
  function ChunkHandler() {
    _classCallCheck(this, ChunkHandler);
    this.body = {};
  }
  _createClass(ChunkHandler, [{
    key: "isString", value: function isString(value) {
      return typeof value === 'string' || _instanceof(value, String);
    }
  }, {
    key: "isArray", value: function isArray(value) {
      return value && _typeof(value) === 'object' && value.constructor === Array;
    }
  }, {
    key: "isObject", value: function isObject(value) {
      return value && _typeof(value) === 'object' && value.constructor === Object;
    }
  }, {
    key: "isEmpty", value: function isEmpty(value) {
      return value === undefined || value === null || value === '';
    }
  }, {
    key: "isEmptyArray", value: function isEmptyArray(value) {
      return value === undefined || value === null || value.length === 0;
    }
  }, {
    key: "isEmptyObject", value: function isEmptyObject(value) {
      return value === undefined || value === null || Object.keys(value).length === 0 && value.constructor === Object;
    }
  }, {
    key: "blockingTest", value: function blockingTest() {
      var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
      var start = Date.now();
      var time = start + ms;
      while (Date.now() < time) {};
      return start;
    }
  }, {
    key: "getBestSize", value: function getBestSize(length) {
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
  }, {
    key: "getRandomInt", value: function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "make", value: function make(value) {
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      size = parseInt(size);
      if (!this.isString(value) && !this.isArray(value)) throw new Error('Value must be string or array');
      if (this.isString(value)) {
        var i = 0, o = 0, numChunks = Math.ceil(value.length / size), chunks = new Array(numChunks);
        for (i, o; i < numChunks; ++i, o += size) {
          chunks[i] = value.substr(o, size);
        }
        return chunks;
      } else {
        var result = [];
        var x = 0, len = Math.ceil(value.length / size);
        for (x; x < len; x++) {
          var start = x * size;
          var end = start + size;
          result.push(value.slice(start, end));
        }
        return result;
      }
    }
  }, {
    key: "makeAleatory", value: function makeAleatory(value, numberOfChunks) {
      var array = value;
      var result = new Array();
      var chunkSize = parseInt(value.length / numberOfChunks, 10);
      var chunkIndex = 0;
      for (chunkIndex = 0; chunkIndex < numberOfChunks; chunkIndex++) {
        result[parseInt(chunkIndex, 10)] = [];
        for (var itemIndex = 0; itemIndex < chunkSize; itemIndex++) {
          var randomIndex = this.getRandomInt(0, array.length - 1);
          result[parseInt(chunkIndex, 10)].push(array.splice(randomIndex, 1)[0]);
        }
      }
      if (array.length > 0) {
        var _result$parseInt;
        (_result$parseInt = result[parseInt(chunkIndex - 1, 10)]).push.apply(_result$parseInt, _toConsumableArray(array));
      }
      return result;
    }
  }, {
    key: "merge", value: function merge(data) {
      if (!this.isArray(data) && this.isEmptyArray(data)) return '';
      var file = '';
      var i = 0, len = data.length;
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
  }, {
    key: "add", value: function add(name, data) {
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
  }, {
    key: "remove", value: function remove(name) {
      if (this.isString(name)) {
        name = name.replace(/[^A-Z0-9]/ig, "_");
        delete this.body[name];
      }
      return this;
    }
  }, {
    key: "clean", value: function clean() {
      this.body = {};
      return this;
    }
  }, {
    key: "get", value: function get(name) {
      name = name.replace(/[^A-Z0-9]/ig, "_");
      return this.body[name];
    }
  }, {
    key: "getBody", value: function getBody() {
      return this.body;
    }
  }, {
    key: "promisify", value: function promisify(fn) {
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
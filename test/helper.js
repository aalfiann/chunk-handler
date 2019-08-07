const assert = require('assert');
const ChunkHandler = require('../src/chunkhandler.js');

describe('helper function test', function(){

    var ch  = new ChunkHandler();

    it('is string', function() {
        assert.equal(ch.isString('abc'),true);
        assert.equal(ch.isString(''),true);
        assert.equal(ch.isString(1),false);
        assert.equal(ch.isString([]),false);
        assert.equal(ch.isString({}),false);
    });

    it('is array', function() {
        assert.equal(ch.isArray([1,2,3]),true);
        assert.equal(ch.isArray([]),true);
        assert.equal(ch.isArray({}),false);
        assert.equal(ch.isArray(''),false);
        assert.equal(ch.isArray(1),false);
    });

    it('is object', function() {
        assert.equal(ch.isObject({id:1,name:'abc'}),true);
        assert.equal(ch.isObject({}),true);
        assert.equal(ch.isObject([]),false);
        assert.equal(ch.isObject(''),false);
        assert.equal(ch.isObject(1),false);
    });

    it('is empty string', function() {
        assert.equal(ch.isEmpty(''),true);
        assert.equal(ch.isEmpty('abc'),false);
        assert.equal(ch.isEmpty(1),false);
        assert.equal(ch.isEmpty([]),false);
        assert.equal(ch.isEmpty({}),false);
    });

    it('is empty array', function() {
        assert.equal(ch.isEmptyArray([]),true);
        assert.equal(ch.isEmptyArray({}),true);
        assert.equal(ch.isEmptyArray({id:1}),true);
        assert.equal(ch.isEmptyArray('1'),true);
        assert.equal(ch.isEmptyArray(1),true);
        assert.equal(ch.isEmptyArray([1,2,3]),false);
    });

    it('is empty object also can be use to check empty array', function() {
        assert.equal(ch.isEmptyObject([]),true);
        assert.equal(ch.isEmptyObject({}),true);
        assert.equal(ch.isEmptyObject(1),true);
        assert.equal(ch.isEmptyObject({id:1}),false);
        assert.equal(ch.isEmptyObject('1'),false);
        assert.equal(ch.isEmptyObject([1,2,3]),false);
    });

});
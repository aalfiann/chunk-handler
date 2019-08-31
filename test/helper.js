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

    it('is empty object parameter value must hasOwnProperty',function(){
        const obj = Object.create({name: 'inherited'})
        assert.equal(true,ch.isEmptyObject(obj));
    });

    it('getBestSize split 5 with 990 chars >> size will not change', function(){
        var value = 990;
        var result = Math.ceil(value/ch.getBestSize(value));
        assert.equal(true,(result<=50));
        assert.equal(ch.getBestSize(990),990);
    });

    it('getBestSize split 5 with 90000 chars', function(){
        var value = 90000;
        var result = Math.ceil(value/ch.getBestSize(value));
        assert.equal(true,(result<=50));
    });

    it('getBestSize split 5 with 900000 chars', function(){
        var value = 900000;
        var result = Math.ceil(value/ch.getBestSize(value));
        assert.equal(true,(result<=50));
    });

    it('getBestSize split 5 with 1400000 chars', function(){
        var value = 1400000;
        var result = Math.ceil(value/ch.getBestSize(value));
        assert.equal(true,(result<=50));
    });

    it('getBestSize split 5 with 1900000 chars', function(){
        var value = 1900000;
        var result = Math.ceil(value/ch.getBestSize(value));
        assert.equal(true,(result<=50));
    });

    it('getBestSize split 5 with 2400000 chars', function(){
        var value = 2400000;
        var result = Math.ceil(value/ch.getBestSize(value));
        assert.equal(true,(result<=50));
    });

    it('getBestSize split 5 with 2900000 chars', function(){
        var value = 2900000;
        var result = Math.ceil(value/ch.getBestSize(value));
        assert.equal(true,(result<=50));
    });

    it('getBestSize split 5 with 3400000 chars', function(){
        var value = 3400000;
        var result = Math.ceil(value/ch.getBestSize(value));
        assert.equal(true,(result<=50));
    });

    it('getBestSize split 5 with 3900000 chars', function(){
        var value = 3900000;
        var result = Math.ceil(value/ch.getBestSize(value));
        assert.equal(true,(result<=50));
    });

    it('getBestSize split 5 with 4500000 chars', function(){
        var value = 4500000;
        var result = Math.ceil(value/ch.getBestSize(value));
        assert.equal(true,(result<=50));
    });

    it('getBestSize split 5 with 6000000 chars', function(){
        var value = 6000000;
        var result = Math.ceil(value/ch.getBestSize(value));
        assert.equal(true,(result<=50));
    });

});
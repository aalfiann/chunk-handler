const assert = require('assert');
const ChunkHandler = require('../src/chunkhandler.js');

describe('Intentional failure test', function(){

    var ch  = new ChunkHandler();

    it('call make() not with string or array will return error', function() {
        assert.throws(function() {
            ch.make({name:'a'},2)
        }, Error, "Value must be string or arrays");
    });

    it('call make() without size will be use size 100 as default, and if string length is under 100 chars it will be return 1 array length', function() {
        assert.strictEqual(ch.make('abcdefghijklmnopqrstuvwxyz').length,1);
    });

    it('call merge() with wrong name will return empty', function(){
        assert.strictEqual(ch.merge(ch.get('abc')),'');
    });
    
    it('call add() with wrong parameter will not saving any data', function(){
        ch.add('xxx');
        assert.deepStrictEqual(ch.getBody(),{});
        ch.add({});
        assert.deepStrictEqual(ch.getBody(),{});
    });

    it('call remove() with wrong name will not removing any data', function(){
        ch.add('qqq','abc').remove([]);
        assert.deepStrictEqual(ch.get('qqq'),[{data:'abc'}]);
    });

    it('getBestSize with split under 0 (negative number) will throw error', function(){
        assert.throws(function() {
            ch.getBestSize(100000,-1)
        }, Error, "Split value must be between 1-10");
    });
    
    it('getBestSize with split 0 will throw error', function(){
        assert.throws(function() {
            ch.getBestSize(100000,0)
        }, Error, "Split value must be between 1-10");
    });

    it('getBestSize with split more than 10 will throw error', function(){
        assert.throws(function() {
            ch.getBestSize(100000,11)
        }, Error, "Split value must be between 1-10");
    });

});
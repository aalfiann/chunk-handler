const assert = require('assert');
const ChunkHandler = require('../src/chunkhandler.js');

describe('failure test', function(){

    var ch  = new ChunkHandler();

    it('call make() not with string or array will return error', function() {
        assert.throws(function() {
            ch.make({name:'a'},2)
        }, Error, "Value must be string or arrays");
    });

    it('call merge() with wrong name will return empty', function(){
        assert.equal(ch.merge(ch.get('abc')),'');
    });

    it('call add() with wrong parameter will not saving any data', function(){
        ch.add('xxx');
        assert.deepEqual(ch.getBody(),{});
    });

    it('getBestSize with split under 0 (negative number) will throw error', function(){
        assert.throws(function() {
            ch.getBestSize(str.length,-1)
        }, Error, "Split value must be between 1-5");
    });
    
    it('getBestSize with split 0 will throw error', function(){
        assert.throws(function() {
            ch.getBestSize(str.length,0)
        }, Error, "Split value must be between 1-5");
    });

    it('getBestSize with split more than 5 will throw error', function(){
        assert.throws(function() {
            ch.getBestSize(str.length,6)
        }, Error, "Split value must be between 1-5");
    });

});
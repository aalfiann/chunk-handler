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

});
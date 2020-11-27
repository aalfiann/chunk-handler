const assert = require('assert');
const ChunkHandler = require('../src/chunkhandler.js');

describe('chunk with array test', function(){

    var ch  = new ChunkHandler();
    var arr = [1,2,3,4,5,6,7,8,9,10];
    var another = [123,4,56,7,8,910];
    
    it('make array to chunk', function(){
        var result = ch.make(arr,2);
        assert.deepStrictEqual(result,[ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 10 ] ]);
    });

    it('merge from chunk back to array', function(){
        var result = ch.make(arr,2);
        var chunk = ch.merge(result);
        assert.deepStrictEqual(chunk,arr);
    });

    it('save array to chunk handler', function(){
        var result = ch.make(arr,2);
        var i = 0, len = result.length;
        for (i;i<len;i++) {
            ch.add('xxx',result[i],i);
        };
        assert.deepStrictEqual(ch.get('xxx'),[
            { part: 0, data: [ 1, 2 ] },
            { part: 1, data: [ 3, 4 ] },
            { part: 2, data: [ 5, 6 ] },
            { part: 3, data: [ 7, 8 ] },
            { part: 4, data: [ 9, 10 ] }
        ]);
    });

    it('merge saved data chunk back to original array', function(){
        assert.deepStrictEqual(ch.merge(ch.get('xxx')),arr);
    });

    it('add new and save another array chunk', function(){
        var result = ch.make(another,2);
        var len = result.length;
        var i = 0;
        
        for (i;i<len;i++) {
            ch.add('yyy',result[i],i);
        };

        assert.deepStrictEqual(ch.get('yyy'),[
            { part: 0, data: [ 123, 4 ] },
            { part: 1, data: [ 56, 7 ] },
            { part: 2, data: [ 8, 910 ] }
        ]);
    });

    it('merge another data chunked to array', function(){
        assert.deepStrictEqual(ch.merge(ch.get('yyy')),another);
    });

});
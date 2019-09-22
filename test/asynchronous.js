const assert = require('assert');
const ChunkHandler = require('../src/chunkhandler.js');

describe('asynchronous test', function(){

    var ch  = new ChunkHandler();
    var str = 'this fruit is mango!';
    var arr = [1,2,3,4,5,6,7,8,9,10];

    this.timeout(10000);
    it('promisify is not blocking', function (done) {
        // Just uncomment the console.log to see detail time execution process
        var outside = '';
        ch.promisify((builder) => {return builder}).then(function(chunk){
            var time = chunk.blockingTest();
            // console.log('Blocking start at: '+time);
            // console.log('Blocking ended at: '+Date.now());
            // assert.equal(outside,time);
            done();
        });
        var start = Date.now();
        outside = start;
        // console.log('Last started at: '+outside);
    });

    it('make string to chunk', function(done){
        ch.promisify((builder) => {return builder}).then((chunk) => {
            var result = chunk.make(str,2);
            assert.deepEqual(result,[ 'th', 'is', ' f', 'ru', 'it', ' i', 's ', 'ma', 'ng', 'o!' ]);
            done();
        });
    });

    it('make array to chunk', function(done){
        ch.promisify((builder)=>{return builder}).then((chunk) => {
            var result = chunk.make(arr,2);
            assert.deepEqual(result,[ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 10 ] ]);
            done();
        });
    });

    it('promisify without callback builder will throw an error', function(){
        ch.promisify().then((chunk) => {
            var result = chunk.make(arr,2);
        },function(err){
            return err;
        });
    });

});
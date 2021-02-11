/* global describe it */
const assert = require('assert');
const ChunkHandler = require('../src/chunkhandler.js');

describe('asynchronous test', function () {
  const ch = new ChunkHandler();
  const str = 'this fruit is mango!';
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  this.timeout(10000);
  it('promisify is not blocking', function (done) {
    // Just uncomment the console.log to see detail time execution process
    let outside = '';
    ch.promisify((builder) => { return builder; }).then(function (chunk) {
      const time = chunk.blockingTest();
      // console.log('Blocking start at: '+time);
      // console.log('Blocking ended at: '+Date.now());
      assert.strictEqual((outside <= time), true);
      done();
    });
    const start = Date.now();
    outside = start;
    // console.log('Last started at: '+outside);
  });

  it('make string to chunk', function (done) {
    ch.promisify((builder) => { return builder; }).then((chunk) => {
      const result = chunk.make(str, 2);
      assert.deepStrictEqual(result, ['th', 'is', ' f', 'ru', 'it', ' i', 's ', 'ma', 'ng', 'o!']);
      done();
    });
  });

  it('make array to chunk', function (done) {
    ch.promisify((builder) => { return builder; }).then((chunk) => {
      const result = chunk.make(arr, 2);
      assert.deepStrictEqual(result, [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]);
      done();
    });
  });

  it('promisify without callback builder will throw an error', function () {
    ch.promisify().then((chunk) => {
      chunk.make(arr, 2);
    }, function (err) {
      return err;
    });
  });
});

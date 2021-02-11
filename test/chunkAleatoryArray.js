/* global describe it */
const assert = require('assert');
const ChunkHandler = require('../src/chunkhandler.js');

describe('chunk with array aleatory test', function () {
  const ch = new ChunkHandler();
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('make array to chunk aleatory', function () {
    const result = ch.makeAleatory(arr, 2);
    // Checks if all items of the original array are in one of both generated chunks
    arr.forEach((element) => {
      if (result[0].indexOf(element) < 0 && result[1].indexOf(element) < 0) {
        throw new Error(`The item ${element} was not found on any chunk`);
      }
    });
    assert.strictEqual(result.length, 2);
  });

  it('make array to chunk aleatory with remaining items', function () {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const result = ch.makeAleatory(arr, 2);
    // Checks if all items of the original array are in one of both generated chunks
    arr.forEach((element) => {
      if (result[0].indexOf(element) < 0 && result[1].indexOf(element) < 0) {
        throw new Error(`The item ${element} was not found on any chunk`);
      }
    });
    assert.strictEqual(result.length, 2);
  });
});

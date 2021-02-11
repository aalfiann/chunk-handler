/* global describe it */
const assert = require('assert');
const ChunkHandler = require('../src/chunkhandler.js');

describe('helper function test', function () {
  const ch = new ChunkHandler();

  it('is string', function () {
    assert.strictEqual(ch.isString('abc'), true);
    assert.strictEqual(ch.isString(''), true);
    assert.strictEqual(ch.isString(1), false);
    assert.strictEqual(ch.isString([]), false);
    assert.strictEqual(ch.isString({}), false);
  });

  it('is array', function () {
    assert.strictEqual(ch.isArray([1, 2, 3]), true);
    assert.strictEqual(ch.isArray([]), true);
    assert.strictEqual(ch.isArray({}), false);
    assert.strictEqual(ch.isArray(''), false);
    assert.strictEqual(ch.isArray(1), false);
  });

  it('is object', function () {
    assert.strictEqual(ch.isObject({ id: 1, name: 'abc' }), true);
    assert.strictEqual(ch.isObject({}), true);
    assert.strictEqual(ch.isObject([]), false);
    assert.strictEqual(ch.isObject(''), false);
    assert.strictEqual(ch.isObject(1), false);
  });

  it('is empty string', function () {
    assert.strictEqual(ch.isEmpty(undefined), true);
    assert.strictEqual(ch.isEmpty(null), true);
    assert.strictEqual(ch.isEmpty(''), true);
    assert.strictEqual(ch.isEmpty('abc'), false);
    assert.strictEqual(ch.isEmpty(1), false);
    assert.strictEqual(ch.isEmpty([]), false);
    assert.strictEqual(ch.isEmpty({}), false);
  });

  it('is empty array', function () {
    assert.strictEqual(ch.isEmptyArray(undefined), true);
    assert.strictEqual(ch.isEmptyArray(null), true);
    assert.strictEqual(ch.isEmptyArray([]), true);
    assert.strictEqual(ch.isEmptyArray({}), false);
    assert.strictEqual(ch.isEmptyArray({ id: 1 }), false);
    assert.strictEqual(ch.isEmptyArray('1'), false);
    assert.strictEqual(ch.isEmptyArray(1), false);
    assert.strictEqual(ch.isEmptyArray([1, 2, 3]), false);
  });

  it('is empty object', function () {
    assert.strictEqual(ch.isEmptyObject(undefined), true);
    assert.strictEqual(ch.isEmptyObject(null), true);
    assert.strictEqual(ch.isEmptyObject({}), true);
    assert.strictEqual(ch.isEmptyObject([]), false);
    assert.strictEqual(ch.isEmptyObject(1), false);
    assert.strictEqual(ch.isEmptyObject({ id: 1 }), false);
    assert.strictEqual(ch.isEmptyObject('1'), false);
    assert.strictEqual(ch.isEmptyObject([1, 2, 3]), false);
  });

  it('is empty object parameter value must hasOwnProperty', function () {
    const obj = Object.create({ name: 'inherited' });
    assert.strictEqual(true, ch.isEmptyObject(obj));
  });

  it('getBestSize split 5 with 990 chars >> size will not change', function () {
    const value = 990;
    const result = Math.ceil(value / ch.getBestSize(value));
    assert.strictEqual(true, (result <= 50));
    assert.strictEqual(ch.getBestSize(990), 990);
  });

  it('getBestSize split 5 with 90000 chars', function () {
    const value = 90000;
    const result = Math.ceil(value / ch.getBestSize(value));
    assert.strictEqual(true, (result <= 50));
  });

  it('getBestSize split 5 with 900000 chars', function () {
    const value = 900000;
    const result = Math.ceil(value / ch.getBestSize(value));
    assert.strictEqual(true, (result <= 50));
  });

  it('getBestSize split 5 with 1400000 chars', function () {
    const value = 1400000;
    const result = Math.ceil(value / ch.getBestSize(value));
    assert.strictEqual(true, (result <= 50));
  });

  it('getBestSize split 5 with 1900000 chars', function () {
    const value = 1900000;
    const result = Math.ceil(value / ch.getBestSize(value));
    assert.strictEqual(true, (result <= 50));
  });

  it('getBestSize split 5 with 2400000 chars', function () {
    const value = 2400000;
    const result = Math.ceil(value / ch.getBestSize(value));
    assert.strictEqual(true, (result <= 50));
  });

  it('getBestSize split 5 with 2900000 chars', function () {
    const value = 2900000;
    const result = Math.ceil(value / ch.getBestSize(value));
    assert.strictEqual(true, (result <= 50));
  });

  it('getBestSize split 5 with 3400000 chars', function () {
    const value = 3400000;
    const result = Math.ceil(value / ch.getBestSize(value));
    assert.strictEqual(true, (result <= 50));
  });

  it('getBestSize split 5 with 3900000 chars', function () {
    const value = 3900000;
    const result = Math.ceil(value / ch.getBestSize(value));
    assert.strictEqual(true, (result <= 50));
  });

  it('getBestSize split 5 with 4500000 chars', function () {
    const value = 4500000;
    const result = Math.ceil(value / ch.getBestSize(value));
    assert.strictEqual(true, (result <= 50));
  });

  it('getBestSize split 5 with 6000000 chars', function () {
    const value = 6000000;
    const result = Math.ceil(value / ch.getBestSize(value));
    assert.strictEqual(true, (result <= 50));
  });
});

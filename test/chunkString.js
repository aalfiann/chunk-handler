/* global describe it */
const assert = require('assert');
const ChunkHandler = require('../src/chunkhandler.js');

describe('chunk with string test', function () {
  const ch = new ChunkHandler();
  const str = 'this fruit is mango!';
  const another = 'this fruit is orange!';

  it('make string to chunk', function () {
    const result = ch.make(str, 2);
    assert.deepStrictEqual(result, ['th', 'is', ' f', 'ru', 'it', ' i', 's ', 'ma', 'ng', 'o!']);
  });

  it('merge from chunk back to string', function () {
    const result = ch.make(str, 2);
    const chunk = ch.merge(result);
    assert.deepStrictEqual(chunk, str);
  });

  it('save string to chunk handler', function () {
    const result = ch.make(str, 2);
    const len = result.length;
    let i = 0;
    for (i; i < len; i++) {
      ch.add('xxx', result[i], i);
    }
    assert.deepStrictEqual(ch.get('xxx'), [
      { part: 0, data: 'th' },
      { part: 1, data: 'is' },
      { part: 2, data: ' f' },
      { part: 3, data: 'ru' },
      { part: 4, data: 'it' },
      { part: 5, data: ' i' },
      { part: 6, data: 's ' },
      { part: 7, data: 'ma' },
      { part: 8, data: 'ng' },
      { part: 9, data: 'o!' }
    ]);
  });

  it('merge saved data chunk back to original string', function () {
    assert.strictEqual(ch.merge(ch.get('xxx')), str);
  });

  it('add new and save another string chunk', function () {
    const result = ch.make(another, 2);
    const len = result.length;
    let i = 0;
    for (i; i < len; i++) {
      ch.add('yyy', result[i], i);
    }
    assert.deepStrictEqual(ch.get('yyy'), [
      { part: 0, data: 'th' },
      { part: 1, data: 'is' },
      { part: 2, data: ' f' },
      { part: 3, data: 'ru' },
      { part: 4, data: 'it' },
      { part: 5, data: ' i' },
      { part: 6, data: 's ' },
      { part: 7, data: 'or' },
      { part: 8, data: 'an' },
      { part: 9, data: 'ge' },
      { part: 10, data: '!' }
    ]);
  });

  it('merge another data chunked to string', function () {
    assert.strictEqual(ch.merge(ch.get('yyy')), another);
  });
});

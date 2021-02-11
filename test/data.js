/* global describe it */
const assert = require('assert');
const ChunkHandler = require('../src/chunkhandler.js');

describe('store data test', function () {
  const ch = new ChunkHandler();
  const str = 'this fruit is mango!';
  const arr = [123, 4, 56, 7, 8, 910];
  const arr2 = [1, 22, 333, 4444, 55555, 666666];

  it('add three data chunk with string and array in different name at same time', function () {
    const data1 = ch.make(str, 2);
    const data2 = ch.make(arr, 2);
    const data3 = ch.make(arr2, 2);

    let x = 0; const lenData1 = data1.length;
    for (x; x < lenData1; x++) {
      ch.add('aaa', data1[x], x);
    }

    let y = 0; const lenData2 = data2.length;
    for (y; y < lenData2; y++) {
      ch.add('bbb', data2[y], y);
    }

    let z = 0; const lenData3 = data3.length;
    for (z; z < lenData3; z++) {
      ch.add('ccc', data3[z], z);
    }

    assert.deepStrictEqual(ch.get('aaa'), [
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
    assert.deepStrictEqual(ch.get('bbb'), [
      { part: 0, data: [123, 4] },
      { part: 1, data: [56, 7] },
      { part: 2, data: [8, 910] }
    ]);
    assert.deepStrictEqual(ch.get('ccc'), [
      { part: 0, data: [1, 22] },
      { part: 1, data: [333, 4444] },
      { part: 2, data: [55555, 666666] }
    ]);
  });

  it('remove name bbb only', function () {
    ch.remove('bbb');
    assert.deepStrictEqual(ch.get('aaa'), [
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
    assert.strictEqual(ch.get('bbb'), undefined);
    assert.deepStrictEqual(ch.get('ccc'), [
      { part: 0, data: [1, 22] },
      { part: 1, data: [333, 4444] },
      { part: 2, data: [55555, 666666] }
    ]);
  });

  it('display all data', function () {
    assert.deepStrictEqual(ch.getBody(), {
      aaa: [
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
      ],
      ccc: [
        { part: 0, data: [1, 22] },
        { part: 1, data: [333, 4444] },
        { part: 2, data: [55555, 666666] }
      ]
    });
  });

  it('clean all data', function () {
    ch.clean();
    assert.deepStrictEqual(ch.getBody(), {});
  });

  it('add data with multiple name and with method chained', function () {
    ch.add('yyy', 'abc').add('yyy', 'def').add('zzz', 'abc').add('zzz', 'def');
    assert.deepStrictEqual(ch.get('yyy'), [{ data: 'abc' }, { data: 'def' }]);
    assert.deepStrictEqual(ch.get('zzz'), [{ data: 'abc' }, { data: 'def' }]);
  });

  it('add data with name includes special chars will be sanitized', function () {
    ch.add('xxx & #$%*()123', 'special chars');
    assert.deepStrictEqual(ch.get('xxx & #$%*()123'), [{ data: 'special chars' }]);
  });

  it('add data without part still can be saved', function () {
    ch.add('xxx', 'abc');
    assert.deepStrictEqual(ch.get('xxx'), [{ data: 'abc' }]);
  });

  it('merge data with nulled part is no problem', function () {
    assert.strictEqual(ch.merge([{ part: null, data: 'abc' }, { part: null, data: 'def' }]), 'abcdef');
  });

  it('merge data with nulled part can not be sorted', function () {
    assert.strictEqual(ch.merge([{ part: null, data: 'def' }, { part: null, data: 'abc' }]), 'defabc');
  });

  it('merge data without part is no problem', function () {
    assert.strictEqual(ch.merge([{ data: 'abc' }, { data: 'def' }]), 'abcdef');
  });

  it('merge data without part can not be sorted', function () {
    assert.strictEqual(ch.merge([{ data: 'def' }, { data: 'abc' }]), 'defabc');
  });

  it('merge data with part will be sorted automatically', function () {
    assert.strictEqual(ch.merge([{ part: 1, data: 'def' }, { part: 0, data: 'abc' }]), 'abcdef');
  });
});

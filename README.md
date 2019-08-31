# chunk-handler
[![NPM](https://nodei.co/npm/chunk-handler.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/chunk-handler/)  
  
[![npm version](https://img.shields.io/npm/v/chunk-handler.svg?style=flat-square)](https://www.npmjs.org/package/chunk-handler)
[![Build Status](https://travis-ci.org/aalfiann/chunk-handler.svg?branch=master)](https://travis-ci.org/aalfiann/chunk-handler)
[![Coverage Status](https://coveralls.io/repos/github/aalfiann/chunk-handler/badge.svg?branch=master)](https://coveralls.io/github/aalfiann/chunk-handler?branch=master)
[![Known Vulnerabilities](https://snyk.io//test/github/aalfiann/chunk-handler/badge.svg?targetFile=package.json)](https://snyk.io//test/github/aalfiann/chunk-handler?targetFile=package.json)
![NPM download/month](https://img.shields.io/npm/dm/chunk-handler.svg)
![NPM download total](https://img.shields.io/npm/dt/chunk-handler.svg)  
The Chunk Handler for string and array object in NodeJS

## Install using NPM
```bash
$ npm install chunk-handler
```

## Usage

```javascript
const ChunkHandler = require('chunk-handler');
var ch = new ChunkHandler();
```

### Chunk with String
#### Make Chunk
```javascript
var str = 'this fruit is mango!';
var result = ch.make(str,2);

// Result
// [ 'th', 'is', ' f', 'ru', 'it', ' i', 's ', 'ma', 'ng', 'o!' ]
```

#### Save chunk to memory
```javascript
var str = 'this fruit is mango!';
var result = ch.make(str,2);
for (let i in result) {
    ch.add('xxx',result[i],i);
};
```

#### Get saved chunk by name
```javascript
var result = ch.get('xxx');

// result
// [
//     { part: 0, data: 'th' },
//     { part: 1, data: 'is' },
//     { part: 2, data: ' f' },
//     { part: 3, data: 'ru' },
//     { part: 4, data: 'it' },
//     { part: 5, data: ' i' },
//     { part: 6, data: 's ' },
//     { part: 7, data: 'ma' },
//     { part: 8, data: 'ng' },
//     { part: 9, data: 'o!' }
// ]
```

#### Merge Chunk
```javascript
var result = ch.merge(ch.get('xxx'));

// Result
// this fruit is mango!
```

### Chunk with Array
#### Make Chunk
```javascript
var arr = [1,2,3,4,5,6,7,8,9,10];
var result = ch.make(arr,2);

// Result
// [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 10 ] ]
```

#### Save chunk to memory
```javascript
var arr = [1,2,3,4,5,6,7,8,9,10];
var result = ch.make(arr,2);
for (let i in result) {
    ch.add('yyy',result[i],i);
};
```

#### Get saved chunk by name
```javascript
var result = ch.get('yyy');

// result
// [
//     { part: 0, data: [ 1, 2 ] },
//     { part: 1, data: [ 3, 4 ] },
//     { part: 2, data: [ 5, 6 ] },
//     { part: 3, data: [ 7, 8 ] },
//     { part: 4, data: [ 9, 10 ] }
// ]
```

#### Merge Chunk
```javascript
var result = ch.merge(ch.get('yyy'));

// Result
// [1,2,3,4,5,6,7,8,9,10]
```

#### Remove chunk by name
`ch.remove('xxx');`

#### Clean all chunk
`ch.clean();`

#### Get all saved data
`ch.getBody()`

#### Get Best Size before make a chunk
Using `getBestSize(length,split=5)` if an array/string is very big (higher than 100K chars length) and you don't know what best size to make a deal with chunk. Example case if you want to chunk encoded base64 from image or video.

```javascript
var str = 'assume this is a big string with more than 300K chars length';

var result = ch.make(str,ch.getBestSize(str.length));

// Result will return an array with no more than 50 of array length.  
```
**Note:**  
- `getBaseSize(length,split=5)` default has split=5 which is will create maximum array (5*10) means will not create array length more than 50.  
- You are able to change split number between 1-10 only.
- High chars length more than 10 Millions is better to use split 6-10.  

### Helper function
Here is available helper function  
- `isString(value)`  
- `isArray(value)`  
- `isObject(value)`  
- `isEmpty(value)`  
- `isEmptyArray(value)`  
- `isEmptyObject(value)`  
- `getBestSize(length,split=5)`  

### Unit test
If you want to playing arround with test  
`npm test`
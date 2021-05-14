# pretty-file-tree
[![Build Status](https://travis-ci.org/codysmithd/pretty-file-tree.svg?branch=main)](https://travis-ci.org/codysmithd/pretty-file-tree)

A tiny, simple utility for pretty-printing lists of file paths as a tree for command-line-interfaces.

## Example
```javascript
const prettyTree = require('pretty-file-tree');

console.log(prettyTree([
    'home/user/foo.js',
    'home/user/test/bar.js',
    'home/user/test/baz.js',
    'home/user/bat.js'
]));
```
Result
```
home/user
├── foo.js
├── test
|  ├── bar.js
|  └── baz.js
└── bat.js
```

## Configuring the output tree style

It is possible to change the style of the tree.

### Example

```javascript
const prettyTree = require('pretty-file-tree');

const options = {
    throughTee: '├>',
    endTee: '└>' 
}

console.log(prettyTree([
    'home/user/foo.js',
    'home/user/test/bar.js',
    'home/user/test/baz.js',
    'home/user/bat.js'
], options));
```

Result
```
home/user
├> foo.js
├> test
|  ├> bar.js
|  └> baz.js
└> bat.js
```

## Style Options

### throughTee
- throughTee option refers to the "├──" default string.

### endTee
- endTee option refers to the "└──" default string.

### vertical
- vertical option refers to the "|  " default string.

### emptyColumn
- emptyColumn option refers to the "   " default string.

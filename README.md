# pretty-file-tree
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
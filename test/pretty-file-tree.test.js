const prettyTree = require('../pretty-file-tree.js');

test('Undefined input', () => {
    expect(prettyTree()).toBe('');
});

test('Non-iterable input', () => {
    expect(prettyTree("")).toBe('');
});

test('Empty input', () => {
    expect(prettyTree([])).toBe('');
});
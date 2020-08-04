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

test('Single entry', () => {
    expect(prettyTree([
        'A/B/C'
    ])).toBe('A/B/C');
});

test('One directory two entries', () => {
    expect(prettyTree([
        'A/B/C1',
        'A/B/C2'
    ])).toBe(
`A/B
├── C1
└── C2`);
});

test('Two directories, one with entries, one without', () => {
    expect(prettyTree([
        'A/B/C',
        'A/B/D/E1',
        'A/B/D/E2'
    ])).toBe(
`A/B
├── C
└── D
   ├── E1
   └── E2`);
});

test('Three directories, one with entries two levels deep, two without', () => {
    expect(prettyTree([
        'A/B/C',
        'A/B/D/E/F1',
        'A/B/D/E/F2',
        'A/B/G'
    ])).toBe(
`A/B
├── C
├── D/E
|  ├── F1
|  └── F2
└── G`);
});

test('Multiple roots', () => {
    expect(prettyTree([
        'A/B/C',
        'A/B/D/E/F1',
        'A/B/D/E/F2',
        'A/B/G',
        'H'
    ])).toBe(
`A/B
├── C
├── D/E
|  ├── F1
|  └── F2
└── G
H`);
});
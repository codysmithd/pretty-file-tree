class Node {
    constructor(value) {
        this.value = value;
        this.children = new Map();
    }

    addChild(value) {
        if (!this.children.has(value)) {
            const newNode = new Node(value);
            this.children.set(value, newNode);
            return newNode;
        }
        return this.children.get(value);
    }
}

class RenderTableEntry {
    constructor(value, depth, isLastChild) {
        this.value = value;
        this.depth = depth;
        this.isLastChild = isLastChild;
    }
}

function parseTree (filePaths, options) {
    const PATH_SEPARATOR =options.pathSeparator;
    const roots = new Map();

    // Parse into tree
    let pathElements, rootElement, node;
    for (const path of filePaths) {
        pathElements = path.split(PATH_SEPARATOR);
        rootElement = pathElements.shift();
        node = roots.get(rootElement);
        if (node == null) {
            node = new Node(rootElement);
            roots.set(rootElement, node);
        }
        for (const pathElement of pathElements) {
            node = node.addChild(pathElement);
        }
    }
    return builderRenderTable(roots, PATH_SEPARATOR);
}

function builderRenderTable(roots, pathSeparator) {
    let renderTable = [];
    let toVisit = [...roots.values()];

    let nodeDepths = new Map(); // Now deep nodes are
    let lastNodes = new Set([toVisit[toVisit.length - 1]]);  // Nodes that are the last child

    while (toVisit.length > 0) {
        let currentNode = toVisit.shift();

        let nodeDepth = nodeDepths.get(currentNode) || 0;

        // Compress nodes with one child
        while (currentNode.children.size === 1) {
            let childNode = currentNode.children.values().next().value;
            currentNode.value += `${pathSeparator}${childNode.value}`;
            currentNode.children = childNode.children;
        }

        let children =  [...currentNode.children.values()];
        if (children.length > 0) {
            for(const child of children) {
                nodeDepths.set(child, nodeDepth + 1);
            }
            lastNodes.add(children[children.length -1]);
            toVisit = children.concat(toVisit);
        }

        renderTable.push(new RenderTableEntry(currentNode.value, nodeDepth, lastNodes.has(currentNode)));
    }
    return renderTable;
}

function printTree (renderTable, options) {
    let outputString = '';
    let activeColumns = []; // Columns we are currently rendering because they are open
    for (const tableEntry of renderTable) {
        // Root node
        if (tableEntry.depth === 0) {
            outputString += tableEntry.value;
        } else {
            // Indent to the correct column
            for (let column = 1; column < tableEntry.depth; column++) {
                if (activeColumns[column]) {
                    outputString += options.sequences.vertical;
                } else {
                    outputString += options.sequences.emptyColumn;
                }
            }
            outputString += tableEntry.isLastChild ? options.sequences.endTee : options.sequences.throughTee;
            outputString += ' ' + tableEntry.value;
        }
        outputString += (tableEntry === renderTable[renderTable.length - 1]) ? '' : '\n';
        activeColumns[tableEntry.depth] = !tableEntry.isLastChild;
    }
    return outputString;
}

const DEFAULT_OPTIONS = {
    pathSeparator: '/',
    sequences : {
        throughTee : '├──',
        endTee : '└──',
        vertical : '|  ',
        emptyColumn : '   '
    }
};

function prettyFileTree(files) {
    if (!files || typeof files[Symbol.iterator] !== 'function') { return ''; }
    return printTree(parseTree(files, DEFAULT_OPTIONS), DEFAULT_OPTIONS);
}

module.exports = prettyFileTree;
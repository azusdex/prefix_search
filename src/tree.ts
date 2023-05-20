class TreeNode {
    value: string;
    children: Map<string, TreeNode>;

    constructor(value: string = '') {
        this.value = value;
        this.children = new Map();
    }
}

export class Tree {
    treeNode: TreeNode;

    constructor() {
        this.treeNode = new TreeNode();
    }

    private add(prefix: string): void {
        let currentNode = <TreeNode>this.treeNode;
        for (const char of prefix) {
            if (!currentNode.children.has(char)) {
                const newNode = new TreeNode(char);
                currentNode?.children.set(char, newNode);
            }
            currentNode = <TreeNode>currentNode.children.get(char);
        }
    }

    init(prefixes: string[]): TreeNode {
        for (const prefix of prefixes) {
            this.add(prefix);
        }

        return <TreeNode>this.treeNode;
    }

    async search(inputString: string, prefixesTree?: TreeNode): Promise<string> {
        let currentNode = prefixesTree;
        let longestPrefix = '';
        for (const char of inputString) {
            if (!currentNode?.children.has(char)) {
                break;
            }
            currentNode = currentNode.children.get(char);
            longestPrefix += char;
        }
        return longestPrefix;
    }

    printTree(): void {
        this.traverseTree(<TreeNode>this.treeNode, '');
    }

    private traverseTree(node: TreeNode, prefix: string): void {
        console.log(prefix + node.value);
        for (const childNode of node.children.values()) {
            this.traverseTree(childNode, prefix + node.value);
        }
    }
}
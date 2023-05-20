import {Tree} from "../src/tree";

const treeSearch = new Tree();
const prefixes = ["2y3fKTS", "4VdwEEXC8", "AWMa4vvOf", "xyiuoXZV", "KAWeqI", "XfhdW", "8dLfGZU0T", "LgXK8iwln", "oDyiYa", "oDyiYa4d", "KAWeqD", "KAWeq7", "Rhp1IlD", "Xfhdd", "KAWeq9", "XYfxPGW", "Uvc5oJ", "NxJ7fbA", "Xfhdh"];
const prefixesTree = treeSearch.init(prefixes);

describe('findLongestPrefix', () => {
    test('should return the longest matching prefix', () => {
        const inputString = 'oDyiYa4d343';
        treeSearch.search(inputString, prefixesTree).then((result) => {
            expect(result).toBe('oDyiYa4d');
        });
    });

    test('should return an empty string if no matching prefix is found', () => {
        const inputString = 'test';
        treeSearch.search(inputString, prefixesTree).then((result) => {
            expect(result).toBe('');
        });
    });

    test('should handle an empty input string', () => {
        const inputString = '';
        treeSearch.search(inputString, prefixesTree).then((result) => {
            expect(result).toBe('');
        });
    });

    test('should handle an empty list of prefixes', () => {
        const inputString = 'test';
        const emptyPrefixes = treeSearch.init([]);
        treeSearch.search(inputString, emptyPrefixes).then((result) => {
            expect(result).toBe('');
        });
    });
});
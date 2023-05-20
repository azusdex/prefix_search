import {Simple} from "../src/simple";

const simpleSearch = new Simple();
const prefixes = ["2y3fKTS", "4VdwEEXC8", "AWMa4vvOf", "xyiuoXZV", "KAWeqI", "XfhdW", "8dLfGZU0T", "LgXK8iwln", "oDyiYa", "oDyiYa4d", "KAWeqD", "KAWeq7", "Rhp1IlD", "Xfhdd", "KAWeq9", "XYfxPGW", "Uvc5oJ", "NxJ7fbA", "Xfhdh"];

describe('findLongestPrefix', () => {
    test('should return the longest matching prefix', () => {
        const inputString = 'oDyiYa4d343';
        simpleSearch.search(inputString, prefixes).then((result) => {
            expect(result).toBe('oDyiYa4d');
        });
    });

    test('should return an empty string if no matching prefix is found', () => {
        const inputString = 'test';
        simpleSearch.search(inputString, prefixes).then((result) => {
            expect(result).toBe('');
        });
    });

    test('should handle an empty input string', () => {
        const inputString = '';
        simpleSearch.search(inputString, prefixes).then((result) => {
            expect(result).toBe('');
        });
    });

    test('should handle an empty list of prefixes', () => {
        const inputString = 'test';
        const prefixes: string[] = [];
        simpleSearch.search(inputString, prefixes).then((result) => {
            expect(result).toBe('');
        });
    });
});
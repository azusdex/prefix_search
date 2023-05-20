import fs from 'fs';
import { Simple } from "./simple";
import {Tree} from "./tree";

export const SIMPLE_SEARCH = 'simple';
export const TREE_SEARCH = 'tree';
export class Search {
    prefixes: string[];

    constructor() {
        this.prefixes = this.getPrefixesFromFile();
    }

    async findLongestPrefix(needle: string, searchType: string = SIMPLE_SEARCH) {
        let result = '';
        switch (searchType) {
            case SIMPLE_SEARCH:
                const simple = new Simple();
                result = await simple.search(needle, this.prefixes);
                break;
            case TREE_SEARCH:
                const tree = new Tree();
                const prefixesTree = tree.init(this.prefixes);
                result = await tree.search(needle, prefixesTree);
                break;
        }
        return result;
    }

    async printTree(size: number = 20) {
        const tree = new Tree();
        const sliced = this.getPrefixesFromFile().slice(0, size);
        const prefixesTree = tree.init(sliced);
        return tree.printTree();
    }

    getPrefixesFromFile(filename: string = 'sample_prefixes'): string[] {
        const pref = fs.readFileSync(`./uploads/${filename}.txt`).toString().split('\r\n');
        const emptyLine = pref.indexOf("");
        if (emptyLine !== -1) {
            pref.splice(0, emptyLine + 1);
        }
        pref.splice(pref.length - 2, 2);
        return pref;
    }

}
export class Simple {
    async search(needle: string, prefixes?: string[]): Promise<string> {
        if (prefixes === undefined) {
            return 'Prefixes not found';
        }
        let longest = '';
        for (const prefix of prefixes) {
            if (needle.startsWith(prefix) && prefix.length > longest.length) {
                longest = prefix;
            }
        }
        return longest;
    }
}
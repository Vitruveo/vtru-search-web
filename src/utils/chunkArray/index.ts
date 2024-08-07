export default function chunkArray(array: string[], size: number): string[][] {
    const individualValues = array.flatMap((value) => value.split(','));
    const result: string[][] = [];
    for (let i = 0; i < individualValues.length; i += size) {
        result.push(individualValues.slice(i, i + size));
    }
    return result;
}

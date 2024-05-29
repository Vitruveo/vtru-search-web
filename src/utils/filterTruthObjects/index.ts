export default function filterTruthAndNonEmpty(obj: any) {
    const result: any = {};

    for (const key in obj) {
        if (obj[key] && (!Array.isArray(obj[key]) || obj[key].length > 0)) {
            result[key] = obj[key];
        }
    }

    return result;
}

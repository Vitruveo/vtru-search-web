export const extractObjects = (payload: Record<string, any>) => {
    const result: Record<string, any> = {};

    const recurse = (currentObj: Record<string, any>, parentKey: string) => {
        for (const key in currentObj) {
            if (Array.isArray(currentObj[key]) || typeof currentObj[key] !== 'object') {
                result[parentKey ? `${parentKey}_${key}` : key] = currentObj[key];
            } else if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                recurse(currentObj[key], parentKey ? `${parentKey}.${key}` : key);
            }
        }
    };

    recurse(payload, '');
    return result;
};

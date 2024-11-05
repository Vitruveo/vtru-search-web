import { batch } from './batch';

export const getVUSDPrice = (): Promise<number> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(4);
        }, 1000);
    });

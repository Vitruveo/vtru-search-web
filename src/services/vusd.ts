import { APIResponse } from '@/features/common/types';
import { batch } from './batch';

export const getVtruConversion = (): Promise<APIResponse<string>> =>
    batch.get('/VUSD/price').then((response) => response.data);

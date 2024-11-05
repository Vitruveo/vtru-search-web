import { BATCH_BASE_URL } from '@/constants/api';
import axios from 'axios';

export const batch = axios.create({
    baseURL: BATCH_BASE_URL,
});

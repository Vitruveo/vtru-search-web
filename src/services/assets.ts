import { APIResponse } from '@/features/common/types';
import { api } from './api';

export interface ResponseGrid {
    grid: {
        _id: string;
        search: {
            grid: {
                id: string;
                path: string;
                assets: string[];
                fees: number;
                createdAt: string;
            }[];
        };
    };
}

export const getFeesFromGrid = (grid: string): Promise<APIResponse<ResponseGrid>> =>
    api.get(`/assets/public/grid/${grid}`).then((response) => response.data);

export interface ResponseVideo {
    video: {
        _id: string;
        search: {
            video: {
                id: string;
                path: string;
                assets: string[];
                fees: number;
                createdAt: string;
            }[];
        };
    };
}

export const getFeesFromVideo = (video: string): Promise<APIResponse<ResponseVideo>> =>
    api.get(`/assets/public/video/${video}`).then((response) => response.data);

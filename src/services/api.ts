import axios, { AxiosResponse } from 'axios';
import { store } from '@/store/index';
import { APIResponse } from '@/features/common/types';
import { BASE_URL_API } from '@/constants/api';

const api = axios.create({
    baseURL: BASE_URL_API,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.user.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const apiService = {
    get: async <T = unknown, E = any>(url: string): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api.get(url);
        return response.data;
    },
    post: async <T = unknown, E = any>(url: string, data: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api.post(url, data);
        return response.data;
    },
    put: async <T = unknown, E = any>(url: string, data: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api.put(url, data);
        return response.data;
    },
    delete: async <T = unknown, E = any>(url: string, data?: any): Promise<APIResponse<T, E>> => {
        const response: AxiosResponse = await api.delete(url, { data });
        return response.data;
    },
};

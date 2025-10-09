import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SystemStatusState, SystemStatusType } from './types';

export const initialState: SystemStatusState = {
    data: {
        search: { info: [], warn: [], error: [], maintenance: [] },
        stacks: { info: [], warn: [], error: [], maintenance: [] },
        stores: { info: [], warn: [], error: [], maintenance: [] },
    },
    cacheHeaders: {
        lastModified: '',
        fetchedAt: 0,
    },
    error: null,
    loading: false,
};

export const systemStatusSlice = createSlice({
    name: 'systemStatus',
    initialState,
    reducers: {
        loadSystemStatus: () => {},
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        setData: (state, action: PayloadAction<SystemStatusType>) => {
            state.data = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setCacheHeaders: (state, action: PayloadAction<SystemStatusState['cacheHeaders']>) => {
            state.cacheHeaders = action.payload;
        },
    },
});

export const { actions } = systemStatusSlice;
export default systemStatusSlice.reducer;

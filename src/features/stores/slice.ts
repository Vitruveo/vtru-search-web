import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GetStoresParams, StoresState } from './types';

export const initialState: StoresState = {
    data: {
        data: [],
        limit: 0,
        page: 0,
        total: 0,
        totalPage: 0,
    },
    sort: 'newToOld',
    loading: false,
    error: null,
};

export const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        getStoresRequest: (_state, _action: PayloadAction<{ subdomain: string }>) => {},
        getStoresListRequest: (_state, _action: PayloadAction<GetStoresParams>) => {},
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        setStores: (state, action: PayloadAction<StoresState['data']>) => {
            state.data = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.data.limit = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.data.page = action.payload;
        },
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        },
    },
});

export const { actions } = storesSlice;
export default storesSlice.reducer;

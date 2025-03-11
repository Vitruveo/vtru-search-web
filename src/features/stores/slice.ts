import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GetStoresParams, StoresState, Stores } from './types';

export const initialState: StoresState = {
    currentDomain: {} as Stores,
    spotlight: [],
    paginated: {
        list: [],
        limit: 25,
        page: 1,
        total: 0,
        totalPage: 0,
    },
    search: '',
    sort: 'newToOld',
    loading: false,
    error: null,
};

export const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        getStoresRequest: (_state, _action: PayloadAction<{ subdomain: string }>) => { },
        getStoresListRequest: (_state, _action: PayloadAction<GetStoresParams>) => { },
        startLoading: (state) => {
            state.loading = true;
        },
        resetStores: (state) => {
            state.currentDomain = initialState.currentDomain;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        setPaginatedList: (state, action: PayloadAction<StoresState['paginated']>) => {
            state.paginated = action.payload;
        },
        setCurrentDomain: (state, action: PayloadAction<Stores>) => {
            state.currentDomain = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.paginated.limit = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.paginated.page = action.payload;
        },
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSpotlight: (state, action: PayloadAction<StoresState['spotlight']>) => {
            state.spotlight = action.payload;
        },
    },
});

export const { actions } = storesSlice;
export default storesSlice.reducer;

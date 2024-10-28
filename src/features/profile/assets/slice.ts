import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileAssetsSliceState } from './types';

export const initialState: ProfileAssetsSliceState = {
    loading: false,
    error: null,
    data: {
        data: [],
        limit: 25,
        page: 1,
        total: 0,
        totalPage: 0,
    },
    sort: '',
};

export const profileAssetsSlice = createSlice({
    name: 'profileAssets',
    initialState,
    reducers: {
        loadProfileAssets: () => {},
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        setData: (state, action: PayloadAction<ProfileAssetsSliceState['data']>) => {
            state.data = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.data.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.data.limit = action.payload;
        },
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        },
    },
});

export const { actions } = profileAssetsSlice;
export default profileAssetsSlice.reducer;

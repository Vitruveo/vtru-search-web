import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RedirectsState, RedirectType } from './types';

export const initialState: RedirectsState = {
    redirects: {} as RedirectType,
    error: null,
    loading: false,
};

export const redirectsSlice = createSlice({
    name: 'redirects',
    initialState,
    reducers: {
        loadRedirects: () => {},
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        setRedirects: (state, action: PayloadAction<RedirectType>) => {
            state.redirects = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { actions } = redirectsSlice;
export default redirectsSlice.reducer;

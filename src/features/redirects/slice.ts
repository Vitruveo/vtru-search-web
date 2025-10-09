import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RedirectsState, RedirectType } from './types';

export const initialState: RedirectsState = {
    data: {
        common: { xibit: {}, vitruveo: {} } as RedirectType['common'],
        production: { xibit: {}, vitruveo: {} } as RedirectType['production'],
        qa: { xibit: {}, vitruveo: {} } as RedirectType['qa'],
    },
    cacheHeaders: {
        lastModified: '',
        fetchedAt: 0,
    },
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
        setData: (state, action: PayloadAction<RedirectType>) => {
            state.data = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setCacheHeaders: (state, action: PayloadAction<RedirectsState['cacheHeaders']>) => {
            state.cacheHeaders = action.payload;
        },
    },
});

export const { actions } = redirectsSlice;
export default redirectsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, GridUploadParams } from './types';

const initialState: InitialState = {
    grid: {
        path: '',
        url: '',
        loading: false,
        error: null,
    },
};

export const wsSlice = createSlice({
    name: 'ws',
    initialState,
    reducers: {
        watchEvents: () => {},
        clearGrid: (state) => {
            state.grid.path = '';
            state.grid.url = '';
        },
        setGrid: (state, action: PayloadAction<Omit<InitialState['grid'], 'loading'>>) => {
            state.grid.path = action.payload.path;
            state.grid.url = action.payload.url;
        },
        startLoading: (state) => {
            state.grid.loading = true;
        },
        stopLoading: (state) => {
            state.grid.loading = false;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.grid.loading = false;
            state.grid.error = action.payload;
        },
        gridUpload: (_state, _action: PayloadAction<GridUploadParams>) => {},
    },
});

export const { actions } = wsSlice;
export default wsSlice.reducer;

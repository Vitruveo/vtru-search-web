import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, GridUploadParams } from './types';

const initialState: InitialState = {
    grid: {
        path: '',
        loading: false,
    },
};

export const wsSlice = createSlice({
    name: 'ws',
    initialState,
    reducers: {
        watchEvents: () => {},
        clearGrid: (state) => {
            state.grid.path = '';
        },
        setGrid: (state, action: PayloadAction<string>) => {
            state.grid.path = action.payload;
        },
        gridUpload: (_state, _action: PayloadAction<GridUploadParams>) => {},
    },
});

export const { actions } = wsSlice;
export default wsSlice.reducer;

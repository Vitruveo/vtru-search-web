import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, UploadPayload } from './types';

const initialState: InitialState = {
    preSignedURL: '',
    shareAvailable: false,
    path: '',
};

export const wsSlice = createSlice({
    name: 'ws',
    initialState,
    reducers: {
        requestUpload: () => {},
        watchEvents: () => {},
        setPresignedURL: (state, action: PayloadAction<string>) => {
            state.preSignedURL = action.payload;
        },
        setPath: (state, action: PayloadAction<string>) => {
            state.path = action.payload;
        },
        setShareAvailable: (state, action: PayloadAction<boolean>) => {
            state.shareAvailable = action.payload;
        },
        upload: (_state, _action: PayloadAction<UploadPayload>) => {},
    },
});

export const { actions } = wsSlice;
export default wsSlice.reducer;

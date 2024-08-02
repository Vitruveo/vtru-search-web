import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, UploadPayload } from './types';

const initialState: InitialState = {
    preSignedURL: '',
    shareAvailable: false,
    path: '',
    uploadProgress: 0,
};

export const wsSlice = createSlice({
    name: 'ws',
    initialState,
    reducers: {
        requestUpload: (_state, _action: PayloadAction<string[]>) => {},
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
        setUploadProgress: (state, action: PayloadAction<number>) => {
            state.uploadProgress = action.payload;
        },
        upload: (_state, _action: PayloadAction<UploadPayload>) => {},
    },
});

export const { actions } = wsSlice;
export default wsSlice.reducer;

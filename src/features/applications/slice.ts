'use client';
import { createSlice } from '@reduxjs/toolkit';

import { ApplicationSliceState } from './types';

const initialState: ApplicationSliceState = {
    requestAssetUpload: {},
    status: '',
    error: '',
};

export const applicationsSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        },
        requestAssetUpload: (state, action) => {
            state.requestAssetUpload[action.payload.transactionId] = {
                ...state.requestAssetUpload[action.payload.transactionId],
                ...action.payload,
            };
        },
        error: (state, action) => {
            state.status = `failed: ${action.type}`;
            state.error = action.payload;
        },
    },
});

export const applicationsActionsCreators = applicationsSlice.actions;

'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileCreatorSliceState } from './types';

export const initialState: ProfileCreatorSliceState = {
    loading: false,
    error: null,
    data: {
        id: '',
        avatar: '',
        artsQuantity: 0,
    },
};

export const profileCreatorSlice = createSlice({
    name: 'profileCreator',
    initialState,
    reducers: {
        loadProfileCreator: (_state, action: PayloadAction<{ username: string }>) => {},
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        setData: (state, action: PayloadAction<ProfileCreatorSliceState['data']>) => {
            state.data = action.payload;
        },
    },
});

export const { actions } = profileCreatorSlice;
export default profileCreatorSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';

const initialState: InitialState = {
    token: '',
    email: '',
    code: '',
    wasSended: false,
    loading: false,
};

export const creatorSlice = createSlice({
    name: 'creator',
    initialState,
    reducers: {
        sendCode: () => {},
        resendCode: () => {},
        verifyCode: () => {},
        logout: (state) => {
            state.token = '';
            state.email = '';
            state.code = '';
            state.wasSended = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        wasSended: (state) => {
            state.wasSended = true;
        },
        resetEmail: (state) => {
            state.email = '';
            state.wasSended = false;
        },
        changeEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        changeCode: (state, action: PayloadAction<string>) => {
            state.code = action.payload;
        },
    },
});

export const { actions } = creatorSlice;
export default creatorSlice.reducer;

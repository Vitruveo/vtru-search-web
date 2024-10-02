import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';

const initialState: InitialState = {
    username: '',
    token: '',
    email: '',
    code: '',
    wasSended: false,
    loading: false,
    id: '',
    avatar: '',
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
            state.avatar = '';
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setLogged: (
            state,
            action: PayloadAction<{
                token: string;
                username: string;
                id: string;
                avatar: string;
            }>
        ) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.id = action.payload.id;
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

'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User, UserOTPConfirmRes, UserSliceState } from './types';
import { DeepPartial } from '../common/types';

const initialState: UserSliceState = {
    _id: '',
    token: '',
    login: {
        email: '',
    },
    profile: {
        name: '',
        wallets: [],
        emails: [],
        avatar: '',
    },
    requestAvatarUpload: {
        path: '',
        status: '',
        transactionId: '',
        url: '',
    },
    framework: {
        createdAt: null,
        updatedAt: null,
        createdBy: null,
        updatedBy: null,
    },
    status: '',
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        },
        login: (state, action) => {
            state.status = `succeeded: ${action.type}`;
            state.login.email = action.payload.email;
        },

        loginSuccess: (state, action) => {
            const { token, user } = action.payload.data as UserOTPConfirmRes;
            state.status = `succeeded: ${action.type}`;
            state.token = token;
            state._id = user._id;
            state.profile = user.profile;
            state.framework = user.framework;
        },
        change: (state, action: PayloadAction<DeepPartial<UserSliceState>>) => {
            const { profile, _id, error, framework, login, requestAvatarUpload, status, token } =
                action.payload as UserSliceState;

            return {
                ...state,
                _id: _id || state._id,
                token: token || state.token,
                login: {
                    ...state.login,
                    ...login,
                },
                framework: {
                    ...state.framework,
                    ...framework,
                },
                requestAvatarUpload: {
                    ...state.requestAvatarUpload,
                    ...requestAvatarUpload,
                },
                status: status || state.status,
                error: error || state.error,
                profile: {
                    ...state.profile,
                    ...profile,
                },
            };
        },
        changeAvatar: (state, action: PayloadAction<{ fileId: string }>) => {
            state.profile.avatar = action.payload.fileId;
        },
        requestAvatarUpload: (state, action) => {
            state.requestAvatarUpload = action.payload;
        },
        error: (state, action) => {
            state.status = `failed: ${action.type}`;
            state.error = action.payload;
        },
    },
});

export const userActionsCreators = userSlice.actions;

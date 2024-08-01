import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { API_BASE_URL } from '@/constants/api';
import { APIResponse } from '../common/types';
import { actions as actionsCreator } from './slice';
import { OptConfirmResponse, PreSignedURLPayload, UploadPayload } from './types';
import { toastrActionsCreators } from '../toastr/slice';
import { socketEmit, connectWebSocket, socket } from '@/services/socket';
import store from '@/store';
import { PayloadAction } from '@reduxjs/toolkit';

function* sendCode() {
    yield put(actionsCreator.setLoading(true));
    try {
        const email: string = yield select((state) => state.creator.email);
        yield call(axios.post, `${API_BASE_URL}/creators/login`, {
            email,
        });
        yield put(actionsCreator.wasSended());
    } catch (error) {
        yield put(toastrActionsCreators.displayToastr({ message: 'An unexpected error occured', type: 'error' }));
    }
    yield put(actionsCreator.setLoading(false));
}

function* verifyCode() {
    yield put(actionsCreator.setLoading(true));
    try {
        const code: string = yield select((state) => state.creator.code);
        const email: string = yield select((state) => state.creator.email);

        const response: AxiosResponse<APIResponse<OptConfirmResponse>> = yield call(
            axios.post,
            `${API_BASE_URL}/creators/login/otpConfirm`,
            {
                email,
                code,
            }
        );
        yield put(
            actionsCreator.setLogged({
                username: response.data.data.creator.username,
                token: response.data.data.token,
                id: response.data.data.creator._id,
                avatar: response.data.data.creator.profile.avatar,
            })
        );
        yield call(connectWebSocket);
        yield call(socketEmit, 'login', {
            id: response.data.data.creator._id,
            email,
            token: 'creator',
        });
    } catch (error) {
        yield put(toastrActionsCreators.displayToastr({ message: 'Invalid code', type: 'error' }));
    }
    yield put(actionsCreator.setLoading(false));
}

function* requestUpload() {
    try {
        const token: string = yield select((state) => state.creator.token);
        yield call(
            axios.post,
            `${API_BASE_URL}/upload/request`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        yield put(toastrActionsCreators.displayToastr({ message: 'An unexpected error occured', type: 'error' }));
    }
}

function* watchEvents() {
    yield socket.io?.on('preSignedURL', (data: PreSignedURLPayload) => {
        store.dispatch(actionsCreator.setPresignedURL(data.preSignedURL));
    });
}

function* upload(action: PayloadAction<UploadPayload>) {
    const { preSignedURL, screenShot } = action.payload;

    try {
        yield call(axios.put, preSignedURL, screenShot, {
            headers: {
                'Content-Type': 'image/png;base64',
            },
        });
        yield put(actionsCreator.setShareAvailable(true));
    } catch (error) {
        yield put(toastrActionsCreators.displayToastr({ message: 'An unexpected error occurred', type: 'error' }));
    }
}

export function* creatorSagas() {
    yield all([
        takeLatest(actionsCreator.sendCode, sendCode),
        takeLatest(actionsCreator.resendCode, sendCode),
        takeLatest(actionsCreator.verifyCode, verifyCode),
        takeLatest(actionsCreator.requestUpload, requestUpload),
        takeLatest(actionsCreator.watchEvents, watchEvents),
        takeLatest(actionsCreator.upload, upload),
    ]);
}

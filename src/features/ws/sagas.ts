import { API_BASE_URL } from '@/constants/api';
import axios, { AxiosResponse } from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { toastrActionsCreators } from '../toastr/slice';
import { PreSignedURLPayload, RequestUploadParams, UploadPayload } from './types';
import { connectWebSocket, disconnectWebSocket, socket, socketEmit } from '@/services/socket';
import store from '@/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './slice';
import { APIResponse } from '../common/types';
import { TOKEN_CREATORS } from '@/constants/ws';

function* requestUpload(action: PayloadAction<RequestUploadParams>) {
    try {
        const token: string = yield select((state) => state.creator.token);
        yield call(
            axios.post,
            `${API_BASE_URL}/upload/request`,
            { assets: action.payload.assets, fees: action.payload.fees },
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
        store.dispatch(actions.setPresignedURL(data.preSignedURL));
        store.dispatch(actions.setPath(data.path));
    });
}

function* upload(action: PayloadAction<UploadPayload>) {
    const { preSignedURL, screenShot } = action.payload;

    // Converte a string base64 em um Blob
    const byteCharacters = atob(screenShot.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    try {
        const response: AxiosResponse<APIResponse> = yield call(axios.put, preSignedURL, blob, {
            headers: {
                'Content-Type': 'image/png',
            },
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                store.dispatch(actions.setUploadProgress(progress));
            },
        });
        if (response.status === 200) {
            yield put(actions.setShareAvailable(true));
            yield put(actions.setPresignedURL(''));
        }
    } catch (error) {
        yield put(toastrActionsCreators.displayToastr({ message: 'An unexpected error occurred', type: 'error' }));
    }
}

function* reconnect() {
    yield call(disconnectWebSocket);

    const { token: isLogged, id, email } = yield select((state) => state.creator);

    if (isLogged) {
        yield call(connectWebSocket);
        yield call(socketEmit, 'login', {
            id,
            email,
            token: TOKEN_CREATORS,
        });
    }
}

export function* wsSagas() {
    yield all([
        takeLatest(actions.requestUpload, requestUpload),
        takeLatest(actions.watchEvents, watchEvents),
        takeLatest(actions.upload, upload),

        // reload websocket connection after rehydrate
        takeLatest('persist/REHYDRATE', reconnect),
    ]);
}

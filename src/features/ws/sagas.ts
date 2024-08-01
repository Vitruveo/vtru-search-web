import { API_BASE_URL } from '@/constants/api';
import axios from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { toastrActionsCreators } from '../toastr/slice';
import { PreSignedURLPayload, UploadPayload } from './types';
import { socket } from '@/services/socket';
import store from '@/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './slice';

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
        store.dispatch(actions.setPresignedURL(data.preSignedURL));
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
        yield put(actions.setShareAvailable(true));
    } catch (error) {
        yield put(toastrActionsCreators.displayToastr({ message: 'An unexpected error occurred', type: 'error' }));
    }
}

export function* wsSagas() {
    yield all([
        takeLatest(actions.requestUpload, requestUpload),
        takeLatest(actions.watchEvents, watchEvents),
        takeLatest(actions.upload, upload),
    ]);
}

import { API_BASE_URL } from '@/constants/api';
import axios from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { toastrActionsCreators } from '../toastr/slice';
import { FinishedGridPayload, GridUploadParams } from './types';
import { connectWebSocket, disconnectWebSocket, socket, socketEmit } from '@/services/socket';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './slice';
import { actions as actionsCreator } from '../creator/slice';
import { TOKEN_CREATORS } from '@/constants/ws';
import store from '@/store';

function* gridUpload(action: PayloadAction<GridUploadParams>) {
    try {
        yield put(actions.clearGrid());
        yield put(actions.startLoading());

        const token: string = yield select((state) => state.creator.token);
        yield call(axios.post, `${API_BASE_URL}/upload/grid`, action.payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        yield put(toastrActionsCreators.displayToastr({ message: 'An unexpected error occured', type: 'error' }));
    }
}

function* watchEvents() {
    yield socket.io?.on('userNotification', (data: FinishedGridPayload) => {
        store.dispatch(
            actions.setGrid({
                path: data.notification.path,
                url: data.notification.url,
            })
        );
        store.dispatch(actions.stopLoading());
    });
}

function* reconnect() {
    try {
        yield call(disconnectWebSocket);

        const authRaw = localStorage.getItem('auth');
        const auth = authRaw ? JSON.parse(authRaw) : null;

        if (auth && auth.token) {
            yield put(
                actionsCreator.setLogged({
                    token: auth.token,
                    username: auth.username,
                    id: auth.id,
                    avatar: auth.avatar,
                })
            );

            yield call(connectWebSocket);
            yield call(socketEmit, 'login', {
                id: auth.id,
                email: auth.email,
                token: TOKEN_CREATORS,
            });
        }
    } catch (error) {
        // do nothing
    }
}

export default function* wsSagas() {
    yield all([
        takeLatest(actions.gridUpload, gridUpload),
        takeLatest(actions.watchEvents, watchEvents),

        // reload websocket connection after rehydrate
        takeLatest('persist/REHYDRATE', reconnect),
    ]);
}

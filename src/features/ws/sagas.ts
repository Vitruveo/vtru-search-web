import { API_BASE_URL } from '@/constants/api';
import axios, { AxiosResponse } from 'axios';
import cookie from 'cookiejs';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { toastrActionsCreators } from '../toastr/slice';
import { FinishedGridPayload, GridUploadParams } from './types';
import { connectWebSocket, disconnectWebSocket, socket, socketEmit } from '@/services/socket';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './slice';
import { actions as actionsCreator } from '../creator/slice';
import { TOKEN_CREATORS } from '@/constants/ws';
import store from '@/store';
import { APIResponse } from '../common/types';

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
        if (typeof document === 'undefined') return;

        const auth = cookie.get('auth');

        if (!auth || typeof auth !== 'string') return;

        const me: AxiosResponse<
            APIResponse<{
                _id: string;
                username: string;
                emails: { email: string }[];
                profile: { avatar: string };
            }>
        > = yield call(axios.get, `${API_BASE_URL}/creators/me`, {
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        });

        if (me.data) {
            yield put(
                actionsCreator.setLogged({
                    username: me.data.data.username,
                    token: auth,
                    id: me.data.data._id,
                    avatar: me.data.data.profile.avatar,
                })
            );

            yield call(connectWebSocket);
            yield call(socketEmit, 'login', {
                id: me.data.data._id,
                email: me.data.data.emails[0].email,
                token: TOKEN_CREATORS,
            });
        }
    } catch (error) {
        yield put(actionsCreator.logout());
        yield call(disconnectWebSocket);

        // remove cookie
        cookie.remove('auth');
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

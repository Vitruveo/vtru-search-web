import { API_BASE_URL } from '@/constants/api';
import axios from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { toastrActionsCreators } from '../toastr/slice';
import { FinishedGridPayload, GridUploadParams } from './types';
import { connectWebSocket, disconnectWebSocket, socket, socketEmit } from '@/services/socket';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './slice';
import { TOKEN_CREATORS } from '@/constants/ws';
import store from '@/store';

function* gridUpload(action: PayloadAction<GridUploadParams>) {
    try {
        yield put(actions.clearGrid());

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
        store.dispatch(actions.setGrid(data.notification.path));
    });
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

export default function* wsSagas() {
    yield all([
        takeLatest(actions.gridUpload, gridUpload),
        takeLatest(actions.watchEvents, watchEvents),

        // reload websocket connection after rehydrate
        takeLatest('persist/REHYDRATE', reconnect),
    ]);
}

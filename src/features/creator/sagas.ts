import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import cookie from 'cookiejs';

import { API_BASE_URL } from '@/constants/api';
import { APIResponse } from '../common/types';
import { actions as actionsCreator } from './slice';
import { OptConfirmResponse } from './types';
import { toastrActionsCreators } from '../toastr/slice';
import { socketEmit, connectWebSocket } from '@/services/socket';
import { TOKEN_CREATORS } from '@/constants/ws';

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

        // save cookie
        const host = window.location.hostname;
        const domain = host.replace('search.', '');

        cookie.set('auth', response.data.data.token, { path: '/', domain });

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
            token: TOKEN_CREATORS,
        });
    } catch (error) {
        yield put(toastrActionsCreators.displayToastr({ message: 'Invalid code', type: 'error' }));
    }
    yield put(actionsCreator.setLoading(false));
}

export function* creatorSagas() {
    yield all([
        takeLatest(actionsCreator.sendCode, sendCode),
        takeLatest(actionsCreator.resendCode, sendCode),
        takeLatest(actionsCreator.verifyCode, verifyCode),
    ]);
}

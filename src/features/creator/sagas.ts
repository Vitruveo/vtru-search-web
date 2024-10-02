import { all, takeLatest, put, call, select, takeEvery } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { API_BASE_URL } from '@/constants/api';
import { APIResponse } from '../common/types';
import { actions as actionsCreator } from './slice';
import { OptConfirmResponse, ResponseArtistsSpotlight } from './types';
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

function* getArtistsSpotlight() {
    try {
        const URL_ARTISTS_SPOTLIGHT = `${API_BASE_URL}/creators/public/spotlight`;

        const response: AxiosResponse<APIResponse<ResponseArtistsSpotlight>> = yield call(
            axios.get,
            URL_ARTISTS_SPOTLIGHT
        );

        yield put(actionsCreator.changeSpotlight(response.data.data));
    } catch (error) {
        // handle error
    }
}

export function* creatorSagas() {
    yield all([
        takeLatest(actionsCreator.sendCode, sendCode),
        takeLatest(actionsCreator.resendCode, sendCode),
        takeLatest(actionsCreator.verifyCode, verifyCode),

        //Spotlight
        takeEvery(actionsCreator.loadArtistsSpotlight, getArtistsSpotlight),
    ]);
}

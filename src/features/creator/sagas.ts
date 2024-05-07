import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import toastr from 'toastr';

import { API_BASE_URL } from '@/constants/api';
import { APIResponse } from '../common/types';
import { actions as actionsCreator } from './slice';
import { OptConfirmResponse } from './types';

function* sendCode() {
    yield put(actionsCreator.setLoading(true));
    try {
        const email: string = yield select((state) => state.creator.email);
        yield call(axios.post, `${API_BASE_URL}/creators/login`, {
            email,
        });
        yield put(actionsCreator.wasSended());
    } catch (error) {
        // something went wrong
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
            })
        );
    } catch (error) {
        // something went wrong
        if (error instanceof axios.AxiosError) {
            if (error.response?.status === 401) {
                yield call(toastr.error, 'Invalid code', 'Error');
            } else {
                yield call(toastr.error, 'Something went wrong', 'Error');
            }
        }
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

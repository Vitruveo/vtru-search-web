import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import axios, { AxiosResponse } from 'axios';
import { SystemStatusType } from './types';
import { SYSTEM_STATUS_JSON } from '@/constants/vitruveo';

function* getSystemStatus() {
    yield put(actions.startLoading());
    try {
        const response: AxiosResponse<SystemStatusType> = yield call(axios.get, SYSTEM_STATUS_JSON);
        yield put(actions.setData(response.data));
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            yield put(actions.setError(error.response.data.message));
        }
        if (error instanceof Error) {
            yield put(actions.setError(error.message));
        }
    } finally {
        yield put(actions.finishLoading());
    }
}

export function* systemStatusSagas() {
    yield all([takeLatest(actions.loadSystemStatus.type, getSystemStatus)]);
}

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import axios, { AxiosResponse } from 'axios';
import { RedirectType } from './types';
import { REDIRECTS_JSON } from '@/constants/vitruveo';

function* getRedirects() {
    yield put(actions.startLoading());
    try {
        const response: AxiosResponse<RedirectType> = yield call(axios.get, REDIRECTS_JSON);
        yield put(actions.setRedirects(response.data));
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

export function* redirectsSagas() {
    yield all([takeLatest(actions.loadRedirects.type, getRedirects)]);
}

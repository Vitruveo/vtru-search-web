import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import axios, { AxiosResponse } from 'axios';
import { SystemStatusType } from './types';
import { SYSTEM_STATUS_JSON } from '@/constants/vitruveo';

function* getSystemStatus() {
    yield put(actions.startLoading());
    try {
        const { data } = yield select((state) => state.systemStatus);
        const { lastModified, fetchedAt } = yield select((state) => state.systemStatus.cacheHeaders);

        const maxAge = 600;
        if (fetchedAt && Date.now() - fetchedAt < maxAge * 1000 && data) {
            yield put(actions.setData(data));
            return;
        }

        const headers: Record<string, string> = {};
        if (lastModified) headers['If-Modified-Since'] = lastModified;

        const response: AxiosResponse<SystemStatusType> = yield call(axios.get, SYSTEM_STATUS_JSON, {
            headers,
            validateStatus: (status) => status === 200 || status === 304,
        });

        if (response.status === 304 && data) {
            yield put(actions.setData(data));
        } else {
            yield put(
                actions.setCacheHeaders({
                    lastModified: response.headers['last-modified'] || '',
                    fetchedAt: Date.now(),
                })
            );
        }
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

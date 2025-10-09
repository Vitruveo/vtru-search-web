import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import axios, { AxiosResponse } from 'axios';
import { RedirectType } from './types';
import { REDIRECTS_JSON } from '@/constants/vitruveo';

function* getRedirects() {
    yield put(actions.startLoading());
    try {
        const { data } = yield select((state) => state.redirects);
        const { lastModified, fetchedAt } = yield select((state) => state.redirects.cacheHeaders);

        const maxAge = 600;
        if (fetchedAt && Date.now() - fetchedAt < maxAge * 1000 && data) {
            yield put(actions.setData(data));
            return;
        }

        const headers: Record<string, string> = {};
        if (lastModified) headers['If-Modified-Since'] = lastModified;

        const response: AxiosResponse<RedirectType> = yield call(axios.get, REDIRECTS_JSON, {
            headers,
            validateStatus: (status) => status === 200 || status === 304,
        });
        if (response.status === 304 && data) {
            yield put(actions.setData(data));
        } else {
            yield put(actions.setData(response.data));
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

export function* redirectsSagas() {
    yield all([takeLatest(actions.loadRedirects.type, getRedirects)]);
}

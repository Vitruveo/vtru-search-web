import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './slice';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { API_BASE_URL } from '@/constants/api';
import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../common/types';
import { GetStoresResponse } from './types';

function* getStores({ payload }: PayloadAction<{ subdomain: string }>) {
    yield put(actions.startLoading());
    try {
        const URL_STORES = `${API_BASE_URL}/stores/public/${payload.subdomain}`;
        const response: AxiosResponse<APIResponse<GetStoresResponse>> = yield call(axios.get, URL_STORES);

        yield put(actions.setStores(response.data.data));
    } catch (error) {
        // Handle error
    }
    yield put(actions.finishLoading());
}

function* getStoresList() {
    yield put(actions.startLoading());
    try {
        const page: number = yield select((state) => state.stores.data.page);
        const limit: number = yield select((state) => state.stores.data.limit);
        const sort: string = yield select((state) => state.stores.sort);

        const URL_STORES = `${API_BASE_URL}/stores/public`;
        const response: AxiosResponse<APIResponse<GetStoresResponse>> = yield call(axios.get, URL_STORES, {
            params: {
                page,
                limit,
                sort,
            },
        });

        yield put(actions.setStores(response.data.data));
    } catch (error) {
        // Handle error
    }
    yield put(actions.finishLoading());
}

export function* storesSagas() {
    yield all([
        takeEvery(actions.getStoresRequest.type, getStores),
        takeEvery(actions.getStoresListRequest.type, getStoresList),

        takeEvery(actions.setPage.type, getStoresList),
        takeEvery(actions.setSort.type, getStoresList),
        takeEvery(actions.setLimit.type, getStoresList),
    ]);
}

import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './slice';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { API_BASE_URL } from '@/constants/api';
import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../common/types';
import { GetStoresResponse, Stores, StoresSpotlight } from './types';

function* getStores({ payload }: PayloadAction<{ subdomain: string }>) {
    yield put(actions.startLoading());
    try {
        const URL_STORES = `${API_BASE_URL}/stores/public/${payload.subdomain}`;
        const response: AxiosResponse<APIResponse<Stores>> = yield call(axios.get, URL_STORES);

        yield put(actions.setCurrentDomain(response.data.data));
    } catch (error) {
        // Handle error
    }
    yield put(actions.finishLoading());
}

function* getStoresList() {
    yield put(actions.startLoading());
    try {
        const search: string = yield select((state) => state.stores.search);
        const page: number = yield select((state) => state.stores.paginated.page);
        const limit: number = yield select((state) => state.stores.paginated.limit);
        const sort: string = yield select((state) => state.stores.sort);

        const URL_STORES = `${API_BASE_URL}/stores/public`;
        const response: AxiosResponse<APIResponse<GetStoresResponse>> = yield call(axios.get, URL_STORES, {
            params: {
                search,
                page,
                limit,
                sort,
            },
        });

        yield put(
            actions.setPaginatedList({
                list: response.data.data.data,
                limit: response.data.data.limit,
                page: response.data.data.page,
                total: response.data.data.total,
                totalPage: response.data.data.totalPage,
            })
        );
    } catch (error) {
        // Handle error
    }
    yield put(actions.finishLoading());
}

function* getStoresSpotlight() {
    try {
        const URL_STORES_SPOTLIGHT = `${API_BASE_URL}/stores/public/spotlight`;
        const response: AxiosResponse<APIResponse<StoresSpotlight[]>> = yield call(axios.get, URL_STORES_SPOTLIGHT);
        yield put(actions.setSpotlight(response.data.data));
    } catch (error) {
        // Handle error
    }
}

export function* storesSagas() {
    yield all([
        takeEvery(actions.getStoresRequest.type, getStores),
        takeEvery(actions.getStoresListRequest.type, getStoresList),
        takeEvery(actions.getStoresListRequest.type, getStoresSpotlight),

        takeEvery(actions.setPage.type, getStoresList),
        takeEvery(actions.setSort.type, getStoresList),
        takeEvery(actions.setLimit.type, getStoresList),
        takeEvery(actions.setSearch.type, getStoresList),
    ]);
}

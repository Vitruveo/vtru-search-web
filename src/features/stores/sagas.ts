import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './slice';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_URL } from '@/constants/api';
import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../common/types';
import { Stores } from './types';

function* getStores({ payload }: PayloadAction<{ subdomain: string }>) {
    yield put(actions.startLoading());
    try {
        const URL_STORES = `${API_BASE_URL}/stores/public/${payload.subdomain}`;
        const response: AxiosResponse<APIResponse<Stores>> = yield call(axios.get, URL_STORES);

        if (response.data?.data) {
            yield put(actions.setStores(response.data.data));
        }
    } catch (error) {
        // Handle error
    }
    yield put(actions.finishLoading());
}

export function* storesSagas() {
    yield all([takeEvery(actions.getStoresRequest.type, getStores)]);
}

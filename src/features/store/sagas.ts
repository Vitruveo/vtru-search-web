import { API_BASE_URL } from '@/constants/api';
import axios, { AxiosResponse } from 'axios';
import { Asset } from '../assets/types';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './slice';
import { APIResponse } from '../common/types';
import { LastAssets } from './types';

function* getStoreAsset({ payload }: PayloadAction<{ id: string }>) {
    yield put(actions.startLoading());
    try {
        const URL_STORE_ASSET = `${API_BASE_URL}/assets/store/${payload.id}`;

        const response: AxiosResponse<APIResponse<Asset>> = yield call(axios.get, URL_STORE_ASSET);

        yield put(actions.setAsset(response.data.data));
    } catch (error) {
        // Handle error
    }
    yield put(actions.finishLoading());
}

function* getStoreCreator({ payload }: PayloadAction<{ id: string }>) {
    yield put(actions.startCreatorLoading());
    try {
        const URL_STORE_CREATOR = `${API_BASE_URL}/creators/avatar/${payload.id}`;

        const response: AxiosResponse<APIResponse<string>> = yield call(axios.get, URL_STORE_CREATOR);

        yield put(actions.setCreatorAvatar(response.data.data));
    } catch (error) {
        // Handle error
    }
    yield put(actions.finishCreatorLoading());
}

function* getStoreLastAssets({ payload }: PayloadAction<{ id: string }>) {
    yield put(actions.startLastAssetsLoading());
    try {
        const URL_STORE_LAST_ASSETS = `${API_BASE_URL}/assets/store/${payload.id}/lastConsigns`;

        const response: AxiosResponse<APIResponse<LastAssets[]>> = yield call(axios.get, URL_STORE_LAST_ASSETS);

        yield put(actions.setLastAssets(response.data.data));
    } catch (error) {
        // Handle error
    }
    yield put(actions.finishLastAssetsLoading());
}

export default function* storeSagas() {
    yield all([
        takeEvery(actions.getAssetRequest.type, getStoreAsset),
        takeEvery(actions.getCreatorRequest.type, getStoreCreator),
        takeEvery(actions.getLastAssetsRequest.type, getStoreLastAssets),
    ]);
}

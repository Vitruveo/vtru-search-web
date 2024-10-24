import { API_BASE_URL } from '@/constants/api';
import axios, { AxiosResponse } from 'axios';
import { Asset } from '../assets/types';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from './slice';

function* getStoreAsset({ payload }: PayloadAction<{ id: string }>) {
    try {
        const URL_STORE_ASSET = `${API_BASE_URL}/assets/store/${payload.id}`;

        const response: AxiosResponse<Asset> = yield call(axios.get, URL_STORE_ASSET);

        yield put(actions.setAsset(response.data));
    } catch (error) {
        // Handle error
    }
}

export default function* storeSagas() {
    yield all([takeEvery(actions.getAssetRequest.type, getStoreAsset)]);
}

import axios, { AxiosResponse } from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import type { APIResponse } from '../types';
import type { GetAssetsParams, ResponseAssets } from './types';
import { actions } from './slice';

function* getAssets(action: PayloadAction<GetAssetsParams>) {
    yield put(actions.startLoading());
    try {
        const response: AxiosResponse<APIResponse<ResponseAssets>> = yield call(
            axios.get,
            'https://studio-api.vtru.dev/assets/search',
            {
                params: {
                    page: action.payload.page,
                    limit: 24,
                },
            }
        );

        yield put(actions.setData(response.data.data));
    } catch (error) {
        // Handle error
    }
    yield put(actions.finishLoading());
}

function* setup() {
    yield put(actions.loadAssets({ page: 1 }));
}

export function* assetsSagas() {
    yield all([takeEvery(actions.loadAssets.type, getAssets), setup()]);
}

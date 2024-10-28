import { API_BASE_URL } from '@/constants/api';
import axios, { AxiosResponse } from 'axios';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { actions } from './slice';
import { APIResponse } from '@/features/common/types';
import { ProfileAssetsData } from './types';
import { AppState } from '@/store';

function* getProfileAssets() {
    yield put(actions.startLoading());
    try {
        const creatorId: string = yield select((state: AppState) => state.profileCreator.data.id);
        const page: number = yield select((state: AppState) => state.profileAssets.data.page);
        const limit: number = yield select((state: AppState) => state.profileAssets.data.limit);
        const sort: string = yield select((state: AppState) => state.profileAssets.sort);

        const URL_PROFILE_ASSETS = `${API_BASE_URL}/assets/public/search`;
        const response: AxiosResponse<APIResponse<ProfileAssetsData>> = yield call(axios.post, URL_PROFILE_ASSETS, {
            limit: limit,
            page: page,
            query: { 'framework.createdBy': creatorId },
            minPrice: 0,
            maxPrice: 0,
            name: null,
            precision: 0.7,
            showAdditionalAssets: true,
            sort: {
                order: sort,
                isIncludeSold: true,
            },
            hasBts: '',
        });
        yield put(
            actions.setData({
                data: response.data.data.data,
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

export default function* profileAssetsSaga() {
    yield all([
        takeEvery(actions.loadProfileAssets.type, getProfileAssets),
        takeEvery(actions.setPage.type, getProfileAssets),
        takeEvery(actions.setLimit.type, getProfileAssets),
        takeEvery(actions.setSort.type, getProfileAssets),
    ]);
}

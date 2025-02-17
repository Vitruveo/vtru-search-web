import { API_BASE_URL } from '@/constants/api';
import axios, { AxiosResponse } from 'axios';
import { call, put, select, takeEvery, all } from 'redux-saga/effects';
import { APIResponse } from '../common/types';
import { Stack, StackData } from './types';
import { actions } from './slice';
import { AppState } from '@/store';

function* getStacks() {
    yield put(actions.startLoading());
    try {
        const search: number = yield select((state: AppState) => state.stacks.search);
        const page: number = yield select((state: AppState) => state.stacks.data.page);
        const limit: number = yield select((state: AppState) => state.stacks.data.limit);
        const sort: string = yield select((state: AppState) => state.stacks.sort);

        const URL_STACKS = `${API_BASE_URL}/creators/public/stacks`;
        const response: AxiosResponse<APIResponse<StackData>> = yield call(axios.get, URL_STACKS, {
            params: {
                search,
                page,
                limit,
                sort,
            },
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

function* getStacksSpotlight() {
    try {
        const URL_SPOTLIGHT = `${API_BASE_URL}/creators/public/stackSpotlight`;
        const response: AxiosResponse<APIResponse<{ stack: Stack }[]>> = yield call(axios.get, URL_SPOTLIGHT);
        yield put(actions.setSpotlight(response.data.data));
    } catch (error) {
        // Handle error
    }
}

export default function* stacksSaga() {
    yield all([
        takeEvery(actions.setSearch.type, getStacks),
        takeEvery(actions.loadStacks.type, getStacks),
        takeEvery(actions.setPage.type, getStacks),
        takeEvery(actions.setLimit.type, getStacks),
        takeEvery(actions.setSort.type, getStacks),
        takeEvery(actions.loadStacksSpotlight.type, getStacksSpotlight),
    ]);
}

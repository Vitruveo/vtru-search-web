import { API_BASE_URL } from '@/constants/api';
import { APIResponse } from '@/features/common/types';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { actions } from './slice';
import { ProfileCreator } from './types';

function* getProfileCreator({ payload }: PayloadAction<{ username: string }>) {
    yield put(actions.startLoading());
    try {
        const URL_PROFILE_CREATOR = `${API_BASE_URL}/creators/public/profile/${payload.username}`;
        const response: AxiosResponse<APIResponse<ProfileCreator>> = yield call(axios.get, URL_PROFILE_CREATOR);
        yield put(actions.setData(response.data.data));
    } catch (error) {
        // Handle error
    }
    yield put(actions.finishLoading());
}

export default function* profileCreatorSaga() {
    yield all([takeEvery(actions.loadProfileCreator.type, getProfileCreator)]);
}

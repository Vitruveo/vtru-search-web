import axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../common/types';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_URL } from '@/constants/api';
import { ResponseDashboard } from './types';
import { actions } from './slice';

function* getDashboardData() {
    yield put(actions.setLoading(true));
    try {
        const URL_DASHBOARD = `${API_BASE_URL}/dashboard`;
        const response: AxiosResponse<APIResponse<ResponseDashboard>> = yield call(axios.get, URL_DASHBOARD);
        yield put(actions.setDashboardData(response.data.data));
    } catch (error) {
        // handle error
    }
    yield put(actions.setLoading(false));
}

export function* dashboardSagas() {
    yield all([takeEvery(actions.loadDashboardData.type, getDashboardData)]);
}

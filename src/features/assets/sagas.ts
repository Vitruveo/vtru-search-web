import axios, { AxiosResponse } from 'axios';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { API_BASE_URL } from '@/constants/api';
import type { FilterSliceState } from '../filters/types';
import type {
    AssetsSliceState,
    BuidlQuery,
    GetAssetsParams,
    GetCreatorParams,
    ResponseAsserCreator,
    ResponseAssets,
} from './types';
import { actions } from './slice';
import { actions as actionsFilter } from '../filters/slice';
import { APIResponse } from '../common/types';
import { AppState } from '@/store';

function* getAssets(action: PayloadAction<GetAssetsParams>) {
    yield put(actions.startLoading());
    try {
        const assetData: AssetsSliceState['data'] = yield select((state: AppState) => state.assets.data);
        yield put(actions.setData({ ...assetData, data: [] }));

        const name: string = yield select((state: AppState) => state.filters.name);
        const filtersContext: FilterSliceState['context'] = yield select((state: AppState) => state.filters.context);
        const filtersTaxonomy: FilterSliceState['taxonomy'] = yield select((state) => state.filters.taxonomy);
        const filtersCreators: FilterSliceState['creators'] = yield select((state) => state.filters.creators);

        const buildFilters = {
            context: filtersContext,
            taxonomy: filtersTaxonomy,
            creators: filtersCreators,
        };

        const buildQuery = Object.entries(buildFilters).reduce<BuidlQuery>((acc, cur) => {
            const [key, value] = cur;

            Object.entries(value).forEach((item) => {
                const [keyFilter, valueFilter] = item as [string, string | string[]];
                if (!valueFilter) return;
                if (Array.isArray(valueFilter) && !valueFilter.length) return;

                if (Array.isArray(valueFilter)) {
                    acc[`assetMetadata.${key}.formData.${keyFilter}`] = {
                        $in: valueFilter,
                    };
                    return;
                }
                acc[`assetMetadata.${key}.formData.${keyFilter}`] = valueFilter;
            });

            return acc;
        }, {});

        if (name.trim()) {
            buildQuery['$or'] = [
                { 'assetMetadata.context.formData.title': { $regex: name, $options: 'i' } },
                { 'assetMetadata.context.formData.description': { $regex: name, $options: 'i' } },
            ];
        }

        const URL_ASSETS_SEARCH = `${API_BASE_URL}/assets/public/search`;

        const response: AxiosResponse<APIResponse<ResponseAssets>> = yield call(axios.get, URL_ASSETS_SEARCH, {
            params: {
                limit: 24,
                page: action.payload?.page || 1,
                query: buildQuery,
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
        yield put(actions.setTags(response.data.data.tags.sort((a, b) => (a.count > b.count ? -1 : 1))));
    } catch (error) {
        // Handle error
    }
    yield put(actions.finishLoading());
}
function* getCreator(action: PayloadAction<GetCreatorParams>) {
    try {
        yield put(actions.setCreator(''));

        const URL_ASSET_CREATOR = `${API_BASE_URL}/assets/public/${action.payload.assetId}`;

        const response: AxiosResponse<APIResponse<ResponseAsserCreator>> = yield call(axios.get, URL_ASSET_CREATOR, {});

        if (response.status == 200) {
            yield put(actions.setCreator(response.data.data.username));
        }
    } catch (error) {
        // Handle error
    }
}

function* setup() {
    yield put(actions.loadAssets({ page: 1 }));
}

export function* assetsSagas() {
    yield all([
        takeEvery(actions.loadAssets.type, getAssets),
        takeEvery(actions.loadCreator.type, getCreator),
        takeEvery(actionsFilter.change.type, getAssets),
        takeEvery(actionsFilter.changeName.type, getAssets),
        takeEvery(actionsFilter.reset.type, getAssets),
        setup(),
    ]);
}

import axios, { AxiosResponse } from 'axios';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store/rootReducer';
import { BASE_URL_API } from '@/constants/api';
import type { APIResponse } from '../types';
import type { BuidlQuery, GetAssetsParams, ResponseAssets } from './types';
import { actions } from './slice';
import { filtersActions } from '../filters/slice';
import { FilterSliceState } from '../filters/types';

function* getAssets(action: PayloadAction<GetAssetsParams>) {
    yield put(actions.startLoading());
    try {
        const filtersContext: FilterSliceState['context'] = yield select((state: RootState) => state.filters.context);
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

        const URL_ASSETS_SEARCH = `${BASE_URL_API}/assets/public/search`;

        const response: AxiosResponse<APIResponse<ResponseAssets>> = yield call(axios.get, URL_ASSETS_SEARCH, {
            params: {
                limit: 24,
                page: action.payload?.page || 1,
                query: buildQuery,
            },
        });

        yield put(actions.setData(response.data.data));
        yield put(actions.setTags(response.data.data.tags));
    } catch (error) {
        // Handle error
    }
    yield put(actions.finishLoading());
}

function* setup() {
    yield put(actions.loadAssets({ page: 1 }));
}

export function* assetsSagas() {
    yield all([
        takeEvery(actions.loadAssets.type, getAssets),
        takeEvery(filtersActions.change.type, getAssets),
        takeEvery(filtersActions.reset.type, getAssets),
        setup(),
    ]);
}

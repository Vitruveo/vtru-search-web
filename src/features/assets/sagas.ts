import axios, { AxiosResponse } from 'axios';
import { all, call, put, takeEvery, select, debounce } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { confetti } from '@tsparticles/confetti';

import { API_BASE_URL } from '@/constants/api';
import type { FilterSliceState } from '../filters/types';
import type {
    AssetsSliceState,
    BuidlQuery,
    GetAssetsParams,
    GetCreatorParams,
    MakeVideoParams,
    MakeVideoResponse,
    ResponseAsserCreator,
    ResponseAssets,
} from './types';
import { actions } from './slice';
import { actions as actionsFilter } from '../filters/slice';
import { APIResponse } from '../common/types';
import { AppState } from '@/store';
import { getAssetsIdsFromURL } from '@/utils/url-assets';

function* getAssets(action: PayloadAction<GetAssetsParams>) {
    yield put(actions.startLoading());
    try {
        const assetData: AssetsSliceState['data'] = yield select((state: AppState) => state.assets.data);
        yield put(actions.setData({ ...assetData, data: [] }));

        const name: string = yield select((state: AppState) => state.filters.name);
        const filtersContext: FilterSliceState['context'] = yield select((state: AppState) => state.filters.context);
        const filtersTaxonomy: FilterSliceState['taxonomy'] = yield select((state: AppState) => state.filters.taxonomy);
        const filtersCreators: FilterSliceState['creators'] = yield select((state: AppState) => state.filters.creators);
        const price: FilterSliceState['price'] = yield select((state: AppState) => state.filters.price);

        const showOnlyAvailableArts: FilterSliceState['showOnlyAvailableArts'] = yield select(
            (state: AppState) => state.filters.showOnlyAvailableArts
        );

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

            const assetsIds = getAssetsIdsFromURL();

            if (assetsIds && assetsIds?.length > 0 && assetsIds[0] != '') {
                acc['_id'] = {
                    $in: assetsIds,
                };
            }

            return acc;
        }, {});

        if (!showOnlyAvailableArts) {
            buildQuery['licenses.nft.editionOption'] = 'elastic';
            buildQuery['licenses.nft.elastic.numberOfEditions'] = '0';
        }

        const URL_ASSETS_SEARCH = `${API_BASE_URL}/assets/public/search`;

        const response: AxiosResponse<APIResponse<ResponseAssets>> = yield call(axios.get, URL_ASSETS_SEARCH, {
            params: {
                limit: 24,
                page: action.payload?.page || 1,
                query: buildQuery,
                minPrice: price.min,
                maxPrice: price.max,
                name: name.trim() ? name : null,
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

function* makeVideo(action: PayloadAction<MakeVideoParams>) {
    try {
        yield put(actions.setVideo(''));
        yield put(actions.setLoadingVideo(true));

        const token: string = yield select((state: AppState) => state.creator.token);

        const response: AxiosResponse<APIResponse<MakeVideoResponse>> = yield call(
            axios.post,
            `${API_BASE_URL}/assets/videoGallery`,
            { artworks: action.payload.artworks, title: action.payload.title, sound: action.payload.sound },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                onUploadProgress: (progressEvent: any) => {},
            }
        );
        yield put(actions.setVideo(response.data.data.url));
        yield call(confetti, {
            particleCount: 500,
            spread: 250,
            origin: { x: 0.5, y: 0.5 },
        });
    } catch (error) {
        // somenthing
    }
    yield put(actions.setLoadingVideo(false));
}

function* setup() {
    yield put(actions.loadAssets({ page: 1 }));
}

export function* assetsSagas() {
    yield all([
        takeEvery(actionsFilter.reset.type, getAssets),
        takeEvery(actions.loadAssets.type, getAssets),
        takeEvery(actions.loadCreator.type, getCreator),
        takeEvery(actions.makeVideo.type, makeVideo),
        takeEvery(actionsFilter.change.type, getAssets),
        debounce(1000, actionsFilter.changeName.type, getAssets),
        takeEvery(actionsFilter.changePrice.type, getAssets),
        debounce(500, actionsFilter.changeShowOnlyAvailableArts.type, getAssets),
        setup(),
    ]);
}

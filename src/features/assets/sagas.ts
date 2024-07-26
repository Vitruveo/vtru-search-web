import axios, { AxiosResponse } from 'axios';
import { all, call, put, takeEvery, select, debounce } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { confetti } from '@tsparticles/confetti';

import { API_BASE_URL } from '@/constants/api';
import type { FilterSliceState } from '../filters/types';
import type {
    BuidlQuery,
    GetAssetsParams,
    GetCreatorParams,
    MakeVideoParams,
    MakeVideoResponse,
    ResponseAsserCreator,
    ResponseAssets,
    ResponseAssetsLastSold,
} from './types';
import { actions } from './slice';
import { actions as actionsFilter } from '../filters/slice';
import { APIResponse } from '../common/types';
import { AppState } from '@/store';
import { getAssetsIdsFromURL } from '@/utils/url-assets';
import filterTruthAndNonEmpty from '@/utils/filterTruthObjects';

function* getAssetsLastSold() {
    try {
        const URL_ASSETS_LAST_SOLD = `${API_BASE_URL}/assets/public/lastSold`;

        const response: AxiosResponse<APIResponse<ResponseAssetsLastSold>> = yield call(
            axios.get,
            URL_ASSETS_LAST_SOLD
        );

        yield put(actions.setLastSold(response.data.data));
    } catch (error) {
        // Handle error
    }
}

function* getAssets(action: PayloadAction<GetAssetsParams>) {
    yield put(actions.startLoading());

    try {
        const name: string = yield select((state: AppState) => state.filters.name);
        const isNudityEnable: string = yield select((state: AppState) => state.filters.shortCuts.nudity);
        const isAIEnable: string = yield select((state: AppState) => state.filters.shortCuts.aiGeneration);
        const page: number = yield select((state: AppState) => state.assets.data.page);
        const filtersContext: FilterSliceState['context'] = yield select((state: AppState) => state.filters.context);
        const filtersTaxonomy: FilterSliceState['taxonomy'] = yield select((state: AppState) => state.filters.taxonomy);
        const filtersCreators: FilterSliceState['creators'] = yield select((state: AppState) => state.filters.creators);
        const price: FilterSliceState['price'] = yield select((state: AppState) => state.filters.price);
        const colorPrecision: FilterSliceState['colorPrecision'] = yield select(
            (state: AppState) => state.filters.colorPrecision
        );
        const showAdditionalAssets: FilterSliceState['showAdditionalAssets'] = yield select(
            (state: AppState) => state.filters.showAdditionalAssets.value
        );

        const filtersTaxonomyCopy = {
            ...filtersTaxonomy,
            nudity: filtersTaxonomy.nudity.length > 0 ? filtersTaxonomy.nudity : [isNudityEnable],
            aiGeneration: filtersTaxonomy.aiGeneration.length > 0 ? filtersTaxonomy.aiGeneration : [isAIEnable],
        };

        const buildFilters = {
            context: filtersContext,
            taxonomy: filtersTaxonomyCopy,
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

        const URL_ASSETS_SEARCH = `${API_BASE_URL}/assets/public/search`;

        const response: AxiosResponse<APIResponse<ResponseAssets>> = yield call(axios.get, URL_ASSETS_SEARCH, {
            params: {
                limit: 24,
                page: page || 1,
                query: buildQuery,
                minPrice: price.min,
                maxPrice: price.max,
                name: name.trim() ? name : null,
                precision: colorPrecision.value,
                showAdditionalAssets,
            },
        });

        if (page === 1 || page === 0) {
            yield put(actions.loadAssetsLastSold());
        }

        yield put(actions.setMaxPrice(response.data.data.maxPrice));

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
        yield put(actions.setCreator({ username: '', avatar: '' }));

        const URL_ASSET_CREATOR = `${API_BASE_URL}/assets/public/${action.payload.assetId}`;

        const response: AxiosResponse<APIResponse<ResponseAsserCreator>> = yield call(axios.get, URL_ASSET_CREATOR, {});

        if (response.status == 200) {
            yield put(actions.setCreator({ username: response.data.data.username, avatar: response.data.data.avatar }));
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
    const { context, taxonomy, creators }: FilterSliceState = yield select((state: AppState) => state.filters);
    const filters = {
        context: filterTruthAndNonEmpty(context),
        taxonomy: filterTruthAndNonEmpty(taxonomy),
        creators: filterTruthAndNonEmpty(creators),
    };
    yield put(actions.loadAssets({ page: 1, filters }));
}

export function* assetsSagas() {
    yield all([
        takeEvery(actionsFilter.reset.type, getAssets),
        takeEvery(actions.loadAssets.type, getAssets),
        takeEvery(actions.loadAssetsLastSold.type, getAssetsLastSold),
        takeEvery(actions.loadCreator.type, getCreator),
        takeEvery(actions.makeVideo.type, makeVideo),
        takeEvery(actionsFilter.change.type, getAssets),
        takeEvery(actionsFilter.changeShortCut.type, getAssets),
        debounce(1000, actionsFilter.changeName.type, getAssets),
        debounce(500, actions.setCurrentPage.type, getAssets),
        takeEvery(actionsFilter.changePrice.type, getAssets),
        takeEvery(actionsFilter.changeColorPrecision.type, getAssets),
        takeEvery('persist/REHYDRATE', setup),
    ]);
}

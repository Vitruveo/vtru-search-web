import axios, { AxiosResponse } from 'axios';
import { all, call, put, takeEvery, select, debounce } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { confetti } from '@tsparticles/confetti';

import { API_BASE_URL, BATCH_BASE_URL } from '@/constants/api';
import type { FilterSliceState } from '../filters/types';
import type {
    BuidlQuery,
    GenerateSlideshowParams,
    GetAssetsParams,
    GetCreatorParams,
    MakeVideoParams,
    MakeVideoResponse,
    ResponseAsserCreator,
    ResponseAssetGroupByCreator,
    ResponseAssets,
    ResponseAssetsLastSold,
    ResponseAssetsSpotlight,
    ResponseGrid,
    ResponseSlideshow,
    ResponseVideo,
} from './types';
import { actions } from './slice';
import { actions as actionsFilter } from '../filters/slice';
import { APIResponse } from '../common/types';
import { AppState } from '@/store';
import { getAssetsIdsFromURL } from '@/utils/url-assets';
import validateCryptoAddress from '@/utils/adressValidate';

function* getAssetsSpotlight() {
    try {
        const nudity: string[] = yield select((state: AppState) => state.filters.taxonomy.nudity);

        const URL_ASSETS_SPOTLIGHT = `${API_BASE_URL}/assets/public/spotlight`;

        const response: AxiosResponse<APIResponse<ResponseAssetsSpotlight>> = yield call(
            axios.get,
            URL_ASSETS_SPOTLIGHT,
            {
                params: {
                    nudity: nudity[0] || 'yes',
                },
            }
        );

        yield put(actions.setSpotlight(response.data.data));
    } catch (error) {
        // Handle error
    }
}

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

function* getAssetsGroupByCreator() {
    try {
        const groupByCreator: string = yield select((state: AppState) => state.assets.groupByCreator.active);
        if (groupByCreator === 'no') return;

        yield put(actions.startLoading());

        const wallets: string[] = yield select((state: AppState) => state.filters.portfolio.wallets);
        const page: number = yield select((state: AppState) => state.assets.data.page);
        const limit: number = yield select((state: AppState) => state.assets.data.limit);
        const order: string = yield select((state: AppState) => state.assets.sort.order);
        const sold: string = yield select((state: AppState) => state.assets.sort.sold);
        const name: string = yield select((state: AppState) => state.filters.name);

        const filtersContext: FilterSliceState['context'] = yield select((state: AppState) => state.filters.context);
        const filtersTaxonomy: FilterSliceState['taxonomy'] = yield select((state: AppState) => state.filters.taxonomy);
        const filtersCreators: FilterSliceState['creators'] = yield select((state: AppState) => state.filters.creators);

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

        if (wallets.length) {
            buildQuery['mintExplorer.address'] = {
                $in: wallets.filter((item) => validateCryptoAddress(item)).filter(Boolean),
            };
        }

        buildQuery.grouped = groupByCreator;

        const response: AxiosResponse<APIResponse<ResponseAssetGroupByCreator>> = yield call(
            axios.get,
            `${API_BASE_URL}/assets/public/groupByCreator`,
            {
                params: {
                    query: buildQuery,
                    limit: limit || 25,
                    page: page || 1,
                    name: name.trim() || null,
                    sort: {
                        order,
                        isIncludeSold: sold === 'yes' ? true : false,
                    },
                },
            }
        );

        yield put(actions.loadAssetsLastSold());
        yield put(
            actions.setData({
                data: response.data.data.data.map((item) => ({
                    ...item.asset,
                    countByCreator: item.count,
                    paths: item.paths,
                    username: item.username,
                })),
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

function* getAssets(action: PayloadAction<GetAssetsParams>) {
    try {
        const hasIncludesGroup: string = yield select((state: AppState) => state.assets.groupByCreator.active);
        if (['noSales', 'all'].includes(hasIncludesGroup)) return;

        yield put(actions.startLoading());

        let ids: string[] = [];

        const video: FilterSliceState['video'] = yield select((state: AppState) => state.filters.video);
        const slideshow: FilterSliceState['slideshow'] = yield select((state: AppState) => state.filters.slideshow);
        const grid: FilterSliceState['grid'] = yield select((state: AppState) => state.filters.grid);
        const tabNavigation: FilterSliceState['tabNavigation'] = yield select(
            (state: AppState) => state.filters.tabNavigation
        );

        if (video.assets.length > 0) {
            ids = video.assets;
        } else if (slideshow.assets.length > 0) {
            ids = slideshow.assets;
        } else if (grid.assets.length > 0) {
            ids = grid.assets;
        } else if (tabNavigation.assets.length > 0) {
            ids = tabNavigation.assets;
        }

        const wallets: string[] = yield select((state: AppState) => state.filters.portfolio.wallets);
        const creatorId: string = yield select((state: AppState) => state.filters.creatorId);
        const name: string = yield select((state: AppState) => state.filters.name);
        const page: number = yield select((state: AppState) => state.assets.data.page);
        const limit: number = yield select((state: AppState) => state.assets.data.limit);
        const order: string = yield select((state: AppState) => state.assets.sort.order);
        const sold: string = yield select((state: AppState) => state.assets.sort.sold);
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

        if (ids.length) {
            buildQuery['_id'] = {
                $in: ids,
            };
        }

        if (creatorId) buildQuery['framework.createdBy'] = creatorId;

        if (wallets.length) {
            buildQuery['mintExplorer.address'] = {
                $in: wallets.filter((item) => validateCryptoAddress(item)).filter(Boolean),
            };
        }

        const URL_ASSETS_SEARCH = `${API_BASE_URL}/assets/public/search`;

        const response: AxiosResponse<APIResponse<ResponseAssets>> = yield call(axios.post, URL_ASSETS_SEARCH, {
            limit: limit || 25,
            page: page || 1,
            query: buildQuery,
            minPrice: price.min,
            maxPrice: price.max,
            name: name.trim() ? name : null,
            precision: colorPrecision.value,
            showAdditionalAssets,
            sort: {
                order,
                isIncludeSold: sold === 'yes' ? true : false,
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

function* getGrid(action: PayloadAction<string>) {
    yield put(actions.startLoading());
    try {
        const response: AxiosResponse<APIResponse<ResponseGrid>> = yield call(
            axios.get,
            `${API_BASE_URL}/assets/public/grid/${action.payload}`
        );
        if (
            response.status === 200 &&
            Array.isArray(response.data.data.grid.search.grid) &&
            response.data.data.grid.search.grid.length > 0 &&
            Array.isArray(response.data.data.grid.search.grid[0].assets) &&
            response.data.data.grid.search.grid[0].assets.length > 0
        ) {
            yield put(
                actionsFilter.changeGrid({
                    assets: response.data.data.grid.search.grid[0].assets,
                    title: response.data.data.grid.search.grid[0]?.title || '',
                })
            );
            yield put(actionsFilter.clearVideo());
            yield put(actionsFilter.clearSlideshow());

            yield put(actionsFilter.resetCreatorId());
            yield put(actions.noGroupByCreator());
            yield put(actions.setInitialPage());
            yield put(actions.loadAssets({ page: 1 }));
        }
    } catch (error) {
        // handle error
    }
    yield put(actions.finishLoading());
}

function* getSlideshow(action: PayloadAction<string>) {
    yield put(actions.startLoading());
    try {
        const response: AxiosResponse<APIResponse<ResponseSlideshow>> = yield call(
            axios.get,
            `${API_BASE_URL}/assets/public/slideshow/${action.payload}`
        );

        if (
            response.status === 200 &&
            Array.isArray(response.data.data.slideshow.search.slideshow) &&
            response.data.data.slideshow.search.slideshow.length > 0 &&
            Array.isArray(response.data.data.slideshow.search.slideshow[0].assets) &&
            response.data.data.slideshow.search.slideshow[0].assets.length > 0
        ) {
            yield put(
                actionsFilter.changeSlideshow({
                    assets: response.data.data.slideshow.search.slideshow[0].assets,
                    title: response.data.data.slideshow.search.slideshow[0]?.title || '',
                })
            );
            yield put(actionsFilter.clearVideo());
            yield put(actionsFilter.clearGrid());

            yield put(actionsFilter.resetCreatorId());
            yield put(actions.noGroupByCreator());
            yield put(actions.setInitialPage());
            yield put(actions.loadAssets({ page: 1 }));
        }
    } catch (error) {
        // handle error
    }
    yield put(actions.finishLoading());
}

function* getVideo(action: PayloadAction<string>) {
    yield put(actions.startLoading());
    try {
        const response: AxiosResponse<APIResponse<ResponseVideo>> = yield call(
            axios.get,
            `${API_BASE_URL}/assets/public/video/${action.payload}`
        );

        if (
            response.status === 200 &&
            Array.isArray(response.data.data.video.search.video) &&
            response.data.data.video.search.video.length > 0 &&
            Array.isArray(response.data.data.video.search.video[0].assets) &&
            response.data.data.video.search.video[0].assets.length > 0
        ) {
            yield put(
                actionsFilter.changeVideo({
                    assets: response.data.data.video.search.video[0].assets,
                    title: response.data.data.video.search.video[0]?.title || '',
                })
            );
            yield put(actionsFilter.clearGrid());
            yield put(actionsFilter.clearSlideshow());

            yield put(actionsFilter.resetCreatorId());
            yield put(actions.noGroupByCreator());
            yield put(actions.setInitialPage());
            yield put(actions.loadAssets({ page: 1 }));
        }
    } catch (error) {
        // handle error
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
        yield put(actions.setVideoUrl(''));
        yield put(actions.setLoadingVideo(true));

        const token: string = yield select((state: AppState) => state.creator.token);

        const response: AxiosResponse<APIResponse<MakeVideoResponse>> = yield call(
            axios.post,
            `${API_BASE_URL}/assets/videoGallery`,
            {
                artworks: action.payload.artworks,
                title: action.payload.title,
                sound: action.payload.sound,
                fees: action.payload.fees,
                timestamp: action.payload.timestamp,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                onUploadProgress: (progressEvent: any) => {},
            }
        );
        yield put(actions.setVideoUrl(response.data.data.url));
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

function* generateSlideshow(action: PayloadAction<GenerateSlideshowParams>) {
    try {
        const token: string = yield select((state: AppState) => state.creator.token);

        const response: AxiosResponse<APIResponse<string>> = yield call(
            axios.post,
            `${API_BASE_URL}/creators/stack/slideshow`,
            {
                assets: action.payload.assets,
                title: action.payload.title,
                fees: action.payload.fees,
                display: action.payload.display,
                interval: action.payload.interval,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        yield put(actions.setSlideshow(response.data.data));
    } catch (error) {
        // something
    }
}

function* getTabNavigation(action: PayloadAction<string>) {
    try {
        const option = action.payload.toLowerCase() === 'spotlight' ? 'spotlight' : 'lastSold';
        const ids: string[] = yield select((state: AppState) => state.assets[option].map((item) => item._id));

        yield put(actionsFilter.changeTabNavigation({ assets: ids, title: action.payload }));

        // clear others
        yield put(actionsFilter.clearGrid());
        yield put(actionsFilter.clearSlideshow());
        yield put(actionsFilter.clearVideo());

        yield put(actionsFilter.resetCreatorId());
        yield put(actions.noGroupByCreator());
        yield put(actions.setInitialPage());
        yield put(actions.loadAssets({ page: 1 }));
    } catch (error) {
        // handle error
    }
}

function* setup() {
    try {
        const response: AxiosResponse<APIResponse<boolean>> = yield call(
            axios.get,
            `${BATCH_BASE_URL}/issueLicense/status`
        );

        yield put(actions.setPaused(response.data.data));
    } catch (error) {
        //
    }
}

export function* assetsSagas() {
    yield all([
        // Assets
        takeEvery(actions.startNormal.type, getAssets),
        takeEvery(actionsFilter.reset.type, getAssets),
        takeEvery(actions.loadAssets.type, getAssets),
        takeEvery(actions.setSort.type, getAssets),
        takeEvery(actionsFilter.change.type, getAssets),
        debounce(500, actions.setCurrentPage.type, getAssets),
        debounce(500, actions.setLimit.type, getAssets),
        takeEvery(actionsFilter.changePrice.type, getAssets),
        debounce(1000, actionsFilter.changeName.type, getAssets),
        takeEvery(actionsFilter.changeColorPrecision.type, getAssets),
        takeEvery(actionsFilter.changeCreatorId.type, getAssets),
        takeEvery(actionsFilter.changePortfolioWallets.type, getAssets),

        // Group by creator
        takeEvery(actions.startGrouped.type, getAssetsGroupByCreator),
        takeEvery(actionsFilter.reset.type, getAssetsGroupByCreator),
        takeEvery(actions.setGroupByCreator.type, getAssetsGroupByCreator),
        takeEvery(actions.setSort.type, getAssetsGroupByCreator),
        debounce(500, actions.setCurrentPage.type, getAssetsGroupByCreator),
        debounce(500, actions.setLimit.type, getAssetsGroupByCreator),
        takeEvery(actionsFilter.change.type, getAssetsGroupByCreator),
        debounce(1000, actionsFilter.changeName.type, getAssetsGroupByCreator),
        takeEvery(actionsFilter.changePortfolioWallets.type, getAssetsGroupByCreator),

        // Sold
        takeEvery(actions.loadAssetsLastSold.type, getAssetsLastSold),
        takeEvery(actions.loadAssetsLastSold.type, getAssetsSpotlight),

        takeEvery(actions.loadCreator.type, getCreator),
        takeEvery(actions.makeVideo.type, makeVideo),
        takeEvery(actions.setGridId.type, getGrid),
        takeEvery(actions.setVideoId.type, getVideo),
        takeEvery(actions.setSlideshowId.type, getSlideshow),
        takeEvery(actions.setTabNavigation.type, getTabNavigation),

        takeEvery(actions.generateSlideshow.type, generateSlideshow),

        // setup
        setup(),
    ]);
}

'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterSliceState } from './types';
import { DeepPartial } from '../common/types';
import { clearAssetsFromURL } from '@/utils/url-assets';
import { extractObjects } from '@/utils/extractObjects';

export const initialState: FilterSliceState = {
    storesFilters: {},
    name: '',
    reseted: 0,
    context: {
        title: '',
        description: '',
        culture: [],
        mood: [],
        colors: [],
        copyright: '',
        orientation: [],
    },
    taxonomy: {
        objectType: [],
        tags: [],
        collections: [],
        aiGeneration: [],
        arenabled: [],
        nudity: [],
        category: [],
        medium: [],
        style: [],
        subject: [],
    },
    creators: {
        name: [],
        roles: '',
        bio: '',
        profileUrl: '',
        ethnicity: [],
        gender: [],
        nationality: [],
        residence: [],
    },
    provenance: {
        country: [],
        plusCode: '',
        blockchain: [],
        exhibitions: [
            {
                exhibitionName: '',
                exhibitionUrl: '',
            },
        ],
        awards: [
            {
                awardName: '',
                awardUrl: '',
            },
        ],
    },
    hasBts: '',
    price: {
        min: 0,
        max: 0,
    },
    colorPrecision: {
        value: 0.7,
    },
    showAdditionalAssets: {
        value: false,
    },
    shortCuts: {
        nudity: 'no',
        aiGeneration: 'full',
    },
    grid: {
        assets: [],
        title: '',
    },
    video: {
        assets: [],
        title: '',
    },
    slideshow: {
        assets: [],
        title: '',
    },
    tabNavigation: {
        assets: [],
        artists: [],
        title: '',
    },
    creatorId: '',
    portfolio: {
        wallets: [],
    },
    licenseChecked: '',
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        initialParams: (
            state,
            action: PayloadAction<{ initialParams: Record<string, string>; persistStoresFilters?: boolean }>
        ) => {
            state.storesFilters = {};
            state.name = '';
            state.context = {
                title: '',
                description: '',
                culture: [],
                mood: [],
                colors: [],
                orientation: [],
                copyright: '',
            };
            state.taxonomy = {
                objectType: [],
                tags: [],
                collections: [],
                aiGeneration: [],
                arenabled: [],
                nudity: [],
                category: [],
                medium: [],
                style: [],
                subject: [],
            };
            state.creators = {
                name: [],
                roles: '',
                bio: '',
                profileUrl: '',
                ethnicity: [],
                gender: [],
                nationality: [],
                residence: [],
            };
            state.provenance = {
                country: [],
                plusCode: '',
                blockchain: [],
                exhibitions: [
                    {
                        exhibitionName: '',
                        exhibitionUrl: '',
                    },
                ],
                awards: [
                    {
                        awardName: '',
                        awardUrl: '',
                    },
                ],
            };
            state.price = {
                min: 0,
                max: 0,
            };
            state.colorPrecision = {
                value: 0.7,
            };
            state.showAdditionalAssets = {
                value: false,
            };
            state.shortCuts = {
                nudity: 'no',
                aiGeneration: 'partial,none',
            };
            state.creatorId = '';
            state.grid = {
                assets: [],
                title: '',
            };
            state.video = {
                assets: [],
                title: '',
            };
            state.portfolio = {
                wallets: [],
            };
            state.reseted += 1;
            state.hasBts = '';

            const payload = extractObjects(initialState);

            const { initialParams, persistStoresFilters } = action.payload;

            Object.entries(initialParams).forEach(([key, _value]) => {
                if (typeof payload[key] === 'string') {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    state[key] = initialParams[key];
                    if (persistStoresFilters) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        state.storesFilters[key as keyof typeof state.storesFilters] = initialParams[key];
                    }
                } else if (Array.isArray(payload[key]) || typeof payload[key] === 'number') {
                    const [parent, item] = key.split('_');

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    state[parent][item] = initialParams[key].split(',');

                    if (persistStoresFilters) {
                        if (!state.storesFilters?.[parent as keyof typeof state.storesFilters])
                            state.storesFilters[parent as keyof typeof state.storesFilters] = {} as any;

                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        state.storesFilters[parent][item] = initialParams[key].split(',');
                    }
                }
            });
        },
        changeName: (
            state,
            action: PayloadAction<{
                name: string;
            }>
        ) => {
            state.name = action.payload.name;
        },
        change: (
            state,
            action: PayloadAction<{
                key: keyof FilterSliceState;
                value: DeepPartial<FilterSliceState[keyof FilterSliceState]>;
            }>
        ) => {
            (state[action.payload.key] as any) = {
                ...(state[action.payload.key] as any),
                ...(action.payload.value as any),
            };
        },
        changeShortCut: (state, action: PayloadAction<{ key: keyof FilterSliceState['shortCuts']; value: string }>) => {
            state.shortCuts[action.payload.key] = action.payload.value;
        },
        changeCreatorId: (state, action: PayloadAction<string>) => {
            state.creatorId = action.payload;
        },
        clearGrid: (state) => {
            state.grid = {
                assets: [],
                title: '',
            };
        },
        clearVideo: (state) => {
            state.video = {
                assets: [],
                title: '',
            };
        },
        clearSlideshow: (state) => {
            state.slideshow = {
                assets: [],
                title: '',
            };
        },
        clearTabNavigation: (state) => {
            state.tabNavigation = {
                assets: [],
                artists: [],
                title: '',
            };
        },
        resetCreatorId: (state) => {
            state.creatorId = '';
        },
        reset: (state, action: PayloadAction<{ maxPrice: number }>) => {
            state.name = '';
            state.context = initialState.context;
            state.taxonomy = {
                ...initialState.taxonomy,
                nudity: ['no'],
                aiGeneration: ['partial', 'none'],
            };
            state.creators = initialState.creators;
            state.provenance = initialState.provenance;
            state.price = {
                min: 0,
                max: action.payload.maxPrice,
            };
            state.shortCuts = initialState.shortCuts;
            state.grid = initialState.grid;
            state.video = initialState.video;
            state.reseted += 1;
            state.creatorId = '';
            state.portfolio = initialState.portfolio;
            state.hasBts = initialState.hasBts;
            clearAssetsFromURL();
        },
        changePrice: (state, action: PayloadAction<{ min: number; max: number }>) => {
            state.price = {
                min: action.payload.min,
                max: action.payload.max,
            };
        },
        changeColorPrecision: (state, action: PayloadAction<number>) => {
            state.colorPrecision = {
                value: action.payload,
            };
        },
        changeHasBts: (state, action: PayloadAction<string>) => {
            state.hasBts = action.payload;
        },
        changeShowAdditionalAssets: (state, action: PayloadAction<boolean>) => {
            state.showAdditionalAssets.value = action.payload;
        },
        changeGrid: (
            state,
            action: PayloadAction<{
                assets: string[];
                title: string;
            }>
        ) => {
            if (action.payload) {
                state.grid = action.payload;
            }

            // clear other filters
            state.name = '';
            state.context = initialState.context;
            state.taxonomy = initialState.taxonomy;
            state.creators = initialState.creators;
            state.provenance = initialState.provenance;
            state.price = initialState.price;
            state.shortCuts = {
                nudity: 'no',
                aiGeneration: 'no',
            };
            state.reseted += 1;
            state.hasBts = initialState.hasBts;
            clearAssetsFromURL();
        },
        changeSlideshow: (
            state,
            action: PayloadAction<{
                assets: string[];
                title: string;
            }>
        ) => {
            if (action.payload) {
                state.slideshow = {
                    assets: action.payload.assets,
                    title: action.payload.title,
                };
            }

            // clear other filters
            state.name = '';
            state.context = initialState.context;
            state.taxonomy = initialState.taxonomy;
            state.creators = initialState.creators;
            state.provenance = initialState.provenance;
            state.price = initialState.price;
            state.shortCuts = {
                nudity: 'no',
                aiGeneration: 'no',
            };
            state.reseted += 1;
            state.hasBts = initialState.hasBts;
            clearAssetsFromURL();
        },
        changeVideo: (
            state,
            action: PayloadAction<{
                assets: string[];
                title: string;
            }>
        ) => {
            if (action.payload) {
                state.video = action.payload;
            }

            // clear other filters
            state.name = '';
            state.context = initialState.context;
            state.taxonomy = initialState.taxonomy;
            state.creators = initialState.creators;
            state.provenance = initialState.provenance;
            state.price = initialState.price;
            state.shortCuts = {
                nudity: 'no',
                aiGeneration: 'no',
            };
            state.reseted += 1;
            state.hasBts = initialState.hasBts;
            clearAssetsFromURL();
        },
        changeTabNavigation: (
            state,
            action: PayloadAction<{
                assets: string[];
                artists: string[];
                title: string;
            }>
        ) => {
            if (action.payload) {
                state.tabNavigation = action.payload;
            }

            // clear other filters
            state.name = '';
            state.context = initialState.context;
            state.taxonomy = initialState.taxonomy;
            state.creators = initialState.creators;
            state.provenance = initialState.provenance;
            state.price = initialState.price;
            state.shortCuts = {
                nudity: 'no',
                aiGeneration: 'no',
            };
            state.reseted += 1;
            state.hasBts = initialState.hasBts;
            clearAssetsFromURL();
        },
        changePortfolioWallets: (state, action: PayloadAction<{ wallets: string[] }>) => {
            state.portfolio.wallets = action.payload.wallets;
        },
        changeLicenseChecked: (state, action: PayloadAction<FilterSliceState['licenseChecked']>) => {
            state.licenseChecked = action.payload;
        },
    },
});

export const { actions } = filterSlice;
export default filterSlice.reducer;

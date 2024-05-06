'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterSliceState } from './types';
import { DeepPartial } from '../common/types';
import { clearAssetsFromURL } from '@/utils/url-assets';

const initialState: FilterSliceState = {
    name: '',
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
        collections: '',
        aiGeneration: [],
        arenabled: [],
        nudity: [],
        category: [],
        medium: [],
        style: [],
        subject: '',
    },
    creators: {
        name: '',
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
        exhibitions: {
            exhibitionName: '',
            exhibitionUrl: '',
        },
        awards: {
            awardName: '',
            awardUrl: '',
        },
    },
    price: {
        min: 0,
        max: 0,
    },
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
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
            state[action.payload.key] = {
                ...(state[action.payload.key] as any),
                ...(action.payload.value as any),
            };
        },
        reset: (state) => {
            state.name = '';
            state.context = initialState.context;
            state.taxonomy = initialState.taxonomy;
            state.creators = initialState.creators;
            state.provenance = initialState.provenance;
            clearAssetsFromURL();
        },
        changePrice: (state, action: PayloadAction<{ min: number, max: number }>) => {
            state.price = {
                min: action.payload.min,
                max: action.payload.max,
            };
        }
    },
});

export const { actions } = filterSlice;
export default filterSlice.reducer;

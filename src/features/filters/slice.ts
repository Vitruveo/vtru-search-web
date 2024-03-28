'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterSliceState } from './types';
import { DeepPartial } from '../common/types';

const initialState: FilterSliceState = {
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
        tags: '',
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
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        change: (
            state,
            action: PayloadAction<{
                key: keyof FilterSliceState;
                value: DeepPartial<FilterSliceState[keyof FilterSliceState]>;
            }>
        ) => {
            state[action.payload.key] = {
                ...state[action.payload.key],
                ...action.payload.value,
            };
        },
        reset: (state) => {
            Object.keys(initialState).forEach((key) => {
                state[key] = initialState[key];
            });
        },
    },
});

export const filtersActionsCreators = filterSlice.actions;

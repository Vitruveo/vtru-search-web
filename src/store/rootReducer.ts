import { combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';

import { filterSlice } from '../features/filters';
import { customizerSlice } from '../features/customizer';
import { assetsSlice } from '@/features/assets/slice';

export interface RootState {
    filters: ReturnType<typeof filterSlice.reducer>;
    customizer: ReturnType<typeof customizerSlice.reducer>;
    assets: ReturnType<typeof assetsSlice.reducer>;
}

const appReducer = combineReducers<RootState>({
    filters: filterSlice.reducer,
    customizer: customizerSlice.reducer,
    assets: assetsSlice.reducer,
});

export const reducer: Reducer<RootState, AnyAction> = (state: RootState | undefined, action: AnyAction) => {
    return appReducer(state, action);
};

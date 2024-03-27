import { combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';

import webSocketService from '@/services/websocket';

import { filterSlice } from '../features/filters';
import { customizerSlice } from '../features/customizer';
import { ecommerceSlice } from '../features/ecommerce/slice';

export interface RootState {
    filters: ReturnType<typeof filterSlice.reducer>;
    customizer: ReturnType<typeof customizerSlice.reducer>;
    ecommerceReducer: ReturnType<typeof ecommerceSlice.reducer>;
}

const appReducer = combineReducers<RootState>({
    filters: filterSlice.reducer,
    customizer: customizerSlice.reducer,
    ecommerceReducer: ecommerceSlice.reducer,
});

export const reducer: Reducer<RootState, AnyAction> = (state: RootState | undefined, action: AnyAction) => {
    if (state && action.type === 'filters/logout') {
        webSocketService?.disconnect();
        state = undefined;
    }

    return appReducer(state, action);
};

import { combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';

import webSocketService from '@/services/websocket';
import { websocketSlice } from '@/features/ws';

import { userSlice } from '../features/user';
import { customizerSlice } from '../features/customizer';
import { applicationsSlice } from '../features/applications/slice';
import { ecommerceSlice } from '../features/ecommerce/slice';

interface RootState {
    user: ReturnType<typeof userSlice.reducer>;
    applications: ReturnType<typeof applicationsSlice.reducer>;
    customizer: ReturnType<typeof customizerSlice.reducer>;
    websocket: ReturnType<typeof websocketSlice.reducer>;
    ecommerceReducer: ReturnType<typeof ecommerceSlice.reducer>;
}

const appReducer = combineReducers<RootState>({
    user: userSlice.reducer,
    customizer: customizerSlice.reducer,
    websocket: websocketSlice.reducer,
    applications: applicationsSlice.reducer,
    ecommerceReducer: ecommerceSlice.reducer,
});

export const reducer: Reducer<RootState, AnyAction> = (state: RootState | undefined, action: AnyAction) => {
    if (state && action.type === 'user/logout') {
        webSocketService?.disconnect();
        state = undefined;
    }

    return appReducer(state, action);
};

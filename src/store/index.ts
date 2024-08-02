import { configureStore, type Action, type ThunkAction, combineReducers } from '@reduxjs/toolkit';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import createSagaMiddleware from 'redux-saga';
import { all, spawn } from 'redux-saga/effects';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { PERSIST_KEY, PERSIST_VERSION } from '@/constants/store';

// sagas
import { assetsSagas } from '@/features/assets';
import { creatorSagas } from '@/features/creator';
import { wsSagas } from '@/features/ws';

// slices
import { filterSlice } from '@/features/filters';
import { customizerSlice } from '@/features/customizer';
import { assetsSlice } from '@/features/assets/slice';
import { creatorSlice } from '@/features/creator';
import { layoutSlice } from '@/features/layout';
import { toastrSlice } from '@/features/toastr';
import { wsSlice } from '@/features/ws/slice';

const sagaMiddleware = createSagaMiddleware({
    onError: (error, errorInfo) => {
        // eslint-disable-next-line no-console
        console.error('Saga error', error, errorInfo);
    },
});

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: unknown) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
    key: PERSIST_KEY,
    version: PERSIST_VERSION,
    storage,
};

const rootReducer = combineReducers({
    creator: creatorSlice.reducer,
    assets: assetsSlice.reducer,
    filters: filterSlice.reducer,
    customizer: customizerSlice.reducer,
    layout: layoutSlice.reducer,
    ws: wsSlice.reducer,
    toastr: toastrSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(sagaMiddleware),
});

// Run sagas
function* rootSaga() {
    yield all([spawn(assetsSagas), spawn(creatorSagas), spawn(wsSagas)]);
}

sagaMiddleware.run(rootSaga);

export type Store = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const persistor = persistStore(store);
export default store;

import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import createSagaMiddleware from 'redux-saga';
import { all, spawn } from 'redux-saga/effects';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { reducer } from './rootReducer';
import { assetsSagas } from '@/features/assets';

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
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

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
    yield all([spawn(assetsSagas)]);
}

sagaMiddleware.run(rootSaga);

export type Store = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const persistor = persistStore(store);
export default store;

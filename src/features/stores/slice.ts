import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Stores, StoresState } from "./types";

export const initialState: StoresState = {
    data: {} as Stores,
    loading: false,
    error: null,
};

export const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        getStoresRequest: (_state, _action:PayloadAction<{ subdomain: string }>) => {},
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        setStores: (state, action: PayloadAction<StoresState['data']>) => {
            state.data = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    }
});

export const { actions } = storesSlice;
export default storesSlice.reducer;

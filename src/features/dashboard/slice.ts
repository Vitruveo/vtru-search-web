import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardState, ResponseDashboard } from './types';

export const initialState: DashboardState = {
    loading: false,
    error: null,
    creators: 0,
    arts: 0,
    consigned: 0,
    activeConsigned: 0,
    totalPrice: 0,
    artsSold: 0,
    averagePrice: 0,
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        loadDashboardData: (_state) => {},
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setDashboardData: (state, action: PayloadAction<ResponseDashboard>) => {
            state.loading = false;
            state.error = null;
            state.creators = action.payload.creators;
            state.arts = action.payload.arts;
            state.consigned = action.payload.consigned;
            state.activeConsigned = action.payload.activeConsigned;
            state.totalPrice = action.payload.totalPrice;
            state.artsSold = action.payload.artsSold;
            state.averagePrice = action.payload.averagePrice;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { actions } = dashboardSlice;
export default dashboardSlice.reducer;

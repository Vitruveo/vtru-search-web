// this feature will be used to replace the customizer feature
import { createSlice } from '@reduxjs/toolkit';

interface LayoutState {
    isSidebarOpen: boolean;
}

const initialState: LayoutState = {
    isSidebarOpen: true,
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        closeSidebar: (state) => {
            state.isSidebarOpen = false;
        },
    },
});

export const { actions } = layoutSlice;
export default layoutSlice.reducer;

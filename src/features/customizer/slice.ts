import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StateType {
    activeDir?: string | any;
    activeMode?: string; // This can be light or dark
    activeTheme?: string; // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
    SidebarWidth?: number;
    MiniSidebarWidth?: number;
    TopbarHeight?: number;
    isCollapse?: boolean;
    isLayout?: string;
    isSidebarHover?: boolean;
    isMobileSidebar?: boolean;
    isHorizontal?: boolean;
    currentLanguage: 'en_US' | 'pt_BR' | 'es_ES';
    isCardShadow?: boolean;
    borderRadius?: number | any;
    hidden?: { [key: string]: boolean };
}

const initialState: StateType = {
    activeDir: 'ltr',
    activeMode: 'dark', // This can be light or dark
    activeTheme: 'BLACK_THEME', // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
    SidebarWidth: 270,
    MiniSidebarWidth: 87,
    TopbarHeight: 70,
    isLayout: 'full', // This can be full or boxed
    isCollapse: false, // to make sidebar Mini by default
    isSidebarHover: false,
    isMobileSidebar: false,
    isHorizontal: false,
    currentLanguage: 'en_US',
    isCardShadow: true,
    borderRadius: 7,
    hidden: {
        filter: false,
        order: false,
        header: false,
        recentlySold: false,
        pageNavigation: false,
        cardDetail: false,
    },
};

export const customizerSlice = createSlice({
    name: 'customizer',
    initialState,
    reducers: {
        setTheme: (state: StateType, action: PayloadAction<boolean>) => {
            if (action.payload) {
                state.activeTheme = 'BLACK_THEME';
                state.activeMode = 'dark';
            } else {
                state.activeTheme = 'PURPLE_THEME';
                state.activeMode = 'light';
            }
        },
        setDarkMode: (state: StateType, action) => {
            state.activeMode = action.payload;
        },
        setDir: (state: StateType, action) => {
            state.activeDir = action.payload;
        },
        setLanguage: (state: StateType, action) => {
            state.currentLanguage = action.payload;
        },
        setCardShadow: (state: StateType, action) => {
            state.isCardShadow = action.payload;
        },
        toggleSidebar: (state) => {
            state.isCollapse = !state.isCollapse;
        },
        hoverSidebar: (state: StateType, action) => {
            state.isSidebarHover = action.payload;
        },
        toggleMobileSidebar: (state) => {
            state.isMobileSidebar = !state.isMobileSidebar;
        },
        toggleLayout: (state: StateType, action) => {
            state.isLayout = action.payload;
        },
        toggleHorizontal: (state: StateType, action) => {
            state.isHorizontal = action.payload;
        },
        setBorderRadius: (state: StateType, action) => {
            state.borderRadius = action.payload;
        },
        setHidden: (state: StateType, action: PayloadAction<{ key: string; hidden: boolean }>) => {
            if (state.hidden) state.hidden[action.payload.key] = action.payload.hidden;
        },
        reset: (state: StateType) => {
            state.hidden = {
                filter: false,
                order: false,
                header: false,
                recentlySold: false,
                pageNavigation: false,
                cardDetail: false,
            };
        },
    },
});

export const {
    setTheme,
    setDarkMode,
    setDir,
    toggleSidebar,
    hoverSidebar,
    toggleMobileSidebar,
    toggleLayout,
    setBorderRadius,
    toggleHorizontal,
    setLanguage,
    setCardShadow,
    setHidden,
    reset,
} = customizerSlice.actions;

export const customizerActionsCreators = customizerSlice.actions;

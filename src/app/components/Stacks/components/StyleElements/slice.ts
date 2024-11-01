export const initialState = {
    header: false,
    curate: false,
    spotlight: false,
    navigation: false,
};

export enum TypeAction {
    SET_HEADER = 'SET_HEADER',
    SET_CURATE = 'SET_CURATE',
    SET_SPOTLIGHT = 'SET_SPOTLIGHT',
    SET_NAVIGATION = 'SET_NAVIGATION',
}

interface Action {
    type: TypeAction;
}

interface State {
    header: boolean;
    curate: boolean;
    spotlight: boolean;
    navigation: boolean;
}

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_HEADER':
            return {
                ...state,
                header: !state.header,
            };
        case 'SET_CURATE':
            return {
                ...state,
                curate: !state.curate,
            };
        case 'SET_SPOTLIGHT':
            return {
                ...state,
                spotlight: !state.spotlight,
            };
        case 'SET_NAVIGATION':
            return {
                ...state,
                navigation: !state.navigation,
            };
    }
    throw Error('Unknown action: ' + action.type);
};

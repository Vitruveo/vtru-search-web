export const initialState = {
    filter: false,
    order: false,
    header: false,
    recentlySold: false,
    pageNavigation: false,
    cardDetail: false,
};

export enum TypeAction {
    SET_FILTER = 'SET_FILTER',
    SET_ORDER = 'SET_ORDER',
    SET_HEADER = 'SET_HEADER',
    SET_RECENTLYSOLD = 'SET_RECENTLYSOLD',
    SET_PAGENAVIGATION = 'SET_PAGENAVIGATION',
    SET_CARDDETAIL = 'SET_CARDDETAIL',
}

interface Action {
    type: TypeAction;
}

interface State {
    filter: boolean;
    order: boolean;
    header: boolean;
    recentlySold: boolean;
    pageNavigation: boolean;
    cardDetail: boolean;
}

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return {
                ...state,
                filter: !state.filter,
            };
        case 'SET_ORDER':
            return {
                ...state,
                order: !state.order,
            };
        case 'SET_HEADER':
            return {
                ...state,
                header: !state.header,
            };
        case 'SET_RECENTLYSOLD':
            return {
                ...state,
                recentlySold: !state.recentlySold,
            };
        case 'SET_PAGENAVIGATION':
            return {
                ...state,
                pageNavigation: !state.pageNavigation,
            };
        case 'SET_CARDDETAIL':
            return {
                ...state,
                cardDetail: !state.cardDetail,
            };
    }
    throw Error('Unknown action: ' + action.type);
};

export const initialState = {
    loading: {
        state: false,
        message: '',
    },
    feesGrid: null,
    feesVideo: null,
    openModalMinted: false,
    openModalLicense: false,
    openModalPrintLicense: false,
    openModalBuyVUSD: false,
    expandedAccordion: 'digitalCollectible',
    link: '',
    available: true,
    credits: 0,
    walletCredits: 0,
    platformFee: {
        porcent: 0,
        value: 0,
    },
    totalFee: 0,
    feesCurator: {
        porcent: 0,
        value: 0,
    },
    loadingBuy: false,
    buyCapability: {
        totalAmount: 0,
        balance: 0,
    },
};

export enum TypeActions {
    SET_LOADING = 'SET_LOADING',
    SET_FEES_GRID = 'SET_FEES_GRID',
    SET_FEES_VIDEO = 'SET_FEES_VIDEO',
    SET_OPEN_MODAL_MINTED = 'SET_OPEN_MODAL_MINTED',
    SET_EXPANDED_ACCORDION = 'SET_EXPANDED_ACCORDION',
    SET_LINK = 'SET_LINK',
    SET_AVAILABLE = 'SET_AVAILABLE',
    SET_CREDITS = 'SET_CREDITS',
    SET_WALLET_CREDITS = 'SET_WALLET_CREDITS',
    SET_PLATFORM_FEE = 'SET_PLATFORM_FEE',
    SET_TOTAL_FEE = 'SET_TOTAL_FEE',
    SET_FEES_CURATOR = 'SET_FEES_CURATOR',
    SET_BUYER_BALANCES = 'SET_BUYER_BALANCES',
    SET_BUY_CAPABILITY = 'SET_BUY_CAPABILITY',
    SET_LOADING_BUY = 'SET_LOADING_BUY',
    SET_OPEN_MODAL_LICENSE = 'SET_OPEN_MODAL_LICENSE',
    SET_OPEN_MODAL_BUY_VUSD = 'SET_OPEN_MODAL_BUY_VUSD',
    DISCONNECT = 'DISCONNECT',
    SET_OPEN_MODAL_PRINT_LICENSE = 'SET_OPEN_MODAL_PRINT_LICENSE',
}

interface Action {
    type: TypeActions;
    payload: any;
}

interface State {
    loading: {
        state: boolean;
        message: string;
    };
    feesGrid: number | null;
    feesVideo: number | null;
    openModalMinted: boolean;
    openModalPrintLicense: boolean;
    openModalLicense: boolean;
    openModalBuyVUSD: boolean;
    expandedAccordion: string | false;
    link: string;
    available: boolean;
    credits: number;
    walletCredits: number;
    platformFee: {
        porcent: number;
        value: number;
    };
    loadingBuy: boolean;
    totalFee: number;
    feesCurator: {
        porcent: number;
        value: number;
    };
    buyCapability: {
        totalAmount: number;
    };
}

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            };
        case 'SET_FEES_GRID':
            return {
                ...state,
                feesGrid: action.payload,
            };
        case 'SET_FEES_VIDEO':
            return {
                ...state,
                feesVideo: action.payload,
            };
        case 'SET_OPEN_MODAL_MINTED':
            return {
                ...state,
                openModalMinted: action.payload,
            };

        case 'SET_OPEN_MODAL_BUY_VUSD':
            return {
                ...state,
                openModalBuyVUSD: action.payload,
            };
        case 'SET_EXPANDED_ACCORDION':
            return {
                ...state,
                expandedAccordion: action.payload,
            };
        case 'SET_LINK':
            return {
                ...state,
                link: action.payload,
            };
        case 'SET_AVAILABLE':
            return {
                ...state,
                available: action.payload,
            };
        case 'SET_CREDITS':
            return {
                ...state,
                credits: action.payload,
            };
        case 'SET_WALLET_CREDITS':
            return {
                ...state,
                walletCredits: action.payload,
            };
        case 'SET_PLATFORM_FEE':
            return {
                ...state,
                platformFee: action.payload,
            };
        case 'SET_TOTAL_FEE':
            return {
                ...state,
                totalFee: action.payload,
            };
        case 'SET_FEES_CURATOR':
            return {
                ...state,
                feesCurator: action.payload,
            };
        case 'SET_BUY_CAPABILITY':
            return {
                ...state,
                buyCapability: action.payload,
            };
        case 'SET_LOADING_BUY':
            return {
                ...state,
                loadingBuy: action.payload,
            };
        case 'SET_OPEN_MODAL_LICENSE':
            return {
                ...state,
                openModalLicense: action.payload,
            };
        case 'SET_OPEN_MODAL_PRINT_LICENSE':
            return {
                ...state,
                openModalPrintLicense: action.payload,
            };
        case 'DISCONNECT':
            return {
                ...state,
                available: state.available,
                credits: 0,
                walletCredits: 0,
                totalFee: 0,
                platformFee: {
                    porcent: 0,
                    value: 0,
                },
                buyCapability: {
                    totalAmount: 0,
                },
            };
    }

    throw Error('Unknown action: ' + action.type);
};

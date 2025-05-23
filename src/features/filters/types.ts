interface FiltersInitialState {
    name: string;
    reseted: number;
    context: {
        title: string;
        description: string;
        culture: string[];
        mood: string[];
        colors: string[];
        copyright: string;
        orientation: string[];
    };
    taxonomy: {
        objectType: string[];
        tags: string[];
        collections: string[];
        aiGeneration: string[];
        arenabled: string[];
        nudity: string[];
        category: string[];
        medium: string[];
        style: string[];
        subject: string[];
    };
    creators: {
        name: string[];
        roles: string;
        bio: string;
        profileUrl: string;
        nationality: string[];
        residence: string[];
        ethnicity: string[];
        gender: string[];
    };
    provenance: {
        country: string[];
        plusCode: string;
        blockchain: string[];
        exhibitions: {
            exhibitionName: string;
            exhibitionUrl: string;
        }[];
        awards: {
            awardName: string;
            awardUrl: string;
        }[];
    };
    hasBts: string;
    price: {
        min: number;
        max: number;
    };
    colorPrecision: {
        value: number;
    };
    showAdditionalAssets: {
        value: boolean;
    };
    shortCuts: {
        nudity: string;
        aiGeneration: string;
    };
    grid: {
        assets: string[];
        title: string;
    };
    video: {
        assets: string[];
        title: string;
    };
    slideshow: {
        assets: string[];
        title: string;
    };
    tabNavigation: {
        assets: string[];
        artists: string[];
        title: string;
    };
    creatorId: string;
    portfolio: {
        wallets: string[];
    };
    licenseChecked: {
        nft: string[];
        print: string[];
    };
    exclude: {
        arts: string[];
        artists: string[];
    };
    include: {
        arts: string[];
        artists: string[];
    };
}

export interface FilterSliceState extends FiltersInitialState {
    storesFilters: Partial<FiltersInitialState>;
}

import { AssetsMetadata } from '@/app/components/Assets/assetsGrid/types';

export interface Creator {
    username: string;
    avatar: string;
}

interface Sort {
    order: string;
    sold: string;
}
export interface AssetsSliceState {
    loading: boolean;
    error: string | null;
    data: AssetData;
    tags: Tags[];
    spotlight: SpotlightAsset[];
    lastSold: LastSoldAsset[];
    artistSpotlight: ArtistsSpotlight[];
    creator: Creator;
    slideshow: string;
    video: string;
    loadingVideo: boolean;
    maxPrice: number;
    sort: Sort;
    storesSort?: Sort;
    groupByCreator: {
        active: string;
        name: string;
    };
    paused: boolean;
    curateStacks: Asset[];
}

export type AssetStatus = 'draft' | 'published' | 'archived' | 'preview' | '';

export interface LicensesFormValues {
    nft: {
        version: string;
        added: boolean;
        license: string;
        elastic: {
            editionPrice: number;
            numberOfEditions: number;
            totalPrice: number;
            editionDiscount: boolean;
        };
        single: {
            editionPrice: number;
        };
        unlimited: {
            editionPrice: number;
        };
        editionOption: 'elastic' | 'single' | 'unlimited';
        availableLicenses: number;
    };
    stream: {
        version: string;
        added: boolean;
    };
    print: {
        version: string;
        added: boolean;
        unitPrice: number;
    };
    remix: {
        version: string;
        added: boolean;
        unitPrice: number;
    };
}

interface Format {
    size?: number;
    load?: boolean;
    path: string;
    name?: string;
    definition?: string;
}

export interface Asset {
    _id: string;
    mediaAuxiliary: {
        description: string;
        formats: {
            arImage: Format;
            arVideo: Format;
            btsImage: Format;
            btsVideo: Format;
            codeZip: Format;
        };
    };
    formats: {
        original: Format;
        display: Format;
        exhibition: Format;
        preview: Format;
        print: Format;
    };
    isOriginal: boolean;
    generatedArtworkAI: boolean;
    notMintedOtherBlockchain: boolean;
    contract: boolean;
    assetMetadata?: AssetsMetadata;
    licenses: LicensesFormValues;
    status: AssetStatus;
    framework: {
        createdAt: Date | null;
        updatedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
    };
    consignArtwork?: {
        listing?: string;
        status?: string;
        assetKey: string;
        tokenUri: string;
    };
    contractExplorer?: {
        transactionHash: string;
    };
    mintExplorer: {
        transactionHash: string;
        explorerUrl: string;
        address: string;
        createdAt: Date;
    };
    countByCreator?: number;
    paths?: string[];
    creator: {
        username: string;
    };
    vault: {
        transactionhash: string | null;
        vaultAddress: string | null;
    };
}

export interface Tags {
    tag: string;
    count: number;
}

export interface SpotlightAsset {
    _id: string;
    title: string;
    price: number;
    preview: string;
    username: string;
    nudity: string;
    vault: {
        transactionhash: string | null;
        vaultAddress: string | null;
    };
}

export type ResponseAssetsSpotlight = SpotlightAsset[];

export interface LastSoldAsset {
    _id: string;
    title: string;
    preview: string;
    price: number;
    username: string;
    vault: {
        transactionhash: string | null;
        vaultAddress: string | null;
    };
}

export type ResponseAssetsLastSold = LastSoldAsset[];

export interface ArtistsSpotlight {
    _id: string;
    name: string;
    profile: {
        avatar: string;
    };
}

export type ResponseArtistsSpotlight = ArtistsSpotlight[];

export interface ResponseAssets {
    data: Asset[];
    tags: Tags[];
    page: number;
    totalPage: number;
    total: number;
    limit: number;
    maxPrice: number;
}

export interface ResponseAssetGroupByCreator {
    data: {
        asset: AssetsSliceState['data']['data'][0];
        count: number;
        paths: string[];
        username: string;
        vault: {
            transactionhash: string | null;
            vaultAddress: string | null;
        };
    }[];
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}

export interface ResponseGrid {
    grid: {
        _id: string;
        search: {
            grid: {
                id: string;
                path: string;
                assets: string[];
                title: string;
                createdAt: string;
            }[];
        };
    };
}

export interface ResponseVideo {
    video: {
        _id: string;
        search: {
            video: {
                id: string;
                path: string;
                assets: string[];
                title: string;
                createdAt: string;
            }[];
        };
    };
}

export interface ResponseSlideshow {
    slideshow: {
        _id: string;
        search: {
            slideshow: {
                id: string;
                path: string;
                assets: string[];
                title: string;
                createdAt: string;
                interval: number;
                display: string;
            }[];
        };
    };
}
export interface ResponseAsserCreator {
    username: string;
    avatar: string;
}

export interface AssetData {
    data: Asset[];
    page: number;
    totalPage: number;
    total: number;
    limit: number;
}

export interface GetAssetsParams {
    page: number;
    filters?: {
        context: any;
        taxonomy: any;
        creators: any;
    };
}

export interface GetCreatorParams {
    assetId: string;
}

export interface BuidlQuery {
    [key: string]:
        | string
        | boolean
        | {
              $in: string[];
          }
        | {
              [key: string]: {
                  $regex: string;
                  $options: string;
              };
          }[];
}

export interface MakeVideoResponse {
    url: string;
}

export interface MakeVideoParams {
    artworks: string[];
    title: string;
    description: string;
    sound: string;
    fees: number;
    timestamp: string;
}

export interface GenerateSlideshowParams {
    assets: string[];
    title: string;
    description: string;
    fees: number;
    display: string;
    interval: number;
}

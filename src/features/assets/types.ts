import { AssetsMetadata } from '@/app/components/Assets/assetsGrid/types';

export interface Creator {
    username: string;
}
export interface AssetsSliceState {
    loading: boolean;
    error: string | null;
    data: AssetData;
    tags: Tags[];
    creator: Creator;
    video: string;
    loadingVideo: boolean;
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
        editionOption: 'elastic' | 'single' | 'unlimited' | string;
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
}

export interface Tags {
    tag: string;
    count: number;
}

export interface ResponseAssets {
    data: Asset[];
    tags: Tags[];
    page: number;
    totalPage: number;
    total: number;
    limit: number;
}

export interface ResponseAsserCreator {
    username: string;
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
}

export interface GetCreatorParams {
    assetId: string;
}

export interface BuidlQuery {
    [key: string]:
        | string
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
}
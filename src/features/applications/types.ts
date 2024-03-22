import { APIResponse, Framework } from '../common/types';

export interface Application {
    _id?: string;
    name: string;
    description: string;
    scopes: string[];
    secrets?: string;
    logo: string;
    framework?: Framework;
}

export interface RequestAssetUpload {
    transactionId: string;
    url: string;
    path: string;
    status: string;
    uploadProgress: number;
}

export interface AssetSendRequestUploadReq {
    mimetype: string;
    originalName: string;
    transactionId: string;
    metadata: {
        [key: string]: string | undefined;
    };
}

export type ApplicationList = { [key: string]: Application };

export interface ApplicationSliceState {
    requestAssetUpload: { [key: string]: RequestAssetUpload };
    status: string;
    error: string;
}

export interface AssetStorageReq {
    transactionId: string;
    url: string;
    file: File;
    dispatch: any;
}

export interface DeleteApplicationReq {
    _id: string;
}

export interface RequestDeleteFilesReq {
    deleteKeys: string[];
}

export type AssetSendRequestUploadApiRes = APIResponse<string>;

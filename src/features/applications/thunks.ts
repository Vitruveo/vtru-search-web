import { ReduxThunkAction } from '@/store';
import { AssetSendRequestUploadApiRes, AssetSendRequestUploadReq, AssetStorageReq } from './types';
import { assetStorage, sendRequestUpload } from './requests';

export function sendRequestUploadThunk(
    payload: AssetSendRequestUploadReq
): ReduxThunkAction<Promise<AssetSendRequestUploadApiRes>> {
    return async function (dispatch, getState) {
        const response = await sendRequestUpload({
            mimetype: payload.mimetype,
            originalName: payload.originalName,
            transactionId: payload.transactionId,
            metadata: payload.metadata,
        });

        return response;
    };
}

export function assetStorageThunk(payload: Omit<AssetStorageReq, 'dispatch'>): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        const response = await assetStorage({
            url: payload.url,
            file: payload.file,
            transactionId: payload.transactionId,
            dispatch,
        });

        return response;
    };
}

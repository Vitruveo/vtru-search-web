import axios from 'axios';
import FormData from 'form-data';
import { apiService } from '@/services/api';
import {
    Application,
    AssetSendRequestUploadApiRes,
    AssetSendRequestUploadReq,
    AssetStorageReq,
    DeleteApplicationReq,
    RequestDeleteFilesReq,
} from './types';
import { Framework } from '../common/types';
import { applicationsActionsCreators } from './slice';

export async function createNewApplicationReq(data: Application) {
    const res = await apiService.post(`/applications`, data);

    return res;
}

export async function deleteApplicationReq(data: DeleteApplicationReq) {
    const res = await apiService.delete(`/applications/${data._id}`, data);

    return res;
}

export async function updateApplicationReq(data: Application) {
    const res = await apiService.put(`/applications/${data._id}`, data);

    return res;
}

export async function sendRequestUpload(data: AssetSendRequestUploadReq): Promise<AssetSendRequestUploadApiRes> {
    const res = apiService.post<string>('/applications/request/upload', data);
    return res;
}

export async function requestDeleteFiles(data: RequestDeleteFilesReq): Promise<any> {
    const res = await apiService.delete('/applications/request/deleteFile', data);
    return res;
}

export async function assetStorage({ file, url, dispatch, transactionId }: AssetStorageReq): Promise<any> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('PUT', url, true);

        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                const percentCompleted = Math.round((event.loaded * 100) / event.total);
                dispatch(
                    applicationsActionsCreators.requestAssetUpload({ transactionId, uploadProgress: percentCompleted })
                );
            }
        };

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                });
            }
        };

        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText,
            });
        };

        xhr.send(file);
    });
}

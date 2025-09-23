import { API_BASE_URL } from '@/constants/api';
import axios from 'axios';

export const getAssetWatermark = async ({ assetId, format }: { assetId: string; format: string }) => {
    const response = await axios.get(`${API_BASE_URL}/assets/public/watermark/${assetId}?format=${format}`, {
        responseType: 'arraybuffer',
    });
    return response.data;
};

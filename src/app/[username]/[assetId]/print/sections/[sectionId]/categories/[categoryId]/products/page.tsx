import axios from 'axios';
import { cookies } from 'next/headers';
import { API_BASE_URL } from '@/constants/api';
import PrintProducts from './Component';
import { Products } from '../../../../types';

interface ProductsLayoutProps {
    params: {
        username: string;
        assetId: string;
        sectionId: string;
        categoryId: string;
    };
}

const definitions: Record<string, keyof Products> = {
    portrait: 'vertical',
    landscape: 'horizontal',
    square: 'square',
};

export default async function ProductsServer({ params }: ProductsLayoutProps) {
    const assetRaw = await axios.get(`${API_BASE_URL}/assets/store/${params.assetId}`);
    const asset = await assetRaw.data;

    const definition =
        definitions[asset?.data?.formats?.original?.definition as keyof typeof definitions] || 'vertical';

    let stackId = '';
    let stackType = '';

    const grid = cookies().get('grid')?.value;
    if (grid) {
        stackId = grid;
        stackType = 'grid';
    }

    const video = cookies().get('video')?.value;
    if (video) {
        stackId = video;
        stackType = 'video';
    }

    const stackInfoRaw = await axios.post(`${API_BASE_URL}/creators/public/stacks`, {
        stackId,
        stackType,
    });
    const stackInfo = stackInfoRaw?.data;
    const stackFees = stackInfo?.data?.search?.grid[0]?.fees || stackInfo?.data?.search?.video[0]?.fees || 0;

    return <PrintProducts params={params} definition={definition} stackFees={stackFees} />;
}

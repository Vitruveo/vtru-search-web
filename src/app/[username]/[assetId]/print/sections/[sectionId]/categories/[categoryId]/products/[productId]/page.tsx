import axios from 'axios';
import { cookies } from 'next/headers';
import { API_BASE_URL } from '@/constants/api';
import { Products } from '../../../../../types';
import PrintProductDetails from './Component';

interface ProductsLayoutProps {
    params: {
        username: string;
        assetId: string;
        sectionId: string;
        categoryId: string;
        productId: string;
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

    const grid = cookies().get('grid')?.value;
    if (grid) {
        stackId = grid;
    }

    const video = cookies().get('video')?.value;
    if (video) {
        stackId = video;
    }

    return <PrintProductDetails params={params} definition={definition} stackId={stackId} />;
}

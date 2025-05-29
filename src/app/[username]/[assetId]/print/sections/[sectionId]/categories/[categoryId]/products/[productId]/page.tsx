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
    const assetRaw = await fetch(`${API_BASE_URL}/assets/store/${params.assetId}`);
    const asset = await assetRaw.json();

    const definition =
        definitions[asset?.data?.formats?.original?.definition as keyof typeof definitions] || 'vertical';

    let curatorId = '';

    const grid = cookies().get('grid')?.value;
    if (grid) {
        const gridRaw = await fetch(`${API_BASE_URL}/assets/public/grid/${grid}`);
        const gridData = await gridRaw.json();
        curatorId = gridData?.data?.grid?._id;
    }

    const video = cookies().get('video')?.value;
    if (video) {
        const videoRaw = await fetch(`${API_BASE_URL}/assets/public/video/${video}`);
        const videoData = await videoRaw.json();
        curatorId = videoData?.data?.video?._id;
    }

    return <PrintProductDetails params={params} definition={definition} curatorId={curatorId} />;
}

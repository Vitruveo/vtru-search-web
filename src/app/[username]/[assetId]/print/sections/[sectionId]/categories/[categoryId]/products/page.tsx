import { API_BASE_URL } from '@/constants/api';
import PrintProducts from './Component';
import { Products } from '../../../../types';
import axios from 'axios';

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

    return <PrintProducts params={params} definition={definition} />;
}

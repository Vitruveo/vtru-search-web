import axios from 'axios';
import { API_BASE_URL } from '@/constants/api';
import { PrintCategories } from './Component';
import { Products } from '../../types';

interface CategoriesLayoutProps {
    params: { assetId: string; username: string; sectionId: string };
}

const definitions: Record<string, keyof Products> = {
    portrait: 'vertical',
    landscape: 'horizontal',
    square: 'square',
};

export default async function CategoriesServer({ params }: CategoriesLayoutProps) {
    const assetRaw = await axios.get(`${API_BASE_URL}/assets/store/${params.assetId}`);
    const asset = await assetRaw.data;

    const definition =
        definitions[asset?.data?.formats?.original?.definition as keyof typeof definitions] || 'vertical';

    return <PrintCategories params={params} definition={definition} />;
}

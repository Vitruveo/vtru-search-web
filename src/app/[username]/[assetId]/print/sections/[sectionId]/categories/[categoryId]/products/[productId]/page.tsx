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
    const asset = assetRaw.data;

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
    const stackFees = stackInfo?.data?.search?.grid[0]?.fees || 0;

    const setupPrintLicenseRaw = await axios.get(`${API_BASE_URL}/setup/print-license`);
    const setupPrintLicense = setupPrintLicenseRaw.data;
    const discountedBasisPoints = setupPrintLicense?.data?.discountedBasisPoints || 0;

    return (
        <PrintProductDetails
            params={params}
            definition={definition}
            stackId={stackId}
            stackFees={stackFees}
            discountedBasisPoints={discountedBasisPoints}
        />
    );
}

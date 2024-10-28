import { Metadata } from 'next';

// constants
import { API_BASE_URL } from '@/constants/api';
import { AWS_BASE_URL_S3 } from '@/constants/aws';

// component
import Component from './Component';

interface Props {
    params: {
        assetId: string;
        username: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const response = await fetch(`${API_BASE_URL}/assets/store/${params.assetId}`).then((res) => res.json());

    const asset = response.data;

    const metaOg = {
        title: asset.assetMetadata.context.formData.title,
        description: asset.assetMetadata.context.formData.description,
        url: `${AWS_BASE_URL_S3}/${asset.formats.preview.path}`,
        image: `${AWS_BASE_URL_S3}/${asset.formats.preview.path}`,
    };

    return {
        title: metaOg.title,
        description: metaOg.description,
        openGraph: {
            title: metaOg.title,
            description: metaOg.description,
            url: metaOg.url,
            images: [metaOg.image],
        },
        twitter: {
            card: 'summary_large_image',
            title: metaOg.title,
            description: metaOg.description,
            images: [metaOg.image],
        },
    };
}

export default async function StorePageRoute() {
    return <Component />;
}

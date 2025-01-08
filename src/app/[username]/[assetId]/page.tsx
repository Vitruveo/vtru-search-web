import { Metadata } from 'next';
import { videoExtension } from '@/utils/videoExtensions';

// constants
import { API_BASE_URL } from '@/constants/api';
import { ASSET_STORAGE_URL } from '@/constants/aws';

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

    if (!asset) {
        return {
            title: 'Not found',
            description: 'Asset not found',
        };
    }

    const assetPath = asset.formats.preview?.path;
    const thumbnail = assetPath?.replace(/\.(\w+)$/, '_thumb.jpg');

    const isVideo = videoExtension.some((ext) => assetPath?.endsWith(ext));

    const metaOg = {
        title: asset.assetMetadata.context.formData.title,
        description: asset.assetMetadata.context.formData.description,
        url: `${ASSET_STORAGE_URL}/${assetPath}`,
        image: isVideo ? `${ASSET_STORAGE_URL}/${thumbnail}` : `${ASSET_STORAGE_URL}/${assetPath}`,
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

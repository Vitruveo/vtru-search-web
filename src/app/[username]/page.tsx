import { Metadata } from 'next';

// constants
import { API_BASE_URL } from '@/constants/api';
import { GENERAL_STORAGE_URL } from '@/constants/aws';

// component
import Component from './Component';

interface Props {
    params: { username: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const response = await fetch(`${API_BASE_URL}/creators/public/profile/${params.username}`).then((res) =>
        res.json()
    );

    const profile = response.data;

    const metaOg = {
        title: profile.username,
        description: 'Profile Xibit',
        url: `${GENERAL_STORAGE_URL}/${profile.avatar}`,
        image: `${GENERAL_STORAGE_URL}/${profile.avatar}`,
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

export default async function ProfilePageRoute() {
    return <Component />;
}

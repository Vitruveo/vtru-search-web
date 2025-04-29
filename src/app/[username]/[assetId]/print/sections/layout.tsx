import { redirect } from 'next/navigation';
import { API_BASE_URL } from '@/constants/api';

interface SectionLayoutProps {
    children: React.ReactNode;
    params: {
        username: string;
        assetId: string;
    };
}

export default async function SectionLayout({ children, params }: SectionLayoutProps) {
    const { assetId, username } = params;

    try {
        const assetRaw = await fetch(`${API_BASE_URL}/assets/store/${assetId}`);
        const asset = (await assetRaw.json()).data;

        const hasPrintAdded = asset.licenses.print.added;

        if (!hasPrintAdded) {
            redirect(`/${username}/${assetId}`);
        }

        return <div>{children}</div>;
    } catch (error) {
        redirect('/');
    }
}

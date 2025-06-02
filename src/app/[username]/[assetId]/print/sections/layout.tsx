import axios from 'axios';
import { redirect } from 'next/navigation';
import { API_BASE_URL } from '@/constants/api';

interface SectionLayoutProps {
    children: React.ReactNode;
    params: {
        username: string;
        assetId: string;
    };
}

const getData = async (assetId: string) => {
    try {
        const assetRaw = await axios.get(`${API_BASE_URL}/assets/store/${assetId}`);
        return assetRaw.data.data;
    } catch (error) {
        return null;
    }
};
const getSetupPrintLicense = async () => {
    try {
        const setupPrintLicenseRaw = await axios.get(`${API_BASE_URL}/setup/print-license`);
        return setupPrintLicenseRaw.data.data;
    } catch (error) {
        return null;
    }
};

export default async function SectionLayout({ children, params }: SectionLayoutProps) {
    const { assetId, username } = params;

    const [asset, setupPrintLicense] = await Promise.all([getData(assetId), getSetupPrintLicense()]);
    if (!asset || !setupPrintLicense) {
        redirect('/');
    }

    const hasPrintAdded = asset?.licenses?.print?.added;
    const isPrintBlocked = setupPrintLicense.isBlocked;

    if (!hasPrintAdded || isPrintBlocked) {
        redirect(`/${username}/${assetId}`);
    }

    return <div>{children}</div>;
}

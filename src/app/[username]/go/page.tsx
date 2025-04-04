import { API_BASE_URL } from '@/constants/api';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

interface TreeLink {
    label: string;
    link: string;
}

interface TreeItemParam {
    title?: string;
    link: TreeLink[];

    params: {
        [key: string]: string;
    };
}
const TreeItem = ({ title, link, params }: TreeItemParam) => {
    return (
        <Box
            sx={{
                border: '1px',
                borderColor: '#ff0066',
                borderStyle: 'dashed',
                padding: 3,
                marginBlock: 2,
            }}
        >
            {title && (
                <Typography variant="h4" mb={2}>
                    {title}
                </Typography>
            )}
            <Box display="flex" flexDirection="column" gap={2}>
                {link.map((item) => (
                    <Link
                        key={item.label}
                        href={item.link.replace(/\{(\w+)\}/g, (_, key) => params![key as keyof typeof params] || '')}
                    >
                        <Box display="flex" alignItems="center" gap={1}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: '#ff0066',
                                    borderRadius: '50%',
                                }}
                            />
                            <Typography variant="h6" mt={1} color="#ffffff">
                                {item.label}
                            </Typography>
                        </Box>
                    </Link>
                ))}
            </Box>
        </Box>
    );
};

interface AssetGoProps {
    params: {
        username: string;
    };
}

export default async function AssetGo({ params }: AssetGoProps) {
    const assetId = params.username;
    const assetRaw = await fetch(`${API_BASE_URL}/assets/store/${assetId}`);
    const asset = await assetRaw.json();

    return (
        <Box
            padding={2}
            sx={{
                overflowY: 'auto',
                height: '100vh',
                paddingBottom: 10,
            }}
        >
            <Box display="flex" justifyContent="center" alignItems="center">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
            </Box>

            <Box display="flex" flexDirection="column" maxWidth={400} margin="auto">
                <TreeItem
                    title="License Artwork"
                    link={[
                        { label: 'Print', link: '/{username}/{assetId}/print/sections' },
                        { label: 'Digital Collectible', link: '/{username}/{assetId}?type=digital' },
                    ]}
                    params={{
                        assetId,
                        username: asset.data.creator.username,
                    }}
                />
                <TreeItem
                    link={[{ label: 'View Artwork', link: '/{username}/{assetId}' }]}
                    params={{
                        assetId,
                        username: asset.data.creator.username,
                    }}
                />

                <TreeItem
                    link={[{ label: 'About Xibit', link: 'https://about.xibit.app' }]}
                    params={{
                        assetId,
                        username: asset.data.creator.username,
                    }}
                />
            </Box>
        </Box>
    );
}

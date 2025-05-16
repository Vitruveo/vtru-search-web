import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Catalog } from './types';
import { CATALOG_ASSETS_BASE_URL, CATALOG_BASE_URL } from '@/constants/api';

interface CardItemProps {
    title: string;
    count: number;
    image: string;
}

const CardItem = ({ title, count, image }: CardItemProps) => {
    return (
        <Box position="relative">
            <Image src={`${CATALOG_ASSETS_BASE_URL}/${image}`} alt="No image" width={300} height={300} />
            <Box
                sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                bgcolor="gray"
                marginTop={-1}
                width={300}
                p={2}
                display="flex"
                justifyContent="space-between"
            >
                <Typography variant="h5" color="#ffffff">
                    {title}
                </Typography>
                <Typography variant="h5" color="#ffffff">
                    {count} {count > 1 ? 'Items' : 'Item'}
                </Typography>
            </Box>
        </Box>
    );
};

interface PrintSectionsProps {
    params: {
        username: string;
        assetId: string;
    };
}

export default async function PrintSections({ params }: PrintSectionsProps) {
    const catalogRequest = await fetch(CATALOG_BASE_URL);
    const catalog: Catalog = await catalogRequest.json();

    const sections = catalog.sections;

    return (
        <Box
            padding={4}
            sx={{
                overflowY: 'auto',
                height: '100vh',
                paddingBottom: 10,

                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <Box display="flex" justifyContent="start">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
            </Box>

            <Typography variant="h1" fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']}>
                Print License
            </Typography>

            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4} width="100%">
                {sections.map((item) => (
                    <Link
                        key={item.sectionId}
                        href={`/${params.username}/${params.assetId}/print/sections/${item.sectionId}/categories`}
                    >
                        <CardItem title={item.title} count={item.categories.length} image={item.images.preview} />
                    </Link>
                ))}
            </Box>
        </Box>
    );
}

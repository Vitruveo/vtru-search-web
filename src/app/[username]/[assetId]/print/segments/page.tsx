import { Badge, Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Catalog } from './types';
import { CATALOG_BASE_URL } from '@/constants/api';

interface CardItemProps {
    title: string;
    count: number;
}

const CardItem = ({ title, count }: CardItemProps) => {
    return (
        <Box mt={4} position="relative">
            <Image
                src="https://vitruveo-studio-production-general.s3.amazonaws.com/noImage.jpg"
                alt="No image"
                width={300}
                height={300}
            />
            <Box bgcolor="gray" marginTop={-1} width="100%" p={2} display="flex" justifyContent="space-between">
                <Typography variant="h4" color="#ffffff">
                    {title}
                </Typography>
                <Typography variant="h4" color="#FF0066">
                    {count}
                </Typography>
            </Box>
        </Box>
    );
};

interface PrintSegmentsProps {
    params: {
        username: string;
        assetId: string;
    };
}

export default async function PrintSegments({ params }: PrintSegmentsProps) {
    const catalogRequest = await fetch(CATALOG_BASE_URL);
    const catalog: Catalog = await catalogRequest.json();

    const segments = catalog.segments;

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

            <Typography variant="h1" mt={2}>
                Print License
            </Typography>

            <Typography mt={4}>
                Transform your brand{"'"}s presence with our integrated Display and Merchandise strategies. We turn
                visual communication into powerful brand experiences that capture attention and drive engagement.
            </Typography>

            <Box mt={4} display="flex" flexDirection="column" alignItems="center">
                {segments.map((item) => (
                    <Link
                        key={item.segmentId}
                        href={`/${params.username}/${params.assetId}/print/segments/${item.segmentId}/categories`}
                    >
                        <CardItem title={item.title} count={item.categories.length} />
                    </Link>
                ))}
            </Box>
        </Box>
    );
}

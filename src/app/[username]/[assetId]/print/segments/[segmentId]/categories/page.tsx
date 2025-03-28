import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Badge, Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Catalog } from '../../types';
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

interface BreadCrumbIParams {
    segment: string;
}

const breadcrumbItems = ({ segment = 'Unknown' }: BreadCrumbIParams) => [
    {
        label: 'Home',
        href: '/{username}/{assetId}/print/segments',
    },
    {
        label: segment,
    },
];

interface PrintCategoriesProps {
    params: {
        username: string;
        assetId: string;
        segmentId: string;
    };
}

export default async function PrintCategories({ params }: PrintCategoriesProps) {
    const catalogRequest = await fetch(CATALOG_BASE_URL);
    const catalog: Catalog = await catalogRequest.json();

    const categories = catalog.categories;

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

            <Breadcrumb
                items={breadcrumbItems({
                    segment: catalog.segments.find((item) => item.segmentId === params.segmentId)!.title,
                })}
                params={params}
            />

            <Typography mt={2}>
                Capture attention and tell your brand{"'"}s story through strategic, innovative display solutions that
                transform how audiences perceive and interact with your message.
            </Typography>

            <Box mt={4} display="flex" flexDirection="column" alignItems="center">
                {categories.map((item) => (
                    <Link
                        key={item.categoryId}
                        href={`/${params.username}/${params.assetId}/print/segments/${params.segmentId}/categories/${item.categoryId}/products`}
                    >
                        <CardItem title={item.title} count={3} />
                    </Link>
                ))}
            </Box>
        </Box>
    );
}

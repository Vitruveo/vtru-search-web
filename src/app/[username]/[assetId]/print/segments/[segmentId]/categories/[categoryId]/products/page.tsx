import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Catalog } from '../../../../types';
import { CATALOG_BASE_URL } from '@/constants/api';

interface CardItemProps {
    title: string;
    price: number;
}

const CardItem = ({ title, price }: CardItemProps) => {
    return (
        <Box mt={4} position="relative">
            <Image
                src="https://vitruveo-studio-production-general.s3.amazonaws.com/noImage.jpg"
                alt="No image"
                width={300}
                height={300}
            />
            <Box bgcolor="gray" marginTop={-1} width="100%" p={2}>
                <Typography variant="h4" color="#ffffff">
                    {title}
                </Typography>
                <Typography variant="h5" color="#FF0066">
                    ${price}
                </Typography>
            </Box>
        </Box>
    );
};

interface BreadCrumbIParams {
    segment: string;
    category: string;
}

const breadcrumbItems = ({ segment = 'Unknown', category = 'Unknown' }: BreadCrumbIParams) => [
    {
        label: 'Home',
        href: '/{username}/{assetId}/print/segments',
    },
    {
        label: segment,
        href: '/{username}/{assetId}/print/segments/{segmentId}/categories',
    },
    {
        label: category,
    },
];

interface PrintProductsProps {
    params: {
        username: string;
        assetId: string;
        segmentId: string;
        categoryId: string;
    };
}

export default async function PrintProducts({ params }: PrintProductsProps) {
    const catalogRequest = await fetch(CATALOG_BASE_URL);
    const catalog: Catalog = await catalogRequest.json();

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

            <Typography variant="h1" mt={2} fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']}>
                Print License
            </Typography>

            <Breadcrumb
                items={breadcrumbItems({
                    segment: catalog.segments.find((item) => item.segmentId === params.segmentId)!.title,
                    category: catalog.categories.find((item) => item.categoryId === params.categoryId)!.title,
                })}
                params={params}
            />

            <Typography
                mt={2}
                fontSize={['1rem', '1.25rem', '1.5rem', '2rem']}
                lineHeight={['1.5rem', '1.75rem', '2rem', '2.5rem']}
            >
                Capture attention and tell your brand{"'"}s story through strategic, innovative display solutions that
                transform how audiences perceive and interact with your message.
            </Typography>

            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent={['center', 'flex-start', 'flex-start']}
                gap={2}
                mt={4}
                width="100%"
            >
                <Link
                    href={`/${params.username}/${params.assetId}/print/segments/${params.segmentId}/categories/${params.categoryId}/products/1`}
                >
                    <CardItem title="Poster 1" price={129.9} />
                </Link>
                <Link
                    href={`/${params.username}/${params.assetId}/print/segments/${params.segmentId}/categories/${params.categoryId}/products/2`}
                >
                    <CardItem title="Poster 2" price={89.9} />
                </Link>
            </Box>
        </Box>
    );
}

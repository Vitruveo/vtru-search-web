import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Catalog, Products } from './types';
import { API_BASE_URL, CATALOG_ASSETS_BASE_URL, CATALOG_BASE_URL } from '@/constants/api';

interface CardItemProps {
    title: string;
    count: number;
    image: string;
}

const CardItem = ({ title, count, image }: CardItemProps) => {
    return (
        <Box position="relative">
            <Image src={`${CATALOG_ASSETS_BASE_URL}/${image}`} alt="No image" width={300} height={300} priority />
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
                    ({count})
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

const definitions: Record<string, keyof Products> = {
    portrait: 'vertical',
    landscape: 'horizontal',
    square: 'square',
};

export default async function PrintSections({ params }: PrintSectionsProps) {
    const catalogRequest = await fetch(CATALOG_BASE_URL);
    const catalog: Catalog = await catalogRequest.json();

    const assetRaw = await fetch(`${API_BASE_URL}/assets/store/${params.assetId}`);
    const asset = await assetRaw.json();
    const definition = definitions[asset?.data?.formats?.original?.definition] || 'vertical';

    const sections = catalog.sections;
    const products = catalog.products[definition] || [];

    const productsBySection = sections.reduce((acc: Record<string, any>, section) => {
        acc[section.sectionId] = section.categories.reduce((catAcc: Record<string, any>, category) => {
            catAcc[category] = {
                count: products.reduce((prodAcc, prod) => {
                    if (prod.categoryId === category) prodAcc++;
                    else prodAcc = 0;
                    return prodAcc;
                }, 0),
            };
            catAcc['countAll'] = Object.values(catAcc).reduce((sum, value) => sum + (value.count || 0), 0);
            return catAcc;
        }, {});
        return acc;
    }, {});

    return (
        <Box
            padding={4}
            sx={{
                overflowY: 'auto',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <Box display="flex" justifyContent="start">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
            </Box>

            <Typography variant="h4" fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']}>
                Print License
            </Typography>

            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4} width="100%">
                {sections.map((item) => {
                    return (
                        productsBySection[item.sectionId].countAll > 0 && (
                            <Link
                                key={item.sectionId}
                                href={`/${params.username}/${params.assetId}/print/sections/${item.sectionId}/categories`}
                            >
                                <CardItem
                                    title={item.title}
                                    count={productsBySection[item.sectionId].countAll}
                                    image={item.images.preview}
                                />
                            </Link>
                        )
                    );
                })}
            </Box>
        </Box>
    );
}

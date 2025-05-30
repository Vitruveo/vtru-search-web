import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Catalog, Products } from './types';
import {
    API_BASE_URL,
    CATALOG_ASSETS_BASE_URL,
    CATALOG_BASE_URL,
    SEARCH_BASE_URL,
    STUDIO_BASE_URL,
} from '@/constants/api';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import { IconLink } from '@tabler/icons-react';

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

const mainColor = '#ff0066';

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

            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={16} width="100%">
                <Box display={'flex'} flexDirection={'column'} gap={4} alignItems={'center'}>
                    <Typography variant="h1" color={mainColor} fontWeight={700}>
                        SOUL Print License
                    </Typography>
                    <Image
                        src={`${ASSET_STORAGE_URL}/${asset.data.formats.preview.path}`}
                        height={230}
                        width={230}
                        alt={`asset ${asset.data.assetMetadata.context.formData.title}`}
                    />
                    <Link href={`${SEARCH_BASE_URL}/${asset.data.creator.username}/${asset.data._id}`}>
                        <Box display={'flex'} alignItems="center" gap={1}>
                            <IconLink color={mainColor} size={20} />
                            <Typography variant="h6" color={mainColor}>
                                View Artwork
                            </Typography>
                        </Box>
                    </Link>
                </Box>

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
            <Box sx={{ flexGrow: 1 }} />
            <footer>
                <Box display={'flex'} justifyContent={'center'} gap={2} bottom={0} left={0} width={'100%'}>
                    <Link href={'https://about.xibit.app'}>
                        <Box display={'flex'} alignItems="center" gap={1}>
                            <Image
                                src={'/images/icons/xibit-icon-redondo-litemode.png'}
                                alt="logo"
                                height={22}
                                width={22}
                            />
                            <Typography variant="subtitle1" color={mainColor}>
                                About Xibit
                            </Typography>
                        </Box>
                    </Link>
                    <Link href={`${STUDIO_BASE_URL}/home`}>
                        <Box display={'flex'} alignItems="center" gap={1}>
                            <IconLink color={mainColor} size={20} />
                            <Typography variant="subtitle1" color={mainColor}>
                                Xibit Studio
                            </Typography>
                        </Box>
                    </Link>
                </Box>
            </footer>
        </Box>
    );
}

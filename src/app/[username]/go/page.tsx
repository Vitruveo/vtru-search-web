import Image from 'next/image';
import { API_BASE_URL, CATALOG_BASE_URL, PRODUCTS_BASE_URL, SEARCH_BASE_URL, STUDIO_BASE_URL } from '@/constants/api';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import { Catalog, ProductItem, Products } from '../[assetId]/print/sections/types';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { IconLink } from '@tabler/icons-react';

interface Option {
    value: string;
    label: string;
}

interface SectionProps {
    title: Option;
    categories: { category: Option; quantity: number }[];
}

interface TreeItemParam {
    sections: SectionProps[];
    assetId: string;
    username: string;
}

interface AssetGoProps {
    params: {
        username: string;
    };
}

export default async function AssetGo({ params }: AssetGoProps) {
    const mainColor = '#ff0066';
    const assetId = params.username;

    const catalogRaw = await fetch(CATALOG_BASE_URL);
    const catalog: Catalog = await catalogRaw.json();

    const productsRaw = await fetch(PRODUCTS_BASE_URL);
    const products: Products = await productsRaw.json();

    const assetRaw = await fetch(`${API_BASE_URL}/assets/store/${assetId}`);
    const asset = (await assetRaw.json()).data;

    const getSectionWithCategory = (): SectionProps[] => {
        return catalog.sections.map((section) => {
            const categories = section.categories.map((category) => {
                const matchedCategory = catalog.categories.find((cat) => cat.categoryId === category);
                return {
                    category: {
                        label: matchedCategory?.title || '',
                        value: matchedCategory?.categoryId || '',
                    },
                    quantity: Object.values(products).reduce((acc, cur) => {
                        return acc + cur.filter((product: ProductItem) => product.categoryId === category).length;
                    }, 0),
                };
            });
            return {
                title: {
                    value: section.sectionId,
                    label: section.title,
                },
                categories: categories,
            };
        });
    };

    return (
        <div
            style={{
                display: 'grid',
                height: '100vh',
                gridTemplateAreas: `'header' 'main' 'footer'`,
                gridTemplateRows: '100px auto 40px',
                padding: '20px',
                overflowY: 'auto',
            }}
        >
            <header style={{ gridArea: 'header' }}>
                <Box display="flex" justifyContent="center">
                    <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
                </Box>
            </header>

            <main style={{ gridArea: 'main' }}>
                <Box width={'100%'}>
                    <Box display={'flex'} gap={4} justifyContent="center" alignItems={'center'} flexWrap="wrap">
                        <Box display={'flex'} flexDirection={'column'} gap={4} alignItems={'center'}>
                            <Typography variant="h1" color={mainColor} fontWeight={700}>
                                SOUL Print License
                            </Typography>
                            <Image
                                src={`${ASSET_STORAGE_URL}/${asset.formats.preview.path}`}
                                height={250}
                                width={250}
                                alt={`asset ${asset.assetMetadata.context.formData.title}`}
                            />
                            <Link href={`${SEARCH_BASE_URL}/${asset.creator.username}/${assetId}`}>
                                <Box display={'flex'} alignItems="center" gap={1}>
                                    <IconLink color={mainColor} size={20} />
                                    <Typography variant="h6" color={mainColor}>
                                        View Artwork
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                        <Box maxWidth={700} width="100%" marginTop={3}>
                            <TreeItem
                                sections={getSectionWithCategory()}
                                assetId={assetId}
                                username={asset.creator.username}
                            />
                        </Box>
                    </Box>
                </Box>
            </main>

            <footer style={{ gridArea: 'footer' }}>
                <Box display={'flex'} justifyContent={'center'} gap={2} padding={2} bottom={0} left={0} width={'100%'}>
                    <Link href={'https://about.xibit.app'}>
                        <Box display={'flex'} alignItems="center" gap={1}>
                            <Image
                                src={'/images/icons/xibit-icon-redondo-litemode.png'}
                                alt="logo"
                                height={22}
                                width={22}
                            />
                            <Typography variant="body1" color={mainColor}>
                                About Xibit
                            </Typography>
                        </Box>
                    </Link>
                    <Link href={`${STUDIO_BASE_URL}/home`}>
                        <Box display={'flex'} alignItems="center" gap={1}>
                            <IconLink color={mainColor} size={20} />
                            <Typography variant="body1" color={mainColor}>
                                Xibit Studio
                            </Typography>
                        </Box>
                    </Link>
                </Box>
            </footer>
        </div>
    );
}

const TreeItem = ({ username, assetId, sections }: TreeItemParam) => {
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            gap={3}
            bgcolor="rgba(0,0,0,0.6)"
            p={3}
            maxHeight="calc(100vh - 240px)"
            overflow="auto"
        >
            {sections.map((section) => (
                <Box key={section.title.value} display="flex" flexDirection="column" gap={2} marginBottom={2}>
                    <Typography variant="h4" color="white" fontWeight={700}>
                        {section.title.label}
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={3}>
                        {section.categories.map((item) => (
                            <Link
                                key={item.category.value}
                                href={`${SEARCH_BASE_URL}/${username}/${assetId}/print/sections/${section.title.value}/categories/${item.category.value}/products`}
                                style={{ color: 'white' }}
                            >
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="h6" sx={{ textIndent: 25, textDecoration: 'underline' }}>
                                        {item.category.label}
                                    </Typography>
                                    <Typography variant="h6">( {item.quantity} )</Typography>
                                </Box>
                            </Link>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

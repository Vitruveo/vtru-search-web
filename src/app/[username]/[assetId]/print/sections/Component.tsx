'use client';
import { CATALOG_ASSETS_BASE_URL, STUDIO_BASE_URL } from '@/constants/api';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { IconLink } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { Sections } from './types';

const mainColor = '#ffffff';

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

interface Props {
    data: {
        assetId: string;
        assetTitle: string;
        assetPreviewPath: string;
        username: string;
        sections: Sections[];
        productsBySection: Record<string, any>;
    };
}

export const PrintSectionComponent = ({ data }: Props) => {
    const { assetId, assetTitle, assetPreviewPath, username, sections, productsBySection } = data;
    const isMobile = useMediaQuery('(max-width: 900px)');

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

            <Typography variant="h4" fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']} lineHeight={1}>
                Print License
            </Typography>

            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent={isMobile ? 'center' : 'start'}
                gap={isMobile ? 4 : 16}
                marginInline={isMobile ? 0 : 15}
            >
                <Box display={'flex'} flexDirection={'column'} gap={4} alignItems={'center'}>
                    <Image
                        src={`${ASSET_STORAGE_URL}/${assetPreviewPath}`}
                        height={isMobile ? 310 : 450}
                        width={isMobile ? 310 : 450}
                        alt={`asset ${assetTitle}`}
                    />
                </Box>

                {sections.map((item) => {
                    return (
                        productsBySection[item.sectionId].countAll > 0 && (
                            <Link
                                key={item.sectionId}
                                href={`/${username}/${assetId}/print/sections/${item.sectionId}/categories`}
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
};

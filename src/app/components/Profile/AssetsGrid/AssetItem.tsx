import React, { useState } from 'react';
import { ShowAnimation } from '@/animations';
import { Asset } from '@/features/assets/types';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import BlankCard from '../../Shared/BlankCard';
import { MediaRenderer } from '../../Assets/components/MediaRenderer';
import { useTheme } from '@mui/material/styles';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import '../../Assets/assetsGrid/AssetScroll.css';
import { NODE_ENV } from '@/constants/api';
import { NO_IMAGE_ASSET } from '@/constants/asset';
import { useSelector } from '@/store/hooks';

interface Props {
    asset: Asset;
    username: string;
}

const AssetItemMain = ({ asset, username }: Props) => {
    const theme = useTheme();
    const searchUrl = useSelector((state) => state.redirects.data[NODE_ENV].xibit.search_url);

    const handleClick = () => {
        window.open(`${searchUrl}/${username}/${asset._id}`, '_blank');
    };

    return (
        <Box width={280} onClick={handleClick} sx={{ '&:hover': { cursor: 'pointer' } }}>
            <BlankCard className="hoverCard">
                <>
                    <Box height={280} borderRadius="8px 8px 0 0" position="relative">
                        <MediaRenderer
                            src={`${ASSET_STORAGE_URL}/${asset.formats.preview.path}`}
                            fallbackSrc={NO_IMAGE_ASSET}
                        />
                    </Box>
                    <CardContent sx={{ p: 3, pt: 2 }} style={{ backgroundColor: theme.palette.grey[100] }}>
                        <Typography
                            title={asset.assetMetadata?.context.formData.title}
                            variant="h6"
                            sx={{ cursor: 'pointer' }}
                            width="100%"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                        >
                            {asset.assetMetadata?.context.formData.title}
                        </Typography>
                    </CardContent>
                </>
            </BlankCard>
        </Box>
    );
};

export const AssetCardContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Grid
            item
            xl={3}
            lg={4}
            md={4}
            sm={6}
            xs={12}
            display="flex"
            alignItems="stretch"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ShowAnimation>{children}</ShowAnimation>
        </Grid>
    );
};

export const AssetItem = React.memo(AssetItemMain);

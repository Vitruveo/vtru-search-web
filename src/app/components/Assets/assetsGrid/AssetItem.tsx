import { ShowAnimation } from '@/animations';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import { Asset } from '@/features/assets/types';
import { useSelector } from '@/store/hooks';
import { Badge, Box, CardContent, Checkbox, Grid, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useMemo, useState } from 'react';
import BlankCard from '../../Shared/BlankCard';
import Username from '../../Username';
import DeckEffect from '../components/DeckEffect';
import { MediaRenderer } from '../components/MediaRenderer';

interface Props {
    assetView: Asset;
    asset: Asset;
    isCurated: boolean;
    checkedCurate: boolean;
    handleChangeCurate(): void;
    handleClickImage(): void;
    isAvailable?: boolean;
    price?: string;
    variant?: 'active' | 'blocked';
    countByCreator?: number;
}

const AssetItemMain = ({
    assetView,
    asset,
    isCurated,
    checkedCurate,
    handleChangeCurate,
    handleClickImage,
    isAvailable = true,
    price,
    variant = 'active',
    countByCreator = undefined,
}: Props) => {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [showFanEffect, setShowFanEffect] = useState(false);
    const optionIncludeGroup = useSelector((state) => state.assets.groupByCreator.active);
    const isHiddenCardDetail = useSelector((state) => state.customizer.hidden?.cardDetail);

    const hasIncludesGroup = optionIncludeGroup === 'all' || optionIncludeGroup === 'noSales';

    const assetTitle = asset?.assetMetadata?.context?.formData?.title || 'No Title';

    const hasCreator = asset?.creator?.username;
    const creatorName = hasCreator || 'No creator';

    const media = useMemo(() => {
        return `${ASSET_STORAGE_URL}/${asset?.formats?.preview?.path}`;
    }, [asset?.formats?.preview?.path]);

    return (
        <div
            style={{
                border: assetView === asset ? '1px solid #FF0066' : '',
                width: 250,
                margin: '0 auto',
                cursor: 'pointer',
                height: isHiddenCardDetail ? 250 : 380,
                position: 'relative',
                borderRadius: '15px',
            }}
            onMouseEnter={() => {
                setIsHovered(true);
                // if (asset?.countByCreator && asset?.countByCreator > 1)
                //     hoverTimeoutRef.current = setTimeout(() => setShowFanEffect(true), 500);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                // if (hoverTimeoutRef.current) {
                //     clearTimeout(hoverTimeoutRef.current);
                //     hoverTimeoutRef.current = null;
                // }
                setShowFanEffect(false);
            }}
            onClick={() => {
                if (isCurated && !hasIncludesGroup) handleChangeCurate();
                else handleClickImage();
            }}
        >
            {hasIncludesGroup && (
                <>
                    <Badge
                        badgeContent={countByCreator}
                        max={99}
                        color="primary"
                        sx={{
                            position: 'absolute',
                            right: -10,
                            top: 18,
                            '& .MuiBadge-badge': {
                                transform: 'scale(1.5)',
                                fontSize: '0.8rem',
                            },
                        }}
                        onClick={handleClickImage}
                    />
                    <DeckEffect
                        isHovered={isHovered}
                        showFanEffect={showFanEffect}
                        count={asset?.countByCreator || 0}
                        paths={asset?.paths || []}
                        handleClickImage={handleClickImage}
                    />
                </>
            )}
            <BlankCard className="hoverCard" onClick={handleClickImage}>
                {!isHiddenCardDetail ? (
                    <>
                        <Box height={250} borderRadius="8px 8px 0 0" position="relative">
                            <MediaRenderer src={media} fallbackSrc={'https://via.placeholder.com/250'} />
                        </Box>

                        <CardContent sx={{ p: 3, pt: 2 }} style={{ backgroundColor: theme.palette.grey[100] }}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography
                                    title={assetTitle}
                                    variant="h6"
                                    sx={{ cursor: 'pointer' }}
                                    width="100%"
                                    whiteSpace="nowrap"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                >
                                    {assetTitle}
                                </Typography>
                                {isCurated && !hasIncludesGroup && (
                                    <Checkbox style={{ padding: 0 }} checked={checkedCurate} />
                                )}
                            </Stack>

                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                                <Username
                                    username={creatorName}
                                    vaultAdress={asset?.vault?.vaultAddress}
                                    size="small"
                                />
                            </Stack>

                            <Stack flexDirection="row" justifyContent="space-between" alignItems="end">
                                <Box>
                                    {!isAvailable && (
                                        <Typography
                                            variant="h6"
                                            overflow="hidden"
                                            whiteSpace="nowrap"
                                            textOverflow="ellipsis"
                                        >
                                            Last Sold
                                        </Typography>
                                    )}
                                    <Typography
                                        variant="h6"
                                        overflow="hidden"
                                        whiteSpace="nowrap"
                                        textOverflow="ellipsis"
                                    >
                                        {price}
                                    </Typography>
                                </Box>
                                <Typography
                                    title={price}
                                    variant="h6"
                                    overflow="hidden"
                                    whiteSpace="nowrap"
                                    textOverflow="ellipsis"
                                    color="red"
                                >
                                    {variant == 'blocked' ? 'Blocked' : ''}
                                </Typography>
                                {!isAvailable && (
                                    <Paper
                                        sx={{
                                            backgroundColor: 'red',
                                            borderRadius: '100%',
                                            height: 40,
                                            width: 40,
                                        }}
                                    />
                                )}
                            </Stack>
                        </CardContent>
                    </>
                ) : (
                    <MediaRenderer src={media} fallbackSrc={'https://via.placeholder.com/250'} />
                )}
            </BlankCard>
        </div>
    );
};

export const AssetCardContainer = ({ children }: { children: React.ReactNode }) => (
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

export const AssetItem = React.memo(AssetItemMain);

import { Badge, Box, CardContent, Checkbox, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BlankCard from '../../Shared/BlankCard';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { Asset } from '@/features/assets/types';
import { MediaRenderer } from '../components/MediaRenderer';
import { useDispatch, useSelector } from '@/store/hooks';
import { actions } from '@/features/filters/slice';
import { ShowAnimation } from '@/animations';
import DeckEffect from '../components/DeckEffect';
import { useRef, useState } from 'react';

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

const AssetItem = ({
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
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const [showFanEffect, setShowFanEffect] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hasIncludesGroup = useSelector((state) => state.assets.groupByCreator);

    const hasCreator =
        asset?.assetMetadata?.creators?.formData instanceof Array &&
        asset?.assetMetadata?.creators?.formData?.length > 0;

    const assetTitle = asset?.assetMetadata?.context?.formData?.title || 'No Title';

    const creatorName = hasCreator ? asset!.assetMetadata!.creators!.formData![0]!.name : 'No creator';

    const onCreatorNameClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.stopPropagation();
        if (hasCreator) {
            dispatch(
                actions.changeName({
                    name: asset!.assetMetadata!.creators!.formData![0].name,
                })
            );
        }
    };

    return (
        <div
            style={{
                border: assetView === asset ? '1px solid #00d6f4' : '',
                width: 250,
                cursor: 'pointer',
                height: 380,
                marginRight: '32px',
                position: 'relative',
                borderRadius: '15px',
            }}
            onMouseEnter={() => {
                setIsHovered(true);
                if (asset?.countByCreator && asset?.countByCreator > 1)
                    hoverTimeoutRef.current = setTimeout(() => setShowFanEffect(true), 500);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                    hoverTimeoutRef.current = null;
                }
                setShowFanEffect(false);
            }}
            onClick={() => {
                if (isCurated) handleChangeCurate();
                else handleClickImage();
            }}
        >
            {hasIncludesGroup && (
                <>
                    <Badge
                        badgeContent={countByCreator}
                        color="primary"
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}
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
            <BlankCard className="hoverCard">
                <Box width={250} height={250} onClick={handleClickImage} borderRadius="8px 8px 0 0" position="relative">
                    <MediaRenderer
                        src={`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`}
                        fallbackSrc={'https://via.placeholder.com/250'}
                    />
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
                        {isCurated && <Checkbox style={{ padding: 0 }} checked={checkedCurate} />}
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                        <Link
                            title={creatorName}
                            padding={0}
                            overflow="hidden"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                            href="#"
                            onClick={onCreatorNameClick}
                        >
                            {creatorName}
                        </Link>
                    </Stack>

                    <Stack flexDirection="row" justifyContent="space-between" alignItems="end">
                        <Box>
                            {!isAvailable && (
                                <Typography variant="h6" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                                    Last Sold
                                </Typography>
                            )}
                            <Typography variant="h6" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
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

export default AssetItem;

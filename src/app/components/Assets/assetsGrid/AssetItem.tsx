import { Box, CardContent, Checkbox, Grid, Link, Stack, Typography } from '@mui/material';
import BlankCard from '../../Shared/BlankCard';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { Asset } from '@/features/assets/types';
import { MediaRenderer } from '../components/MediaRenderer';
import { useDispatch } from '@/store/hooks';
import { actions } from '@/features/filters/slice';
import { ShowAnimation } from '@/animations';

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
}: Props) => {
    const dispatch = useDispatch();

    const hasCreator =
        asset?.assetMetadata?.creators?.formData instanceof Array &&
        asset?.assetMetadata?.creators?.formData?.length > 0;

    const assetTitle = asset?.assetMetadata?.context?.formData?.title || 'No Title';

    const creatorName = hasCreator ? asset!.assetMetadata!.creators!.formData![0]!.name : 'No creator';

    const onCreatorNameClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.stopPropagation();
        if (hasCreator) {
            dispatch(
                actions.change({
                    key: 'creators',
                    value: {
                        name: [asset!.assetMetadata!.creators!.formData![0].name],
                    },
                })
            );
        }
    };

    return (
        <Box
            sx={{
                border: assetView === asset ? '1px solid #00d6f4' : '',
                maxWidth: 250,
                cursor: 'pointer',
            }}
            style={{
                filter: isAvailable ? 'none' : 'grayscale(1)',
            }}
            onClick={() => {
                if (isCurated) handleChangeCurate();
                else handleClickImage();
            }}
        >
            <BlankCard className="hoverCard">
                <Box width={250} height={250} onClick={handleClickImage} borderRadius="8px 8px 0 0" position="relative">
                    {!isAvailable && (
                        <Box position="absolute" pl={4} pt={2} maxWidth="50%">
                            <Typography fontWeight={900} fontSize={16} color="white">
                                NOT AVAILABLE
                            </Typography>
                        </Box>
                    )}
                    <MediaRenderer
                        src={`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`}
                        fallbackSrc={'https://via.placeholder.com/250'}
                    />
                </Box>

                <CardContent
                    color="white"
                    sx={{ p: 3, pt: 2 }}
                    style={{ backgroundColor: isAvailable ? 'white' : '#e2e2e2' }}
                >
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
                            width="100%"
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
                        <Typography
                            title={price}
                            variant="h6"
                            maxWidth="60%"
                            overflow="hidden"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                        >
                            {isAvailable ? price : ''}
                        </Typography>
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
                    </Stack>
                </CardContent>
            </BlankCard>
        </Box>
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

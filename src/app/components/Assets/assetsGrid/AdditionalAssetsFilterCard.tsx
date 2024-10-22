import { actions as filterActions } from '@/features/filters/slice';
import { Stack, Typography, Box, Button } from '@mui/material';
import BlankCard from '../../Shared/BlankCard';
import { useDispatch, useSelector } from '@/store/hooks';
import { actions as assetActions } from '@/features/assets';
import generateQueryParam from '@/utils/generateQueryParam';

export const AdditionalAssetsFilterCard = () => {
    const dispatch = useDispatch();

    const showAdditionalAssets = useSelector((state) => state.filters.showAdditionalAssets.value);
    const currentPage = useSelector((state) => state.assets.data.page);
    const optionIncludeGroup = useSelector((state) => state.assets.groupByCreator.active);

    const hasIncludesGroup = optionIncludeGroup === 'all' || optionIncludeGroup === 'noSales';

    const onShowAdditionalAssetsClick = () => {
        if (!showAdditionalAssets) {
            dispatch(filterActions.changeShowAdditionalAssets(true));
        } else {
            dispatch(filterActions.changeShowAdditionalAssets(false));
        }
        generateQueryParam('showAdditionalAssets', showAdditionalAssets ? 'no' : 'yes');
        dispatch(assetActions.loadAssets({ page: currentPage }));
    };

    return (
        <Box height="100%" minHeight={380} mt={hasIncludesGroup ? 2 : 0}>
            <BlankCard className="hoverCard">
                <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <Box width={250} borderRadius="8px 8px 0 0" position="relative" sx={{ p: 3, pt: 2 }}>
                        <Typography variant="h6">
                            Show additional assets including those that may be of low quality or offensive content.
                        </Typography>
                    </Box>

                    <Stack direction="row" alignItems="center" justifyContent="flex-end" padding={3}>
                        <Button onClick={onShowAdditionalAssetsClick} variant="outlined">
                            {showAdditionalAssets ? 'Hide' : 'Show'}
                        </Button>
                    </Stack>
                </Box>
            </BlankCard>
        </Box>
    );
};

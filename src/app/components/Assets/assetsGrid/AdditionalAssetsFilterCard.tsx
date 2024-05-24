import { actions as filterActions } from '@/features/filters/slice';
import { Stack, Typography, Box, CardContent, Button } from '@mui/material';
import BlankCard from '../../Shared/BlankCard';
import { useDispatch, useSelector } from '@/store/hooks';
import { actions as assetActions } from '@/features/assets';

export const AdditionalAssetsFilterCard = () => {
    const dispatch = useDispatch();

    const showAdditionalAssets = useSelector((state) => state.filters.showAdditionalAssets.value);
    const currentPage = useSelector((state) => state.assets.data.page);
    const lastPageBeforeClick = useSelector((state) => state.filters.showAdditionalAssets.lastPage);

    const onShowAdditionalAssetsClick = () => {
        if (!showAdditionalAssets) {
            dispatch(filterActions.changeAdditionalAssetsLastPage(currentPage));
            dispatch(filterActions.changeShowAdditionalAssets(true));
            dispatch(assetActions.loadAssets({ page: currentPage }));
            return;
        }
        dispatch(filterActions.changeShowAdditionalAssets(false));
        dispatch(assetActions.loadAssets({ page: lastPageBeforeClick }));
    };

    return (
        <Box height="100%" maxWidth={250}>
            <BlankCard className="hoverCard">
                <Box width={250} height={250} borderRadius="8px 8px 0 0" position="relative" sx={{ p: 3, pt: 2 }}>
                    <Typography variant="h6">
                        Show additional assets including those that may be of low quality or offensive content.
                    </Typography>
                </Box>

                <CardContent color="white" sx={{ p: 3, pt: 3, height: '100%' }}>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                        <Button onClick={onShowAdditionalAssetsClick} variant="outlined">
                            {showAdditionalAssets ? 'Hide' : 'Show'}
                        </Button>
                    </Stack>
                </CardContent>
            </BlankCard>
        </Box>
    );
};

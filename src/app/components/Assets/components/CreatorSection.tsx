import { Box, Typography } from '@mui/material';
import Username from '../../Username';
import { useI18n } from '@/app/hooks/useI18n';
import { useSelector } from '@/store/hooks';

interface Props {
    hasCurated: string | null;
    creatorId: string | null;
    returnToPageOne: () => void;
}

const CreatorSection = ({ hasCurated, creatorId, returnToPageOne }: Props) => {
    const { language } = useI18n();

    const { data: assets } = useSelector((state) => state.assets.data);
    const hasIncludesGroup = useSelector((state) => state.assets.groupByCreator);
    const tabNavigation = useSelector((state) => state.filters.tabNavigation);
    const hasIncludesGroupActive = hasIncludesGroup.active === 'all' || hasIncludesGroup.active === 'noSales';
    const gridTitle = useSelector((state) => state.filters.grid.title);
    const videoTitle = useSelector((state) => state.filters.video.title);
    const slideshowTitle = useSelector((state) => state.filters.slideshow.title);

    return (
        <Box display="flex" alignItems={'center'} gap={1} width="100%">
            {hasCurated ||
            !hasIncludesGroupActive ||
            tabNavigation.assets?.length > 0 ||
            tabNavigation.artists?.length > 0 ? (
                <Box display="flex" alignItems="flex-end" gap={2} paddingBlock={2}>
                    {(hasCurated || tabNavigation.assets?.length > 0 || tabNavigation.artists?.length > 0) && (
                        <Username
                            username={
                                gridTitle || videoTitle || slideshowTitle || tabNavigation.title || 'Curated arts'
                            }
                            vaultAdress={null}
                            size="large"
                        />
                    )}
                    {hasIncludesGroup.name && (
                        <Username
                            username={assets[0]?.creator.username}
                            vaultAdress={assets[0]?.vault?.vaultAddress}
                            size="large"
                        />
                    )}
                    {(hasCurated ||
                        hasIncludesGroup.name ||
                        creatorId ||
                        tabNavigation.assets?.length > 0 ||
                        tabNavigation.artists?.length > 0) && (
                        <button
                            style={{
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                width: '100%',
                            }}
                            onClick={returnToPageOne}
                        >
                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                }}
                            >
                                {language['search.assetList.resetsearch'] as string}
                            </Typography>
                        </button>
                    )}
                </Box>
            ) : (
                <Box />
            )}
        </Box>
    );
};

export default CreatorSection;

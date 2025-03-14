import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Theme, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import RecentlySoldSlider from './RecentlySold';
import SpotlightSlider from './Spotlight';
import { useDispatch, useSelector } from '@/store/hooks';
import { changeActiveSlider } from '@/features/customizer/slice';
import { actions } from '@/features/assets/slice';
import { IconEye } from '@tabler/icons-react';
import ArtistsSpotlight from './ArtistsSpotlight';
import { useI18n } from '@/app/hooks/useI18n';

const spotlightMinLength = 5;

export default function TabSliders() {
    const { language } = useI18n();
    const dispatch = useDispatch();
    const activeSlider = useSelector((state) => state.customizer.activeSlider);
    const isFilterHidden = useSelector((state) => state.customizer.hidden?.filter);
    const isSidebarOpen = useSelector((state) => state.layout.isSidebarOpen);
    const hidden = useSelector((state) => state.customizer.hidden);
    const lgUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('lg'));

    const { spotlight, spotlightLoading, lastSold, lastSoldLoading, artistSpotlight, artistSpotlightLoading } =
        useSelector((state) => state.assets);

    const showSpotlight = spotlight.length >= spotlightMinLength && !hidden?.spotlight;
    const showArtistSpotlight = artistSpotlight.length >= spotlightMinLength && !hidden?.artistSpotlight;
    const showLastSold = lastSold.length >= spotlightMinLength && !hidden?.recentlySold;

    const [tabValue, setTabValue] = useState(activeSlider);

    useEffect(() => {
        const isLoading = spotlightLoading || lastSoldLoading || artistSpotlightLoading;
        if (isLoading) return;

        if (!showSpotlight && !showArtistSpotlight && !showLastSold) return;

        const activeIsHidden =
            (activeSlider === '1' && !showSpotlight) ||
            (activeSlider === '2' && !showArtistSpotlight) ||
            (activeSlider === '3' && !showLastSold);

        if (activeIsHidden) {
            const newTabValue = showSpotlight ? '1' : showArtistSpotlight ? '2' : '3';

            if (newTabValue !== tabValue) {
                setTabValue(newTabValue);
                dispatch(changeActiveSlider(newTabValue));
            }
        }
    }, [
        activeSlider,
        showSpotlight,
        showArtistSpotlight,
        showLastSold,
        spotlightLoading,
        lastSoldLoading,
        artistSpotlightLoading,
    ]);

    if (!showSpotlight && !showArtistSpotlight && !showLastSold) return null;

    return (
        <Box
            sx={{ width: lgUp && !isFilterHidden && isSidebarOpen ? 'calc(100vw - 350px)' : 'calc(100vw - 40px)' }}
            minHeight={500}
        >
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={(_e, value) => {
                            setTabValue(value);
                            dispatch(changeActiveSlider(value));
                        }}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {showSpotlight && (
                            <Tab
                                label={<Label label={language['search.tabSliders.artworkSpotlight'] as string} />}
                                value="1"
                            />
                        )}
                        {showArtistSpotlight && (
                            <Tab
                                label={<Label label={language['search.tabSliders.artistSpotlight'] as string} />}
                                value="2"
                            />
                        )}
                        {showLastSold && (
                            <Tab
                                label={<Label label={language['search.tabSliders.recentlySold'] as string} />}
                                value="3"
                            />
                        )}
                    </TabList>
                </Box>
                {showSpotlight && (
                    <TabPanel value="1">
                        <SpotlightSlider />
                    </TabPanel>
                )}
                {showArtistSpotlight && (
                    <TabPanel value="2">
                        <ArtistsSpotlight />
                    </TabPanel>
                )}
                {showLastSold && (
                    <TabPanel value="3">
                        <RecentlySoldSlider />
                    </TabPanel>
                )}
            </TabContext>
        </Box>
    );
}

interface LabelProps {
    label: string;
}

function Label({ label }: LabelProps) {
    const dispatch = useDispatch();
    const handleView = () => dispatch(actions.setTabNavigation(label));

    return (
        <Box display={'flex'} gap={1.5} alignItems={'center'}>
            <Typography variant="h6">{label}</Typography>
            <IconEye size={20} onClick={handleView} />
        </Box>
    );
}

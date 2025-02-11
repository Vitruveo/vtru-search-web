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

    const spotlight = useSelector((state) => state.assets.spotlight);
    const lastSold = useSelector((state) => state.assets.lastSold);
    const artistSpotlight = useSelector((state) => state.assets.artistSpotlight);

    const checkSpotlight = spotlight.length >= spotlightMinLength;
    const checkArtistSpotlight = artistSpotlight.length >= spotlightMinLength;
    const checkLastSold = lastSold.length >= spotlightMinLength;

    const [tabValue, setTabValue] = useState(activeSlider);

    useEffect(() => {
        if (
            (hidden?.spotlight && hidden?.recentlySold && hidden?.artistSpotlight) ||
            (!checkSpotlight && !checkArtistSpotlight && !checkLastSold)
        )
            return;
        if (
            ((hidden?.spotlight || !checkSpotlight) && activeSlider === '1') ||
            ((hidden?.artistSpotlight || !checkArtistSpotlight) && activeSlider === '2') ||
            ((hidden?.recentlySold || !checkLastSold) && activeSlider === '3')
        ) {
            if (!hidden?.spotlight && checkSpotlight) {
                setTabValue('1');
                dispatch(changeActiveSlider('1'));
            } else if (!hidden?.artistSpotlight && checkArtistSpotlight) {
                setTabValue('2');
                dispatch(changeActiveSlider('2'));
            } else if (!hidden?.recentlySold && checkLastSold) {
                setTabValue('3');
                dispatch(changeActiveSlider('3'));
            }
        }
    }, [activeSlider, hidden?.recentlySold, hidden?.spotlight, hidden?.artistSpotlight]);

    if (
        (hidden?.spotlight && hidden?.recentlySold && hidden?.artistSpotlight) ||
        (!checkSpotlight && !checkArtistSpotlight && !checkLastSold)
    )
        return null;
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
                        {!hidden?.spotlight && checkSpotlight && (
                            <Tab
                                label={<Label label={language['search.tabSliders.artworkSpotlight'] as string} />}
                                value="1"
                            />
                        )}
                        {!hidden?.artistSpotlight && checkArtistSpotlight && (
                            <Tab
                                label={<Label label={language['search.tabSliders.artistSpotlight'] as string} />}
                                value="2"
                            />
                        )}
                        {!hidden?.recentlySold && checkLastSold && (
                            <Tab
                                label={<Label label={language['search.tabSliders.recentlySold'] as string} />}
                                value="3"
                            />
                        )}
                    </TabList>
                </Box>
                {!hidden?.spotlight && checkSpotlight && (
                    <TabPanel value="1">
                        <SpotlightSlider />
                    </TabPanel>
                )}
                {!hidden?.artistSpotlight && checkArtistSpotlight && (
                    <TabPanel value="2">
                        <ArtistsSpotlight />
                    </TabPanel>
                )}
                {!hidden?.recentlySold && checkLastSold && (
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

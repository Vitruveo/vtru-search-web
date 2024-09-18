import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import RecentlySoldSlider from './RecentlySold';
import SpotlightSlider from './Spotlight';
import { useDispatch, useSelector } from '@/store/hooks';
import { changeActiveSlider } from '@/features/customizer/slice';

export default function TabSliders() {
    const dispatch = useDispatch();
    const activeSlider = useSelector((state) => state.customizer.activeSlider);
    const isFilterHidden = useSelector((state) => state.customizer.hidden?.filter);
    const lgUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('lg'));

    const [tabValue, setTabValue] = useState(activeSlider === 'spotlight' ? '1' : '2');

    useEffect(() => {
        setTabValue(activeSlider === 'spotlight' ? '1' : '2');
    }, [activeSlider]);

    return (
        <Box sx={{ width: lgUp && !isFilterHidden ? 'calc(100vw - 350px)' : 'calc(100vw - 65px)' }} minHeight={500}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={(_e, value) => {
                            setTabValue(value);
                            dispatch(changeActiveSlider(value === '1' ? 'spotlight' : 'recentlySold'));
                        }}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Spotlight" value="1" />
                        <Tab label="Recently Sold" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <SpotlightSlider />
                </TabPanel>
                <TabPanel value="2">
                    <RecentlySoldSlider />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

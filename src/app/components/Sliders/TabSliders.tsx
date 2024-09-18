import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Theme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import RecentlySoldSlider from './RecentlySold';
import SpotlightSlider from './Spotlight';
import { useSelector } from '@/store/hooks';

export default function TabSliders() {
    const [tabValue, setTabValue] = useState('1');
    const isFilterHidden = useSelector((state) => state.customizer.hidden?.filter);
    const lgUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('lg'));
    return (
        <Box sx={{ width: lgUp && !isFilterHidden ? 'calc(100vw - 350px)' : 'calc(100vw - 65px)' }} minHeight={500}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={(_e, value) => setTabValue(value)} variant="scrollable" scrollButtons="auto">
                        <Tab label="Recently Sold" value="1" />
                        <Tab label="Spotlight" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <RecentlySoldSlider />
                </TabPanel>
                <TabPanel value="2">
                    <SpotlightSlider />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

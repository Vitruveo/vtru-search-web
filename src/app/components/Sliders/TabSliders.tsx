import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Tab, Theme, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import RecentlySoldSlider from './RecentlySold';
import SpotlightSlider from './Spotlight';
import { useDispatch, useSelector } from '@/store/hooks';
import { changeActiveSlider } from '@/features/customizer/slice';
import { actions } from '@/features/assets/slice';
import { IconEye } from '@tabler/icons-react';

export default function TabSliders() {
    const dispatch = useDispatch();
    const activeSlider = useSelector((state) => state.customizer.activeSlider);
    const isFilterHidden = useSelector((state) => state.customizer.hidden?.filter);
    const hidden = useSelector((state) => state.customizer.hidden);
    const lgUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('lg'));

    const [tabValue, setTabValue] = useState(activeSlider === 'spotlight' ? '1' : '2');

    useEffect(() => {
        if (hidden?.spotlight && hidden?.recentlySold) return;
        if (hidden?.spotlight && activeSlider === 'spotlight') {
            setTabValue('2');
            dispatch(changeActiveSlider('recentlySold'));
        }
        if (hidden?.recentlySold && activeSlider === 'recentlySold') {
            setTabValue('1');
            dispatch(changeActiveSlider('spotlight'));
        }
        setTabValue(activeSlider === 'spotlight' ? '1' : '2');
    }, [activeSlider, hidden?.recentlySold, hidden?.spotlight]);

    if (hidden?.spotlight && hidden?.recentlySold) return null;
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
                        {!hidden?.spotlight && <Tab label={<Label label={'Spotlight'} />} value="1" />}
                        {!hidden?.recentlySold && <Tab label={<Label label={'Recently Sold'} />} value="2" />}
                    </TabList>
                </Box>
                {!hidden?.spotlight && (
                    <TabPanel value="1">
                        <SpotlightSlider />
                    </TabPanel>
                )}
                {!hidden?.recentlySold && (
                    <TabPanel value="2">
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
            <Button
                variant="contained"
                sx={{
                    width: 28,
                    height: 25,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    minWidth: 0,
                }}
                onClick={handleView}
            >
                <IconEye size={20} />
            </Button>
        </Box>
    );
}

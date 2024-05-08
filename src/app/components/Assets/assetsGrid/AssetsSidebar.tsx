import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AssetsFilter from './AssetsFilter';
import { Box } from '@mui/material';
import { useSelector } from '@/store/hooks';
import { useDispatch } from 'react-redux';
import { actions } from '@/features/layout';

const drawerWidth = 300;

const AssetsSidebar = () => {
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const isSidebarOpen = useSelector(state => state.layout.isSidebarOpen)
    const dispatch = useDispatch();

    const onSidebarClose = () => {
        dispatch(actions.closeSidebar())
    };

    return (
        <Drawer
            open={isSidebarOpen}
            onClose={onSidebarClose}
            variant={lgUp ? 'permanent' : 'temporary'}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                zIndex: lgUp ? 0 : 1,
                [`& .MuiDrawer-paper`]: { position: 'relative' },
            }}
        >
            <Box>
                <AssetsFilter />
            </Box>
        </Drawer>
    );
};

export default AssetsSidebar;

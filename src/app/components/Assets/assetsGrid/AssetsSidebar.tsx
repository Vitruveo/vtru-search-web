import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AssetsFilter from './AssetsFilter';
import { useSelector } from '@/store/hooks';
import { useDispatch } from 'react-redux';
import { actions } from '@/features/layout';

const drawerWidth = 300;

const AssetsSidebar = () => {
    const dispatch = useDispatch();
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const isSidebarOpen = useSelector((state) => state.layout.isSidebarOpen);
    const isHiddenFilter = useSelector((state) => state.customizer.hidden?.filter);
    if (isHiddenFilter) return null;

    const onSidebarClose = () => {
        dispatch(actions.closeSidebar());
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
            <AssetsFilter />
        </Drawer>
    );
};

export default AssetsSidebar;

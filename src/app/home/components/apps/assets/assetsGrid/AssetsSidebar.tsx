import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AssetsFilter from './AssetsFilter';

const drawerWidth = 300;

interface Props {
    isMobileSidebarOpen: boolean;
    onSidebarClose: (event: React.SyntheticEvent | Event) => void;
}

const AssetsSidebar = ({ isMobileSidebarOpen, onSidebarClose }: Props) => {
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

    return (
        <Drawer
            open={isMobileSidebarOpen}
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

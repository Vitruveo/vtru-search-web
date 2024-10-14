import React, { useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemText, Theme, Typography, useMediaQuery } from '@mui/material';
import { IconMenu2 } from '@tabler/icons-react';
import { useSelector } from '@/store/hooks';
import { SEARCH_BASE_URL, STUDIO_BASE_URL } from '@/constants/api';

const projects = [
    { title: 'STACKS', url: `${SEARCH_BASE_URL}/stacks` },
    { title: 'SEARCH', url: `${SEARCH_BASE_URL}` },
    { title: 'STORES', url: '' },
    { title: 'STREAMS', url: '' },
    { title: 'STUDIO', url: `${STUDIO_BASE_URL}/login` },
    { title: 'BUY VUSD', url: '' },
    { title: 'ABOUT XIBIT', url: 'https://about.xibit.app', onlyMobile: true },
    { title: 'ABOUT VITRUVEO', url: 'https://vitruveo.xyz', onlyMobile: true },
];

const AllProjectsMenu = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const customizer = useSelector((state) => state.customizer);
    const isDark = customizer.activeMode === 'dark';

    const getActualProject = () => {
        const actualUrl = window.location.href;
        if (actualUrl.includes('stacks')) return projects[0];
        if (actualUrl.includes('search')) return projects[1];
        if (actualUrl.includes('studio')) return projects[4];
        return projects[1];
    };

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const getStyle = (v: { url: string; title: string }) => ({
        lineHeight: '1.2',
        cursor: v.url ? 'pointer' : 'default',
        letterSpacing: '3px',
        color:
            v.title === getActualProject().title ? '#D7DF23' : v.url && isDark ? 'white' : v.url ? 'dark' : '#5A5A5A',
        '&:hover': {
            color: v.url && isDark ? '#e0e0e0' : v.url && '#333',
        },
    });

    if (lgDown) {
        return (
            <>
                <IconButton size="small" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                    <IconMenu2 />
                </IconButton>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <List>
                        {projects.map((v) => (
                            <ListItem
                                key={v.title}
                                onClick={() => v.url && window.open(v.url, '_blank')}
                                sx={getStyle(v)}
                            >
                                <ListItemText primary={v.title} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </>
        );
    }

    const deskMenus = projects.filter((v) => !v.onlyMobile);

    return (
        <Box marginRight={7} display="flex">
            {deskMenus.map((v, index) => (
                <Box key={v.title} display="flex">
                    <Typography onClick={() => v.url && window.open(v.url, '_blank')} sx={getStyle(v)}>
                        {v.title}
                    </Typography>
                    {index !== deskMenus.length - 1 && (
                        <Typography color={isDark ? 'white' : 'black'} sx={{ margin: '0 8px', lineHeight: '1.2' }}>
                            |
                        </Typography>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default AllProjectsMenu;

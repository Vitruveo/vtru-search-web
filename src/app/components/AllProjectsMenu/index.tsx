import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Drawer, IconButton, List, ListItem, ListItemText, Theme, Typography, useMediaQuery } from '@mui/material';
import { IconMenu2 } from '@tabler/icons-react';
import { useSelector } from '@/store/hooks';
import { NODE_ENV } from '@/constants/api';
import { REDIRECTS_JSON } from '@/constants/vitruveo';

const AllProjectsMenu = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [redirects, setRedirects] = useState({
        search: '',
        stores: '',
        studio: '',
        about: '',
        vitruveo: '',
    });

    const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const customizer = useSelector((state) => state.customizer);
    const isDark = customizer.activeMode === 'dark';

    useEffect(() => {
        const fetchData = async () => {
            const rowData = await axios.get(REDIRECTS_JSON);
            setRedirects({
                search: rowData.data[NODE_ENV].xibit.search_url,
                stores: rowData.data[NODE_ENV].xibit.stores_url,
                studio: rowData.data[NODE_ENV].xibit.studio_url,
                about: rowData.data.common.xibit.about_url,
                vitruveo: rowData.data.common.vitruveo.base_url,
            });
        };
        fetchData();
    }, []);

    const projects = [
        { title: 'SEARCH', url: redirects.search },
        { title: 'FOLIO', url: redirects.stores },
        { title: 'STUDIO', url: `${redirects.studio}/login` },
        // { title: 'STACKS', url: `${SEARCH_BASE_URL}/stacks` },
        // { title: 'STREAMS', url: '' },
        { title: 'ABOUT XIBIT', url: redirects.about, onlyMobile: true },
        { title: 'ABOUT VITRUVEO', url: redirects.vitruveo, onlyMobile: true },
    ];

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const getActualProject = () => {
        const actualUrl = window.location.href;
        if (actualUrl.includes('stores') || actualUrl.includes('xibit.live')) return projects[1];
        if (actualUrl.includes('studio')) return projects[2];

        return projects[0];
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
        <Box marginRight={1} display="flex">
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

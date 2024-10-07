import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from '@/store/hooks';
import { API_BASE_URL } from '@/constants/api';

const isDev = API_BASE_URL.includes('dev');

const projects = [
    { title: 'STACKS', url: '' },
    { title: 'SEARCH', url: '' },
    { title: 'STORES', url: '' },
    { title: 'STREAMS', url: '' },
    { title: 'STUDIO', url: isDev ? 'https://studio.vtru.dev/login' : 'https://studio.vitruveo.xyz/login' },
    { title: 'ABOUT', url: '' },
];

const AllProjectsMenu = () => {
    const customizer = useSelector((state) => state.customizer);
    const isDark = customizer.activeMode === 'dark';

    return (
        <Box marginRight={5} display="flex" alignItems="baseline">
            {projects.map((v, index) => (
                <Box key={v.title} display="flex" alignItems="baseline">
                    <Typography
                        onClick={() => v.url && window.open(v.url, '_blank')}
                        sx={{
                            lineHeight: '1.2',
                            cursor: v.url ? 'pointer' : 'default',
                            letterSpacing: '3px',
                            color:
                                v.title === 'SEARCH'
                                    ? '#D7DF23'
                                    : v.url && isDark
                                      ? 'white'
                                      : v.url
                                        ? 'dark'
                                        : '#5A5A5A',
                            '&:hover': {
                                color: v.url && isDark ? '#e0e0e0' : v.url && '#333',
                            },
                        }}
                    >
                        {v.title}
                    </Typography>
                    {index !== projects.length - 1 && (
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

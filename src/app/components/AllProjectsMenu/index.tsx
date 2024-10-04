import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from '@/store/hooks';

const projects = [
    { title: 'STACKS', url: '' },
    { title: 'SEARCH', url: '' },
    { title: 'STORES', url: '' },
    { title: 'STREAMS', url: '' },
    { title: 'STUDIO', url: 'https://studio.vitruveo.xyz/login' },
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
                            color: v.title === 'SEARCH' ? '#D7DF23' : '#5A5A5A',
                            '&:hover': {
                                color: v.url && isDark ? 'white' : v.url && 'black',
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

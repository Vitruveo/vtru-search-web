import React from 'react';
import { Box, Typography } from '@mui/material';

const projects = [
    { title: 'STUDIO', url: 'https://studio.vitruveo.xyz/login' },
    { title: 'SEARCH', url: '' },
    { title: 'STORE', url: '' },
    { title: 'STREAM', url: '' },
];

const AllProjectsMenu = () => {
    return (
        <Box marginTop={2.1} marginRight={2} display="flex" alignItems="baseline">
            {projects.map((v, index) => (
                <Box key={v.title} display="flex" alignItems="center">
                    <Typography
                        sx={{
                            cursor: 'pointer',
                            letterSpacing: '3px',
                            color: v.title === 'SEARCH' ? '#D7DF23' : '#5A5A5A',
                        }}
                    >
                        {v.title}
                    </Typography>
                    {index !== projects.length - 1 && (
                        <Typography color="white" sx={{ margin: '0 8px' }}>
                            |
                        </Typography>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default AllProjectsMenu;

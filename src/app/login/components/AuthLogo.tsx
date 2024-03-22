'use client';
import React from 'react';
import Image from 'next/image';
import { Grid, Box } from '@mui/material';
import VtruTitle from '@/app/home/components/vtruTItle';

export default function AuthLogo() {
    return (
        <Grid
            item
            xs={12}
            sm={12}
            lg={7}
            xl={8}
            sx={{
                position: 'relative',
                '&:before': {
                    content: '""',
                    background: '#F2ECF9',
                    backgroundSize: '400% 400%',
                    animation: 'gradient 15s ease infinite',
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    opacity: '0.3',
                },
            }}
        >
            <Box position="relative">
                <Box
                    my={2}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    sx={{
                        display: {
                            xs: 'flex',
                            lg: 'none',
                        },
                    }}
                >
                    <Box marginBottom={1}>
                        <Image
                            src={'/images/logos/newlogo.png'}
                            alt="bg"
                            width={60}
                            height={60}
                            style={{
                                width: '100%',
                                maxWidth: '300px',
                                maxHeight: '300px',
                            }}
                        />
                    </Box>
                    <VtruTitle />
                </Box>
                <Box
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height={'calc(100vh - 75px)'}
                    sx={{
                        display: {
                            xs: 'none',
                            lg: 'flex',
                        },
                    }}
                >
                    <Box marginBottom={1}>
                        <Image
                            src={'/images/logos/newlogo.png'}
                            alt="bg"
                            width={500}
                            height={500}
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                maxHeight: '100px',
                            }}
                        />
                    </Box>
                    <VtruTitle login />
                </Box>
            </Box>
        </Grid>
    );
}

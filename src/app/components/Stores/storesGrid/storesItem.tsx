import React from 'react';
import { ShowAnimation } from '@/animations';
import { SEARCH_BASE_URL } from '@/constants/api';
import { STORES_STORAGE_URL } from '@/constants/aws';
import { Box, CardContent, Grid, IconButton, Stack as MuiStack, Tooltip, Typography } from '@mui/material';
import { MediaRenderer } from '../../Assets/components/MediaRenderer';
import BlankCard from '../../Shared/BlankCard';
import { useTheme } from '@mui/material/styles';
import { IconInfoCircle } from '@tabler/icons-react';
import { Stores } from '@/features/stores/types';

interface Props {
    store: Stores;
}

const StoresItemMain = ({ store }: Props) => {
    const theme = useTheme();

    const handleCardClick = () => {
        const parts = SEARCH_BASE_URL.split('//');
        window.open(`${parts[0]}//${store.organization?.url}.${parts[1]}`, '_blank');
    };

    return (
        <Box width={280} margin={'0 auto'}>
            <BlankCard className="hoverCard" onClick={handleCardClick}>
                <Box
                    width={'100%'}
                    height={250}
                    minHeight={270}
                    position={'relative'}
                    p={2}
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                    <MediaRenderer
                        key={store._id}
                        src={`${STORES_STORAGE_URL}/${store.organization?.formats?.logo?.square?.path}`}
                        fallbackSrc={'https://via.placeholder.com/250'}
                        onClick={handleCardClick}
                    />
                </Box>
                <CardContent
                    sx={{
                        p: 3,
                        pt: 2,
                        width: '100%',
                        backgroundColor: theme.palette.grey[100],
                        '&:hover': { cursor: 'pointer' },
                    }}
                >
                    <MuiStack direction="column" mb={4} gap={1}>
                        <Typography
                            title={store.organization.name}
                            variant="h5"
                            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                            width="100%"
                        >
                            {store.organization.name}
                        </Typography>
                        <Box display="flex" gap={1} alignItems="center">
                            <Box width={'60%'}>
                                <Typography
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    {store.username}
                                </Typography>
                            </Box>
                        </Box>
                    </MuiStack>
                    <MuiStack flexDirection="row" justifyContent="flex-end" alignItems="end">
                        {store.organization?.description && (
                            <Tooltip
                                title={store.organization.description}
                                arrow
                                componentsProps={{
                                    tooltip: {
                                        sx: { fontSize: '0.8rem' },
                                    },
                                }}
                            >
                                <IconButton>
                                    <IconInfoCircle color={theme.palette.primary.main} size={32} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </MuiStack>
                </CardContent>
            </BlankCard>
        </Box>
    );
};

export const StoresCardContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Grid
            item
            xl={3}
            lg={4}
            md={4}
            sm={6}
            xs={12}
            display="flex"
            alignItems="stretch"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ShowAnimation>{children}</ShowAnimation>
        </Grid>
    );
};

export const StoresItem = React.memo(StoresItemMain);

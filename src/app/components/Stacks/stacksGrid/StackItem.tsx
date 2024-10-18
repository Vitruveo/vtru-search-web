import { ShowAnimation } from '@/animations';
import { SEARCH_BASE_URL, SLIDESHOW_BASE_URL } from '@/constants/api';
import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { Stack } from '@/features/stacks/types';
import { Box, CardContent, Grid, IconButton, Modal, Stack as MuiStack, Tooltip, Typography } from '@mui/material';
import { MediaRenderer } from '../../Assets/components/MediaRenderer';
import BlankCard from '../../Shared/BlankCard';
import { useTheme } from '@mui/material/styles';
import { IconInfoCircle, IconPlayerPlayFilled, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';

interface Props {
    stack: Stack;
}

const StackItem = ({ stack }: Props) => {
    const theme = useTheme();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleModalOpen = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpenModal(true);
    };
    const handleModalClose = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpenModal(false);
    };

    const handleImage = () => {
        if (stack.stacks.type === 'grid') return `${GENERAL_STORAGE_URL}/${stack.stacks.path}`;
        if (stack.stacks.type === 'video') return `${stack.stacks.url}`;
        return `${SLIDESHOW_BASE_URL}/?slideshow=${stack.stacks.id}&stack=true`;
    };

    const handleCardClick = () => {
        window.open(`${SEARCH_BASE_URL}?${stack.stacks.type}=${stack.stacks.id}`, '_blank');
    };

    return (
        <>
            <BlankCard className="hoverCard" onClick={handleCardClick}>
                <Box
                    width={'100%'}
                    height={250}
                    borderRadius={'8px'}
                    position={'relative'}
                    p={2}
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                    <MediaRenderer
                        key={stack.stacks.id}
                        src={handleImage()}
                        fallbackSrc={'https://via.placeholder.com/250'}
                        type={stack.stacks.type}
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
                            title={stack.stacks.title}
                            variant="h5"
                            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                            width="100%"
                        >
                            {stack.stacks.title}
                        </Typography>
                        <Typography variant="h6" color={theme.palette.primary.main}>
                            Curator
                        </Typography>
                        <Box display="flex" gap={1} alignItems="center">
                            <Typography
                                variant="h6"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    flexShrink: 1,
                                }}
                            >
                                {stack.username}
                            </Typography>
                            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                                (+{stack.stacks.quantity} stacks)
                            </Typography>
                        </Box>
                    </MuiStack>
                    <MuiStack flexDirection="row" justifyContent="flex-end" alignItems="end">
                        {stack.stacks?.description && (
                            <Tooltip
                                title={stack.stacks.description}
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
                        <IconButton onClick={handleModalOpen}>
                            <IconPlayerPlayFilled style={{ color: theme.palette.primary.main }} size={32} />
                        </IconButton>
                    </MuiStack>
                </CardContent>
            </BlankCard>
            <Modal open={isOpenModal} onClose={handleModalClose}>
                <Box
                    sx={{
                        position: 'relative',
                        bgcolor: theme.palette.background.default,
                        p: 4,
                        width: '100vw',
                        height: '100vh',
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleModalClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.primary.main,
                            zIndex: 1,
                        }}
                    >
                        <IconX />
                    </IconButton>
                    <Box display={'flex'} gap={1}>
                        <Typography variant="h5">{stack.stacks.title}</Typography>
                        <Typography variant="h5">curated by</Typography>
                        <Typography variant="h5" fontStyle={'italic'} color={theme.palette.primary.main}>
                            {stack.username}
                        </Typography>
                    </Box>
                    <Box style={{ height: 'calc(100vh - 80px)' }}>
                        <MediaRenderer
                            src={handleImage()}
                            fallbackSrc={'https://via.placeholder.com/250'}
                            type={stack.stacks.type}
                            controls
                            muted={false}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export const StackCardContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box>
            <ShowAnimation>{children}</ShowAnimation>
        </Box>
    );
};

export default StackItem;

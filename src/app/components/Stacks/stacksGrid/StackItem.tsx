import { ShowAnimation } from '@/animations';
import { SLIDESHOW_BASE_URL } from '@/constants/api';
import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { Stack } from '@/features/stacks/types';
import { Box, CardContent, Grid, IconButton, Stack as MuiStack, Tooltip, Typography } from '@mui/material';
import { MediaRenderer } from '../../Assets/components/MediaRenderer';
import BlankCard from '../../Shared/BlankCard';
import { useTheme } from '@mui/material/styles';
import { IconInfoCircle } from '@tabler/icons-react';
import { IconEye } from '@tabler/icons-react';
import { IconPlayerPlay } from '@tabler/icons-react';

interface Props {
    stack: Stack;
}

const StackItem = ({ stack }: Props) => {
    const theme = useTheme();

    const handleImage = () => {
        if (stack.stacks.type === 'grid') {
            return `${GENERAL_STORAGE_URL}/${stack.stacks.path}`;
        }

        if (stack.stacks.type === 'video') {
            return `${stack.stacks.url}`;
        }

        return `${SLIDESHOW_BASE_URL}/?slideshow=${stack.stacks.id}&stack=true`;
    };

    return (
        <div style={{ height: '425px' }}>
            <BlankCard className="hoverCard">
                <Box width={250} height={250} borderRadius={'8px'} position={'relative'} p={2}>
                    <MediaRenderer
                        src={handleImage()}
                        fallbackSrc={'https://via.placeholder.com/250'}
                        type={stack.stacks.type}
                    />
                </Box>
                <CardContent sx={{ p: 3, pt: 2 }} style={{ backgroundColor: theme.palette.grey[100] }}>
                    <MuiStack direction="column" mb={4} gap={1}>
                        <Typography title={stack.stacks.title} variant="h6" sx={{ cursor: 'pointer' }} width="100%">
                            {stack.stacks.title}
                        </Typography>
                        <Typography variant="inherit" color={theme.palette.primary.main}>
                            Curator
                        </Typography>
                        <Typography variant="body1">
                            {stack.username} (+{stack.stacks.quantity} stacks)
                        </Typography>
                    </MuiStack>
                    <MuiStack flexDirection="row" justifyContent="flex-end" alignItems="end">
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
                        <IconButton>
                            <IconEye color={theme.palette.primary.main} size={32} />
                        </IconButton>
                        <IconButton>
                            <IconPlayerPlay color={theme.palette.primary.main} size={32} />
                        </IconButton>
                    </MuiStack>
                </CardContent>
            </BlankCard>
        </div>
    );
};

export const StackCardContainer = ({ children }: { children: React.ReactNode }) => {
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

export default StackItem;

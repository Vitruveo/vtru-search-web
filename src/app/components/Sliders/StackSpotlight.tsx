import { Box, CardContent, Link, Stack as StackMui, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Marquee from 'react-fast-marquee';

import { SLIDESHOW_BASE_URL, STORE_BASE_URL } from '@/constants/api';
import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { Stack } from '@/features/stacks/types';
import { useSelector } from '@/store/hooks';
import { MediaRenderer } from '../Assets/components/MediaRenderer';

function StackSpotlightSlider() {
    const stacks = useSelector((state) => state.stacks.spotlight);
    const theme = useTheme();

    const handleClickItem = (stack: Stack) => {
        window.open(`${STORE_BASE_URL}/${stack?.username || 'preview'}/${stack?._id}`);
    };

    const handleImage = (stack: Stack) => {
        if (stack.stacks.type === 'grid') return `${GENERAL_STORAGE_URL}/${stack.stacks.path}`;
        if (stack.stacks.type === 'video') return `${stack.stacks.url}`;
        return `${SLIDESHOW_BASE_URL}/?slideshow=${stack.stacks.id}&stack=true`;
    };

    return (
        <Box minHeight={250}>
            <Marquee>
                {stacks.map((stack, index) => {
                    const stackTitle = stack?.stacks.title || 'No Title';
                    const creatorName = stack?.username || 'No creator';

                    return (
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            m={2}
                            onClick={() => handleClickItem(stack)}
                            sx={{
                                backgroundColor: theme.palette.grey[100],
                                ':hover': {
                                    cursor: 'pointer',
                                    boxShadow: '0 0 10px 0px #000',
                                },
                            }}
                            key={index}
                        >
                            <Box width={250} height={250} borderRadius="8px 8px 0 0" position="relative">
                                <MediaRenderer
                                    key={stack.stacks.id}
                                    src={handleImage(stack)}
                                    fallbackSrc={'https://via.placeholder.com/250'}
                                    type={stack.stacks.type}
                                    onClick={() => handleClickItem(stack)}
                                />
                            </Box>
                            <CardContent
                                sx={{ width: 250, p: 3, pt: 2 }}
                                style={{
                                    borderBottomRightRadius: 10,
                                    borderBottomLeftRadius: 10,
                                }}
                            >
                                <StackMui direction="column" mb={4} gap={1}>
                                    <Typography
                                        title={stack.stacks.title}
                                        variant="h5"
                                        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        width="100%"
                                    >
                                        {stackTitle}
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
                                            {creatorName}
                                        </Typography>
                                        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                                            (+{stack.stacks.quantity} stacks)
                                        </Typography>
                                    </Box>
                                </StackMui>
                            </CardContent>
                        </Box>
                    );
                })}
            </Marquee>
        </Box>
    );
}

export default StackSpotlightSlider;

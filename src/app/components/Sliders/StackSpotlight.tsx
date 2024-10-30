import { Box, CardContent, Stack as StackMui, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Marquee from 'react-fast-marquee';

import { SEARCH_BASE_URL, SLIDESHOW_BASE_URL } from '@/constants/api';
import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { Stack } from '@/features/stacks/types';
import { useSelector } from '@/store/hooks';
import { MediaRenderer } from '../Assets/components/MediaRenderer';

function StackSpotlightSlider() {
    const stacks = useSelector((state) => state.stacks.spotlight);

    const theme = useTheme();

    const handleClickItem = (stack: Stack) => {
        window.open(`${SEARCH_BASE_URL}?${stack.stacks.type}=${stack.stacks.id}`, '_blank');
    };

    const handleImage = (stack: Stack) => {
        if (stack.stacks.type === 'grid') return `${GENERAL_STORAGE_URL}/${stack.stacks.path}`;
        if (stack.stacks.type === 'video') return `${stack.stacks.url}`;
        return `${SLIDESHOW_BASE_URL}/?slideshow=${stack.stacks.id}&stack=true`;
    };

    return (
        <Box minHeight={250}>
            <Marquee>
                {stacks.map((item, index) => {
                    const stackTitle = item.stack?.stacks.title || 'No Title';
                    const creatorName = item.stack?.username || 'No creator';

                    return (
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            m={2}
                            onClick={() => handleClickItem(item.stack)}
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
                                    key={item.stack.stacks.id}
                                    src={handleImage(item.stack)}
                                    fallbackSrc={'https://via.placeholder.com/250'}
                                    type={item.stack.stacks.type}
                                    onClick={() => handleClickItem(item.stack)}
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
                                        title={item.stack.stacks.title}
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
                                        {/* <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                                            (+{item.stack.stacks.quantity} stacks)
                                        </Typography> */}
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

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CardContent, Stack as StackMui, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Marquee from 'react-fast-marquee';

import { NODE_ENV } from '@/constants/api';
import { REDIRECTS_JSON } from '@/constants/vitruveo';
import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { Stack } from '@/features/stacks/types';
import { useSelector } from '@/store/hooks';
import { MediaRenderer } from '../Assets/components/MediaRenderer';
import Username from '../Username';
import { NO_IMAGE_ASSET } from '@/constants/asset';

function StackSpotlightSlider() {
    const stacks = useSelector((state) => state.stacks.spotlight);
    const [redirects, setRedirects] = useState({
        search: '',
        slideshow: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const rowData = await axios.get(REDIRECTS_JSON);
            setRedirects({
                search: rowData.data[NODE_ENV].xibit.search_url,
                slideshow: rowData.data[NODE_ENV].xibit.slideshow_url,
            });
        };
        fetchData();
    }, []);

    const theme = useTheme();

    const handleClickItem = (stack: Stack) => {
        window.open(`${redirects.search}?${stack.stacks.type}=${stack.stacks.id}`, '_blank');
    };

    const handleImage = (stack: Stack) => {
        if (stack.stacks.type === 'grid') return `${GENERAL_STORAGE_URL}/${stack.stacks.path}`;
        if (stack.stacks.type === 'video') return `${stack.stacks.url}`;
        return `${redirects.slideshow}/?slideshow=${stack.stacks.id}&stack=true`;
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
                                    fallbackSrc={NO_IMAGE_ASSET}
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
                                        <Username
                                            username={creatorName}
                                            vaultAdress={item.stack.vault?.vaultAddress}
                                            size="medium"
                                        />
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

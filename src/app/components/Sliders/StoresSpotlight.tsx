import { Box, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Marquee from 'react-fast-marquee';

import { useSelector } from '@/store/hooks';
import { MediaRenderer } from '../Assets/components/MediaRenderer';
import { StoresSpotlight } from '@/features/stores/types';
import { STORES_STORAGE_URL } from '@/constants/aws';
import { IconInfoCircle } from '@tabler/icons-react';
import { NODE_ENV, SEARCH_BASE_URL } from '@/constants/api';
import { NO_IMAGE_ASSET } from '@/constants/asset';

interface Props {
    stores: StoresSpotlight[];
}

function StoresSpotlightSlider({ stores }: Props) {
    const theme = useTheme();

    const handleClickItem = (store: StoresSpotlight) => {
        if (NODE_ENV === 'production') {
            window.open(`https://${store.url}.xibit.live`, '_blank');
            return;
        }

        const parts = SEARCH_BASE_URL.split('//');
        window.open(`${parts[0]}//${store.url}.${parts[1]}`, '_blank');
    };

    return (
        <Box marginTop={1} minHeight={250}>
            <Typography variant="h5">Folio Spotlight</Typography>
            <Marquee autoFill style={{ overflow: 'hidden' }}>
                {stores.map((item) => {
                    return (
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            m={2}
                            onClick={() => handleClickItem(item)}
                            sx={{
                                backgroundColor: theme.palette.grey[100],
                                ':hover': {
                                    cursor: 'pointer',
                                    boxShadow: '0 0 10px 0px #000',
                                },
                            }}
                            key={item._id}
                        >
                            <Box width={250} height={250} borderRadius="8px 8px 0 0" position="relative">
                                <MediaRenderer
                                    src={`${STORES_STORAGE_URL}/${item.logo}`}
                                    fallbackSrc={NO_IMAGE_ASSET}
                                    onClick={() => handleClickItem(item)}
                                />
                            </Box>
                            <CardContent
                                sx={{ width: 250, p: 3, pt: 2 }}
                                style={{
                                    borderBottomRightRadius: 10,
                                    borderBottomLeftRadius: 10,
                                }}
                            >
                                <Typography
                                    title={item.name}
                                    variant="h5"
                                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                    width="100%"
                                >
                                    {item.name}
                                </Typography>
                                <Box display={'flex'} justifyContent={'end'}>
                                    <Tooltip
                                        title={item.description}
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
                                </Box>
                            </CardContent>
                        </Box>
                    );
                })}
            </Marquee>
        </Box>
    );
}

function StoresSpotlightSliderHOC() {
    const stores = useSelector((state) => state.stores.spotlight);
    if (!stores.length) return null;

    return <StoresSpotlightSlider stores={stores} />;
}

export default StoresSpotlightSliderHOC;

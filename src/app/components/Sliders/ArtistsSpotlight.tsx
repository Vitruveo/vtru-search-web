import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { useDispatch, useSelector } from '@/store/hooks';
import { Box, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Marquee from 'react-fast-marquee';
import { MediaRenderer } from '../Assets/components/MediaRenderer';
import { actions } from '@/features/filters/slice';
import { actions as actionsAssets } from '@/features/assets/slice';

export default function ArtistsSpotlight() {
    const dispatch = useDispatch();
    const artists = useSelector((state) => state.assets.artistSpotlight);
    const theme = useTheme();

    const handleClickItem = (id: string) => {
        dispatch(actionsAssets.setGroupByCreator({ active: 'no', name: '' }));
        dispatch(actions.changeCreatorId(id));
    };

    return (
        <Box minHeight={250}>
            <Marquee style={{ overflow: 'hidden' }}>
                {artists.map((artist, index) => {
                    const creatorName = artist?.name || 'No creator';
                    const nextAssetExists = index + 1 < artists.length;

                    return (
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            m={2}
                            onClick={() => handleClickItem(artist._id)}
                            sx={{
                                backgroundColor: theme.palette.grey[100],
                                ':hover': {
                                    cursor: 'pointer',
                                    boxShadow: '0 0 10px 0px #000',
                                },
                            }}
                            key={artist._id}
                        >
                            <Box width={250} height={250} borderRadius="8px 8px 0 0" position="relative">
                                <MediaRenderer
                                    src={`${GENERAL_STORAGE_URL}/${artist.profile.avatar}`}
                                    fallbackSrc={'https://via.placeholder.com/250'}
                                    preSource={
                                        nextAssetExists
                                            ? `${GENERAL_STORAGE_URL}/${artists[index + 1]?.profile.avatar}`
                                            : ''
                                    }
                                />
                            </Box>
                            <CardContent
                                sx={{ width: 250, p: 3, pt: 2 }}
                                style={{
                                    borderBottomRightRadius: 10,
                                    borderBottomLeftRadius: 10,
                                }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <Typography
                                        variant="h5"
                                        noWrap
                                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                    >
                                        {creatorName}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Box>
                    );
                })}
            </Marquee>
        </Box>
    );
}

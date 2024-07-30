import { Box, Button, CircularProgress, MenuItem, Select, Typography } from '@mui/material';
import { ShareButton } from './ShareButton';
import { useDispatch, useSelector } from '@/store/hooks';
import { useI18n } from '@/app/hooks/useI18n';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import audios from '../../../../../../public/data/sounds.json';
import { actions } from '@/features/assets';
import { createTwitterIntent } from '@/utils/twitter';
import { API_BASE_URL } from '@/constants/api';
import { createBackLink } from '@/utils/url-assets';
import { Asset } from '@/features/assets/types';

interface VideoStackProps {
    selectedAssets: Asset[];
    title: string;
    selectedAudio: string;
    audio: HTMLAudioElement;
    setSelectedAudio: Dispatch<SetStateAction<string>>;
}

export default function VideoStack({ selectedAssets, title, selectedAudio, audio, setSelectedAudio }: VideoStackProps) {
    const { language } = useI18n();
    const dispatch = useDispatch();
    const creatorId = useSelector((state) => state.creator.id);
    const [isPlaying, setIsPlaying] = useState(false);
    const [published, setPublished] = useState(false);
    const { loadingVideo, video } = useSelector((state) => state.assets);
    const hasVideo = video !== '';

    useEffect(() => {
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (hasVideo) {
            audio.pause();
        }
    }, [hasVideo]);

    const handleDispatchMakeVideo = () => {
        const data = selectedAssets.map((asset) => asset?.formats?.preview?.path);
        dispatch(
            actions.makeVideo({
                artworks: data,
                title: title,
                sound: audios.find((item) => item.value === selectedAudio)?.value,
            })
        );
        setPublished(true);
    };

    const twitterShareURL = createTwitterIntent({
        url: `${API_BASE_URL}/creators/search/${creatorId}/html`,
        hashtags: 'Vitruveo,VTRUSuite',
        text: `${language['search.checkoutMyNewVideo']} ${createBackLink(selectedAssets)}`,
    });

    return (
        <>
            <Box display={'flex'} justifyContent={'center'}>
                {!published ? (
                    <Typography> 📹 Let is make a video from your amazing curation</Typography>
                ) : (
                    <Typography>Now share your video with the world</Typography>
                )}
            </Box>
            {!published && (
                <Box display="flex" alignItems="center" mb={2} mt={2}>
                    <Typography width={150}>{language['search.drawer.stack.sound'] as string}</Typography>
                    <Select
                        defaultValue={audios[0].value}
                        onChange={(event) => {
                            audio.pause();
                            setIsPlaying(false);
                            setSelectedAudio(event.target.value);
                        }}
                        fullWidth
                    >
                        {audios.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button
                        sx={{ marginLeft: 1 }}
                        size="small"
                        variant="outlined"
                        onClick={() => setIsPlaying((prev) => !prev)}
                    >
                        {isPlaying ? <IconPlayerPause /> : <IconPlayerPlay />}
                    </Button>
                </Box>
            )}

            {!published && <Box height={150} />}

            {loadingVideo && (
                <Box display="flex" justifyContent="center" mt={3}>
                    <CircularProgress />
                </Box>
            )}

            {hasVideo && (
                <Box mt={2}>
                    <video width="100%" controls>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Box>
            )}

            {!published ? (
                <>
                    <Typography variant="caption">Note: Video is limited to first 16 curated items.</Typography>
                    <Button
                        disabled={loadingVideo || selectedAssets.length === 0 || title.length === 0}
                        variant="contained"
                        fullWidth
                        onClick={handleDispatchMakeVideo}
                    >
                        {language['search.drawer.stack.button.publish'] as string}
                    </Button>{' '}
                </>
            ) : (
                <Box display={'flex'} justifyContent={'center'} mt={2}>
                    <ShareButton twitterURL={twitterShareURL} videoURL={video} />
                </Box>
            )}
        </>
    );
}

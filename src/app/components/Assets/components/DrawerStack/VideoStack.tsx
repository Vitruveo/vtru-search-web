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
    const [timestamp, setTimestamp] = useState('');
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
        const id = Date.now().toString();
        setTimestamp(id);
        dispatch(
            actions.makeVideo({
                artworks: data,
                title: title,
                sound: audios.find((item) => item.value === selectedAudio)!.value,
                fees: 10, // TODO: get fees from the user
                timestamp: id,
            })
        );
        setPublished(true);
    };

    const twitterShareURL = createTwitterIntent({
        url: window.location.origin,
        hashtags: 'Vitruveo,VTRUSuite',
        text: `${language['search.checkoutMyNewVideo']}`,
        extra: `video=${timestamp}`,
    });

    if (published) {
        return (
            <>
                <Box display="flex" justifyContent="center">
                    {loadingVideo ? <CircularProgress /> : <Typography>Now share your video with the world</Typography>}
                </Box>

                {hasVideo && (
                    <Box mt={2}>
                        <video width="100%" controls>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                )}

                {!loadingVideo && (
                    <Box display={'flex'} justifyContent={'center'} mt={2}>
                        <ShareButton
                            twitterURL={twitterShareURL}
                            url={video}
                            downloadable
                            contentToCopy={createBackLink(timestamp)}
                            title={title}
                        />
                    </Box>
                )}
            </>
        );
    }

    return (
        <>
            <Box display={'flex'} justifyContent={'center'}>
                <Typography fontWeight={'bold'}> 📹 Let&apos;s make a video from your amazing curation</Typography>
            </Box>
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
            <Box height={150} />
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
    );
}

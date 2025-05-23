import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, MenuItem, Select, Typography } from '@mui/material';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';

import { STACK_BASE_URL } from '@/constants/api';
import { actions } from '@/features/assets';
import { Asset } from '@/features/assets/types';
import { useDispatch, useSelector } from '@/store/hooks';
import { createTwitterIntent, generateUrlToCopyOnTwitter } from '@/utils/twitter';
import { useI18n } from '@/app/hooks/useI18n';
import { ShareButton } from './ShareButton';
import audios from '../../../../../../public/data/sounds.json';

interface VideoStackProps {
    selectedAssets: Asset[];
    title: string;
    description: string;
    fees: number;
    selectedAudio: string;
    audio: HTMLAudioElement;
    setSelectedAudio: Dispatch<SetStateAction<string>>;
    setGenerating: Dispatch<SetStateAction<boolean>>;
}

export default function VideoStack({
    selectedAssets,
    title,
    selectedAudio,
    audio,
    setSelectedAudio,
    setGenerating,
    description,
    fees,
}: VideoStackProps) {
    const { language } = useI18n();
    const dispatch = useDispatch();
    const [isPlaying, setIsPlaying] = useState(false);
    const [published, setPublished] = useState(false);
    const [timestamp, setTimestamp] = useState('');
    const { loadingVideo, video } = useSelector((state) => state.assets);

    const hasVideo = video !== '';

    useEffect(() => {
        setGenerating(loadingVideo);
    }, [loadingVideo]);

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
        const data = selectedAssets.map((asset) => asset?.formats?.preview?.path).slice(0, 16);
        const id = Date.now().toString();
        setTimestamp(id);
        dispatch(
            actions.makeVideo({
                artworks: data,
                title,
                description,
                sound: audios.find((item) => item.value === selectedAudio)!.value,
                fees,
                timestamp: id,
            })
        );
        setPublished(true);
    };

    const url = `${STACK_BASE_URL}/video/${timestamp}`;
    const twitterShareURL = createTwitterIntent({
        url,
        hashtags: 'Vitruveo,VTRUSuite',
        text: `${language['search.checkoutMyNewVideo']}`,
    });

    if (published) {
        return (
            <>
                <Box display="flex" justifyContent="center">
                    {loadingVideo ? (
                        <CircularProgress />
                    ) : (
                        <Typography>{language['search.drawer.stack.video.share'] as string}</Typography>
                    )}
                </Box>

                {hasVideo && (
                    <Box mt={2}>
                        <video width="100%" controls>
                            <source src={video} type="video/mp4" />
                            {language['search.drawer.stack.video.not.support'] as string}
                        </video>
                    </Box>
                )}

                {!loadingVideo && (
                    <Box display={'flex'} justifyContent={'center'} mt={2}>
                        <ShareButton
                            twitterURL={twitterShareURL}
                            url={video}
                            downloadable
                            contentToCopy={generateUrlToCopyOnTwitter({ url, timestamp })}
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
                <Typography fontWeight={'bold'}>
                    {' '}
                    📹 {language['search.drawer.stack.video.subtitle'] as string}
                </Typography>
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
            <Box height={100} />
            <Typography variant="caption">{language['search.drawer.stack.video.note'] as string}</Typography>
            <Button
                disabled={loadingVideo || selectedAssets.length === 0 || title.length === 0}
                variant="contained"
                fullWidth
                onClick={handleDispatchMakeVideo}
            >
                {language['search.drawer.stack.button.publish'] as string}
            </Button>
        </>
    );
}

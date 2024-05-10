import { useI18n } from '@/app/hooks/useI18n';
import { API_BASE_URL } from '@/constants/api';
import { useSelector, useDispatch } from '@/store/hooks';
import { createTwitterIntent } from '@/utils/twitter';
import { createBackLink } from '@/utils/url-assets';
import { Modal, Box, Typography, Select, MenuItem, Button, CircularProgress, TextField } from '@mui/material';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import { useState, useEffect, useMemo } from 'react';
import audios from '../../../../../../public/data/sounds.json';
import { actions as assetActions } from '@/features/assets';
import { Asset } from '@/features/assets/types';
import { ShareButton } from './ShareButton';

interface PublishStackModalProps {
    selectedAssets: Asset[];
    isOpen: boolean;
    onClose: () => void;
}

export const PublishStackModal = ({ selectedAssets, isOpen, onClose }: PublishStackModalProps) => {
    const dispatch = useDispatch();
    const { language } = useI18n();
    const [title, setTitle] = useState('');
    const [selectedAudio, setSelectedAudio] = useState(audios[0].value);
    const [isPlaying, setIsPlaying] = useState(false);
    const creatorId = useSelector((state) => state.creator.id);

    const { loadingVideo, video } = useSelector((state) => state.assets);

    const audio = useMemo(() => new Audio(`/audios/${selectedAudio}`), [selectedAudio]);

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDispatchMakeVideo = () => {
        const data = selectedAssets.map((asset) => asset?.formats?.preview?.path);
        dispatch(
            assetActions.makeVideo({
                artworks: data,
                title: title,
                sound: audios.find((item) => item.value === selectedAudio)?.value,
            })
        );
        audio.play();
        setIsPlaying(true);
    };

    const twitterShareURL = createTwitterIntent({
        url: `${API_BASE_URL}/creators/search/${creatorId}/html`,
        hashtags: 'Vitruveo,VTRUSuite',
        text: `${language['search.checkoutMyNewVideo']} ${createBackLink(selectedAssets)}`,
    });

    const hasVideo = video !== '';

    useEffect(() => {
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isOpen) {
            audio.pause();
            setIsPlaying(false);
            dispatch(assetActions.setVideo(''));
            setTitle('');
        }
    }, [isOpen]);

    useEffect(() => {
        if (hasVideo) {
            audio.pause();
            setIsPlaying(false);
        }
    }, [hasVideo]);

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    backgroundColor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Box width="100%" display="flex" justifyContent="center" mb={4}>
                    <Typography variant="h4">{language['search.drawer.stack.publishStack'] as string}</Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={2}>
                    <Typography width={120}>{language['search.drawer.stack.description'] as string}</Typography>
                    <Select defaultValue={30} fullWidth>
                        <MenuItem selected value={30}>
                            {language['search.drawer.stack.videoGallery'] as string}
                        </MenuItem>
                        <MenuItem disabled value={10}>
                            {language['search.drawer.stack.slideshow'] as string}
                        </MenuItem>
                        <MenuItem disabled value={20}>
                            {language['search.drawer.stack.webGallery'] as string}
                        </MenuItem>
                    </Select>
                </Box>

                <Box display="flex" alignItems="center" mb={2}>
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

                <Box display="flex" alignItems="center" mb={3}>
                    <Typography width={120}>
                        {language['search.drawer.stack.title'] as string}
                        <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField rows={4} value={title} fullWidth onChange={onTitleChange} />
                </Box>

                <Button
                    disabled={
                        loadingVideo || selectedAssets.length === 0 || selectedAssets.length > 15 || title.length === 0
                    }
                    variant="contained"
                    fullWidth
                    onClick={handleDispatchMakeVideo}
                >
                    {language['search.drawer.stack.button.publish'] as string}
                </Button>
                {selectedAssets.length > 15 && (
                    <Box display="flex" justifyContent="center">
                        <span style={{ color: 'red', textAlign: 'center' }}>
                            assets selectedAssets exceed the limit of 15, please remove some assets.
                        </span>
                    </Box>
                )}

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

                        <ShareButton twitterURL={twitterShareURL} videoURL={video} />
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

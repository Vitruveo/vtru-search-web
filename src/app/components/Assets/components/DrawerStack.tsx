import { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Drawer,
    Modal,
    Select,
    TextField,
    useMediaQuery,
    Theme,
    MenuItem,
    CircularProgress,
    IconButton,
} from '@mui/material';
import { useI18n } from '@/app/hooks/useI18n';
import { IconPlayerPlay, IconPlayerPause } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { Asset } from '@/features/assets/types';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { useSelector } from '@/store/hooks';
import { actions as actionsCreator } from '@/features/creator';
import { actions as actionsAssets } from '@/features/assets';
import { createTwitterIntent } from '@/utils/twitter';
import { API_BASE_URL } from '@/constants/api';
import XIcon from '@mui/icons-material/X';
import { useToggle } from '@/app/hooks/useToggle';
import { MediaRenderer } from './MediaRenderer';
import { createBackLink } from '@/utils/url-assets';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    drawerStackOpen: boolean;
    selected: Asset[];
    onRemove(asset: Asset): void;
    onClose(): void;
}

const audios = [
    {
        name: 'ambisax',
        value: 'ambisax.mp3',
    },
    {
        name: 'disco',
        value: 'disco.mp3',
    },
    {
        name: 'freeflow',
        value: 'freeflow.mp3',
    },
    {
        name: 'gangsta',
        value: 'gangsta.mp3',
    },
    {
        name: 'lit',
        value: 'lit.mp3',
    },
    {
        name: 'melodic',
        value: 'melodic.mp3',
    },
    {
        name: 'palmtrees',
        value: 'palmtrees.mp3',
    },
];

export function DrawerStack({ drawerStackOpen, selected, onRemove, onClose }: Props) {
    const dispatch = useDispatch();
    const { language } = useI18n();

    const modalSwitch = useToggle();
    const [title, setTitle] = useState('');
    const [statedLogin, setStatedLogin] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState(audios[0].value);
    const [isPlaying, setIsPlaying] = useState(false);

    const loadingVideo = useSelector((state) => state.assets.loadingVideo);
    const video = useSelector((state) => state.assets.video);
    const isLogged = useSelector((state) => state.creator.token !== '');
    const { email, code, loading, wasSended, id: creatorId } = useSelector((state) => state.creator);

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    const audio = useMemo(() => new Audio(`/audios/${selectedAudio}`), [selectedAudio]);

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDispatchMakeVideo = () => {
        const data = selected.map((asset) => asset?.formats?.preview?.path);
        dispatch(
            actionsAssets.makeVideo({
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
        text: `${language['search.checkoutMyNewVideo']} ${createBackLink(selected)}`,
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
        if (!modalSwitch.isActive) {
            audio.pause();
            setIsPlaying(false);
        }
    }, [modalSwitch.isActive]);

    useEffect(() => {
        if (hasVideo) {
            audio.pause();
            setIsPlaying(false);
        }
    }, [hasVideo]);

    return (
        <>
            <Modal
                open={modalSwitch.isActive}
                onClose={modalSwitch.toggle}
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
                            onClick={() => setIsPlaying(!isPlaying)}
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
                        disabled={loadingVideo || selected.length === 0 || selected.length > 15 || title.length === 0}
                        variant="contained"
                        fullWidth
                        onClick={handleDispatchMakeVideo}
                    >
                        {language['search.drawer.stack.button.publish'] as string}
                    </Button>

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

                    {hasVideo && (
                        <Box display="flex" justifyContent="center">
                            <Button href={twitterShareURL} target="_blank" variant="outlined" startIcon={<XIcon />}>
                                {language['search.shareOnTwitter'] as string}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Modal>

            <Drawer anchor="right" open={drawerStackOpen} onClose={onClose}>
                <Box width={mdUp ? 400 : 224} p={4}>
                    {!isLogged && (
                        <Box display="flex" justifyContent="center">
                            <Typography variant="caption" color="Highlight" textAlign="center">
                                Studio login required
                            </Typography>
                        </Box>
                    )}
                    <Button fullWidth variant="contained" disabled={!isLogged} onClick={modalSwitch.activate}>
                        {language['search.drawer.stack.publishStack'] as string}
                    </Button>

                    {!isLogged && (
                        <>
                            {!statedLogin && (
                                <>
                                    <Box mt={2}>
                                        <Typography>
                                            Login to create a stack and publish your selected assets
                                        </Typography>
                                    </Box>
                                    <Button fullWidth variant="contained" onClick={() => setStatedLogin(true)}>
                                        Login with your account from Studio
                                    </Button>
                                </>
                            )}

                            {statedLogin && !wasSended && (
                                <Box mt={2}>
                                    <TextField
                                        onChange={(event) => dispatch(actionsCreator.changeEmail(event.target.value))}
                                        label="Email"
                                        fullWidth
                                    />

                                    <Button
                                        onClick={() => dispatch(actionsCreator.sendCode())}
                                        fullWidth
                                        variant="outlined"
                                        sx={{ marginTop: 2 }}
                                        disabled={!email.length || loading}
                                    >
                                        Send Code
                                    </Button>
                                </Box>
                            )}

                            {statedLogin && wasSended && (
                                <Box mt={2}>
                                    <TextField
                                        onChange={(event) => dispatch(actionsCreator.changeCode(event.target.value))}
                                        label="Code"
                                        fullWidth
                                    />

                                    <Button
                                        onClick={() => dispatch(actionsCreator.verifyCode())}
                                        fullWidth
                                        variant="outlined"
                                        sx={{ marginTop: 2 }}
                                        disabled={!code.length || loading}
                                    >
                                        Verify code
                                    </Button>
                                    <Box mt={1} display="flex" justifyContent="space-between">
                                        <Button
                                            size="small"
                                            variant="text"
                                            sx={{
                                                backgroundColor: 'transparent',
                                            }}
                                            onClick={() => dispatch(actionsCreator.resendCode())}
                                        >
                                            Resend code
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="text"
                                            sx={{
                                                backgroundColor: 'transparent',
                                            }}
                                            onClick={() => dispatch(actionsCreator.resetEmail())}
                                        >
                                            Change email
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </>
                    )}

                    <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                        {selected.length === 0 && (
                            <Typography>{language['search.drawer.stack.noSelectedAssets'] as string}</Typography>
                        )}
                        {selected.map((asset) => (
                            <Box key={asset._id} width={160}>
                                <Box height={160} borderRadius="8px" position="relative">
                                    <MediaRenderer
                                        src={`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`}
                                        fallbackSrc={`https://via.placeholder.com/${160}`}
                                    />
                                    <Box position="absolute" bottom={0} right={0} zIndex={1} m={1} bgcolor="#fff">
                                        <IconButton
                                            style={{ color: 'red' }}
                                            size="small"
                                            onClick={() => onRemove(asset)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                                {asset.assetMetadata?.context?.formData?.title && (
                                    <Typography
                                        zIndex={100}
                                        textOverflow="ellipsis"
                                        overflow="hidden"
                                        whiteSpace="nowrap"
                                    >
                                        {asset.assetMetadata?.context?.formData?.title}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

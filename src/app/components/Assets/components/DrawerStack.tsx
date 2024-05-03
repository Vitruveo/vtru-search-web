import { useRef, useState } from 'react';
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
} from '@mui/material';
import { useI18n } from '@/app/hooks/useI18n';
import Image from 'next/image';
import { IconTrash } from '@tabler/icons-react';
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

interface Props {
    drawerStackOpen: boolean;
    selected: Asset[];
    onRemove(asset: Asset): void;
    onClose(): void;
}

export function DrawerStack({ drawerStackOpen, selected, onRemove, onClose }: Props) {
    const dispatch = useDispatch();
    const { language } = useI18n();

    const modalSwitch = useToggle();
    const title = useRef('');

    const loadingVideo = useSelector((state) => state.assets.loadingVideo);
    const video = useSelector((state) => state.assets.video);
    const isLogged = useSelector((state) => state.creator.token !== '');
    const email = useSelector((state) => state.creator.email);
    const code = useSelector((state) => state.creator.code);
    const loading = useSelector((state) => state.creator.loading);
    const wasSended = useSelector((state) => state.creator.wasSended);
    const [statedLogin, setStatedLogin] = useState(false);
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const creatorId = useSelector((state) => state.creator.id);

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        title.current = event.target.value;
    };

    const handleDispatchMakeVideo = () => {
        const data = selected.map((asset) => `${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`);
        dispatch(actionsAssets.makeVideo({ artworks: data, title: title.current }));
    };

    const twitterShareURL = createTwitterIntent({
        url: `${API_BASE_URL}/creators/search/${creatorId}/html`,
        hashtags: 'Vitruveo,VTRUSuite',
        text: `${language['search.checkoutMyNewVideo']} ${window.location.href}`,
    });

    const hasVideo = video !== '';

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

                    <Box display="flex" mb={2}>
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

                    <Box display="flex" mb={3}>
                        <Typography width={120}>{language['search.drawer.stack.title'] as string}</Typography>
                        <TextField rows={4} fullWidth onChange={onTitleChange} />
                    </Box>

                    <Button disabled={loadingVideo} variant="contained" fullWidth onClick={handleDispatchMakeVideo}>
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
                        <Button href={twitterShareURL} target="_blank" variant="outlined" startIcon={<XIcon />}>
                            {language['search.shareOnTwitter'] as string}
                        </Button>
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
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={!isLogged || selected.length === 0}
                        onClick={modalSwitch.activate}
                    >
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
                            <Box position="relative" key={asset._id}>
                                <Box width={160} height={160}>
                                    <MediaRenderer src={`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`} fallbackSrc={`'https://via.placeholder.com/` + 160} />
                                </Box>
                                <Box bgcolor="white" sx={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1 }}>
                                    <IconTrash
                                        cursor="pointer"
                                        color="red"
                                        width={20}
                                        onClick={() => onRemove(asset)}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

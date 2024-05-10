import { useEffect, useState } from 'react';
import { Box, Button, Typography, Drawer, TextField, useMediaQuery, Theme, IconButton } from '@mui/material';
import { useI18n } from '@/app/hooks/useI18n';
import { useDispatch } from 'react-redux';
import { Asset } from '@/features/assets/types';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { useSelector } from '@/store/hooks';
import { actions as actionsCreator } from '@/features/creator';
import { useToggle } from '@/app/hooks/useToggle';
import { MediaRenderer } from '../MediaRenderer';
import DeleteIcon from '@mui/icons-material/Delete';
import { PublishStackModal } from './PublishStackModal';

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
    const [statedLogin, setStatedLogin] = useState(false);

    const isLogged = useSelector((state) => state.creator.token !== '');
    const { loading, wasSended } = useSelector((state) => state.creator);

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    useEffect(() => {
        if (isLogged) {
            setStatedLogin(false);
        }
    }, [isLogged]);

    return (
        <>
            <PublishStackModal
                isOpen={modalSwitch.isActive}
                onClose={modalSwitch.deactivate}
                selectedAssets={selected}
            />

            <Drawer anchor="right" open={drawerStackOpen} onClose={onClose}>
                <Box width={mdUp ? 400 : 224} p={4}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                            if (isLogged) {
                                modalSwitch.toggle();
                            } else {
                                setStatedLogin(true);
                            }
                        }}
                        disabled={statedLogin && !isLogged}
                    >
                        {!isLogged ? 'Login with your email' : 'Publish Stack'}
                    </Button>

                    {!isLogged && (
                        <>
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
                                        disabled={loading}
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
                                        disabled={loading}
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

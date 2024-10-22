import { useCallback, useEffect, useState } from 'react';
import update from 'immutability-helper';
import { Box, Button, Typography, Drawer, TextField, useMediaQuery, Theme, IconButton } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useI18n } from '@/app/hooks/useI18n';
import { useDispatch } from 'react-redux';
import { Asset } from '@/features/assets/types';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { useSelector } from '@/store/hooks';
import { actions as actionsCreator } from '@/features/creator';
import { actions as actionsAssets } from '@/features/assets';
import { useToggle } from '@/app/hooks/useToggle';
import { MediaRenderer } from '../MediaRenderer';
import DeleteIcon from '@mui/icons-material/Delete';
import { PublishStackModal } from './PublishStackModal';
import { CardDnd } from '../CardDnd';

interface Props {
    drawerStackOpen: boolean;
    onClose(): void;
}

function DrawerStack({ drawerStackOpen, onClose }: Props) {
    const dispatch = useDispatch();
    const { language } = useI18n();

    const curateStacks = useSelector((state) => state.assets.curateStacks);
    const isLogged = useSelector((state) => state.creator.token !== '');
    const { loading, wasSended } = useSelector((state) => state.creator);

    const modalSwitch = useToggle();
    const [cards, setCards] = useState<Asset[]>(curateStacks);
    const [statedLogin, setStatedLogin] = useState(false);

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    useEffect(() => {
        if (isLogged) {
            setStatedLogin(false);
        }
    }, [isLogged]);

    useEffect(() => setCards(curateStacks), [curateStacks]);

    useEffect(() => {
        dispatch(actionsAssets.setCurateStacks(cards));
    }, [cards]);

    const handleMoveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            })
        );
    }, []);

    const handleRemove = (asset: Asset) => {
        setCards((prevCards) => {
            const updated = prevCards.filter((item) => item._id !== asset._id);
            return updated;
        });
    };

    const renderCard = useCallback((asset: Asset, index: number) => {
        return (
            <CardDnd key={asset._id} index={index} id={asset._id} moveCard={handleMoveCard}>
                <Box width={160}>
                    <Box height={160} borderRadius="8px" position="relative">
                        <MediaRenderer
                            src={`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`}
                            fallbackSrc={`https://via.placeholder.com/${160}`}
                        />
                        <Box position="absolute" bottom={0} right={0} zIndex={1} m={1} bgcolor="#fff">
                            <IconButton style={{ color: 'red' }} size="small" onClick={() => handleRemove(asset)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                    {asset.assetMetadata?.context?.formData?.title && (
                        <Typography zIndex={100} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                            {asset.assetMetadata?.context?.formData?.title}
                        </Typography>
                    )}
                </Box>
            </CardDnd>
        );
    }, []);

    return (
        <>
            <PublishStackModal isOpen={modalSwitch.isActive} onClose={modalSwitch.deactivate} selectedAssets={cards} />

            <Drawer anchor="right" open={drawerStackOpen} onClose={onClose}>
                <Box width={mdUp ? 400 : 300} p={4}>
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

                    <Box mt={2} display="flex" gap={2} flexWrap="wrap" justifyContent={mdUp ? 'unset' : 'center'}>
                        {cards.length === 0 && (
                            <Typography>{language['search.drawer.stack.noSelectedAssets'] as string}</Typography>
                        )}
                        {cards.map((asset, i) => renderCard(asset, i))}
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export default function DrawerStackHoc({ drawerStackOpen, onClose }: Props) {
    return (
        <DndProvider backend={HTML5Backend}>
            <DrawerStack drawerStackOpen={drawerStackOpen} onClose={onClose} />
        </DndProvider>
    );
}

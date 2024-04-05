import { useState } from 'react';
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
} from '@mui/material';
import { useI18n } from '@/app/hooks/useI18n';
import Image from 'next/image';
import { IconTrash } from '@tabler/icons-react';

import { Asset } from '@/features/assets/types';
import { AWS_BASE_URL_S3 } from '@/constants/aws';

interface Props {
    drawerStackOpen: boolean;
    selected: Asset[];
    onRemove(asset: Asset): void;
    onClose(): void;
}

export function DrawerStack({ drawerStackOpen, selected, onRemove, onClose }: Props) {
    const { language } = useI18n();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
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
                        <Select fullWidth>
                            <MenuItem value={10}>{language['search.drawer.stack.imageGrid'] as string}</MenuItem>
                            <MenuItem value={20}>
                                {language['search.drawer.stack.interactiveGallery'] as string}
                            </MenuItem>
                            <MenuItem value={30}>{language['search.drawer.stack.videoGallery'] as string}</MenuItem>
                        </Select>
                    </Box>

                    <Box display="flex" mb={3}>
                        <Typography width={120}>{language['search.drawer.stack.title'] as string}</Typography>
                        <TextField rows={4} fullWidth />
                    </Box>

                    <Button variant="contained" fullWidth>
                        {language['search.drawer.stack.button.publish'] as string}
                    </Button>
                </Box>
            </Modal>

            <Drawer anchor="right" open={drawerStackOpen} onClose={onClose}>
                <Box width={mdUp ? 400 : 224} p={4}>
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={selected.length === 0}
                        onClick={() => setModalOpen(true)}
                    >
                        {language['search.drawer.stack.publishStack'] as string}
                    </Button>

                    <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                        {selected.length === 0 && (
                            <Typography>{language['search.drawer.stack.noSelectedAssets'] as string}</Typography>
                        )}
                        {selected.map((asset) => (
                            <Box position="relative" key={asset._id}>
                                <Image
                                    src={`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`}
                                    alt="img"
                                    width={160}
                                    height={160}
                                />
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

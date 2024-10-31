import { Box, IconButton, Modal, Typography } from '@mui/material';
import { IconX } from '@tabler/icons-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const BuyVUSDModal = ({ isOpen, onClose }: Props) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: '#6C3BAF',
                    opacity: 0.9,
                    p: 4,
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 80,
                        top: 15,
                        color: 'white',
                        zIndex: 1,
                    }}
                >
                    <IconX />
                </IconButton>
                <Box display={'flex'} gap={1}>
                    <Typography variant="h5">Hi</Typography>
                </Box>
            </Box>
        </Modal>
    );
};

export default BuyVUSDModal;

import { Box, Modal as MuiModal, Typography } from '@mui/material';

interface ModalProps {
    open: boolean;
    handleClose: () => void;
    link: string;
}

export default function ModalMinted({ open, handleClose, link }: ModalProps) {
    return (
        <MuiModal open={open} onClose={handleClose}>
            <Box
                onClick={(e) => e.target === e.currentTarget && handleClose()}
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Box width={400}>
                    <Typography
                        variant="h3"
                        style={{
                            backgroundColor: '#FF0066',
                            color: '#ffff',
                            borderRadius: 4,
                            borderEndEndRadius: 0,
                            textAlign: 'center',
                            padding: 10,
                        }}
                    >
                        Congrats! 🎉
                    </Typography>
                    <Box
                        padding={3}
                        display="flex"
                        flexDirection="column"
                        gap={5}
                        sx={{
                            backgroundColor: '#fff',

                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                        }}
                    >
                        <Typography variant="h6">
                            A Digital Asset of this artwork has been added to your wallet!
                        </Typography>

                        <a href={link} target="_blank" rel="noreferrer">
                            View Transaction
                        </a>
                    </Box>
                </Box>
            </Box>
        </MuiModal>
    );
}

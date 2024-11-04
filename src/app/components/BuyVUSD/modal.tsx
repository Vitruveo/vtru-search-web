import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    IconButton,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import ConnectWallet from '../ConnectWallet';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    data: {
        balance: number;
    };
}

const BuyVUSDModal = ({ isOpen, onClose, data }: Props) => {
    const { balance } = data;

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value && parseInt(value) < 1) {
            event.target.value = '1';
        }
    };

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

                <Box display={'flex'} justifyContent={'space-between'} paddingInline={14}>
                    <Typography variant="h2">Balance: {balance}</Typography>
                    <Typography variant="h1" fontWeight={'900'} sx={{ fontSize: '3rem' }}>
                        Buy VUSD
                    </Typography>
                    <ConnectWallet size="large" rounded />
                </Box>

                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} height={'90%'}>
                    <Box display={'flex'} alignItems={'center'} gap={8} justifyContent={'center'}>
                        <Typography variant="h1" sx={{ fontSize: '8rem' }}>
                            BUY
                        </Typography>
                        <TextField
                            type="number"
                            inputProps={{ min: 1 }}
                            onChange={handleChangeQuantity}
                            sx={{
                                width: '480px',
                                '& .MuiInputBase-input': {
                                    fontSize: '110px',
                                    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                        display: 'none',
                                    },
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                            }}
                        />
                        <Typography variant="h1" sx={{ fontSize: '8rem' }}>
                            VUSD
                        </Typography>
                    </Box>

                    <Box display={'flex'} justifyContent={'center'} marginBlock={10}>
                        <FormControl>
                            <RadioGroup sx={{ gap: 10, width: '580px' }}>
                                <Box display={'flex'}>
                                    <FormControlLabel
                                        value="USDC"
                                        control={<Radio sx={{ transform: 'scale(3)', marginInline: 3 }} />}
                                        label="USDC"
                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '4rem' } }}
                                    />
                                    <Typography variant="h1" sx={{ fontSize: '4rem' }}>
                                        20
                                    </Typography>
                                </Box>
                                <Box display={'flex'}>
                                    <FormControlLabel
                                        value="VTRU"
                                        control={<Radio sx={{ transform: 'scale(3)', marginInline: 3 }} />}
                                        label="VTRU"
                                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '4rem' } }}
                                    />
                                    <Typography variant="h1" sx={{ fontSize: '4rem' }}>
                                        20
                                    </Typography>
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box display={'flex'} justifyContent={'center'} width={'95%'}>
                        <Button variant="contained" color="primary" sx={{ fontSize: '3rem', width: '480px' }}>
                            BUY
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default BuyVUSDModal;

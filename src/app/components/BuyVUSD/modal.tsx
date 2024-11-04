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
        currentChain?: string;
    };
}

const BuyVUSDModal = ({ isOpen, onClose, data }: Props) => {
    const { balance, currentChain } = data;

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value && parseInt(value) < 1) {
            event.target.value = '1';
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose} sx={{ zIndex: 9999 }}>
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: '#6C3BAF',
                    opacity: 0.9,
                    p: 4,
                    height: '100%',
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 50,
                        top: 40,
                        color: 'white',
                        zIndex: 1,
                    }}
                >
                    <IconX size={'2rem'} />
                </IconButton>

                <Box display={'flex'} justifyContent={'space-between'} paddingInline={14}>
                    <Typography variant="h2">Balance: {balance}</Typography>
                    <Typography variant="h1" fontWeight={'900'} sx={{ fontSize: '3rem' }}>
                        Buy VUSD
                    </Typography>
                    <ConnectWallet size="large" rounded />
                </Box>

                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} height={'90%'}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3}>
                        <Typography variant="h1" width={'8%'} fontSize={'4rem'} textAlign={'end'}>
                            BUY
                        </Typography>
                        <TextField
                            type="number"
                            inputProps={{ min: 1 }}
                            defaultValue={50}
                            onChange={handleChangeQuantity}
                            sx={{
                                width: '24%',
                                '& .MuiInputBase-input': {
                                    textAlign: 'end',
                                    fontSize: '3rem',
                                    fontWeight: 'bold',
                                    paddingInline: 4,
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
                        <Typography variant="h1" width={'8%'} fontSize={'4rem'}>
                            VUSD
                        </Typography>
                    </Box>

                    <Box display={'flex'} marginBlock={6} width={'100%'} justifyContent={'center'}>
                        <FormControl sx={{ width: '24%' }}>
                            <RadioGroup sx={{ gap: 6 }}>
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <FormControlLabel
                                        value="USDC"
                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }} />}
                                        label="USDC"
                                        sx={{
                                            width: '52%',
                                            margin: currentChain?.toLowerCase().includes('vitruveo') ? '' : 0,
                                            '& .MuiFormControlLabel-label': { fontSize: '2rem' },
                                            '& .MuiRadio-root': {
                                                display: currentChain?.toLowerCase().includes('vitruveo')
                                                    ? 'block'
                                                    : 'none',
                                            },
                                        }}
                                    />
                                    <Box bgcolor={'#1a1a1a'} width={'100%'}>
                                        <Typography variant="h1" fontSize={'2rem'} paddingBlock={1} paddingInline={2}>
                                            50
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    display={currentChain?.toLowerCase()?.includes('vitruveo') ? 'flex' : 'none'}
                                    justifyContent={'space-between'}
                                >
                                    <FormControlLabel
                                        value="VTRU"
                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }} />}
                                        label="VTRU"
                                        sx={{
                                            width: '52%',
                                            '& .MuiFormControlLabel-label': { fontSize: '2rem' },
                                        }}
                                    />
                                    <Box bgcolor={'#1a1a1a'} width={'100%'}>
                                        <Typography variant="h1" fontSize={'2rem'} paddingBlock={1} paddingInline={2}>
                                            200
                                        </Typography>
                                    </Box>
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box display={'flex'} justifyContent={'center'}>
                        <Button variant="contained" color="primary" sx={{ fontSize: '2rem', width: '24%' }}>
                            BUY
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default BuyVUSDModal;

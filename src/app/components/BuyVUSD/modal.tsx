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
    Theme,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import ConnectWallet from '../ConnectWallet';
import { defaultVusdAmount } from './modalHOC';
import { formatPriceVUSD } from '@/utils/assets';
import { useTheme } from '@mui/material/styles';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    data: {
        balance: {
            symbol?: string;
            value: string;
        };
        balanceVUSD: {
            symbol: string;
            value: number;
        };
        currentChain?: string;
        isConnected: boolean;
        selectedValue: string;
        usdcConverted: number;
        vtruConverted: number;
        insufficientBalance: boolean;
        disabled: boolean;
        loading: boolean;
        loadingConversion: boolean;
    };
    actions: {
        handleChangeQuantity: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleBlurQuantity: (event: React.FocusEvent<HTMLInputElement>) => void;
        handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleBuy: () => void;
    };
}

const BuyVUSDModal = ({ isOpen, onClose, data, actions }: Props) => {
    const theme = useTheme();
    const {
        balance,
        balanceVUSD,
        currentChain,
        isConnected,
        selectedValue,
        usdcConverted,
        vtruConverted,
        insufficientBalance,
        disabled,
        loading,
        loadingConversion,
    } = data;
    const { handleChangeQuantity, handleBlurQuantity, handleRadioChange, handleBuy } = actions;

    const lgUp = useMediaQuery((mq: Theme) => mq.breakpoints.up('lg'));
    const mdUp = useMediaQuery((mq: Theme) => mq.breakpoints.up('md'));
    const smUp = useMediaQuery((mq: Theme) => mq.breakpoints.up('sm'));

    const buttonMessage = () => {
        if (!isConnected) return 'Connect Wallet';
        if (insufficientBalance) return 'Insufficient Balance';
        if (loading) return 'Waiting for transaction...';
        if (loadingConversion) return 'Converting...';
        return 'BUY';
    };

    return (
        <Modal open={isOpen} onClose={onClose} sx={{ zIndex: 9999 }}>
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: '#6C3BAF',
                    opacity: 1,
                    p: 4,
                    height: '100%',
                    overflowY: 'auto',
                }}
            >
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    flexDirection={mdUp ? 'row' : 'column-reverse'}
                    gap={3}
                    alignItems={'center'}
                    paddingInline={lgUp ? 14 : 0}
                >
                    <Box>
                        <Typography
                            variant="h2"
                            display={currentChain?.toLowerCase().includes('vitruveo') ? 'block' : 'none'}
                            fontSize={smUp ? '4vh' : '3vh'}
                            lineHeight={smUp ? '5vh' : '4vh'}
                        >
                            VTRU Balance: {isConnected ? `${balance.value}` : 'Connect Wallet'}
                        </Typography>
                        <Typography
                            variant="h2"
                            display={currentChain?.toLowerCase().includes('vitruveo') ? 'block' : 'none'}
                            fontSize={smUp ? '4vh' : '3vh'}
                            lineHeight={smUp ? '5vh' : '4vh'}
                        >
                            VUSD Balance:{' '}
                            {isConnected
                                ? `${formatPriceVUSD({
                                      price: balanceVUSD.value,
                                      decimals: false,
                                  })} `
                                : 'Connect Wallet'}
                        </Typography>
                        <Typography
                            variant="h2"
                            display={currentChain?.toLowerCase().includes('vitruveo') ? 'none' : 'block'}
                        >
                            USDC Balance:{' '}
                            {isConnected
                                ? `${formatPriceVUSD({
                                      price: Number(balance.value),
                                      decimals: false,
                                  })} `
                                : 'Connect Wallet'}
                        </Typography>
                    </Box>
                    <Typography
                        variant="h1"
                        textAlign="center"
                        fontWeight="900"
                        fontSize={smUp ? '5vh' : '4vh'}
                        lineHeight="4rem"
                    >
                        Buy VUSD
                    </Typography>
                    <Box display={'flex'} alignItems={'center'}>
                        <ConnectWallet size={'large'} rounded />
                        <IconButton aria-label="close" onClick={onClose} sx={{ color: 'white' }}>
                            <IconX size={smUp ? '4vh' : '3vh'} />
                        </IconButton>
                    </Box>
                </Box>

                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    marginTop={smUp ? '10vh' : '4vh'}
                >
                    <Box
                        display={'flex'}
                        flexDirection={smUp ? 'row' : 'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        gap={3}
                    >
                        <Typography
                            variant="h1"
                            width={'100%'}
                            fontSize={smUp ? '5vh' : '4vh'}
                            textAlign={smUp ? 'end' : 'center'}
                        >
                            BUY
                        </Typography>
                        <TextField
                            type="number"
                            inputProps={{ min: 1 }}
                            defaultValue={defaultVusdAmount}
                            onChange={handleChangeQuantity}
                            onBlur={handleBlurQuantity}
                            autoComplete="off"
                            sx={{
                                width: lgUp ? '70%' : '100%',
                                '& .MuiInputBase-input': {
                                    textAlign: 'end',
                                    fontSize: smUp ? '5vh' : '4vh',
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
                        <Typography
                            variant="h1"
                            width={'100%'}
                            fontSize={smUp ? '5vh' : '4vh'}
                            textAlign={smUp ? 'start' : 'center'}
                        >
                            VUSD
                        </Typography>
                    </Box>

                    <Box display={'flex'} marginBlock={6} width={'100%'} justifyContent={'center'}>
                        <FormControl sx={{ width: lgUp ? '25.5%' : mdUp ? '52%' : '100%' }}>
                            <RadioGroup sx={{ gap: 6 }} value={selectedValue} onChange={handleRadioChange}>
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <FormControlLabel
                                        value="USDC"
                                        control={
                                            <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: smUp ? '5vh' : '4vh' } }} />
                                        }
                                        label="USDC"
                                        sx={{
                                            width: smUp ? '52%' : '100%',
                                            margin: currentChain?.toLowerCase().includes('vitruveo') ? '' : 0,
                                            '& .MuiFormControlLabel-label': { fontSize: smUp ? '5vh' : '4vh' },
                                            '& .MuiRadio-root': {
                                                display: currentChain?.toLowerCase().includes('vitruveo')
                                                    ? 'block'
                                                    : 'none',
                                            },
                                        }}
                                    />
                                    <Box bgcolor={'#1a1a1a'} width={'100%'}>
                                        <Typography
                                            variant="h1"
                                            fontSize={smUp ? '5vh' : '4vh'}
                                            paddingBlock={smUp ? '4vh' : '1vh'}
                                            paddingInline={smUp ? '2vh' : '1vh'}
                                        >
                                            {usdcConverted}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    display={!currentChain?.toLowerCase().includes('vitruveo') ? 'none' : 'flex'}
                                    justifyContent={'space-between'}
                                >
                                    <FormControlLabel
                                        value="VTRU"
                                        control={
                                            <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: smUp ? '5vh' : '4vh' } }} />
                                        }
                                        label="VTRU"
                                        sx={{
                                            width: smUp ? '52%' : '100%',
                                            '& .MuiFormControlLabel-label': { fontSize: smUp ? '5vh' : '4vh' },
                                        }}
                                    />
                                    <Box bgcolor={'#1a1a1a'} width={'100%'}>
                                        <Typography
                                            variant="h1"
                                            fontSize={smUp ? '5vh' : '4vh'}
                                            paddingBlock={smUp ? '1vh' : '0.5vh'}
                                            paddingInline={smUp ? '2vh' : '1vh'}
                                        >
                                            {vtruConverted}
                                        </Typography>
                                    </Box>
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box display={'flex'} justifyContent={'center'}>
                        <Button
                            variant="contained"
                            sx={{
                                fontSize: smUp ? '5vh' : '4vh',
                                width: lgUp ? '25.5%' : mdUp ? '52%' : '100%',
                                background: theme.palette.primary.main,
                                '&:hover': {
                                    background: theme.palette.primary.main,
                                },
                            }}
                            disabled={disabled}
                            onClick={handleBuy}
                        >
                            {buttonMessage()}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default BuyVUSDModal;

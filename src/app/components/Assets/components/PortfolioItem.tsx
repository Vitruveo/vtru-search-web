import { Box, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { IconPlus, IconWallet } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';
import { useI18n } from '@/app/hooks/useI18n';

interface PortfolioItemProps {
    wallets: string[];
    handleAddWallet?: () => void;
    onRemove?: (index: number) => void;
}

export default function PortfolioItem({ wallets, handleAddWallet, onRemove }: PortfolioItemProps) {
    const theme = useTheme();
    const { language } = useI18n();

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        if (e.target.value === '') onRemove?.(index);
    };

    return (
        <>
            {wallets?.map((wallet, index) => (
                <Box key={index} display={'flex'} alignItems={'center'} gap={2} mb={1}>
                    <OutlinedInput
                        id="outlined-portofolio"
                        placeholder={language['search.assetFilter.portfolio.placeholder'] as string}
                        size="small"
                        type="search"
                        color="primary"
                        value={wallet}
                        notched
                        fullWidth
                        onChange={(e) => handleChangeValue(e, index)}
                    />
                    <InputAdornment position="start">
                        <IconWallet />
                    </InputAdornment>
                </Box>
            ))}
            <Box display={'flex'} alignItems={'center'} gap={2}>
                <IconButton
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        padding: '10px',
                        borderRadius: '5px',
                    }}
                    onClick={handleAddWallet}
                >
                    <IconPlus size={15} />
                </IconButton>
                <Typography variant="inherit">
                    {language['search.assetFilter.portfolio.addButton'] as string}
                </Typography>
            </Box>
        </>
    );
}

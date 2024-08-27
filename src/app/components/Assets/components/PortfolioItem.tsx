import { Box, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { IconPlus, IconWallet } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';
import { useI18n } from '@/app/hooks/useI18n';
import { useRef } from 'react';

interface PortfolioItemProps {
    handleAddWallet: (value?: string) => void;
}

export default function PortfolioItem({ handleAddWallet }: PortfolioItemProps) {
    const theme = useTheme();
    const { language } = useI18n();
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <Box display={'flex'} alignItems={'center'} gap={2} mb={1}>
                <OutlinedInput
                    id="outlined-portofolio"
                    placeholder={language['search.assetFilter.portfolio.placeholder'] as string}
                    size="small"
                    type="search"
                    color="primary"
                    notched
                    fullWidth
                    inputRef={inputRef}
                />
                <InputAdornment position="start">
                    <IconWallet />
                </InputAdornment>
            </Box>

            <Box display={'flex'} alignItems={'center'} gap={2}>
                <IconButton
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        padding: '10px',
                        borderRadius: '5px',
                    }}
                    onClick={() => {
                        handleAddWallet(inputRef.current?.value);
                        inputRef.current!.value = '';
                    }}
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

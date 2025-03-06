import { Box, Grid, Theme, Typography, useMediaQuery } from '@mui/material';

interface PanelMintInfoProps {
    title: string;
    color?: string;
    content: string;
    disable?: boolean;
}

const colors = {
    gray: '#999999',
};

export default function PanelMintInfo({ title, content, color, disable = false }: PanelMintInfoProps) {
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.down('sm'));

    return (
        <Grid container spacing={2} style={{ justifyContent: 'space-between' }}>
            <Grid item sm={6}>
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    style={{
                        fontSize: smUp ? 15 : 22,
                        whiteSpace: 'nowrap',
                        wordBreak: 'break-all',
                        color: disable ? '#DEDEDE' : color || 'unset',
                    }}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid item sm={6}>
                <Box display="flex" gap={1} justifyContent={'flex-end'} marginRight={smUp ? 3.2 : 4.2}>
                    <Typography
                        variant="body1"
                        style={{
                            fontSize: smUp ? 15 : 22,
                            wordBreak: 'keep-all',
                            overflowWrap: 'normal',
                            color: disable ? '#DEDEDE' : color || 'unset',
                        }}
                    >
                        {content}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

import { Box, Grid, Typography } from '@mui/material';

interface PanelMintInfoProps {
    title: string;
    content: string;
    disable?: boolean;
}

const colors = {
    gray: '#999999',
};

export default function PanelMintInfo({ title, content, disable = false }: PanelMintInfoProps) {
    return (
        <Grid container spacing={2} style={{ justifyContent: 'space-between' }}>
            <Grid item xs={8} sm={2}>
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    style={{ whiteSpace: 'nowrap', wordBreak: 'break-all', color: disable ? colors.gray : 'unset' }}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Box display="flex" gap={1} justifyContent={'flex-end'} maxWidth={120}>
                    <Typography
                        variant="body1"
                        style={{
                            wordBreak: 'keep-all',
                            overflowWrap: 'normal',
                            color: disable ? colors.gray : 'unset',
                        }}
                    >
                        {content}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

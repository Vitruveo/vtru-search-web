import { Card, Grid, Typography } from '@mui/material';

interface AboutProps {
    data?: string;
}

export const About = ({ data }: AboutProps) => {
    if (!data) return null;
    return (
        <>
            <Grid item xs={12}>
                <Typography
                    variant="h6"
                    style={{
                        backgroundColor: '#777777',
                        color: '#ffff',
                        textIndent: 10,
                        paddingBlock: 15,
                        paddingInline: 6,
                        height: 45,
                    }}
                >
                    About
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
                        {data}
                    </Typography>
                </Card>
            </Grid>
        </>
    );
};

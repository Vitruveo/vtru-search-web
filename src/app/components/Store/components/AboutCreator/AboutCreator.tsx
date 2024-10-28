import { Box, Button, Card, Grid, Skeleton, Typography } from '@mui/material';
import Avatar from '../../../Assets/components/Avatar';
import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { Creators } from '../../../Assets/types';
import AboutCreatorTable from './AboutCreatorTable';

interface AboutCreatorProps {
    data?: Creators[];
    creatorLoading: boolean;
    creatorAvatar: string;
}

export default function AboutCreator({ data, creatorAvatar, creatorLoading }: AboutCreatorProps) {
    if (!data?.length) return null;

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
                    About the artist
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Card style={{ borderRadius: 0 }}>
                    <Grid container spacing={6}>
                        <Grid item xs={12} display={'flex'} gap={2}>
                            <Box>
                                {!creatorLoading ? (
                                    <Avatar
                                        baseUrl={GENERAL_STORAGE_URL}
                                        path={creatorAvatar}
                                        format="square"
                                        size="large"
                                    />
                                ) : (
                                    <Skeleton
                                        variant="rectangular"
                                        width={100}
                                        height={100}
                                        animation="wave"
                                        sx={{ bgcolor: 'grey.900' }}
                                    />
                                )}
                                {data[0]?.profileUrl && (
                                    <Box mt={1}>
                                        <Button
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#FF0066',
                                                },
                                            }}
                                            fullWidth
                                            href={data![0].profileUrl}
                                            target="_blank"
                                        >
                                            More
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                            <Grid flexDirection={'column'}>
                                <Typography variant="body1">{data[0].bio}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <AboutCreatorTable content={data[0]} />
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </>
    );
}

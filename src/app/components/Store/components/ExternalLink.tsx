import { Grid, Typography } from '@mui/material';
import { IconExternalLink } from '@tabler/icons-react';

interface ExternalLinkProps {
    title: string | string[];
    content: [string, string][] | null;
}

export default function ExternalLink({ title, content }: ExternalLinkProps) {
    if (!content || content.length === 0 || !content[0][0]) return null;

    return (
        <Grid container spacing={2} style={{ paddingTop: 0, paddingBottom: 10, justifyContent: 'space-between' }}>
            <Grid item xs={8} sm={2}>
                <Typography variant="body1" fontWeight="bold" style={{ whiteSpace: 'nowrap', wordBreak: 'break-all' }}>
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Grid container display={'flex'} gap={1}>
                    {content.map((item, index) => (
                        <Typography
                            key={index}
                            variant="body1"
                            style={{
                                wordWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {item[1] && (
                                <IconExternalLink
                                    onClick={() => window.open(`${item[1]}`, '_blank')}
                                    style={{ cursor: 'pointer', color: '#777777', marginRight: 4 }}
                                    size={20}
                                />
                            )}
                            {item[0]}
                        </Typography>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

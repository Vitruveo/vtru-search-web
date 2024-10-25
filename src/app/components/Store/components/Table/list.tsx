import { Grid, Paper, Typography } from '@mui/material';

interface TableListProps {
    content: string[];
    displayColor?: boolean;
    tags?: boolean;
    exhibition?: boolean;
    url?: boolean;
}

export default function TableList({
    content,
    displayColor,
    tags,
    url,
    exhibition,
}: TableListProps) {
    return (
        <>
            {content.map((item, index) => {
                const isHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(item);
                const color = isHex ? item : `rgb(${item})`;

                return (
                    <Grid item key={index}>
                        <Grid item>
                            {displayColor && (
                                <Paper
                                    sx={{
                                        backgroundColor: color,
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            )}
                        </Grid>
                        <Grid item>
                            {tags && (
                                <Paper
                                    sx={{
                                        padding: 1,
                                        border: '1px solid #a1a1a1',
                                    }}
                                >
                                    {item}
                                </Paper>
                            )}
                        </Grid>
                        {url && (
                            <a
                                href={item}
                                target='_blank'
                                rel='noreferrer'
                                style={{
                                    textDecoration: 'underline',
                                    color: 'inherit',
                                    wordBreak: 'break-all',
                                }}
                            >
                                {item}
                            </a>
                        )}
                        {exhibition && <Typography variant='body1'>{item}</Typography>}
                        {!tags && !url && !exhibition && !displayColor && (
                            <Typography variant='body1'>
                                {index === content.length - 1 ? item : item + ', '}
                            </Typography>
                        )}
                    </Grid>
                );
            })}
        </>
    );
}

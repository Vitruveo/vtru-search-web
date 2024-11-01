import { Grid, Typography } from '@mui/material';
import TableList from './list';

interface TableProps {
    title: string;
    content: string | string[];
    displayColor?: boolean;
    tags?: boolean;
    exhibition?: boolean;
    url?: boolean;
    color?: 'black' | 'gray';
    align?: 'left' | 'right';
    maxWidth?: number;
}

export default function Table({
    title,
    content,
    displayColor = false,
    tags = false,
    exhibition = false,
    url = false,
    align = 'left',
    maxWidth,
}: TableProps) {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;

    const formatTitle = (word: string) => {
        if (word[2] === ' ') {
            return word.substring(0, 2).toUpperCase() + word.substring(2);
        }
        return word;
    };

    return (
        <Grid container spacing={2} display={'flex'} justifyContent={'space-between'}>
            <Grid item xs={8} sm={2}>
                <Typography variant="body1" fontWeight="bold" style={{ whiteSpace: 'nowrap', wordBreak: 'break-all' }}>
                    {formatTitle(title)}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Grid container display={'flex'} gap={1}>
                    {Array.isArray(content) && (
                        <TableList
                            content={content}
                            exhibition={exhibition}
                            url={url}
                            displayColor={displayColor}
                            tags={tags}
                        />
                    )}
                </Grid>
                <Typography
                    variant="body1"
                    style={{
                        wordWrap: 'break-word',
                        textAlign: align,
                        ...(maxWidth && { maxWidth }),
                    }}
                >
                    {!Array.isArray(content) &&
                        typeof content === 'string' &&
                        (url ? (
                            <a
                                href={content}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    textDecoration: 'underline',
                                    color: 'inherit',
                                    wordBreak: 'break-all',
                                }}
                            >
                                {content}
                            </a>
                        ) : (
                            content
                        ))}
                </Typography>
            </Grid>
        </Grid>
    );
}

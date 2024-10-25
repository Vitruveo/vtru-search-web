import { formatDate } from '@/utils/assets';
import { Box, Card, Typography } from '@mui/material';

export interface ActivityProps {
    listing: {
        title: string;
        date: Date | string;
        link?: {
            url: string;
            text: string;
        };
        extra?: {
            url: string;
            text: string;
        };
    }[];
}

export default function Activity({ listing }: ActivityProps) {
    const formattedDate = (date: string | Date) => {
        const parsedDate = new Date(date);
        const day = parsedDate.getUTCDate();
        const month = parsedDate.getUTCMonth();
        const year = parsedDate.getUTCFullYear();
        return formatDate({ day, month, year });
    };

    return (
        <div style={{ marginTop: '1px' }}>
            <Typography
                variant="h6"
                style={{
                    backgroundColor: '#777777',
                    color: '#ffff',
                    textIndent: 10,
                    paddingTop: 15,
                    paddingLeft: 6,
                    height: 45,
                }}
            >
                Activity
            </Typography>
            <Card style={{ borderRadius: 0 }}>
                {listing.length > 0 ? (
                    listing
                        .filter((item) => item.date)
                        .map((item, index) => (
                            <Box key={index} display="grid" gridTemplateColumns="1fr 1fr 1fr">
                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    style={{ whiteSpace: 'nowrap', wordBreak: 'break-all' }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    style={{
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    {formattedDate(item.date)}
                                </Typography>
                                <Box display="flex" gap={3}>
                                    {item.link?.text && item.link?.url && (
                                        <a
                                            href={item.link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            {item.link.text}
                                        </a>
                                    )}
                                    {item.extra?.text && item.extra?.url && (
                                        <a
                                            href={item.extra.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            {item.extra.text}
                                        </a>
                                    )}
                                </Box>
                            </Box>
                        ))
                ) : (
                    <></>
                )}
            </Card>
        </div>
    );
}

import { STORES_STORAGE_URL } from '@/constants/aws';
import { Box, Typography } from '@mui/material';

interface Props {
    data: {
        path?: string;
        description?: string;
        name?: string;
    };
}

const Banner = ({ data }: Props) => {
    return (
        <Box display="flex" flexDirection="column" gap={4} mb={6}>
            {data?.path && (
                <Box width="97.8%" position="relative">
                    <img
                        src={`${STORES_STORAGE_URL}/${data.path}`}
                        alt="banner"
                        width="100%"
                        height="100%"
                        style={{
                            maxHeight: 500,
                        }}
                    />
                </Box>
            )}
            <Typography fontSize={'1.4rem'} lineHeight={1.5}>
                {data?.description}
            </Typography>
        </Box>
    );
};

export default Banner;

import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface Props {
    data: {
        path: string;
        description?: string;
        name?: string;
    };
}

const Banner = ({ data }: Props) => {
    return (
        <Box>
            <Typography variant={'h4'}>{data.name}</Typography>
            <Image src={`${GENERAL_STORAGE_URL}/${data.path}`} alt="banner" width={600} height={400} />
            <Typography variant={'h5'}>{data.description}</Typography>
        </Box>
    );
};

export default Banner;

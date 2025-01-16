import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface Props {
    data: {
        path: string;
        description?: string;
    };
}

const Banner = ({ data }: Props) => {
    return (
        <Box>
            <Image src={`${GENERAL_STORAGE_URL}/${data.path}`} alt="banner" layout="fill" objectFit="cover" />
            <Typography variant={'h5'}>{data.description}</Typography>
        </Box>
    );
};

export default Banner;

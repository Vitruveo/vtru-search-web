import { STORES_STORAGE_URL } from '@/constants/aws';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

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
            {data.path && (
                <Box width="98.8%" position="relative" height={500}>
                    <Image
                        src={`${STORES_STORAGE_URL}/${data.path}`}
                        alt="banner"
                        layout="fill" // Faz a imagem preencher o container pai
                        objectFit="cover" // Ajusta o comportamento para cobrir o container pai
                        quality={100}
                        priority
                    />
                </Box>
            )}
            <Typography fontSize={'1.4rem'}>{data.description}</Typography>
        </Box>
    );
};

export default Banner;

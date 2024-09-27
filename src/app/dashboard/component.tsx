import { DashboardState } from '@/features/dashboard/types';
import { Box, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

interface DashboardProps {
    data: DashboardState;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Dashboard = ({ data }: DashboardProps) => {
    const [value, setValue] = useState<Value>([new Date(), new Date()]);
    if (data.loading) return <Loading />;

    return (
        <Box>
            <Box display={'flex'} justifyContent={'center'} gap={8} mt={4}>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    width={'15%'}
                    p={2}
                    sx={{ background: 'linear-gradient(to right, #0000FF, #00FFFF)' }}
                >
                    <Box mt={10}>
                        <Typography variant="h1">{data.arts}</Typography>
                        <Typography>Arts</Typography>
                    </Box>
                    <Image src="/images/dashboard/nft_icon.svg" alt="Nft icon" width={70} height={70} />
                </Box>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    width={'15%'}
                    p={2}
                    sx={{ background: 'linear-gradient(to right, #800080, #DA70D6)' }}
                >
                    <Box mt={10}>
                        <Typography variant="h1" color="white">
                            {data.consigned}
                        </Typography>
                        <Typography color="white">Consigned arts</Typography>
                    </Box>
                    <Image src="/images/dashboard/consigned_icon.svg" alt="consigned icon" width={70} height={70} />
                </Box>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    width={'15%'}
                    p={2}
                    sx={{ background: 'linear-gradient(to right, #FF1493, #FF69B4)' }}
                >
                    <Box mt={10}>
                        <Typography variant="h1" color="white">
                            {data.activeConsigned}
                        </Typography>
                        <Typography color="white">Active consigned arts</Typography>
                    </Box>
                    <Image src="/images/dashboard/activeConsign_icon.svg" alt="consigned icon" width={70} height={70} />
                </Box>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    width={'15%'}
                    p={2}
                    sx={{ background: 'linear-gradient(to right, #FFA500, #FFD700)' }}
                >
                    <Box mt={10}>
                        <Typography variant="h1" color="white">
                            {data.artsSold}
                        </Typography>
                        <Typography color="white">Sold arts</Typography>
                    </Box>
                    <Image src="/images/dashboard/vtru.png" alt="consigned icon" width={70} height={70} />
                </Box>
            </Box>
            <DateRangePicker onChange={setValue} value={value} />
        </Box>
    );
};

function Loading() {
    return (
        <Box display="flex" justifyContent="center" alignItems={'center'} height={'100%'}>
            <CircularProgress size={160} />
        </Box>
    );
}
export default Dashboard;

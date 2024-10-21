import { DashboardState } from '@/features/dashboard/types';
import { Box, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import DashboardItem from './dashboardItem';

interface DashboardProps {
    data: DashboardState;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const DashboardList = ({ data }: DashboardProps) => {
    const { data: dashBoardData } = data;

    const [value, setValue] = useState<Value>([new Date(), new Date()]);
    if (data.loading) return <Loading />;

    const dashboardItems = [
        {
            title: 'Total arts',
            content: dashBoardData.arts,
            image: '/images/dashboard/nft_icon.svg',
            backgroundColor: 'linear-gradient(to right, #0000FF, #00FFFF)',
        },
        {
            title: 'Consigned arts',
            content: dashBoardData.consigned,
            image: '/images/dashboard/consigned_icon.svg',
            backgroundColor: 'linear-gradient(to right, #800080, #DA70D6)',
        },
        {
            title: 'Active consigned arts',
            content: dashBoardData.activeConsigned,
            image: '/images/dashboard/activeConsign_icon.svg',
            backgroundColor: 'linear-gradient(to right, #FF1493, #FF69B4)',
        },
        {
            title: 'Sold arts',
            content: dashBoardData.artsSold,
            image: '/images/dashboard/vtru.png',
            backgroundColor: 'linear-gradient(to right, #FFA500, #FFD700)',
        },
    ];

    return (
        <Box>
            <Box display={'flex'} justifyContent={'center'} gap={8} mt={4}>
                {dashboardItems.map((item) => (
                    <DashboardItem key={item.title} {...item} />
                ))}
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
export default DashboardList;

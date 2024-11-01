import { Creators } from '@/app/components/Assets/types';
import { countryHashMap } from '@/mock/countrydata';
import { Box } from '@mui/material';
import Table from '../Table';

interface AboutCreatorTableProps {
    content: Creators;
}

export default function AboutCreatorTable({ content }: AboutCreatorTableProps) {
    return (
        <Box display={'flex'} flexDirection={'column'} gap={1}>
            <Table title={'Name'} content={content.name} />
            <Table title={'Role'} content={content.roles} />
            <Table title={'Nationality'} content={countryHashMap[content.nationality as unknown as string]} />
            <Table title={'Profile url'} content={content.profileUrl} url />
        </Box>
    );
}

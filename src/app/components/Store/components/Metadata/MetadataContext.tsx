import { Context } from '@/app/components/Assets/types';
import { Box } from '@mui/material';
import Table from '../Table';

interface MetadataContextProps {
    content: Context;
}

export default function MetadataContext({ content }: MetadataContextProps) {
    return (
        <Box display={'flex'} flexDirection={'column'} gap={1} padding={2}>
            <Table title={'Title'} content={content.title} />
            <Table title={'Culture'} content={content.culture} />
            <Table title={'Color'} content={(content?.colors || []).filter(Boolean)} displayColor />
            <Table title={'Mood'} content={(content?.mood || []).filter(Boolean)} tags />
            <Table title={'Copyright'} content={content.copyright} />
            <Table title={'Orientation'} content={content.orientation} />
        </Box>
    );
}

import { Taxonomy } from '@/app/components/Assets/types';
import { Box } from '@mui/material';
import Table from '../Table';

interface MetadataTaxonomyProps {
    content: Taxonomy;
}

export default function MetadataTaxonomy({ content }: MetadataTaxonomyProps) {
    return (
        <Box display={'flex'} flexDirection={'column'} gap={1} padding={2}>
            <Table title={'Object type'} content={content.objectType} />
            <Table title={'Tags'} content={(content?.tags || []).filter(Boolean)} tags />
            <Table title={'Collections'} content={(content?.collections || []).filter(Boolean)} />
            <Table title={'AI generation'} content={content.aiGeneration} />
            <Table title={'AR enabled'} content={content.arenabled} />
            <Table title={'Nudity'} content={content.nudity} />
            <Table title={'Category'} content={content.category} />
            <Table title={'Medium'} content={(content?.medium || []).filter(Boolean)} />
            <Table title={'Style'} content={(content?.style || []).filter(Boolean)} />
            <Table title={'Subject'} content={(content?.subject || []).filter(Boolean)} />
        </Box>
    );
}

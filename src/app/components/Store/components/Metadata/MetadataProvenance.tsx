import { Provenance } from '@/app/components/Assets/types';
import { Box } from '@mui/material';
import Table from '../Table';
import { countryHashMap } from '@/mock/countrydata';
import ExternalLink from '../ExternalLink';

interface MetadataProvenanceProps {
    content: Provenance;
}

export default function MetadataProvenance({ content }: MetadataProvenanceProps) {
    return (
        <Box display={'flex'} flexDirection={'column'} gap={1} padding={2}>
            <Table title={'Category'} content={countryHashMap[content.country as unknown as string]} />
            <Table title={'Blockchain'} content={content.blockchain} />
            <ExternalLink
                title={'Exhibitions'}
                content={
                    content?.exhibitions
                        ? content.exhibitions.map(({ exhibitionName, exhibitionUrl }) => [
                              exhibitionName,
                              exhibitionUrl,
                          ])
                        : null
                }
            />
            <ExternalLink
                title={'Awards'}
                content={
                    content?.awards ? content.awards.map(({ awardName, awardUrl }) => [awardName, awardUrl]) : null
                }
            />
        </Box>
    );
}

import { Asset } from '@/features/assets/types';
import { Box } from '@mui/material';
import MetadataAccordion from './MetadataAccordion';
import MetadataContext from './MetadataContext';
import { Context, Provenance, Taxonomy } from '@/app/components/Assets/types';
import Description from '../Description';
import MetadataTaxonomy from './MetadataTaxonomy';
import MetadataProvenance from './MetadataProvenance';

interface MetadataListProps {
    asset: Asset;
    expandedAccordion: string | false;
    handleAccordionChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export default function MetadataList({ asset, expandedAccordion, handleAccordionChange }: MetadataListProps) {
    return (
        <Box>
            <MetadataAccordion
                title="Context"
                last={false}
                expanded={expandedAccordion === 'context'}
                onChange={handleAccordionChange('context')}
            >
                <MetadataContext content={asset.assetMetadata?.context.formData as Context} />
            </MetadataAccordion>
            <MetadataAccordion
                title="Description"
                last={false}
                expanded={expandedAccordion === 'description'}
                onChange={handleAccordionChange('description')}
            >
                <Description data={asset.mediaAuxiliary?.description} />
            </MetadataAccordion>
            <MetadataAccordion
                title="Taxonomy"
                last={false}
                expanded={expandedAccordion === 'taxonomy'}
                onChange={handleAccordionChange('taxonomy')}
            >
                <MetadataTaxonomy content={asset.assetMetadata?.taxonomy.formData as Taxonomy} />
            </MetadataAccordion>
            <MetadataAccordion
                title="Provenance"
                last={false}
                expanded={expandedAccordion === 'provenance'}
                onChange={handleAccordionChange('provenance')}
            >
                <MetadataProvenance content={asset.assetMetadata?.provenance.formData as unknown as Provenance} />
            </MetadataAccordion>
        </Box>
    );
}

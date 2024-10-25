import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { IconCaretUp } from '@tabler/icons-react';

interface MetadataAccordionProps {
    title: string;
    children: React.ReactNode;
    last?: boolean;
    expanded?: boolean;
    onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export default function MetadataAccordion({ title, children, last, expanded, onChange }: MetadataAccordionProps) {
    return (
        <Accordion expanded={expanded} onChange={onChange} disableGutters>
            <AccordionSummary
                expandIcon={<IconCaretUp color="#ffff" />}
                style={!last ? { backgroundColor: '#777777', marginBottom: '2px' } : { backgroundColor: '#777777' }}
            >
                <Typography variant="h6" color={'#ffff'}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
}

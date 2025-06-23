import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { IconCaretDown } from '@tabler/icons-react';

interface MetadataAccordionProps {
    title: string;
    children: React.ReactNode;
    last?: boolean;
    expanded?: boolean;
    onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export default function MetadataAccordion({ title, children, last, expanded, onChange }: MetadataAccordionProps) {
    return (
        <Accordion expanded={expanded} onChange={onChange} disableGutters style={{ padding: 0 }}>
            <AccordionSummary
                expandIcon={<IconCaretDown color="#ffff" />}
                style={!last ? { backgroundColor: '#777777', marginBottom: '2px' } : { backgroundColor: '#777777' }}
            >
                <Typography variant="h6" color={'#ffff'}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0 }}>{children}</AccordionDetails>
        </Accordion>
    );
}

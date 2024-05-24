import { useToggle } from '@/app/hooks/useToggle';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Paper } from '@mui/material';
import { IconMenu2 } from '@tabler/icons-react';

interface AssetFilterAccordionProps {
    title: string;
    children: React.ReactNode;
    numberOfFilters?: number;
}

export const AssetFilterAccordion = ({ title, children, numberOfFilters }: AssetFilterAccordionProps) => {
    const { toggle, isActive: expanded } = useToggle();

    return (
        <Accordion expanded={expanded} onChange={toggle}>
            <AccordionSummary>
                <Box width="100%" display="flex" justifyContent="space-between">
                    <Typography fontSize="1.2rem" fontWeight="700">
                        {title}
                    </Typography>
                    <Box display="flex" gap={10}>
                        {numberOfFilters && (
                            <Paper
                                variant="elevation"
                                sx={{
                                    backgroundColor: '#00d6f4',
                                    color: 'white',
                                    borderRadius: 10,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '0.2rem 0.6rem',
                                }}
                            >
                                <Typography fontSize="0.8rem" fontWeight="700">
                                    {numberOfFilters}
                                </Typography>
                            </Paper>
                        )}
                        <IconMenu2
                            size="20"
                            style={{
                                transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s',
                            }}
                        />
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box mb={2}>{children}</Box>
            </AccordionDetails>
        </Accordion>
    );
};

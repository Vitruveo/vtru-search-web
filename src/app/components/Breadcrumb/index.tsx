import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    params: {
        username?: string;
        assetId?: string;
        segmentId?: string;
        categoryId?: string;
    };
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, params }) => {
    return (
        <Box display="flex" alignItems="center" gap={1}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {item.href ? (
                        <Link
                            href={item.href.replace(/\{(\w+)\}/g, (_, key) => params[key as keyof typeof params] || '')}
                        >
                            <Typography color="#ffffff" fontSize={['1rem', '1.25rem']}>
                                {item.label}
                            </Typography>
                        </Link>
                    ) : (
                        <Typography color="#ffffff" fontSize={['1rem', '1.25rem']}>
                            {item.label}
                        </Typography>
                    )}

                    {index < items.length - 1 && <span>&#x27F6;</span>}
                </React.Fragment>
            ))}
        </Box>
    );
};

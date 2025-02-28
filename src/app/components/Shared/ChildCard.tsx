import React from 'react';

import { Card, CardHeader, CardContent, Divider } from '@mui/material';

type Props = {
    title?: string;
    children: JSX.Element | JSX.Element[];
    noBorder?: boolean;
};

const ChildCard = ({ title, children, noBorder }: Props) => (
    <Card
        sx={{ padding: 0, borderColor: (theme: any) => (noBorder ? '' : theme.palette.divider) }}
        {...(noBorder ? {} : { variant: 'outlined' })}
    >
        {title ? (
            <>
                <CardHeader title={title} />
                <Divider />{' '}
            </>
        ) : (
            ''
        )}

        <CardContent>{children}</CardContent>
    </Card>
);

export default ChildCard;

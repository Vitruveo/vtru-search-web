'use client';
import { useSelector } from '@/store/hooks';
import { Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
    className?: string;
    children: JSX.Element | JSX.Element[];
    sx?: any;
    onClick?: () => void;
};

const BlankCard = ({ children, className, sx, onClick }: Props) => {
    const customizer = useSelector((state) => state.customizer);

    const theme = useTheme();
    const borderColor = theme.palette.divider;

    return (
        <Card
            sx={{
                p: 0,
                border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none',
                position: 'relative',
                sx,
                height: '100%',
                backgroundColor: theme.palette.grey[100],
            }}
            onClick={onClick}
            style={{ backgroundColor: theme.palette.grey[100] }}
            className={className}
            elevation={customizer.isCardShadow ? 9 : 0}
            variant={!customizer.isCardShadow ? 'outlined' : undefined}
        >
            {children}
        </Card>
    );
};

export default BlankCard;

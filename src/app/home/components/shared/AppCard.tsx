import { useSelector } from '@/store/hooks';
import Card from '@mui/material/Card';

type Props = {
    children: JSX.Element | JSX.Element[];
};

const AppCard = ({ children }: Props) => {
    const customizer = useSelector((state) => state.customizer);

    return (
        <Card
            sx={{ display: 'flex', p: 0 }}
            elevation={customizer.isCardShadow ? 9 : 0}
            variant={!customizer.isCardShadow ? 'outlined' : undefined}
        >
            {children}
        </Card>
    );
};

export default AppCard;

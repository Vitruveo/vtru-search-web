import { Badge, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface DeckEffectProps {
    countByCreator?: number;
    isHovered?: boolean;
}
export default function DeckEffect({ countByCreator = 1, isHovered }: DeckEffectProps) {
    const theme = useTheme();

    return (
        <Box mt={4}>
            <Badge
                badgeContent={countByCreator}
                color="primary"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    background: `${theme.palette.grey[400]}`,
                    width: 250,
                    top: -5,
                    left: isHovered ? 45 : 30,
                    height: 360,
                    borderRadius: '15px 15px 15px 0',
                    transform: isHovered ? 'rotate(16deg)' : 'rotate(10deg)',
                    transition: '0.3',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    background: `${theme.palette.grey[300]}`,
                    width: 250,
                    top: -8,
                    left: isHovered ? 25 : 15,
                    height: 360,
                    borderRadius: '15px 15px 15px 0',
                    transform: isHovered ? 'rotate(8deg)' : 'rotate(5deg)',
                    transition: '0.3',
                }}
            />
        </Box>
    );
}

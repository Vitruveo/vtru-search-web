import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface DeckEffectProps {
    isHovered?: boolean;
    showFanEffect?: boolean;
    count?: number;
}

export default function DeckEffect({ isHovered, showFanEffect, count }: DeckEffectProps) {
    const theme = useTheme();

    const commonStyles = {
        width: showFanEffect ? 200 : 1,
        height: showFanEffect ? 200 : 1,
        borderRadius: '15px',
        marginRight: showFanEffect ? -50 : -200,
        transition: 'margin-right 0.5s ease, transform 0.5s ease',
        transitionDelay: '0.5s, 0.5s',
    };

    let cards = [
        {
            id: 1,
            image: 'red',
            transform: showFanEffect ? 'rotate(-30deg) translateY(150px)' : 'rotate(0deg) translateY(0px)',
        },
        {
            id: 2,
            image: 'blue',
            transform: showFanEffect ? 'rotate(-15deg) translateY(50px)' : 'rotate(0deg) translateY(0px)',
        },
        { id: 3, image: 'green', transform: 'rotate(0deg) translateY(0px)' },
        {
            id: 4,
            image: 'yellow',
            transform: showFanEffect ? 'rotate(15deg) translateY(50px)' : 'rotate(0deg) translateY(0px)',
        },
        {
            id: 5,
            image: 'purple',
            transform: showFanEffect ? 'rotate(30deg) translateY(150px)' : 'rotate(0deg) translateY(0px)',
        },
    ];

    const effectiveCount: number = count || 0;
    switch (effectiveCount) {
        case 0:
        case 1:
        case 2:
            cards = cards.slice(0, 2);
            break;
        case 3:
            cards = cards.filter((card) => card.id !== 5 && card.id !== 1);
            break;
        case 4:
            cards = cards.filter((card) => card.id !== 3);
            break;
        default:
            if (count && count > 5) {
                cards = cards.map((card) => (card.id === 5 ? { ...card, image: 'grey' } : card));
            }
            break;
    }

    return (
        <Box mt={4}>
            <Box
                display={'flex'}
                flexDirection={'row'}
                position={'absolute'}
                zIndex={999}
                style={{
                    left: '10%',
                    transform: cards.length === 3 ? 'translateX(-35%)' : 'translateX(-40%)',
                    top: showFanEffect ? '-50%' : '0%',
                    transition: 'top 0.5s ease',
                    opacity: showFanEffect ? 1 : 0,
                }}
            >
                {cards.length >= 3 && (
                    <>
                        {cards.map(({ image, transform }, index) => (
                            <div
                                key={index}
                                style={{
                                    ...commonStyles,
                                    background: image,
                                    transform,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.zIndex = '1000';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.zIndex = 'auto';
                                }}
                            />
                        ))}
                    </>
                )}
            </Box>
            <div
                style={{
                    position: 'absolute',
                    background: `${theme.palette.grey[400]}`,
                    width: 250,
                    top: -10,
                    left: isHovered ? 45 : 16,
                    height: 360,
                    borderRadius: '15px',
                    transform: isHovered ? 'rotate(16deg)' : 'rotate(5deg)',
                    transition: 'all 0.3s ease',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    background: `${theme.palette.grey[300]}`,
                    width: 250,
                    top: -8,
                    left: isHovered ? 25 : 10,
                    height: 360,
                    borderRadius: '15px',
                    transform: isHovered ? 'rotate(8deg)' : 'rotate(3deg)',
                    transition: 'all 0.3s ease',
                }}
            />
        </Box>
    );
}

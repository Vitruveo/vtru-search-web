import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface DeckEffectProps {
    isHovered?: boolean;
    showFanEffect?: boolean;
    count?: number;
    paths: string[];
    handleClickImage(): void;
}

export default function DeckEffect({ isHovered, showFanEffect, count, paths = [], handleClickImage }: DeckEffectProps) {
    const theme = useTheme();

    const commonStyles = {
        width: showFanEffect ? 200 : 1,
        height: showFanEffect ? 200 : 1,
        borderRadius: '15px',
        marginRight: showFanEffect ? -50 : -200,
        transition: 'margin-right 0.5s ease, transform 0.5s ease',
        transitionDelay: '0.5s, 0.5s',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    let cards = [
        {
            id: 1,
            transform: showFanEffect ? 'rotate(-30deg) translateY(150px)' : 'rotate(0deg) translateY(0px)',
        },
        {
            id: 2,
            transform: showFanEffect ? 'rotate(-15deg) translateY(50px)' : 'rotate(0deg) translateY(0px)',
        },
        {
            id: 3,
            transform: 'rotate(0deg) translateY(0px)',
        },
        {
            id: 4,
            transform: showFanEffect ? 'rotate(15deg) translateY(50px)' : 'rotate(0deg) translateY(0px)',
        },
        {
            id: 5,
            transform: showFanEffect ? 'rotate(30deg) translateY(150px)' : 'rotate(0deg) translateY(0px)',
        },
    ];

    const effectiveCount: number = count || 0;
    switch (effectiveCount) {
        case 0:
        case 1:
            cards = cards.slice(0, 1);
            break;
        case 2:
            cards = cards.filter((card) => card.id !== 1 && card.id !== 3 && card.id !== 5);
            break;
        case 3:
            cards = cards.filter((card) => card.id !== 1 && card.id !== 5);
            break;
        case 4:
            cards = cards.filter((card) => card.id !== 3);
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
                    transform:
                        cards.length === 3
                            ? 'translateX(-35%)'
                            : cards.length === 2
                              ? 'translateX(-20%)'
                              : 'translateX(-40%)',
                    top: showFanEffect ? '-8%' : '0%',
                    transition: 'top 0.5s ease',
                    opacity: showFanEffect ? 1 : 0,
                }}
            >
                {cards.length >= 2 && (
                    <>
                        {cards.map(({ transform }, index) =>
                            paths[index]?.match(/\.(mp4|webm|ogg)$/) != null ? (
                                <div
                                    key={index}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.zIndex = '1000';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.zIndex = 'auto';
                                    }}
                                    onClick={handleClickImage}
                                >
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        style={{
                                            ...commonStyles,
                                            transform,
                                            position: 'relative',
                                            minWidth: '200px',
                                        }}
                                    >
                                        <source src={`${AWS_BASE_URL_S3}/${paths[index]}`} type="video/mp4" />
                                    </video>
                                </div>
                            ) : (
                                <div
                                    key={index}
                                    style={{
                                        ...commonStyles,
                                        backgroundImage: `url(${AWS_BASE_URL_S3}/${paths[index]})`,
                                        transform,
                                        position: 'relative',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.zIndex = '1000';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.zIndex = 'auto';
                                    }}
                                    onClick={handleClickImage}
                                >
                                    {effectiveCount > 5 && index === cards.length - 1 && (
                                        <p
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                color: 'white',
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                                padding: '10px',
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            }}
                                        >
                                            +{effectiveCount - 5} NFTs
                                        </p>
                                    )}
                                </div>
                            )
                        )}
                    </>
                )}
            </Box>
            <div
                style={{
                    position: 'absolute',
                    background: `${theme.palette.grey[400]}`,
                    width: 250,
                    top: -10,
                    left: isHovered && !showFanEffect ? 45 : 16,
                    height: 360,
                    borderRadius: '15px',
                    transform: isHovered && !showFanEffect ? 'rotate(16deg)' : 'rotate(5deg)',
                    transition: 'all 0.3s ease',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    background: `${theme.palette.grey[300]}`,
                    width: 250,
                    top: -8,
                    left: isHovered && !showFanEffect ? 25 : 10,
                    height: 360,
                    borderRadius: '15px',
                    transform: isHovered && !showFanEffect ? 'rotate(8deg)' : 'rotate(3deg)',
                    transition: 'all 0.3s ease',
                }}
            />
        </Box>
    );
}

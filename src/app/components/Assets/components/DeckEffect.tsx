/* eslint-disable @next/next/no-img-element */
import { ASSET_STORAGE_URL } from '@/constants/aws';
import { useSelector } from '@/store/hooks';
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
    const isHiddenCardDetail = useSelector((state) => state.customizer.hidden?.cardDetail);

    // const commonStyles = {
    //     display: showFanEffect ? 'block' : 'none',
    //     width: showFanEffect ? 200 : 1,
    //     height: showFanEffect ? 200 : 1,
    //     borderRadius: '15px',
    //     marginRight: showFanEffect ? -50 : -200,
    //     transition: 'margin-right 0.5s ease, transform 0.5s ease',
    //     transitionDelay: '0.5s, 0.5s',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    // };

    let cards = [
        {
            id: 1,
            transform: showFanEffect ? 'rotate(-15deg) translateY(50px)' : 'rotate(0deg) translateY(0px)',
        },
        {
            id: 2,
            transform: 'rotate(0deg) translateY(0px)',
        },
        {
            id: 3,
            transform: showFanEffect ? 'rotate(15deg) translateY(50px)' : 'rotate(0deg) translateY(0px)',
        },
    ];

    const effectiveCount: number = count || 0;

    switch (effectiveCount) {
        case 1:
            cards = [];
            break;
        case 2:
            cards = cards.filter((card) => card.id === 1 || card.id === 3);
            break;
    }

    return (
        <Box mt={4} onClick={handleClickImage}>
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
                {/* {cards.length > 1 && (
                    <>
                        {cards.map(({ transform }, index) => {
                            const media = paths[index]?.replace(/\.(\w+)$/, '_thumb.jpg');

                            return (
                                <div
                                    key={index}
                                    style={{
                                        ...commonStyles,
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
                                    <img
                                        width={200}
                                        height={200}
                                        src={`${AWS_BASE_URL_S3}/${media}`}
                                        alt="image"
                                        style={commonStyles}
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://via.placeholder.com/200';
                                        }}
                                    />
                                    {effectiveCount > 3 && index === cards.length - 1 && (
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
                                            +{effectiveCount - 3} Digital Assets
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </>
                )} */}
            </Box>
            {cards.length > 1 && (
                <Box onClick={handleClickImage}>
                    <div
                        style={{
                            position: 'absolute',
                            background: `${theme.palette.grey[400]}`,
                            width: 250,
                            top: 0,
                            left: isHovered && !showFanEffect ? 45 : 16,
                            height: isHiddenCardDetail ? 250 : 380,
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
                            top: 7,
                            left: isHovered && !showFanEffect ? 25 : 10,
                            height: isHiddenCardDetail ? 250 : 380,
                            borderRadius: '15px',
                            transform: isHovered && !showFanEffect ? 'rotate(8deg)' : 'rotate(3deg)',
                            transition: 'all 0.3s ease',
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}

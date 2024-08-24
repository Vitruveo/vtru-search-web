import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface DeckEffectProps {
    isHovered?: boolean;
    showFanEffect?: boolean;
}
export default function DeckEffect({ isHovered, showFanEffect }: DeckEffectProps) {
    const theme = useTheme();

    return (
        <Box mt={4}>
            <Box
                display={'flex'}
                flexDirection={'row'}
                position={'absolute'}
                zIndex={999}
                style={{
                    left: '10%',
                    transform: 'translateX(-40%)',
                    top: showFanEffect ? '-50%' : '0%',
                    transition: 'top 0.5s ease',
                    opacity: showFanEffect ? 1 : 0,
                }}
            >
                <div
                    style={{
                        background: `red`,
                        width: showFanEffect ? 200 : 1,
                        height: showFanEffect ? 200 : 1,
                        borderRadius: '15px',
                        marginRight: showFanEffect ? -50 : -200,
                        transform: showFanEffect ? 'rotate(-30deg) translateY(150px)' : 'rotate(0deg) translateY(0px)',
                        transition: 'margin-right 0.5s ease, transform 0.5s ease',
                        transitionDelay: '0.5s, 0.5s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.zIndex = '1000';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.zIndex = 'auto';
                    }}
                />
                <div
                    style={{
                        background: `blue`,
                        width: showFanEffect ? 200 : 1,
                        height: showFanEffect ? 200 : 1,
                        borderRadius: '15px',
                        marginRight: showFanEffect ? -50 : -200,
                        transform: showFanEffect ? 'rotate(-15deg) translateY(50px)' : 'rotate(0deg) translateY(0px)',
                        transition: 'margin-right 0.5s ease, transform 0.5s ease',
                        transitionDelay: '0.5s, 0.5s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.zIndex = '1000';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.zIndex = 'auto';
                    }}
                />
                <div
                    style={{
                        background: `green`,
                        width: showFanEffect ? 200 : 1,
                        height: showFanEffect ? 200 : 1,
                        borderRadius: '15px',
                        marginRight: showFanEffect ? -50 : -200,
                        transform: showFanEffect ? 'rotate(0deg) translateY(0px)' : 'rotate(0deg) translateY(0px)',
                        transition: 'margin-right 0.5s ease, transform 0.5s ease',
                        transitionDelay: '0.5s, 0.5s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.zIndex = '1000';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.zIndex = 'auto';
                    }}
                />
                <div
                    style={{
                        background: `yellow`,
                        width: showFanEffect ? 200 : 1,
                        height: showFanEffect ? 200 : 1,
                        borderRadius: '15px',
                        marginRight: showFanEffect ? -50 : -200,
                        transform: showFanEffect ? 'rotate(15deg) translateY(50px)' : 'rotate(0deg) translateY(0px)',
                        transition: 'margin-right 0.5s ease, transform 0.5s ease',
                        transitionDelay: '0.5s, 0.5s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.zIndex = '1000';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.zIndex = 'auto';
                    }}
                />
                <div
                    style={{
                        background: `purple`,
                        width: showFanEffect ? 200 : 1,
                        height: showFanEffect ? 200 : 1,
                        borderRadius: '15px',
                        marginRight: showFanEffect ? -50 : -200,
                        transform: showFanEffect ? 'rotate(30deg) translateY(150px)' : 'rotate(0deg) translateY(0px)',
                        transition: 'margin-right 0.5s ease, transform 0.5s ease',
                        transitionDelay: '0.5s, 0.5s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.zIndex = '1000';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.zIndex = 'auto';
                    }}
                />
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

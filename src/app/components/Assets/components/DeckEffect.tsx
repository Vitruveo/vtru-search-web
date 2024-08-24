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
                    transform: showFanEffect ? 'translateY(0%) translateX(-50%) ' : 'translateY(100%) translateX(-50%)',
                    left: showFanEffect ? '50%' : '10%',
                    top: showFanEffect ? '-50%' : '0%',
                    transition: 'transform 0.5s ease',
                    opacity: showFanEffect ? 1 : 0,
                }}
            >
                <div
                    style={{
                        background: `red`,
                        width: showFanEffect ? 200 : 1,
                        height: showFanEffect ? 200 : 1,
                        borderRadius: '15px',
                        transform: showFanEffect ? 'rotate(-30deg) translateY(150px)' : '',
                        marginRight: -50,
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.zIndex = '1000';
                        e.currentTarget.style.transform = 'rotate(-30deg) translateY(100px) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.zIndex = 'auto';
                        e.currentTarget.style.transform = 'rotate(-30deg) translateY(150px)';
                    }}
                />
                <div
                    style={{
                        background: `blue`,
                        width: showFanEffect ? 200 : 1,
                        height: showFanEffect ? 200 : 1,
                        borderRadius: '15px',
                        transform: showFanEffect ? 'rotate(-15deg) translateY(50px)' : '',
                        marginRight: -50,
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.zIndex = '1000';
                        e.currentTarget.style.transform = 'rotate(-15deg) translateY(0px) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.zIndex = 'auto';
                        e.currentTarget.style.transform = 'rotate(-15deg) translateY(50px)';
                    }}
                />
                <div
                    style={{
                        background: `green`,
                        width: showFanEffect ? 200 : 1,
                        height: showFanEffect ? 200 : 1,
                        borderRadius: '15px',
                        transform: showFanEffect ? 'rotate(0deg)' : '',
                        marginRight: -50,
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.zIndex = '1000';
                        e.currentTarget.style.transform = 'rotate(0deg) translateY(-50px) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.zIndex = 'auto';
                        e.currentTarget.style.transform = 'rotate(0deg)';
                    }}
                />
                <div
                    style={{
                        background: `yellow`,
                        width: showFanEffect ? 200 : 1,
                        height: showFanEffect ? 200 : 1,
                        borderRadius: '15px',
                        transform: showFanEffect ? 'rotate(15deg) translateY(50px)' : '',
                        marginRight: -50,
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.zIndex = '1000';
                        e.currentTarget.style.transform = 'rotate(15deg) translateY(0px) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.zIndex = 'auto';
                        e.currentTarget.style.transform = 'rotate(15deg) translateY(50px)';
                    }}
                />
                <div
                    style={{
                        background: `purple`,
                        width: showFanEffect ? 200 : 1,
                        height: showFanEffect ? 200 : 1,
                        borderRadius: '15px',
                        transform: showFanEffect ? 'rotate(30deg) translateY(150px)' : '',
                        marginRight: -50,
                        transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.zIndex = '1000';
                        e.currentTarget.style.transform = 'rotate(30deg) translateY(100px) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.zIndex = 'auto';
                        e.currentTarget.style.transform = 'rotate(30deg) translateY(150px)';
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

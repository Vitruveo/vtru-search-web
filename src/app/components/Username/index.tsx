import { SEARCH_BASE_URL } from '@/constants/api';
import { actions as actionsFilters } from '@/features/filters/slice';
import { useDispatch } from '@/store/hooks';
import { Box, Link, Typography } from '@mui/material';

interface Props {
    username: string;
    size: 'small' | 'medium' | 'large';
    openInNewTab?: boolean;
    iconSpacing?: 'small' | 'large';
}

const fontSizes = {
    small: '0.875rem',
    medium: '1.1rem',
    large: '1.4rem',
};

const Username = ({ username, size, openInNewTab = false, iconSpacing = 'large' }: Props) => {
    const dispatch = useDispatch();

    const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.stopPropagation();
        if (username) {
            dispatch(
                actionsFilters.changeName({
                    name: username,
                })
            );
        }
    };

    return (
        <Box width={'100%'}>
            <Link
                title={username}
                padding={0}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                href={openInNewTab ? `${SEARCH_BASE_URL}?name=${username}` : '#'}
                underline="none"
                onClick={onClick}
                fontSize={fontSizes[size]}
                target={openInNewTab ? '_blank' : '_self'}
            >
                <Box
                    display={'flex'}
                    justifyContent={iconSpacing === 'large' ? 'space-between' : 'inherit'}
                    width={'100%'}
                    gap={1}
                >
                    <Typography
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: fontSizes[size],
                        }}
                    >
                        {username}
                    </Typography>
                </Box>
            </Link>
        </Box>
    );
};

export default Username;

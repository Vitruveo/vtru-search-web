import { useHasStakes } from '@/app/hooks/useHasStakes';
import { SEARCH_BASE_URL } from '@/constants/api';
import { actions as actionsFilters } from '@/features/filters/slice';
import { useDispatch } from '@/store/hooks';
import { Box, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

interface Props {
    username: string;
    vaultAdress: string | null;
    size: 'small' | 'medium' | 'large';
    openInNewTab?: boolean;
}

const fontSizes = {
    small: '0.875rem',
    medium: '1.1rem',
    large: '1.4rem',
};

const Username = ({ username, vaultAdress, size, openInNewTab = false }: Props) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [hasStakes, setHasStakes] = useState(false);
    const vaultStake = useHasStakes(vaultAdress);

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

    useEffect(() => {
        // check is promise pending
        if (vaultStake instanceof Promise) {
            vaultStake.then((result) => {
                setHasStakes(result);
            });
        } else {
            setHasStakes(vaultStake);
        }
    }, [vaultStake]);

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
                <Box display={'flex'} justifyContent={'space-between'} width={'100%'} gap={0.5}>
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
                    {hasStakes && <span style={{ color: theme.palette.primary.main }}>&sect; </span>}
                </Box>
            </Link>
        </Box>
    );
};

export default Username;

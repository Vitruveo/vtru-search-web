import { useHasStakes } from '@/app/hooks/useHasStakes';
import { SEARCH_BASE_URL } from '@/constants/api';
import { actions as actionsFilters } from '@/features/filters/slice';
import { useDispatch } from '@/store/hooks';
import { Link } from '@mui/material';
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
        <>
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
                {hasStakes && <span style={{ color: theme.palette.primary.main }}>&sect; </span>}
                {username}
            </Link>
            {/* <Link
                href={`${SEARCH_BASE_URL}/${creator.username}`}
                target="_blank"
                style={{ color: theme.palette.primary.main }}
            >
                {language['search.drawer.stack.viewProfile'] as string}
            </Link> */}
        </>
    );
};

export default Username;

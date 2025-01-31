import Image from 'next/image';
import { Box, Theme, Typography, useMediaQuery } from '@mui/material';

import { useSelector } from '@/store/hooks';
import { useDispatch } from 'react-redux';
import { actions } from '@/features/assets';
import { actions as actionsFilters } from '@/features/filters/slice';
import { actions as actionsStores } from '@/features/stores/slice';
import { STORES_STORAGE_URL } from '@/constants/aws';

const LogoLtrDark = () => {
    const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    return (
        <Box display="flex" alignItems="end">
            <Image
                style={{ display: 'inline-block', alignSelf: 'baseline', marginRight: '5px' }}
                src={'/images/logos/XIBIT-logo_dark.png'}
                alt="logo"
                height={40}
                width={120}
                priority
            />
            <Typography
                sx={{
                    fontSize: 9,
                    marginLeft: 1,
                    display: lgDown ? 'none' : 'block',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    letterSpacing: '3px',
                    color: 'white',
                    fontWeight: 500,
                    '&:hover': {
                        color: '#e0e0e0',
                    },
                }}
                onClick={() => window.open('https://vitruveo.xyz', '_blank', 'noopener,noreferrer')}
            >
                BY VITRUVEO
            </Typography>
        </Box>
    );
};

const LogoLtrLight = () => {
    const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    return (
        <Box display="flex" alignItems="end">
            <Image
                style={{ display: 'inline-block', alignSelf: 'baseline', marginRight: '5px' }}
                src={'/images/logos/XIBIT-logo_light.png'}
                alt="logo"
                height={40}
                width={120}
                priority
            />
            <Typography
                sx={{
                    fontSize: 9,
                    marginLeft: 1,
                    display: lgDown ? 'none' : 'block',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    letterSpacing: '3px',
                    color: 'black',
                    fontWeight: 500,
                    '&:hover': {
                        color: '#333',
                    },
                }}
                onClick={() => window.open('https://vitruveo.xyz', '_blank', 'noopener,noreferrer')}
            >
                BY VITRUVEO
            </Typography>
        </Box>
    );
};

const PersonalizedLogo = () => {
    const { organization } = useSelector((state) => state.stores.data.data[0] || {});
    const path = organization?.formats.logo.horizontal?.path;
    const name = organization?.formats.logo.horizontal?.name;

    return (
        <Box display="flex" alignItems="end">
            <Image
                style={{ display: 'inline-block', alignSelf: 'baseline', marginRight: '5px' }}
                src={`${STORES_STORAGE_URL}/${path}`}
                alt={name || 'logo'}
                height={50}
                width={224}
                priority
            />
        </Box>
    );
};

interface Props {
    isPersonalizedStore?: boolean;
}
const Logo = ({ isPersonalizedStore = false }: Props) => {
    const dispatch = useDispatch();
    const customizer = useSelector((state) => state.customizer);
    const { maxPrice } = useSelector((state) => state.assets);
    const { organization } = useSelector((state) => state.stores.data.data[0] || {});

    const returnToPageOne = () => {
        const params = new URLSearchParams(window.location.search);
        const keysToDelete: string[] = [];
        params.forEach((_, key) => {
            if (!key.includes('_hidden')) keysToDelete.push(key);
            else params.set(key, params.get(key) || '');
        });
        keysToDelete.forEach((key) => params.delete(key));

        params.delete('creatorId');

        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

        dispatch(actionsFilters.clearTabNavigation());
        dispatch(actions.resetGroupByCreator());

        if (isPersonalizedStore) dispatch(actionsStores.getStoresRequest({ subdomain: organization?.url || '' }));
        else dispatch(actionsFilters.reset({ maxPrice }));
    };

    const dice = {
        style: { textDecoration: 'none', cursor: 'pointer', marginTop: 0 },
        light: LogoLtrLight,
        dark: LogoLtrDark,
        personalized: PersonalizedLogo,
    };

    const renderLogo = () => {
        if (isPersonalizedStore) return <dice.personalized />;
        return customizer.activeMode === 'dark' ? <dice.dark /> : <dice.light />;
    };

    return (
        <Box style={dice.style} onClick={returnToPageOne}>
            {renderLogo()}
        </Box>
    );
};

export default Logo;

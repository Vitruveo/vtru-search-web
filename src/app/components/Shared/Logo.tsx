import Image from 'next/image';
import { Box } from '@mui/material';

import { useSelector } from '@/store/hooks';
import { useDispatch } from 'react-redux';
import { actions } from '@/features/assets';
import { actions as actionsFilters } from '@/features/filters/slice';

const LogoLtrDark = () => (
    <Box display="flex">
        <Image
            style={{ display: 'inline-block', alignSelf: 'baseline', marginRight: '5px' }}
            src={'/images/logos/XIBIT-logo_dark.png'}
            alt="logo"
            height={40}
            width={120}
            priority
        />
    </Box>
);

const LogoLtrLight = () => (
    <Box display="flex" alignItems="center">
        <Image src={'/images/logos/XIBIT-logo_light.png'} alt="logo" height={40} width={120} priority />
    </Box>
);

const Logo = () => {
    const dispatch = useDispatch();
    const customizer = useSelector((state) => state.customizer);
    const { maxPrice } = useSelector((state) => state.assets);

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
        dispatch(actionsFilters.reset({ maxPrice }));
    };

    const dice = {
        style: { textDecoration: 'none', cursor: 'pointer', marginTop: 0 },
        light: LogoLtrLight,
        dark: LogoLtrDark,
    };

    return (
        <Box style={dice.style} onClick={returnToPageOne}>
            {customizer.activeMode === 'dark' ? <dice.dark /> : <dice.light />}
        </Box>
    );
};

export default Logo;

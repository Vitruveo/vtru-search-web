import Image from 'next/image';
import { Box } from '@mui/material';

import { useSelector } from '@/store/hooks';
import VtruTitle from '../VtruTitle';
import { useDispatch } from 'react-redux';
import { actions } from '@/features/assets';
import { actions as actionsFilters } from '@/features/filters/slice';

const LogoLtrDark = () => (
    <Box display="flex" marginTop={2} alignItems="center">
        <Image
            style={{ marginRight: '5px' }}
            src={'/images/logos/VTRU_Search.png'}
            alt="logo"
            height={35}
            width={35}
            priority
        />
        <Box marginLeft={1}>
            <VtruTitle vtruRem="1.2rem" studioRem="1.2rem" />
        </Box>
    </Box>
);

const LogoLtrLight = () => (
    <Box display="flex" marginTop={2} alignItems="center">
        <Image src={'/images/logos/VTRU_Search.png'} alt="logo" height={35} width={35} priority />
        <Box marginLeft={1}>
            <VtruTitle vtruRem="1.2rem" studioRem="1.2rem" />
        </Box>
    </Box>
);

const Logo = () => {
    const dispatch = useDispatch();
    const customizer = useSelector((state) => state.customizer);
    const { maxPrice } = useSelector((state) => state.assets);

    const returnToPageOne = () => {
        const params = new URLSearchParams(window.location.search);

        params.forEach((_, key) => params.delete(key));

        params.set('sort_order', 'latest');
        params.set('sort_sold', 'no');
        params.set('taxonomy_aiGeneration', 'partial,none');
        params.set('taxonomy_nudity', 'no');
        params.set('groupByCreator', 'yes');
        params.delete('creatorId');

        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

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

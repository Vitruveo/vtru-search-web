'use client';
import { SingleValue } from 'react-select';
import StackList from '../components/Stacks/stacksGrid/StacksList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { actions } from '@/features/stacks';
import { SEARCH_BASE_URL } from '@/constants/api';
import PageContainer from '../components/Container/PageContainer';
import { useI18n } from '../hooks/useI18n';
import StyleElements from '../components/Stacks/components/StyleElements';
import { Box, Theme, useMediaQuery } from '@mui/material';
import Header from '../components/Header';
import { useTheme } from '@mui/material/styles';

const Stacks = () => {
    const { language } = useI18n();
    const dispatch = useDispatch();
    const theme = useTheme();
    const lgUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('lg'));
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('sm'));

    const stacks = useSelector((state) => state.stacks.data);
    const hiddenElement = useSelector((state) => state.customizer.hiddenStack);

    const [selectValues, setSelectValues] = useState({
        limit: { value: '25', label: '25' },
        page: { value: '1', label: '1' },
        sort: { value: 'latest', label: language['search.select.sort.option.latest'] as string },
    });

    useEffect(() => {
        dispatch(actions.loadStacks());
        dispatch(actions.loadStacksSpotlight());
    }, []);

    const optionsForSelectPage = useMemo(() => {
        const options: { value: string; label: string }[] = [];
        for (let i = 1; i <= stacks.totalPage; i++) {
            options.push({ value: i.toString(), label: i.toString() });
        }
        return options;
    }, [stacks.totalPage]);

    const onChangeLimit = useCallback((e: SingleValue<{ value: string; label: string }>) => {
        dispatch(actions.setLimit(Number(e!.value)));
        setSelectValues((prev) => ({ ...prev, limit: { value: e!.value, label: e!.label } }));
    }, []);

    const onChangePage = useCallback((e: SingleValue<{ value: string; label: string }>) => {
        dispatch(actions.setPage(Number(e!.value)));
        setSelectValues((prev) => ({ ...prev, page: { value: e!.value, label: e!.label } }));
    }, []);

    const onChangeSort = useCallback((e: SingleValue<{ value: string; label: string }>) => {
        dispatch(actions.setSort(e!.value));
        setSelectValues((prev) => ({ ...prev, sort: { value: e!.value, label: e!.label } }));
    }, []);

    const handleCurateStack = () => window.open(`${SEARCH_BASE_URL}?groupByCreator=no&assets`, '_blank');

    const isInIframe = window.self !== window.top;

    return (
        <PageContainer title="Stacks">
            <>
                {!hiddenElement?.header && (
                    <Header
                        rssOptions={[
                            { flagname: 'JSON', value: 'stacks/json' },
                            { flagname: 'XML', value: 'stacks/xml' },
                        ]}
                    />
                )}
                <StackList
                    data={{ stacks, selectValues, optionsForSelectPage, hiddenElement }}
                    actions={{ onChangeSort, onChangePage, onChangeLimit, handleCurateStack }}
                />

                <Box
                    display={isInIframe ? 'none' : 'inherit'}
                    position={'fixed'}
                    top={lgUp ? 21 : smUp ? 17 : 13}
                    right={-5}
                    bgcolor={theme.palette.grey[100]}
                    width={lgUp || smUp ? 85 : 77}
                    zIndex={9999}
                >
                    <StyleElements />
                </Box>
            </>
        </PageContainer>
    );
};

export default Stacks;

'use client';
import { SingleValue } from 'react-select';
import StackList from '../components/Stacks/stacksGrid/StacksList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import { actions } from '@/features/stacks';

const Stacks = () => {
    const dispatch = useDispatch();
    const stacks = useSelector((state) => state.stacks.data);
    const [selectValues, setSelectValues] = useState({
        limit: { value: '25', label: '25' },
        page: { value: '1', label: '1' },
        sort: { value: 'latest', label: 'Latest' },
    });

    useEffect(() => {
        dispatch(actions.loadStacks());
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

    return (
        <>
            <StackList
                data={{ stacks, selectValues, optionsForSelectPage }}
                actions={{ onChangeSort, onChangePage, onChangeLimit }}
            />
        </>
    );
};

export default Stacks;

'use client';
import { SingleValue } from 'react-select';
import dataJson from '../../../data.json';
import StackList from '../components/Stacks/stacksGrid/StacksList';
import { useCallback, useMemo, useState } from 'react';

export const optionsForSelectSort = [
    { value: 'latest', label: 'Latest' },
    { value: 'titleAZ', label: 'Title a-z' },
    { value: 'titleZA', label: 'Title z-a' },
    { value: 'CuratorAZ', label: 'Curator a-z' },
    { value: 'CuratorZA', label: 'Curator z-a' },
];

const Stacks = () => {
    const [selectValues, setSelectValues] = useState({
        limit: { value: '25', label: '25' },
        page: { value: '1', label: '1' },
        sort: { value: 'latest', label: 'Latest' },
    });

    const stacks = dataJson.data;

    const optionsForSelectPage = useMemo(() => {
        const options: { value: string; label: string }[] = [];
        for (let i = 1; i <= stacks.totalPage; i++) {
            options.push({ value: i.toString(), label: i.toString() });
        }
        return options;
    }, [stacks.totalPage]);

    const onChangeLimit = useCallback((e: SingleValue<{ value: string; label: string }>) => {
        setSelectValues((prev) => ({ ...prev, limit: { value: e!.value, label: e!.label } }));
    }, []);

    const onChangePage = useCallback((e: SingleValue<{ value: string; label: string }>) => {
        setSelectValues((prev) => ({ ...prev, page: { value: e!.value, label: e!.label } }));
    }, []);

    const onChangeSort = useCallback((e: SingleValue<{ value: string; label: string }>) => {
        setSelectValues((prev) => ({ ...prev, sort: { value: e!.value, label: e!.label } }));
    }, []);

    return (
        <>
            <StackList
                data={{ stacks: stacks, selectValues, optionsForSelectPage }}
                actions={{ onChangeSort, onChangePage, onChangeLimit }}
            />
        </>
    );
};

export default Stacks;

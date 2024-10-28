'use client';
import { actions as actionsCreator } from '@/features/profile/creator';
import { actions as actionsAssets } from '@/features/profile/assets';
import { useDispatch, useSelector } from '@/store/hooks';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Assets from '../components/Profile/AssetsGrid/AssetsList';
import Creator from '../components/Profile/Creator';
import PageContainer from '../components/Container/PageContainer';
import Header from '../components/Header';
import { SingleValue } from 'react-select';

export default function Profile() {
    const dispatch = useDispatch();
    const params = useParams();
    const username = params.username as string;
    const [selectValues, setSelectValues] = useState({
        limit: { value: '25', label: '25' },
        page: { value: '1', label: '1' },
        sort: { value: 'latest', label: 'Latest' },
    });
    const { data: creatorData, loading: creatorLoading } = useSelector((state) => state.profileCreator);
    const { data: assetsData, loading: assetsLoading } = useSelector((state) => state.profileAssets);

    useEffect(() => {
        dispatch(actionsCreator.loadProfileCreator({ username }));
    }, [username]);

    useEffect(() => {
        if (creatorData.id) dispatch(actionsAssets.loadProfileAssets());
    }, [creatorData.id]);

    const optionsForSelectPage = useMemo(() => {
        const options: { value: string; label: string }[] = [];
        for (let i = 1; i <= assetsData.totalPage; i++) {
            options.push({ value: i.toString(), label: i.toString() });
        }
        return options;
    }, [assetsData.totalPage]);

    const onChangeLimit = useCallback((e: SingleValue<{ value: string; label: string }>) => {
        dispatch(actionsAssets.setLimit(Number(e!.value)));
        setSelectValues((prev) => ({ ...prev, limit: { value: e!.value, label: e!.label } }));
    }, []);

    const onChangePage = useCallback((e: SingleValue<{ value: string; label: string }>) => {
        dispatch(actionsAssets.setPage(Number(e!.value)));
        setSelectValues((prev) => ({ ...prev, page: { value: e!.value, label: e!.label } }));
    }, []);

    const onChangeSort = useCallback((e: SingleValue<{ value: string; label: string }>) => {
        dispatch(actionsAssets.setSort(e!.value));
        setSelectValues((prev) => ({ ...prev, sort: { value: e!.value, label: e!.label } }));
    }, []);

    return (
        <PageContainer>
            <Header
                rssOptions={[
                    { flagname: 'JSON', value: 'stacks/json' },
                    { flagname: 'XML', value: 'stacks/xml' },
                ]}
                hasSettings={false}
            />
            <Creator data={{ creator: { ...creatorData, username }, loading: creatorLoading }} />
            <Assets
                data={{
                    assets: assetsData,
                    loading: assetsLoading,
                    optionsForSelectPage,
                    selectValues,
                    username,
                }}
                actions={{ onChangeSort, onChangePage, onChangeLimit }}
            />
        </PageContainer>
    );
}

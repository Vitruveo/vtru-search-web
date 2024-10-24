'use client';
import PageContainer from '@/app/components/Container/PageContainer';
import { useParams } from 'next/navigation';
import StoreItem from '@/app/components/Store';
import { useDispatch, useSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { actions } from '@/features/store';

const Store = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { assetId } = params;

    const { asset, loading } = useSelector((state) => state.store);

    useEffect(() => {
        const getAsset = () => {
            if (assetId && typeof assetId === 'string') dispatch(actions.getAssetRequest({ id: assetId }));
        };
        getAsset();
    }, [assetId]);

    return (
        <PageContainer>
            <StoreItem data={{ asset, loading }} />
        </PageContainer>
    );
};

export default Store;

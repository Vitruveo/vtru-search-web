'use client';
import PageContainer from '@/app/components/Container/PageContainer';
import { useParams } from 'next/navigation';
import StoreItem from '@/app/components/Store';
import { useDispatch, useSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { actions } from '@/features/store';
import Header from '@/app/components/Header';
import AppCard from '@/app/components/Shared/AppCard';
import { Box } from '@mui/material';

const Store = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { assetId, username } = params;

    const { asset, loading, creatorAvatar, creatorLoading } = useSelector((state) => state.store);

    useEffect(() => {
        const getAsset = () => {
            if (assetId && typeof assetId === 'string') dispatch(actions.getAssetRequest({ id: assetId }));
        };
        getAsset();
    }, [assetId]);

    useEffect(() => {
        const getCreator = () => {
            if (asset && asset.framework?.createdBy)
                dispatch(actions.getCreatorRequest({ id: asset.framework.createdBy }));
        };
        getCreator();
    }, [asset]);

    return (
        <PageContainer>
            <Header
                rssOptions={[
                    { flagname: 'JSON', value: 'stacks/json' },
                    { flagname: 'XML', value: 'stacks/xml' },
                ]}
                hasSettings={false}
            />
            <Box display={'flex'} justifyContent={'center'} overflow={'auto'} height={'100vh'}>
                <StoreItem data={{ asset, loading, creatorAvatar, username: username as string, creatorLoading }} />
            </Box>
        </PageContainer>
    );
};

export default Store;

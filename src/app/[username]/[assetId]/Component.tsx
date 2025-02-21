'use client';
import PageContainer from '@/app/components/Container/PageContainer';
import { useParams } from 'next/navigation';
import StoreItem from '@/app/components/Store';
import { useDispatch, useSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { actions } from '@/features/store';
import Header from '@/app/components/Header';
import { Box } from '@mui/material';
import { useDomainContext } from '@/app/context/domain';
import { STORES_STORAGE_URL } from '@/constants/aws';

const Store = () => {
    const { subdomain, isValidSubdomain } = useDomainContext();
    const dispatch = useDispatch();
    const params = useParams();
    const { assetId, username } = params;

    const { asset, loading, creatorAvatar, creatorLoading, lastAssets, lastAssetsLoading } = useSelector(
        (state) => state.store
    );
    const logo = useSelector((state) => state.stores.currentDomain?.organization?.formats?.logo?.square);

    useEffect(() => {
        const getAsset = () => {
            if (assetId && typeof assetId === 'string') dispatch(actions.getAssetRequest({ id: assetId }));
        };
        getAsset();
    }, [assetId]);

    useEffect(() => {
        const getLastAssetConsigns = () => {
            if (assetId && typeof assetId === 'string') dispatch(actions.getLastAssetsRequest({ id: assetId }));
        };
        getLastAssetConsigns();
    }, [assetId]);

    useEffect(() => {
        const getCreator = () => {
            if (asset && asset.framework?.createdBy)
                dispatch(actions.getCreatorRequest({ id: asset.framework.createdBy }));
        };
        getCreator();
    }, [asset]);

    return (
        <PageContainer
            title={asset.assetMetadata?.context?.formData?.title}
            icon={logo ? `${STORES_STORAGE_URL}/${logo}` : undefined}
        >
            <Header
                isStore
                isPersonalizedStore={!!isValidSubdomain && !!subdomain}
                rssOptions={[
                    { flagname: 'JSON', value: 'stacks/json' },
                    { flagname: 'XML', value: 'stacks/xml' },
                ]}
                hasSettings={false}
                showProjects={false}
            />
            <Box display={'flex'} justifyContent={'center'} overflow={'auto'}>
                <Box height={'100vh'} maxWidth={1300}>
                    <StoreItem
                        data={{
                            asset,
                            loading,
                            creatorAvatar,
                            username: username as string,
                            creatorLoading,
                            lastAssets,
                            lastAssetsLoading,
                        }}
                    />
                </Box>
            </Box>
        </PageContainer>
    );
};

export default Store;

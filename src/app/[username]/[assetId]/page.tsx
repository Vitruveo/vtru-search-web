'use client';
import PageContainer from '@/app/components/Container/PageContainer';
import { useParams } from 'next/navigation';
import StoreItem from '@/app/components/Store';

const Store = () => {
    const params = useParams();
    const { username, assetId } = params;

    return (
        <PageContainer>
            <StoreItem />
        </PageContainer>
    );
};

export default Store;

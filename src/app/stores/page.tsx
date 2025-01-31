'use client';
import { useEffect } from 'react';
import { useDispatch } from '@/store/hooks';
import Component from './component';
import { actions } from '@/features/stores';

export default function Stores() {
    const dispatch = useDispatch();

    useEffect(() => {
        const getStoresList = async () => {
            dispatch(
                actions.getStoresListRequest({
                    limit: 24,
                    page: 1,
                })
            );
        };
        getStoresList();
    }, []);

    return <Component />;
}

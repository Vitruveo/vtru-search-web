'use client';
import { useEffect } from 'react';
import { useDispatch } from '@/store/hooks';
import Component from './component';
import { actions } from '@/features/stores';
import { actions as actionsSystemStatus } from '@/features/system-status';

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
        dispatch(actionsSystemStatus.loadSystemStatus());
    }, []);

    return <Component />;
}

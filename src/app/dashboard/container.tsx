'use client';
import { useDispatch, useSelector } from '@/store/hooks';
import Dashboard from './component';
import { useEffect } from 'react';
import { actions } from '@/features/dashboard';

export function Container() {
    const dispatch = useDispatch();
    const dashBoardData = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(actions.loadDashboardData());
    }, [dispatch]);

    return <Dashboard data={dashBoardData} />;
}

'use client';
import { useDispatch, useSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { actions } from '@/features/dashboard';
import DashboardList from '../components/Dashboard/dashboardGrid/dashboardList';

const Dashboard = () => {
    const dispatch = useDispatch();
    const dashBoardData = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(actions.loadDashboardData());
    }, [dispatch]);

    return <DashboardList data={dashBoardData} />;
};

export default Dashboard;

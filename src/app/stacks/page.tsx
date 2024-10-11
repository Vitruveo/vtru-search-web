'use client';
import { useDispatch, useSelector } from '@/store/hooks';
import StackList from '../components/Stacks/stacksGrid/StacksList';
import { useEffect } from 'react';
import { actions } from '@/features/stacks/slice';

const Stacks = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.stacks.data.data);

    useEffect(() => {
        dispatch(actions.loadStacks());
    }, []);

    return <StackList data={data} />;
};

export default Stacks;

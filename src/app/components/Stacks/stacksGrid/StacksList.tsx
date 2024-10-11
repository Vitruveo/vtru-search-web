import { Stack } from '@/features/stacks/types';

interface StacksProps {
    data: Stack[];
}

const Stacks = ({ data }: StacksProps) => {
    return <>{JSON.stringify(data)}</>;
};

export default Stacks;

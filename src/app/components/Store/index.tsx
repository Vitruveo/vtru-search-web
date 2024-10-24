import { Box } from '@mui/material';
import Header from '../Header';
import { Asset } from '@/features/assets/types';
import PanelMint from './components/PanelMint';

interface StoreProps {
    data: {
        asset: Asset;
        loading: boolean;
    };
}

const Store = ({ data }: StoreProps) => {
    const { asset, loading } = data;

    if (loading) return <h1>Loading...</h1>;
    return (
        <Box>
            <Header
                rssOptions={[
                    { flagname: 'JSON', value: 'stacks/json' },
                    { flagname: 'XML', value: 'stacks/xml' },
                ]}
                hasSettings={false}
            />
            <PanelMint asset={asset} />
            <p>{JSON.stringify(asset)}</p>
        </Box>
    );
};

export default Store;

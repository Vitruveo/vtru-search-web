import { Box } from '@mui/material';
import Header from '../Header';

interface StoreProps {}

const Store = (props: StoreProps) => {
    return (
        <Box>
            <Header
                rssOptions={[
                    { flagname: 'JSON', value: 'stacks/json' },
                    { flagname: 'XML', value: 'stacks/xml' },
                ]}
                hasSettings={false}
            />
            <h1>Hello from store item </h1>
        </Box>
    );
};

export default Store;

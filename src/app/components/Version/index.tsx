import { Box, Typography } from '@mui/material';
import { version } from '../../../../package.json';

const Version = () => {
    return (
        <Box>
            <Typography>Version: {version}</Typography>
        </Box>
    );
};

export default Version;

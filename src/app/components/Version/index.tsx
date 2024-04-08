import { Box, Typography } from '@mui/material';
import packageInfo from '../../../../package.json';

const Version = () => {
    return (
        <Box>
            <Typography>Version: {packageInfo.version}</Typography>
        </Box>
    );
};

export default Version;

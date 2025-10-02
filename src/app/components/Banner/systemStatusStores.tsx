import { SystemStatusType } from '@/features/system-status/types';
import { useSelector } from '@/store/hooks';
import { Box, Typography } from '@mui/material';
import { IconAlertHexagon, IconXboxX } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';

interface Props {
    systemStatus: SystemStatusType;
}

type IssuePerSystem = {
    system: string;
    level: string;
    message: string;
};

const BannerSystemStatus = ({ systemStatus }: Props) => {
    const whichSystemHasIssues = Object.entries(systemStatus).reduce<IssuePerSystem[]>(
        (issues, [systemName, project]) => {
            Object.entries(project).forEach(([statusLevel, messages]) => {
                if (Array.isArray(messages) && messages.length > 0) {
                    const systemIssues = messages
                        .filter(() => systemName === 'stores')
                        .map((messageObj) => ({
                            system: systemName,
                            level: statusLevel,
                            message: messageObj.message,
                        }));
                    issues.push(...systemIssues);
                }
            });
            return issues;
        },
        []
    );
    return (
        <Box m={3}>
            {whichSystemHasIssues.map((issue, index) => (
                <Box key={index} paddingBlock={1}>
                    {issue.level === 'warn' && <BannerWarning message={issue.message} />}
                    {issue.level === 'error' && <BannerError message={issue.message} />}
                    {issue.level === 'info' && <BannerInfo message={issue.message} />}
                </Box>
            ))}
        </Box>
    );
};

const BannerWarning = ({ message }: { message: string }) => {
    const theme = useTheme();
    return (
        <Box bgcolor={theme.palette.warning.main} p={2} display="flex" justifyContent="space-between">
            <IconAlertHexagon size={30} />
            <Typography variant="h5">{message}</Typography>
            <IconAlertHexagon size={30} />
        </Box>
    );
};

const BannerError = ({ message }: { message: string }) => {
    const theme = useTheme();
    return (
        <Box bgcolor={theme.palette.error.main} p={2} display="flex" justifyContent="space-between">
            <IconXboxX size={30} />
            <Typography variant="h5">{message}</Typography>
            <IconXboxX size={30} />
        </Box>
    );
};

const BannerInfo = ({ message }: { message: string }) => {
    const theme = useTheme();
    return (
        <Box bgcolor={theme.palette.error.main} p={2} display="flex" justifyContent="space-between">
            <Typography variant="h5">{message}</Typography>
        </Box>
    );
};

const BannerSystemStatusHOC = () => {
    const systemStatus = useSelector((state) => state.systemStatus.data);

    const isSystemOk = Object.values(systemStatus).every((project) => {
        return Object.values(project).every((messages) => messages.length === 0);
    });

    if (isSystemOk) return null;
    return <BannerSystemStatus systemStatus={systemStatus} />;
};

export default BannerSystemStatusHOC;

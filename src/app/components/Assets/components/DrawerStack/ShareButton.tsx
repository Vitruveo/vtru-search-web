import { useEffect, useState } from 'react';
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import XIcon from '@mui/icons-material/X';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { IconDownload } from '@tabler/icons-react';

interface ShareButtonProps {
    twitterURL?: string;
    url: string;
    downloadable?: boolean;
    title?: string;
    contentToCopy?: string;
}

export const ShareButton = ({ twitterURL, url, downloadable = false, title, contentToCopy }: ShareButtonProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isCopied, setIsCopied] = useState(false);

    // await the menu closes.
    useEffect(() => {
        setTimeout(() => {
            setIsCopied(false);
        }, 200);
    }, [anchorEl]);

    const open = Boolean(anchorEl);

    const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onClose = () => {
        setAnchorEl(null);
    };

    const onCopyClick = () => {
        setIsCopied(true);
        navigator.clipboard.writeText(contentToCopy!);
    };

    const onTwitterClick = () => {
        window.open(twitterURL, '_blank');
    };

    const onDownloadClick = () => {
        const a = document.createElement('a');
        a.href = url;
        a.download = title || 'gridStack';
        a.click();
    };

    return (
        <Box>
            <Button variant="outlined" onClick={onOpen} startIcon={<ShareIcon />}>
                Share
            </Button>
            <Menu open={open} onClose={onClose} anchorEl={anchorEl}>
                <Box width={200}>
                    <MenuList>
                        {twitterURL && (
                            <MenuItem onClick={onTwitterClick}>
                                <ListItemIcon>
                                    <XIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Twitter</ListItemText>
                            </MenuItem>
                        )}
                        {downloadable && (
                            <MenuItem onClick={onDownloadClick}>
                                <ListItemIcon>
                                    <IconDownload fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Download</ListItemText>
                            </MenuItem>
                        )}
                        {contentToCopy && (
                            <MenuItem onClick={onCopyClick}>
                                {isCopied ? (
                                    <>
                                        <ListItemIcon>
                                            <DoneIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Copied!</ListItemText>
                                    </>
                                ) : (
                                    <>
                                        <ListItemIcon>
                                            <ContentCopy fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Copy to clipboard</ListItemText>
                                    </>
                                )}
                            </MenuItem>
                        )}
                    </MenuList>
                </Box>
            </Menu>
        </Box>
    );
};

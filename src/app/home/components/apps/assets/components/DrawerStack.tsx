import Image from 'next/image';
import { Box, Button, Typography, Drawer } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import { Asset } from '@/features/assets/types';

interface Props {
    drawerStackOpen: boolean;
    selected: Asset[];
    onRemove(asset: Asset): void;
    onClose(): void;
}

export function DrawerStack({ drawerStackOpen, selected, onRemove, onClose }: Props) {
    return (
        <Drawer anchor="right" open={drawerStackOpen} onClose={onClose}>
            <Box width={400} p={4}>
                <Button fullWidth variant="contained" disabled={selected.length === 0}>
                    Publish Stack
                </Button>

                <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                    {selected.length === 0 && <Typography>No selected assets</Typography>}
                    {selected.map((asset) => (
                        <Box position="relative" key={asset._id}>
                            <Image
                                src={`https://vitruveo-studio-qa-assets.s3.amazonaws.com/${asset?.formats?.preview?.path}`}
                                alt="img"
                                width={160}
                                height={160}
                            />
                            <Box sx={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1 }}>
                                <IconTrash cursor="pointer" color="red" width={20} onClick={() => onRemove(asset)} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Drawer>
    );
}

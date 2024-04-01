import Image from 'next/image';
import { Avatar, Box, Button, Skeleton, Typography, Drawer } from '@mui/material';
import { Asset } from '@/features/assets/types';

interface Props {
    drawerOpen: boolean;
    assetView: Asset;
    onClose(): void;
}

export function DrawerAsset({ drawerOpen, assetView, onClose }: Props) {
    return (
        <Drawer anchor="right" open={drawerOpen} onClose={onClose}>
            <Box p={4}>
                {assetView ? (
                    <Image
                        src={`https://vitruveo-studio-qa-assets.s3.amazonaws.com/${assetView?.formats?.preview?.path}`}
                        width={400}
                        height={300}
                        style={{
                            borderRadius: 10,
                            objectFit: 'cover',
                        }}
                        alt="Art preview"
                    />
                ) : (
                    <Skeleton variant="rectangular" width={300} height={300} />
                )}

                <Typography variant="h4" mt={2}>
                    {assetView?.assetMetadata?.context?.formData?.title}
                </Typography>
                <Box mt={3} mb={3} display="flex" alignItems="center" gap={1}>
                    <Avatar />
                    <Typography>@Loas Zarg</Typography>
                </Box>
                <Box mb={3}>
                    <Typography variant="h6">Description</Typography>
                    <Typography maxWidth={400}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit accusamus nesciunt vel natus.
                        Ipsam amet consectetur, qui animi sed optio! Ducimus dignissimos odio deleniti velit eos cum
                        molestias ad aperiam.
                    </Typography>
                </Box>
                <Button fullWidth variant="contained">
                    View
                </Button>
            </Box>
        </Drawer>
    );
}

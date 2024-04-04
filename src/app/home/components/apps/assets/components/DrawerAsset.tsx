import Image from 'next/image';
import { Avatar, Box, Button, Skeleton, Typography, Drawer, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Asset, AssetView } from '@/features/assets/types';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { ReactNode } from 'react';
import { useI18n } from '@/app/hooks/useI18n';

interface Props {
    drawerOpen: boolean;
    assetView: AssetView | Asset | undefined;
    onClose(): void;
}

export function DrawerAsset({ drawerOpen, assetView, onClose }: Props) {
    const { language } = useI18n();
    
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    function getTitle(astView: AssetView | Asset | undefined): string {
        if (astView && 'consignArtwork' in astView) {
            return astView.assetMetadata?.assetMetadataDefinitions[0] ? astView?.assetMetadata?.assetMetadataDefinitions[0].title : "";
        } else if (astView && astView.assetMetadata && 'mediaAuxiliary' in astView) {
            if (astView.assetMetadata.context.formData.title) {
                return astView.assetMetadata.context.formData.title;
            } else {
                return '';
            }
        } else {
            // Se assetView for undefined
            return "";
        }
    }

    return (
        <Drawer anchor="right" open={drawerOpen} onClose={onClose}>
            <Box p={4}>
                {assetView ? (
                    <Image
                        src={`${AWS_BASE_URL_S3}/${assetView?.formats?.preview?.path}`}
                        width={lgUp ? 400 : mdUp ? 300 : 200}
                        height={lgUp ? 300 : mdUp ? 225 : 150}
                        style={{
                            borderRadius: 10,
                            objectFit: 'cover',
                        }}
                        alt="Art preview"
                    />
                ) : (
                    <Skeleton
                        variant="rectangular"
                        width={lgUp ? 400 : mdUp ? 300 : 200}
                        height={lgUp ? 300 : mdUp ? 225 : 150}
                    />
                )}

                <Typography variant="h4" mt={2}>
                    {getTitle(assetView)}
                </Typography>
                <Box mt={3} mb={3} display="flex" alignItems="center" gap={1}>
                    <Avatar />
                    <Typography>@Loas Zarg</Typography>
                </Box>
                <Box mb={3}>
                    <Typography variant="h6">{language['studio.assetList.visualization.description'] as ReactNode}</Typography>
                    <Typography maxWidth={lgUp ? 400 : mdUp ? 300 : 200}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit accusamus nesciunt vel natus.
                        Ipsam amet consectetur, qui animi sed optio! Ducimus dignissimos odio deleniti velit eos cum
                        molestias ad aperiam.
                    </Typography>
                </Box>
                <Button fullWidth variant="contained">
                    {language['studio.assetList.visualization.view'] as ReactNode}
                </Button>
            </Box>
        </Drawer>
    );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Marquee from 'react-fast-marquee';
import { Box, CardContent, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useSelector } from '@/store/hooks';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import { MediaRenderer } from '../Assets/components/MediaRenderer';
import { LastSoldAsset } from '@/features/assets/types';
import { NODE_ENV } from '@/constants/api';
import { REDIRECTS_JSON } from '@/constants/vitruveo';
import { formatPrice, getPriceWithMarkup } from '@/utils/assets';
import Username from '../Username';
import { useDomainContext } from '@/app/context/domain';
import { NO_IMAGE_ASSET } from '@/constants/asset';

function RecentlySoldSlider() {
    const { subdomain } = useDomainContext();
    const stores = useSelector((state) => state.stores.currentDomain);
    const assets = useSelector((state) => state.assets.lastSold);
    const theme = useTheme();
    const [redirects, setRedirects] = useState({ search: '', stores: '' });

    useEffect(() => {
        const fetchData = async () => {
            const rowData = await axios.get(REDIRECTS_JSON);
            setRedirects({
                search: rowData.data[NODE_ENV].xibit.search_url,
                stores: rowData.data[NODE_ENV].xibit.stores_url,
            });
        };
        fetchData();
    }, []);

    const handleClickItem = (asset: LastSoldAsset) => {
        const url = new URL(subdomain ? redirects.stores : redirects.search);
        if (subdomain) {
            url.hostname = `${subdomain}.${url.hostname}`;
        }
        window.open(`${url.toString()}/${asset?.username}/${asset?._id}`);
    };

    return (
        <Box minHeight={250}>
            <Marquee autoFill style={{ overflow: 'hidden' }}>
                {assets.map((asset, index) => {
                    const assetTitle = asset?.title || 'No Title';
                    const creatorName = asset?.username || 'No creator';
                    const vaultAddress = asset?.vault?.vaultAddress || '';
                    const price = formatPrice({
                        price: getPriceWithMarkup({
                            assetPrice: asset.price,
                            stores,
                            assetCreatedBy: asset?.framework?.createdBy,
                        }),
                    });

                    const nextAssetExists = index + 1 < assets.length;

                    return (
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            m={2}
                            onClick={() => handleClickItem(asset)}
                            sx={{
                                backgroundColor: theme.palette.grey[100],
                                ':hover': {
                                    cursor: 'pointer',
                                    boxShadow: '0 0 10px 0px #000',
                                },
                            }}
                            key={asset._id}
                        >
                            <Box width={250} height={250} borderRadius="8px 8px 0 0" position="relative">
                                <MediaRenderer
                                    src={`${ASSET_STORAGE_URL}/${asset.preview}`}
                                    fallbackSrc={NO_IMAGE_ASSET}
                                    preSource={
                                        nextAssetExists ? `${ASSET_STORAGE_URL}/${assets[index + 1]?.preview}` : ''
                                    }
                                />
                            </Box>
                            <CardContent
                                sx={{ width: 250, p: 3, pt: 2 }}
                                style={{
                                    borderBottomRightRadius: 10,
                                    borderBottomLeftRadius: 10,
                                }}
                            >
                                <Typography
                                    title={assetTitle}
                                    variant="h6"
                                    sx={{ cursor: 'pointer' }}
                                    width="100%"
                                    whiteSpace="nowrap"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                >
                                    {assetTitle}
                                </Typography>
                                <Box sx={{ width: '100%' }}>
                                    <Username username={creatorName} vaultAdress={vaultAddress} size="small" />
                                </Box>
                                <Stack direction="row" justifyContent="space-between" mt={2}>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            overflow="hidden"
                                            whiteSpace="nowrap"
                                            textOverflow="ellipsis"
                                        >
                                            Last Sold
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            overflow="hidden"
                                            whiteSpace="nowrap"
                                            textOverflow="ellipsis"
                                        >
                                            {price}
                                        </Typography>
                                    </Box>

                                    <Paper
                                        sx={{
                                            backgroundColor: 'red',
                                            borderRadius: '100%',
                                            height: 40,
                                            width: 40,
                                        }}
                                    />
                                </Stack>
                            </CardContent>
                        </Box>
                    );
                })}
            </Marquee>
        </Box>
    );
}

export default RecentlySoldSlider;

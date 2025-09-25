import { Box } from '@mui/material';
import { useState } from 'react';
import { Asset } from '@/features/assets/types';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import ActionButton from './ActionButtonItem';
import { getThumbnailFromPath } from '@/utils/url-assets';

interface ActionButtonsProps {
    asset: Asset;
    format: string;
    setImage: (value: string, isThumbnail?: boolean) => void;
    setFormat: (value: string) => void;
    handleLoad: () => void;
}

export default function ActionButtons({
    asset,
    format = 'preview',
    setImage,
    handleLoad,
    setFormat,
}: ActionButtonsProps) {
    const btsVideoPath = asset?.mediaAuxiliary?.formats?.btsVideo?.path;
    const btsImagePath = asset?.mediaAuxiliary?.formats?.btsImage?.path;
    const exhibitionPath = asset?.formats?.exhibition?.path;
    const mediaPath = btsVideoPath || btsImagePath || exhibitionPath;

    const handleSelect = (button: string) => {
        setFormat(button);
    };

    return (
        <Box display="flex" justifyContent="space-around">
            <ActionButton
                title="Preview"
                formatMedia={getThumbnailFromPath}
                media={`${ASSET_STORAGE_URL}/${asset?.formats?.preview?.path}`}
                onClick={() => {
                    setImage(`${ASSET_STORAGE_URL}/${asset?.formats?.preview?.path}`);
                    handleSelect('preview');
                }}
                selected={format === 'preview' ? 'preview' : false}
            />
            <ActionButton
                title="Display (4K)"
                formatMedia={getThumbnailFromPath}
                media={`${ASSET_STORAGE_URL}/${asset?.formats?.display?.path}`}
                onClick={() => {
                    setImage(`${ASSET_STORAGE_URL}/${asset?.formats?.display?.path}`);
                    handleSelect('display');
                }}
                handleLoad={handleLoad}
                handleSelect={() => handleSelect('display')}
                selected={format === 'display' ? 'display' : false}
            />
            <ActionButton
                title="Original"
                formatMedia={getThumbnailFromPath}
                media={`${ASSET_STORAGE_URL}/${asset?.formats?.original?.path}`}
                onClick={() => {
                    setImage(`${ASSET_STORAGE_URL}/${asset?.formats?.original?.path}`);
                    handleSelect('original');
                }}
                selected={format === 'original' ? 'original' : false}
            />

            {(btsVideoPath || btsImagePath) && (
                <ActionButton
                    title={btsVideoPath ? 'BTS Video' : btsImagePath ? 'BTS Image' : ''}
                    media={`${ASSET_STORAGE_URL}/${mediaPath}`}
                    onClick={() => {
                        setImage(`${ASSET_STORAGE_URL}/${mediaPath}`, false);
                        handleSelect('exhibition');
                    }}
                    selected={format === 'exhibition' ? 'exhibition' : false}
                />
            )}
        </Box>
    );
}

import { Box } from '@mui/material';
import { useState } from 'react';
import { Asset } from '@/features/assets/types';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import ActionButton from './ActionButtonItem';

interface ActionButtonsProps {
    asset: Asset;
    setImage: (value: string) => void;
    handleLoad: () => void;
}

export default function ActionButtons({ asset, setImage, handleLoad }: ActionButtonsProps) {
    const [selected, setSelected] = useState<string | false>('preview');
    const btsVideoPath = asset?.mediaAuxiliary?.formats?.btsVideo?.path;
    const btsImagePath = asset?.mediaAuxiliary?.formats?.btsImage?.path;
    const exhibitionPath = asset?.formats?.exhibition?.path;
    const mediaPath = btsVideoPath || btsImagePath || exhibitionPath;

    const handleSelect = (button: string) => {
        setSelected(button);
    };

    return (
        <Box display="flex" justifyContent="space-around">
            <ActionButton
                title="Preview"
                media={`${ASSET_STORAGE_URL}/${asset?.formats?.preview?.path}`}
                onClick={() => {
                    setImage(`${ASSET_STORAGE_URL}/${asset?.formats?.preview?.path}`);
                    handleSelect('preview');
                }}
                selected={selected === 'preview' ? 'preview' : false}
            />
            <ActionButton
                title="Display (4K)"
                media={`${ASSET_STORAGE_URL}/${asset?.formats?.display?.path}`}
                onClick={() => {
                    setImage(`${ASSET_STORAGE_URL}/${asset?.formats?.display?.path}`);
                    handleSelect('display');
                }}
                handleLoad={handleLoad}
                handleSelect={() => handleSelect('display')}
                selected={selected === 'display' ? 'display' : false}
            />
            <ActionButton
                title="Original"
                media={`${ASSET_STORAGE_URL}/${asset?.formats?.original?.path}`}
                onClick={() => {
                    setImage(`${ASSET_STORAGE_URL}/${asset?.formats?.original?.path}`);
                    handleSelect('original');
                }}
                selected={selected === 'original' ? 'original' : false}
            />

            {(btsVideoPath || btsImagePath) && (
                <ActionButton
                    title={btsVideoPath ? 'BTS Video' : btsImagePath ? 'BTS Image' : ''}
                    media={`${ASSET_STORAGE_URL}/${mediaPath}`}
                    onClick={() => {
                        setImage(`${ASSET_STORAGE_URL}/${mediaPath}`);
                        handleSelect('exhibition');
                    }}
                    selected={selected === 'exhibition' ? 'exhibition' : false}
                />
            )}
        </Box>
    );
}

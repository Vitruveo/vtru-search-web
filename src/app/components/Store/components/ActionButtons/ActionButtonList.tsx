import { Box } from '@mui/material';
import { useState } from 'react';
import { Asset } from '@/features/assets/types';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
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
        <Box display="flex" justifyContent="space-between">
            <ActionButton
                title="Original"
                media={`${AWS_BASE_URL_S3}/${asset?.formats?.original?.path}`}
                onClick={() => {
                    setImage(`${AWS_BASE_URL_S3}/${asset?.formats?.original?.path}`);
                    handleSelect('original');
                }}
                selected={selected === 'original' ? 'original' : false}
                handleLoad={handleLoad}
                handleSelect={handleSelect}
            />

            <ActionButton
                title="Preview"
                media={`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`}
                onClick={() => {
                    setImage(`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`);
                    handleSelect('preview');
                }}
                selected={selected === 'preview' ? 'preview' : false}
            />

            <ActionButton
                title={btsVideoPath ? 'BTS Video' : btsImagePath ? 'BTS Image' : 'Exhibition'}
                media={`${AWS_BASE_URL_S3}/${mediaPath}`}
                onClick={() => {
                    setImage(`${AWS_BASE_URL_S3}/${mediaPath}`);
                    handleSelect('exhibition');
                }}
                selected={selected === 'exhibition' ? 'exhibition' : false}
            />

            <ActionButton
                title="Display"
                media={`${AWS_BASE_URL_S3}/${asset?.formats?.display?.path}`}
                onClick={() => {
                    setImage(`${AWS_BASE_URL_S3}/${asset?.formats?.display?.path}`);
                    handleSelect('display');
                }}
                selected={selected === 'display' ? 'display' : false}
            />
        </Box>
    );
}

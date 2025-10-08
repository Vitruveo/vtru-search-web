import { Box } from '@mui/material';
import { Asset } from '@/features/assets/types';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import ActionButton from './ActionButtonItem';
import { ThumbPathType } from '../..';

interface ActionButtonsProps {
    asset: Asset;
    format: string;
    thumbPaths: ThumbPathType;
    setImage: ({
        newImage,
        isThumbnail,
        assetFormat,
    }: {
        newImage: string;
        isThumbnail?: boolean;
        assetFormat: string;
    }) => void;
    setFormat: (value: string) => void;
    handleLoad: () => void;
}

export default function ActionButtons({
    asset,
    thumbPaths,
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
                thumbPath={thumbPaths.preview}
                media={`${ASSET_STORAGE_URL}/${asset?.formats?.preview?.path}`}
                onClick={() => {
                    setImage({
                        newImage: `${ASSET_STORAGE_URL}/${asset?.formats?.preview?.path}`,
                        assetFormat: 'preview',
                    });
                    handleSelect('preview');
                }}
                selected={format === 'preview' ? 'preview' : false}
            />
            <ActionButton
                title="Display (4K)"
                thumbPath={thumbPaths.display}
                media={`${ASSET_STORAGE_URL}/${asset?.formats?.display?.path}`}
                onClick={() => {
                    setImage({
                        newImage: `${ASSET_STORAGE_URL}/${asset?.formats?.display?.path}`,
                        assetFormat: 'display',
                    });
                    handleSelect('display');
                }}
                handleLoad={handleLoad}
                handleSelect={() => handleSelect('display')}
                selected={format === 'display' ? 'display' : false}
            />
            <ActionButton
                title="Original"
                thumbPath={thumbPaths.original}
                media={`${ASSET_STORAGE_URL}/${asset?.formats?.original?.path}`}
                onClick={() => {
                    setImage({
                        newImage: `${ASSET_STORAGE_URL}/${asset?.formats?.original?.path}`,
                        assetFormat: 'original',
                    });
                    handleSelect('original');
                }}
                selected={format === 'original' ? 'original' : false}
            />

            {(btsVideoPath || btsImagePath) && (
                <ActionButton
                    title={btsVideoPath ? 'BTS Video' : btsImagePath ? 'BTS Image' : ''}
                    media={`${ASSET_STORAGE_URL}/${mediaPath}`}
                    onClick={() => {
                        setImage({
                            newImage: `${ASSET_STORAGE_URL}/${mediaPath}`,
                            assetFormat: 'exhibition',
                            isThumbnail: false,
                        });
                        handleSelect('exhibition');
                    }}
                    selected={format === 'exhibition' ? 'exhibition' : false}
                />
            )}
        </Box>
    );
}

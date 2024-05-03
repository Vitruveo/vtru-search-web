import Image from 'next/image';
import { Skeleton } from '@mui/material';

interface MediaRendererProps {
    src: string;
}

export const MediaRenderer = ({ src }: MediaRendererProps) => {
    const isImage = src.match(/\.(jpeg|jpg|gif|png)$/) != null;
    const isVideo = src.match(/\.(mp4|webm|ogg)$/) != null;

    if (isVideo) {
        return (
            <video controls>
                <source src={src} type="video/mp4" />
            </video>
        );
    }

    if (isImage) {
        return <Image src={src} alt="img" width={160} height={160} />;
    }

    return <Skeleton variant="rectangular" width={160} height={160} />;
};

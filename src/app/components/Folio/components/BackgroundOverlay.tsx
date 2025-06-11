interface BackgroundOverlayProps {
    src: string;
}

export const BackgroundOverlay = ({ src }: BackgroundOverlayProps) => {
    const isVideo = src.match(/\.(mp4|webm|ogg)$/) != null;

    if (isVideo) {
        return;
    }

    return <img src={src} className="absolute inset-0 w-full h-full -z-10 brightness-[0.4] object-cover blur" />;
};

interface MediaRendererProps {
    src: string;
}

export const MediaRenderer = ({ src }: MediaRendererProps) => {
    const isImage = src.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
    const isVideo = src.match(/\.(mp4|webm|ogg)$/) != null;

    if (isVideo) {
        return (
            <video autoPlay muted loop>
                <source src={src} type="video/mp4" className="w-full h-full object-contain object-center" />
            </video>
        );
    }

    if (isImage) {
        return <img src={src} alt="asset" className="w-full h-full object-contain object-center" />;
    }

    return <h1>Unsupported media type</h1>;
};

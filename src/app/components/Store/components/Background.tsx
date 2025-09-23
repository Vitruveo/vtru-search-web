import { ASSET_STORAGE_URL } from '@/constants/aws';

interface Props {
    path: string;
    withBaseUrl?: boolean;
}

export const Background = ({ path, withBaseUrl = true }: Props) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${withBaseUrl ? `${ASSET_STORAGE_URL}/${path}` : path})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                objectFit: 'contain',
                opacity: 0.25,
                zIndex: -1,
            }}
        />
    );
};

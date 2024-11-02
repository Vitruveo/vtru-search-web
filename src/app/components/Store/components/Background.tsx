import { ASSET_STORAGE_URL } from '@/constants/aws';

interface Props {
    path: string;
}

export const Background = ({ path }: Props) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${`${ASSET_STORAGE_URL}/${path}`})`,
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

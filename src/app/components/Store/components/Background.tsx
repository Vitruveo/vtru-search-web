import { AWS_BASE_URL_S3 } from '@/constants/aws';

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
                backgroundImage: `url(${`${AWS_BASE_URL_S3}/${path}`})`,
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

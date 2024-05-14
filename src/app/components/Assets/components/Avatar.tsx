import React, { useState } from 'react';
import { Avatar as AvatarMui } from '@mui/material';

const sizes = {
    small: { width: 40, height: 40 },
    medium: { width: 68, height: 68 },
    large: { width: 98, height: 98 },
};

type AvatarProps = {
    baseUrl: string;
    path?: string;
    name?: string;
    format?: 'circular' | 'square';
    size?: 'small' | 'medium' | 'large';
};

function Avatar({ baseUrl, name, path, format = 'circular', size = 'small' }: AvatarProps) {
    const [error, setError] = useState(false);

    const handleImageError = () => {
        setError(true);
    };

    const imageUrl = `${baseUrl}/${path}`;

    if (!error && imageUrl) {
        return <AvatarMui variant={format} sx={sizes[size]} src={imageUrl} alt="avatar" onError={handleImageError} />;
    }

    return name ? (
        <AvatarMui variant={format} sx={sizes[size]}>
            {name.toUpperCase().substring(0, 2)}
        </AvatarMui>
    ) : (
        <AvatarMui variant={format} sx={sizes[size]} alt="default image" />
    );
}

export default function AvatarWrapper({ baseUrl, name, path, format = 'circular', size = 'small' }: AvatarProps) {
    if (!path && name)
        return (
            <AvatarMui variant={format} sx={sizes[size]}>
                {name.toUpperCase().substring(0, 2)}
            </AvatarMui>
        );
    if (!path && !name) return <AvatarMui variant={format} sx={sizes[size]} alt="default image" />;
    return <Avatar baseUrl={baseUrl} name={name} path={path} format={format} size={size} />;
}

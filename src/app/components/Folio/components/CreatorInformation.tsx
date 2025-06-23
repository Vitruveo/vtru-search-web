import { twMerge } from 'tailwind-merge';
import { CreatorInterface } from '../types';
import { buildGeneralURL } from '../utils';
import { NO_IMAGE_ASSET } from '@/constants/asset';

export const CreatorInformation = ({ username, avatar, className, preAvatar }: CreatorInterface) => {
    return (
        <div className={twMerge('flex flex-col gap-2 items-center', className)}>
            {preAvatar && (
                <img src={buildGeneralURL(preAvatar)} alt={username + ' Pre Avatar'} style={{ display: 'none' }} />
            )}

            <img
                src={avatar ? buildGeneralURL(avatar) : NO_IMAGE_ASSET}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.onerror = null; // Prevents infinite loop if the image fails to load again
                    e.currentTarget.src = NO_IMAGE_ASSET; // Fallback to a default image
                }}
                alt={username + ' Profile Picture'}
                className="w-full aspect-square object-cover rounded-full bg-white"
            />

            <h2 className="max-w-full text-center mb-2 break-words">{username}</h2>
        </div>
    );
};

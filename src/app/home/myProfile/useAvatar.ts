import { GENERAL_STORAGE_URL } from '@/constants/asset';
import { useSelector } from '@/store/hooks';

export const useAvatar = () => {
    const avatarSrc = '/images/profile/profileDefault.png';

    return {
        avatarSrc,
    };
};

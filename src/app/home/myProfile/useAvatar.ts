import { GENERAL_STORAGE_URL } from '@/constants/asset';
import { userSelector } from '@/features/user';
import { useSelector } from '@/store/hooks';

export const useAvatar = () => {
    const { profile } = useSelector(userSelector(['profile']));

    const avatarSrc =
        profile.avatar && profile.avatar.length
            ? `${GENERAL_STORAGE_URL}/${profile.avatar}`
            : '/images/profile/profileDefault.png';

    return {
        avatarSrc,
    };
};

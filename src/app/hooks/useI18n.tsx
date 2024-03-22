import { useMemo } from 'react';
import languages from '@/i18n';

import { useSelector } from '@/store/hooks';

export const useI18n = () => {
    const currentLanguage = useSelector((state) => state.customizer.currentLanguage);

    const language = useMemo(() => languages[currentLanguage] || languages.default, [currentLanguage]);

    return {
        language,
    };
};

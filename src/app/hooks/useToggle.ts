import { useState } from 'react';

interface UseToggleParams {
    initialValue?: boolean;
}

export const useToggle = (props?: UseToggleParams) => {
    const [isActive, setIsActive] = useState<boolean>(props?.initialValue ?? false);

    const toggle = () => {
        setIsActive((prev) => !prev);
    };

    const activate = () => {
        setIsActive(true);
    };

    const deactivate = () => {
        setIsActive(false);
    };

    return {
        isActive,
        toggle,
        activate,
        deactivate,
    };
};

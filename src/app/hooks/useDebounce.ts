import { useEffect, useState } from 'react';

export const useDebounce = <T>({ value, delay }: { value: T; delay: number }) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeExec = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeExec);
        };
    }, [value, delay]);

    return debouncedValue;
};

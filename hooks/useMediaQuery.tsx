import { useEffect, useState } from 'react';

type MediaQuerySize = {
    isSmall: boolean;
    isMedium: boolean;
    isLarge: boolean;
};
export const useMediaQuery = (): MediaQuerySize => {
    const [isSmall, setIsSmall] = useState<boolean>(false);
    const [isMedium, setIsMedium] = useState<boolean>(false);
    const [isLarge, setIsLarge] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('resize', handleScreenSize);
        return () => {
            window.removeEventListener('resize', handleScreenSize);
        };
    }, []);

    const handleScreenSize = (uiEvent: UIEvent) => {
        const { currentTarget } = uiEvent!;
        // @ts-ignore
        const { innerWidth } = currentTarget as EventTarget;

        if (innerWidth >= 576 && innerWidth <= 768) {
            setIsSmall(true);
            setIsMedium(false);
            setIsLarge(false);
            return;
        }

        if (innerWidth > 768 && innerWidth <= 992) {
            setIsSmall(true);
            setIsMedium(true);
            setIsLarge(false);
            return;
        }

        setIsSmall(false);
        setIsMedium(false);
        setIsLarge(true);
        return;
    };

    return {
        isSmall,
        isMedium,
        isLarge,
    };
};

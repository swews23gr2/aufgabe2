import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightToBracket,
    faBook,
    faHouse,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
    useApplicationContextApi,
    tokenExist,
} from '@/context/ApplicationContextApi';
import { useRouter } from 'next/navigation';

type NavigationButton = {
    label: string;
    // eslint-disable-next-line no-undef
    icon: JSX.Element;
    isActive: boolean;
    onClick: () => void;
};

type ApplicationNavigation = {
    navigationButtons: NavigationButton[];
};

export const useApplicationNavigation = (): ApplicationNavigation => {
    const appContext = useApplicationContextApi();
    const router = useRouter();

    const INITIAL_BUTTONS: NavigationButton[] = [
        {
            label: 'Startseite',
            icon: (
                <FontAwesomeIcon
                    icon={faHouse}
                    style={{ color: 'black', fontSize: 20 }}
                />
            ),
            isActive: true,
            onClick: () => router.push('/'),
        },
        {
            label: 'Bücher',
            icon: (
                <FontAwesomeIcon
                    icon={faBook}
                    style={{ color: 'black', fontSize: 20 }}
                />
            ),
            isActive: false,
            onClick: () => router.push('/buecher'),
        },
        {
            label: 'Anlegen',
            icon: (
                <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: 'black', fontSize: 20 }}
                />
            ),
            isActive: false,
            onClick: () => router.push('/anlegen'),
        },
        {
            label: `${tokenExist() ? 'Abmelden' : 'Anmelden'}`,
            icon: (
                <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    style={{ color: 'black', fontSize: 20 }}
                />
            ),
            isActive: false,
            onClick: () => appContext.logout(),
        },
    ];

    const [navigationButtons] = useState<NavigationButton[]>(INITIAL_BUTTONS);

    return {
        navigationButtons,
    };
};

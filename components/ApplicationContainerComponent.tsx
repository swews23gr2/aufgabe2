'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { NavigationBarComponent } from '@/components/NavigationBarComponent';
import { FooterComponent } from '@/components/FooterComponent';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { BottomNavigationComponent } from '@/components/BottomNavigationComponent';
import { LoginComponent } from '@/components/LoginComponent';
import {
    ApplicationContextProvider,
    tokenExist,
    initializeRequestInterceptor,
} from '@/context/ApplicationContextApi';

type Props = PropsWithChildren;

export const ApplicationContainerComponent: React.FC<Props> = (
    props: Props,
) => {
    const [jwtTokenIsValid, setJwtTokenIsValid] = useState<boolean | undefined>(
        tokenExist(),
    );

    useEffect(() => {
        initializeRequestInterceptor(setJwtTokenIsValid);
    }, []);

    return (
        <ApplicationContextProvider>
            <div {...styles.appContainer()}>
                <NavigationBarComponent />
                {jwtTokenIsValid ? (
                    <main {...styles.mainContentContainer()}>
                        {props.children}
                    </main>
                ) : (
                    <LoginComponent />
                )}
                <FooterComponent />
                <BottomNavigationComponent />
            </div>
        </ApplicationContextProvider>
    );
};

const styles: ExtendedStyleProps = {
    appContainer: () => ({
        style: {
            display: 'grid',
            gridTemplateRows: 'max-content minmax(80vh, 1fr) max-content',
        },
    }),

    mainContentContainer: () => ({
        style: {
            width: '100%',
        },
    }),
};

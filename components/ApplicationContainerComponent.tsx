import React, { PropsWithChildren } from 'react';
import { NavigationBarComponent } from '@/components/NavigationBarComponent';
import { FooterComponent } from '@/components/FooterComponent';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { BottomNavigationComponent } from '@/components/BottomNavigationComponent';

type Props = PropsWithChildren;

export const ApplicationContainerComponent: React.FC<Props> = (
    props: Props,
) => {
    return (
        <div {...styles.appContainer()}>
            <NavigationBarComponent />
            <main {...styles.mainContentContainer()}>{props.children}</main>
            <FooterComponent />
            <BottomNavigationComponent />
        </div>
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

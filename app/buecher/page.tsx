'use client';
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PageContentWrapperComponent from '@/components/shared/PageContentWrapperComponent';
import SearchInputComponent from '@/components/SearchInputComponent';
import { useFetch } from '@/hooks/useFetch';
import { Buch } from '@/api/buch';
import { BucherTabelleComponent } from '@/components/BucherTabelleComponent';
import { BucherCardViewComponent } from '@/components/BucherCardViewComponent';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';
import { LoadingComponent } from '@/components/shared/LoadingComponent';
import { ErrorBannerComponent } from '@/components/shared/ErrorBannerComponent';
import { faTable, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';

type ViewType = 'TABLE' | 'CARDS';

const BuecherListe: React.FC = () => {
    const appContext = useApplicationContextApi();
    const {
        data: buecher,
        isLoading,
        error,
    } = useFetch<Buch[]>(appContext.getAlleBuecher());

    const [viewType, setViewType] = useState<ViewType>('TABLE');

    if (isLoading) return <LoadingComponent />;

    if (error) return <ErrorBannerComponent message={error} />;

    return (
        <PageContentWrapperComponent title={'Bücher'}>
            <div>
                <SearchInputComponent
                    data={buecher}
                    inputProps={{ placeholder: 'Nach Büchern suchen' }}
                    optionRight={
                        <ViewSwitchComponent
                            viewType={viewType}
                            switchView={setViewType}
                        />
                    }
                >
                    {(buecher) =>
                        buecher.length > 0 ? (
                            viewType === 'TABLE' ? (
                                <BucherTabelleComponent buecher={buecher} />
                            ) : (
                                <BucherCardViewComponent buecher={buecher} />
                            )
                        ) : (
                            <div role="alert" className="alert alert-warning">
                                Kein Buch gefunden!
                            </div>
                        )
                    }
                </SearchInputComponent>
            </div>
        </PageContentWrapperComponent>
    );
};

type PropsViewSwitch = {
    viewType: ViewType;
    switchView: (view: ViewType) => void;
};
const ViewSwitchComponent: React.FC<PropsViewSwitch> = (
    props: PropsViewSwitch,
) => {
    const { viewType, switchView } = props;
    return (
        <>
            <FontAwesomeIcon
                icon={faTable}
                {...styles.viewSwitchIcon(viewType === 'TABLE')}
                onClick={() => switchView('TABLE')}
            />
            <FontAwesomeIcon
                icon={faExpand}
                {...styles.viewSwitchIcon(viewType === 'CARDS')}
                onClick={() => switchView('CARDS')}
            />
        </>
    );
};

const styles: ExtendedStyleProps = {
    viewSwitchIcon: (isActive: boolean) => ({
        style: {
            fontSize: 20,
            cursor: 'pointer',
            color: isActive ? 'var(--color-main)' : 'black',
            ...(isActive && {
                padding: 'var(--padding-1)',
                borderRadius: '10px',
                backgroundColor: 'var(--color-secondary)',
            }),
        },
    }),
};

export default BuecherListe;
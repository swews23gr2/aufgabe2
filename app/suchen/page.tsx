'use client';
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PageContentWrapperComponent from '@/components/shared/PageContentWrapperComponent';
import { useFetch } from '@/hooks/useFetch';
import { Buch } from '@/api/buch';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';
import { LoadingComponent } from '@/components/shared/LoadingComponent';
import { ErrorBannerComponent } from '@/components/shared/ErrorBannerComponent';
import { GenericEntityListFilerComponent } from '@/components/shared/GenericEntityListFilterComponent';

type SearchType = {
    [key in keyof Partial<Buch>]: string;
};

const SuchFormular: React.FC = () => {
    const appContext = useApplicationContextApi();
    const { isLoading, error } = useFetch<Buch[]>(appContext.getAlleBuecher());

    const [searchCriteria, setSearchCriteria] = useState<SearchType>({});

    const handleRadioboxChange = (radioboxName: string) => {
        setSearchCriteria(() => {
            return {
                ...searchCriteria,
                schlagwoerter: radioboxName,
            };
        });
    };

    const renderRadiobutton = (value: string, label: string) => (
        <div key={value}>
            <input
                type="radio"
                id={`option-${value}`}
                value={value}
                checked={searchCriteria.schlagwoerter === value}
                onChange={() => handleRadioboxChange(value)}
            />
            <label htmlFor={`option-${value}`}>{label}</label>
        </div>
    );

    const renderInputField = (
        id: string,
        value: string,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    ) => (
        <div key={id}>
            <input type="checkbox" id={id} value={value} onChange={onChange} />
            <label htmlFor={id}>{value}</label>
        </div>
    );

    if (error) return <ErrorBannerComponent message={error} />;

    return (
        <PageContentWrapperComponent title={'Bücher Suchen'}>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <div>
                    <div>
                        {renderRadiobutton('typescript', 'Typescript')}
                        {renderRadiobutton('javascript', 'Javascript')}
                    </div>
                    <div>
                        <div>
                            {renderInputField('checkbox1', 'Phi', (e) =>
                                setSearchCriteria((prevCriteria) => {
                                    const updatedCriteria = { ...prevCriteria };
                                    if (!e.target.checked) {
                                        delete updatedCriteria.titel;
                                    } else {
                                        updatedCriteria.titel = e.target.value;
                                    }
                                    return updatedCriteria;
                                }),
                            )}
                        </div>
                    </div>
                    {/* Hier weitere Eingabefelder einfügen */}
                    <div>
                        <GenericEntityListFilerComponent
                            searchCriteria={searchCriteria}
                        />
                    </div>
                </div>
            )}
        </PageContentWrapperComponent>
    );
};

export default SuchFormular;

'use client';
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import PageContentWrapperComponent from '@/components/shared/PageContentWrapperComponent';
import { Buch } from '@/api/buch';
import {
    GenericEntityListFilerComponent,
    PropsGenericEntityListFiler,
} from '@/components/shared/GenericEntityListFilterComponent';

const SuchFormular: React.FC = () => {
    const [searchCriteria, setSearchCriteria] = useState<
        PropsGenericEntityListFiler<Buch>['searchCriteria']
    >({});

    const handleRadioboxChange = (radioboxName: string) => {
        setSearchCriteria(() => {
            return {
                ...searchCriteria,
                schlagwoerter: radioboxName,
            };
        });
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchCriteria((prevCriteria) => {
            const updatedCriteria = { ...prevCriteria };
            e.target.checked
                ? (updatedCriteria.titel = e.target.value)
                : delete updatedCriteria.titel;
            return updatedCriteria;
        });
    };

    const renderInputField = (props: InputHTMLAttributes<any>) => {
        const { id, value } = props;
        return (
            <div key={id}>
                <input {...props} />
                <label htmlFor={id}>{value}</label>
            </div>
        );
    };

    return (
        <PageContentWrapperComponent title={'Bücher Suchen'}>
            <div>
                <div>
                    {renderInputField({
                        type: 'radio',
                        id: 'Typescript',
                        value: 'typescript',
                        checked: searchCriteria.schlagwoerter === 'Typescript',
                        onChange: () => handleRadioboxChange('Typescript'),
                    })}
                    {renderInputField({
                        type: 'radio',
                        id: 'Javascript',
                        value: 'javascript',
                        checked: searchCriteria.schlagwoerter === 'Javascript',
                        onChange: () => handleRadioboxChange('Javascript'),
                    })}
                </div>
                <div>
                    {renderInputField({
                        type: 'checkbox',
                        id: 'Phi',
                        value: 'Phi',
                        onChange: (e: ChangeEvent<HTMLInputElement>) =>
                            handleCheckboxChange(e),
                    })}
                </div>
                {/* Hier weitere Eingabefelder einfügen */}
                <div>
                    <GenericEntityListFilerComponent
                        searchCriteria={searchCriteria}
                    />
                </div>
            </div>
        </PageContentWrapperComponent>
    );
};

export default SuchFormular;

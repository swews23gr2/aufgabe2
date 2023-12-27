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
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';

type SearchCriteria = PropsGenericEntityListFiler<Buch>['searchCriteria'];

const SuchFormular: React.FC = () => {
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({});

    const handleRadioboxChange = (
        e: ChangeEvent<HTMLInputElement>,
        criteriaProp: keyof SearchCriteria,
    ) => {
        setSearchCriteria(() => {
            return {
                ...searchCriteria,
                [criteriaProp]: e.target.value,
            };
        });
    };

    const handleCheckboxChange = <K extends keyof SearchCriteria>(
        e: ChangeEvent<HTMLInputElement>,
        criteriaProp: K,
    ) => {
        setSearchCriteria((prevCriteria) => {
            const updatedCriteria = { ...prevCriteria };
            e.target.checked
                ? (updatedCriteria[criteriaProp] = e.target.value)
                : delete updatedCriteria[criteriaProp];
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
                <div {...styles.searchBar()}>
                    <div {...styles.radioButtonContainer()}>
                        {renderInputField({
                            type: 'radio',
                            id: 'KINDLE',
                            value: 'KINDLE',
                            checked: searchCriteria.art === 'KINDLE',
                            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                handleRadioboxChange(e, 'art'),
                        })}
                        {renderInputField({
                            type: 'radio',
                            id: 'DRUCKAUSGABE',
                            value: 'DRUCKAUSGABE',
                            checked: searchCriteria.art === 'DRUCKAUSGABE',
                            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                handleRadioboxChange(e, 'art'),
                        })}
                    </div>
                    <div {...styles.checkboxContainer}>
                        {renderInputField({
                            type: 'checkbox',
                            id: 'Phi',
                            value: 'Phi',
                            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                handleCheckboxChange(e, 'titel'),
                        })}
                    </div>
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

const styles: ExtendedStyleProps = {
    radioButtonContainer: () => ({
        style: {
            display: 'flex',
            flexDirection: 'column',
        },
    }),
    checkboxContainer: () => ({
        style: {
            display: 'flex',
            flexDirection: 'column',
        },
    }),
    searchBar: () => ({
        style: {
            display: 'flex',
            flexDirection: 'row',
            gap: 'var(--gap-4)',
            alignItems: 'center',
        },
    }),
};

export default SuchFormular;

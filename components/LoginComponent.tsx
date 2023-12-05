'use client';
import React, { useEffect, useState } from 'react';
import { CenteredSectionComponent } from '@/components/shared/CenteredSectionComponent';
import InputFieldComponent from '@/components/shared/InputFieldComponent';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { LoginDaten } from '@/api/auth';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';

export const LoginComponent: React.FC = () => {
    const appContext = useApplicationContextApi();

    const { isSmall } = useMediaQuery();

    const [loginDaten, setLoginDaten] = useState<LoginDaten>({
        username: '',
        password: '',
    });

    const [isInputValid, setIsInputValid] = useState<boolean>(false);

    const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] =
        useState<boolean>(false);

    useEffect(() => {
        validateInput();
    }, [loginDaten, termsAndConditionsAccepted]);

    const handleChange = (e: any) => {
        setLoginDaten((prevState) => ({
            ...prevState,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = () => {
        void appContext.login(loginDaten);
    };

    const validateInput = () => {
        if (
            loginDaten.username === '' ||
            loginDaten.password === '' ||
            !termsAndConditionsAccepted
        ) {
            setIsInputValid(false);
            return;
        }
        setIsInputValid(true);
    };

    return (
        <CenteredSectionComponent>
            <div {...styles.loginContainer()}>
                <div {...styles.content(isSmall)}>
                    <div {...styles.cardTitle()}>Anmeldung</div>
                    <div {...styles.inputFieldListContainer()}>
                        <InputFieldComponent
                            label={'Benutzername'}
                            name={'username'}
                            type={'text'}
                            placeholder={'zB: admin'}
                            value={loginDaten?.username}
                            onChange={handleChange}
                        />
                        <InputFieldComponent
                            label={'Passwort'}
                            name={'password'}
                            type={'password'}
                            placeholder={'zB: p'}
                            value={loginDaten?.password}
                            onChange={handleChange}
                        />

                        <div {...styles.checkboxContainer()}>
                            <input
                                type="checkbox"
                                id="termsAndConditions"
                                checked={termsAndConditionsAccepted}
                                {...styles.checkboxInput()}
                                onClick={() =>
                                    setTermsAndConditionsAccepted(
                                        !termsAndConditionsAccepted,
                                    )
                                }
                            />
                            <label
                                htmlFor="termsAndConditions"
                                {...styles.checkboxLabel()}
                            >
                                Ich habe die AGBs gelesen, verstanden und stimme
                                zu
                            </label>
                        </div>
                    </div>

                    <button
                        type="button"
                        {...styles.submitButton()}
                        onClick={handleLogin}
                        disabled={!isInputValid}
                    >
                        Anmelden
                    </button>
                </div>
            </div>
        </CenteredSectionComponent>
    );
};

const styles: ExtendedStyleProps = {
    loginContainer: () => ({
        style: {
            display: 'grid',
            alignItems: 'start',
            alignContent: 'start',
            justifyItems: 'center',
            padding: 'var(--padding-10) var(--padding-2) 0 var(--padding-2)',
        },
    }),

    content: (isScreenSmall: boolean) => ({
        style: {
            display: 'grid',
            alignItems: 'start',
            alignContent: 'start',
            boxShadow: '0 0 10px grey',
            padding: 'var(--padding-3) var(--padding-2)',
            minWidth: `${isScreenSmall ? '100%' : '30%'}`,
            borderRadius: 'var(--gap-1)',
        },
    }),

    cardTitle: () => ({
        style: {
            fontSize: 'var(--font-extra-large-size)',
            fontWeight: '600',
            justifySelf: 'center',
            marginBottom: 'var(--gap-5)',
        },
    }),

    submitButton: () => ({
        className: 'btn',
        style: {
            backgroundColor: 'var(--color-main)',
            width: '100%',
            color: 'var(--color-white)',
            marginTop: 'var(--gap-2)',
        },
    }),

    inputFieldListContainer: () => ({
        style: {
            display: 'grid',
            gap: 'var(--gap-2)',
        },
    }),

    checkboxContainer: () => ({
        className: 'form-check',
        style: {},
    }),

    checkboxInput: () => ({
        className: 'form-check-input',
        style: {
            color: 'var(--color-main)',
        },
    }),

    checkboxLabel: () => ({
        className: 'form-check-label',
        style: {
            color: 'var(--color-main)',
        },
    }),
};

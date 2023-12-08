'use client';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GraphQlLoginResponse, loginApi, LoginDaten } from '@/api/auth';
import { GraphQLErrorItem, GraphqlErrorResponse } from '@/api/graphqlError';

type ContextOutput = {
    login: (
        // eslint-disable-next-line no-unused-vars
        loginDaten: LoginDaten,
    ) => Promise<void>;
    logout: () => void;
    tokenExistsAndIsValid: () => boolean;
    initializeRequestInterceptor: (
        // eslint-disable-next-line no-unused-vars
        announceTokenValidity: (isTokenValid: boolean) => void,
    ) => void;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const ApplicationContext = createContext<ContextOutput>({});

export const useApplicationContextApi = () => {
    return useContext(ApplicationContext);
};

type Props = PropsWithChildren;
export const ApplicationContextProvider: React.FC<Props> = (props: Props) => {
    const { children } = props;

    const baseConfig: AxiosRequestConfig<string> = {
        method: 'post',
        url: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL as string,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const login = async (loginDaten: LoginDaten) => {
        const loginResponse: AxiosResponse<GraphQlLoginResponse> =
            await loginApi(loginDaten, baseConfig);
        handleGraphQLRequestError(loginResponse.data as GraphqlErrorResponse);
        saveToken(loginResponse.data.data.login.token);
        location.reload();
    };

    const logout = () => {
        deleteToken();
        location.reload();
    };

    const saveToken = (token: string) => {
        localStorage.setItem('auth_token', token);
    };

    const deleteToken = () => {
        localStorage.removeItem('auth_token');
    };

    const handleGraphQLRequestError = (errorResponse: GraphqlErrorResponse) => {
        const errors: GraphQLErrorItem[] | undefined = errorResponse.errors;
        if (errors === undefined) return;
        const errorMessage: string = errors[0].message;
        console.error(errorMessage);
        throw new Error(errorMessage);
    };

    const tokenExistsAndIsValid = (): boolean => {
        const authenticationToken =
            typeof localStorage !== 'undefined'
                ? localStorage.getItem('auth_token')
                : undefined;

        switch (authenticationToken) {
            case undefined:
                return false;
            case 'undefined':
                return false;
            case null:
                return false;
            case 'null':
                return false;
            case '':
                return false;
            default:
                return true;
        }
    };

    const initializeRequestInterceptor = (
        // eslint-disable-next-line no-unused-vars
        announceTokenValidity: (isTokenValid: boolean) => void,
    ) => {
        const interceptor = (config: AxiosRequestConfig) => {
            if (tokenExistsAndIsValid()) {
                announceTokenValidity(true);
            }
            if (!tokenExistsAndIsValid()) {
                announceTokenValidity(false);
            }
            return config;
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        axios.interceptors.request.use(interceptor);
    };

    return (
        <ApplicationContext.Provider
            value={{
                login,
                logout,
                tokenExistsAndIsValid,
                initializeRequestInterceptor,
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};

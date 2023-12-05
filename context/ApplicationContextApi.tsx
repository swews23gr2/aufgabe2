import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { LoginDaten, GraphQlLoginResponse, loginApi } from '@/api/auth';

type ContextOutput = {
    login: (
        // eslint-disable-next-line no-unused-vars
        loginDaten: LoginDaten,
    ) => Promise<void>;
    logout: () => void;
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

    const baseConfig = {
        method: 'post',
        url: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL as string,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const login = async (loginDaten: LoginDaten) => {
        const loginResponse: AxiosResponse<GraphQlLoginResponse> =
            await loginApi(loginDaten, baseConfig);
        saveToken(loginResponse.data.data.login?.token);
        location.reload();
    };

    const logout = () => {
        deleteToken();
        location.reload();
    };

    return (
        <ApplicationContext.Provider
            value={{
                login,
                logout,
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};

const saveToken = (token: string) => {
    localStorage.setItem('auth_token', token);
};

const deleteToken = () => {
    localStorage.removeItem('auth_token');
};

export const tokenExist = (): boolean => {
    switch (localStorage.getItem('auth_token')) {
        case undefined:
            return false;
        case null:
            return false;
        case '':
            return false;
        default:
            return true;
    }
};
export const initializeRequestInterceptor = (
    // eslint-disable-next-line no-unused-vars
    announceTokenValidity: (isTokenValid: boolean) => void,
) => {
    const interceptor = (config: AxiosRequestConfig) => {
        if (tokenExist()) {
            announceTokenValidity(false);
        }
        if (!tokenExist()) {
            announceTokenValidity(true);
        }
        return config;
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    axios.interceptors.request.use(interceptor);
};

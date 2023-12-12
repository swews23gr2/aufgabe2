// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-argument,@typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';

interface UseFetchOutput<T> {
    data: T;
    isLoading: boolean;
    error: string | undefined;
    reFetch: () => Promise<void>;
}
export const useFetch = <T>(request: Promise<T>): UseFetchOutput<T> => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        void fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        setError(undefined);

        try {
            const response = await request;
            setData(response as T);
            setIsLoading(false);
        } catch (error) {
            setError((error as Error).message);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const reFetch = async () => {
        setIsLoading(true);
        await fetchData();
    };

    return {
        data: data!,
        isLoading,
        error,
        reFetch,
    };
};

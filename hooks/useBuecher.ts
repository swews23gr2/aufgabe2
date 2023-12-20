// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-argument,@typescript-eslint/ban-ts-comment */
import { Buch } from '@/api/buch';
import useSWR from 'swr';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';

interface useBuecherOutput {
    data: Buch[] | undefined;
    isLoading: boolean;
    error: string | undefined;
}
export const useBuecher = (): useBuecherOutput => {
    const appContext = useApplicationContextApi();
    const { data, error, isLoading } = useSWR<Buch[], string>(
        'graphql',
        appContext.getAlleBuecher,
    );

    return {
        data: data,
        isLoading,
        error,
    };
};

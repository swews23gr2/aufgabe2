/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable regexp/no-useless-non-capturing-group */
/* eslint-disable regexp/no-useless-escape */
/* eslint-disable regexp/no-dupe-characters-character-class */
/* eslint-disable regexp/prefer-d */
/* eslint-disable regexp/prefer-w */
/* eslint-disable no-useless-escape */
'use client';
import { useForm } from 'react-hook-form';
import { BuchUpdateModell, Buch } from '@/api/buch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { ErrorBannerComponent } from '@/components/shared/ErrorBannerComponent';
import { useApplicationContextApi } from '@/context/ApplicationContextApi';
import { useParams, useRouter } from 'next/navigation';
import { InputFieldValidationComponent } from '@/components/shared/InputFieldValidationComponent';
import { LoadingComponent } from '@/components/shared/LoadingComponent';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Update() {
    const { register, handleSubmit, formState, reset, setValue } =
        useForm<BuchUpdateModell>({ mode: 'onBlur' });
    const { id } = useParams<{ id: string }>();
    const { errors } = formState;
    const [response, setResponse] = useState<string>();
    const [errorCreate, setErrorCreate] = useState<string | undefined>(
        undefined,
    );
    const router = useRouter();
    const appContext = useApplicationContextApi();

    const {
        data: buch,
        isLoading,
        error,
    } = useSWR<Buch, string>(`${id}`, appContext.getBuchById, {
        revalidateIfStale: false,
    });

    console.log(buch);
    console.log(buch?.version);

    const toRabatt = (rabatt: string | undefined): number => {
        if (rabatt === undefined) return 0;
        const clear = rabatt.replace('%', '');
        return Number(clear);
    };

    const DateToString = (date: Date | undefined): string => {
        if (date === undefined) return '';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JavaScript zählt Monate von 0 bis 11
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    };

    const BooleanToString = (lieferbar: boolean): string => {
        if (lieferbar) {
            return 'true';
        } else {
            return 'false';
        }
    };

    useEffect(() => {
        if (buch !== undefined) {
            setValue('schlagwoerter', buch?.schlagwoerter);
            setValue('art', buch?.art);
            setValue('lieferbar', BooleanToString(buch?.lieferbar));
            setValue('titel.titel', buch?.titel);
            setValue('isbn', buch?.isbn);
            setValue('untertitel', buch?.untertitel);
            setValue('preis', buch?.preis);
            setValue('rating', buch?.rating);
            setValue('rabatt', toRabatt(buch?.rabatt));
            setValue('homepage', buch?.homepage);
        }
    }, [buch, setValue]);

    const onSubmit = async (data: BuchUpdateModell) => {
        console.log('Form submitted', data);
        setResponse(undefined);
        setErrorCreate(undefined);
        if (buch !== undefined) {
            data.id = buch?.id.toString();
            data.version = buch?.version;
        }
        try {
            const response = await appContext.updateBuch(data);
            console.log(response);
            setResponse(data.titel.titel);
            reset();
            router.push('/buecher');
        } catch (err) {
            console.log(err);
            setErrorCreate((err as Error).message);
        }
    };

    if (isLoading)
        return <LoadingComponent message={'Buchdaten werden geladen'} />;

    if (error !== undefined) return <ErrorBannerComponent message={error} />;

    return (
        <div className="container">
            <h1 {...styles.title()}>Buch ändern</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputFieldValidationComponent
                    htmlforlabel="isbn"
                    label="ISBN"
                    error={errors.isbn?.message}
                    className="form-control"
                    type="text"
                    id="isbn"
                    placeholder="ISBN"
                    rest={register('isbn', {
                        required: {
                            value: true,
                            message: 'ISBN ist erforderlich!',
                        },
                        pattern: {
                            value: /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
                            message: 'ISBN ist ungültig!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="titel"
                    label="Titel"
                    error={errors.titel?.titel?.message}
                    className="form-control"
                    type="text"
                    id="titel"
                    placeholder="Titel"
                    rest={register('titel.titel', {
                        required: {
                            value: true,
                            message: 'Titel ist erforderlich!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="untertitel"
                    label="Untertitel"
                    error={errors.untertitel?.message}
                    className="form-control"
                    type="text"
                    id="untertitel"
                    placeholder="Untertitel"
                    rest={register('untertitel')}
                />
                <InputFieldValidationComponent
                    htmlforlabel="preis"
                    label="Preis"
                    error={errors.preis?.message}
                    className="form-control"
                    type="number"
                    id="preis"
                    placeholder="Preis"
                    rest={register('preis', {
                        required: {
                            value: true,
                            message: 'Preis ist erforderlich!',
                        },
                        min: {
                            value: 0,
                            message: 'Preis muss größer als 0 sein!',
                        },
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message:
                                'Preis bitte mit 2 Nachkommastellen angeben!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="rating"
                    label="Rating"
                    error={errors.rating?.message}
                    className="form-control"
                    type="number"
                    id="rating"
                    placeholder="Rating"
                    rest={register('rating', {
                        min: {
                            value: 1,
                            message: 'Rating muss zwischen 1-5 sein!',
                        },
                        max: {
                            value: 5,
                            message: 'Rating muss zwischen 1-5 sein!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="rabatt"
                    label="Rabatt %"
                    error={errors.rabatt?.message}
                    className="form-control"
                    type="number"
                    id="rabatt"
                    placeholder="Rabatt %"
                    rest={register('rabatt', {
                        pattern: {
                            value: /^100$|^100.00$|^\d{0,2}(\.\d{1,2})? *%?$/,
                            message:
                                'Rabatt muss zwischen 0-100 sein (mit max. 2 Nachkommastellen)!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="erscheinungsdatum"
                    label="Erscheinungsdatum"
                    error={errors.datum?.message}
                    className="form-control"
                    type="text"
                    id="erscheinungsdatum"
                    placeholder="Erscheinungsdatum"
                    defaultValue={DateToString(buch?.datum)}
                    rest={register('datum', {
                        required: {
                            value: true,
                            message: 'Erscheinungsdatum ist erforderlich!',
                        },
                        pattern: {
                            value: /^[0-3]?[0-9][/.][0-3]?[0-9][/.](?:[0-9]{2})?[0-9]{2}$/,
                            message: 'Datum ist ungültig!',
                        },
                    })}
                />
                <InputFieldValidationComponent
                    htmlforlabel="homepage"
                    label="Homepage"
                    error={errors.homepage?.message}
                    className="form-control"
                    type="text"
                    id="homepage"
                    placeholder="Homepage"
                    rest={register('homepage', {
                        pattern: {
                            value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                            message: 'Homepage ist ungültig!',
                        },
                        required: {
                            value: true,
                            message: 'Homepage ist erforderlich!',
                        },
                    })}
                />
                <h2 {...styles.category()}>Buchart</h2>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="druckausgabe"
                        value={'DRUCKAUSGABE'}
                        {...register('art')}
                        defaultChecked
                    />
                    <label className="form-check-label" htmlFor="druckausgabe">
                        Druckausgabe
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="kindle"
                        value={'KINDLE'}
                        {...register('art')}
                    />
                    <label className="form-check-label" htmlFor="kindle">
                        Kindle
                    </label>
                </div>
                <h2 {...styles.category()}>Lieferbar</h2>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="lieferbar"
                        value={'true'}
                        {...register('lieferbar')}
                        defaultChecked
                    />
                    <label htmlFor="lieferbar" className="form-check-label">
                        Ja
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="nichtLieferbar"
                        value={'false'}
                        {...register('lieferbar')}
                    />
                    <label
                        htmlFor="nichtLieferbar"
                        className="form-check-label"
                    >
                        Nein
                    </label>
                </div>
                <h2 {...styles.category()}>Schlagwörter</h2>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={'JAVASCRIPT'}
                        {...register('schlagwoerter')}
                    />
                    <label htmlFor="javascript" className="form-check-label">
                        JavaScript
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value="TYPESCRIPT"
                        {...register('schlagwoerter')}
                    />
                    <label htmlFor="typescript" className="form-check-label">
                        TypeScript
                    </label>
                </div>
                <button type="submit" {...styles.submitButton()}>
                    Buch ändern
                </button>
                {response ? (
                    <div className="alert alert-success" role="alert">
                        Buch: {response} wurde erfolgreich geändert!
                    </div>
                ) : null}
                {errorCreate ? (
                    <div>
                        <ErrorBannerComponent message={errorCreate} />
                    </div>
                ) : null}
            </form>
        </div>
    );
}

const styles: ExtendedStyleProps = {
    submitButton: () => ({
        className: 'btn',
        style: {
            backgroundColor: 'var(--color-main)',
            color: 'var(--color-white)',
            marginTop: 'var(--gap-2)',
            marginBottom: 'var(--gap-2)',
        },
    }),
    title: () => ({
        style: {
            fontSize: 'var(--font-extra-large-size)',
            fontWeight: '600',
            justifySelf: 'center',
            marginBottom: 'var(--gap-2)',
            marginTop: 'var(--gap-4)',
        },
    }),
    category: () => ({
        style: {
            fontSize: 'var(--font-large-size)',
            fontWeight: '600',
            justifySelf: 'center',
            marginBottom: 'var(--gap-1)',
            marginTop: 'var(--gap-2)',
        },
    }),
};

import React, { InputHTMLAttributes } from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputFieldValidationComponentProps = InputHTMLAttributes<any> & {
    htmlForLabel: string;
    label: string;
    rest: UseFormRegisterReturn<string>;
    error?: string | undefined;
};

export const InputFieldValidationComponent: React.FC<
    InputFieldValidationComponentProps
> = (props: InputFieldValidationComponentProps) => {
    const { htmlForLabel, label, error, rest } = props;
    return (
        <div className="form-floating mb-3">
            <input {...props} {...rest} />
            <label htmlFor={htmlForLabel}>{label}</label>
            <p {...styles.errors()}>{error}</p>
        </div>
    );
};

const styles: ExtendedStyleProps = {
    errors: () => ({
        style: {
            color: 'var(--color-error)',
            fontSize: 'var(--font-small-size)',
        },
    }),
};

'use client';
import React from 'react';
import { Buch } from '@/api/buch';
import { useRouter } from 'next/navigation';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { RatingComponent } from '@/components/shared/RatingComponent';

type Props = {
    buecher: Buch[];
};

export const BuecherCardViewComponent: React.FC<Props> = (props: Props) => {
    const { buecher } = props;
    const router = useRouter();

    return (
        <div {...styles.cardListContainer()}>
            {buecher.map((buch) => (
                <div
                    key={buch.id}
                    onClick={() => router.push(`/buecher/${buch.id}`)}
                    {...styles.cardItem()}
                >
                    <div {...styles.bookPicture()}></div>
                    <div {...styles.bookTitle()}>{buch.titel}</div>
                    <div {...styles.bookType()}>{buch.art}</div>
                    <div>
                        <RatingComponent stars={buch.rating} maxValue={5} />
                    </div>
                    <div {...styles.price()}>{`${buch.preis} €`}</div>
                </div>
            ))}
        </div>
    );
};

const styles: ExtendedStyleProps = {
    cardListContainer: () => ({
        style: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyItems: 'flex-start',
            gap: 'var(--gap-3)',
            justifyContent: 'flex-start',
        },
    }),

    cardItem: () => ({
        style: {
            display: 'grid',
            justifyItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
        },
    }),

    bookPicture: () => ({
        style: {
            height: '200px',
            width: '150px',
            backgroundColor: '#E9E2E2',
            borderRadius: '10px',
        },
    }),

    bookTitle: () => ({
        style: {
            fontSize: 'var(--font-large-size)',
            fontWeight: 'bold',
        },
    }),

    bookType: () => ({
        style: {
            fontSize: 'var(--font-small-size)',
            color: 'var(--color-darkgray-200)',
        },
    }),

    price: () => ({
        style: {
            color: 'var(--color-main)',
            fontWeight: 'bold',
            fontSize: 'var(--font-large-size)',
            marginTop: '8px',
        },
    }),
};

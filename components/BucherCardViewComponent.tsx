'use client';
import React from 'react';
import { Buch } from '@/api/buch';
import { useRouter } from 'next/navigation';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    buecher: Buch[];
};

export const BucherCardViewComponent: React.FC<Props> = (props: Props) => {
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

type PropsRating = {
    stars: number;
    maxValue: number;
};
const RatingComponent: React.FC<PropsRating> = (props: PropsRating) => {
    const { stars, maxValue } = props;
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${maxValue}, 1fr)`,
            }}
        >
            {Array.from(Array(maxValue).keys()).map((v, index) => (
                <FontAwesomeIcon
                    key={v}
                    icon={faStar}
                    style={{
                        color:
                            index <= stars
                                ? 'var(--color-warn)'
                                : 'var(--color-darkgray-200)',
                    }}
                />
            ))}
        </div>
    );
};

const styles: ExtendedStyleProps = {
    cardListContainer: () => ({
        style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 'var(--gap-1)',
            justifyContent: 'center',
        },
    }),

    cardItem: () => ({
        style: {
            display: 'grid',
            justifyItems: 'center',
            justifyContent: 'center',
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

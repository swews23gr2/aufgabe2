"use client"
import React from 'react';
import {ExtendedStyleProps} from "@/theme/ExtendedStyleProps";
import Link from "next/link";

type NavigationButton = {
    label: string
    isActive: boolean
    onClick: () => void
}
export const NavigationBarComponent: React.FC = () => {

    const navigationButtons: NavigationButton[] = [
        {
            label: "Startseite",
            isActive: true,
            onClick: () => alert("In development")
        },
        {
            label: "Bücher",
            isActive: false,
            onClick: () => alert("In development")
        },
        {
            label: "Buch anlegen",
            isActive: false,
            onClick: () => alert("In development")
        },
        {
            label: "Anmelden",
            isActive: false,
            onClick: () => alert("In development")
        },
    ]

    return (
        <nav {...styles.navbarContainer()}>
            <div {...styles.navbarContentContainer()}>
                <Link href="#" {...styles.brand()}>HKA Bücherverwaltung</Link>
                <div {...styles.navbarButtonContainer()}>
                    {navigationButtons.map(button =>
                        <button
                            key={button.label}
                            type="button"
                            {...styles.navbarButton(button.isActive)}
                            onClick={button.onClick}
                        >
                            {button.label}
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

const styles: ExtendedStyleProps = {
    navbarContainer: () => ({
        style: {
            display: "grid",
            justifyItems: "center",
            backgroundColor: "var(--color-white)",
            color: "var(--color-black)",
            height: "var(--navbar-height)",
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            //zIndex: 2000,
            padding: "var(--padding-1) var(--padding-10)",
            boxShadow: "0 0 15px grey",
            "@media screen and (min-width: 900px)": {
                padding: "var(--padding-1) var(--padding-5)",
            },
        },
    }),

    navbarContentContainer: () => ({
        style: {
            display: "grid",
            gridTemplateColumns: "1fr max-content",
            gap: "var(--gap-2)",
            alignItems: "center",
            maxWidth: "var(--max-page-width)",
            width: "100%",
        }
    }),

    brand: () => ({
        className: "navbar-brand",
        style: {
            fontSize: "var(--font-large-size)",
            fontWeight: 400,
        }
    }),

    navbarButtonContainer: () => ({
        style: {
            display: "flex",
        }
    }),

    navbarButton: (isActive: boolean) => ({
        className: "btn",
        style: {
            color: isActive ? "var(--color-white)" : "var(--color-main)",
            backgroundColor: isActive ? "var(--color-main)" : "unset",
        }
    }),
}

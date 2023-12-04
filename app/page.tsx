"use client"
import {ExtendedStyleProps} from "@/theme/ExtendedStyleProps";
import {CenteredSectionComponent} from "@/components/shared/CenteredSectionComponent";
import React, {useRef} from "react";
import Image from "next/image";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {scrollIntoView} from "@/helper/scrollIntoView";

type HeroSectionButton = {
    label: string
    onClick: () => void
}

type SoftwareFeature = {
    title: string
    beschreibung: string
    image: string
}
export default function Home() {

    const { isSmall } = useMediaQuery()
    const featureSectionRef = useRef<HTMLDivElement | null>(null)

    const heroSectionButtons: HeroSectionButton[] = [
        {
            label: "Zu den Büchern",
            onClick: () => alert("In development")
        },
        {
            label: "Mehr erfahren",
            onClick: () => scrollIntoView(featureSectionRef.current)
        },
    ]

    const featuresDerSoftware: SoftwareFeature[] = [
        {
            title: "Überschrift Feature 1",
            beschreibung: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua sed diam nonumy invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua",
            image: "/hero_white_alt_alt_large.jpg",
        },
        {
            title: "Überschrift Feature 2",
            beschreibung: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua sed diam nonumy invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua",
            image: "/hero_white_alt_alt_large.jpg",
        },
    ]

    return (
        <div {...styles.mainContent()}>
            <div {...styles.heroSectionWrapper()}>
                <CenteredSectionComponent>
                    <div {...styles.heroSectionContainer()}>
                        <div {...styles.heroSectionTextBlock(isSmall)}>
                            <div {...styles.heroSectionTitleLarge()}>
                                Ändern Sie die Art und Weise, wie Sie Ihre Bücher verwalten
                            </div>
                            <div {...styles.heroSectionSubtitle()}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua
                            </div>
                            <div {...styles.heroSectionButtonListContainer()}>
                                {heroSectionButtons.map((button, index) =>
                                    <button
                                        key={button.label}
                                        type="button"
                                        {...styles.heroSectionButton(index === 0)}
                                        onClick={button.onClick}
                                    >
                                        {button.label}
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            <Image
                                width={769}
                                height={646}
                                src={"/hero_alt_alt_large.png"}
                                {...styles.heroSectionImage(isSmall)}
                                alt={"Bild des Hero-Abschnitt"}
                            />
                        </div>
                    </div>
                </CenteredSectionComponent>
            </div>

            <CenteredSectionComponent>
                <div ref={featureSectionRef} {...styles.featureSectionContent()}>
                    <div {...styles.featureTitleContainer()}>
                        <div {...styles.subtitlePrimary()}>Unsere Kompetenzen</div>
                        <div {...styles.sectionTitleLarge()}>Features unserer Software</div>
                    </div>
                    <div {...styles.featuresContainer()}>
                        {featuresDerSoftware.map(feature =>
                            <div key={feature.title} {...styles.featureItem(isSmall)}>
                                <div {...styles.featureTextBlock()}>
                                    <div {...styles.featureTitle()}>{feature.title}</div>
                                    <div {...styles.featureDescription()}>{feature.beschreibung}</div>
                                </div>
                                <Image
                                    width={346}
                                    height={291}
                                    src={feature.image}
                                    alt={feature.title}
                                    {...styles.featurePicture(isSmall)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </CenteredSectionComponent>
        </div>
    )
}

const styles: ExtendedStyleProps = {
    mainContent: () => ({
        style: {
            display: "grid",
        },
    }),

    heroSectionWrapper: () => ({
        style: {
            display: "grid",
            justifyItems: "center",
            backgroundColor: "var(--color-secondary)",
        },
    }),

    heroSectionContainer: () => ({
        style: {
            display: "grid",
            justifyItems: "center",
            padding: "var(--padding-10) var(--padding-2) 0 var(--padding-2)",
        },
    }),

    heroSectionTextBlock: (isScreenSmall: boolean) => ({
        style: {
            display: "grid",
            gridGap: "var(--gap-2)",
            justifyContent: "center",
            justifyItems: "center",
            textAlign: "center",
            maxWidth: `${isScreenSmall ? "unset" : "60%"}`,
        },
    }),

    heroSectionTitleLarge: () => ({
        style: {
            fontSize: "var(--font-3x-lage-size)",
            fontWeight: "600",
            color: "var(--color-light-black)",
        },
    }),

    heroSectionSubtitle: () => ({
        style: {
            fontSize: "var(--font-large-size)",
        },
    }),

    heroSectionButtonListContainer: () => ({
        style: {
            display: "flex",
            gap: "var(--gap-2)",
        },
    }),

    heroSectionButton: (isMain: boolean) => ({
        className: "btn",
        style: {
            color: isMain ? "var(--color-white)" : "var(--color-main)",
            backgroundColor: isMain ? "var(--color-main)" : "unset",
            padding: "var(--padding-1) var(--padding-2)",
            border: isMain ? "unset" : "2px solid var(--color-main)",
        },
    }),

    heroSectionImage: (isScreenSmall: boolean) => ({
        className: "mt-5",
        style: {
            //maxWidth: "var(--hero-section-thumbnail-width)",
            borderRadius: "8px 8px 0 0",
            boxShadow: "0 0 50px grey",
            width: `${isScreenSmall ? "100%" : "769px"}`,
            height: "auto",
            objectFit: "contain",
        },
    }),

    featureSectionContent: () => ({
        style: {
            display: "grid",
            gridGap: "var(--gap-8)",
            justifyItems: "center",
            justifyContent: "center",
            paddingTop: "var(--gap-10)",
        },
    }),

    featureTitleContainer: () => ({
        style: {
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0 var(--padding-2)"
        },
    }),

    subtitlePrimary: () => ({
        style: {
            fontSize: "var(--font-large-size)",
            color: "var(--color-main)",
            fontWeight: "550",
        },
    }),

    sectionTitleLarge: () => ({
        style: {
            fontSize: "var(--font-extra-extra-large-size)",
            fontWeight: "600",
            color: "var(--color-light-black)",
        }
    }),

    featuresContainer: () => ({
        style: {
            //textAlign: "center",
        },
    }),

    featureItem: (isScreenSmall: boolean) => ({
        style: {
            display: "grid",
            gridTemplateColumns: `${isScreenSmall ? "1fr" : "1.5fr auto"}`,
            gridGap: "var(--gap-9)",
            alignItems: "center",
            alignContent: "center",
            padding: `${
                isScreenSmall ?
                    "0 var(--padding-2) calc(2 * var(--padding-10)) var(--padding-2)" :
                    "0 calc(2 * var(--padding-10)) calc(2 * var(--padding-10)) calc(2 * var(--padding-10))"
            }`,
            justifyItems: `${isScreenSmall ? "center" : "unset"}`,
            textAlign: `${isScreenSmall ? "center" : "left"}`
        },
    }),

    featureTextBlock: () => ({
        style: {
            display: "grid",
            gridGap: "var(--gap-2)",
        },
    }),

    featureTitle: () => ({
        style: {
            fontSize: "var(--font-extra-extra-large-size)",
            fontWeight: "550",
        },
    }),

    featureDescription: () => ({
        style: {
            color: "var(--color-on-secondary)",
        },
    }),

    featurePicture: (isScreenSmall: boolean) => ({
        style: {
            width: `${isScreenSmall ? "100%" : "346px"}`,
            height: "auto",
            objectFit: "contain",
        }
    })
}

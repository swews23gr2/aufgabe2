import {CSSProperties} from "react";

type CustomStyle = {
    className?: string
    style?: CSSProperties
}

export type ExtendedStyleProps = Record<
    string,
    (...arg: any[]) => CustomStyle
>
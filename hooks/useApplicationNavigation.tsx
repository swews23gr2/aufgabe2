import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faBook, faHouse, faPlus} from "@fortawesome/free-solid-svg-icons";

type NavigationButton = {
    label: string
    icon: JSX.Element
    isActive: boolean
    onClick: () => void
}

type ApplicationNavigation = {
    navigationButtons: NavigationButton[]
}

const INITIAL_BUTTONS: NavigationButton[] = [
    {
        label: "Startseite",
        icon: <FontAwesomeIcon icon={faHouse}  style={{ color: "black", fontSize: 20 }}/>,
        isActive: true,
        onClick: () => alert("In development"),
    },
    {
        label: "Bücher",
        icon: <FontAwesomeIcon icon={faBook} style={{ color: "black", fontSize: 20 }}/>,
        isActive: false,
        onClick: () => alert("In development"),
    },
    {
        label: "Anlegen",
        icon: <FontAwesomeIcon icon={faPlus} style={{ color: "black", fontSize: 20 }}/>,
        isActive: false,
        onClick: () => alert("In development"),
    },
    {
        label: "Anmelden",
        icon: <FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: "black", fontSize: 20 }}/>,
        isActive: false,
        onClick: () => alert("In development"),
    },
]
export const useApplicationNavigation = (): ApplicationNavigation => {
    const [navigationButtons] = useState<NavigationButton[]>(INITIAL_BUTTONS)

    return {
        navigationButtons,
    }
}
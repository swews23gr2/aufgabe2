import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWarning} from "@fortawesome/free-solid-svg-icons";
import {ExtendedStyleProps} from "@/theme/ExtendedStyleProps";

export default function Home() {
    return (
        <main {...styles.mainContent("grey")}>
            <FontAwesomeIcon
                icon={faWarning}
                style={{ color: "red", fontSize: 30 }}
                beat
            />
            Hier geht es los!
        </main>
    )
}

const styles: ExtendedStyleProps = {
    mainContent: (bgColor: string) => ({
        className: `display-4 blockquote`,
        style: {
            backgroundColor: bgColor,
        },
    }),
}

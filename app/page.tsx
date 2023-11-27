import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    return (
        <main className={styles.mainContent}>
            <FontAwesomeIcon
                icon={faWarning}
                style={{ color: "red", fontSize: 30 }}
                beat
            />
            Hier geht es los!
        </main>
    )
}

const styles = {
    mainContent: `display-4 blockquote`,
}

import { useState } from "react";
import styles from "../styles/components/exportButton.module.css";
import { exportStarredMockups } from "../utils/exportUtils.js";

export function ExportButton() {
    const [busy, setBusy] = useState(false);

    const handleClick = async () => {
        setBusy(true);
        try {
            const count = await exportStarredMockups();
            if (count === 0) alert("No starred mockups with a thumbnail to export. Star some first!");
        } catch (err) {
            console.error("EXPORT ERROR -> ", err);
            alert("Something went wrong while exporting.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <button className={styles.export_button} onClick={handleClick} disabled={busy}>
            {busy ? "Exporting…" : "Export starred"}
        </button>
    );
}

import styles from "./toolbar.module.css";
import {useState, useRef, useEffect} from "react";

import pictureIcon from "/src/assets/picture_black.svg";
import downloadIcon from "/src/assets/download.svg";
import deleteIcon from "/src/assets/utility_button_icons/delete.svg";

export function TopToolbar({videoName, noCombos, isSidebarOpen}) {
    const [setName, setSetName] = useState(videoName)

    return (
        <section className={styles.container}
            style={{
                right : isSidebarOpen ? "37.5%" : "50%",
                transform : "translateX(50%)"
            }}
        >
            <input
                type="text"
                value={setName}
                onChange={e => setSetName(e.target.value)}
                placeholder="Video topic"
            />
            <div className={styles.no_combos}>
                <img src={pictureIcon}/>
                {noCombos} combos
            </div>
            <button
                onClick={() => alert("export favourites")}
            ><img src={downloadIcon}/> Export favourites</button>
            <button
                className={styles.delete_button}
                onClick={() => {if(confirm("are you sure?")) alert("Delete.")}}
            ><img src={deleteIcon}/></button>
        </section>
    )
}
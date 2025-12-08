import {useState, useEffect, useRef} from "react";

import Draggable from "react-draggable";

import styles from "../styles/components/mockup.module.css";
import testThumbnail from "../assets/test_thumbnail.png";

import moveIcon from "../assets/utility_button_icons/move.svg";
import editIcon from "../assets/utility_button_icons/edit.svg";
import deleteIcon from "../assets/utility_button_icons/delete.svg";
import resizeIcon from "../assets/utility_button_icons/resize.svg";
import favouritedIcon from "../assets/utility_button_icons/favourite_icon_favourited.svg";
import notFavouritedIcon from "../assets/utility_button_icons/favourite_icon_not_favourited.svg";
import currentlyDarkIcon from "../assets/utility_button_icons/toggle_mode_currently_dark.svg";
import currentlyLightIcon from "../assets/utility_button_icons/toggle_mode_currently_light.svg";



export function Mockup({isActive, isDarkMode}) {
    return (
        <div className={`${isDarkMode ? styles.dark : ""} ${styles.container} ${isActive ? styles.active : ""}`}>
            <section className={styles.thumbnail_section}>
                <img src={testThumbnail} className={styles.thumbnail}/>
                <div className={styles.video_length}>14:56</div>
            </section>
            <section className={styles.video_info_section}>
                <div className={styles.pfp_section}>
                    <div className={styles.pfp}></div>
                </div> {/* PFP */}
                <div className={styles.video_title}>
                    <p>How to be consistent when progress feels invisible</p>
                </div> {/* Title */}

                <div></div> {/* Placeholder */}
                <div className={styles.channel_name}>
                    <p>James Nicholls</p>
                </div> {/* Channel name */}

                <div></div> {/* Placeholder */}

                <div className={styles.video_stats}>
                    <p>112K views • 2 days ago</p>
                </div> {/* Video stats */}
            </section>
        </div>
    )
}

export function UtilityButtons({isVisible, isDarkMode, toggleDarkMode}) {
    const [favourited, setFavourited] = useState(false);
    
    return (
        <div className={styles.utility_buttons_container}>
            <button onClick={() => editMockup()} className={`${isVisible ? "" : styles.inactive} ${styles.utility_button} ${styles.toolbar}`}><img src={editIcon}/></button>
            <button onClick={() => resizeMockup()} className={`${isVisible ? "" : styles.inactive} ${styles.utility_button} ${styles.toolbar}`}><img src={resizeIcon}/></button>
            <button onClick={() => setFavourited(!favourited)} className={`${isVisible ? "" : styles.inactive} ${styles.utility_button} ${styles.toolbar}`}><img src={favourited ? favouritedIcon : notFavouritedIcon}/></button>
            <button onClick={() => toggleDarkMode(!isDarkMode)} className={`${isDarkMode ? styles.dark : ""} ${isVisible ? "" : styles.inactive} ${styles.utility_button} ${styles.toolbar}`}><img src={isDarkMode ? currentlyDarkIcon : currentlyLightIcon}/></button>
            <button onClick={() => deleteMockup()} className={`${isVisible ? "" : styles.inactive} ${styles.utility_button} ${styles.toolbar} ${styles.deleteButton}`}><img src={deleteIcon}/></button>
        </div>
    )
}

export function MockupCombo({scaleFactor}) {
    const [isActive, setIsActive] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const nodeRef = useRef(null);

    return (
        <Draggable handle={`.${styles.move_button}`} bounds="parent" defaultPosition={{x: 2500, y: 2500}} nodeRef={nodeRef} scale={scaleFactor}>
            <div 
                onMouseEnter={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)} 
                className="draggable-item mockup-group-container" 
                handle=".handle" 
                ref={nodeRef} style={{width: "fit-content"}}
            >
                <Mockup isDarkMode={isDarkMode} isActive={isActive}/>
                <UtilityButtons isDarkMode={isDarkMode} toggleDarkMode={setIsDarkMode} isVisible={isActive}/>
                <button className={`${isActive ? "" : styles.inactive} ${styles.utility_button} ${styles.move_button}`}><img src={moveIcon}/></button>
            </div>  
        </Draggable>
        
    )
}


// utils
function editMockup() {
    alert("Editing mockup");
}
function resizeMockup() {
    alert("Resizing Mockup");
}
function toggleFavourite() {
    alert("Toggling favourite status");
}
function toggleDarkMode() {
    alert("Toggling dark mode");
}
function deleteMockup() {
    alert("Deleting mockup");
}
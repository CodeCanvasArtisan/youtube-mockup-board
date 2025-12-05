import {useState, useEffect, forwardRef} from "react";

import styles from "../styles/components/mockup.module.css";
import testThumbnail from "../assets/test_thumbnail.png";
import resizeIcon from "../assets/utility_button_icons/resize.svg";


export function Mockup() {
    return (
        <div className={styles.container}>
            <section className={styles.thumbnail_section}>
                <img src={testThumbnail} className={styles.thumbnail}/>
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

export function UtilityButtons() {
    return (
        <div className={styles.utility_buttons_container}>
            <button onClick={() => editMockup()} className={styles.utility_button}>📝</button>
            <button onClick={() => resizeMockup()} className={styles.utility_button}><img src={resizeIcon}/></button>
            <button onClick={() => toggleFavourite()} className={styles.utility_button}>⭐</button>
            <button onClick={() => toggleDarkMode()} className={styles.utility_button}>🌙</button>
            <button onClick={() => deleteMockup()} className={styles.utility_button}>🗑️</button>
        </div>
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
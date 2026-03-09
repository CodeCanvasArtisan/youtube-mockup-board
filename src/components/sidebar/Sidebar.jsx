import {useState, useRef, useEffect} from "react";
import styles from "./sidebarStyles.module.css";

import chevron from "/src/assets/chevron_up.svg";

export function ToggleButton({isSidebarActive, setIsSidebarActive}) {
    return (
        <section className={styles.toggle_button_section}>
            <button onClick={() => setIsSidebarActive(curr => !curr)}>
                <img src={chevron} style={{transform : isSidebarActive ? "rotate(270deg)" : "rotate(90deg)"}}/>
            </button>
        </section>
    )
}

import plusIcon from "/src/assets/+_black.svg";
export function Sidebar({isActive, setIsActive, videos}) {
    return (
        <section className={`${styles.sidebar_group_container} ${!isActive && styles.is_inactive}`}>
            <article className={styles.sidebar_container}>
                <h1>Videos</h1>
                {videos.map((video, key) => {
                    return <VideoList key={key} videoName={video.name} isChosen={true}/>
                })}
                <button className={styles.new_video_button}>
                    <img src={plusIcon}/>
                </button>
            </article>
            <ToggleButton setIsSidebarActive={setIsActive} isSidebarActive={isActive}/>
        </section>
    )
}

import arrowRight from "/src/assets/forward_arrow.svg";
import arrowRightWhite from "/src/assets/arrow-white.svg";

export function VideoList({videoName, clickFunction, isChosen}) {
    const [isActive, setIsActive] = useState(false);
    return (
        <button className={styles.video_option_button} style={{
            background : isChosen ? "var(--electric-sapphire)" : isActive ? "var(--alabaster)" : "var(--off-white)",
            color : isChosen ? "white" : "black"
        }} 
        onMouseOver={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
            <p>{videoName}</p>
            <img className={isActive ? "" : styles.inactive} src={isChosen ? arrowRightWhite : arrowRight}/>
        </button>
    )
}   
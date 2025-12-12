import {useState, useEffect, useRef} from "react";
import { createPortal } from "react-dom";

import Draggable from "react-draggable";

import styles from "../styles/components/mockup.module.css";
import testThumbnail from "../assets/test_thumbnail.png";

import { EditMockupPopup, ResizeMockupPopup } from "./MockupChangePopups";

import moveIcon from "../assets/utility_button_icons/move.svg";
import editIcon from "../assets/utility_button_icons/edit.svg";
import deleteIcon from "../assets/utility_button_icons/delete.svg";
import resizeIcon from "../assets/utility_button_icons/resize.svg";
import favouritedIcon from "../assets/utility_button_icons/favourite_icon_favourited.svg";
import notFavouritedIcon from "../assets/utility_button_icons/favourite_icon_not_favourited.svg";
import currentlyDarkIcon from "../assets/utility_button_icons/toggle_mode_currently_dark.svg";
import currentlyLightIcon from "../assets/utility_button_icons/toggle_mode_currently_light.svg";



export function FavouriteStar({isActive}) {
    return (
        <div className={`${styles.favourite_star} ${isActive ? "" : styles.invisible}`}>
            <img src={favouritedIcon} alt="favourited"/>
        </div>
    )
}
export function Mockup({isActive, isDarkMode, title, thumbnail}) {
    return (
        <div className={`${isDarkMode ? styles.dark : ""} ${styles.container} ${isActive ? styles.active : ""}`}>
            <section className={styles.thumbnail_section}>
                <img src={thumbnail} className={styles.thumbnail}/>
                <div className={styles.video_length}>14:56</div>
            </section>
            <section className={styles.video_info_section}>
                <div className={styles.pfp_section}>
                    <div className={styles.pfp}></div>
                </div> {/* PFP */}
                <div className={styles.video_title}>
                    <p>{title}</p>
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

export function UtilityButtons({isVisible, isDarkMode, toggleDarkMode, editMockup, resizeMockup, favourited, setFavourited, deleteMockup}) {
    
    
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

export function MockupCombo({setScaleFactor, scaleFactor}) {

    
    const [isActive, setIsActive] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [title, setTitle] = useState("Enter your title to see how it looks");
    const [thumbnailSrc, setThumbnailSrc] = useState(testThumbnail);

    const [currSize, setCurrSize] = useState("home-large");
    const [favourited, setFavourited] = useState(false);

    const [isResizeActive, setIsResizeActive] = useState(false);
    const [isEditActive, setIsEditActive] = useState(false);

    const nodeRef = useRef(null);

    function deleteMockup() {
        alert("Deleting mockup")
    }


    useEffect(() => {
        setScaleFactor(1);
    }, [isResizeActive, isEditActive]);
    return (
        <>
        
        <Draggable handle={`.${styles.move_button}`} bounds="parent" defaultPosition={{x: 2500, y: 2500}} nodeRef={nodeRef} scale={scaleFactor}>
            <div 
                onMouseEnter={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)} 
                className="draggable-item mockup-group-container" 
                handle=".handle" 
                ref={nodeRef} style={{width: "fit-content"}}
            >
                <FavouriteStar isActive={favourited}/>
                <article>
                    <Mockup isDarkMode={isDarkMode} isActive={isActive} title={title} thumbnail={thumbnailSrc}/>
                    <button className={`${isActive ? "" : styles.inactive} ${styles.utility_button} ${styles.move_button}`}><img src={moveIcon}/></button>
                </article>
                
                <UtilityButtons 
                    isVisible={isActive}
                    isDarkMode={isDarkMode} 
                    toggleDarkMode={setIsDarkMode} 
                    editMockup={() => setIsEditActive(true)}
                    resizeMockup={() => setIsResizeActive(true)}
                    favourited={favourited}
                    setFavourited={setFavourited}
                    deleteMockup={deleteMockup}
                />
            </div>  
        </Draggable>
        
        {/* Portal these outside the transform */}
        {createPortal(
            <>
                <ResizeMockupPopup 
                    isVisible={isResizeActive}
                    setIsVisible={setIsResizeActive}
                    size={currSize}
                    setSize={setCurrSize}
                />
                <EditMockupPopup
                    isVisible={isEditActive}
                    setIsVisible={setIsEditActive}
                    title={title}
                    setTitle={setTitle}
                    thumbnail={thumbnailSrc}
                    setThumbnail={setThumbnailSrc}

                    prevTitles={["title #1", "title #2", "title #3"]}
                />
            </>, document.body // where to render
        )}


        </>
    )
}
import {useState, useEffect, useRef} from "react";
import { createPortal } from "react-dom";

import Draggable from "react-draggable";

import styles from "../styles/components/mockups/mockup.module.css";

import { createMockup, editMockup, deleteMockup, getAllMockups } from "../utils/dataStoreUtils.js";

import { EditMockupPopup, ResizeMockupPopup } from "./MockupChangePopups";
import { getUINameFromSize } from "../utils/sizeFormattingUtils.js";

import { HomeLargeMockup } from "./mockupsThemselves/homeLarge.jsx";
import { MobileMockup } from "./mockupsThemselves/mobile.jsx";
import { SearchResultsMockup, SidebarMockup } from "./mockupsThemselves/horizontalLayout.jsx";
import { ChannelLargeMockup, ChannelSmallMockup } from "./mockupsThemselves/channel.jsx";


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

export function MockupCombo({id, triggerRefresh, setScaleFactor, scaleFactor, originalTitle, originalThumbnail, testThumbnail, originalIsDarkMode, originalIsFavourited, originalSize, originalPosition}) {

    const [isActive, setIsActive] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(originalIsDarkMode);

    const [title, setTitle] = useState(originalTitle);
    const [thumbnail, setThumbnail] = useState(originalThumbnail);

    const [currSize, setCurrSize] = useState(originalSize);
    const [favourited, setFavourited] = useState(originalIsFavourited);

    const [position, setPosition] = useState({x : originalPosition.x, y: originalPosition.y});

    const [isResizeActive, setIsResizeActive] = useState(false);
    const [isEditActive, setIsEditActive] = useState(false);

    const nodeRef = useRef(null);

    
    function deleteMockupActivate(id) {
        if(confirm("Are you sure?")) {
            deleteMockup(id);
            triggerRefresh();
        } 
    }
    
    // save positinoing changes
    useEffect(() => {
        if(!position) return

        editMockup(id, {
            position: {x: position.x, y: position.y}
        })
    }, [position])

    // save changes triggered by toggles
    useEffect(() => {
        if(id) {
            editMockup(id, {
                isDarkMode: isDarkMode,
                isFavourited : favourited
            })
        }
    }, [favourited, isDarkMode, id])
    
    // decide which sizing to render
    const decideWhichMockup = () => {
        switch(originalSize) {
            case "search-result": 
                return (
                    <SearchResultsMockup 
                        isDarkMode={isDarkMode} 
                        isActive={isActive} 
                        title={title} 
                        thumbnail={thumbnail}
                    />
                )
            case "channel-large":
                return (
                    <ChannelLargeMockup 
                        isDarkMode={isDarkMode} 
                        isActive={isActive} 
                        title={title} 
                        thumbnail={thumbnail}
                    />
                )
            case "channel-small":
                return (
                    <ChannelSmallMockup 
                        isDarkMode={isDarkMode} 
                        isActive={isActive} 
                        title={title} 
                        thumbnail={thumbnail}
                    />
                )
            case "sidebar":
                return (
                    <SidebarMockup 
                        isDarkMode={isDarkMode} 
                        isActive={isActive} 
                        title={title} 
                        thumbnail={thumbnail}
                    />
                )

            case "home-full-width":
                return (
                    <MobileMockup 
                        isDarkMode={isDarkMode} 
                        isActive={isActive} 
                        title={title} 
                        thumbnail={thumbnail}
                    />
                )

            default:
                return (
                    <HomeLargeMockup 
                        isDarkMode={isDarkMode} 
                        isActive={isActive} 
                        title={title} 
                        thumbnail={thumbnail}
                    />
                )       
        }
    }
    return (
        <>
        
        <Draggable handle={`.${styles.move_button}`} bounds="parent" position={position} onStop={(e, data) => setPosition({x: data.x, y: data.y})} nodeRef={nodeRef} scale={scaleFactor}>
            <div 
                onMouseEnter={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)} 
                className="draggable-item mockup-group-container" 
                handle=".handle" 
                ref={nodeRef} style={{width: "fit-content", position: "absolute", left:0, top: 0}}
            >
                <div></div>
                <div className={styles.curr_size_label}>{getUINameFromSize(currSize)}</div>
                <div></div>
                <FavouriteStar isActive={favourited}/>
                <article>
                  
                    {decideWhichMockup()} 
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
                    deleteMockup={() => deleteMockupActivate(id)}
                />
            </div>  
        </Draggable>
        
        {/* Portal these outside the transform */}
        {createPortal(
            <>
                <ResizeMockupPopup 
                    isVisible={isResizeActive}
                    setIsVisible={setIsResizeActive}
                    mockupID={id}
                    size={currSize}
                    setSize={setCurrSize}
                    updateMockup = {editMockup}
                    triggerRefresh = {triggerRefresh}
                />
                <EditMockupPopup
                    isVisible={isEditActive}
                    setIsVisible={setIsEditActive}
                    title={title}
                    setTitle={setTitle}
                    thumbnail={thumbnail}
                    testThumbnail={testThumbnail}
                    setThumbnail={setThumbnail}
                    mockupID={id}
                    updateMockup={editMockup}
                    triggerRefresh={triggerRefresh}
                    prevTitles={JSON.parse(sessionStorage.getItem("activeTitles"))}
                />
            </>, document.body // where to render
        )}


        </>
    )
}



import {useState, useEffect} from "react";

import { ResizeOptionLabel } from "./ResizeOptionLabels";
import tickIcon from "../assets/tick.svg";
import popupStyles from "../styles/components/mockupChangePopups.module.css";

export function EditMockupPopup({isVisible}) {
    return (
        <>
        {isVisible && (
            <div className={popupStyles.popupContainer}>
                EDIT MOCKUP CONTENTS
            </div>
        )}
        </>
    )
}

export function ResizeMockupPopup({isVisible, currSize, closePopup}) {

    function getWidthFromMockupLocation(location) {
        /* {
            comparedToHomeLarge: [x%, y%], absolute: [x, y]
        }
        */
        let absolute, relativeToHomeLarge;
        switch(location) {
            case "channel-large":
                absolute = [354, 279];
                relativeToHomeLarge = ["90%", "90%"];
                break;

            case "channel-small":
                absolute = [210, 228];
                relativeToHomeLarge = ["53%", "65%"];
                break;

            case "search-result":
                absolute = [727, 200];
                relativeToHomeLarge = ["183%", "57%"];
                break;

            case "home-full-width":
                absolute = [350, 315];
                relativeToHomeLarge = ["88%", "88%"];
                break;

            case "sidebar":
                absolute = [402, 102];
                relativeToHomeLarge = ["100%", "29%"];
                break;

            default:
                absolute = [397, 352];
                relativeToHomeLarge = ["100%", "100%"];

        }

        return {
            absolute : absolute,
            relativeToHomeLarge : relativeToHomeLarge
        }
    }

    const [chosenSize, setChosenSize] = useState(currSize);
    const [previewWidth, setPreviewWidth] = useState(getWidthFromMockupLocation(currSize).relativeToHomeLarge[0]);
    const [previewHeight, setPreviewHeight] = useState(getWidthFromMockupLocation(currSize).relativeToHomeLarge[1])

    const handlePreviewSize = useEffect(() => {
        setPreviewWidth(getWidthFromMockupLocation(chosenSize).relativeToHomeLarge[0]);
        setPreviewHeight(getWidthFromMockupLocation(chosenSize).relativeToHomeLarge[1]);

        console.log(chosenSize);
        console.log("PHeight -> ", previewHeight); 
        console.log("PWidth -> ", previewWidth, "\n\n"); 
    }, [chosenSize])

    function applySizingChanges() {
        console.log(`Final size -> ${chosenSize} \n Dimensions -> ${getWidthFromMockupLocation(chosenSize).absolute[0]} x ${getWidthFromMockupLocation(chosenSize).absolute[1]}`);
        closePopup(false);
    }

    return (
        <>
        {isVisible && (
            <div className={popupStyles.popupContainer}>
                <section className={popupStyles.header}>
                    <h1>Resize Combo</h1>
                </section>
                <hr/>
                <section className={popupStyles.main_content}>
                    <div className={popupStyles.sizing_options_container}>
                        <h2>Web Browser</h2>
                        <ResizeOptionLabel UIName="Home Page - Large" labelName="home-large" isChecked={chosenSize === "home-large"} onChange={() => setChosenSize("home-large")}/>
                        <ResizeOptionLabel UIName="Search Result" labelName="search-result" isChecked={chosenSize === "search-result"} onChange={() => setChosenSize("search-result")}/>
                        <ResizeOptionLabel UIName="Channel Page - Large" labelName="channel-large" isChecked={chosenSize === "channel-large"} onChange={() => setChosenSize("channel-large")}/>
                        <ResizeOptionLabel UIName="Channel Page - Small" labelName="channel-small" isChecked={chosenSize === "channel-small"} onChange={() => setChosenSize("channel-small")}/>
                        <ResizeOptionLabel UIName="Sidebar" labelName="sidebar" isChecked={chosenSize === "sidebar"} onChange={() => setChosenSize("sidebar")}/>

                        <br/>
                        <h2>Mobile</h2>
                        <ResizeOptionLabel UIName="Home Page - Full Width" labelName="home-full-width" isChecked={chosenSize === "home-full-width"} onChange={() => setChosenSize("home-full-width")}/>

                    </div>
                    <div className={popupStyles.preview_container}>
                        <h2>Preview</h2>
                        <p>(Compared to <span className={popupStyles.colour_code}>Home Page - Large</span>)</p>
                            <div className={popupStyles.preview_wrapper}>
                            <div className={popupStyles.preview_chosen} style={{width: previewWidth, height: previewHeight}}></div>
                        </div>
                        <button onClick={() => applySizingChanges()} className={popupStyles.submit_button}><img alt="submit" src={tickIcon}/>Looks good</button>
                    </div>
                </section>
            </div>
        )}
        </>
        
    )
}
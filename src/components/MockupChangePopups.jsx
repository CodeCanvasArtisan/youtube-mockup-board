import {useState, useEffect} from "react";

import { ResizeOptionLabel } from "./ResizeOptionLabels";

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
function getWidthFromMockupLocation(location) {
    switch(location) {
            case "home-small":
                return "50%";

            case "channel-large":
                return 0;

            case "channel-small":
                return 0;

            case "sidebar":
                return 0;

            case "home-full-width":
                return 0;

            case "column":
                return 0;

            default:
                return "100%";
        }
}
export function ResizeMockupPopup({isVisible, currSize}) {
    const [chosenSize, setChosenSize] = useState(currSize);
    const [previewWidth, setPreviewWidth] = useState(getWidthFromMockupLocation(currSize));

    const handlePreviewSize = useEffect(() => {
        setPreviewWidth(getWidthFromMockupLocation(chosenSize));
    }, [chosenSize])

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
                        <ResizeOptionLabel UIName="Home Page - Small" labelName="home-small" isChecked={chosenSize === "home-small"} onChange={() => setChosenSize("home-small")}/>
                        <ResizeOptionLabel UIName="Channel Page - Large" labelName="channel-large" isChecked={chosenSize === "channel-large"} onChange={() => setChosenSize("channel-large")}/>
                        <ResizeOptionLabel UIName="Channel Page - Small" labelName="channel-small" isChecked={chosenSize === "channel-small"} onChange={() => setChosenSize("channel-small")}/>
                        <ResizeOptionLabel UIName="Sidebar" labelName="sidebar" isChecked={chosenSize === "sidebar"} onChange={() => setChosenSize("sidebar")}/>

                        <br/>
                        <h2>Mobile</h2>
                        <ResizeOptionLabel UIName="Home Page - Full Width" labelName="home-full-width" isChecked={chosenSize === "home-full-width"} onChange={() => setChosenSize("home-full-width")}/>
                        <ResizeOptionLabel UIName="Column" labelName="column" isChecked={chosenSize === "column"} onChange={() => setChosenSize("column")}/>

                    </div>
                    <div className={popupStyles.preview_container}>
                        <h2>Preview</h2>
                        <p>(Compared to <span className={popupStyles.colour_code}>Home Page - Large</span>, not to scale)</p>
                        <div className={popupStyles.preview_wrapper}>
                        <div className={popupStyles.preview_chosen} style={{width: previewWidth}}></div>
                        </div>
                    </div>
                </section>
            </div>
        )}
        </>
        
    )
}
import {useState} from "react";
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

export function ResizeMockupPopup({isVisible}) {
    return (
        <>
        {isVisible && (
            <div className={popupStyles.popupContainer}>
                RESIZE MOCKUP
            </div>
        )}
        </>
        
    )
}
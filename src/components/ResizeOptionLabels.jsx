import {useState, useEffect} from "react";
import styles from "../styles/components/resizeOptionLabels.module.css";

export function ResizeOptionLabel({UIName, labelName, onChange, isChecked}) {

    return (
        <div className={`${isChecked && styles.chosen} ${styles.label_wrapper}`}>
            <input className={styles.option_input} id={labelName} name="resize-option" onChange={e => {onChange(e);}} type="radio" checked={isChecked}/>
            <label className={styles.option_label} htmlFor={labelName}>{UIName}</label>
            <br/>
        </div>
    )
}
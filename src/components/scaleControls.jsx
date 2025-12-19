import styles from "/src/styles/components/scaleControls.module.css";
import zoomIn from "/src/assets/zoom_in.svg";
import zoomOut from "/src/assets/zoom_out.svg";
import refresh from "/src/assets/refresh.svg";

import {useState, useEffect} from "react";

export function ScaleControls({scale, editScale}) {

    const [localScale, setLocalScale] = useState(scale);

    const handleScaleChange = (newScale) => {
        
        if(newScale <= 0.3) {return;}
        // calculate nearest multiple of 10
        const rounded = Math.round(newScale * 10) / 10;

        console.log(rounded);

        editScale(rounded);
        setLocalScale(rounded);
    }

    return (
        <div className={styles.wrapper}>
            <section className={styles.scale_info}>
                <img onClick={() => handleScaleChange(scale-0.1)}src={zoomOut}/>
                {`${(scale*100).toFixed(0)}%`}
                <img onClick={() => handleScaleChange(scale+0.1)} src={zoomIn}/>
            </section>

            <button 
                className={styles.reset_scale_button}
                onClick={() => handleScaleChange(1)}
            >
                <img src={refresh}/> Reset zoom
            </button>
        </div>
    )
}
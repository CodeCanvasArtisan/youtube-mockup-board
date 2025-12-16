import styles from "/src/styles/components/mockups/mockup.module.css";
import mobileStyles from "/src/styles/components/mockups/mobile.module.css";

import {createTitleCutoffString} from "/src/utils/cutoffUtils.js";

export function MobileMockup({isActive, isDarkMode, title, thumbnail}) {
    return (
        <div className={`
            ${isDarkMode ? styles.dark : ""} 
            ${styles.container} 
            ${mobileStyles.container}
            ${isActive ? styles.active : ""}
        `}
        >
            <section className={styles.thumbnail_section}>
                <img src={thumbnail} className={styles.thumbnail}/>
                <div className={styles.video_length}>14:56</div>
            </section>
            <section className={`${mobileStyles.video_info_section} ${styles.video_info_section}`}>
                <div className={styles.pfp_section}>
                    <div className={styles.pfp}></div>
                </div> {/* PFP */}
                <div className={styles.video_title}>
                    <p>{createTitleCutoffString(title, 45)}</p>
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
import styles from "/src/styles/components/mockups/mockup.module.css";
import HLStyles from "/src/styles/components/mockups/homeLarge.module.css";


export function HomeLargeMockup({isActive, isDarkMode, title, thumbnail}) {
    return (
        <div className={`
            ${isDarkMode ? styles.dark : ""} 
            ${styles.container} 
            ${HLStyles.HL_container}
            ${isActive ? styles.active : ""}
        `}
        >
            <section className={styles.thumbnail_section}>
                <img src={thumbnail} className={styles.thumbnail}/>
                <div className={styles.video_length}>14:56</div>
            </section>
            <section className={`${HLStyles.video_info_section} ${styles.video_info_section}`}>
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
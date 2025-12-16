import styles from "/src/styles/components/mockups/mockup.module.css";
import channelStyles from "/src/styles/components/mockups/channel.module.css"

export function ChannelLargeMockup({isActive, isDarkMode, title, thumbnail}) {
    return (
        <div className={`
            ${isDarkMode ? styles.dark : ""} 
            ${styles.container} 
            ${channelStyles.CL_container}
            ${isActive ? styles.active : ""}
        `}
        >
            <section className={styles.thumbnail_section}>
                <img src={thumbnail} className={styles.thumbnail}/>
                <div className={styles.video_length}>14:56</div>
            </section>
            <section className={`${channelStyles.video_info_section} ${styles.video_info_section}`}>
                <div>  
                   
                </div> {/* PFP */}

                <div className={`${channelStyles.video_title} ${styles.video_title}`}>
                    <p>{title}</p>
                </div> {/* Title */}
                <div></div>

                <div className={styles.video_stats}>
                    <p>112K views • 2 days ago</p>
                </div> {/* Video stats */}
            </section>
        </div>
    )
}

export function ChannelSmallMockup({isActive, isDarkMode, title, thumbnail}) {
    return (
        <div className={`
            ${isDarkMode ? styles.dark : ""} 
            ${styles.container} 
            ${channelStyles.CS_container}
            ${isActive ? styles.active : ""}
        `}
        >
            <section className={styles.thumbnail_section}>
                <img src={thumbnail} className={styles.thumbnail}/>
                <div className={`${channelStyles.video_length} ${styles.video_length}`}>14:56</div>
            </section>
            <section className={`${channelStyles.video_info_section} ${styles.video_info_section}`}>
                <div>  
                   
                </div> {/* PFP */}

                <div className={`${channelStyles.video_title} ${styles.video_title}`}>
                    <p>{title}</p>
                </div> {/* Title */}
                <div></div>

                <div className={styles.video_stats}>
                    <p>112K views • 2 days ago</p>
                </div> {/* Video stats */}
            </section>
        </div>
    )
}
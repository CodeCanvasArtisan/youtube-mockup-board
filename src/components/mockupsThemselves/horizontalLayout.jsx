import styles from "/src/styles/components/mockups/horizontalLayout.module.css";

export function SearchResultsMockup({isActive, isDarkMode, title, thumbnail}) {
    return (
        <div className={`
            ${isDarkMode ? styles.dark : ""} 
            ${styles.container} 
            ${isActive ? styles.active : ""}
        `}
        >
            <section className={styles.thumbnail_section}>
                <img src={thumbnail} className={styles.thumbnail}/>
                <div className={styles.video_length}>14:56</div>
            </section>
            <section className={`${styles.video_info_section}`}>
                <div></div>
                <div className={styles.video_title}>
                    <p>{title}</p>
                </div> {/* Title */}
                <div></div>
                <div className={styles.video_stats}>
                    <p>112K views • 2 days ago</p>
                </div> {/* Video stats */}
                
                <article className={styles.channel_info_section}>
                    <div className={styles.pfp_section}>
                        <div className={styles.pfp}></div>
                    </div> {/* PFP */}
                    <div className={styles.channel_name}>
                        <p>James Nicholls</p>
                    </div> {/* Channel name */}
                </article>

                <div></div> {/* Placeholder */}

                
            </section>
        </div>
    )
}

export function SidebarMockup({isActive, isDarkMode, title, thumbnail}) {
    return (
        <div className={`
            ${isDarkMode ? styles.dark : ""} 
            ${styles.sidebar_container} 
            ${isActive ? styles.active : ""}
        `}
        >
            <section className={styles.thumbnail_section}>
                <img src={thumbnail} className={styles.thumbnail}/>
                <div className={styles.video_length}>14:56</div>
            </section>
            <section className={`${styles.video_info_section}`}>
                <div></div>
                <div className={`${styles.sidebar_video_title} ${styles.video_title}`}>
                    <p>{title}</p>
                </div> {/* Title */}
                <div className={styles.channel_name}>
                    <p>James Nicholls</p>
                </div> {/* Channel name */}
                <div className={styles.video_stats}>
                    <p>112K views • 2 days ago</p>
                </div> {/* Video stats */}
                <div></div>
                


                <div></div> {/* Placeholder */}

                
            </section>
        </div>
    )
}

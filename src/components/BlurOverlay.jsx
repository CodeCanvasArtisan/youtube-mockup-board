export default function BlurOverlay({isVisible}){
    return (
        <>
            {isVisible && (
                <div className="blur-overlay"></div>
            )}
        </>
    )
}
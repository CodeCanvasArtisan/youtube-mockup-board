export default function BlurOverlay({isVisible, whenClicked}){
    return (
        <>
            {isVisible && (
                <div onClick={() => whenClicked()} className="blur-overlay"></div>
            )}
        </>
    )
}
import {useState, useEffect, useRef} from "react";

import { ResizeOptionLabel } from "./ResizeOptionLabels";

import tickIcon from "../assets/tick.svg";
import imageIcon from "../assets/picture.svg";
import arrowIcon from "../assets/arrow-white.svg";
import popupStyles from "../styles/components/mockupChangePopups.module.css";
import resizeStyles from "../styles/components/resizePopup.module.css";
import editStyles from "../styles/components/editPopup.module.css";

import { useLockBodyScroll } from "../utils/useLockBodyScroll.jsx";

import BlurOverlay from "./BlurOverlay.jsx";


export function EditMockupPopup({updateMockup, isVisible, setIsVisible, title, setTitle, thumbnail, setThumbnail, mockupID, prevTitles}) {

    
    useLockBodyScroll(isVisible);
    const initialTitle = useRef(title);
    const isNew = initialTitle != "Enter your title to see how it looks";

    const [showThumbnailWarning, setShowThumbnailWarning] = useState(false);
    const [uploadDimensions, setUploadDimensions] = useState({});

    const dropzone = useRef("thumbnail_dropzone");
    const thumbnailPreview = useRef("thumbnail_preview");
    const titleSuggestionsSection = useRef("title_suggestions_section");

    const [submitHovered, setSubmitHovered] = useState(false);

  
    const handleDrop = async (e) => {
        
        e.preventDefault();
        toggleDragClass();
        
        const droppedFiles = e.dataTransfer.files;
        if(droppedFiles.length > 1) {
            alert("Multiple files were dropped, the first one was accepted.");
        }
        if (!droppedFiles) return;
        const droppedFile = droppedFiles[0];

        // validate the file type
        const allowed = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
        if(!allowed.includes(droppedFile.type)) {
            alert("Please drop a JPEG, PNG or WebP image");
            return;
        }

        

        
        const url = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(droppedFile);
        });;
        
        const img = new Image();
        img.src = url;
        

        img.onload = () => {
            const aspectRatio = img.naturalWidth / img.naturalHeight
            const is16x9 = Math.abs(aspectRatio - 16/9) < 0.01; // allow small tolerance

            if(!is16x9) {
                alert(`Image must be 16:9 aspect ratio.`);
                return;
            }

            // image is 16:9 - proceed
            setUploadDimensions({
                width : img.naturalWidth,
                height: img.naturalHeight
            })
            
            // set image as background
            thumbnailPreview.current.src=url;
            dropzone.current.classList.remove(editStyles.dragged_over);
            dropzone.current.classList.add(editStyles.thumbnail_chosen);

            
            setThumbnail(url);
            
            // let them know 1280x720 px is best
            if(img.naturalWidth != 1280 && img.naturalWidth != 720) {
                setShowThumbnailWarning(true);
            }
        }
        img.onerror = (e) => {
            alert("Something went wrong when processing your image. Please try again.");
            console.error("THUMBNAIL PROCESSING ERROR -> ", e.target.error);
        };
    }
    const toggleDragClass = () => {
        dropzone.current.classList.toggle(editStyles.dragged_over);
    }

    const titleCritiqueFromLength = title => {

        let message, level;
        const length = title.length;
        
        if (length <= 50) {
            level = "safe";
            message = "Title will look good everywhere";
        } else if (length <= 60) {
            level = "caution";
            message = "⚠️ This title may get cut off (…) on mobile and sidebar views";
        } else {
            level = "warning";
            message = "⚠️ This title will likely get cut off (…) at most views";
        }

        return {
            style : editStyles[level],
            message : message
        }
    }

    const submitNewMockupInfo = (thumbnail, title) => {
        
        const nonUniqueTitle = title == "Enter your title to see how it looks" ? true : false;
        if(!thumbnail || !title || nonUniqueTitle) {
            alert(`Please ${!thumbnail ? "upload a thumbnail" : ""}${nonUniqueTitle || !title ? !thumbnail ? "and type in a non-default title." : "type in a unique title" : ""}`);
            return;
        }
        console.log("MID -> ", mockupID);
        updateMockup(mockupID, {
            thumbnail : thumbnail,
            title : title 
        })
        setIsVisible(false);
        
    }

    return (
        <>
            <BlurOverlay whenClicked = {() => setIsVisible(false)}isVisible={isVisible}/>
            <div className={`${popupStyles.popupContainer} ${isVisible ? "" : popupStyles.not_visible}`}>
                <div className={editStyles.main_content}>
                    <h2 style={{marginTop: 10}}className={popupStyles.header}>{isNew ? "New Mockup" : "Edit Mockup"}</h2>
                    <section className={editStyles.thumbnail_section}>
                        <div ref={dropzone} onDragOver={e => e.preventDefault()} onDragEnter={toggleDragClass} onDragLeave={toggleDragClass} onDrop={handleDrop} className={editStyles.thumbnail_wrapper}>
                            <img src={thumbnail} className={editStyles.preview_thumbnail} ref={thumbnailPreview}/>
                            <div className={editStyles.dropzone_instructions}>
                                <img src={imageIcon}/>
                                <h2>Upload your thumbnail</h2>
                                <p>(1280 x 720 px is optimal)</p>
                            </div>
                        </div>
                        {showThumbnailWarning && (
                        <p style={{textAlign:"center"}} className={editStyles.warning}>For rendering purposes, 1280x720 is the optimal thumbnail size. Your thumbnail is {uploadDimensions.width}x{uploadDimensions.height}</p>
                        )}
                    </section>
                    <br/>

                    <section className={editStyles.title_section}>
                        <article className={editStyles.title_input_group}>
                            <input type="text" 
                                autoComplete="off"
                                onChange={e => {
                                    const newTitle=e.target.value;
                                    setTitle(newTitle); 
                                    if(prevTitles.filter(prevTitle => prevTitle.includes(newTitle)).length > 0) {
                                        titleSuggestionsSection.current.classList.add(editStyles.visible);
                                    }
                                }} 
                                className={editStyles.title_input} value={title} placeholder="Enter your genius title..."/>
                            <p className={`${editStyles.characterLength} ${titleCritiqueFromLength(title).style}`}>{title.length}</p>
                        </article>
                        <p className={`${editStyles.title_status_message} ${titleCritiqueFromLength(title).style}`}>{title == initialTitle.current ? "" : titleCritiqueFromLength(title).message}</p>
                        <div ref={titleSuggestionsSection} className={`${prevTitles.filter(prevTitle => prevTitle.includes(title)).length > 0 && editStyles.visible} ${editStyles.title_suggestions_section}`}>
                            <h2 className={popupStyles}>Previously used</h2>
                            <hr/>
                            <div>
                                {
                                    prevTitles.map((prevTitle, index) => {
                                        if(prevTitle.includes(title)) {
                                            return (
                                                <p 
                                                onClick={() => {
                                                    setTitle(prevTitle);
                                                    titleSuggestionsSection.current.classList.remove(editStyles.visible);
                                                }} 
                                                key={index}
                                                >{prevTitle}</p>
                                            )
                                        }
                                        return null;
                                    })     
                                }
                            </div>
                        </div>
                    </section>
                    <br/>
                    <button onMouseEnter={() => {setSubmitHovered(true)}} onMouseLeave={() => setSubmitHovered(false)} onClick={() => submitNewMockupInfo(thumbnail, title)} className={editStyles.confirm_button}>
                        <p>{title ? "Update Mockup" : "Create Mockup"}</p>
                        <img src={arrowIcon} className={submitHovered ? editStyles.submit_hovered : ""}/> 
                    </button>
                    
                </div>
            </div>
        </>
    )
}

export function ResizeMockupPopup({updateMockup, mockupID, isVisible, setIsVisible, size, setSize}) {
    useLockBodyScroll(isVisible);


    function getWidthFromMockupLocation(location) {
        /* {
            comparedToHomeLarge: [x%, y%], absolute: [x, y]
        }
        */
        let absolute, relativeToHomeLarge;
        switch(location) {
            case "channel-large":
                absolute = [354, 279];
                relativeToHomeLarge = ["90%", "90%"];
                break;

            case "channel-small":
                absolute = [210, 228];
                relativeToHomeLarge = ["53%", "65%"];
                break;

            case "search-result":
                absolute = [727, 200];
                relativeToHomeLarge = ["183%", "57%"];
                break;

            case "home-full-width":
                absolute = [350, 315];
                relativeToHomeLarge = ["88%", "88%"];
                break;

            case "sidebar":
                absolute = [402, 102];
                relativeToHomeLarge = ["100%", "29%"];
                break;

            default:
                absolute = [397, 352];
                relativeToHomeLarge = ["100%", "100%"];

        }

        return {
            absolute : absolute,
            relativeToHomeLarge : relativeToHomeLarge
        }
    }

    const [previewWidth, setPreviewWidth] = useState(getWidthFromMockupLocation(size).relativeToHomeLarge[0]);
    const [previewHeight, setPreviewHeight] = useState(getWidthFromMockupLocation(size).relativeToHomeLarge[1])

    const handlePreviewSize = useEffect(() => {
        setPreviewWidth(getWidthFromMockupLocation(size).relativeToHomeLarge[0]);
        setPreviewHeight(getWidthFromMockupLocation(size).relativeToHomeLarge[1]);
    }, [size])

    const saveSizingChanges = newSize => {
        alert(newSize);
    }

    return (
        <>
            <BlurOverlay whenClicked={() => setIsVisible(false)} isVisible={isVisible}/>
            <div className={`${popupStyles.popupContainer} ${isVisible ? "" : popupStyles.not_visible}`}>
                <section>
                    <h1 className={popupStyles.header}>Resize Combo</h1>
                </section>
                <hr/>
                <section className={resizeStyles.main_content}>
                    <div className={resizeStyles.sizing_options_container}>
                        <h2>Web Browser</h2>
                        <ResizeOptionLabel UIName="Home Page - Large" labelName="home-large" isChecked={size === "home-large"} onChange={() => setSize("home-large")}/>
                        <ResizeOptionLabel UIName="Search Result" labelName="search-result" isChecked={size === "search-result"} onChange={() => setSize("search-result")}/>
                        <ResizeOptionLabel UIName="Channel Page - Large" labelName="channel-large" isChecked={size === "channel-large"} onChange={() => setSize("channel-large")}/>
                        <ResizeOptionLabel UIName="Channel Page - Small" labelName="channel-small" isChecked={size === "channel-small"} onChange={() => setSize("channel-small")}/>
                        <ResizeOptionLabel UIName="Sidebar" labelName="sidebar" isChecked={size === "sidebar"} onChange={() => setSize("sidebar")}/>

                        <br/>
                        <h2>Mobile</h2>
                        <ResizeOptionLabel UIName="Home Page - Full Width" labelName="home-full-width" isChecked={size === "home-full-width"} onChange={() => setSize("home-full-width")}/>

                    </div>
                    <div className={resizeStyles.preview_container}>
                        <h2>Preview</h2>
                        <p>(Compared to <span className={resizeStyles.colour_code}>Home Page - Large</span>)</p>
                            <div className={resizeStyles.preview_wrapper}>
                            <div className={resizeStyles.preview_chosen} style={{width: previewWidth, height: previewHeight}}></div>
                        </div>
                        <button onClick={() => setIsVisible(false)} className={resizeStyles.submit_button}><img alt="submit" src={tickIcon}/>Looks good</button>
                    </div>
                </section>
            </div>

        </>
        
    )
}
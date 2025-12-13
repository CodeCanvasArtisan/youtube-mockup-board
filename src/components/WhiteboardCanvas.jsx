import React, {useState, useRef} from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Draggable from "react-draggable"
import "../styles/components/whiteboardCanvas.css";
import popupStyles from "../styles/components/mockupChangePopups.module.css";

import {Mockup, UtilityButtons, MockupCombo} from "../components/Mockup.jsx";

import {createMockup} from "../utils/dataStoreUtils.js";


// panning + zooming
const handleWheel = (ref, event) => { 
    // ref = TransformWrapper's internal state + methods e.g. zoom level, position
    // event = the wheel event object (deltaX, etc.)
    event.preventDefault(); // stops browser scrolling behaviour
    const { deltaX, deltaY, ctrlKey, shiftKey, metaKey } = event; // destructuring shorthand
    
    // zoom
    if (ctrlKey || metaKey) {
        const zoomAmount = -deltaY * 0.001;
        ref.zoomIn(zoomAmount);
        return;
    }
}

export default function Whiteboard() {

      const blob = new Blob(["some string"], { type: 'text/plain' }); // JUST UNTIL THUMBNAILS ARE BROUGHT BACK
    
    const [scaleFactor, updateScaleFactor] = useState(1);

    const getMinScale = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const canvasWidth = 5000;
        const canvasHeight = 5000;
        
        // Minimum scale is when the smaller dimension fills the viewport
        const minScaleX = viewportWidth / canvasWidth;
        const minScaleY = viewportHeight / canvasHeight;
        
        // Use the smaller of the two to ensure canvas always covers viewport
        return Math.max(minScaleX, minScaleY);
    };
    
    
    return (
        <div className="whiteboard-container">
            <TransformWrapper
                onTransformed={e => updateScaleFactor(e.state.scale)}
                
                initialScale={1}
                minScale={getMinScale()}
                maxScale={3}

                limitToBounds={true} // can't pan infinitely 
                centerOnInit={true} 


                // panning settings
                panning={{
                    disabled : false,
                    velocityDisabled : true, // no inertia when scrolling
                    excluded : ["draggable-item", popupStyles.popupContainer] // list of css classes that don't trigger panning e.g. combo-card
                }}

                // custom wheel handler
                onWheel={handleWheel}

                // wheel settings (scroll wheel + trackpad)
                wheel={{
                    step:  0.05,
                    disabled : false,
                }}

                // double click settings
                doubleClick = {{
                    disabled : true // no double click to zoom
                }}
            >   
                <TransformComponent
                    wrapperStyle={{
                        width: "100vw",
                        height: "100vh",
                    }}
                    contentStyle={{
                        width: "5000px",
                        height: "5000px",
                    }}
                >
                    <div className="whiteboard-wrapper">
                        <MockupCombo 
                            setScaleFactor={updateScaleFactor} 
                            scaleFactor={scaleFactor}
                            id={1}
                            originalTitle={"NEW TITLE 1"}
                            originalThumbnail={blob}
                            originalIsDarkMode={true}
                            originalIsFavourited={false}
                            originalSize={"home-large"}
                            originalPosition={{x: 2300, y: 2300}}
                        />
                    </div>
               
                </TransformComponent>
                
            </TransformWrapper>
        </div>
    )
}
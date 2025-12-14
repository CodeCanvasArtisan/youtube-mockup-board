import React, {useState, useRef} from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import "../styles/components/whiteboardCanvas.css";
import popupStyles from "../styles/components/mockupChangePopups.module.css";

import {MockupCombo} from "../components/Mockup.jsx";

import {createMockup} from "../utils/dataStoreUtils.js";
import { NewComboButton } from '../components/newComboButton.jsx';



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

export default function Whiteboard({originalMockups, refreshMockups}) {
    console.log("ORIGINAL MOCKUPS -> ", originalMockups);

    
    const [scaleFactor, updateScaleFactor] = useState(1);
    const [transformState, setTransformState] = useState(null);

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

    const getViewportCentre = () => {
        

        if (!transformState) return { x: 2500, y: 2500 };
        const { positionX, positionY, scale } = transformState;

        // Convert viewport center to canvas coordinates
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;

        const canvasCenterX = (viewportCenterX - positionX) / scale;
        const canvasCenterY = (viewportCenterY - positionY) / scale;

        return { x: canvasCenterX, y: canvasCenterY };
    }
    
    
    return (
        <div className="whiteboard-container">
            <TransformWrapper
                onTransformed={(ref, state) => {
                    updateScaleFactor(state.scale);
                    setTransformState(state);
                }}
                
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
                        {
                        originalMockups.map(mockup => {
                            
                            return (
                                <MockupCombo 
                                    key={mockup.id}
                                    setScaleFactor={updateScaleFactor} 
                                    scaleFactor={scaleFactor}
                                    id={mockup.id}
                                    originalTitle={mockup.title}
                                    originalThumbnail={mockup.thumbnail}
                                    originalIsDarkMode={mockup.isDarkMode}
                                    originalIsFavourited={mockup.isFavourited}
                                    originalSize={mockup.size}
                                    originalPosition={mockup.position || {x: 2500, y: 2500}}
                                    triggerRefresh={refreshMockups}
                                />
                            )
                        })}
                        
                    </div>
               
                </TransformComponent>
                
            </TransformWrapper>
            <NewComboButton onClick={async () => {
                const viewportCentre = getViewportCentre();
                await createMockup({
                    title : "Enter your title & thumbnail to see how it looks",
                    thumbnail : "",
                    isDarkMode : false,
                    isFavourited : false,
                    size : "home-large",
                    position: viewportCentre // set this to the current position of the transformwrapper (within the viewport)
                });
                refreshMockups();
            }}/>
        </div>
    )
}
import { useState, useEffect } from 'react'
import Whiteboard from "./components/WhiteboardCanvas.jsx";
import {EditMockupPopup, ResizeMockupPopup} from "./components/MockupChangePopups.jsx";
import BlurOverlay from "./components/BlurOverlay.jsx";
import './styles/App.css'

function App() {
  // handle global filedrop
  useEffect(() => {
    const handleDrop = e => e.preventDefault()
    const handleDragOver = e => e.preventDefault()
    window.addEventListener("drop", handleDrop);
    window.addEventListener("dragover", handleDragOver);

    return () => {
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragover', handleDragOver);
    };

  }, [])
  const [overlayActive, setOverlayActive] = useState(false);
  const [editPopupActive, setEditPopupActive] = useState(false);
  const [resizePopupActive, setResizePopupActive] = useState(false);
  
  return (
    <>
    <BlurOverlay isVisible={true}/>

    <EditMockupPopup prevTitles={["title #1", "title #2", "title #3"]} isVisible={true} />
    <ResizeMockupPopup currSize="home-large" closePopup={setEditPopupActive} isVisible={false}/>
    <Whiteboard/>

    </>
  )
}

export default App

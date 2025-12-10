import { useState } from 'react'
import Whiteboard from "./components/WhiteboardCanvas.jsx";
import {EditMockupPopup, ResizeMockupPopup} from "./components/MockupChangePopups.jsx";
import BlurOverlay from "./components/BlurOverlay.jsx";
import './styles/App.css'

function App() {
  const [overlayActive, setOverlayActive] = useState(false);
  const [editPopupActive, setEditPopupActive] = useState(false);
  const [resizePopupActive, setResizePopupActive] = useState(false);

  return (
    <>
    <BlurOverlay isVisible={true}/>

    <EditMockupPopup isVisible={true} />
    <ResizeMockupPopup currSize="home-large" closePopup={setEditPopupActive} isVisible={false}/>
    <Whiteboard/>

    </>
  )
}

export default App

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

    <EditMockupPopup isVisible={false} currSize="home-large"/>
    <ResizeMockupPopup isVisible={true}/>
    <Whiteboard/>

    </>
  )
}

export default App

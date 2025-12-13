import { useState, useEffect } from 'react'

import {initDatabase, createMockup, getAllMockups, deleteMockup, editMockup} from "./utils/dataStoreUtils.js";
// these are all

import Whiteboard from "./components/WhiteboardCanvas.jsx";
import './styles/App.css'

function App() {
      const blob = new Blob(["some string"], { type: 'text/plain' }); // JUST UNTIL THUMBNAILS ARE BROUGHT BACK

  // initialise indexedDB
  useEffect(() => {
    
    initDatabase()

    // no cleanup needed - browser handles that shit
  }, [])

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
    <button 
      style={{zIndex: 9999, position: 'fixed', top: "50%", left: "50%"}}
      onClick={() => {
        deleteMockup(
          1
        )}
      }>delete</button>
    <button 
      style={{zIndex: 9999, position: 'fixed', top: "40%", left: "40%"}}
      onClick={async () => {
        console.log(await editMockup(2, {
          title : "NEW TITLE 67676767676 LOOOOLLLLL",
          isDarkMode : false,
          size : "channel-large"
        }))

      }}
       >edit</button>
      
      <button 
      style={{zIndex: 9999, position: 'fixed', top: "60%", left: "40%"}}
      onClick={async () => {
        console.log(await getAllMockups())
      }}
       >GET ALL</button>
    
    <Whiteboard/>

    </>
  )
}

export default App

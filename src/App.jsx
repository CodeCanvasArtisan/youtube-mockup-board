import { useState, useEffect } from 'react'

import {initDatabase, createMockup, getAllMockups, deleteMockup, editMockup} from "./utils/dataStoreUtils.js";
// these are all

import Whiteboard from "./components/WhiteboardCanvas.jsx";
import './styles/App.css'

function App() {
      const blob = new Blob(["some string"], { type: 'text/plain' }); // JUST UNTIL THUMBNAILS ARE BROUGHT BACK

  // initialise indexedDB
  useEffect(() => {
    initDatabase();
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

  // set up mockups + refreshing logic
  const [mockups, setMockups] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const fetchMockups = async () => {
      const data = await getAllMockups();
      console.log("Raw data from getAllMockups:", data);
      setMockups(data);
    };

    fetchMockups();
  }, [refreshTrigger])
  
  return (
    <>
    
    <Whiteboard
      originalMockups={mockups}
      refreshMockups={() => setRefreshTrigger(!refreshTrigger)}
    />
    

    </>
  )
}

export default App

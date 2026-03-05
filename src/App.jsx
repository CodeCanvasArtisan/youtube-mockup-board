import { useState, useEffect } from 'react'

import {initDatabase, createMockup, getAllMockups, deleteMockup, editMockup} from "./utils/dataStoreUtils.js";
// these are all

import Whiteboard from "./components/WhiteboardCanvas.jsx";
import './styles/App.css'
import { TopToolbar } from './components/top_toolbar/TopToolbar.jsx';

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

      // set active titles
      const activeTitles = [];
      data.forEach(m => activeTitles.push(m.title));
      sessionStorage.setItem("activeTitles", JSON.stringify(activeTitles));

      return data;
    };

    fetchMockups();
   
  }, [refreshTrigger])
  
  return (
    <>
    <TopToolbar isSidebarOpen={false} noCombos={mockups.length} videoName="asdf"/>
    <Whiteboard
      originalMockups={mockups}
      refreshMockups={() => setRefreshTrigger(!refreshTrigger)}
    />
    

    </>
  )
}

export default App

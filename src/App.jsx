import { useState, useEffect } from 'react'

import {initDatabase, getAllMockups} from "./utils/dataStoreUtils.js";
// these are all

import Whiteboard from "./components/WhiteboardCanvas.jsx";
import './styles/App.css'
import { TopToolbar } from './components/top_toolbar/TopToolbar.jsx';
import { Sidebar } from './components/sidebar/Sidebar.jsx';

function App() {
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

  const [videos, setVideos] = useState([{id : 1, name : "asdf"}]);

  // set up mockups + refreshing logic
  const [mockups, setMockups] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // set up sidebar opening logic
  const [isSidebarActive, setIsSidebarActive] = useState(false);

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
  
  useEffect(() => console.log("sidebar active -> ", isSidebarActive), [isSidebarActive]);
  
  return (
    <>
    <TopToolbar isSidebarOpen={isSidebarActive} noCombos={mockups.length} videoName="asdf"/>
    <Sidebar setIsActive={setIsSidebarActive} isActive={isSidebarActive} videos={videos}/>
    <Whiteboard
      originalMockups={mockups}
      refreshMockups={() => setRefreshTrigger(curr => !curr)}
    />
    

    </>
  )
}

export default App

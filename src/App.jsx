import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import MapArea from './Components/MapArea'
import { Pins_Context_Provider } from './store/Pin_objs';

function App() {
  
  // const [currentUser,setCurrentUser] = useState(null);
  const [showRegister,setShowRegister] = useState(false)

  return (
    <Pins_Context_Provider>
      <Navbar/>
      <MapArea/>
    </Pins_Context_Provider>
  
  )
}

export default App

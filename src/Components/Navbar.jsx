import React from 'react'
import './Navbar.css'
import { useContext } from 'react'
import { Pins_Context } from '../store/Pin_objs'

const Navbar = () => {
  const context = useContext(Pins_Context);
  const user = context.currentUser;

  

  return (
   <nav className="navbar">
    <h1><b>Travello</b></h1>
    <div className="buttons">

      {user!=null ? <> <div className="logged-in">
      <span className='uname'>hey ! {user}</span>
      <button className='log-button' onClick={context.handleLogOut}>Log Out</button>
      
     </div></> : <><div className="logged-out">
      <button className='reg-button' onClick={()=>context.setShowRegister(true)}>Register</button>
      <button className='log-button' onClick={()=>context.setShowLogin(true)}>Log In</button>
     </div></>}
    

     
   </div>
      
   </nav>
  )
}

export default Navbar

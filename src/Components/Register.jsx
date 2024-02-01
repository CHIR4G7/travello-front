import React, { useContext, useRef, useState } from 'react'
import './Register.css'
import axios from 'axios';

import { Pins_Context } from '../store/Pin_objs';

const Register = (props) => {

    const username = useRef();
    const email = useRef();
    const password = useRef();

    const [success,setSuccess] = useState(false);
    const [failure,setFailure] = useState(false);

    const context = useContext(Pins_Context);
    

    const handleReg = async (event)=>{
        event.preventDefault();
        const newUser = {
                    userName : username.current.value,
                    email : email.current.value,
                    password: password.current.value
                }
        try{
            
            const response = await axios.post('/api/users/register',newUser);
            // console.log(response)
            setFailure(false);
            setSuccess(true);
            context.setShowRegister(false);
        }catch(err)
        {
            setFailure(true)
            console.log(err);
        }
        // console.log(password.current.value)
        
    }

  return (
   <div className="registerf">
    <div className="form-container">
        <div className="text">
            <h1>Hi, Welcome</h1>
            <h1>Please Register to Embark on Your travel Journey</h1>
        </div>
    <form className='reg-form' onSubmit={handleReg}>
        <div className="feild">
        <label>USerName : </label>
        <input type='text' placeholder='Your UserName' ref={username}/>
        </div>
        <div className="feild">
            <label>Email : </label>
        <input type='email' placeholder='Enter You Email' ref={email}/>
        </div>
       <div className="feild">
        <label>PassWord: </label>
        <input type='password' placeholder='Enter Your PassWord' ref={password}/>
       </div>
       <button className='submit' type='Submit'>Submit</button>
       <button className='close' onClick={()=>context.setShowRegister(false)}>Close</button>
      
       {success && <span>YAY ! You can Login now!</span>}
       {failure && <span>Uh OH ! Some Error Occured</span>}

    </form>
    
    </div>
   
   </div>
  )
}

export default Register

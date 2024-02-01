import React from "react";
import "./Register.css";
import axios from "axios";
import { useRef, useState, useContext } from "react";
import { Pins_Context } from '../store/Pin_objs';

const Login = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();

  const [success,setSuccess] = useState(false);
    const [failure,setFailure] = useState(false);

    const context = useContext(Pins_Context);

  const handleLog = async (event) => {
    event.preventDefault();
    const newUser = {
      userName: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try{
      const response = await axios.post("/api/users/login",newUser);
           setFailure(false);
            setSuccess(true);
            context.storage.setItem("user",response.data.userName)
            context.setCurrentUser(response.data.userName);
            context.setShowLogin(false)
            // console.log(response);
            
    }catch(err){
      console.log(err)
      setFailure(true);
    }
    
  };

  return (
    <div className="registerf">
      <div className="form-container">
        <div className="text">
          <h1>Hi, Welcome</h1>
          <h1>Please Login To Resume Your Journey</h1>
        </div>
        <form className="reg-form" onSubmit={handleLog}>
          <div className="feild">
            <label>USerName : </label>
            <input type="text" placeholder="Your UserName" ref={username} />
          </div>
          <div className="feild">
            <label>Email : </label>
            <input type="email" placeholder="Enter You Email" ref={email} />
          </div>
          <div className="feild">
            <label>PassWord: </label>
            <input
              type="password"
              placeholder="Enter Your PassWord"
              ref={password}
            />
          </div>
          <button className='submit' type="Submit">Submit</button>
          <button className='close' onClick={() => context.setShowLogin(false)}>Close</button>
          {success && <span>YAY ! Welcome Back</span>}
          {failure && <span>Uh OH ! Some Error Occured</span>}
        </form>
        
      </div>
    </div>
  );
};

export default Login;

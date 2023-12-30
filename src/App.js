import React from 'react';
import { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import  auth from './firebase';


function App() {

  const [mobile,setMobile] = useState('');
  const [otp,setOtp] = useState('');
  const [user,setUser] = useState('');

  const sendOtp =async () =>{
    try{
    const recaptcha = new RecaptchaVerifier(auth,'recaptcha',{})
    const confirmation = await signInWithPhoneNumber(auth,mobile,recaptcha)
    console.log(confirmation);
    setUser(confirmation);
    }catch(e){
      console.error(e);
    }
  }

  const verifyOtp = async () =>{
    try{
      const data = await user.confirm(otp);
      console.log(data);
      alert('Login successful');

    }catch(e){
      console.error(e);
    };
    
  }
  return (
    <div>
      <h1>Login Form</h1>
      <div>
        <div id='sign-in-button'></div>
        <input type='mobile' onChange={(e)=>setMobile(e.target.value)} name='mobile' placeholder='Enter Mobile Number'/>
        <button type='submit' onClick={sendOtp}>Submit</button>
        <div id = 'recaptcha'></div>
      </div>
      <h1>OTP</h1>
      <div>
        <input type='number' onChange={(e)=>setOtp(e.target.value)} name='otp' placeholder='Enter OTP' required />
        <button type='submit' onClick={verifyOtp} >Submit</button>
      </div>
    </div>
  );
}

export default App;
import React, { useContext, useRef, useState } from "react";
import { dataContext } from "../context/UserContext";
import axios from 'axios';
import dp from '../assets/dp.webp';

function SignUp() {
  let {serverUrl} = useContext(dataContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //we will use useRef to get the file from the input field
  let file = useRef(null);//initially it is null. when we click on the input field, it will get the file.

  const handleSignUp = async (e) => {
    e.preventDefault();//prevent page from reloading
    try{
      let data = await axios.post(serverUrl+'/api/signup',{
        firstName,
        lastName,
        userName,
        email,
        password
      },{withCredentials: true});//withCredentials: true is used to send cookies along with the request.
      console.log(data);
      alert("User Signed Up Successfully");
    }
    catch(error){
      console.log(error.message);
    }
  };

  const setFirstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const setLastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const setUserNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const setEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const setPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const [frontendImage, setFrontendImage] = useState(dp)
  const [backendImage, setBackendImage] = useState(null)

  function handleImage(e){
    let file = e.target.files[0];
    setBackendImage(file);//this will store the file in the backend

    //now we want to show the image in the frontend, so we need to convert the file into url
    let image = URL.createObjectURL(file);
    setFrontendImage(image);
  }

  return (
    <div className="bg-[#404b4a] w-full h-[100vh] justify-center items-center flex">
      {/* for signup from */}
      <div className="w-[85%] max-w-[600px] h-[550px] bg-[#09403b] rounded-xl flex flex-col justify-center items-center gap-[15px]">
        <h1 className="text-white -mt-2 mb-5 text-[20px] font-semibold">Sign Up</h1>
        <form className="w-full p-0.5 flex flex-col justify-center items-center" onSubmit={handleSignUp}>
          <input type="file" className="hidden" ref={file} onChange={handleImage}/>

        {/* add user image */}
        <div className="w-[100px] h-[100px] rounded-full bg-[#e4e0ec] overflow-hidden relative border-2 border-white">
          <img src={frontendImage} alt="dp" className="w-full h-full object-cover rounded-full"/>
          <div className="absolute w-[100%] h-[100%] bg-black top-0 opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center text-white font-bold text-2xl"
          onClick={() => file.current.click()}>
            +
          </div>
        </div>

          <div className="w-[95%] h-[50px] flex justify-center gap-3 mt-4">
            <input type="text" placeholder="First Name" className="w-[50%] rounded p-4" value={firstName} onChange={setFirstNameHandler}/>
            <input type="text" placeholder="Last Name" className="w-[50%] rounded p-4" value={lastName} onChange={setLastNameHandler}/>
          </div>
          <div className="w-[95%] h-[50px] flex justify-center gap-3 mt-4">
            <input type="text" placeholder="User Name" className="w-[50%] rounded p-4" value={userName} onChange={setUserNameHandler}/>
            <input type="email" placeholder="Email" className="w-[50%] rounded p-4" value={email} onChange={setEmailHandler}/>
          </div>
          <div className="w-[95%] h-[50px] flex justify-center gap-3 mt-4">
            <input type="password" placeholder="password" className="w-full rounded p-4" value={password} onChange={setPasswordHandler}/>
          </div>
          <div className="w-[95%] h-[55px] flex justify-center gap-3 mt-4">
            <button className="w-full mt-2 text-white font-semibold bg-[#6a3fba] rounded-[10px] cursor-pointer hover:bg-[#5cee5c] hover:border-[1px] hover:text-black" type="submit">Sign Up</button>
          </div>
          <p className="text-[#efe8e8] mr-5 mt-3">Already Have an account? <a className="font-bold text-[#9494e8] ml-2" href="http://localhost:5173/login">Login</a></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

import React, { useContext, useState } from "react";
import { dataContext } from "../context/UserContext";
import axios from 'axios';

function Login() {
  let {serverUrl} = useContext(dataContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();//prevent page from reloading
    try{
      let data = await axios.post(serverUrl+'/api/login',{
        email,
        password
      },{withCredentials: true});//withCredentials: true is used to send cookies along with the request.
      console.log(data);
      alert("Login Successfully");
    }
    catch(error){
      alert(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const setEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const setPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="bg-[#404b4a] w-full h-[100vh] justify-center items-center flex">
      {/* for signup from */}
      <div className="w-[85%] max-w-[550px] h-[450px] bg-[#09403b] rounded-xl flex flex-col justify-center items-center gap-[15px]">
        <h1 className="text-white -mt-2 mb-5 text-[20px] font-semibold">Login</h1>
        <form className="w-full p-0.5 flex flex-col justify-center items-center" onSubmit={handleLogin}>

        <div className="w-[80%] h-[50px] flex justify-center gap-3 mt-4">
            <input type="email" placeholder="email" className="w-full rounded p-4" value={email} onChange={setEmailHandler}/>
          </div>
          <div className="w-[80%] h-[50px] flex justify-center gap-3 mt-4">
            <input type="password" placeholder="password" className="w-full rounded p-4" value={password} onChange={setPasswordHandler}/>
          </div>
          <div className="w-[90%] h-[55px] flex justify-center gap-3 mt-4">
            <button className="w-[50%] mt-2 text-white font-semibold bg-[#6a3fba] rounded-[10px] cursor-pointer hover:bg-[#5cee5c] hover:border-[1px] hover:text-black" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login
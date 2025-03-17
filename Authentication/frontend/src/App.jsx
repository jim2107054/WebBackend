import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'

const App = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Login/>}/>  //route for login, default route. project will start from Login */}
      <Route path='/signup' element={<SignUp/>}/>  //route for signup 
      <Route path='/login'element={<Login/>}/>  //route for login
    </Routes>
  )
}

export default App
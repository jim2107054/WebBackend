import React, { createContext } from 'react'

export const dataContext = createContext();

const UserContext = ({children}) => {
    const serverUrl = 'https://web-backend-weld.vercel.app'
    const value = {
        serverUrl
    }
  return (
    <dataContext.Provider value={value}>
        {children}
    </dataContext.Provider>
  )
}

export default UserContext
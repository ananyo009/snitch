import React, { useEffect } from 'react'
import { router } from './app.routes.jsx'
import { RouterProvider } from 'react-router-dom'
import useAuth from '../features/auth/hook/useAuth.js'
import { useSelector } from 'react-redux'

const App = () => {

  const { handlegetMe } = useAuth();

  const user = useSelector(state => state.auth.user)



  useEffect(() => {
    handlegetMe()
  },[])


    console.log(user);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import {Header, Footer} from "./components/index.js"

function App() {
   const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])
  return !loading ? (
    <div className='min-h-screen flex flex-col bg-slate-200 text-slate-900'>
      <div className="w-full flex-1 flex flex-col">
        <Header/>
        <main className='w-full flex-1'>
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ) : (null)
}

export default App

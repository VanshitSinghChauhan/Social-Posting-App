import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutButton() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block rounded-md border border-red-400 px-4 py-2 text-sm font-medium text-red-100 transition duration-200 hover:bg-red-500 hover:text-white'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutButton
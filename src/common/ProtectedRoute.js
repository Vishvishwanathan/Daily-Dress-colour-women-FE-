import React from 'react'
import { Navigate } from 'react-router-dom'
import useLogout from './useLogout'
function ProtectedRoute({children}) {
    const token = sessionStorage.getItem('token')
    if(!token)
        sessionStorage.clear()
        useLogout()
  return token ? children : <Navigate to='/'/>
}

export default ProtectedRoute
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';


interface ProtectedRouteProps {
  children?:React.ReactNode
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({children}) => {
  
  const {isAuthenticated} = useSelector((state:RootState)=>state.user)

    if(!isAuthenticated){
     return <Navigate to={'/login'} replace />
    }
  return children ? <>{children}</>:<Outlet />
}

export default ProtectedRoute
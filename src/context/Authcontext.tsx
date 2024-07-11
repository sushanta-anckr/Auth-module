import React, { createContext, useContext, useEffect, useState } from 'react';
import {User, users } from '../store/users';


interface AuthContextType{
    user:User | null;
    isLoggedIn: boolean;
    login:(username:string,password:string)=>void;
    logout:()=>void;
    getUser: () => User | null;
}

const AuthContext=createContext<AuthContextType | undefined>(undefined);

export const useAuth =()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const [user,setUser]=useState<User|null>(()=>{
        const storedUser = localStorage.getItem('user')
        return storedUser?JSON.parse(storedUser):null
    });

    useEffect(()=>{
        if(user){
            localStorage.setItem('user',JSON.stringify(user))
        }else{
            localStorage.removeItem('user')
        }
    },[user])

    const isLoggedIn = !!user;

    console.log(isLoggedIn)

    const login = (username:string,password:string)=>{
        const authenticateUser = users.find((u)=>u.username===username && u.password===password)
        if(authenticateUser){
            setUser(authenticateUser);
            console.log(authenticateUser)
        }else{
            throw new Error('Invalid username or password');
        }
    };

    const logout=()=>{
        localStorage.removeItem('user');
        setUser(null)
    }

    const getUser = () => {
        return user;
      };

    return <AuthContext.Provider value={{user,isLoggedIn,login,logout,getUser}}>
        {children}
    </AuthContext.Provider>

}
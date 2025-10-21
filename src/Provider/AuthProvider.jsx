import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

 export  const AuthContext=createContext()



 const auth=getAuth(app)
const AuthProvider = ({children}) => {
  const [user,setUser]=useState(null)
  const[loading,setLoading]=useState(true)

  const createUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const logOut=()=>{
    return signOut(auth)
  }
  const login=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)

  }

  const updateUser=(updatedData)=>{
    return updateProfile(auth.currentUser,updatedData)

  }
  useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
       setUser(currentUser)
       setLoading(false) 
    })
    return ()=>{
        unsubscribe

    }
  },[])
  const authData={
    user,
    setUser,
    createUser,
    logOut,
    login,
    loading,
    setLoading,
    updateUser,
  }
    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;
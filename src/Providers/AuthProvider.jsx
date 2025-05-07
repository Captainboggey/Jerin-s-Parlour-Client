import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebaseinit/firebase.config';
export const AuthContext =createContext(null)
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
const googleAuth = new GoogleAuthProvider()
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const googleLogin =()=>{
        setLoading(true)
        return signInWithPopup(auth,googleAuth)
    }
    const signUp = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUser=(name)=>{
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName: name
        })
    }

    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            console.log('state changed')
            setLoading(false)
        })
        return()=>{
            unSubscribe()
        }
    },[])


    const authInfo={
        user,loading,googleLogin,signUp,updateUser,logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
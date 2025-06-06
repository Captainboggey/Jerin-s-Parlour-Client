import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebaseinit/firebase.config';
export const AuthContext =createContext(null)
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from '../Hooks/useAxiosPublic';
const googleAuth = new GoogleAuthProvider()
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const axiosPublic = useAxiosPublic()
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
    const login =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            const loggedUser ={email: currentUser?.email}
            if(currentUser){
                axiosPublic.post('/jwt',loggedUser)
                .then(res=>{
                    localStorage.setItem('access-token',res.data.token)
                    setLoading(false)
                })
            }else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            
            
        })
        return()=>{
            unSubscribe()
        }
    },[])


    const authInfo={
        user,loading,googleLogin,signUp,updateUser,logOut,login
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
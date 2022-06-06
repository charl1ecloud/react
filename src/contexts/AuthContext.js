/* access user anywhere in application*/
/* https://firebase.google.com/docs/auth/web/manage-users */

import React, { useContext, useState, useEffect } from 'react'
import {auth} from '../firebase'

/* create a context*/
const AuthContext = React.createContext()

/* easy access*/
export function useAuth(){
    return useContext(AuthContext) /* this function return us the value of the current context*/
}

/* this Authprovider function is in charge of all function needed to update user status*/
export default function AuthProvider({children}) {
    /* pass in children to render in "return"*/
    
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })/* when auth state changed(eg sign in), set current user variable to the user value detected*/

        return unsubscribe
    }, [])

    /* What is Unsubscribe:
    at some later time, we want to stop a function from
     executing anymore, because we've already done whatever
    we need to. In firebase, the onAuthStateChanged function returns a
     function to you that unsubscribes the function you originally gave it.
    Used when want to listen for the changes in the auth status of the user just one time*/

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }

    /* these are the values needed to be pass in for context*/
    const value = {
        currentUser,
        signup,
        login,
        logout
    }


  return (
      /* use context in provider, 
      wrap all code need information about the 'value' prop context in provider
      */
      /* passing in the current value of users and functions needed,
      and then render the children - which is the app page*/
    <AuthContext.Provider value={value}>
        
        {children} 
    </AuthContext.Provider>
  )
}

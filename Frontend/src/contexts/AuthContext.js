/* access user anywhere in application*/
/* https://firebase.google.com/docs/auth/web/manage-users */

import React, { useContext, useState, useEffect } from 'react'
import {auth} from '../firebase'
import axios from 'axios'
import { Link, Navigate, useNavigate } from "react-router-dom";

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
    const [displayUsername, setDisplay] = useState()
    const nav = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            const requestOptions = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + currentUser,
              },
            };
      
            const response = await fetch("users/me", requestOptions);
      
            if (!response.ok) {
                setCurrentUser(null);
            }
            localStorage.setItem("user", currentUser);
          };
          fetchUser();
        }, [currentUser])

    

    /* What is Unsubscribe:
    at some later time, we want to stop a function from
     executing anymore, because we've already done whatever
    we need to. In firebase, the onAuthStateChanged function returns a
     function to you that unsubscribes the function you originally gave it.
    Used when want to listen for the changes in the auth status of the user just one time*/


    function signup(name, e, p) {
        return axios
          .post("/register", {
            username: name,
            email: e,
            password: p,
          })
          .then(function (response) {
            
            return response.data[0]; //"dear user, please check etc..."
          });
      }

    async function login(user, pass){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify(
              `grant_type=&username=${user}&password=${pass}&scope=&client_id=&client_secret=`
            ),
          };
      
          const response = await fetch("/token", requestOptions);
          const data = await response.json();
      
          
          setCurrentUser(data.access_token);
          localStorage.setItem('user', currentUser)
          
          
        };
      
    
        
    

    function logout(){
        setCurrentUser(null)
        localStorage.clear()
        nav('/Login')
    }

    /* these are the values needed to be pass in for context*/
    const value = {
        currentUser,
        displayUsername,
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

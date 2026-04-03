import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import { AuthContextAPI } from "./AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { __DB } from "../backend/firebase";

export let UserContextAPI= createContext(null);


let UserContext = ({children}) => {

    let {authUser}= useContext(AuthContextAPI);

    let [userDataFromDB, setUserDataFromDB]= useState(null);

    let fetchDataFromDB = async ()=>{
        console.log("fetch db starting");

        console.log();
        
        

        if(authUser !=null){
            
            try {
                let userDataReference= doc(__DB, "user_profile",authUser?.uid);

                onSnapshot(userDataReference, (user)=>{

                    if(user.exists){

                        setUserDataFromDB(user?.data());
                        // console.log(user?.data());
                        
                    }

                });

            } catch (error) {
                toast.error(error.message)
            }
        }
    }


    useEffect(()=>{
        fetchDataFromDB();
    },[authUser])

    return <UserContextAPI.Provider value={{userDataFromDB}}>
        {children}
        
    </UserContextAPI.Provider>
  
}

export default UserContext
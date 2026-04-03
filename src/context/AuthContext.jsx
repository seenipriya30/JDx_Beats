import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { __AUTH } from "../backend/firebase";

// eslint-disable-next-line react-refresh/only-export-components
export let AuthContextAPI= createContext();

let AuthContext = ({children}) => {

    let [authUser, setAuthuser]= useState(null);

    useEffect(()=>{
        onAuthStateChanged(__AUTH, (user)=>{
            console.log(user);
            
            if(user?.emailVerified && user?.accessToken){
                setAuthuser(user);
                window.localStorage.setItem("Token", user?.accessToken)
    }else{
        setAuthuser(null)
        window.localStorage.clear()
    }
    
    })
},[])

  return <AuthContextAPI.Provider value={{authUser, setAuthuser}}>
    {children}
  </AuthContextAPI.Provider>

}
export default AuthContext
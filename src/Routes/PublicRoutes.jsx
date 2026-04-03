import React, { children, useContext } from 'react'
import { AuthContextAPI } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const PublicRoutes = () => {

    let {authUser}= useContext(AuthContextAPI);

    if(authUser==null){
        return <>{children}</>
    }else{
        return <Navigate to={"/user-profile"}/>
    }


}

export default PublicRoutes
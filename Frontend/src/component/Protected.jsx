import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const Protected = ({ children, role }) => {
    
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
    
    console.log(user);


    if (loading) {
        return <Loader/>
    }
    
    if (!user) {
        return <Navigate to="/login"/>
    }


    if (user.role !== role) {
        return <Navigate to="/"/>
    }


    return children;
};

export default Protected;

import React,{useContext} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import context from '../Context';


function PrivateRoute() {
    const {user} = useContext(context);

    return (
        user ? <Outlet/> : <Navigate to = "/login"/>
    )
}

  // <Route {...rest} render={props=>{
        //     return user?<Component {...props}/> : <Redirect to="login"/>
        // }} />

export default PrivateRoute

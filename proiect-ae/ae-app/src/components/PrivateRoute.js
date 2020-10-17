import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {isLoggedIn}=rest;
    console.log(isLoggedIn)
    return (
        <Route {...rest} render={props => {
            console.log(isLoggedIn)
        return isLoggedIn ?
                <Component {...props} />
            :  (
            <Redirect to="/" />)
        }} />
    );
};

export default PrivateRoute;
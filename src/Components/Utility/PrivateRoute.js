import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import tokenService from '../../Services/token-service';

export default function PrivateRoute({component, setEnigma, ...props}) {
    const Component = component;
    return (
        <Route
            {...props}
            render={componentProps => (
                //Checks to see if logged in. If not logged in goes to login page
                tokenService.hasToken() ? <Component {...componentProps} default={setEnigma} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: {from : componentProps.location}
                    }}/>
            )}
        />
    );
}
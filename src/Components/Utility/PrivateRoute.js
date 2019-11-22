import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import tokenService from '../../Services/token-service';

export default function PrivateRoute({component, setEnigma, ...props}) {
    const Component = component;
    return (
        <Route
            {...props}
            render={componentProps => (
                tokenService.hasToken() ? <Component {...componentProps} default={setEnigma} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: {from : componentProps.location}
                    }}/>
            )}
        />
    );
}
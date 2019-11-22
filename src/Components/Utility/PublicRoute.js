import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import tokenService from '../../Services/token-service';

export default function PrivateRoute({ component, ...props }) {
    const Component = component;
    return (
        <Route
            {...props}
            render={componentProps => (
                tokenService.hasToken()
                    ? <Redirect to={'/'} />
                    : <Component {...componentProps} />
            )}
        />
    );
}
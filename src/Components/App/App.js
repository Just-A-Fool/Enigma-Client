import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Enigma from '../Enigma/Enigma';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import SavedCiphers from '../SavedCiphers/SavedCiphers';
import PrivateRoute from '../Utility/PrivateRoute';
import PublicRoute from '../Utility/PublicRoute';
import Help from '../Help/Help';
import LoggedInNav from '../Navbar/LoggedInNav';
import LoggedOutNav from '../Navbar/LoggedOutNav';

export default class App extends React.Component {
    state = {
        enigmaDefault: null
    }

    setEnigma = (enigmaExport) => {
        this.setState({
            enigmaDefault: enigmaExport
        });
    }

    render() {
        return (
            <div>
                <header>
                    <Switch>
                        <Route
                            exact
                            path={['/', '/ciphers', '/help']}
                            component={LoggedInNav}
                        />
                        <Route
                            path={['/guest']}
                            component={LoggedOutNav}
                        />
                    </Switch>
                </header>
                <main>
                    <Switch>
                        <PrivateRoute
                            exact
                            path={'/'}
                            setEnigma={this.state.enigmaDefault}
                            component={Enigma}
                        />
                        <PrivateRoute
                            exact
                            path={'/ciphers'}
                            setEnigma={this.setEnigma}
                            component={SavedCiphers}
                        />
                        <PrivateRoute
                            path={'/help'}
                            component={Help}
                        />
                        <PublicRoute
                            path={'/signup'}
                            component={SignupPage}
                        />
                        <PublicRoute
                            path={'/login'}
                            component={LoginPage}
                        />
                        <PublicRoute
                            exact
                            path={'/guest'}
                            component={Enigma}
                        />
                        <PublicRoute
                            path={'/guest/help'}
                            component={Help}
                        />
                    </Switch>
                </main>
            </div>
        );
    }
}
import React from 'react';
import {Link} from 'react-router-dom';
import enigmaApiService from '../../Services/enigma-api-service';



export default class LoginPage extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();

        let e = event.target;
        let form = {
            username: e.username.value,
            password: e.password.value
        }

        enigmaApiService.login(JSON.stringify(form), this.props.history);
            
    }
    
    render() {
        
        return (
            <div>
                <div>
                    <form id="log-in-form" onSubmit={(event) => this.handleSubmit(event)}>
                        <legend>Log In</legend>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                        <button type='submit'>Submit</button>
                    </form>
                    <div id="sign-up-link">
                        <p>Don't have an account?</p>
                        <Link to='/signup'>Sign up here</Link>
                    </div>
                </div>
                <Link to='/guest'>
                    <button id="guest-button">Guest User</button>
                </Link>
            </div>
        );
    }
}


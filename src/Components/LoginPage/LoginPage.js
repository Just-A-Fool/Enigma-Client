import React from 'react';
import { Link } from 'react-router-dom';
import enigmaApiService from '../../Services/enigma-api-service';



export default class LoginPage extends React.Component {

    state = {
        error: null
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let e = event.target;
        let form = {
            username: e.username.value,
            password: e.password.value
        }

        enigmaApiService.login(JSON.stringify(form), this.props.history)
            .then(res => {
                if (res.message) {
                    this.setState({
                        error: res.message
                    });
                } 
            });

    }

    render() {

        return (
            <div className='LS-page'>
                <div id='login-form-container'>
                    <form id="log-in-form" onSubmit={(event) => this.handleSubmit(event)} onChange={() => this.setState({error: null})}>
                        <legend>Log In</legend>

                        {this.state.error ? <div className='error-box'>{this.state.error}</div> : ''}

                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name='username' required />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name='password' required />
                        <button type='submit'>Submit</button>
                    </form>
                    <div id="sign-up-link">
                        <p className='signup-para'>Don't have an account?</p>
                        <Link to='/signup'>Sign up here</Link>
                    </div>
                </div>
                <Link to='/guest' id='guestbutton-container'>
                    <button id="guest-button">Guest User</button>
                </Link>
            </div>
        );
    }
}


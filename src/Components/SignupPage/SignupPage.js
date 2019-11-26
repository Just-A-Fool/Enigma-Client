import React from 'react';
import { Link } from 'react-router-dom';
import enigmaApiService from '../../Services/enigma-api-service';

export default class SignupPage extends React.Component {

    state = {
        error: null
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let e = event.target;

        //If the passwords dont match
        if (e.password.value !== e.secondPassword.value) {
            this.setState({ error: 'Passwords must match.' })
        } else {

            let form = {
                username: e.username.value,
                password: e.password.value,
                email: e.email.value
            }

            enigmaApiService.signup(JSON.stringify(form), this.props.history)
                .then(res => {
                    //If there is an error
                    if (res.message) {
                        this.setState({ error: res.message })
                    }
                });
        }

    }

    render() {
        return (
            <div className='LS-page'>
                <div id='signup-form-container'>
                    <form id="sign-up-form" onSubmit={(event) => this.handleSubmit(event)}>
                        <legend>Sign Up</legend>
                        {/* If an error exists it will show up here */}
                        {this.state.error ? <div className='error-box'>{this.state.error}</div> : ''}
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name='email' required />
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name='username' required />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name='password' required />
                        <label htmlFor="secondPassword">Retype Password</label>
                        <input type="password" id="secondPassword" name='secondPassword' required />
                        <button type='submit'>Submit</button>
                    </form>
                    <div id="sign-up-link">
                        <p className='signup-para'>Already have an account?</p>
                        <Link to='/login'>Log In here</Link>
                    </div>
                </div>
                <Link to='/guest' id='guestbutton-container'>
                    <button id="guest-button">Guest User</button>
                </Link>
            </div>
        );
    };
}

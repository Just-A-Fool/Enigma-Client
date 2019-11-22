import React from 'react';
import enigmaApiService from '../../Services/enigma-api-service';

export default class SignupPage extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        let e = event.target;

        let form = {
            username: e.username.value,
            password: e.password.value,
            email: e.email.value
        }

        console.log(form);
        enigmaApiService.signup(JSON.stringify(form), this.props.history);
    }

    render() {
        return (
            <form id="sign-up-form" onSubmit={(event) => this.handleSubmit(event)}>
                <legend>Sign Up</legend>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
                <button type='submit'>Submit</button>
            </form>
        );
    };
}

//aedan
//#Password123

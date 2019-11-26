import React from 'react';

export default function LoggedOutNav(props) {
    return (
        <nav id="navbar">
            <div id="nav-flex">
                <button className="nav-button" onClick={() => props.history.push('/guest')}>Enigma</button>
                <button className="nav-button" onClick={() => props.history.push('/guest/help')}>Help</button>
                <button className="nav-button" onClick={() => props.history.push('/login')}>Log In</button>
                <button className="nav-button" onClick={() => props.history.push('/signup')}>Sign Up</button>
            </div>
        </nav>
    );
}


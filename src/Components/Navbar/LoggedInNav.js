import React from 'react';
import tokenService from '../../Services/token-service';

export default function LoggedInNav(props) {
    return (
        <nav id="navbar">
            <div id="nav-flex">
                <button className="nav-button" onClick={() => props.history.push('/')}>Enigma</button>
                <button className="nav-button" onClick={() => props.history.push('/ciphers')}>Saved Ciphers</button>
                <button className="nav-button" onClick={() => props.history.push('/help')}>Help</button>
                <button className="nav-button" onClick={() => {
                    //On logout get rid of Token and go to login page
                    tokenService.clearToken();
                    props.history.push('/login');
                }}>Log Out</button>
            </div>
        </nav>
    );
}


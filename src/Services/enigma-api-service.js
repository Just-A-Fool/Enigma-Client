import tokenService from "./token-service";
import config from '../config';
const URL = config.URL;

const enigmaApiService = {

    //api request for signing up
    signup(body, history) {
        let error = null;
        return fetch(`${URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        })
            .then(res => {
                //if user was successfully created
                if (res.status === 201) {
                    enigmaApiService.login(body, history);
                } else {
                    //instanciate error obj and parse the json response
                    error = {};
                    return res.json();
                }
            })
            .then(res => {
                //if error is no longer null
                if (error) {
                    error.message = res.message;
                    return error;
                } 
                //returns empty obj to signify user being added.
                else return {};
            })
    },
    //api request for logging in
    login(body, history) {

        let error = null;
        return fetch(`${URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        })
            .then(resp => {
                if (!resp.ok) {
                    error = {};
                }
                return resp.json();
            })
            .then(resp => {
                //if no error save the token that was given back and move user to Enigma
                if (!error) {
                    tokenService.saveToken(resp.auth);
                    history.push('/');
                    return {};
                } else {
                    error.message = resp.message;
                    return error;
                }
            })
    },

    //api request for posting a cipher
    saveCipher(body) {
        fetch(`${URL}/cipher`, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenService.getToken()}`
            },
            'body': body
        })
            .then(res => {
                if(res.status === 201) {
                    return {};
                }
            })
    },

    //api request for getting user's saved ciphers
    getCiphers() {
        return fetch(`${URL}/cipher`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenService.getToken()}`
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else throw res;
            })
            .then(data => {
                return data;
            });
    },

    //api request to delete a saved cipher
    deleteCipher(id) {
        return fetch(`${URL}/cipher/${id}`, {
            'method': 'DELETE',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenService.getToken()}`
            }
        })
            .then(res => {
                if (res.status === 204) {
                    return true;
                } else return false;
            })
            
    }
}

export default enigmaApiService;
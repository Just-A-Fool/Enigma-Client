import tokenService from "./token-service";

const URL = 'http://localhost:8000';

const enigmaApiService = {
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
                if (res.status === 201) {
                    enigmaApiService.login(body, history);
                } else {
                    error = {};
                    console.log('error')
                    return res.json();
                }
            })
            .then(res => {
                if (error) {
                    error.message = res.message;
                    return error;
                } else return {};
            })
    },
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
                console.log(res)
                console.log(body)
            })
            .catch(e => console.log(e));
    },
    getCiphers() {
        return fetch(`${URL}/cipher`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenService.getToken()}`
            }
        })
            .then(res => {
                console.log(res)
                if (res.ok) {
                    return res.json();
                } else throw res;
            })
            .then(data => {
                console.log(data);
                return data;
            });
    },
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
            .catch(e => console.log(e));
    }
}

export default enigmaApiService;
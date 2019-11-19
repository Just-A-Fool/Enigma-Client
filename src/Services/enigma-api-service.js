const URL = 'http://localhost:8000';

const enigmaApiService = {
    
    saveCipher(body) {
        console.log(body);
        fetch(`${URL}/api`, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': body
        })
        .then()
        .catch(e => console.log(e));
    }
}

export default enigmaApiService;
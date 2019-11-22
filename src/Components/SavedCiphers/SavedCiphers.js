import React from 'react';
import Cipher from './Cipher/Cipher';
import enigmaApiService from '../../Services/enigma-api-service';


export default class SavedCiphers extends React.Component {
    state = {
        ciphers: []
    }

    deleteCipher = async (id) => {
        let newState = this.state.ciphers.filter(cipher => {
            return cipher.id !== id;
        })

        await enigmaApiService.deleteCipher(id)
            .then(response => {
                if(response === true) {
                    this.setState({
                        ciphers: newState
                    })
                }
            })
        
    }

    componentDidMount = async () => {
        let ciphers = await enigmaApiService.getCiphers()

        console.log(ciphers)
        this.setState({
            ciphers: ciphers
        })
    }

    render() {
        let cipherList = this.state.ciphers.map((cipher, index) => {
            return (
                <Cipher key={index} data={this.state.ciphers[index]} setEnigma={this.props.default} history={this.props.history} deleteMe={this.deleteCipher} />
            );
        });

        let body = (this.state.ciphers.length === 0) ? <h2>No Ciphers Saved</h2> : <ul>{cipherList}</ul>;

        return (
            <div>
                <h1>Saved Ciphers</h1>
                {body}
            </div>
        );
    }
}


import React from 'react';
import Cipher from './Cipher/Cipher';
import enigmaApiService from '../../Services/enigma-api-service';


export default class SavedCiphers extends React.Component {
    state = {
        ciphers: [],
        loading: true
    }

    deleteCipher = async (id) => {
        let newState = this.state.ciphers.filter(cipher => {
            return cipher.id !== id;
        })

        await enigmaApiService.deleteCipher(id)
            .then(response => {
                if (response === true) {
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
            ciphers: ciphers,
            loading: false
        })
    }

    render() {
        let cipherList = this.state.ciphers.map((cipher, index) => {
            return (
                <Cipher key={index} data={this.state.ciphers[index]} setEnigma={this.props.default} history={this.props.history} deleteMe={this.deleteCipher} index={index} />
            );
        });

        let body;
        if (this.state.loading) {
            body = <h2>Loading...</h2>
        } else body = (this.state.ciphers.length === 0) ? <h2>No Ciphers Saved</h2> : <ul className='cipher-list'>{cipherList}</ul>;

        return (
            <div id='saved-ciphers-page'>
                <h1>Saved Ciphers</h1>
                {body}
            </div>
        );
    }
}


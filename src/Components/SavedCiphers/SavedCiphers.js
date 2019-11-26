import React from 'react';
import Cipher from './Cipher/Cipher';
import enigmaApiService from '../../Services/enigma-api-service';


export default class SavedCiphers extends React.Component {
    state = {
        ciphers: [],
        loading: true
    }

    deleteCipher = async (id) => {
        //Filters out the cipher with the id given
        let newState = this.state.ciphers.filter(cipher => {
            return cipher.id !== id;
        });

        await enigmaApiService.deleteCipher(id)
            .then(response => {
                //If the delete was sucessfull 
                if (response === true) {
                    this.setState({
                        ciphers: newState
                    });
                }
            })
    }

    componentDidMount = async () => {
        //After it has mounted get all saved ciphers.
        let ciphers = await enigmaApiService.getCiphers()

        this.setState({
            ciphers: ciphers,
            loading: false
        });
    }

    render() {
        //Makes an array of ciphers to display
        let cipherList = this.state.ciphers.map((cipher, index) => {
            return (
                <Cipher 
                    key={index} 
                    data={this.state.ciphers[index]} 
                    setEnigma={this.props.default} 
                    history={this.props.history} 
                    deleteMe={this.deleteCipher} 
                    index={index} 
                />
            );
        });

        let body;
        if (this.state.loading) {
            body = <h2>Loading...</h2>
        } 
        //If no saved ciphers tell the user else give them the ciphers.
        else body = (this.state.ciphers.length === 0) ? <h2>No Ciphers Saved</h2> : <ul className='cipher-list'>{cipherList}</ul>;

        return (
            <div id='saved-ciphers-page'>
                <h1>Saved Ciphers</h1>
                {body}
            </div>
        );
    }
}


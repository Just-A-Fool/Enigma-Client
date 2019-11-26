import React from 'react';
import FakeRotor from './FakeRotor/FakeRotor';
import FakeWire from './FakeWire/FakeWire';

export default class Cipher extends React.Component {

    render() {
        //Passed JSON string representing the settings for the Enigma
        let data = JSON.parse(this.props.data.data);

        //Make three fakeRotors
        let allRotors = ['rotor1', 'rotor2', 'rotor3'];
        let fakeRotors = allRotors.map(rotor => {
            return (
                <FakeRotor key={rotor} data={data[rotor]} />
            )
        });

        let fakeWires = [];
        //for every key/value pair in the plugboard make a fake wire
        Object.keys(data.plug).forEach(key => {
            fakeWires.push(<FakeWire key={key} keyData={key} value={data.plug[key]} />)
        });

        return (
            <li key={this.props.data.id} className="setting-li">
                <h2>Cipher #{this.props.index + 1}</h2>
                <p>Rotors</p>
                <div className="all-rotors">
                    {fakeRotors}
                </div>
                <p>Plug-board</p>
                <div className="plugboard-container">
                    {fakeWires}
                </div>
                <button onClick={async () => {
                    //Allows Enigma to import the used cipher and sends the user to Enigma
                    await this.props.setEnigma(data);
                    this.props.history.push('/');
                }}>Use</button>
                <button onClick={() => {
                    //Sends a delete request for the cipher
                    this.props.deleteMe(this.props.data.id);
                }}>Delete</button>
            </li>
        );
    }


}
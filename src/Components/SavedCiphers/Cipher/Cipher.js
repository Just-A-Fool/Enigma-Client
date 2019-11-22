import React from 'react';
import FakeRotor from './FakeRotor/FakeRotor';
import FakeWire from './FakeWire/FakeWire';
import enigmaApiService from '../../../Services/enigma-api-service';

export default class Cipher extends React.Component {

    render() {
        let data = JSON.parse(this.props.data.data)
        console.log(data.rotor1)

        let allRotors = ['rotor1', 'rotor2', 'rotor3'];
        let fakeRotors = allRotors.map(rotor => {
            return (
                <FakeRotor key={rotor} data={data[rotor]} />
            )
        });


        console.log(data.plug)
        let fakeWires = [];
        Object.keys(data.plug).forEach(key => {
            fakeWires.push(<FakeWire key={key} keyData={key} value={data.plug[key]} />)
        })

        return (
            <li key={this.props.data.id} className="setting-li">
                <h2>Name of setting</h2>
                <p>Rotors</p>
                <div className="all-rotors">
                    {fakeRotors}
                </div>
                <p>Plug-board</p>
                <div className="plugboard-container">
                    {fakeWires}
                </div>
                <button onClick={async () => {
                    await this.props.setEnigma(data);
                    this.props.history.push('/');
                }}>Use</button>
                <button onClick={() => {
                    this.props.deleteMe(this.props.data.id);
                }}>Delete</button>
            </li>
        );
    }


}
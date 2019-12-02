import React from 'react';
import Wire from './Wire/Wire';

export default class Plugboard extends React.Component {

    render() {
        //Stores alphabet in an Array
        const alphabet = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');
        //Initializes filtered as a copy of the alphabet
        let filtered = [...alphabet];

        //This is filtering through the multi-dimensional array one array at a time, and removing any used letters from filtered.
        for (let i = 0; i < this.props.wires.length; i++) {
            filtered = filtered.filter(letter => !this.props.wires[i].includes(letter));
        }
        //Adding a blank space so user can select nothing if they wish to.
        filtered.splice(0, 0, '');

        //Wires is where we'll store all the copies of the wire component.
        let wires = [];
        //Make ten sets of wires
        for (let i = 0; i < 10; i++) {
            //JSX for the payload of wires
            wires.push(
                <div key={i} className="plugboard">
                    <Wire i={i} j={0} filtered={filtered} wires={this.props.wires} changeWire={this.props.changeWire} /> 
                    <span>:</span>
                    <Wire i={i} j={1} filtered={filtered} wires={this.props.wires} changeWire={this.props.changeWire} /> 
                </div>
            );
        }
        return (
            <div>
                <p>Plugboard</p>
                <div className="plugboard-container">
                    {wires}
                </div>
            </div>
        );
    }
}

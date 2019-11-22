import React from 'react';

export default class Rotors extends React.Component {

    changeRotor = async (event, rotorName) => {
        let newRotor = {...this.props.export[rotorName], which: event.target.value};
        
        this.props.handleRotorsComponent(rotorName, newRotor)
    }

    changeShift = async (event, rotorName) => {
        let newRotor = {...this.props.export[rotorName], shift: event.target.value};
        
        this.props.handleRotorsComponent(rotorName, newRotor)
    }

    render() {
        let options = ['I', 'II', 'III', 'IV', 'V'];
        let picked = [this.props.export.rotor1.which, this.props.export.rotor2.which, this.props.export.rotor3.which]
        let rotors = [];
        let filteredOptions = options.filter(option => !picked.includes(option));
        for (let i = 1; i <= 3; i++) {
            let rotor = `rotor${i}`;
            rotors.push(
                <div className="rotor" key={i}>
                    <select name={rotor} id={rotor} onChange={(e) => this.changeRotor(e, rotor)}>
                        <option key={this.props.export[rotor].which} value={this.props.export[rotor].which}>{this.props.export[rotor].which}</option>
                        {filteredOptions.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                    <input type="number" className="rotor-index" min='0' max='25' value={this.props.export[rotor].shift} onChange={(e) => this.changeShift(e, rotor)} />
                </div>
            );
        }
        return (
            <div>
                <p>Rotors</p>
                <ul className="all-rotors">
                    {rotors}
                </ul>
            </div>
        )
    }
}

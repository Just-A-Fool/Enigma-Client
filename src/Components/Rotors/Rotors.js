import React from 'react';

export default class Rotors extends React.Component {
    state = {
        rotor1: {
            which: 'I',
            shift: 0,
        },
        rotor2: {
            which: 'II',
            shift: 0,
        },
        rotor3: {
            which: 'III',
            shift: 0,
        }
    }

    changeRotor = async (event, rotor) => {
        let newRotor = {...this.state[rotor], which: event.target.value};
        
        await this.setState({
            [rotor]: newRotor
        })
        this.props.changeRotors(this.state)
    }

    changeShift = async (event, rotor) => {
        let newRotor = {...this.state[rotor], shift: event.target.value};
        
        await this.setState({
            [rotor]: newRotor
        })
        this.props.changeRotors(this.state)
    }

    render() {
        let options = ['I', 'II', 'III', 'IV', 'V'];
        let picked = [this.state.rotor1.which, this.state.rotor2.which, this.state.rotor3.which]
        let rotors = [];
        let filteredOptions = options.filter(option => !picked.includes(option));
        for (let i = 1; i <= 3; i++) {
            let rotor = `rotor${i}`;
            rotors.push(
                <div className="rotor" key={i}>
                    <select name={rotor} id={rotor} onChange={(e) => this.changeRotor(e, rotor)}>
                        <option key={this.state[rotor].which} value={this.state[rotor].which}>{this.state[rotor].which}</option>
                        {filteredOptions.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                    <input type="number" className="rotor-index" min='0' max='25' value={this.state[rotor].shift} onChange={(e) => this.changeShift(e, rotor)} />
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

import React from 'react';

export default class Rotors extends React.Component {

    changeRotor = async (event, rotorName) => {
        //changes only 'which' in props.export for the rotor to change
        let newRotor = {...this.props.export[rotorName], which: event.target.value};
        
        //change which rotor is the rotorName slot ex: rotor1 
        this.props.handleRotorsComponent(rotorName, newRotor)
    }

    changeShift = async (event, rotorName) => {
        //changes only 'shift' in props.export for the rotor to change
        let newRotor = {...this.props.export[rotorName], shift: event.target.value};

        //if value is within range change the rotor's shift
        if(!(event.target.value > 25 || event.target.value < 0 || !event.target.value)) {
            this.props.handleRotorsComponent(rotorName, newRotor)
        }
    }

    render() {
        //Easy way to refer to this.props.exort, cleans up the code.
        let exp = this.props.export;
        //Names all valid rotors
        let options = ['I', 'II', 'III', 'IV', 'V'];
        //Names all rotors in use
        let picked = [exp.rotor1.which, exp.rotor2.which, exp.rotor3.which]
        let rotors = [];
        //filtered options for which rotors are not in use.
        let filteredOptions = options.filter(option => !picked.includes(option));

        //make 3 rotors
        for (let i = 1; i <= 3; i++) {
            //Easy way to refer to which rotor currently using
            let rotor = `rotor${i}`;
            rotors.push(
                <div className="rotor" key={i}>
                    <select className='rotor-select' name={rotor} id={rotor} onChange={(e) => this.changeRotor(e, rotor)}>
                        {/* Currently selected rotor as an option */}
                        <option key={exp[rotor].which} value={exp[rotor].which}>{exp[rotor].which}</option>
                        {/* Make options for all rotors not in use */}
                        {filteredOptions.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                    <input type="number" className="rotor-index" min='0' max='25' value={exp[rotor].shift} onChange={(e) => this.changeShift(e, rotor)} />
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

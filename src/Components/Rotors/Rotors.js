import React from 'react';

export default class Rotors extends React.Component {
    render() {
        return (
            <div>
                <p>Rotors</p>
                <div className="all-rotors">
                    <div className="rotor">
                        <select name="rotors" id="rotor1">
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                            <option value="V">V</option>
                        </select>
                        <input type="number" className="rotor-index" />
                    </div>
                    <div className="rotor">
                        <select name="rotors" id="rotor2">
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                            <option value="V">V</option>
                        </select>
                        <input type="number" className="rotor-index" />
                    </div>
                    <div className="rotor">
                        <select name="rotors" id="rotor3">
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                            <option value="V">V</option>
                        </select>
                        <input type="number" className="rotor-index" />
                    </div>
                </div>
            </div>
        )
    }
}

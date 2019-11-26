import React from 'react';

export default function FakeRotor(props) {
    return (
        <div key ={props.data.which} className="rotor">
            <select className='rotor-select' name="rotor1" id="rotor1" value={props.data.which} readOnly>
                <option value={props.data.which}>{props.data.which}</option>
            </select>
            <input type="number" className="rotor-index" value={props.data.shift} readOnly/>
        </div>
    );
}
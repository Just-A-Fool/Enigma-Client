import React from 'react';

export default function FakeWire(props) {
    //Designed to mock two Wires but has no functionality 
    return (
        <div key={'hello'} className="plugboard">
            <select key={props.keyData} className="fake-plug-input" value={props.keyData} readOnly>
                <option value={props.keyData}>{props.keyData}</option>
            </select>
            <span>:</span>
            <select key={props.value} className="fake-plug-input" value={props.value} readOnly>
                <option key={props.value} value={props.value}>{props.value}</option>
            </select>
        </div>
    );
}
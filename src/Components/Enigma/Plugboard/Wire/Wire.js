import React from 'react';

export default function Wire(props) {
    //props.i represents which set of wires is the current wire trying to make.
    //props.j represents either the first or second in the set
    //props.filtered are all letters that are not used
    //props.changeWire sends info to Enigma to change the wire's connection
    return (
        <select 
            key={`${props.i}${props.j}`} 
            className="plug-input" 
            value={props.wires[props.i][props.j]} 
            onChange={(event) => props.changeWire(event, props.i, props.j)}
            >
            <option key={'none'} value={props.wires[props.i][props.j]}>
                {props.wires[props.i][props.j]}
            </option>

            {/* This maps through all unpicked letters and creates an option element for them. */}
            {props.filtered.map(letter => <option key={letter} value={letter}>{letter}</option>)}

        </select>
    );
}
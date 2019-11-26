import React from 'react';

export default class Plugboard extends React.Component {




    

    render() {
        const alphabet = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');
        let filtered = [...alphabet];
        for (let i = 0; i < this.props.wires.length; i++) {
            filtered = filtered.filter(letter => !this.props.wires[i].includes(letter));
        }
        filtered.splice(0, 0, '');
        //console.log(this.props.wires)
        let wires = [];
        for (let i = 0; i < 10; i++) {
            wires.push(
                <div key={i} className="plugboard">
                    <select key={`${i}0`} className="plug-input" value={this.props.wires[i][0]} onChange={(event) => this.props.changeWire(event, i, 0)}>
                        <option key={'none'} value={this.props.wires[i][0]}>{this.props.wires[i][0]}</option>
                        {filtered.map(letter => <option key={letter} value={letter}>{letter}</option>)}
                    </select>
                    <span>:</span>
                    <select key={`${i}1`} className="plug-input" value={this.props.wires[i][1]} onChange={(event) => this.props.changeWire(event, i, 1)}>
                        <option key={'none'} value={this.props.wires[i][1]}>{this.props.wires[i][1]}</option>
                        {filtered.map(letter => <option key={letter} value={letter}>{letter}</option>)}
                    </select>
                </div>
            );
        }
        return (
            <div>
                <p>Plug-board</p>
                <div className="plugboard-container">
                    {wires}
                </div>
            </div>
        );
    }
}

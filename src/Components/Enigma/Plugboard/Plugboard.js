import React from 'react';

export default class Plugboard extends React.Component {
    state = {
        picked: [],
        wires: new Array(10).fill(['', ''])
    }

    changeWire = async (event, i, j) => {
        let newArray = [...this.state.wires];
        let newRow = [...newArray[i]];
        newRow[j] = event.target.value;
        newArray[i] = newRow;

        let newPicked = [...this.state.picked]
        newPicked.push(event.target.value)
        newPicked.forEach((pickedLetter, index) => {
            let pickedBool = false;
            newArray.forEach(row => {
                row.forEach(column => {
                    if (column === pickedLetter) {
                        pickedBool = true;
                    }
                    if (pickedLetter === '') {
                        pickedBool = false;
                    }
                })
            })
            if (!pickedBool) {
                newPicked.splice(index, 1);
            }
        })

        await this.setState({
            picked: newPicked,
            wires: newArray
        })

        this.props.handlePlugboardInput(this.state.wires);
    }

    componentDidMount= async () => {
        let setup = [...this.state.wires];
        let rows = [];
        if(this.props.export) {
            Object.keys(this.props.export.plug).forEach(key => {
                rows.push([key, this.props.export.plug[key]]);
            })
    
            for(let i = 0; i< rows.length; i++) {
                setup[i] = rows[i];
            }
    
            await this.setState({
                wires: setup
            })
            this.props.handlePlugboardInput(this.state.wires)
        }
    }

    render() {
        const alphabet = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');
        let filtered = alphabet.filter(letter => !this.state.picked.includes(letter));
        filtered.splice(0, 0, '');
        //console.log(this.state.wires)
        let wires = [];
        for (let i = 0; i < 10; i++) {
            wires.push(
                <div key={i} className="plugboard">
                    <select key={`${i}0`} className="plug-input" value={this.state.wires[i][0]} onChange={(event) => this.changeWire(event, i, 0)}>
                        <option key={'none'} value={this.state.wires[i][0]}>{this.state.wires[i][0]}</option>
                        {filtered.map(letter => <option key={letter} value={letter}>{letter}</option>)}
                    </select>
                    <span>:</span>
                    <select key={`${i}1`} className="plug-input" value={this.state.wires[i][1]} onChange={(event) => this.changeWire(event, i, 1)}>
                        <option key={'none'} value={this.state.wires[i][1]}>{this.state.wires[i][1]}</option>
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



                    {/* <div className="pBottom">
                        <div className="plugboard">
                            <input type="text" className="plug-input" />
                            <span>:</span>
                            <input type="text" className="plug-input" />
                        </div>
                        <div className="plugboard">
                            <input type="text" className="plug-input" />
                            <span>:</span>
                            <input type="text" className="plug-input" />
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

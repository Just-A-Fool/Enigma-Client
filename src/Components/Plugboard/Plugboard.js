import React from 'react';

export default class Rotors extends React.Component {
    render() {
        return (
            <div>
                <p>Plug-board</p>
                <div className="plugboard-container">
                    <div className="pTop">
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
                        <div className="plugboard">
                            <input type="text" className="plug-input" />
                            <span>:</span>
                            <input type="text" className="plug-input" />
                        </div>
                    </div>
                    <div className="pBottom">
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
                    </div>
                </div>
            </div>
        );
    }
}

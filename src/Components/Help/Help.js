import React from 'react';
import FakeRotor from '../SavedCiphers/Cipher/FakeRotor/FakeRotor';
import FakeWire from '../SavedCiphers/Cipher/FakeWire/FakeWire';

export default function Help() {
    let fakeRotorInfo = {
        which: 'II',
        shift: 23
    }
    return (
        <div id='help-page'>
            <h1>Help</h1>
            
            <div className='help-section'>
                <h2>Setting up the Enigma</h2>
                <p>Before encrypting/decrypting a message you must first input the initial settings you wish the Enigma to use. This allows a message to only be seen by another that knows those original settings.</p>
                <div className='help-sub-section'>
                    <h3>Rotors</h3>
                    <div className='help-rotor'>
                        <FakeRotor data={fakeRotorInfo} />
                    </div>
                    <p>Above is an example of a rotor. This rotor is using the second rotor out of five, the German manufactured "II" rotor. Each rotor has a different substitution cipher which is represented by picking from the dropdown menu.</p>
                    <p>Below the dropdown menu is the shift value. This represents how many times the rotor has moved positions. This value can only be between 0 and 25.</p>
                </div>
                <div className='help-sub-section'>
                    <h3>Plugboard</h3>
                    <div className='help-wire'>
                        <FakeWire keyData='A' value='D' /> 
                    </div>
                    <p>Above is an example of a wire. The plugboard has ten different wires, each of which will connect a letter to a different letter. These are chosen by using the dropdown menu.</p>
                    <p>For example if you were to input the letter 'A' to the Enigma machine, before it beings encoding the letter, it would see that 'A' is connected to 'D' and use 'D' for its encoding instead.</p>
                    <p>This behavior adds extra complexity to the Enigma machine and makes it more difficult to decipher.</p>
                </div>
            </div>
            <div className='help-section'>
                <h2>Using the machine</h2>
                <p>The input field is where you will type your message to encrypt/decrypt. Between the input and output fields there is a button that will allow you to switch between encryption mode and decryption mode, it displays the current mode. The output field will be the final message either encrypted or decrypted.</p>
                <p>Below the Input/Output section there are either one or two buttons depending on whether you are logged in or not. The reset button will reset the enigma machine back to its original state. The Save button will only appear if you are logged in and will save the current settings as a new cipher under the "Saved Ciphers" tab.</p>
                <p>Your saved ciphers are Located under the "Saved Ciphers" tab which is found at the top of your screen. Each saved cipher can be re-used by hitting the "Use" button or deleted by hitting the "Delete" button.</p>
            </div>
            <div className='help-section'>
                <h2>History</h2>
                <p>The Enigma machine was used throughout WWII by the Germans as an encryption device. This allowed the Germans to send messages between relay points in morse-code without having to worry about the message's content being read. Only someone with a working Enigma machine and the correct settings could decrypt the message.</p>
                <p>This became a vital struggle for the allies as they tried to break this code which would allow them to intercept and read the encrypted messages. </p>
            </div>
        </div>
    );

}
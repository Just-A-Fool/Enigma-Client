import React from 'react';
import Rotors from '../Rotors/Rotors';
import Plugboard from '../Plugboard/Plugboard';

const alphabet = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');

class Enigma extends React.Component {
  state = {
    rotor1: {
      cipher: ('EKMFLGDQVZNTOWYHXUSPAIBRCJ').split(''),
      defaultShift: 21,
      shift: 21,
      turnover: 17
    },
    rotor2: {
      cipher: ('AJDKSIRUXBLHWTMCQGZNPYFVOE').split(''),
      defaultShift: 8,
      shift: 8,
      turnover: 5
    },
    rotor3: {
      cipher: ('BDFHJLCPRTXVZNYEIWGAKMUSQO').split(''),
      defaultShift: 21,
      shift: 21,
      turnover: 22
    },
    reflector: {
      cipher: ('EJMZALYXVBWFCRQUONTSPIKHGD').split(''),
      shift: 0
    },
    plugBoard: {
      'A': 'D',
      // 'Q': 'Z',
      // 'H': 'U',
      // 'O': 'M'
    }
  }
  /*
  Resets shift values back to defaultShift values for every rotor.
  Makes encoding/decoding more user-friendly
  */
  reset = async () => {
    let shift1 = this.state.rotor1.defaultShift;
    let shift2 = this.state.rotor2.defaultShift;
    let shift3 = this.state.rotor3.defaultShift;

    //Object destructuring
    let rotor1 = { ...this.state.rotor1, shift: shift1 };
    let rotor2 = { ...this.state.rotor2, shift: shift2 };
    let rotor3 = { ...this.state.rotor3, shift: shift3 };

    await this.setState({
      rotor1,
      rotor2,
      rotor3
    });
    return;
  }

  /* 
  Utility Methods
  ----------------------------------------------------------------------------------------------------------------------------------------
  Rotor Methods
  */

  /* 
  Takes in a number corrosponding to which rotor to rotate. 
  Will recursively call itself if a rotor meets it's turnover point.
  This will allow the rotor to it's left (or after in this sense) to rotate. 
  This method represents the spining rotors in a real Enigma machine which drive all rotors to the right of it.
  The slowest moving rotor is the leftmost rotor. In this case rotor3
  */
  rotate = async (num) => {
    //If trying to rotate a rotor that doesn't exists return. Also exits out of recursion when rotor3 tries to call this.rotate(rotor4)
    let validNums = [1, 2, 3];
    if (!validNums.includes(num)) {
      return;
    }
    //sets up easy to use/read variable for current rotor
    let rotor = `rotor${num}`;

    //If current rotor will hit turnover point shift rotor to the left first (recursively)
    if ((this.state[rotor].shift + 1) === this.state[rotor].turnover) {
      let nextRotor = num + 1;
      await this.rotate(nextRotor);
    }

    //Makes sure that the new value for shift does not exceed 25.
    let newShift = this.state[rotor].shift + 1;
    if (newShift > 25) {
      newShift %= 26;
    }

    //Constructing new state for current rotor. 
    let newValues = { ...this.state[rotor], shift: newShift };
    await this.setState({
      [rotor]: newValues
    });
    return;
  }

  /* 
  Rotor Methods
  ----------------------------------------------------------------------------------------------------------------------------------------
  Plugboard Methods
  */

  /*
  Receives a letter to check against plugboard key/value pairs.
  Returns the original letter if no value is found.
  Returns value if found.
  Value is found when the letter matches either the key or the value. The opposite is the found value.
  ex: if the letter given is 'A' and in this.state.plugBoard, 'A' is the value for the key 'D', the return value would be 'D'
  */
  findPlugBoard = (letter) => {
    let plug = this.state.plugBoard;
    let found;
    //Checks plug for key/value pairs matching the letter to find.
    Object.keys(plug).forEach(key => {
      //If the key matches the letter given return the value for key.
      if (key === letter) {
        found = plug[key];
      }

      //If the value matches the letter return the key.
      if (plug[key] === letter) {
        found = key;
      }
    })
    //If found does not exists return the original letter otherwise return the match 'found'
    if (!found) {
      return letter;
    } else return found;
  }

  /* 
  Plugboard Methods
  ----------------------------------------------------------------------------------------------------------------------------------------
  Decoding Methods
  */

  /*
  Recieves a letter and the name of which rotor to use.
  Retraces steps taken by encodeWithRotor method in opposing direction.
  In a real enigma machine this would send electricity backwards through a single rotor which would be passed to the subsequent rotors.
  */
  decodeWithRotor = (letter, rotor) => {
    //Finds where the given letter is within the given rotor's cipher array
    let indexOfLetter = this.state[rotor].cipher.findIndex(value => value === letter);

    //Does the opposite of the encodeWithRouter method by subtracting the shift instead
    let indexMinusShift = indexOfLetter - this.state[rotor].shift;

    //If the index becomes negative we need to wrap it to the far end of the array.
    if (indexMinusShift < 0) indexMinusShift += 26;

    //Finds and returns a new letter with regard to where it was in the rotor's cipher array.
    let newLetter = alphabet[indexMinusShift];
    return newLetter;
  }

  /*
  Recieves a letter to decode.
  Retraces steps taken by the encode method in opposing direction.
  In a real enigma machine this would send electricity backwards through the machine to light up the decoded letter.
  */
  decode = async (word) => {
    if (!word) {
      return '';
    }
    //Resets back to default settings.
    await this.reset();
    let newWord = [];
    //For however many characters there are. 
    for (let i = 0; i < word.length; i++) {
      //Must use uppercase letters only. 
      let letter = word.charAt(i).toUpperCase();
      let decoded = letter;
      //If the character is not in the alphabet it remains the same, if it is in the alphabet it gets ciphered.
      if (alphabet.includes(letter)) {
        //Change letter to use if in plugboard.
        let currentLetter = this.findPlugBoard(letter);

        //Steps to encode. First the letter is ciphered through rotor1 then rotor2 and so on. 
        let steps = ['rotor1', 'rotor2', 'rotor3', 'reflector', 'rotor3', 'rotor2', 'rotor1']
        for (let j = 0; j < steps.length; j++) {
          currentLetter = this.decodeWithRotor(currentLetter, steps[j])
        }

        //Change letter to use if in plugboard.
        currentLetter = this.findPlugBoard(currentLetter);
        //Decoded character now becomes the ciphered letter
        decoded = currentLetter;
        //shift of rotor 1++
        await this.rotate(1);
      }

      //Adds new character to newWord
      newWord.push(decoded);
    }

    //Once deciphering process is finished joins all characters together into a string and returns said string.
    newWord = newWord.join('');
    console.log(newWord)
    return newWord;
  }

  /* 
  Decoding Methods
  ----------------------------------------------------------------------------------------------------------------------------------------
  Encoding Methods
  */

  /*
  Recieves a letter and the name of which rotor to use.
  In a real enigma machine this would send electricity through a single rotor which would be passed to the subsequent rotors.
  Each rotor has a different substitution cipher within.
  */
  encodeWithRotor = (letter, rotor) => {
    //Finds where the given letter is within the alphabet
    let indexOfLetter = alphabet.findIndex(value => value === letter);

    //Adds any shift from the rotor and makes sure index stays within 0-25
    let indexPlusShift = (indexOfLetter + this.state[rotor].shift) % 26;

    //Finds and returns the matching letter within the given rotor's cipher array. 
    let newLetter = this.state[rotor].cipher[indexPlusShift];
    return newLetter;
  }

  /*
  Recieves a letter to encode.
  Returns the encoded letter
  In a real enigma machine this would send electricity through the machine to light up the encoded letter.
  When the electricity would flow through the machine the given letter would go through many different levels of ciphering. 
  */
  encode = async (word) => {
    if (!word) {
      return '';
    }
    //Resets back to default settings.
    await this.reset();
    let newWord = [];
    //For however many characters there are. 
    for (let i = 0; i < word.length; i++) {
      //Must use uppercase letters only. 
      let letter = word.charAt(i).toUpperCase();
      let encoded = letter;
      //If the character is not in the alphabet it remains the same, if it is in the alphabet it gets ciphered.
      if (alphabet.includes(letter)) {
        //Change letter to use if in plugboard.
        let currentLetter = this.findPlugBoard(letter);

        //Steps to encode. First the letter is ciphered through rotor1 then rotor2 and so on. 
        let steps = ['rotor1', 'rotor2', 'rotor3', 'reflector', 'rotor3', 'rotor2', 'rotor1']
        for (let j = 0; j < steps.length; j++) {
          currentLetter = this.encodeWithRotor(currentLetter, steps[j])
        }

        //Change letter to use if in plugboard.
        currentLetter = this.findPlugBoard(currentLetter);

        //Encoded character now becomes the ciphered letter
        encoded = currentLetter;
        //Rotate first rotor only if encrypting a letter not if encrypting some other character.
        await this.rotate(1);
      }

      //Adds new character to newWord
      newWord.push(encoded);
    }

    //Once ciphering process is finished joins all characters together into a string and returns said string.
    newWord = newWord.join('');
    console.log(newWord);
    return newWord;
  }

  render() {
    return (
      <div>
        <button onClick={() => this.encode("hello you person, i'm a decoded message!")}>Encode</button>
        <button onClick={() => this.decode("YZCWP ISN FGWKZN, S'S J SBEBMLM WKRDPNS! SILKY CRQ UTNLVZ, M'H I SYNNOVH RBNZVRD!")}>decode</button>
        <button onClick={() => this.encode()}>Empty String</button>
        <button onClick={() => this.encode("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}>test rotate</button>
        <h1>Enigma</h1>
        <div id="setup-container">
          <Rotors />
          <Plugboard />
        </div>
        <div id="text-encryption">
          <textarea id="input" placeholder="Input"></textarea>
          <textarea id="output" placeholder="Output"></textarea>
        </div>
      </div>
    );
  }
}

export default Enigma;

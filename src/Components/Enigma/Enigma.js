import React from 'react';
import Rotors from '../Rotors/Rotors';
import Plugboard from '../Plugboard/Plugboard';
import enigmaApiService from '../../Services/enigma-api-service';

const alphabet = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');
const allRotors = {
  I: {
    cipher: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
    turnover: 17
  },
  II: {
    cipher: 'AJDKSIRUXBLHWTMCQGZNPYFVOE',
    turnover: 5
  },
  III: {
    cipher: 'BDFHJLCPRTXVZNYEIWGAKMUSQO',
    turnover: 22
  },
  IV: {
    cipher: 'ESOVPZJAYQUIRHXLNFTGKDCMWB',
    turnover: 10
  },
  V: {
    cipher: 'VZBRGITYUPSDNHLXAWMJQOFECK',
    turnover: 0
  }
}

class Enigma extends React.Component {
  state = {
    rotor1: {
      cipher: ('EKMFLGDQVZNTOWYHXUSPAIBRCJ').split(''),
      defaultShift: 0,
      shift: 0,
      turnover: 17
    },
    rotor2: {
      cipher: ('AJDKSIRUXBLHWTMCQGZNPYFVOE').split(''),
      defaultShift: 0,
      shift: 0,
      turnover: 5
    },
    rotor3: {
      cipher: ('BDFHJLCPRTXVZNYEIWGAKMUSQO').split(''),
      defaultShift: 0,
      shift: 0,
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
    },
    code: '',
    encrypt: true
  }

  /*
  Allows real-time encryption/decryption. 
  Takes input and runs it through either the encode or decode methods.
  This was not an option on the original Enigma Machine but it helps with user experience.
  */
  handleInput = async (plainText) => {
    let output;

    //Checks to see if currently in encryption mode or decryption mode.
    this.state.encrypt ?
      output = await this.encode(plainText) :
      output = await this.decode(plainText);

    this.setState({
      code: output
    })
  }

  /*
  This method allows users to switch between encoding and decoding a message.
  */
  switchModes = () => {
    this.setState({
      encrypt: !this.state.encrypt
    });
  }






  serialize = () => {
    return JSON.stringify(this.state);
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
  Takes in object from Rotors component. 
  This changes the state of the Enigma to allow one to change the default shift and which rotor to use.
  In real life this represents configuring the Enigma with the initial settings not including the plugboard. 
  */
  changeRotors = (rotors) => {
    let newRotors = [];
    //Factory loop here creating objects to set the state equal to. 
    for (let i = 1; i <= 3; i++) {
      //An easy way to refer to which rotor for the purpose of acessing correct info.
      let currentRotor = [`rotor${i}`]
      newRotors.push({
        //The substituion cipher and turnover live in the allRotors object.
        //[rotors[currentRotor].which] returns a key on allRotors representing which rotor picked.
        cipher: allRotors[rotors[currentRotor].which].cipher.split(''),
        turnover: allRotors[rotors[currentRotor].which].turnover,
        defaultShift: parseInt(rotors[currentRotor].shift),
      })
    }

    this.setState({
      rotor1: newRotors[0],
      rotor2: newRotors[1],
      rotor3: newRotors[2]
    })
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
  This method takes in input from the Plugboard component in the form of a multidimensional array
  It checks for pairs in said array and makes key/value pairs of them to put in the state
  On a real Enigma Machine this would allow electricity to flow through the wires on the plugboard
  essentially substituting one letter for another when entering and exiting the machine. 
  */
  handlePlugboardInput = (multiArray) => {
    let plugObj = {};

    //Looks at each element in the array, each element is another array of length 2
    multiArray.forEach(row => {
      //If there are valid inputs for both elements in the row make a key/value pair on plugObj
      if(row[0]&&row[1]) {
        plugObj[row[0]] = row[1]
      }
    })

    this.setState({
      plugBoard: plugObj
    })
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
        {/* 4:4, 5:5, 1:1 | H:L, W:B, E:O */}
        <button onClick={() => this.decode("QWKWM LQNJ JENSQ")}>decode</button>
        <button onClick={() => console.log(alphabet.indexOf('K'))}>Empty String</button>
        <button onClick={() => this.encode("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}>test rotate</button>
        <h1>Enigma</h1>
        <div id="setup-container">
          <Rotors changeRotors={this.changeRotors} />
          <Plugboard handlePlugboardInput={this.handlePlugboardInput} />
        </div>
        <div id="text-encryption">
          <textarea id="input" placeholder="Input" onChange={(e) => this.handleInput(e.target.value)}></textarea>
          <textarea id="output" placeholder="Output" value={this.state.code} readOnly></textarea>
        </div>
        <button onClick={this.switchModes}>{this.state.encrypt ? 'Encrypt Mode' : 'Decrypt Mode'}</button>
        <button onClick={() => {
          let body = this.serialize();
          enigmaApiService.saveCipher(body);
        }}>Serialize</button>
      </div>
    );
  }
}

export default Enigma;

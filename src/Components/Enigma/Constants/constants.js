//Alphabet in an Array
const alphabet = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');
//All ciphers/turnover points for the rotors
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
};
//Reflector's substitution cipher in an array
const reflector = ('EJMZALYXVBWFCRQUONTSPIKHGD').split('');

module.exports = {
    alphabet,
    allRotors,
    reflector
}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import { BrowserRouter, Router } from 'react-router-dom';
import Footer from './Components/Enigma/Footer/Footer';
import Rotors from './Components/Enigma/Rotors/Rotors';
import Enigma from './Components/Enigma/Enigma';
import Wire from './Components/Enigma/Plugboard/Wire/Wire';
import Plugboard from './Components/Enigma/Plugboard/Plugboard';
import Help from './Components/Help/Help';
import LoginPage from './Components/LoginPage/LoginPage';
import LoggedInNav from './Components/Navbar/LoggedInNav';
import LoggedOutNav from './Components/Navbar/LoggedOutNav';
import FakeRotor from './Components/SavedCiphers/Cipher/FakeRotor/FakeRotor';
import FakeWire from './Components/SavedCiphers/Cipher/FakeWire/FakeWire';
import Cipher from './Components/SavedCiphers/Cipher/Cipher';
import SavedCiphers from './Components/SavedCiphers/SavedCiphers';
import SignupPage from './Components/SignupPage/SignupPage';
import PrivateRoute from './Components/Utility/PrivateRoute';
import PublicRoute from './Components/Utility/PublicRoute';

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter >
      <App />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Footer renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Footer refresh={() => { }} save={() => { }} loggedInBool={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Wire renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Wire i={0} j={0} filtered={[]} wires={new Array(10).fill(['', ''])} changeWire={() => { }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Plugboard renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Plugboard changeWire={() => { }} wires={new Array(10).fill(['', ''])} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Rotors renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Rotors handleRotorsComponent={() => { }} export={{
    rotor1: {
      which: 'I',
      shift: 0,
    },
    rotor2: {
      which: 'II',
      shift: 0,
    },
    rotor3: {
      which: 'III',
      shift: 0,
    },
    plug: {}
  }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Enigma renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Enigma location={{ pathname: '/' }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Help renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Help />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('LoginPage renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});

it('LoggedInNav renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoggedInNav />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('LoggedOutNav renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoggedOutNav />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('FakeRotor renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FakeRotor data={{ which: 'I', shift: 0 }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('FakeWire renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FakeWire />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Cipher renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Cipher data={{ data: `{"rotor1":{"which":"I","shift":0},"rotor2":{"which":"II","shift":0},"rotor3":{"which":"III","shift":0},"plug":{}}` }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('SavedCiphers renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SavedCiphers />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('SignupPage renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SignupPage />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});

it('PrivateRoute renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <PrivateRoute
        path={'/help'}
        component={Help} />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});

it('PublicRoute renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <PublicRoute
        path={'/guest/help'}
        component={Help} />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './App.css';
import 'typeface-roboto';
import Header from './components/header/header';
import Home from './containers/home/home';
import About from './containers/about/about';
import Practice from './containers/practice/practice';
import Contact from './containers/contactUs/contactUs';
import Competitions from './containers/competitions/competitions';


class App extends Component {
  render() {
    return (
      <div>
        <Header
          home={<Home />}
          about={<About />}
          practice={<Practice />}
          contact={<Contact />}
          competitions={<Competitions />}
        />

      </div>
    );
  }
}

export default App;

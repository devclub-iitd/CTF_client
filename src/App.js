import React , {Component} from 'react';
import './App.css';
import 'typeface-roboto';
import Header from './components/header/header';
import Home from './components/home/home';
import About from './components/about/about';
import Practice from './components/practice/practice';
import Contact from './components/contactUs/contactUs';
import Competitions from './components/competition/competition';


class App extends Component {
  
  render ()
   {
    
    return (
      <div>
     <Header
      home = {<Home />}  
      about = {<About />}
      practice = {<Practice />}
      contact = {<Contact />}
      competitions = {<Competitions />}/>
      
      </div>
    );
  }
}

export default App;

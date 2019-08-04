import React, { PureComponent } from 'react';
import './App.css';
import 'typeface-roboto';
import { Route } from 'react-router-dom';
import Header from './components/header/header';
import Home from './containers/home/home';
import About from './containers/about/about';
import Practice from './containers/practice/practice';
import Contact from './containers/contactUs/contactUs';
import Competitions from './containers/competitions/competitions';
import Profile from './containers/profile/profile';
import addCompetitionForm from './components/forms/addCompetitionForm/addCompetitionForm';
import addProbelmForm from './components/forms/addProblemForm/addProblemForm';
import SignUp from './components/auth/signUp/signUp';
import categories from './containers/practice/Categories/categories';
import Problems from './containers/practice/Problems/Problems';
import rules from './containers/practice/Rules/rules';
import leaderboard from './containers/practice/Leaderboard/Leaderboard';
import category from './containers/practice/Categories/category/category';
import Competition from './containers/competitions/competition/competition';


class App extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/practice/" component={Practice} />
        <Route path="/competitions/" exact component={Competitions} />
        <Route path="/competition/:id" component={Competition} />
        <Route path="/contactUs/" component={Contact} />
        <Route path="/profile/" component={Profile} />
        <Route path="/competitions/add" exact component={addCompetitionForm} />
        <Route path="/add/problem" component={addProbelmForm} />
        <Route path="/signUp/" component={SignUp} />
        <Route path="/practice/problems" exact component={Problems} />
        <Route path="/practice/rules" exact component={rules} />
        <Route path="/practice/leaderboard" exact component={leaderboard} />
        <Route path="/practice/categories" exact component={categories} />
        <Route path="/practice/categories/:id" component={category} />
      </div>
    );
  }
}

export default App;

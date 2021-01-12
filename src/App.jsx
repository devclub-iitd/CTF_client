import React, { PureComponent } from "react";
import "./App.css";
import "typeface-roboto";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Header from "./components/header/header";
import Home from "./containers/home/home";
import About from "./containers/about/about";
import Practice from "./containers/practice/practice";
import Contact from "./containers/contactUs/contactUs";
import Competitions from "./containers/competitions/competitions";
import Profile from "./containers/profile/profile";
import addCompetitionForm from "./components/forms/addCompetitionForm/addCompetitionForm";
import addProbelmForm from "./components/forms/addProblemForm/addProblemForm";
import SignUp from "./components/auth/signUp/signUp";
import categories from "./containers/practice/Categories/categories";
import Problems from "./containers/practice/Problems/Problems";
import rules from "./containers/practice/Rules/rules";
import leaderboard from "./containers/practice/Leaderboard/Leaderboard";
import category from "./containers/practice/Categories/category/category";
import Competition from "./containers/competitions/competition/competition";
import LogOut from "./components/auth/logOut/logOut";
// import Walkthrough from './containers/walkthrough/walkthrough'

class App extends PureComponent {
  componentDidMount() {
    const { onCheckAuthState } = this.props;
    onCheckAuthState();
  }

  render() {
    const { profile } = this.props;
    let protectedRoutes = null;
    if (profile) {
      if (profile.isAdmin === 1) {
        protectedRoutes = (
          <div>
            <Route
              path="/competitions/add"
              exact
              component={addCompetitionForm}
            />
            <Route path="/add/problem" component={addProbelmForm} />
          </div>
        );
      }
    }
    return (
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/practice/" component={Practice} />
        <Route path="/event/" exact component={Competitions} />
        <Route path="/event/:id" component={Competition} />
        <Route path="/contactUs/" component={Contact} />
        <Route path="/profile/" component={Profile} />
        <Route path="/logout/" component={LogOut} />
        {protectedRoutes}
        <Route path="/signUp/" component={SignUp} />
        <Route path="/practice/problems" exact component={Problems} />
        <Route path="/practice/rules" exact component={rules} />
        <Route path="/practice/leaderboard" exact component={leaderboard} />
        <Route path="/practice/categories" exact component={categories} />
        <Route path="/practice/categories/:id" component={category} />
        {/* <Route path="/walkthrough" component={Walkthrough} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  onCheckAuthState: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

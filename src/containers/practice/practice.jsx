import React, { PureComponent } from 'react';
import { CssBaseline } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import classes from './practice.module.css';

class practice extends PureComponent {
  render() {
    return (
      <div>
        <nav className={classes.body}>
          <ul>
            <NavLink to="/practice/problems">
              <li
                className={classes.catList}
                role="presentation"
              >
                <a href>
                Problems
                </a>

              </li>
            </NavLink>
            <NavLink to="/practice/categories">
              <li
                className={classes.catList}
                role="presentation"
              >
                <a href>
                Categories
                </a>
              </li>
            </NavLink>

            <NavLink to="/practice/leaderboard">
              <li
                className={classes.catList}
                role="presentation"
              >
                <a href>
                Leaderboard
                </a>
              </li>
            </NavLink>
            <NavLink to="/practice/rules">
              <li
                className={classes.catList}
                role="presentation"
              >
                <a href>
                Rules
                </a>
              </li>
            </NavLink>
          </ul>
        </nav>
        <br />

        <CssBaseline />


      </div>
    );
  }
}


export default practice;

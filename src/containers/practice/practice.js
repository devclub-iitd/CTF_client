/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Container, Typography, CssBaseline } from '@material-ui/core';
import classes from './practice.module.css';
import Problems from './Problems/Problems';
import Leaderboard from './Leaderboard/Leaderboard';
import Categories from './Categories/categories';
import Rules from './Rules/rules';

class practice extends Component {
    state = {
      show: <Problems />,
    }

    clickhandler = (item) => {
      this.setState({ show: item });
    }

    render() {
      const { show } = this.state;
      return (
        <div className={classes.body}>
          <nav>
            <ul>
              <li
                className={classes.catList}
                onClick={() => this.clickhandler(<Problems />)}
                role="presentation"
              >
                Problems
              </li>
              <li
                className={classes.catList}
                onClick={() => this.clickhandler(<Categories />)}
                role="presentation"
              >
                Categories
              </li>
              <li
                className={classes.catList}
                onClick={() => this.clickhandler(<Leaderboard />)}
                role="presentation"
              >
                Leaderboard
              </li>
              <li
                className={classes.catList}
                onClick={() => this.clickhandler(<Rules />)}
                role="presentation"
              >
                Rules and Regulations
              </li>
            </ul>
          </nav>
          <br />
          <main>
            <Container maxWidth="md">
              <Typography variant="h1" align="center">Practice</Typography>
              <CssBaseline />
              {show}
            </Container>
          </main>


        </div>
      );
    }
}


export default practice;

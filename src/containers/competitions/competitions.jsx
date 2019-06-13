import React, { Component } from 'react';
import {
  Typography, CssBaseline, Paper, Grid,
} from '@material-ui/core';
import classes from './competitions.module.css';
import Competition from './competition/competition';

class competitions extends Component {
  state = {
    show: null,
    competitions: [
      {
        id: 1,
        name: 'Competition 1',
        details: 'This is the competiton details area where a breif about the competition is given.',
        userReg: 23,
      },
      {
        id: 2,
        name: 'Competition 2',
        details: 'This is another the competiton details area where a breif about the competition is given.',
        userReg: 32,
      },
    ],
  }

  linkClickHandler = (item) => {
    this.setState({ show: item });
  }

  render() {
    const { competitions: competition_, show } = this.state;
    let compList = competition_.map((el, index) => (
      <div className={classes.list}>
        <Paper>
          <div
            className={classes.title}
            onClick={() => this.linkClickHandler(<Competition comp={competition_[index]} />)}
            role="presentation"
          >
            <Typography variant="h3" component="h3" align="center">
              {el.name}
            </Typography>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <div className={classes.padding}>
                <Typography variant="h5" component="h3">
                  {el.details}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={2}>
                Registered
              <br />
              <br />
              {el.userReg}
            </Grid>

          </Grid>

        </Paper>
      </div>
    ));

    if (show) {
      compList = show;
    }

    return (
      <div>
        <br />
        <CssBaseline />
        <Typography variant="h1" align="center">Competitions</Typography>
        {compList}


      </div>

    );
  }
}

export default competitions;

import React, { Component } from 'react';
import {
  Typography, CssBaseline, Paper, Grid,
} from '@material-ui/core';
import Axios from 'axios';
import classes from './competitions.module.css';
import Competition from './competition/competition';
import Spinner from '../../components/UI/Spinner/Spinner';

class competitions extends Component {
  state = {
    show: null,
    competitionsList: null,
  }

  componentDidMount() {
    Axios.get('https://ctf-apis.firebaseio.com/competitions.json')
      .then((response) => {
        this.setState({ competitionsList: response.data });
      });
  }

  linkClickHandler = (item) => {
    this.setState({ show: item });
  }

  render() {
    const { show, competitionsList } = this.state;
    let compList = <Spinner />;
    if (competitionsList) {
      compList = Object.values(competitionsList).map(el => (
        <div className={classes.list} key={el.id}>
          <Paper>
            <div
              className={classes.title}
              onClick={() => this.linkClickHandler(<Competition comp={el} />)}
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
    }


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

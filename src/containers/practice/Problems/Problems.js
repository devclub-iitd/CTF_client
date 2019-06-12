/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';


class problems extends Component {
    state = {
      problems: null,
    }

    componentDidMount() {
      Axios.get('https://ctf-apis.firebaseio.com/problems.json')
        .then((response) => {
          this.setState({ problems: response.data });
        });
    }

    render() {
      const { problems } = this.state;
      let prob = null;
      if (problems) {
        prob = Object.values(problems).map(el => (
          <div style={{ width: '100%' }} key={el.id}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <Typography>
                      {el.name}
                      {' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>
                      {el.userSolved}
                      {' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>
                      {el.score}
                      {' '}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>
                      {el.status ? 'Solved' : 'Unsolved'}
                      {' '}
                    </Typography>
                  </Grid>


                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {el.details}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        ));
      }

      let display = <Spinner />;
      if (problems) {
        display = (
          <div>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Typography variant="h4">Problems  </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4">Users Solved </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4">Score  </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h4">Status  </Typography>
              </Grid>


            </Grid>

          </div>
        );
      }


      return (
        <div>

          <Typography variant="h3" align="center">
                    Problems
          </Typography>
          {display}
          {prob}


        </div>
      );
    }
}


export default problems;

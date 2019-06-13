import React, { Component } from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class problemsComp extends Component {
    state = {
      problems: [
        {
          id: 1,
          name: 'Problem 1',
          details: 'This is the first problem where you have to tell about the what is the binary number for 23',
          userSolved: 0,
          score: 50,
          status: true, // true pertains to that probelm is solved by the user for now
        },
        {
          id: 2,
          name: 'Problem 2',
          details: 'This is the second problem where you have to tell about the what is the binary number for 55.4',
          userSolved: 0,
          score: 100,
          status: false, // false pertains to that probelm is unsolved by the user for now
        },
      ],
    }

    render() {
      const { problems } = this.state;
      const prob = problems.map(el => (
        <div style={{ width: '100%' }}>
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


      const display = (
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


export default problemsComp;

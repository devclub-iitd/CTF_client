import React, { useState } from 'react';
import {
  Typography, Container, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
  Grid, TextField, Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import Axios from 'axios';

const CompProblems = ({ challenges }) => {
  const [values, setValues] = useState(null);
  const answerInput = (event) => {
    event.preventDefault();
    const answer = event.target.value;
    setValues({ answer });
  };
  const submitAnswerHandler = () => {
    Axios.post('Post Link', values);
  };
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
  const prob = Object.values(challenges).map(el => (
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
            <div>
              <TextField
                id="standard-full-width"
                label="Answer"
                style={{ margin: 8 }}
                fullWidth
                margin="large"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={answerInput}
              />
              <Button variant="outlined" color="primary" onClick={submitAnswerHandler}>
        Submit
              </Button>

            </div>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  ));

  return (
    <Container>
      {display}
      {prob}
    </Container>
  );
};

CompProblems.propTypes = {
  challenges: PropTypes.node.isRequired,
};

export default CompProblems;

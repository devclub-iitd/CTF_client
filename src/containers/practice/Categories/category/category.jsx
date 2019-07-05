import React, { Component } from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid, Container, Box,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import * as probelmActions from '../../../../store/actions/index';


class problems extends Component {
  componentDidMount() {
    const { oncategoryFetchProblems, history } = this.props;
    oncategoryFetchProblems(history.location.pathname.substring(21));
  }

  answerInput = (event) => {
    event.preventDefault();
    const answer = event.target.value;
    this.setState({ answer });
  }

  submitAnswerHandler = () => {
    const { answer } = this.state;
    Axios.post('Post Link', answer);
  }

  render() {
    const { problemsList } = this.props;
    let prob = null;
    if (problemsList) {
      prob = Object.values(problemsList).map(el => (
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
                  <input onChange={this.answerInput} type="text" name={el.id} />
                  <button type="button" onClick={this.submitAnswerHandler}>Answer</button>
                </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      ));
    }

    let display = <Spinner />;
    if (problemsList) {
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
        <Box p={6}>
          <Container maxWidth="md">
            <Box p={4}>
              <Typography variant="h1" align="center">
                    Category Problems
              </Typography>
            </Box>
            <Box p={3}>
              {display}
            </Box>

            {prob}

          </Container>
        </Box>


      </div>
    );
  }
}

problems.propTypes = {
  oncategoryFetchProblems: PropTypes.node.isRequired,
  problemsList: PropTypes.node.isRequired,
  history: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  problemsList: state.categoryProblems,
});
const mapDispatchToProps = dispatch => ({
  oncategoryFetchProblems: category => dispatch(probelmActions.categoryFetchProblems(category)),
});


export default connect(mapStateToProps, mapDispatchToProps)(problems);

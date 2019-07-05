import React, { Component } from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid, Container,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../../UI/Spinner/Spinner';
import * as probelmActions from '../../../../store/actions/index';


class problems extends Component {
    state={
      challenges: [],
    };

    componentDidMount() {
      const { onInitProblems } = this.props;
      onInitProblems();
    }


  checkBoxChangeHandler = (element) => {
    const { challenges } = this.state;
    let flag = true;
    challenges.map((i) => {
      if (i === element) {
        flag = false;
      }
      return '';
    });
    if (flag === true) {
      this.setState({ challenges: [...challenges, element] });
    } else {
      let temp = [...challenges];
      temp = temp.filter(item => item !== element);
      this.setState({ challenges: temp });
    }
  };

  submitHandler = () => {
    const { challenges } = this.state;
    const { problemSubmit } = this.props;
    problemSubmit(challenges);
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
                    <input type="checkbox" onChange={() => this.checkBoxChangeHandler(el)} />
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
        <Container maxWidth="md">
          <Typography variant="h1" align="center">
                    Problems
          </Typography>
          {display}
          {prob}
          <button type="submit" onClick={this.submitHandler}>Submit</button>

        </Container>


      </div>
    );
  }
}

problems.propTypes = {
  onInitProblems: PropTypes.node.isRequired,
  problemsList: PropTypes.node.isRequired,
  problemSubmit: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  problemsList: state.problems,
});
const mapDispatchToProps = dispatch => ({
  onInitProblems: () => dispatch(probelmActions.initProbelms()),
});


export default connect(mapStateToProps, mapDispatchToProps)(problems);

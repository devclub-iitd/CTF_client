import React, { Component } from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid, Container, Button
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../../UI/Spinner/Spinner';
import * as probelmActions from '../../../../store/actions/index';
import classes from './problemAdderDialog.module.css';


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
      this.setState({ challenges: [...challenges, element._id] });
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
                  <div className={classes.column1}>
                    <span className={classes.checkBox}>
                      <input type="checkbox" onChange={() => this.checkBoxChangeHandler(el)} />
                    </span>
                    <Typography>
                      {el.name}
                      {' '}
                    </Typography>
                  </div>
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
              <div className={classes.tableTitle}>Problems</div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.tableTitle}>Users Solved</div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.tableTitle}>Score</div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.tableTitle}>Status</div>
            </Grid>
          </Grid>
        </div>
      );
    }


    return (
      <div>
        <Container maxWidth="md">
          <div className={classes.title}>
            Problems
          </div>
          {display}
          {prob}
          <Button type="submit" variant="contained" color="primary" onClick={this.submitHandler} style={{ 'marginTop': '20px' }}>
            submit
          </Button>
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

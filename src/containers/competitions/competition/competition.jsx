import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Container, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import classes from './competition.module.css';
import CompLeaderboard from '../../../components/Table/CompLeaderboard/CompLeaderboard';
import CompProblems from '../../../components/Problem/CompProblems/CompProblems';
import * as CompetitionActions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';


class competition extends Component {
  componentDidMount() {
    const { onInitCompetition, history } = this.props;
    const id = history.location.pathname.substr(13);
    onInitCompetition(id);
  }

  render() {
    const { compDetails } = this.props;
    let data = <Spinner />;
    if (compDetails) {
      data = (
        <div>
          <div className={classes.title}>
            <Typography variant="h2" align="center">
              {compDetails.name}
            </Typography>
          </div>
          <div className={classes.para}>
            <Typography variant="h5">
              {compDetails.details}
            </Typography>
          </div>


          <Typography variant="h4">Rules and Regulations : </Typography>
          <div className={classes.para}>
            <Typography variant="h5">
                The rules are as follow, Blah Blah Blah Blah and so on.
            </Typography>
          </div>
          <div>
            <Typography variant="h3">Challenges </Typography>
            <Box p={3}><CompProblems challenges={compDetails.challenges} /></Box>
          </div>

          <div>
            <CompLeaderboard leaderboard={compDetails.leaderboard} key={compDetails.id} />
          </div>
        </div>
      );
    }
    return (
      <Container>

        <Box p={4}>
          {data}
        </Box>
      </Container>


    );
  }
}

competition.propTypes = {
  onInitCompetition: PropTypes.node.isRequired,
  compDetails: PropTypes.node.isRequired,
  history: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  compDetails: state.competition,
});
const mapDispatchToProps = dispatch => ({
  onInitCompetition: id => dispatch(CompetitionActions.initCompetition(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(competition);

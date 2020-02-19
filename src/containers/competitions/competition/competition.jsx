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
              {compDetails.name}
          </div>
          <div className={classes.miniLineCol} />
          <div className={classes.details}>
              {compDetails.details}
          </div>
          <div className={classes.ruleCont}>
            <div className={classes.subTitle}>Rules and Regulations:</div>
            <div className={classes.miniLine} />
            <div className={classes.ruleDetails}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
          <div className={classes.challengesCont}>
            <div className={classes.subTitle}>Challenges:</div>
            <div className={classes.miniLine} />
            <div>
              <Box p={3}><CompProblems challenges={compDetails.challenges} /></Box>
            </div>
          </div>
          <div className={classes.rankingCont}>
            <div className={classes.subTitle}>User Ranking:</div>
            <div className={classes.miniLine} />
            <CompLeaderboard leaderboard={compDetails.leaderboard} key={compDetails.id} />
          </div>
        </div>
      );
    }
    return (
      <Container>
        <div className={classes.mainCont}>
          {data}
        </div>
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

import React, { Component } from 'react';
import {
  Typography, Paper, Grid, Container, Box, Fab
} from '@material-ui/core';
import PropTypes from 'prop-types';
import NavigationIcon from '@material-ui/icons/Navigation';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './competitions.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as CompetitionActions from '../../store/actions/index';

class competitions extends Component {
  componentDidMount() {
    const { onInitCompetitions } = this.props;
    onInitCompetitions();
  }

  render() {
    const { competitionsList } = this.props;
    let compList = <Spinner />;
    if (competitionsList) {
      compList = Object.values(competitionsList).map(el => (
        <div key={el.id}>
          <Paper className={classes.competitionCard} style={{ backgroundColor: 'rgba(240,240,240,0.8)' }}>
            <Link to={`/competition/C${el.id}`} style={{ textDecoration: 'none' }}>
              <div className={classes.competitionCardTitle}>
                  {el.name}
              </div>
            </Link>
            <div className={classes.miniLineCol} />
            <div className={classes.competitionCardDetailCont}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              <div className={classes.thinLine} />
              <div className={classes.competitionCardExtras}>
                Registered -
                {' '}
                {el.userReg}
              </div>
            </div>
          </Paper>
        </div>
      ));
    }
    return (
      <Box p={5}>
        <Container>
          <div className={classes.mainCont}>
            <div className={classes.pageTitle}>Competitions</div>
            <div className={classes.miniLine} />
            <div className={classes.competitionListCont}>
              {compList}
            </div>
            <div className={classes.btnCont}>
              <Link to="/competitions/add">
                <Fab variant="extended" color="primary" aria-label="Add">
                  <NavigationIcon className={classes.extendedIcon} />
                  Add Competition
                </Fab>
              </Link>
            </div>
          </div>
        </Container>
      </Box>


    );
  }
}

competitions.propTypes = {
  onInitCompetitions: PropTypes.node.isRequired,
  competitionsList: PropTypes.node.isRequired,
};
// {el.details}

const mapStateToProps = state => ({
  competitionsList: state.competitions,
});
const mapDispatchToProps = dispatch => ({
  onInitCompetitions: () => dispatch(CompetitionActions.initCompetitions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(competitions);

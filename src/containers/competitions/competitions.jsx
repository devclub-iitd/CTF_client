import React, { Component } from 'react';
import {
  Typography, CssBaseline, Paper, Grid, Container, Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
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
        <div className={classes.list} key={el.id}>
          <Paper>
            <Link to={`/competition/C${el.id}`}>
              <div
                className={classes.title}
                role="presentation"
              >
                <Typography variant="h3" component="h3" align="center">
                  {el.name}
                </Typography>
              </div>
            </Link>
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
    return (
      <Box p={5}>
        <Container>
          <div>
            <br />
            <CssBaseline />
            <Typography variant="h1" align="center">Competitions</Typography>
            {compList}
            <Link to="/competitions/add"><Typography variant="h4" align="center">Add a new Competition</Typography></Link>
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

const mapStateToProps = state => ({
  competitionsList: state.competitions,
});
const mapDispatchToProps = dispatch => ({
  onInitCompetitions: () => dispatch(CompetitionActions.initCompetitions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(competitions);

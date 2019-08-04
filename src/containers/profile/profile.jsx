import React from 'react';
import {
  Container, Typography, Box, Paper, Grid,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './profile.module.css';
import * as ProfileActions from '../../store/actions/index';

class Profile extends React.PureComponent {
  componentDidMount() {
    const { onInitProfile } = this.props;
    onInitProfile();
  }


  render() {
    const {
      profile,
    } = this.props;
    let compList = <Spinner />;
    if (profile) {
      compList = Object.values(profile.competitionsList).map(el => (
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
              <Grid item xs={8}>
                <div className={classes.padding}>
                  <Typography variant="h5" component="h3">
                    Rank:
                    {' '}
                    {el.rank}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.padding}>
                  <Typography variant="h5" component="h3">
                    Score:
                    {' '}
                    {el.score}
                  </Typography>
                </div>
              </Grid>

            </Grid>

          </Paper>
        </div>
      ));
    }
    let display = null;
    if (profile) {
      display = (
        <div>
          <Typography variant="h2" align="center">
            {profile.name}
          </Typography>
          <Box p={6}>
            <div style={{ textAlign: 'center' }}>
              <img alt="Profile Pic" src={profile.image} height="420" width="420" />
            </div>
          </Box>

          <Typography variant="h4">
    UserName:
            {' '}
            {profile.username}
          </Typography>
          <Box p={4}>
            <Typography variant="h4" align="center">
    Competitions Participated
            </Typography>
          </Box>
          <Box>
            {compList}
          </Box>
          <Box p={4}>
            <Typography variant="h4" align="center">
    Leaderboard
            </Typography>
          </Box>
          <Box p={4}>
            <Typography variant="h5">
    Rank:
              {profile.problems.rank}
            </Typography>
          </Box>
          <Box p={4}>
            <Typography variant="h5">
    Score:
              {profile.problems.score}
            </Typography>
          </Box>

        </div>
      );
    }


    return (
      <div>
        <br />
        <Container>
          <Box p={6} />
          {display}
        </Container>
      </div>

    );
  }
}
Profile.propTypes = {
  onInitProfile: PropTypes.node.isRequired,
  profile: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});
const mapDispatchToProps = dispatch => ({
  onInitProfile: () => dispatch(ProfileActions.initProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

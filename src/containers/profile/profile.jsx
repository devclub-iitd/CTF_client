import React from 'react'
import {
  Container, Typography, Box, Paper, Grid
} from '@material-ui/core'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './profile.module.css'
import * as ProfileActions from '../../store/actions/index'

class Profile extends React.PureComponent {
  componentDidMount () {
    const { onInitProfile, userId } = this.props
    onInitProfile(userId)
  }

  render () {
    let {
      profile
    } = this.props
    let compList = <Spinner />
    if (profile) {
      // const message = profile.message
      profile = profile.data
      compList = (profile.events).map(el => (
        <div className={classes.list} key={el._id}>
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
      ))
    }
    let display = null
    if (profile) {
      display = (
        <div className={classes.mainCont}>
          <div className={classes.pageTitle}>
            {profile.name}
          </div>
          <div className={classes.miniLine} />
          <Box p={6}>
            <div style={{ textAlign: 'center' }}>
              <img alt="Profile Pic" src={profile.image} height="420" width="420" />
            </div>
          </Box>
          <div className={classes.subDetail}>
            <span className={classes.subDetailTitle}>User Name:</span>
            {' '}
            <span className={classes.subDetailDesc}>
              {profile.username}
            </span>
            <div className={classes.miniLineLeft} />
          </div>
          <Box p={4}>
            <div className={classes.subTitle}>
              Competitions Participated
            </div>
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
              {/* {profile.problems.rank} */}
            </Typography>
          </Box>
          <Box p={4}>
            <Typography variant="h5">
    Score:
              {/* {profile.problems.score} */}
            </Typography>
          </Box>

        </div>
      )
    }

    return (
      <div>
        <br />
        <Container>
          <Box p={6} />
          {display}
        </Container>
      </div>

    )
  }
}
Profile.propTypes = {
  onInitProfile: PropTypes.node.isRequired,
  profile: PropTypes.node.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  userId: state.userId
})
const mapDispatchToProps = dispatch => ({
  onInitProfile: (userId) => dispatch(ProfileActions.initProfile(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

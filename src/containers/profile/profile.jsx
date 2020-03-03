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
    const { onInitProfile, userId, token } = this.props
    onInitProfile(userId, token)
  }

  render () {
    const {
      profile
    } = this.props
    let compList = <Spinner />
    if (profile) {
      compList = (profile.participant).map(el => {
        if (el.score === 0) {
          return
        }
        return (
          <div className={classes.list} key={el._id}>
            <Link style={{ textDecoration: 'none', color: 'rgba(245,0,87,1)' }} to={{
              pathname: `/event/${el.eventId}`,
              state: {
                _id: `${el.eventId}`
              }
            }}>
              <div
                className={classes.title}
                role="presentation"
              >
                <Typography variant="h3" component="h3" align="center">
                  {el.eventName}
                </Typography>
              </div>
            </Link>
          </div>
        )
      })
    }
    let display = null
    if (profile) {
      display = (
        <div className={classes.mainCont}>
          <div className={classes.pageTitle}>
            {profile.name}
          </div>
          <div className={classes.miniLine} />
          <div className={classes.subDetail}>
            <span className={classes.subDetailTitle}>User Name:</span>
            {' '}
            <span className={classes.subDetailDesc}>
              {profile.username}
            </span>
            <br /> <br />
            <span className={classes.subDetailTitle}>Email:</span>
            {' '}
            <span className={classes.subDetailDesc}>
              {profile.email}
            </span>
            <br /> <br />
            <span className={classes.subDetailTitle}>Phone No:</span>
            {' '}
            <span className={classes.subDetailDesc}>
              {profile.number}
            </span>
            <div className={classes.miniLine} />
          </div>
          <Box p={4}>
            <div className={classes.subTitle}>
              Competitions Participated
            </div>
          </Box>
          <Box>
            {compList}
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
  profile: PropTypes.node.isRequired,
  token: PropTypes.node.isRequired,
  userId: PropTypes.node.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  userId: state.userId,
  token: state.token
})
const mapDispatchToProps = dispatch => ({
  onInitProfile: (userId, token) => dispatch(ProfileActions.initProfile(userId, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

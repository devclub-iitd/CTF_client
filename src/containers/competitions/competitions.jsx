import React, { Component } from 'react'
import {
  Typography, Paper, Grid, Container, Box, Fab
} from '@material-ui/core'
import PropTypes from 'prop-types'
import NavigationIcon from '@material-ui/icons/Navigation';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from './competitions.module.css'
import Axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner'
import * as CompetitionActions from '../../store/actions/index'

class competitions extends Component {
  componentDidMount () {
    const { onInitCompetitions } = this.props
    onInitCompetitions()
  }

  constructor(props){
    super(props);
    this.state = {
      reg: null,
    }
  }


  startCompetition = async (event) => {
    const { token, userId, profile, onInitProfile } = this.props;
    if(!token){
      window.location.href = "/";
      return alert('Login to enter Competition')
    }
    let isParticipated = profile.data.participant.some(item => event.participants.includes(item))
    console.log(isParticipated)
    if(!isParticipated){
      let url = 'http://localhost:3000/api/participant/'
      const participant = await Axios({
        method: 'POST',
        url: url,
        data: {
          eventId: event._id,
          userId: userId
        },
        headers: { 'Authorization': 'Bearer ' + token }
     });
      const participant_id = participant.data.data._id
      url = 'http://localhost:3000/api/event/'+event._id
      event.participants.push(participant_id)
      event.leaderboard.push(participant_id)
      const eventResponse = await Axios({
        method: 'PUT',
        url: url,
        data: {
          participants: event.participants,
          leaderboard: event.leaderboard
        },
        headers: { 'Authorization': 'Bearer ' + token }
     });
     url = 'http://localhost:3000/api/user/'+userId
     const userParticipant = [...profile.data.participant]
     const userEvent = [...profile.data.events]
     userEvent.push(event._id)
     userParticipant.push(participant_id)
     console.log(userParticipant,userEvent)
     const userResponse = await Axios({
      method: 'PUT',
      url: url,
      data: {
        participant: userParticipant,
        events: userEvent
      },
      headers: { 'Authorization': 'Bearer ' + token }
      });
      await onInitProfile(userId)
     return
    }
    console.log(profile)
  }

  render () {
    const { competitionsList } = this.props
    let compList = <Spinner />
    if (competitionsList) {
      compList = competitionsList.map(el => (
        <div key={el._id}>
          <Paper className={classes.competitionCard} style={{ backgroundColor: 'rgba(240,240,240,0.8)' }}>
            <Link style={{ textDecoration: 'none' }} onClick={() => this.startCompetition(el)} to={{
              pathname: `/event/${el._id}`,
              state: {
                _id: `${el._id}`,
              }
            }}>
              <div className={classes.competitionCardTitle}>
                  {el.name}
              </div>
            </Link>

            <div className={classes.miniLineCol} />
            <div className={classes.competitionCardDetailCont}>
                  Random text
              <div className={classes.thinLine} />
              <div className={classes.competitionCardExtras}>
                Registered -
                {' '}
                {el.participants.length}
              </div>
            </div>
          </Paper>
        </div>
      ))
    }
    return (
      <Box p={5}>
        {this.props.red}
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

    )
  }
}

competitions.propTypes = {
  onInitCompetitions: PropTypes.node.isRequired,
  competitionsList: PropTypes.node.isRequired
}

const mapStateToProps = state => ({
  competitionsList: state.competitions,
  token: state.token,
  userId: state.userId,
  profile: state.profile
})
const mapDispatchToProps = dispatch => ({
  onInitCompetitions: () => dispatch(CompetitionActions.initCompetitions()),
  onInitProfile: (userId) => dispatch(CompetitionActions.initProfile(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(competitions)

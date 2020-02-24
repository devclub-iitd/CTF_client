import React, { Component } from 'react'
import {
  Typography, Paper, Grid, Container, Box, Fab, Button
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

  deleteEventHandler = async (eventId) => {
    const { token } = this.props
    const url = 'http://localhost:3000/api/event/' + eventId
    const response = await Axios({
      method: 'DELETE',
      url: url,
      headers: { 'Authorization': 'Bearer ' + token }
    })
  }

  startCompetition = async (event) => {
    const { token, userId, profile, onInitProfile } = this.props;
    let username = null
    if(profile){
      username = profile.username
    }
    if(!token){
      window.location.href = "/";
      return alert('Login to enter Competition')
    }
    if(new Date(event.startTime) > (new Date())){
      return alert('Competition has not started yet!!')
    }
    let isParticipated = profile.participant.some(item => event.participants.includes(item))
    console.log(isParticipated)
    if(!isParticipated){
      let url = 'http://localhost:3000/api/participant/'
      const participant = await Axios({
        method: 'POST',
        url: url,
        data: {
          eventId: event._id,
          userId: userId,
          username: username
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
     const userParticipant = [...profile.participant]
     const userEvent = [...profile.events]
     userEvent.push(event._id)
     userParticipant.push(participant_id)
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
    const { competitionsList, profile, token } = this.props
    let isAdmin = null
    if(profile){
      isAdmin = profile.isAdmin
    }
    let compList = <Spinner />
    if (competitionsList) {
      compList = competitionsList.map(el => (
        <div key={el._id}>
          <Paper className={classes.competitionCard} style={{ backgroundColor: 'rgba(240,240,240,0.8)' }}>
            <Link style={{ textDecoration: 'none' }} onClick={() => this.startCompetition(el)} to={{
              pathname: `/event/${(new Date(el.startTime) < (new Date())) ? el._id : ''}`,
              state: {
                _id: `${el._id}`,
              }
            }}>
              <div className={classes.competitionCardTitle}>
                  {el.name}
              </div>
            </Link>
              {el.details}
            <div className={classes.miniLineCol} />
            <div className={classes.competitionCardDetailCont}>
                  Random text
              <div className={classes.thinLine} />
              <div className={classes.competitionCardExtras}>
                Registered -
                {' '}
                {el.participants.length}
              </div>
              <div>
                {isAdmin ? <Button onClick = {() => this.deleteEventHandler(el._id)}>Delete</Button> : null}
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

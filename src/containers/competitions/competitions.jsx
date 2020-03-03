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

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     render: false,
  //   }
  // }

  deleteEventHandler = async (eventId) => {
    const { token } = this.props
    const url = 'http://localhost:3000/api/event/' + eventId
    const response = await Axios({
      method: 'DELETE',
      url: url,
      headers: { 'Authorization': 'Bearer ' + token }
    })
  }



  registerHandler = async (event) => {
    const { token, userId, profile, registerCompetition } = this.props;
    if(new Date(event.endTime).getTime() < new Date().getTime()){
      return alert('Registration is Over!!')
    }
    if(!token){
      return alert('Login to Register!!')
    }
    const profileParticipantsId = profile.participant.map(el => el._id)
    let isParticipated = profileParticipantsId.some(item => event.participants.includes(item))
    if(isParticipated){
      return alert('Already Registered !!')
    }
    await registerCompetition(token, userId, profile, event)
    const { onInitCompetitions, onInitProfile } = this.props
    await onInitProfile(userId, token)
    await onInitCompetitions()
    this.forceUpdate()
  }


  render () {
    const { competitionsList, profile} = this.props
    let isAdmin = null
    if(profile){
      isAdmin = profile.isAdmin
    }
    let compList = <Spinner />
    if (competitionsList) {
      compList = competitionsList.map(el => {
          const { token, profile } = this.props
          let reg = null
          let profileParticipantsId = null
          let isParticipated = null
          if(profile){
            profileParticipantsId = profile.participant.map(el => el._id)
            isParticipated = profileParticipantsId.some(item => el.participants.includes(item))
          }
          if( !token ){
            reg = 'Login to Register'
          }
          else if(!isParticipated) {
            reg = 'Register'
          }
          else{
            reg = 'Registered'
          }
          const startCompetition = () => {
            if( !token ){
              alert('Login to Enter Competition')
              return
            }
            if(!isParticipated) {
              alert('Register to Enter Competition')
              return
            }
            if(new Date(el.startTime) > (new Date())){
              alert('Competition has not started yet!!')
            }
          }
        return(
        <div key={el._id}>
          <Paper className={classes.competitionCard} style={{ backgroundColor: 'rgba(240,240,240,0.8)' }}>
            <Link style={{ textDecoration: 'none' }} onClick={() => startCompetition()} to={{
              pathname: `/event/${(isParticipated && token && new Date(el.startTime) < (new Date())) ? el._id : ''}`,
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
          <Button onClick={() => this.registerHandler(el)}>{reg}</Button>
              <div className={classes.thinLine} />
              <div className={classes.competitionCardExtras}>
                Registered -
                {' '}
                {el.participants.length}
              </div>
              <div>
                {(isAdmin) ? <Button onClick = {() => this.deleteEventHandler(el._id)}>Delete</Button> : null}
              </div>
            </div>
          </Paper>
        </div>
      )})
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
            { (isAdmin ) ? <div className={classes.btnCont}>
              <Link to="/competitions/add">
                <Fab variant="extended" color="primary" aria-label="Add">
                  <NavigationIcon className={classes.extendedIcon} />
                  Add Competition
                </Fab>
              </Link>
            </div> : null}
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
  onInitProfile: (userId, token) => dispatch(CompetitionActions.initProfile(userId, token)),
  registerCompetition: (token, userId, profile, event) => dispatch(CompetitionActions.regEvent(token, userId, profile, event))
})

export default connect(mapStateToProps, mapDispatchToProps)(competitions)

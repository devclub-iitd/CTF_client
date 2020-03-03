import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography, Container, Box, Paper, Button } from '@material-ui/core'
import Timer from '../../../components/UI/Timer/timer'
import { connect } from 'react-redux'
import classes from './competition.module.css'
import CompLeaderboard from '../../../components/Table/CompLeaderboard/CompLeaderboard'
import CompProblems from '../../../components/Problem/CompProblems/CompProblems'
import * as CompetitionActions from '../../../store/actions/index'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Snackbar from '../../../components/UI/snackbar/snackbar'

class competition extends Component {
   componentDidMount () {
    const { onInitCompetition, location, token} = this.props
    const { _id } = location.state
     onInitCompetition(_id, token)
  }

  constructor (props) {
    super(props)
    this.state = {
      level: 1,
      open: false,
      message: ""
    }
    this.openSnack = this.openSnack.bind(this)
    this.closeSnack = this.closeSnack.bind(this)
  }
  openSnack(mess) {
    this.setState({
      open: true,
      message: mess
    })
  }
  closeSnack() {
    this.setState({
      open: false
    })
  }

  nextButtonHandler = () => {
    const { profile, token, compDetails, location, onInitCompetitionLevelProblems } = this.props
    const { level } = this.state
    const { _id } = location.state
    let participant = null
    if( level === compDetails.levels ){
      this.openSnack('This is the Final level!!')
    }
    if( profile ) {
      participant = profile.participant[profile.participant.length -1]
    }
    if(participant.level > level) {
      const updatedLevel = level + 1
      onInitCompetitionLevelProblems(_id, token, updatedLevel, participant._id)
      this.setState({level: updatedLevel })
    }
    else{
      this.openSnack('Level not Unlocked yet!!')
    }
  }

  prevButtonHandler = () => {
    const { profile, compDetails, location, token, onInitCompetitionLevelProblems } = this.props
    const { level } = this.state
    const { _id } = location.state
    let participant = null
    if(level > 1){
      const updatedLevel = level - 1
      if( profile ) {
        participant = profile.participant[profile.participant.length -1]
      }
      onInitCompetitionLevelProblems(_id, token, updatedLevel, participant._id)
      this.setState({ level: updatedLevel })
    }
    else{
      this.openSnack('This is the first level')
    }
  }

  render () {
    const { open, message } = this.state;
    const { compDetails, token, profile } = this.props
    const { level } = this.state
    let participant = null
    let problemsSolved = null
    let userId = null
    if (profile) {
      participant = profile.participant
      problemsSolved = profile.problems
      userId = profile._id
    }
    let data = <Spinner />
    if (compDetails && profile) {
      data = (
        <div>
          <div className={classes.title}>
            {compDetails.name}
          </div>
          <div style = {{ textAlign: 'center' }}>
            <br />
            {(new Date(compDetails.endTime) > (new Date())) ? <Timer dateTo= {compDetails.endTime}/> : <h2>Competition Over</h2>}
          </div>
          <div className={classes.miniLineCol} />
          <div className={classes.details}>
            {compDetails.details}
          </div>

          <div className={classes.ruleCont}>
            <div className={classes.subTitle}>Rules and Regulations:</div>
            <div className={classes.miniLine} />
            <div className={classes.ruleDetails}>
              Rule Details
            </div>
          </div>
          <div className={classes.challengesCont}>
            <div className={classes.subTitle}>Challenges:</div>
            <div className={classes.miniLine} />
            <Paper>
              <div>
                <Typography>Level {level}</Typography>
                <Box p={3}><CompProblems
                  level ={level}
                  startTime = {compDetails.startTime}
                  endTime = {compDetails.endTime}
                  problemsSolved = {problemsSolved}
                  participant = {participant[participant.length - 1]}
                  eventScore={compDetails.levelScore}
                  token = { token }
                  challenges={compDetails.challenges} /></Box>
              </div>
              <Button onClick = {this.prevButtonHandler} >Previous</Button>
              <Button onClick = {this.nextButtonHandler} >Next</Button>
            </Paper>
          </div>
          <div className={classes.rankingCont}>
            <div className={classes.subTitle}>User Ranking:</div>
            <div className={classes.miniLine} />
            <CompLeaderboard userId = {userId} eventId={compDetails._id} key={compDetails._id} />
          </div>
        </div>
      )
    }
    return (
      <Container>
        <div className={classes.mainCont}>
          {data}
        </div>
        <Snackbar open={open} message={message} handleClose={this.closeSnack} />
      </Container>

    )
  }
}

competition.propTypes = {
  onInitCompetition: PropTypes.node.isRequired,
  compDetails: PropTypes.node.isRequired,
  history: PropTypes.node.isRequired,
  location: PropTypes.node.isRequired,
  token: PropTypes.node.isRequired,
  profile: PropTypes.node.isRequired
}

const mapStateToProps = state => ({
  compDetails: state.competition,
  token: state.token,
  profile: state.profile
})
const mapDispatchToProps = dispatch => ({
  onInitProfile: (userId, token) => dispatch(CompetitionActions.initProfile(userId, token)),
  onInitCompetition: (id, token) => dispatch(CompetitionActions.initCompetition(id, token)),
  onInitCompetitionLevelProblems: (eventId, token, level, participantId) => dispatch(CompetitionActions.initCompetitionLevelProblems(eventId, token, level, participantId))
})

export default connect(mapStateToProps, mapDispatchToProps)(competition)

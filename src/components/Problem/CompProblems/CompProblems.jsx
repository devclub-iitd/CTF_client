import React, { useState } from 'react'
import {
  Typography, Container, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
  Grid, TextField, Button
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PropTypes from 'prop-types'
import classes from './CompProblems.module.css'
import Axios from 'axios'
import Snackbar from '../../UI/snackbar/snackbar'

const CompProblems = ({ updateUI, startTime, endTime, problemsSolved, participant, eventScore, token, challenges }) => {
  const [values, setValues] = useState(new Map())
  const answerInput = (event) => {
    event.preventDefault()
    values.set(event.target.name, event.target.value)
  }
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const openSnack = (mess) => {
    setMessage(mess)
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const isSolved = (problemId) => problemsSolved.includes(problemId)
  const submitAnswerHandler = async (problem) => {
    const participantId = participant._id
    const url = 'http://localhost:3000/api/participant/' + participantId
    const response = await Axios({
      method: 'PUT',
      url: url,
      data: {
        problemId: problem._id,
        score: problem.score,
        answer: values.get(problem.name),
        startTime: startTime,
        endTime: endTime,
        eventScore: eventScore
      },
      headers: { Authorization: 'Bearer ' + token }
    })
    openSnack(response.data.message)
    updateUI()
  }
  const display = (
    <div>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <div className={classes.tableHeading} >Problems  </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.tableHeading} >Users Solved </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.tableHeading} >Score  </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.tableHeading} >Status  </div>
        </Grid>

      </Grid>

    </div>
  )
  const prob = challenges.map(el => (
    <div style={{ width: '100%' }} key={el._id}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography>
                {el.name}
                {' '}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                {el.userSolved}
                {' '}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                {el.score}
                {' '}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                {isSolved(el._id) ? 'Solved' : 'Unsolved'}
                {' '}
              </Typography>
            </Grid>

          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {el.details}
            <div>
              <TextField
                id={el._id}
                label="Answer"
                style={{ margin: 8 }}
                fullWidth
                margin="large"
                InputLabelProps={{
                  shrink: true
                }}
                name={el.name}
                onChange={answerInput}
              />
              <Button variant="outlined" color="primary" onClick={() => submitAnswerHandler(el)}>
        Submit
              </Button>

            </div>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Snackbar open={open} message={message} handleClose={handleClose} />
    </div>
  ))

  return (
    <Container>
      {display}
      {prob}
    </Container>
  )
}

CompProblems.propTypes = {
  challenges: PropTypes.node.isRequired,
  token: PropTypes.node.isRequired,
  eventId: PropTypes.node.isRequired,
  participant: PropTypes.node.isRequired,
  problemsSolved: PropTypes.node.isRequired,
  startTime: PropTypes.node.isRequired,
  endTime: PropTypes.node.isRequired,
  level: PropTypes.node.isRequired
}

export default CompProblems

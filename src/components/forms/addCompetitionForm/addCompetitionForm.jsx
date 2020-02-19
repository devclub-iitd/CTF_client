import React, { useState } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { Typography, Container, Button } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import {
  DateTimePicker,
  MuiPickersUtilsProvider
} from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'
import Axios from 'axios'
import classes from './addCompetitionForm.module.css'
import Modal from '../../modal/modal'
import ProblemAdderDialog from './problemAdderDialog/problemAdderDialog'
import * as actions from '../../../store/actions/index'

const AddCompetitionForm = (props) => {
  const [values, setValues] = useState({
    name: '',
    challenges: [],
    details: ''
  })
  const [startDate, handleStartDateChange] = useState(new Date())
  const [endDate, handleEndDateChange] = useState(new Date())

  const changeHandler = name => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    const req = {
      ...values,
      startTime: startDate,
      endTime: endDate
    }
    // Axios.post('Post Link', send);
    console.log(req)
    const { addEvent, token } = props
    addEvent(req, token)
  }

  const problemSubmitHandler = (challenges) => {
    setValues({ ...values, challenges })
  }

  return (
    <Container>
      <div>
        <Typography variant="h3" align="center">Add a Competition</Typography>
        <br />
        <form noValidate autoComplete="off" onSubmit={submitHandler}>

          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            margin="normal"
            name="name"
            onChange={changeHandler('name')}
          />
          <br />
          <br />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              value={startDate}
              disablePast
              onChange={handleStartDateChange}
              label="Start Date and Time"
              showTodayButton
            />
          </MuiPickersUtilsProvider>
          <br />
          <br />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              value={endDate}
              disablePast
              onChange={handleEndDateChange}
              label="End Date and Time"
              showTodayButton
            />
          </MuiPickersUtilsProvider>
          <br />
          <br />
          <br />
          <TextField
            id="Competition Details"
            label="Competition Details"
            multiline
            rows="10"
            className={classes.textField}
            fullWidth="true"
            onChange={changeHandler('details')}
            variant="outlined"
          />
          <br />
          <br />
          <Modal name="Add Problems"><ProblemAdderDialog problemSubmit={problemSubmitHandler} /></Modal>
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
                 Send
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addEvent: (event, token) => dispatch(actions.onitEvent(event, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCompetitionForm)

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
    details: '',
    level: 0,
    levelScore: new Map()
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
    const { addEvent, token } = props
    // console.log(req.levelScore)
    addEvent(req, token)
    alert('Competition Created Successfully')
  }

  const problemSubmitHandler = (challenges, levels) => {
    const level = levels.size
    setValues({ ...values, challenges, levelScore: levels, level })
    alert('Problems added Successfully')
  }

  return (
    <Container>
      <div className={classes.mainCont}>
        <div className={classes.subCont}>
          <div className={classes.title}>Add a Competition</div>
          <div className={classes.miniLine} />
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
                className={classes.textField}
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
                className={classes.textField}
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
              // fullWidth="true"
              onChange={changeHandler('details')}
              variant="outlined"
            />
            <br />
            <br />
            <Modal name="Add Problems"><ProblemAdderDialog problemSubmit={problemSubmitHandler} /></Modal>
            <br />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                   Send
              <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </form>
        </div>
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

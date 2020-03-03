import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { Typography, Container, Button } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import Axios from 'axios'
import { connect } from 'react-redux'
import classes from './addProblemForm.module.css'
import * as actions from '../../../store/actions/index'
import Snackbar from '../../UI/snackbar/snackbar'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const AddProbelmForm = (props) => {
  const [formElements, setFormElement] = useState({
    name: '',
    category: '',
    details: '',
    difficulty: '',
    answer: '',
    level: 1,
    score: 0,
    isActive: 1
  })
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const openSnack = (mess) => {
    setMessage(mess)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const changeHandler = name => (event) => {
    setFormElement({ ...formElements, [name]: event.target.value })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    const { addProblem, token } = props
    addProblem(formElements, token)
    openSnack('Problem added Successfully')
  }

  return (
    <div className={classes.mainCont}>
      <div className={classes.subCont}>
        <div className={classes.title}>Add a Problem</div>
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
          <FormControl className={classes.textField}>
            <InputLabel>Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={formElements.category}
              onChange={changeHandler('category')}
            >
              <MenuItem value={'Web Exploits'}>Web Exploits</MenuItem>
              <MenuItem value={'Binary Exploits'}>Binary Exploits</MenuItem>
              <MenuItem value={'Cipher-Decipher'}>Cipher Decipher</MenuItem>
            </Select>
          </FormControl>

          <br />
          <br />
          <TextField
            id="Probelm Details"
            label="Problem Details"
            multiline
            rows="10"
            className={classes.textField}
            fullWidth="true"
            onChange={changeHandler('details')}
            variant="outlined"
          />
          <br />
          <TextField
            id="score"
            label="Score"
            className={classes.textField}
            margin="normal"
            name="score"
            onChange={changeHandler('score')}
          />
          <br />
          <TextField
            id="standard-difficulty"
            label="Difficulty"
            className={classes.textField}
            margin="normal"
            name="difficulty"
            onChange={changeHandler('difficulty')}
          />
          <br />
          <TextField
            id="standard-level"
            label="Level"
            className={classes.textField}
            margin="normal"
            name="level"
            onChange={changeHandler('level')}
          />
          <br />
          <TextField
            id="standard-answer"
            label="Answer"
            className={classes.textField}
            margin="normal"
            name="answer"
            onChange={changeHandler('answer')}
          />
          <br />
          <TextField
            id="standard-activity"
            label="Activity"
            className={classes.textField}
            margin="normal"
            name="isActive"
            onChange={changeHandler('isActive')}
          />
          <br />
          <br />
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
                 Send
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
        <Snackbar open={open} message={message} handleClose={handleClose} />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProblem: (problem, token) => dispatch(actions.onitProblem(problem, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProbelmForm)

// <TextField
//   id="standard-category"
//   label="Category"
//   className={classes.textField}
//   margin="normal"
//   name="category"
//   onChange={changeHandler('category')}
// />

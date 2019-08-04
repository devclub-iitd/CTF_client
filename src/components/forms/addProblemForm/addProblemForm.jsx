import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Typography, Container, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Axios from 'axios';
import classes from './addProblemForm.module.css';


const AddProbelmForm = () => {
  const [formElements, setFormElement] = useState({
    name: '',
    category: '',
    details: '',
    difficulty: '',
    answer: '',
  });

  const changeHandler = name => (event) => {
    setFormElement({ ...formElements, [name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    Axios.post('https://ctf-apis.firebaseio.com/problems.json', formElements);
  };


  return (
    <Container>
      <div>
        <Typography variant="h3" align="center">Add a Problem</Typography>
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
          <TextField
            id="standard-category"
            label="Category"
            className={classes.textField}
            margin="normal"
            name="category"
            onChange={changeHandler('category')}
          />
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
            id="standard-difficulty"
            label="Difficulty"
            className={classes.textField}
            margin="normal"
            name="difficulty"
            onChange={changeHandler('difficulty')}
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
          <br />
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
                 Send
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddProbelmForm;

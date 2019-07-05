import React from 'react';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { Typography, Container, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Axios from 'axios';
import classes from './signUp.module.css';
import Modal from '../../modal/modal';
import Login from '../login/login';

const SignUp = () => {
  const [values, setValues] = React.useState({
    name: '',
    emailId: '',
    number: 0,
    username: '',
    password: '',
  });
  const handleChange = prop => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const loginSubmitHandler = () => {
    Axios.post('Post Link', values);
  };
  return (
    <Container className={classes.container}>
      <Typography variant="h2" align="center">Sign Up</Typography>
      <TextField
        id="standard-name"
        label="Name"
        className={classes.textField}
        margin="normal"
        name="name"
        onChange={handleChange('name')}
      />
      <br />
      <TextField
        id="standard-emailId"
        label="EmailId"
        className={classes.textField}
        margin="normal"
        name="emailId"
        onChange={handleChange('emailId')}
      />
      <br />
      <TextField
        id="standard-number"
        type="number"
        label="Mobile No"
        className={classes.textField}
        margin="normal"
        name="number"
        onChange={handleChange('number')}
      />
      <br />
      <TextField
        id="standard-username"
        label="Username"
        className={classes.textField}
        margin="normal"
        name="username"
        onChange={handleChange('username')}
      />
      <br />
      <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="adornment-password">Password</InputLabel>
        <Input
          id="adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
)}
        />
      </FormControl>
      <br />
      <br />
      <Button onClick={loginSubmitHandler} variant="contained" color="primary" className={classes.button}>
                 Sign Up
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
      <div>
        <Modal name="Login"><Login /></Modal>
      </div>
    </Container>
  );
};

export default SignUp;

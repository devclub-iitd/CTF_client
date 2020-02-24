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

const SignUp = () => {
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    key: '',
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
      <div className={classes.modalTitle}>Sign Up</div>
      <div className={classes.miniLine} />
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
      <TextField
        id="secret-key"
        label="Secret Key"
        className={classes.textField}
        margin="normal"
        name="Key"
        onChange={handleChange('key')}
      />
      <br />
      <br />
      <br />
      <Button onClick={loginSubmitHandler} variant="contained" color="primary" className={classes.button}>
        <span className={classes.btnText}>Sign Up</span>
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
      <br />
      <br />
    </Container>
  );
};

export default SignUp;

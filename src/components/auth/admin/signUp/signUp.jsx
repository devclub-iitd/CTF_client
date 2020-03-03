import React from 'react'
import clsx from 'clsx'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { Typography, Container, Button } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import classes from './signUp.module.css'
import * as actions from '../../../../store/actions/index'

const SignUp = (props) => {
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    email: '',
    secret: ''
  })
  const handleChange = prop => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const loginSubmitHandler = (event) => {
    event.preventDefault()
    props.onAuth(values, false)
  }
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
        id="standard-emailId"
        label="EmailId"
        className={classes.textField}
        margin="normal"
        name="emailId"
        onChange={handleChange('email')}
      />
      <br />
      <TextField
        id="secret-key"
        label="Secret Key"
        className={classes.textField}
        margin="normal"
        name="Key"
        onChange={handleChange('secret')}
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
  )
}

const mapStateToProps = state => {
  return {
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (authData, isLogin) => dispatch(actions.auth(authData, isLogin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

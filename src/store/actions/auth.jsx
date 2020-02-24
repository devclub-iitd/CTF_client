import * as actionTypes from './actionsTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeOut = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 10000)
  }
}

export const fetchProfile = profile => ({
  type: actionTypes.SET_PROFILE,
  profile
})

export const initProfile = (userId) => (dispatch) => {
  axios.get('http://localhost:3000/api/user/' + userId)
    .then((response) => {
      dispatch(fetchProfile(response.data.data))
    })
}

export const auth = (authData, isLogin) => {
  return dispatch => {
    dispatch(authStart())
    let url = 'http://localhost:3000/api/user/signup'
    if (isLogin) {
      url = 'http://localhost:3000/api/user/login'
    }
    axios.post(url, authData)
      .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.userId)
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(response.data.token, response.data.userId))
        dispatch(initProfile(response.data.userId))
        dispatch(checkAuthTimeOut(response.data.expiresIn))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail())
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('Logout hogaya 1')
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(initProfile(userId))
        dispatch(checkAuthTimeOut((expirationDate.getTime() - (new Date().getTime())) / 1000))
      } else {
        console.log('Logout hogaya 2')
        dispatch(logout())
      }
    }
  }
}

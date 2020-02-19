import Axios from 'axios'
import * as actionType from './actionsTypes'

export const fetchProfile = profile => ({
  type: actionType.SET_PROFILE,
  profile
})

export const initProfile = (userId) => (dispatch) => {
  Axios.get('http://localhost:3000/api/user/' + userId)
    .then((response) => {
      dispatch(fetchProfile(response.data))
    })
}

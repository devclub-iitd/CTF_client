import Axios from 'axios'
import * as actionType from './actionsTypes'

export const fetchProfile = profile => ({
  type: actionType.SET_PROFILE,
  profile
})

export const initProfile = (userId, token) => async (dispatch) => {
  const url = 'http://localhost:3000/api/user/' + userId
  const response = await Axios({
    method: 'GET',
    url: url,
    headers: { Authorization: 'Bearer ' + token }
  })
  dispatch(fetchProfile(response.data.data))
}

import Axios from 'axios'
import * as actionType from './actionsTypes'

export const fetchCompetitions = competitions => ({
  type: actionType.SET_COMPETITIONS,
  competitions
})

export const initCompetitions = () => (dispatch) => {
  Axios.get('http://localhost:3000/api/event/')
    .then((response) => {
      dispatch(fetchCompetitions(response.data.data))
    })
}

export const fetchCompetition = competition => ({
  type: actionType.SET_COMPETITION,
  competition
})

export const initCompetition = (eventId, token) => async (dispatch) => {
  const url = `http://localhost:3000/api/event/${eventId}`
  const response = await Axios({
    method: 'GET',
    url: url,
    headers: { Authorization: 'Bearer ' + token }
  })
  dispatch(fetchCompetition(response.data))
}

// Adding an Event or Competition

export const addEvent = competition => ({
  type: actionType.ADD_EVENT,
  competition
})

export const onitEvent = (event, token) => async (dispatch) => {
  const url = 'http://localhost:3000/api/event/'
  const response = await Axios({
    method: 'POST',
    url: url,
    data: event,
    headers: { Authorization: 'Bearer ' + token }
  })
  dispatch(addEvent(response.data.data))
}
